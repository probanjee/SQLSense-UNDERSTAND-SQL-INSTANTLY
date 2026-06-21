"use client";

import Link from "next/link";
import Layout from "@/components/Layout";
import { Copy } from "lucide-react";

export default function Examples() {
  const examples = {
    beginner: [
      {
        id: 1,
        title: "Simple SELECT",
        query: "SELECT * FROM users;",
        explanation: "Retrieves all columns and rows from the users table.",
      },
      {
        id: 2,
        title: "SELECT with WHERE",
        query: "SELECT name, email FROM users WHERE age > 18;",
        explanation: "Retrieves names and emails of users older than 18 years.",
      },
      {
        id: 3,
        title: "ORDER BY",
        query: "SELECT * FROM products ORDER BY price DESC;",
        explanation: "Lists all products sorted by price in descending order.",
      },
    ],
    intermediate: [
      {
        id: 4,
        title: "INNER JOIN",
        query:
          "SELECT u.name, o.order_id FROM users u INNER JOIN orders o ON u.id = o.user_id;",
        explanation:
          "Joins users and orders tables to show user names with their order IDs.",
      },
      {
        id: 5,
        title: "GROUP BY with COUNT",
        query: "SELECT category, COUNT(*) FROM products GROUP BY category;",
        explanation: "Counts products in each category by grouping results.",
      },
      {
        id: 6,
        title: "LEFT JOIN with Aggregation",
        query:
          "SELECT u.name, COUNT(o.id) FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.name;",
        explanation:
          "Shows each user and their order count, including users with no orders.",
      },
    ],
    advanced: [
      {
        id: 7,
        title: "Subquery with IN",
        query:
          "SELECT * FROM users WHERE id IN (SELECT user_id FROM orders WHERE total > 1000);",
        explanation:
          "Finds users who have placed orders totaling more than 1000.",
      },
      {
        id: 8,
        title: "Multiple JOINs with Aggregation",
        query:
          "SELECT u.name, COUNT(o.id) as order_count, SUM(o.total) as total_spent FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.id HAVING COUNT(o.id) > 5;",
        explanation:
          "Shows users with more than 5 orders and their total spending.",
      },
      {
        id: 9,
        title: "Window Function",
        query:
          "SELECT name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) as rank FROM employees;",
        explanation: "Ranks employees by salary without grouping results.",
      },
    ],
  };

  const ExampleCard = ({
    example,
  }: {
    example: (typeof examples.beginner)[0];
  }) => (
    <div
      className="border-4 border-black bg-white p-6"
      style={{ boxShadow: "8px 8px 0px #111111" }}
    >
      <h4 className="font-bold text-lg uppercase mb-4">{example.title}</h4>
      <div className="bg-gray-100 border-2 border-gray-200 p-4 mb-4 overflow-x-auto">
        <code className="text-xs font-mono">{example.query}</code>
      </div>
      <p className="text-sm mb-4 text-gray-700">{example.explanation}</p>
      <button
        className="border-4 border-black bg-white text-black font-bold uppercase text-xs px-4 py-2 transition-transform duration-150 ease-out w-full cursor-pointer"
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
        <Copy className="inline w-4 h-4 mr-2" />
        COPY QUERY
      </button>
    </div>
  );

  return (
    <Layout currentPage="/examples">
      <div className="bg-gray-50 py-16 md:py-24 lg:py-32">
        <div className="container">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              SQL EXAMPLES
            </h1>
            <p className="text-lg text-muted-foreground">
              Learn SQL by exploring real-world query examples
            </p>
          </div>

          {/* Beginner Examples */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 pb-4 border-b-4 border-black">
              BEGINNER
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {examples.beginner.map(example => (
                <ExampleCard key={example.id} example={example} />
              ))}
            </div>
          </section>

          {/* Intermediate Examples */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 pb-4 border-b-4 border-black">
              INTERMEDIATE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {examples.intermediate.map(example => (
                <ExampleCard key={example.id} example={example} />
              ))}
            </div>
          </section>

          {/* Advanced Examples */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 pb-4 border-b-4 border-black">
              ADVANCED
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {examples.advanced.map(example => (
                <ExampleCard key={example.id} example={example} />
              ))}
            </div>
          </section>

          {/* CTA */}
          <section
            className="bg-primary text-white p-8 border-4 border-black"
            style={{ boxShadow: "8px 8px 0px #111111" }}
          >
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                READY TO ANALYZE YOUR OWN QUERIES?
              </h3>
              <p className="mb-6 opacity-90">
                Start explaining your SQL queries and master database
                optimization.
              </p>
              <Link
                href="/"
                className="inline-block border-4 border-white bg-white text-primary font-bold uppercase text-sm px-8 py-3 transition-transform duration-150 ease-out cursor-pointer"
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
                GO TO EXPLAINER
              </Link>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
