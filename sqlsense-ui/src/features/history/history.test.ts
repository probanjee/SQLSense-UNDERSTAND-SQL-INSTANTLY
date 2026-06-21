import { describe, it, expect, vi, beforeEach } from "vitest";
import { savedQuerySchema } from "./validation";
import { fetchSavedQueries, saveQuery, deleteSavedQuery } from "./historyService";
import { supabase } from "@/lib/supabase/client";

// Mock Supabase client
vi.mock("@/lib/supabase/client", () => {
  const mockFrom = vi.fn();
  return {
    supabase: {
      from: mockFrom,
    },
  };
});

describe("Query History and Validation", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("Validation Schema (savedQuerySchema)", () => {
    it("should validate a correct saved query payload", () => {
      const payload = {
        query_text: "SELECT * FROM users",
        explanation: "Retrieves all users",
        complexity: "SIMPLE",
        optimization_tips: ["Add limit"],
      };

      const result = savedQuerySchema.safeParse(payload);
      expect(result.success).toBe(true);
    });

    it("should fail validation if query_text is empty", () => {
      const payload = {
        query_text: "",
        explanation: "Retrieves all users",
        complexity: "SIMPLE",
        optimization_tips: [],
      };

      const result = savedQuerySchema.safeParse(payload);
      expect(result.success).toBe(false);
    });

    it("should fail validation if complexity is invalid", () => {
      const payload = {
        query_text: "SELECT * FROM users",
        explanation: "Retrieves all users",
        complexity: "VERY_HARD",
        optimization_tips: [],
      };

      const result = savedQuerySchema.safeParse(payload);
      expect(result.success).toBe(false);
    });
  });

  describe("History Service Database Operations", () => {
    it("should fetch saved queries correctly", async () => {
      const mockQueries = [
        {
          id: "1",
          user_id: "u1",
          query_text: "SELECT * FROM users",
          explanation: "Retrieves all users",
          complexity: "SIMPLE",
          optimization_tips: [],
          created_at: "2026-06-21T12:00:00Z",
        },
      ];

      const mockChain = {
        select: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({ data: mockQueries, error: null }),
      };

      (supabase.from as any).mockReturnValue(mockChain);

      const result = await fetchSavedQueries();
      expect(supabase.from).toHaveBeenCalledWith("saved_queries");
      expect(mockChain.select).toHaveBeenCalledWith("*");
      expect(mockChain.order).toHaveBeenCalledWith("created_at", { ascending: false });
      expect(result).toEqual(mockQueries);
    });

    it("should save a valid query explanation", async () => {
      const payload = {
        query_text: "SELECT * FROM users",
        explanation: "Retrieves all users",
        complexity: "SIMPLE" as const,
        optimization_tips: ["Add index"],
      };

      const mockSaved = {
        id: "2",
        user_id: "u1",
        ...payload,
        created_at: "2026-06-21T12:05:00Z",
      };

      const mockChain = {
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockResolvedValue({ data: [mockSaved], error: null }),
      };

      (supabase.from as any).mockReturnValue(mockChain);

      const result = await saveQuery(payload);
      expect(supabase.from).toHaveBeenCalledWith("saved_queries");
      expect(mockChain.insert).toHaveBeenCalledWith([
        {
          query_text: payload.query_text,
          explanation: payload.explanation,
          complexity: "Simple",
          optimization_tips: payload.optimization_tips,
        },
      ]);
      expect(result).toEqual(mockSaved);
    });

    it("should throw validation error when saving invalid payload shape", async () => {
      const invalidPayload = {
        query_text: "",
        explanation: "Retrieves all users",
        complexity: "SIMPLE" as const,
        optimization_tips: [],
      };

      await expect(saveQuery(invalidPayload)).rejects.toThrow("Validation Error");
    });

    it("should delete query by ID", async () => {
      const mockChain = {
        delete: vi.fn().mockReturnThis(),
        eq: vi.fn().mockResolvedValue({ error: null }),
      };

      (supabase.from as any).mockReturnValue(mockChain);

      const queryId = "123e4567-e89b-12d3-a456-426614174000";
      await deleteSavedQuery(queryId);
      expect(supabase.from).toHaveBeenCalledWith("saved_queries");
      expect(mockChain.delete).toHaveBeenCalled();
      expect(mockChain.eq).toHaveBeenCalledWith("id", queryId);
    });

    it("should reject an invalid query ID before deletion", async () => {
      await expect(deleteSavedQuery("not-a-uuid")).rejects.toThrow(
        "Invalid saved query ID",
      );
    });
  });
});
