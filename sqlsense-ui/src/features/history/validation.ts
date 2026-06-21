import { z } from "zod";

export const savedQuerySchema = z.object({
  query_text: z.string().trim().min(1, "Query text cannot be empty").max(5000),
  explanation: z
    .string()
    .trim()
    .min(1, "Explanation cannot be empty")
    .max(20000),
  complexity: z.enum(["SIMPLE", "INTERMEDIATE", "ADVANCED"]),
  optimization_tips: z.array(z.string().trim().min(1).max(500)).max(25),
}).strict();

export const savedQueryIdSchema = z.string().uuid("Invalid saved query ID");
