import express from "express";
import config from "./config/config.js";
import connectDB from "./config/database.js";
import productRoute from "./routes/product.route.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import bodyParser from "body-parser";
import logger from "./middlewares/logger.js";
import auth from "./middlewares/auth.js";

const app = express();

connectDB();

app.use(bodyParser.json());
app.use(logger);

app.get("/", (req, res)=>{
    res.send("Home page");
});

app.get("/about", (req, res)=>{
    res.send("About Page")
});

app.post("/contact", (req, res)=>{
    res.send("Contact fomr submit")
});

app.use("/api/products", productRoute);
app.use("/api/users", auth, userRoute);
app.use("/api/auth", authRoute);

app.listen(config.port, (req, res)=> {
    console.log(`Server started at ${config.port} port.`);
});