export interface ClauseBreakdown {
  clause: string;
  meaning: string;
}

export type ComplexityLevel = "SIMPLE" | "INTERMEDIATE" | "ADVANCED";

export interface AnalysisResult {
  success: boolean;
  error?: string;
  query?: string;
  explanation?: string;
  breakdown?: ClauseBreakdown[];
  complexity?: ComplexityLevel;
  complexityReason?: string;
  confidence?: number;
  optimizationTips?: string[];
  flowSteps?: string[];
}
