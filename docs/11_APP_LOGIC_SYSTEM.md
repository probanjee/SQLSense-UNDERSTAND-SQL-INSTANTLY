# SQLSense — App Logic System

**Version:** 1.0.0  
**Last Updated:** 2026-06-21  
**Author:** Prosun Banerjee  
**Contact:** prosunbanerjee8@gmail.com  
**Status:** Approved

---

## Purpose

This document defines the core business logic and algorithms that power SQLSense's analysis engine. It details how SQL queries are parsed, how explanations are generated, how complexity is scored, how optimization suggestions are derived, and how the query flow is constructed. This is the intellectual core of the application.

**Related Documents:**
- [09_COMPONENT_ARCHITECTURE.md](./09_COMPONENT_ARCHITECTURE.md)
- [08_SYSTEM_ARCHITECTURE.md](./08_SYSTEM_ARCHITECTURE.md)
- [04_PRD.md](./04_PRD.md)

---

## 1. SQL Parsing Pipeline

### 1.1 Pipeline Overview

```
User SQL Input
      │
      ▼
┌─────────────────┐
│ 1. Sanitize     │  DOMPurify: strip any HTML/script tags
│    Input        │
└────────┬────────┘
         │
┌────────▼────────┐
│ 2. Validate     │  Zod: check length, non-empty, string type
│    Input        │
└────────┬────────┘
         │
┌────────▼────────┐
│ 3. Parse SQL    │  node-sql-parser: SQL string → AST
│    to AST       │
└────────┬────────┘
         │ (on error → return ParseError)
         │
┌────────▼────────┐
│ 4. Generate     │  Walk AST → build plain-English sentences
│    Explanation  │
└────────┬────────┘
         │
┌────────▼────────┐
│ 5. Extract      │  Walk AST → identify each clause
│    Clauses      │
└────────┬────────┘
         │
┌────────▼────────┐
│ 6. Score        │  Count operations, depth, features → score 1-10
│    Complexity   │
└────────┬────────┘
         │
┌────────▼────────┐
│ 7. Generate     │  Pattern matching on AST → tip list
│    Optimization │
│    Tips         │
└────────┬────────┘
         │
┌────────▼────────┐
│ 8. Build Query  │  Map SQL logical execution order → flow steps
│    Flow         │
└────────┬────────┘
         │
         ▼
   AnalysisResult
```

### 1.2 Input Validation Schema

```typescript
import { z } from 'zod';

export const sqlInputSchema = z.object({
  query: z
    .string()
    .min(1, 'Please enter a SQL query to analyze')
    .max(5000, 'Query exceeds the maximum length of 5,000 characters')
    .trim(),
});
```

---

## 2. Explanation Generation Engine

### 2.1 Explanation Algorithm

The explanation engine walks the AST produced by `node-sql-parser` and generates natural language by mapping each AST node type to a sentence template.

```typescript
function generateExplanation(ast: AST): string {
  const parts: string[] = [];
  
  // 1. Determine query type
  parts.push(getQueryTypeDescription(ast.type)); // "This query selects data..."
  
  // 2. Describe what is selected
  if (ast.columns) {
    parts.push(describeColumns(ast.columns));
  }
  
  // 3. Describe data source
  if (ast.from) {
    parts.push(describeFrom(ast.from));
  }
  
  // 4. Describe filters
  if (ast.where) {
    parts.push(describeWhere(ast.where));
  }
  
  // 5. Describe joins
  if (ast.from?.some(f => f.join)) {
    parts.push(describeJoins(ast.from));
  }
  
  // 6. Describe grouping
  if (ast.groupby) {
    parts.push(describeGroupBy(ast.groupby));
  }
  
  // 7. Describe having
  if (ast.having) {
    parts.push(describeHaving(ast.having));
  }
  
  // 8. Describe ordering
  if (ast.orderby) {
    parts.push(describeOrderBy(ast.orderby));
  }
  
  // 9. Describe limit
  if (ast.limit) {
    parts.push(describeLimit(ast.limit));
  }
  
  return parts.join(' ');
}
```

### 2.2 Sentence Templates

