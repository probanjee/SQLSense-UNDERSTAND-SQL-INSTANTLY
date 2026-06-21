export function getOptimizationTips(ast: any): string[] {
  const tips: string[] = [];

  // 1. SELECT *
  let hasSelectAll = false;
  if (ast.columns) {
    if (Array.isArray(ast.columns)) {
      for (const col of ast.columns) {
        if (col.expr && col.expr.type === "column_ref" && col.expr.column === "*") {
          hasSelectAll = true;
          break;
        }
      }
    } else if (ast.columns === "*") {
      hasSelectAll = true;
    }
  }

  if (hasSelectAll) {
    tips.push("Avoid using 'SELECT *'. Specify explicit column names to reduce network payload and improve query performance.");
  }

  // 2. JOINs
  if (ast.from && Array.isArray(ast.from)) {
    const mainTable = ast.from[0]?.table || "primary table";
    for (const fromItem of ast.from) {
      if (fromItem.join) {
        // Suggest LEFT vs INNER JOIN check
        if (fromItem.join.toUpperCase().includes("LEFT")) {
          tips.push(`Verify if ${fromItem.join} on '${fromItem.table}' is required. If all matching records are guaranteed to exist, an INNER JOIN is more performant.`);
        }
        // Suggest indexes on join keys
        if (fromItem.on && fromItem.on.type === "binary_expr" && fromItem.on.operator === "=") {
          const left = fromItem.on.left;
          const right = fromItem.on.right;
          if (left && left.type === "column_ref" && right && right.type === "column_ref") {
            const leftTable = left.table || mainTable;
            const rightTable = right.table || fromItem.table;
            tips.push(`Add an index on '${leftTable}.${left.column}' and '${rightTable}.${right.column}' to speed up the JOIN execution.`);
          }
        }
      }
    }
  }

  // 3. WHERE clause indexes
  if (ast.where) {
    const whereColumns: string[] = [];
    function collectColumns(expr: any) {
      if (!expr) return;
      if (expr.type === "column_ref") {
        const tbl = expr.table ? `${expr.table}.` : "";
        whereColumns.push(`${tbl}${expr.column}`);
      }
      if (expr.left) collectColumns(expr.left);
      if (expr.right) collectColumns(expr.right);
    }
    collectColumns(ast.where);
    if (whereColumns.length > 0) {
      const uniqueCols = [...new Set(whereColumns)];
      tips.push(`Consider adding indexes on columns used in the WHERE filters: ${uniqueCols.map(c => `'${c}'`).join(", ")}.`);
    }
  }

  // 4. LIMIT
  if (!ast.limit) {
    tips.push("Consider adding a LIMIT clause if you only need a subset of the results, preventing large memory overhead on the database server.");
  }

  // 5. HAVING
  if (ast.having) {
    tips.push("Ensure the HAVING clause is only used to filter aggregated functions (e.g. COUNT, SUM). Row-level filters should be moved to the WHERE clause for better performance.");
  }

  // Fallback defaults
  if (tips.length === 0) {
    tips.push("Monitor query execution plan (using EXPLAIN) to check for sequential scans.");
    tips.push("Ensure statistics on the target tables are up to date.");
  }

  return tips;
}
