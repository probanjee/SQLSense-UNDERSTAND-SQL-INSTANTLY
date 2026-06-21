import { supabase } from "@/lib/supabase/client";
import { savedQueryIdSchema, savedQuerySchema } from "./validation";

export interface SavedQuery {
  id: string;
  user_id: string;
  query_text: string;
  explanation: string;
  complexity: "SIMPLE" | "INTERMEDIATE" | "ADVANCED";
  optimization_tips: string[];
  created_at: string;
}

const complexityLevels = ["SIMPLE", "INTERMEDIATE", "ADVANCED"] as const;

function toDatabaseComplexity(
  complexity: SavedQuery["complexity"],
): "Simple" | "Intermediate" | "Advanced" {
  return `${complexity.charAt(0)}${complexity.slice(1).toLowerCase()}` as
    | "Simple"
    | "Intermediate"
    | "Advanced";
}

function normalizeSavedQuery(row: Omit<SavedQuery, "complexity"> & {
  complexity: string;
}): SavedQuery {
  const complexity = row.complexity.toUpperCase();
  if (!complexityLevels.includes(complexity as SavedQuery["complexity"])) {
    throw new Error("Saved query data contains an invalid complexity value.");
  }

  return {
    ...row,
    complexity: complexity as SavedQuery["complexity"],
  };
}

export async function fetchSavedQueries(): Promise<SavedQuery[]> {
  const { data, error } = await supabase
    .from("saved_queries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Unable to load saved queries. Please try again.");
  }

  return ((data || []) as Array<
    Omit<SavedQuery, "complexity"> & { complexity: string }
  >).map(normalizeSavedQuery);
}

export async function saveQuery(payload: {
  query_text: string;
  explanation: string;
  complexity: "SIMPLE" | "INTERMEDIATE" | "ADVANCED";
  optimization_tips: string[];
}): Promise<SavedQuery> {
  // Validate data shape before database insertion
  const parsed = savedQuerySchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error(`Validation Error: ${parsed.error.issues[0]?.message || "Invalid payload structure"}`);
  }

  const { data, error } = await supabase
    .from("saved_queries")
    .insert([
      {
        query_text: parsed.data.query_text,
        explanation: parsed.data.explanation,
        complexity: toDatabaseComplexity(parsed.data.complexity),
        optimization_tips: parsed.data.optimization_tips,
      },
    ])
    .select();

  if (error) {
    throw new Error("Unable to save this query. Please try again.");
  }

  if (!data || data.length === 0) {
    throw new Error("No data returned from save operation.");
  }

  return normalizeSavedQuery(
    data[0] as Omit<SavedQuery, "complexity"> & { complexity: string },
  );
}

export async function deleteSavedQuery(queryId: string): Promise<void> {
  const parsedId = savedQueryIdSchema.safeParse(queryId);
  if (!parsedId.success) {
    throw new Error("Invalid saved query ID.");
  }

  const { error } = await supabase
    .from("saved_queries")
    .delete()
    .eq("id", parsedId.data);

  if (error) {
    throw new Error("Unable to delete this query. Please try again.");
  }
}
