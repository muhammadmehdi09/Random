import express from 'express'
import path from "path"
import Post from "../models/Posts.mjs"

const __dirname = path.resolve()
const router = express.Router()

router.use(express.static("public"));

router.get("/post", async (req, res) => {
    try {
        res.status(200).sendFile(path.resolve(__dirname,"./public/posts.html"))
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "error",
            message: "Something went wrong.",
            error: error
        })
    }
})

router.get("/postsData", async (req, res) => {
    try {
        res.status(200).sendFile(path.resolve(__dirname,"./public/postsData.html"))
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "error",
            message: "Something went wrong.",
            error: error
        })
    }
})

router.get("/postsData/:author", async (req, res) => {
    try {
        const author = req.params.author
        const data = await Post.find({author: author})

        res.status(200).send({
            data: data
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "error",
            message: "Something went wrong.",
            error: error
        })
    }
})

router.get("/posts", async (req, res) => {
    try {
        const data = await Post.find({})

        res.status(200).send({
            data: data
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "error",
            message: "Something went wrong.",
            error: error
        })
    }
})

router.post("/posts", async (req, res) => {
    try {
        const { author, title, content } = req.body

        const post = await Post.create({
            author: author,
            title: title,
            content: content
        })
        res.send({
            data: post
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: "Something went wrong"
        })
    }
})

router.delete("/posts", async (req, res) => {
    try {
        let id = req.body.id

        if (!id) {
            return res.status(400).send({
                status: "error",
                message: "missing required params.",
            })
        }

        await Post.findByIdAndDelete(id)
        const data = await Post.find({})

        res.status(200).send({
            status: "success",
            message: "data fetched successfully.",
            data: data
        })

    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message,
        })
    }
})

router.put("/posts", async (req, res) => {
    try {
        const { id, author, content, title } = req.body

        await Post.findByIdAndUpdate(id, {
            author: author,
            title: title,
            content: content
        }, { new: true })

        const data = await Post.find({})

        res.status(200).send({
            status: "success",
            message: "data edited successfully.",
            data: data
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message,
        })
    }
})

export default router