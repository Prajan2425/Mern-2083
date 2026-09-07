import ResetPassword from "../models/ResetPassword.js";
import config from "../config/config.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import sendEmail from "../utils/email.js";

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

const forgotPassword = async (email) => {
    const user = await User.findOne({email});

    if(!user){
        throw{
            status: 404,
            message: "User not found.",
        };
    }

const token = crypto.randomUUID();
   await ResetPassword.create({
        userId: user._id,
        token: token,
    });

const link = `${config.appUrl}/reset-password?UserId=${user._id}&token=${token}`;

sendEmail({
    recipient:email,
    subject: "Reset password link",
    html:`<div style="padding: 16px; font-family: 
    sans-serif;
    ">
        <h1>Please click the link to reset your password</h1>
        <a href="${link}" style="background-color: steelblue; color: white; text-decoration: none;padding: 8px 16px; border-radius: 5px;">Reset Password</a>
    </div>`,
})

return{
    message: "Password reset link is sent to your email",
};
};

const resetPassword = async (input) => {
    const data = await ResetPassword.findOne({ userId: input.userId, expiresAt:{$gt: Date.now()},})
    .sort({createdAt: -1});

    if(!data || data.token != input.token){
        throw{
            status: 400,
            message: "Invalid or Expired Link."
        };
    }

    if(data.isUsed){
        throw{
            status: 400,
            message: "Link is Already Used."
        };
    }
   
     const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(input.password, salt);

    await User.findByIdAndUpdate(input.userId, {password: hashedPassword});

    await ResetPassword.findByIdAndUpdate(data._id,{isUsed: true});

    return{message: "Reset Password Succesful"};

};

export default {register, login, forgotPassword, resetPassword};