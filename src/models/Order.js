import mongoose from 'mongoose';
import { ORDER_STATUS_CANCELLED, ORDER_STATUS_CONFIRMED, ORDER_STATUS_DELIVERED, ORDER_STATUS_PENDING, ORDER_STATUS_SHIPPED } from "../constants/orderStatus.js";
import { required } from 'zod/mini';

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required:[true, "User is required"]
    },
    orderItems:[
       { 
        product:{
            type: mongoose.Schema.ObjectId,
            ref: "Products",
            required:[true, "Product is required"],
        },
        quantity:{
            type:Number,
            default:1,
            min:[1, "Quantity must be at least 1"],
        },
    },
],
    status:{
        type:String,
        default: ORDER_STATUS_PENDING,
        enum:[
            ORDER_STATUS_PENDING,
            ORDER_STATUS_CONFIRMED,
            ORDER_STATUS_SHIPPED,
            ORDER_STATUS_DELIVERED,
            ORDER_STATUS_CANCELLED,
        ]
    },
    shippingAddress:{
             city: {
                type: String,
                required: true,
            },
            province: {
                type: String,
                required: true,
            },
            street: String,
            country: {
                type: String,
                default: "Nepal",
            },
    },
    orderNumber:{
        type: String,
        required: [true, "Order number is required"],
    },
    totalPrice:{
        type: Number,
        required:[true, "Total price is required"],
    },
    payment: {
        type: mongoose.Schema.ObjectId,
        ref: "Payment"

    },
    createdDate: {
        type: Date,
        default: Date.now(),
        immutable: true,
    },
});

export default mongoose.model("Order", orderSchema);