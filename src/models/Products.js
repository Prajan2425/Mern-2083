import mongoose from "mongoose";    

const productSchema = new mongoose.Schema ({
    name:{
        type: String,
        required: [true, "Product name is required"],
        minLength: 3,
        maxLength: 50,
    },
    brand: {
        type: String,
        required: [true, "Product brand is required"],
    },
    category: {
        type: String,
        required: [true, "Product category is required"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [1, "Product price must be greater than 1"],
        max: [9999999, "Product price must be less than 9,99,999"]
    },

    stock:{
        type:Number,
        min: 0,
        default: 1
    },

        imageUrls: {
        type: [String],
        default: []
    },

    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required: [true, "Created by user id is required"]
    }
});

export default mongoose.model("Products", productSchema);   
