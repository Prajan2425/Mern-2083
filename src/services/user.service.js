import User from "../models/User.js";
import fileUpload from "../utils/fileUploader.js";
import authService from "../services/auth.service.js";
import { ROLE_ADMIN, ROLE_SUPER_ADMIN } from "../constants/roles.js";

const getAllUsers = async(query) => {
  const sort =  query.sort? JSON.parse(query.sort): {};
  const limit = query.limit?? 10;
  const offset = query.offset?? 0;

  const filters = {};
  const {name, email, phone} = query;

   if(name) filters.name = {$regex: name, $options: "i"}; // i: case insensitive 
   if(email) filters.name = {$regex: email, $options: "i"};
   if(phone) filters.phone = {$regex: phone, $options: "i"};

   return await User.find(filters).sort(sort).limit(limit).skip(offset);
};

// const getById = async (id, authUser)=>{
//      if(authUser._id !== id && !authUser.roles.includes(ROLE_ADMIN)){
//         throw {
//             status: 403,
//             message: "Access denied"
//         };
//     }
//     return await User.findById(id);
// };

const getById = async (id, authUser) => {

    // console.log("ID:", id);
    // console.log("AUTH USER:", authUser);

    if (authUser._id !== id && !authUser.role.includes(ROLE_ADMIN)) {
        throw {
            status: 403,
            message: "Access denied"
        };
    }

    return await User.findById(id);
};

const createUser = async (data) => {
    return await authService.register(data);
};

const updateUser = async (id, data, authUser)=>{
    // self update case and admin update case
    if(authUser._id !== id && !authUser.role.includes(ROLE_ADMIN)){
        throw {
            status: 403,
            message: "Access denied"
        };
    }
    return await User.findByIdAndUpdate(id, 
        {name: data?.name, 
        phone: data?.phone, 
        address: data?.address, 
        isActive: data?.isActive}, 
        {new: true});
};

const deleteUser = async (id) => {
    await User.findByIdAndDelete(id);
    return "User deleted successfully."
};

const updateProfileImage = async (id, file) => {
    const uploadedFiles = await uploadFile([file]);
    return await User.findByIdAndUpdate(id, {profileImageUrl:uploadedFiles[0].url}, {new: true});
};

const updateUserrole = async (id, role, authUser) => {
    if((role.includes(ROLE_ADMIN) || role.includes(ROLE_SUPER_ADMIN)) && !authUser.role.includes(ROLE_SUPER_ADMIN)){
        throw{
            status: 403,
            message: "Access denied",
        }
    }
    return await User.findByIdAndUpdate(id, {role}, {returnDocument: "after"});
};

export default {createUser, getAllUsers, getById, updateUser, deleteUser, updateProfileImage, updateUserrole};
