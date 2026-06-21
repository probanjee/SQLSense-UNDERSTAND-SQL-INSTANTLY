"use client";

import Layout from "@/components/Layout";
import { BarChart3, Clock, Zap, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      label: "Queries Analyzed",
      value: "247",
      icon: BarChart3,
      color: "primary",
    },
    {
      label: "Average Complexity",
      value: "Intermediate",
      icon: TrendingUp,
      color: "secondary",
    },
    { label: "Optimization Tips", value: "1,203", icon: Zap, color: "primary" },
    { label: "Time Saved", value: "42 hrs", icon: Clock, color: "secondary" },
  ];

  const recentAnalyses = [
    {
      id: 1,
      query: "SELECT * FROM users WHERE created_at > NOW() - INTERVAL 7 DAY",
      complexity: "Simple",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      query:
        "SELECT u.id, COUNT(o.id) FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.id",
      complexity: "Intermediate",
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      query:
        "SELECT * FROM products WHERE category_id IN (SELECT id FROM categories WHERE active = 1)",
      complexity: "Intermediate",
      timestamp: "1 day ago",
    },
    {
      id: 4,
      query:
        "SELECT a.*, b.*, c.* FROM table_a a JOIN table_b b ON a.id = b.a_id JOIN table_c c ON b.id = c.b_id",
      complexity: "Advanced",
      timestamp: "2 days ago",
    },
  ];

  const savedQueries = [
    { title: "User Orders Summary", queries: 12 },
    { title: "Product Analytics", queries: 8 },
    { title: "Revenue Reports", queries: 15 },
  ];

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Simple":
        return "bg-green-100 text-green-900 border-green-900";
      case "Intermediate":
        return "bg-amber-100 text-amber-900 border-amber-900";
      case "Advanced":
        return "bg-red-100 text-red-900 border-red-900";
      default:
        return "bg-gray-100 text-gray-900 border-gray-900";
    }
  };

  return (
    <Layout currentPage="/dashboard">
      <div className="bg-gray-50 py-16 md:py-24 lg:py-32">
        <div className="container">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">DASHBOARD</h1>
            <p className="text-lg text-muted-foreground">
              Your SQL learning and analysis hub
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="border-4 border-black bg-white p-6"
                  style={{ boxShadow: "8px 8px 0px #111111" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Icon
                      className={`w-8 h-8 ${stat.color === "primary" ? "text-primary" : "text-secondary"}`}
                    />
                  </div>
                  <p className="text-sm font-semibold uppercase text-muted-foreground mb-2">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Analyses */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                RECENT ANALYSES
              </h2>
              <div className="space-y-4">
                {recentAnalyses.map(analysis => (
                  <div
                    key={analysis.id}
                    className="border-4 border-black bg-white p-6"
                    style={{ boxShadow: "8px 8px 0px #111111" }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <code className="text-xs md:text-sm bg-gray-100 p-3 flex-1 overflow-x-auto border-2 border-gray-200 font-mono">
                        {analysis.query}
                      </code>
                      <span
                        className={`border-2 px-3 py-1 font-bold text-xs uppercase whitespace-nowrap ${getComplexityColor(analysis.complexity)}`}
                      >
                        {analysis.complexity}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {analysis.timestamp}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Collections */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                SAVED COLLECTIONS
              </h2>
              <div className="space-y-4">
                {savedQueries.map((collection, idx) => (
                  <div
                    key={idx}
                    className="border-4 border-black bg-white p-6"
                    style={{ boxShadow: "8px 8px 0px #111111" }}
                  >
                    <h3 className="font-bold text-sm uppercase mb-2">
                      {collection.title}
                    </h3>
                    <p className="text-2xl font-bold text-primary mb-4">
                      {collection.queries}
                    </p>
                    <button
                      className="border-4 border-black bg-white text-black font-bold uppercase text-xs px-3 py-2 w-full transition-transform duration-150 ease-out cursor-pointer"
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
                      VIEW
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
