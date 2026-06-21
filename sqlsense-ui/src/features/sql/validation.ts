import { z } from "zod";

export const sqlQuerySchema = z
  .string()
  .trim()
  .min(1, "SQL query cannot be empty")
  .max(5000, "SQL query is too long (maximum 5000 characters for analysis)");
