import { z } from "zod";

export const savedQuerySchema = z.object({
  query_text: z.string().min(1, "Query text cannot be empty").max(5000),
  explanation: z.string().min(1, "Explanation cannot be empty"),
  complexity: z.enum(["SIMPLE", "INTERMEDIATE", "ADVANCED"]),
  optimization_tips: z.array(z.string()),
});
