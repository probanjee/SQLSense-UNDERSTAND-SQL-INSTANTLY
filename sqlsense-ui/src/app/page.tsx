"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { Copy, ArrowRight, TrendingUp, Zap, AlertTriangle } from "lucide-react";
import { analyzeSql } from "@/features/sql/analyzeSql";

export default function Home() {
  const [sqlQuery, setSqlQuery] = useState(`SELECT u.name,
COUNT(o.id)
FROM users u
LEFT JOIN orders o
ON u.id = o.user_id
GROUP BY u.name;`);

  const [showExplanation, setShowExplanation] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const samples = [
    `SELECT u.name, COUNT(o.id)
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.name;`,
    `SELECT name, price FROM products WHERE price > 100 ORDER BY price DESC;`,
    `SELECT category, AVG(price) AS avg_price FROM products GROUP BY category HAVING AVG(price) > 50;`,
    `SELECT * FROM users WHERE age > 18 LIMIT 5;`
  ];

  const [sampleIdx, setSampleIdx] = useState(0);

  const handleExplain = (queryToUse?: string) => {
    setError(null);
    const query = queryToUse !== undefined ? queryToUse : sqlQuery;
    const result = analyzeSql(query);
    if (result.success) {
      setAnalysis(result);
      setShowExplanation(true);
    } else {
      setError(result.error || "An error occurred during parsing.");
      setShowExplanation(false);
    }
  };

  const handleSample = () => {
    const nextIdx = (sampleIdx + 1) % samples.length;
    setSampleIdx(nextIdx);
    const query = samples[nextIdx];
    setSqlQuery(query);
    handleExplain(query);
  };

  // Run initial explanation on default query on mount
  useEffect(() => {
    handleExplain();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout currentPage="/">
      {/* Hero Section */}
      <section className="bg-white border-b-4 border-black py-16 md:py-24 lg:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              UNDERSTAND SQL
              <br />
              INSTANTLY
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform complex SQL queries into clear human-readable
              explanations. Get instant insights into query structure,
              complexity, and optimization opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleExplain()}
                className="border-4 border-primary bg-primary text-white font-bold uppercase text-sm px-6 py-3 transition-transform duration-150 ease-out cursor-pointer"
                style={{ boxShadow: "8px 8px 0px #6D28D9" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "4px 4px 0px #6D28D9";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "8px 8px 0px #6D28D9";
                }}
              >
                EXPLAIN QUERY
              </button>
              <Link
                href="/examples"
                className="border-4 border-black bg-white text-black font-bold uppercase text-sm px-6 py-3 inline-block transition-transform duration-150 ease-out cursor-pointer"
                style={{ boxShadow: "8px 8px 0px #111111" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "4px 4px 0px #111111";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "8px 8px 0px #111111";
                }}
              >
                VIEW EXAMPLES
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SQL Editor Section */}
      <section className="bg-gray-50 py-16 md:py-24 lg:py-32 border-b-4 border-black">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">SQL EDITOR</h2>

            <div
              className="border-4 border-black bg-white p-6"
              style={{ boxShadow: "8px 8px 0px #111111" }}
            >
              <div className="mb-4">
                <label className="block text-sm font-bold uppercase mb-2">
                  Paste Your SQL Query
                </label>
                <textarea
                  value={sqlQuery}
                  onChange={e => setSqlQuery(e.target.value)}
                  className="border-4 border-black bg-white w-full h-40 p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="SELECT * FROM users WHERE..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleExplain()}
                  className="flex-1 border-4 border-primary bg-primary text-white font-bold uppercase text-sm px-6 py-3 transition-transform duration-150 ease-out cursor-pointer"
                  style={{ boxShadow: "8px 8px 0px #6D28D9" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "4px 4px 0px #6D28D9";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "8px 8px 0px #6D28D9";
                  }}
                >
                  EXPLAIN QUERY
                </button>
                <button
                  onClick={handleSample}
                  className="flex-1 border-4 border-black bg-white text-black font-bold uppercase text-sm px-6 py-3 transition-transform duration-150 ease-out cursor-pointer"
                  style={{ boxShadow: "8px 8px 0px #111111" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "4px 4px 0px #111111";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "8px 8px 0px #111111";
                  }}
                >
                  SAMPLE QUERIES
                </button>
                <button
                  onClick={() => { setSqlQuery(""); setError(null); }}
                  className="flex-1 border-4 border-black bg-white text-black font-bold uppercase text-sm px-6 py-3 transition-transform duration-150 ease-out cursor-pointer"
                  style={{ boxShadow: "8px 8px 0px #111111" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "4px 4px 0px #111111";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "8px 8px 0px #111111";
                  }}
                >
                  CLEAR
                </button>
              </div>
            </div>

            {error && (
              <div
                className="mt-6 border-4 border-red-500 bg-red-50 p-6"
                style={{ boxShadow: "8px 8px 0px #EF4444" }}
              >
                <div className="flex items-center gap-3 mb-2 text-red-700">
                  <AlertTriangle className="w-6 h-6 flex-shrink-0" />
                  <h3 className="font-bold text-lg uppercase">Query Parsing Error</h3>
                </div>
                <p className="font-mono text-sm text-red-600 bg-white p-3 border-2 border-red-200 break-words">
                  {error}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Explanation Section */}
      {showExplanation && analysis && (
        <section className="bg-white py-16 md:py-24 lg:py-32 border-b-4 border-black">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                EXPLANATION
              </h2>

              <div
                className="border-4 border-black bg-white p-8 mb-8"
                style={{ boxShadow: "8px 8px 0px #111111" }}
              >
                <p className="text-lg leading-relaxed">
                  {analysis.explanation}
                </p>
              </div>

              {/* Breakdown Table */}
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                CLAUSE BREAKDOWN
              </h3>
              <div
                className="border-4 border-black bg-white overflow-hidden mb-8"
                style={{ boxShadow: "8px 8px 0px #111111" }}
              >
                <table className="w-full">
                  <thead>
                    <tr className="border-b-4 border-black bg-gray-100">
                      <th className="px-6 py-4 text-left font-bold uppercase text-sm">
                        Clause
                      </th>
                      <th className="px-6 py-4 text-left font-bold uppercase text-sm">
                        Meaning
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.breakdown?.map((row: any, idx: number) => (
                      <tr
                        key={idx}
                        className={
                          idx < (analysis.breakdown.length - 1)
                            ? "border-b-2 border-gray-200"
                            : ""
                        }
                      >
                        <td className="px-6 py-4 font-mono text-sm text-primary font-semibold">
                          {row.clause}
                        </td>
                        <td className="px-6 py-4 text-sm">{row.meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Complexity Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div
                  className="border-4 border-black bg-white p-8"
                  style={{ boxShadow: "8px 8px 0px #111111" }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <TrendingUp className="w-8 h-8 text-primary" />
                    <h4 className="text-lg font-bold uppercase">Complexity</h4>
                  </div>
                  <p className="text-4xl font-bold text-primary mb-2">
                    {analysis.complexity}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {analysis.complexityReason}
                  </p>
                </div>

                <div
                  className="border-4 border-black bg-white p-8"
                  style={{ boxShadow: "8px 8px 0px #111111" }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Zap className="w-8 h-8 text-secondary" />
                    <h4 className="text-lg font-bold uppercase">Confidence</h4>
                  </div>
                  <p className="text-4xl font-bold text-secondary mb-2">{analysis.confidence}%</p>
                  <p className="text-sm text-muted-foreground">
                    High confidence in this analysis based on standard SQL
                    patterns.
                  </p>
                </div>
              </div>

              {/* Optimization Tips */}
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                OPTIMIZATION TIPS
              </h3>
              <div
                className="border-4 border-black bg-white p-8 mb-8"
                style={{ boxShadow: "8px 8px 0px #111111" }}
              >
                <ul className="space-y-4">
                  {analysis.optimizationTips?.map((tip: string, idx: number) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-primary text-white font-bold text-sm flex-shrink-0 mt-1">
                        {idx + 1}
                      </span>
                      <span className="text-base">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Query Flow Visualization */}
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                QUERY FLOW
              </h3>
              <div
                className="border-4 border-black bg-white p-8"
                style={{ boxShadow: "8px 8px 0px #111111" }}
              >
                <div className="flex flex-col items-center gap-4">
                  {analysis.flowSteps?.map((step: string, idx: number) => (
                    <div key={idx} className="text-center">
                      {idx > 0 && idx % 2 === 0 && (
                        <div className="text-3xl font-bold text-primary mb-4">
                          ↓
                        </div>
                      )}
                      {step === "↓" ? (
                        <div className="text-3xl font-bold text-primary">↓</div>
                      ) : (
                        <div className="bg-primary text-white px-6 py-3 font-bold uppercase text-sm border-2 border-primary">
                          {step}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-primary text-white py-16 md:py-24 lg:py-32 border-b-4 border-black">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              READY TO MASTER SQL?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Start explaining your queries now. Explore examples, learn best
              practices, and optimize your SQL skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="border-4 border-white bg-white text-primary font-bold uppercase text-sm px-8 py-3 transition-transform duration-150 ease-out cursor-pointer"
                style={{ boxShadow: "8px 8px 0px #FFFFFF" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "4px 4px 0px #FFFFFF";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "8px 8px 0px #FFFFFF";
                }}
              >
                START NOW
              </button>
              <Link
                href="/dashboard"
                className="border-4 border-white bg-transparent text-white font-bold uppercase text-sm px-8 py-3 inline-block transition-transform duration-150 ease-out hover:bg-white/10 cursor-pointer"
                style={{ boxShadow: "8px 8px 0px #FFFFFF" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "4px 4px 0px #FFFFFF";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "8px 8px 0px #FFFFFF";
                }}
              >
                VIEW DASHBOARD
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
