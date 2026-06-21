"use client";

import { useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { Copy, ArrowRight, TrendingUp, Zap } from "lucide-react";

export default function Home() {
  const [sqlQuery, setSqlQuery] = useState(`SELECT u.name,
COUNT(o.id)
FROM users u
LEFT JOIN orders o
ON u.id = o.user_id
GROUP BY u.name;`);

  const [showExplanation, setShowExplanation] = useState(true);

  const breakdownData = [
    {
      clause: "SELECT u.name, COUNT(o.id)",
      meaning: "Retrieves user names and counts their orders",
    },
    { clause: "FROM users u", meaning: "Main table: users, aliased as u" },
    {
      clause: "LEFT JOIN orders o",
      meaning: "Joins orders table, keeping all users even without orders",
    },
    {
      clause: "ON u.id = o.user_id",
      meaning: "Join condition: match user ID with order user_id",
    },
    {
      clause: "GROUP BY u.name",
      meaning: "Groups results by user name for aggregation",
    },
  ];

  const optimizationTips = [
    "Add index on users.id for faster joins",
    "Consider filtering before aggregation for large datasets",
    "Verify that LEFT JOIN is necessary vs INNER JOIN",
    "Monitor query execution plan for sequential scans",
  ];

  const queryFlow = [
    "users table",
    "↓",
    "LEFT JOIN orders",
    "↓",
    "GROUP BY u.name",
    "↓",
    "COUNT aggregation",
    "↓",
    "Result set",
  ];

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
                onClick={() => setShowExplanation(!showExplanation)}
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
                  onClick={() => setShowExplanation(!showExplanation)}
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
                  onClick={() => setSqlQuery("")}
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
          </div>
        </div>
      </section>

      {/* Explanation Section */}
      {showExplanation && (
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
                  This query retrieves each user's name and counts the number of
                  orders associated with that user. It uses a LEFT JOIN to
                  ensure all users are included in the results, even those
                  without any orders. The results are grouped by user name to
                  aggregate the order counts.
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
                    {breakdownData.map((row, idx) => (
                      <tr
                        key={idx}
                        className={
                          idx < breakdownData.length - 1
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
                    INTERMEDIATE
                  </p>
                  <p className="text-sm text-muted-foreground">
                    This query involves joins and aggregation, making it
                    moderately complex.
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
                  <p className="text-4xl font-bold text-secondary mb-2">92%</p>
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
                  {optimizationTips.map((tip, idx) => (
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
                  {queryFlow.map((step, idx) => (
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
