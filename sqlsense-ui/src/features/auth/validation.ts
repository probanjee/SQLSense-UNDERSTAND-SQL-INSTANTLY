import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .email("Please enter a valid email address.")
  .max(254, "Email is too long.");

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required.").max(72),
});

export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Full name must be at least 2 characters.")
      .max(100, "Full name is too long."),
    email: emailSchema,
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(72, "Password must be 72 characters or fewer."),
    confirmPassword: z.string().min(1, "Please confirm your password.").max(72),
    terms: z.boolean().refine(value => value, {
      message: "You must agree to the Terms of Service and Privacy Policy.",
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export function getFirstValidationMessage(error: z.ZodError): string {
  return error.issues[0]?.message || "Please check the form and try again.";
}

export function getSafeAuthErrorMessage(
  error: unknown,
  fallback: string,
): string {
  const message = error instanceof Error ? error.message.toLowerCase() : "";

  if (message.includes("invalid login credentials")) {
    return "Invalid email or password.";
  }
  if (message.includes("email not confirmed")) {
    return "Please verify your email before signing in.";
  }
  if (message.includes("already registered") || message.includes("already exists")) {
    return "An account with this email already exists.";
  }
  if (message.includes("rate limit") || message.includes("too many")) {
    return "Too many attempts. Please wait and try again.";
  }
  if (message.includes("fetch") || message.includes("network")) {
    return "Connection error. Please check your internet connection.";
  }

  return fallback;
}
