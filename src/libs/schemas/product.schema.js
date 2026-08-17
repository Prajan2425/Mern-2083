import z, { maxLength, minLength } from 'zod';

export const productSchema = z.object({
    name: z.string().check(minLength(3), maxLength(50)),
    brand: z.string(),
    category:z.string(),
    price: z.number(minLength(1), maxLength(1000000000)),
    stock: z.number().default(1),
});