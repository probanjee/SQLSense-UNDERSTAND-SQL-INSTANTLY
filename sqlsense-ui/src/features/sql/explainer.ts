import { ClauseBreakdown } from "./types";

export function generateExplanationAndBreakdown(ast: any): {
  explanation: string;
  breakdown: ClauseBreakdown[];
} {
  const breakdown: ClauseBreakdown[] = [];
  const narrativeParts: string[] = [];

  // Helper to rebuild SQL snippets from AST nodes
  function exprToSql(expr: any): string {
    if (!expr) return "";
    if (expr.type === "column_ref") {
      return expr.table ? `${expr.table}.${expr.column}` : expr.column;
    }
    if (expr.type === "number") {
      return String(expr.value);
    }
    if (expr.type === "string") {
      return `'${expr.value}'`;
    }
    if (expr.type === "aggr_func") {
      const argsStr = expr.args ? exprToSql(expr.args.expr || expr.args) : "*";
      const distinctStr = expr.args && expr.args.distinct ? "DISTINCT " : "";
      return `${expr.name}(${distinctStr}${argsStr})`;
    }
    if (expr.type === "binary_expr") {
      return `${exprToSql(expr.left)} ${expr.operator} ${exprToSql(expr.right)}`;
    }
    if (expr.type === "select") {
      return "(SUBQUERY)";
    }
    return "";
  }

  // 1. FROM clause
  let mainTable = "";
  if (ast.from && Array.isArray(ast.from) && ast.from[0]) {
    const mainItem = ast.from[0];
    mainTable = mainItem.table;
    const alias = mainItem.as ? ` ${mainItem.as}` : "";
    const clauseText = `FROM ${mainTable}${alias}`;
    const aliasText = mainItem.as ? ` (aliased as '${mainItem.as}')` : "";
    
    breakdown.push({
      clause: clauseText,
      meaning: `Specifies the primary source table '${mainTable}'${aliasText} to query from.`,
    });
    
    narrativeParts.push(`This query retrieves records from the '${mainTable}' table${aliasText}.`);
  }

  // 2. JOIN clauses
  if (ast.from && Array.isArray(ast.from)) {
    for (let i = 1; i < ast.from.length; i++) {
      const joinItem = ast.from[i];
      if (joinItem.join) {
        const alias = joinItem.as ? ` ${joinItem.as}` : "";
        const condText = joinItem.on ? ` ON ${exprToSql(joinItem.on)}` : "";
        const clauseText = `${joinItem.join} ${joinItem.table}${alias}${condText}`;
        const aliasText = joinItem.as ? ` (aliased as '${joinItem.as}')` : "";
        const joinType = joinItem.join.toUpperCase();
        
        breakdown.push({
          clause: clauseText,
          meaning: `Performs a ${joinType} with table '${joinItem.table}'${aliasText}${joinItem.on ? ` matching rows where ${exprToSql(joinItem.on)}` : ""}.`,
        });

        narrativeParts.push(`It joins the '${joinItem.table}' table${aliasText} using a ${joinType} based on the condition ${joinItem.on ? exprToSql(joinItem.on) : "matching columns"}.`);
      }
    }
  }

  // 3. WHERE clause
  if (ast.where) {
    const condText = exprToSql(ast.where);
    breakdown.push({
      clause: `WHERE ${condText}`,
      meaning: `Filters the rows, keeping only those that satisfy the condition: ${condText}.`,
    });
    narrativeParts.push(`It filters the records to keep only those where ${condText}.`);
  }

  // 4. GROUP BY clause
  if (ast.groupby) {
    const cols = ast.groupby.columns.map((c: any) => exprToSql(c)).join(", ");
    breakdown.push({
      clause: `GROUP BY ${cols}`,
      meaning: `Groups the resulting rows by: ${cols} to perform aggregations on each group.`,
    });
    narrativeParts.push(`The rows are then grouped by ${cols} to perform aggregate calculations.`);
  }

  // 5. HAVING clause
  if (ast.having) {
    const condText = exprToSql(ast.having);
    breakdown.push({
      clause: `HAVING ${condText}`,
      meaning: `Filters the grouped results, retaining only groups that satisfy: ${condText}.`,
    });
    narrativeParts.push(`It applies a post-aggregation filter to keep only groups where ${condText}.`);
  }

  // 6. SELECT clause
  if (ast.columns) {
    const selectCols: string[] = [];
    const selectMeanings: string[] = [];
    
    if (Array.isArray(ast.columns)) {
      for (const col of ast.columns) {
        const colStr = exprToSql(col.expr);
        const colAlias = col.as ? ` AS ${col.as}` : "";
        selectCols.push(`${colStr}${colAlias}`);
        
        const aliasText = col.as ? ` (renamed to '${col.as}')` : "";
        if (col.expr.type === "aggr_func") {
          const fn = col.expr.name.toUpperCase();
          const arg = col.expr.args ? exprToSql(col.expr.args.expr || col.expr.args) : "*";
          selectMeanings.push(`computes the ${fn} of ${arg}${aliasText}`);
        } else if (col.expr.type === "column_ref" && col.expr.column === "*") {
          selectMeanings.push("retrieves all columns");
        } else {
          selectMeanings.push(`retrieves the column '${colStr}'${aliasText}`);
        }
      }
    } else if (ast.columns === "*") {
      selectCols.push("*");
      selectMeanings.push("retrieves all columns");
    }

    const clauseText = `SELECT ${selectCols.join(", ")}`;
    breakdown.unshift({
      clause: clauseText,
      meaning: `Selects the output columns: ${selectMeanings.join(" and ")}.`,
    });
    
    narrativeParts.push(`Finally, it selects and returns: ${selectMeanings.join(", ")}.`);
  }

  // 7. ORDER BY clause
  if (ast.orderby) {
    const orderItems = ast.orderby.map((o: any) => {
      const colStr = exprToSql(o.expr);
      const dir = o.type || "ASC";
      return `${colStr} ${dir}`;
    });
    breakdown.push({
      clause: `ORDER BY ${orderItems.join(", ")}`,
      meaning: `Sorts the final result set by: ${orderItems.join(", ")}.`,
    });
    narrativeParts.push(`The final output is sorted by ${orderItems.join(", ")}.`);
  }

  // 8. LIMIT clause
  if (ast.limit) {
    const limitVal = ast.limit.value?.[0]?.value || "";
    breakdown.push({
      clause: `LIMIT ${limitVal}`,
      meaning: `Restricts the maximum number of returned rows to ${limitVal}.`,
    });
    narrativeParts.push(`It limits the result set to a maximum of ${limitVal} records.`);
  }

  const explanation = narrativeParts.join(" ");

  return { explanation, breakdown };
}
