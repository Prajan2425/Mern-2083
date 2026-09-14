import jwt from "../utils/jwt.js";

const auth = (req, res, next) => {
    const cookie = req.headers.cookie;

    if (!cookie) {
        return res.status(401).send("User not authenticated");
    }

    const authCookie = cookie
        .split(";")
        .find(item => item.trim().startsWith("authToken="));

    if (!authCookie) {
        return res.status(401).send("User not authenticated");
    }

    const token = authCookie.split("=")[1];

    try {
        const data = jwt.verifyToken(token);

        req.user = data;

        console.log("AUTH USER:", req.user);

        next();
    } catch (error) {
        console.log("JWT ERROR:", error.message);
        return res.status(401).send("Invalid token");
    }
};

export default auth;