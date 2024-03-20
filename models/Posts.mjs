import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      min: 3,
      max: 20,
      required: true
    },
    title: {
      type: String,
      max: 50,
      required: true
    },
    content: {
      type: String,
      min: 5,
      required: true
    }
  }
)

const Post = mongoose.model("Posts", PostSchema);
export default Post