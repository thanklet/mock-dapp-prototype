import z from "zod";

const profileSchema = z.object({
  name: z.string().trim().min(1, { message: "This field is required" }),
  // NOTE: 編集用のUIがないため、バリデーションは実装しない
  image_path: z.string(),
  thanks: z.number(),
  email: z.string(),
});

type ProfileSchema = z.infer<typeof profileSchema>;

export { profileSchema, type ProfileSchema };
