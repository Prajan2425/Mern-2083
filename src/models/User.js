import mongoose from "mongoose";    

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name is required"],
        minLength:3,
        maxLength:50,
    },
    email:{
        type: String,
        requried: [true, "Email is required"],
        lowerCase: true,
        unique: true,

        //not a good approach to create validator in models.

        // validate: {
        //     validator: (value) => {
        //         const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        //         return emailRegex.test(value);
        //     },
        //     message: "Invalid Email Address"
        // },
    },
        password: {
            type: String,
            required: [true, "Password is Required"],
            minlength: [6, "Password length must be greater than 6"],
            // validate: {
            //     validator: (value) =>{
            //         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
            //         return passwordRegex.test(value);
            //     },
            //     message: "Password not match"
            // },
    },

        phone: {
            type: String,
            required: [true, "Phone number is required"],
            minlength:7,
            maxlength:14,
            unique: true,
        },

        createdAt: {
            type: Date,
            default: Date.now()
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        address: {
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
        role: {
            type: [String],
            enum: ["CUSTOMER", "MERCHANT", "ADMIN", "SUPER_ADMIN"],
            default: ["CUSTOMER"]
        }
});

export default mongoose.model("User",userSchema);