| AST Feature | Template | Example Output |
|---|---|---|
| `SELECT *` | "This query retrieves all columns" | "This query retrieves all columns" |
| `SELECT col1, col2` | "This query retrieves {columns}" | "This query retrieves the name and email columns" |
| `SELECT COUNT(*)` | "This query counts the total number of rows" | "This query counts the total number of rows" |
| `SELECT col AS alias` | "This query retrieves {col} (labeled as {alias})" | "This query retrieves the name column (labeled as user_name)" |
| `FROM table` | "from the {table} table" | "from the users table" |
| `FROM t1 JOIN t2` | "by joining the {t1} and {t2} tables" | "by joining the users and orders tables" |
| `WHERE condition` | "where {condition}" | "where the status is 'active'" |
| `WHERE col > val` | "filtering for rows where {col} is greater than {val}" | "filtering for rows where age is greater than 18" |
| `GROUP BY col` | "grouped by {col}" | "grouped by department" |
| `HAVING condition` | "keeping only groups where {condition}" | "keeping only groups where the count exceeds 5" |
| `ORDER BY col ASC` | "sorted by {col} in ascending order" | "sorted by created_at in ascending order" |
| `ORDER BY col DESC` | "sorted by {col} in descending order" | "sorted by price in descending order" |
| `LIMIT n` | "limited to the first {n} results" | "limited to the first 10 results" |
| `INNER JOIN` | "matching rows from both {t1} and {t2}" | "matching rows from both users and orders" |
| `LEFT JOIN` | "all rows from {t1} with matching rows from {t2} (if any)" | "all rows from users with matching rows from orders (if any)" |

### 2.3 Aggregate Function Descriptions

| Function | Template |
|---|---|
| `COUNT(*)` | "counts the total number of rows" |
| `COUNT(col)` | "counts the number of non-null {col} values" |
| `SUM(col)` | "calculates the sum of {col}" |
| `AVG(col)` | "calculates the average of {col}" |
| `MAX(col)` | "finds the maximum value of {col}" |
| `MIN(col)` | "finds the minimum value of {col}" |
| `COUNT(DISTINCT col)` | "counts the number of unique {col} values" |

---

## 3. Clause Breakdown Engine

### 3.1 Clause Extraction Algorithm

```typescript
function extractClauses(ast: AST): ClauseBreakdown[] {
  const clauses: ClauseBreakdown[] = [];
  
  // Extract in SQL logical execution order
  if (ast.from) {
    clauses.push({
      type: 'FROM',
      sql: reconstructFromClause(ast.from),
      explanation: explainFromClause(ast.from),
    });
  }
  
  // Extract JOINs (part of FROM but displayed separately)
  if (ast.from?.filter(f => f.join)) {
    ast.from.filter(f => f.join).forEach(join => {
      clauses.push({
        type: `${join.join} JOIN`,
        sql: reconstructJoinClause(join),
        explanation: explainJoinClause(join),
      });
    });
  }
  
  if (ast.where) {
    clauses.push({
      type: 'WHERE',
      sql: reconstructWhereClause(ast.where),
      explanation: explainWhereClause(ast.where),
    });
  }
  
  if (ast.groupby) {
    clauses.push({
      type: 'GROUP BY',
      sql: reconstructGroupByClause(ast.groupby),
      explanation: explainGroupByClause(ast.groupby),
    });
  }
  
  if (ast.having) {
    clauses.push({
      type: 'HAVING',
      sql: reconstructHavingClause(ast.having),
      explanation: explainHavingClause(ast.having),
    });
  }
  
  // SELECT comes after WHERE/GROUP BY in logical order but first in SQL syntax
  if (ast.columns) {
    clauses.push({
      type: 'SELECT',
      sql: reconstructSelectClause(ast.columns),
      explanation: explainSelectClause(ast.columns),
    });
  }
  
  if (ast.orderby) {
    clauses.push({
      type: 'ORDER BY',
      sql: reconstructOrderByClause(ast.orderby),
      explanation: explainOrderByClause(ast.orderby),
    });
  }
  
  if (ast.limit) {
    clauses.push({
      type: 'LIMIT',
      sql: reconstructLimitClause(ast.limit),
      explanation: explainLimitClause(ast.limit),
    });
  }
  
  return clauses;
}
```

---

## 4. Complexity Scoring Algorithm

### 4.1 Scoring Model

Complexity is scored on a 1–10 scale based on weighted feature counts:

