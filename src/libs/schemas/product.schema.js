import z, { maxLength, minLength } from 'zod';

export const productSchema = z.object({
    name: z.string().check(minLength(3), maxLength(50)),
    brand: z.string(),
    category:z.string(),
    price: z.coerce.number().min(1).max(1000000000),
    stock: z.coerce.number().default(1),
});