import z from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field is required" })
    .email({ message: "Please enter a valid email" }),
  password: z.string().min(8, "Please enter at least 8 characters"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export { loginSchema, type LoginSchema };