```typescript
interface ComplexityFactors {
  baseScore: number;         // Starting score
  tableCount: number;        // Number of tables referenced
  joinCount: number;         // Number of JOIN operations
  subqueryCount: number;     // Number of subqueries
  cteCount: number;          // Number of CTEs (WITH clauses)
  windowFunctionCount: number; // Number of window functions
  aggregateCount: number;    // Number of aggregate functions
  conditionCount: number;    // Number of WHERE/HAVING conditions
  nestingDepth: number;      // Maximum nesting depth of subqueries
  unionCount: number;        // Number of UNION/INTERSECT/EXCEPT
  hasGroupBy: boolean;
  hasHaving: boolean;
  hasOrderBy: boolean;
  hasLimit: boolean;
  hasDistinct: boolean;
  hasCaseWhen: boolean;
  hasExists: boolean;
}

function calculateComplexity(factors: ComplexityFactors): ComplexityResult {
  let score = 1; // Base score
  
  // Table complexity
  score += Math.min(factors.tableCount - 1, 2) * 0.5;
  
  // Join complexity (most impactful)
  score += factors.joinCount * 1.0;
  
  // Subquery complexity (highly impactful)
  score += factors.subqueryCount * 1.5;
  
  // CTE complexity
  score += factors.cteCount * 1.0;
  
  // Window function complexity
  score += factors.windowFunctionCount * 1.5;
  
  // Aggregate complexity
  score += factors.aggregateCount * 0.5;
  
  // Condition complexity
  score += Math.min(factors.conditionCount, 5) * 0.3;
  
  // Nesting depth
  score += factors.nestingDepth * 1.0;
  
  // UNION complexity
  score += factors.unionCount * 1.0;
  
  // Boolean features
  if (factors.hasGroupBy) score += 0.5;
  if (factors.hasHaving) score += 0.5;
  if (factors.hasDistinct) score += 0.3;
  if (factors.hasCaseWhen) score += 0.5;
  if (factors.hasExists) score += 0.5;
  
  // Clamp to 1-10
  score = Math.max(1, Math.min(10, Math.round(score)));
  
  // Classify
  const label = classifyComplexity(score);
  
  // Generate factors list
  const contributingFactors = getContributingFactors(factors);
  
  return { score, label, factors: contributingFactors };
}

function classifyComplexity(score: number): string {
  if (score <= 3) return 'Simple';
  if (score <= 6) return 'Moderate';
  if (score <= 8) return 'Complex';
  return 'Expert';
}
```

### 4.2 Complexity Examples

| Query | Score | Label | Key Factors |
|---|---|---|---|
| `SELECT * FROM users` | 1 | Simple | Single table, no conditions |
| `SELECT name FROM users WHERE active = true` | 2 | Simple | Single table, one condition |
| `SELECT u.name, COUNT(o.id) FROM users u JOIN orders o ON u.id = o.user_id GROUP BY u.name` | 5 | Moderate | 1 JOIN, 1 aggregate, GROUP BY |
| `SELECT * FROM orders WHERE user_id IN (SELECT id FROM users WHERE status = 'active')` | 5 | Moderate | 1 subquery, 2 conditions |
| `WITH active_users AS (...) SELECT ... FROM active_users JOIN ... GROUP BY ... HAVING ... ORDER BY ...` | 7 | Complex | CTE, JOIN, GROUP BY, HAVING |
| `SELECT *, ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) FROM emp JOIN dept ... WHERE EXISTS (...)` | 9 | Expert | Window function, JOIN, EXISTS, subquery |

---

## 5. Optimization Suggestion Engine

### 5.1 Pattern-Based Rules

