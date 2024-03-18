import mongoose from 'mongoose';
import 'dotenv/config'

const connectDB = () => {
    mongoose.connect(process.env.DB_URI)

    mongoose.connection.on('connected', function () {
        console.log("Mongoose is connected");
    });

    mongoose.connection.on('disconnected', function () {
        console.log("Mongoose is disconnected");
        process.exit(1);
    });

    mongoose.connection.on('error', function (err) {
        console.log('Mongoose connection error: ', err);
        process.exit(1);
    });

    process.on('SIGINT', function () {
        console.log("app is terminating");
        mongoose.connection.close(function () {
            console.log('Mongoose default connection closed');
            process.exit(0);
        });
    });

    return;
}
export default connectDB