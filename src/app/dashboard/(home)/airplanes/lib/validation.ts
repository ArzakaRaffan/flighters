import { z } from "zod"

const ACCEPTED_IMAGES = ['image/jpg', 'image/jpeg', 'image/png']

const MAX_FILE_SIZE = 2000000; // 2 MB

export const airplaneFormSchema = z.object({
    name: z.string({
        required_error: "Airplane's name cannot be empty!"
    }).min(4, {message: "Airplane's name must contains atleast 4 characters!"}),
    code: z.string({
        required_error: "Airplane's code cannot be empty!"
    }).regex(/^[A-Z]{3}-[0-9]{3}$/, "Code format is [XXX-111]"),
    image: z.any().refine(
        (file: File) => ACCEPTED_IMAGES.includes(file.type),
        "Image should has .jpg, .jpeg, or .png extension"
    )
    .refine(
        (file: File) => file.size <= MAX_FILE_SIZE,
        "Max image to be uploaded is 2 MB"
    )
});