```typescript
interface OptimizationRule {
  id: string;
  name: string;
  detect: (ast: AST) => boolean;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
}

const optimizationRules: OptimizationRule[] = [
  {
    id: 'OPT-001',
    name: 'avoid-select-star',
    detect: (ast) => ast.columns === '*',
    severity: 'warning',
    title: 'Avoid SELECT *',
    description: 'Specify only the columns you need. SELECT * retrieves all columns, which increases I/O, network transfer, and memory usage. It also makes the query fragile if the table schema changes.',
  },
  {
    id: 'OPT-002',
    name: 'missing-where-clause',
    detect: (ast) => !ast.where && ast.from?.length > 0,
    severity: 'info',
    title: 'Consider Adding a WHERE Clause',
    description: 'This query has no WHERE clause, meaning it processes all rows in the table. If the table is large, consider adding filters to reduce the result set.',
  },
  {
    id: 'OPT-003',
    name: 'subquery-to-join',
    detect: (ast) => hasCorrelatedSubquery(ast),
    severity: 'warning',
    title: 'Consider Rewriting Subquery as JOIN',
    description: 'Correlated subqueries execute once per outer row, which can be slow on large tables. Consider rewriting as a JOIN for better performance.',
  },
  {
    id: 'OPT-004',
    name: 'index-suggestion',
    detect: (ast) => hasWhereOnNonPrimaryKey(ast),
    severity: 'info',
    title: 'Consider Adding an Index',
    description: 'The WHERE clause filters on columns that may benefit from an index. Ensure the filtered columns are indexed for optimal query performance.',
  },
  {
    id: 'OPT-005',
    name: 'unnecessary-distinct',
    detect: (ast) => ast.distinct && !hasGroupBy(ast),
    severity: 'info',
    title: 'Review DISTINCT Usage',
    description: 'DISTINCT forces the database to sort and deduplicate results. If your data is already unique (e.g., querying by primary key), DISTINCT is unnecessary overhead.',
  },
  {
    id: 'OPT-006',
    name: 'limit-without-order',
    detect: (ast) => ast.limit && !ast.orderby,
    severity: 'warning',
    title: 'LIMIT Without ORDER BY',
    description: 'Using LIMIT without ORDER BY returns an arbitrary subset of rows. The results may vary between executions. Add ORDER BY to get deterministic results.',
  },
  {
    id: 'OPT-007',
    name: 'inefficient-or',
    detect: (ast) => hasMultipleOrConditions(ast),
    severity: 'info',
    title: 'Consider Using IN Instead of Multiple OR',
    description: 'Multiple OR conditions on the same column (e.g., col = 1 OR col = 2 OR col = 3) can be rewritten as col IN (1, 2, 3) for cleaner and potentially faster execution.',
  },
  {
    id: 'OPT-008',
    name: 'cartesian-product',
    detect: (ast) => hasCartesianProduct(ast),
    severity: 'critical',
    title: 'Potential Cartesian Product Detected',
    description: 'Multiple tables in FROM without a JOIN condition creates a Cartesian product (cross join), which multiplies the number of rows. This is almost always unintentional and can crash the database.',
  },
  {
    id: 'OPT-009',
    name: 'function-in-where',
    detect: (ast) => hasFunctionInWhere(ast),
    severity: 'warning',
    title: 'Avoid Functions on Columns in WHERE',
    description: 'Applying functions to columns in WHERE (e.g., WHERE YEAR(date) = 2024) prevents index usage. Consider rewriting to use the column directly (e.g., WHERE date >= \'2024-01-01\').',
  },
  {
    id: 'OPT-010',
    name: 'no-optimization-needed',
    detect: (ast) => true, // fallback
    severity: 'info',
    title: 'Query Looks Good',
    description: 'No significant optimization opportunities were detected. The query follows good SQL practices.',
  },
];
```

### 5.2 Rule Execution

```typescript
function generateOptimizationTips(ast: AST): OptimizationTip[] {
  const tips: OptimizationTip[] = [];
  
  for (const rule of optimizationRules) {
    if (rule.id === 'OPT-010') continue; // Skip fallback initially
    
    if (rule.detect(ast)) {
      tips.push({
        id: rule.id,
        title: rule.title,
        description: rule.description,
        severity: rule.severity,
      });
    }
  }
  
  // If no tips generated, show the "looks good" message
  if (tips.length === 0) {
    tips.push({
      id: 'OPT-010',
      title: 'Query Looks Good',
      description: 'No significant optimization opportunities were detected.',
      severity: 'info',
    });
  }
  
  // Sort by severity: critical > warning > info
  return tips.sort((a, b) => {
    const order = { critical: 0, warning: 1, info: 2 };
    return order[a.severity] - order[b.severity];
  });
}
```

---

## 6. Query Flow Generation

### 6.1 SQL Logical Execution Order

SQL does NOT execute in the order it's written. The logical execution order is:

```
Written Order          Logical Execution Order
─────────────          ──────────────────────
1. SELECT              1. FROM / JOIN
2. FROM                2. WHERE
3. WHERE               3. GROUP BY
4. GROUP BY            4. HAVING
5. HAVING              5. SELECT
6. ORDER BY            6. DISTINCT
7. LIMIT               7. ORDER BY
                       8. LIMIT / OFFSET
```

### 6.2 Flow Generation Algorithm

