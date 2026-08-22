import User from "../models/User.js";

const getAllUsers = async() => {
    return await User.find();
};

const getById = async (id)=>{
    return await User.create(data);
};

const createUser = async (data) => {
    return await User.create(data);
};

const updateUser = async (id, data)=>{
    return await User.findByIdAndUpdate(id, data, {new: true});
};

const deleteUser = async (id) => {
    await User.findByIdAndDelete(id);
};

const updateProfileImage = async (id, file) => {
    const uploadedFiles = await uploadFile([file]);
    return await User.findByIdAndUpdate(id, {profileImageUrl:uploadedFiles[0].url}, {new: true});
};

export default {createUser, getAllUsers, getById, updateUser, deleteUser, updateProfileImage};