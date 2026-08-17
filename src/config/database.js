import mongoose from "mongoose";
import config from "./config.js";

function connectDB() {
    mongoose.connect(config.mongodbURL).then(() => {
        console.log("MongoDB connected sucessfully");
    }).catch((err) => {
        console.log(err);
    });
}

export default connectDB;