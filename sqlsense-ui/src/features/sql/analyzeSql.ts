import { sqlQuerySchema } from "./validation";
import { parseSql } from "./parser";
import { determineComplexity } from "./complexity";
import { getOptimizationTips } from "./optimizer";
import { getQueryFlow } from "./flow";
import { generateExplanationAndBreakdown } from "./explainer";
import { AnalysisResult } from "./types";

export function analyzeSql(query: string): AnalysisResult {
  // 1. Validate query input size and emptiness
  const validation = sqlQuerySchema.safeParse(query);
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || "Invalid SQL query input.",
    };
  }

  const validatedQuery = validation.data;

  try {
    // 2. Parse SQL query into AST using node-sql-parser
    const ast = parseSql(validatedQuery);

    // 3. Compute Query Complexity (SIMPLE, INTERMEDIATE, ADVANCED)
    const complexityResult = determineComplexity(ast);

    // 4. Generate Optimization Tips
    const optimizationTips = getOptimizationTips(ast);

    // 5. Generate Query Flow Steps
    const flowSteps = getQueryFlow(ast);

    // 6. Generate Plain-English Explanation & Clause Breakdowns
    const { explanation, breakdown } = generateExplanationAndBreakdown(ast);

    // Confidence level: standard estimation based on parsing success
    const confidence = complexityResult.level === "ADVANCED" ? 90 : 95;

    return {
      success: true,
      query: validatedQuery,
      explanation,
      breakdown,
      complexity: complexityResult.level,
      complexityReason: complexityResult.reason,
      confidence,
      optimizationTips,
      flowSteps,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "An unexpected error occurred during SQL analysis.",
    };
  }
}
