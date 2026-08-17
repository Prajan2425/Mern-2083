import express from "express";
import authController from "../controllers/auth.controller.js";
import validator from "../middlewares/validator.js";
import validate from "../middlewares/validator.js";
import { loginSchema, registerScheme } from "../libs/schemas/auth.schema.js";

const router = express.Router();

//Path: /api/auth/login
//Path: /api/auth/register

router.post("/register", validate(registerScheme),authController.register);

router.post("/login", validate(loginSchema), authController.login);

export default router;