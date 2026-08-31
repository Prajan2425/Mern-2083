import { ORDER_STATUS_CANCELLED, ORDER_STATUS_CONFIRMED } from "../constants/orderStatus.js";
import Order from "../models/Order.js";

//For Admin 
const getOrders = async() => {
    return await Order.find().sort({createdAt: -1}) 
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls");
};

const getOrderById = async(id) => {
    return await Order.findById(id)
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls");
};

const createOrder = async(data, userId) => {
    return await Order.create({...data, user:userId});
};

const updateOrderStatus = async(id, status) => {
    return await Order.findByIdAndUpdate(id, {status}, {new: true});
};

const cancelOrder = async(id) => {
    return await Order.findByIdAndUpdate(id, {status: ORDER_STATUS_CANCELLED}, {new: true});
};

const deleteOrder = async(id) => {
    await Order.findByIdAndDelete(id);
};

//Payment
const confirmOrder = async(id) => {
    return await Order.findByIdAndUpdate(id, {status: ORDER_STATUS_CONFIRMED}, {new: true});
};

const getOrdersByUser = async (userId) => {
    return await Order.find({user: userId}).sort({createdAt: -1}) 
    .populate("user", "name email phone")
    .populate("orderItems.product", "name brand category price imageUrls");
};

const getOrdersByMerchant = () => {};

export default {getOrders, getOrderById, createOrder, updateOrderStatus, cancelOrder, deleteOrder, confirmOrder, getOrdersByUser,getOrdersByMerchant};
