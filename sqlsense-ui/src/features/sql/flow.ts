export function getQueryFlow(ast: any): string[] {
  const steps: string[] = [];

  // 1. Primary Table (FROM)
  let mainTable = "primary table";
  if (ast.from && Array.isArray(ast.from) && ast.from[0]) {
    mainTable = ast.from[0].table;
    const alias = ast.from[0].as ? ` (${ast.from[0].as})` : "";
    steps.push(`FROM ${mainTable}${alias}`);
  } else {
    steps.push("FROM table");
  }

  // 2. JOINs
  if (ast.from && Array.isArray(ast.from)) {
    for (let i = 1; i < ast.from.length; i++) {
      const joinItem = ast.from[i];
      if (joinItem.join) {
        const alias = joinItem.as ? ` (${joinItem.as})` : "";
        steps.push(`${joinItem.join} ${joinItem.table}${alias}`);
      }
    }
  }

  // 3. WHERE Clause
  if (ast.where) {
    steps.push("FILTER ROWS (WHERE)");
  }

  // 4. GROUP BY Clause
  if (ast.groupby) {
    steps.push("GROUP ROWS (GROUP BY)");
  }

  // 5. HAVING Clause
  if (ast.having) {
    steps.push("FILTER GROUPS (HAVING)");
  }

  // 6. Aggregate calculation (if aggregates are in SELECT)
  let hasAggregate = false;
  if (ast.columns && Array.isArray(ast.columns)) {
    for (const col of ast.columns) {
      if (col.expr && col.expr.type === "aggr_func") {
        hasAggregate = true;
        break;
      }
    }
  }
  if (hasAggregate) {
    steps.push("COMPUTE AGGREGATES");
  }

  // 7. ORDER BY Clause
  if (ast.orderby) {
    steps.push("SORT RESULTS (ORDER BY)");
  }

  // 8. LIMIT Clause
  if (ast.limit) {
    steps.push("LIMIT RESULT SET");
  }

  // 9. Final Output
  steps.push("RETURN RESULT SET");

  // Interleave with down arrow "↓" to match the UI layout expectation
  const flow: string[] = [];
  for (let i = 0; i < steps.length; i++) {
    flow.push(steps[i]);
    if (i < steps.length - 1) {
      flow.push("↓");
    }
  }

  return flow;
}
