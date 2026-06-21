import { describe, it, expect } from "vitest";
import { analyzeSql } from "./analyzeSql";

describe("SQLSense Explanation Engine", () => {
  it("should analyze a simple SELECT query", () => {
    const query = "SELECT * FROM users;";
    const result = analyzeSql(query);
    expect(result.success).toBe(true);
    expect(result.complexity).toBe("SIMPLE");
    expect(result.explanation).toContain("retrieves all columns");
  });

  it("should analyze a SELECT with WHERE query", () => {
    const query = "SELECT name, email FROM users WHERE age > 18;";
    const result = analyzeSql(query);
    expect(result.success).toBe(true);
    expect(result.complexity).toBe("SIMPLE");
    expect(result.explanation).toContain("filters the records to keep only those where age > 18");
    expect(result.breakdown?.some(b => b.clause.startsWith("WHERE"))).toBe(true);
  });

  it("should analyze a JOIN query", () => {
    const query = "SELECT u.name, o.id FROM users u INNER JOIN orders o ON u.id = o.user_id;";
    const result = analyzeSql(query);
    expect(result.success).toBe(true);
    expect(result.complexity).toBe("INTERMEDIATE");
    expect(result.explanation).toContain("joins the 'orders' table (aliased as 'o') using a INNER JOIN");
  });

  it("should analyze a GROUP BY query with aggregates", () => {
    const query = "SELECT category, COUNT(*) FROM products GROUP BY category;";
    const result = analyzeSql(query);
    expect(result.success).toBe(true);
    expect(result.complexity).toBe("INTERMEDIATE");
    expect(result.explanation).toContain("grouped by category to perform aggregate calculations");
  });

  it("should handle invalid SQL gracefully", () => {
    const query = "SELECT * FROM TABLE users WHERE;";
    const result = analyzeSql(query);
    expect(result.success).toBe(false);
    expect(result.error).toContain("Syntax Error");
  });
});
