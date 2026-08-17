import User from "../models/User.js";
import bcrypt from "bcrypt";

const login = async(data) => {
//find user and match password
const user = await User.findOne({ $or: [{ email: data?.email}, {phone: data?.phone}] });
if (!user){
    throw {
        status:404,
        message: "User not found",
    };
}
 const isPasswordMatch = bcrypt.compareSync(data.password, user.password);

 if (!isPasswordMatch){
    throw{
        status: 400,
        message: "Password do not match"
    };
 }
 return {
    _id:user._id,
    address:user.address,
    phone:user.phone,
    email:user.email,
    name:user.name,
    role:user.role,
    isActive:user.isActive,
 };
};

const register = async (data) => {
    const user = await User.findOne({ email: data.email });

    if(user){
        throw{
            status: 409,
            message: "User already exists"
        }
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(data.password, salt);
    const createdUser = await User.create({
        ...data,
        password: hashedPassword,
    });
     return {
_id: createdUser._id,
    address: createdUser.address,
    phone: createdUser.phone,
    email: createdUser.email,
    name: createdUser.name,
    role: createdUser.role,
    isActive: createdUser.isActive,
 };
};

export default {register, login};