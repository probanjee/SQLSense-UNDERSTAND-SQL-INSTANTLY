"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import { Search, Trash2, Copy } from "lucide-react";

export default function History() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterComplexity, setFilterComplexity] = useState("all");

  const historyItems = [
    {
      id: 1,
      query:
        "SELECT u.name, COUNT(o.id) FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.name",
      complexity: "Intermediate",
      date: "2026-06-21",
      time: "14:32",
    },
    {
      id: 2,
      query:
        'SELECT * FROM products WHERE price > 100 AND category = "Electronics"',
      complexity: "Simple",
      date: "2026-06-21",
      time: "13:15",
    },
    {
      id: 3,
      query:
        'SELECT a.*, b.*, c.* FROM table_a a JOIN table_b b ON a.id = b.a_id JOIN table_c c ON b.id = c.b_id WHERE a.status = "active"',
      complexity: "Advanced",
      date: "2026-06-20",
      time: "11:42",
    },
    {
      id: 4,
      query:
        "SELECT DATE(created_at), COUNT(*) FROM orders GROUP BY DATE(created_at)",
      complexity: "Simple",
      date: "2026-06-20",
      time: "09:28",
    },
    {
      id: 5,
      query:
        "SELECT * FROM users WHERE id IN (SELECT user_id FROM orders WHERE total > 1000)",
      complexity: "Intermediate",
      date: "2026-06-19",
      time: "16:05",
    },
    {
      id: 6,
      query:
        "SELECT u.id, u.name, COUNT(DISTINCT o.id) as order_count, SUM(o.total) as total_spent FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.id, u.name HAVING COUNT(o.id) > 5 ORDER BY total_spent DESC",
      complexity: "Advanced",
      date: "2026-06-19",
      time: "14:20",
    },
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

  const filteredItems = historyItems.filter(item => {
    const matchesSearch = item.query
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesComplexity =
      filterComplexity === "all" || item.complexity === filterComplexity;
    return matchesSearch && matchesComplexity;
  });

  return (
    <Layout currentPage="/history">
      <div className="bg-gray-50 py-16 md:py-24 lg:py-32">
        <div className="container">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              QUERY HISTORY
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse and manage your analyzed queries
            </p>
          </div>

          {/* Search and Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Search */}
            <div
              className="border-4 border-black bg-white p-4 flex items-center gap-3"
              style={{ boxShadow: "8px 8px 0px #111111" }}
            >
              <Search
                size={20}
                className="text-muted-foreground flex-shrink-0"
              />
              <input
                type="text"
                placeholder="Search queries..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent outline-none text-base"
              />
            </div>

            {/* Filter */}
            <div
              className="border-4 border-black bg-white p-4"
              style={{ boxShadow: "8px 8px 0px #111111" }}
            >
              <select
                value={filterComplexity}
                onChange={e => setFilterComplexity(e.target.value)}
                className="w-full bg-transparent outline-none text-base font-semibold uppercase cursor-pointer"
              >
                <option value="all">All Complexities</option>
                <option value="Simple">Simple</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm font-semibold uppercase text-muted-foreground mb-6">
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "Query" : "Queries"} Found
          </p>

          {/* History List */}
          <div className="space-y-4">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <div
                  key={item.id}
                  className="border-4 border-black bg-white p-6"
                  style={{ boxShadow: "8px 8px 0px #111111" }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-start">
                    {/* Query */}
                    <div className="md:col-span-2">
                      <p className="text-xs font-bold uppercase text-muted-foreground mb-2">
                        Query
                      </p>
                      <code className="text-xs bg-gray-100 p-3 block overflow-x-auto border-2 border-gray-200 font-mono">
                        {item.query}
                      </code>
                    </div>

                    {/* Complexity */}
                    <div>
                      <p className="text-xs font-bold uppercase text-muted-foreground mb-2">
                        Complexity
                      </p>
                      <span
                        className={`border-2 px-3 py-2 font-bold text-xs uppercase block text-center ${getComplexityColor(item.complexity)}`}
                      >
                        {item.complexity}
                      </span>
                    </div>

                    {/* Date/Time */}
                    <div>
                      <p className="text-xs font-bold uppercase text-muted-foreground mb-2">
                        Date & Time
                      </p>
                      <div className="bg-gray-100 border-2 border-gray-200 p-2 text-center">
                        <p className="text-xs font-semibold">{item.date}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.time}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      className="flex-1 border-4 border-black bg-white text-black font-bold uppercase text-xs py-2 flex items-center justify-center gap-2 transition-transform duration-150 ease-out cursor-pointer"
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
                      <Copy size={16} />
                      COPY
                    </button>
                    <button
                      className="flex-1 border-4 border-black bg-white text-black font-bold uppercase text-xs py-2 flex items-center justify-center gap-2 transition-transform duration-150 ease-out cursor-pointer"
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
                      <Trash2 size={16} />
                      DELETE
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="border-4 border-black bg-white p-12 text-center"
                style={{ boxShadow: "8px 8px 0px #111111" }}
              >
                <p className="text-lg font-semibold mb-2">No queries found</p>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
