import z, { maxLength, minLength, regex } from 'zod';
import { emailRegex } from "../../constants/regex.js";
import { userSchema } from './user.schema.js';


export const loginSchema = z.object({
    email: z.string({error: "Email is required"}).regex(emailRegex, {error:"Invalide email"}).optional(), 

    phone: z.string({error:"Phone Number is required"}),

    password: z.string(),
})
.refine(data=> data.email || data.phone, {
    message: "Either email or phone is requried",
    path: ["email"],          //path to highlight the error
});

export const registerScheme = userSchema;