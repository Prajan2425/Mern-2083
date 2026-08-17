import dotenv from "dotenv";

dotenv.config();

const config = {
    port : process.env.PORT || "",
    mongodbURL: process.env.MONGODB_URL || "",
    jwtSecret: process.env.JWT_SECRET || "",
};

export default config;