```typescript
function generateQueryFlow(ast: AST): QueryFlowStep[] {
  const steps: QueryFlowStep[] = [];
  let order = 1;
  
  // Step 1: FROM (data source)
  if (ast.from) {
    steps.push({
      order: order++,
      operation: 'FROM',
      description: `Load data from ${describeTablesForFlow(ast.from)}`,
    });
  }
  
  // Step 2: JOIN (if present)
  const joins = ast.from?.filter(f => f.join);
  if (joins?.length) {
    joins.forEach(join => {
      steps.push({
        order: order++,
        operation: `${join.join} JOIN`,
        description: `Combine with ${join.table} on ${describeJoinCondition(join.on)}`,
      });
    });
  }
  
  // Step 3: WHERE (filter rows)
  if (ast.where) {
    steps.push({
      order: order++,
      operation: 'WHERE',
      description: `Filter rows where ${describeConditionForFlow(ast.where)}`,
    });
  }
  
  // Step 4: GROUP BY (aggregate)
  if (ast.groupby) {
    steps.push({
      order: order++,
      operation: 'GROUP BY',
      description: `Group rows by ${describeColumnsForFlow(ast.groupby)}`,
    });
  }
  
  // Step 5: HAVING (filter groups)
  if (ast.having) {
    steps.push({
      order: order++,
      operation: 'HAVING',
      description: `Keep groups where ${describeConditionForFlow(ast.having)}`,
    });
  }
  
  // Step 6: SELECT (choose columns)
  steps.push({
    order: order++,
    operation: 'SELECT',
    description: ast.columns === '*'
      ? 'Select all columns from the result'
      : `Select ${describeColumnsForFlow(ast.columns)}`,
  });
  
  // Step 7: DISTINCT (if present)
  if (ast.distinct) {
    steps.push({
      order: order++,
      operation: 'DISTINCT',
      description: 'Remove duplicate rows from the result',
    });
  }
  
  // Step 8: ORDER BY (sort)
  if (ast.orderby) {
    steps.push({
      order: order++,
      operation: 'ORDER BY',
      description: `Sort results by ${describeOrderByForFlow(ast.orderby)}`,
    });
  }
  
  // Step 9: LIMIT (restrict output)
  if (ast.limit) {
    steps.push({
      order: order++,
      operation: 'LIMIT',
      description: `Return only the first ${ast.limit.value} rows`,
    });
  }
  
  return steps;
}
```

---

## 7. Example Queries Library

### 7.1 Beginner Examples

| ID | Title | SQL | Complexity |
|---|---|---|---|
| EX-B01 | Basic Select | `SELECT name, email FROM users;` | 1 |
| EX-B02 | Select with Filter | `SELECT * FROM products WHERE price > 50;` | 2 |
| EX-B03 | Sort Results | `SELECT name, age FROM employees ORDER BY age DESC;` | 2 |
| EX-B04 | Limit Results | `SELECT title, rating FROM movies ORDER BY rating DESC LIMIT 10;` | 2 |
| EX-B05 | Count Rows | `SELECT COUNT(*) AS total_users FROM users WHERE active = true;` | 2 |

### 7.2 Intermediate Examples

| ID | Title | SQL | Complexity |
|---|---|---|---|
| EX-I01 | Inner Join | `SELECT u.name, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id;` | 4 |
| EX-I02 | Group and Count | `SELECT department, COUNT(*) AS employee_count FROM employees GROUP BY department HAVING COUNT(*) > 5;` | 5 |
| EX-I03 | Subquery Filter | `SELECT name FROM products WHERE category_id IN (SELECT id FROM categories WHERE name = 'Electronics');` | 5 |
| EX-I04 | Left Join with Aggregate | `SELECT u.name, COALESCE(SUM(o.total), 0) AS lifetime_value FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.name ORDER BY lifetime_value DESC;` | 6 |
| EX-I05 | Multiple Conditions | `SELECT * FROM orders WHERE status = 'shipped' AND total > 100 AND created_at >= '2024-01-01' ORDER BY created_at DESC LIMIT 20;` | 3 |

### 7.3 Advanced Examples

