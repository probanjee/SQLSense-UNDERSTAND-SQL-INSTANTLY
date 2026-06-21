"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { BarChart3, Clock, Zap, TrendingUp } from "lucide-react";
import { useAuth } from "@/features/auth/AuthContext";
import { fetchSavedQueries, SavedQuery } from "@/features/history/historyService";
import { toast } from "sonner";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [queries, setQueries] = useState<SavedQuery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/sign-in");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadQueries();
    }
  }, [user]);

  const loadQueries = async () => {
    setLoading(true);
    try {
      const data = await fetchSavedQueries();
      setQueries(data);
    } catch (err: any) {
      toast.error(err.message || "Failed to load dashboard metrics.");
    } finally {
      setLoading(false);
    }
  };

  // 1. Calculations for stats
  const totalQueries = queries.length;

  // Mode of complexity
  const getAverageComplexity = () => {
    if (queries.length === 0) return "N/A";
    const counts: Record<string, number> = { SIMPLE: 0, INTERMEDIATE: 0, ADVANCED: 0 };
    queries.forEach(q => {
      const comp = (q.complexity || "").toUpperCase();
      if (counts[comp] !== undefined) {
        counts[comp]++;
      }
    });

    let maxKey = "SIMPLE";
    let maxVal = counts["SIMPLE"];
    if (counts["INTERMEDIATE"] > maxVal) {
      maxKey = "INTERMEDIATE";
      maxVal = counts["INTERMEDIATE"];
    }
    if (counts["ADVANCED"] > maxVal) {
      maxKey = "ADVANCED";
    }

    // Capitalize the result
    return maxKey.charAt(0) + maxKey.slice(1).toLowerCase();
  };

  // Optimization tips count
  const totalTips = queries.reduce((acc, q) => acc + (q.optimization_tips?.length || 0), 0);

  // Time saved estimation (e.g. 15 minutes / 0.25 hrs per query)
  const timeSavedHrs = totalQueries * 0.25;
  const timeSavedStr = timeSavedHrs === 0 ? "0 hrs" : `${timeSavedHrs.toFixed(1)} hrs`;

  const stats = [
    {
      label: "Queries Saved",
      value: String(totalQueries),
      icon: BarChart3,
      color: "primary",
    },
    {
      label: "Average Complexity",
      value: getAverageComplexity(),
      icon: TrendingUp,
      color: "secondary",
    },
    {
      label: "Optimization Tips",
      value: String(totalTips),
      icon: Zap,
      color: "primary",
    },
    {
      label: "Estimated Time Saved",
      value: timeSavedStr,
      icon: Clock,
      color: "secondary",
    },
  ];

  // Top 4 recent queries
  const recentAnalyses = queries.slice(0, 4);

  // Collections by complexity
  const simpleCount = queries.filter(q => (q.complexity || "").toUpperCase() === "SIMPLE").length;
  const intermediateCount = queries.filter(q => (q.complexity || "").toUpperCase() === "INTERMEDIATE").length;
  const advancedCount = queries.filter(q => (q.complexity || "").toUpperCase() === "ADVANCED").length;

  const savedCollections = [
    { title: "Simple Queries", count: simpleCount },
    { title: "Intermediate Queries", count: intermediateCount },
    { title: "Advanced Queries", count: advancedCount },
  ];

  const getComplexityColor = (complexity: string) => {
    const compUpper = (complexity || "").toUpperCase();
    switch (compUpper) {
      case "SIMPLE":
        return "bg-green-100 text-green-900 border-green-900";
      case "INTERMEDIATE":
        return "bg-amber-100 text-amber-900 border-amber-900";
      case "ADVANCED":
        return "bg-red-100 text-red-900 border-red-900";
      default:
        return "bg-gray-100 text-gray-900 border-gray-900";
    }
  };

  const getRelativeTimeString = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffSecs = Math.floor(diffMs / 1000);
      const diffMins = Math.floor(diffSecs / 60);
      const diffHrs = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHrs / 24);

      if (diffSecs < 60) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHrs < 24) return `${diffHrs}h ago`;
      return `${diffDays}d ago`;
    } catch {
      return "N/A";
    }
  };

  if (authLoading) {
    return (
      <Layout currentPage="/dashboard">
        <div className="bg-gray-50 min-h-[calc(100vh-200px)] flex items-center justify-center">
          <p className="font-bold uppercase text-lg">Loading session...</p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <Layout currentPage="/dashboard">
      <div className="bg-gray-50 py-16 md:py-24 lg:py-32 min-h-[calc(100vh-200px)]">
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
                RECENT SAVED QUERIES
              </h2>
              <div className="space-y-4">
                {!loading && recentAnalyses.length > 0 ? (
                  recentAnalyses.map(analysis => (
                    <div
                      key={analysis.id}
                      className="border-4 border-black bg-white p-6"
                      style={{ boxShadow: "8px 8px 0px #111111" }}
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <code className="text-xs md:text-sm bg-gray-100 p-3 flex-1 overflow-x-auto border-2 border-gray-200 font-mono break-all">
                          {analysis.query_text}
                        </code>
                        <span
                          className={`border-2 px-3 py-1 font-bold text-xs uppercase whitespace-nowrap ${getComplexityColor(analysis.complexity)}`}
                        >
                          {analysis.complexity}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Saved {getRelativeTimeString(analysis.created_at)}
                      </p>
                    </div>
                  ))
                ) : (
                  <div
                    className="border-4 border-black bg-white p-12 text-center"
                    style={{ boxShadow: "8px 8px 0px #111111" }}
                  >
                    <p className="text-lg font-semibold mb-2">
                      {loading ? "Loading recent queries..." : "No queries saved yet"}
                    </p>
                    <p className="text-muted-foreground">
                      {loading ? "Please wait..." : "Your most recent query history will show up here."}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Saved Collections */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                QUERIES BY COMPLEXITY
              </h2>
              <div className="space-y-4">
                {savedCollections.map((collection, idx) => (
                  <div
                    key={idx}
                    className="border-4 border-black bg-white p-6"
                    style={{ boxShadow: "8px 8px 0px #111111" }}
                  >
                    <h3 className="font-bold text-sm uppercase mb-2">
                      {collection.title}
                    </h3>
                    <p className="text-2xl font-bold text-primary mb-4">
                      {collection.count}
                    </p>
                    <button
                      onClick={() => {
                        router.push(`/history?complexity=${collection.title.split(" ")[0]}`);
                      }}
                      className="border-4 border-black bg-white text-black font-bold uppercase text-xs px-3 py-2 w-full transition-transform duration-150 ease-out cursor-pointer"
                      style={{ boxShadow: "4px 4px 0px #111111" }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          "2px 2px 0px #111111";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          "4px 4px 0px #111111";
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
