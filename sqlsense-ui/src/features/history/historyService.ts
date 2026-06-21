import { supabase } from "@/lib/supabase/client";
import { savedQuerySchema } from "./validation";

export interface SavedQuery {
  id: string;
  user_id: string;
  query_text: string;
  explanation: string;
  complexity: "SIMPLE" | "INTERMEDIATE" | "ADVANCED";
  optimization_tips: string[];
  created_at: string;
}

export async function fetchSavedQueries(): Promise<SavedQuery[]> {
  const { data, error } = await supabase
    .from("saved_queries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch queries: ${error.message}`);
  }

  return (data || []) as SavedQuery[];
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
        complexity: parsed.data.complexity,
        optimization_tips: parsed.data.optimization_tips,
      },
    ])
    .select();

  if (error) {
    throw new Error(`Failed to save query: ${error.message}`);
  }

  if (!data || data.length === 0) {
    throw new Error("No data returned from save operation.");
  }

  return data[0] as SavedQuery;
}

export async function deleteSavedQuery(queryId: string): Promise<void> {
  const { error } = await supabase
    .from("saved_queries")
    .delete()
    .eq("id", queryId);

  if (error) {
    throw new Error(`Failed to delete query: ${error.message}`);
  }
}