| ID | Title | SQL | Complexity |
|---|---|---|---|
| EX-A01 | CTE with Aggregation | `WITH monthly_sales AS (SELECT DATE_TRUNC('month', order_date) AS month, SUM(total) AS revenue FROM orders GROUP BY month) SELECT month, revenue FROM monthly_sales WHERE revenue > 10000 ORDER BY month;` | 7 |
| EX-A02 | Window Function | `SELECT name, department, salary, RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank FROM employees;` | 7 |
| EX-A03 | Correlated Subquery | `SELECT e.name, e.salary FROM employees e WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE department = e.department);` | 8 |
| EX-A04 | Multiple Joins with CTE | `WITH active_customers AS (SELECT id, name FROM customers WHERE status = 'active') SELECT ac.name, p.name AS product, oi.quantity FROM active_customers ac JOIN orders o ON ac.id = o.customer_id JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id WHERE o.order_date >= '2024-01-01';` | 9 |

---

## 8. Error Handling Logic

### 8.1 Parse Error Handling

```typescript
function analyzeQuery(sql: string): AnalysisResult | ParseError {
  // Step 1: Validate input
  const validation = sqlInputSchema.safeParse({ query: sql });
  if (!validation.success) {
    return {
      type: 'validation_error',
      message: validation.error.errors[0].message,
    };
  }
  
  // Step 2: Sanitize
  const sanitizedSQL = DOMPurify.sanitize(sql, { ALLOWED_TAGS: [] });
  
  // Step 3: Parse
  try {
    const parser = new Parser();
    const ast = parser.astify(sanitizedSQL);
    
    if (Array.isArray(ast)) {
      // Multiple statements — analyze first one, warn about rest
      return analyzeAST(ast[0], ast.length > 1);
    }
    
    return analyzeAST(ast, false);
  } catch (error) {
    return {
      type: 'parse_error',
      message: 'Could not parse this SQL query. Please check the syntax and try again.',
      details: error instanceof Error ? error.message : 'Unknown parsing error',
    };
  }
}
```

### 8.2 Unsupported Feature Handling

```typescript
function handleUnsupportedFeatures(ast: AST): string[] {
  const warnings: string[] = [];
  
  // Check for features we can parse but not fully explain
  if (hasRecursiveCTE(ast)) {
    warnings.push('Recursive CTEs are parsed but explanation may be simplified.');
  }
  
  if (hasPivotUnpivot(ast)) {
    warnings.push('PIVOT/UNPIVOT operations are not fully supported for explanation.');
  }
  
  if (hasMerge(ast)) {
    warnings.push('MERGE statements are parsed but explanation may be simplified.');
  }
  
  return warnings;
}
```

---

## 9. Dialect Detection Logic

```typescript
function detectDialect(sql: string): string {
  const dialectIndicators: Record<string, string[]> = {
    mysql: ['LIMIT', 'AUTO_INCREMENT', 'IFNULL', 'GROUP_CONCAT', 'SHOW'],
    postgresql: ['RETURNING', 'ILIKE', 'SERIAL', 'COALESCE', '::'],
    sqlite: ['AUTOINCREMENT', 'GLOB', 'TYPEOF'],
    transactsql: ['TOP', 'NOLOCK', 'IDENTITY', 'GETDATE', 'ISNULL'],
  };
  
  const upperSQL = sql.toUpperCase();
  const scores: Record<string, number> = {};
  
  for (const [dialect, keywords] of Object.entries(dialectIndicators)) {
    scores[dialect] = keywords.filter(kw => upperSQL.includes(kw)).length;
  }
  
  const detected = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return detected[1] > 0 ? detected[0] : 'mysql'; // Default to MySQL
}
```

---

## 10. Implementation Notes

### 10.1 Performance Considerations

- **All parsing is client-side.** No network latency for the core feature.
- **AST generation** via `node-sql-parser` is typically < 10ms for queries up to 5000 characters.
- **Explanation generation** is synchronous string concatenation — negligible cost.
- **Complexity scoring** is a single pass over the AST — O(n) where n is the number of AST nodes.

### 10.2 Testability

Every function in the logic system should be:
- Pure (no side effects, no external state)
- Deterministic (same input always produces same output)
- Unit-testable with simple input/output assertions

### 10.3 Extensibility

The rule-based system is designed for easy extension:
- **New explanation templates:** Add a new case to the switch/map in the explanation engine.
- **New optimization rules:** Add a new object to the `optimizationRules` array.
- **New dialect support:** Add keywords to the `dialectIndicators` map.
- **New complexity factors:** Add a new field to `ComplexityFactors` and update the scoring formula.

---

*This document defines the intellectual core of SQLSense. The algorithms and logic described here should be implemented as pure, testable functions in the `src/lib/parser/` directory.*
