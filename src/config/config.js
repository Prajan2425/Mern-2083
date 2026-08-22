import dotenv from "dotenv";

dotenv.config();

const config = {
    port : process.env.PORT || "",
    mongodbURL: process.env.MONGODB_URL || "",
    jwtSecret: process.env.JWT_SECRET || "",
    cloudinary:{
        cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
        apiKey: process.env.CLOUDINARY_API_KEY || "",
        apiSecret: process.env.CLOUDINARY_API_SECRET || "",
    },
};

export default config;