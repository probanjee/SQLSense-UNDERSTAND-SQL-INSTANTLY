import { ComplexityLevel } from "./types";

export interface ComplexityResult {
  level: ComplexityLevel;
  reason: string;
}

export function determineComplexity(ast: any): ComplexityResult {
  let hasJoin = false;
  let joinCount = 0;
  let hasGroupBy = false;
  let hasHaving = false;
  let hasAggregate = false;
  let hasSubquery = false;
  let hasWindowFunction = false;

  // 1. Check FROM clause (Joins, Subqueries)
  if (ast.from && Array.isArray(ast.from)) {
    for (const fromItem of ast.from) {
      if (fromItem.join) {
        hasJoin = true;
        joinCount++;
      }
      if (fromItem.expr && fromItem.expr.type === "select") {
        hasSubquery = true;
      }
    }
  }

  // 2. Check columns (Aggregate functions, Window functions, Subqueries)
  if (ast.columns && Array.isArray(ast.columns)) {
    for (const col of ast.columns) {
      if (col.expr) {
        if (col.expr.type === "aggr_func") {
          hasAggregate = true;
          if (col.expr.over) {
            hasWindowFunction = true;
          }
        }
        if (col.expr.type === "select") {
          hasSubquery = true;
        }
      }
    }
  }

  // 3. Check GROUP BY and HAVING
  if (ast.groupby) {
    hasGroupBy = true;
  }
  if (ast.having) {
    hasHaving = true;
  }

  // Helper to recursively check expressions for subqueries
  function checkExpressionForSubquery(expr: any): boolean {
    if (!expr) return false;
    if (expr.type === "select") return true;
    if (expr.left && checkExpressionForSubquery(expr.left)) return true;
    if (expr.right && checkExpressionForSubquery(expr.right)) return true;
    if (expr.args) {
      if (Array.isArray(expr.args)) {
        for (const arg of expr.args) {
          if (checkExpressionForSubquery(arg)) return true;
        }
      } else if (expr.args.expr) {
        if (checkExpressionForSubquery(expr.args.expr)) return true;
      }
    }
    return false;
  }

  if (ast.where && checkExpressionForSubquery(ast.where)) {
    hasSubquery = true;
  }

  // Determine Level
  if (hasWindowFunction || hasSubquery || joinCount > 1) {
    let reason = "This query is Advanced because it contains ";
    const parts: string[] = [];
    if (hasWindowFunction) parts.push("window functions");
    if (hasSubquery) parts.push("subqueries");
    if (joinCount > 1) parts.push(`multiple (${joinCount}) JOINs`);
    reason += parts.join(", ") + ".";
    return { level: "ADVANCED", reason };
  }

  if (hasJoin || hasGroupBy || hasHaving || hasAggregate) {
    let reason = "This query is Intermediate because it involves ";
    const parts: string[] = [];
    if (hasJoin) parts.push("a table JOIN");
    if (hasGroupBy) parts.push("grouping (GROUP BY)");
    if (hasHaving) parts.push("having clause filtering (HAVING)");
    if (hasAggregate) parts.push("aggregation functions");
    reason += parts.join(", ") + ".";
    return { level: "INTERMEDIATE", reason };
  }

  return {
    level: "SIMPLE",
    reason: "This query is Simple because it performs a basic selection with optional filters or ordering, without joins or aggregation.",
  };
}
