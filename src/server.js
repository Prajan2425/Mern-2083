import express from "express";
import multer from "multer";
import cors from "cors";
import config from "./config/config.js";
import connectDB from "./config/database.js";
import productRoute from "./routes/product.route.js";
import userRoute from "./routes/user.route.js";
import orderRoute from "./routes/order.route.js";
import authRoute from "./routes/auth.route.js";
import pageRoute from "./routes/page.route.js"
import bodyParser from "body-parser";
import logger from "./middlewares/logger.js";
import auth from "./middlewares/auth.js";
import connectCloudinary from "./config/cloudinary.js";

const upload = multer({ storage: multer.memoryStorage() });

const app = express();

connectDB();
connectCloudinary();

app.use(bodyParser.json());
app.use(logger);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


app.set("view engine", "hbs");

app.get("/", (req, res)=>{
    res.json({
        status: "OK",
        version: "0.1.0",
        port: config.port,
    })
});

app.use("/api/products",upload.array("images", 5), productRoute);
app.use("/api/users", auth, upload.single("image"), userRoute);
app.use("/api/auth", authRoute);
app.use("/api/orders", auth, orderRoute);

app.use("/pages",pageRoute);

app.listen(config.port, (req, res)=> {
    console.log(`Server started at ${config.port} port.`);
});