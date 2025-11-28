import * as z from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "username must be min 3 characters")
    .max(15, "username must be max 15 characters"),

  email: z.string().email("invalid email address"),

  role: z
    .enum(["employer", "applicant", "admin"])
    .default("applicant"),

  phoneNumber: z
    .string()
    .min(10, "phone number must be at least 10 digits")
    .max(20, "invalid phone number")
    .optional(),

  password: z
    .string()
    .min(6, "password must be min 6 characters")
});


export const loginSchema = z.object({
  email: z.string().email('invalid email address'),
  password: z.string().min(6,'password must be min 6 characters')
})
