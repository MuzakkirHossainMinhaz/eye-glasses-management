import { z } from "zod";

// Zod schema for create the eye-glasses model
const createEyeGlassSchema = z.object({
    // Define the properties of the eye-glasses model
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    price: z
        .number({
            required_error: "Price is required",
            invalid_type_error: "Price must be a number",
        })
        .min(1, {
            message: "Price must be greater than or equal to 1",
        }),
    quantity: z
        .number({
            required_error: "Quantity is required",
            invalid_type_error: "Quantity must be a number",
        })
        .min(1, {
            message: "Quantity must be greater than or equal to 1",
        }),
    frameMaterial: z.enum(
        [
            "metal",
            "plastic",
            "wood",
            "silicone",
            "leather",
            "acetate",
            "carbon-fiber",
            "other",
        ],
        {
            required_error: "Frame Material is required",
            invalid_type_error: "Frame Material must be a string",
        },
    ),
    frameColor: z.enum(["black", "white", "blue", "red", "green", "other"], {
        required_error: "Frame Color is required",
        invalid_type_error: "Frame Color must be a string",
    }),
    frameShape: z.enum(
        [
            "rimless",
            "oval",
            "circle",
            "rectangle",
            "square",
            "round",
            "cat-eye",
            "heart",
            "triangle",
            "butterfly",
            "other",
        ],
        {
            required_error: "Frame Shape is required",
            invalid_type_error: "Frame Shape must be a string",
        },
    ),
    lensType: z.enum(
        [
            "single-vision",
            "bifocal",
            "trifocal",
            "progressive",
            "uv-protective",
            "aspheric",
            "polarized",
            "other",
        ],
        {
            required_error: "Lens Type is required",
            invalid_type_error: "Lens Type must be a string",
        },
    ),
    brand: z.enum(
        ["ray-ban", "oakley", "prada", "gucci", "dior", "coach", "other"],
        {
            required_error: "Brand is required",
            invalid_type_error: "Brand must be a string",
        },
    ),
    gender: z.enum(["male", "female"], {
        required_error: "Gender is required",
        invalid_type_error: "Gender must be a string",
    }),
    color: z.string({
        required_error: "Color is required",
        invalid_type_error: "Color must be a string",
    }),
    createdBy: z.string({
        required_error: "Created By is required",
        invalid_type_error: "Created By must be a string",
    }),
});

// Zod schema for update the eye-glasses model
const updateEyeGlassSchema = z.object({
    // Define the properties of the eye-glasses model
    name: z
        .string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        })
        .optional(),
    price: z
        .number({
            required_error: "Price is required",
            invalid_type_error: "Price must be a number",
        })
        .min(1, {
            message: "Price must be greater than or equal to 1",
        })
        .optional(),
    quantity: z
        .number({
            required_error: "Quantity is required",
            invalid_type_error: "Quantity must be a number",
        })
        .min(1, {
            message: "Quantity must be greater than or equal to 1",
        })
        .optional(),
    frameMaterial: z
        .enum(
            [
                "metal",
                "plastic",
                "wood",
                "silicone",
                "leather",
                "acetate",
                "carbon-fiber",
                "other",
            ],
            {
                required_error: "Frame Material is required",
                invalid_type_error: "Frame Material must be a string",
            },
        )
        .optional(),
    frameColor: z
        .enum(["black", "white", "blue", "red", "green", "other"], {
            required_error: "Frame Color is required",
            invalid_type_error: "Frame Color must be a string",
        })
        .optional(),
    frameShape: z
        .enum(
            [
                "rimless",
                "oval",
                "circle",
                "rectangle",
                "square",
                "round",
                "cat-eye",
                "heart",
                "triangle",
                "butterfly",
                "other",
            ],
            {
                required_error: "Frame Shape is required",
                invalid_type_error: "Frame Shape must be a string",
            },
        )
        .optional(),
    lensType: z
        .enum(
            [
                "single-vision",
                "bifocal",
                "trifocal",
                "progressive",
                "uv-protective",
                "aspheric",
                "polarized",
                "other",
            ],
            {
                required_error: "Lens Type is required",
                invalid_type_error: "Lens Type must be a string",
            },
        )
        .optional(),
    brand: z
        .enum(
            ["ray-ban", "oakley", "prada", "gucci", "dior", "coach", "other"],
            {
                required_error: "Brand is required",
                invalid_type_error: "Brand must be a string",
            },
        )
        .optional(),
    gender: z
        .enum(["male", "female"], {
            required_error: "Gender is required",
            invalid_type_error: "Gender must be a string",
        })
        .optional(),
    color: z
        .string({
            required_error: "Color is required",
            invalid_type_error: "Color must be a string",
        })
        .optional(),
    createdBy: z
        .string({
            required_error: "Created By is required",
            invalid_type_error: "Created By must be a string",
        })
        .optional(),
});

// Export the Zod schema for use in your application
export const eyeGlassValidationSchemas = {
    createEyeGlassSchema,
    updateEyeGlassSchema,
};
