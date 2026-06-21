import pkg from "node-sql-parser";
const { Parser } = pkg;

export function parseSql(query: string): any {
  const parser = new Parser();
  
  // Remove trailing semicolons and trim
  const cleanQuery = query.trim().replace(/;+$/, "");

  let ast: any;
  try {
    ast = parser.astify(cleanQuery);
  } catch (err: any) {
    throw new Error(`Syntax Error: ${err.message || "Invalid SQL query structure"}`);
  }

  // Handle multiple queries
  if (Array.isArray(ast)) {
    if (ast.length > 1) {
      throw new Error("Multiple Queries: Please analyze one SELECT query at a time.");
    }
    ast = ast[0];
  }

  if (!ast) {
    throw new Error("Invalid Query: Unable to parse SQL query structure.");
  }

  // Only allow SELECT queries
  if (ast.type !== "select") {
    throw new Error("Unsupported Query Type: Only SELECT queries are supported.");
  }

  return ast;
}
