import z from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "This field is required" })
    .email({ message: "Please enter a valid email" }),
  password: z.string().min(8, "Please enter at least 8 characters"),
});

const signUpSchema = z
  .object({
    username: z.string().trim().min(1, { message: "This field is required" }),
    termsAndConditions: z.boolean(),
  })
  .merge(loginSchema);

type LoginSchema = z.infer<typeof loginSchema>;
type SignUpSchema = z.infer<typeof signUpSchema>;

export { loginSchema, signUpSchema, type LoginSchema, type SignUpSchema };
