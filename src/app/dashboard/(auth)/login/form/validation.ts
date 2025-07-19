import { z } from "zod";

export const formSchema = z.object({
    email: z.string({required_error: "Email cannot be empty!"}).email({message: 'Invalid Email'}),
    password: z.string({required_error: "Password cannot be empty!"}).min(8, {message: 'Password must have atleast 8 characters'})
})