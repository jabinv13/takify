import { z } from "zod";
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const registerSchema = z.object({
  name: z.string().min(1, "atleast one character required"),
  password: z.string().min(8, "Minimum 8 charcter required"),
  email: z.string().email(),
});
