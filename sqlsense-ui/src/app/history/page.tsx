"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { Search, Trash2, Copy } from "lucide-react";
import { useAuth } from "@/features/auth/AuthContext";
import { fetchSavedQueries, deleteSavedQuery, SavedQuery } from "@/features/history/historyService";
import { toast } from "sonner";

export default function History() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [queries, setQueries] = useState<SavedQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterComplexity, setFilterComplexity] = useState("all");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const compParam = params.get("complexity");
      if (compParam) {
        setFilterComplexity(compParam);
      }
    }
  }, []);

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
      toast.error(err.message || "Failed to load saved queries.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSavedQuery(id);
      setQueries(prev => prev.filter(q => q.id !== id));
      toast.success("Query deleted successfully.");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete query.");
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

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

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    } catch {
      return "N/A";
    }
  };

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const hh = String(date.getHours()).padStart(2, "0");
      const mm = String(date.getMinutes()).padStart(2, "0");
      return `${hh}:${mm}`;
    } catch {
      return "N/A";
    }
  };

  const filteredItems = queries.filter(item => {
    const matchesSearch = (item.query_text || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesComplexity =
      filterComplexity === "all" || (item.complexity || "").toUpperCase() === filterComplexity.toUpperCase();
    return matchesSearch && matchesComplexity;
  });

  if (authLoading) {
    return (
      <Layout currentPage="/history">
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
    <Layout currentPage="/history">
      <div className="bg-gray-50 py-16 md:py-24 lg:py-32 min-h-[calc(100vh-200px)]">
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
            {loading ? "Loading..." : `${filteredItems.length} ${filteredItems.length === 1 ? "Query" : "Queries"} Found`}
          </p>

          {/* History List */}
          <div className="space-y-4">
            {!loading && filteredItems.length > 0 ? (
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
                      <code className="text-xs bg-gray-100 p-3 block overflow-x-auto border-2 border-gray-200 font-mono break-all max-h-40 overflow-y-auto">
                        {item.query_text}
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
                        <p className="text-xs font-semibold">{formatDate(item.created_at)}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatTime(item.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Explanation Preview */}
                  <div className="mb-4">
                    <p className="text-xs font-bold uppercase text-muted-foreground mb-2">
                      Explanation
                    </p>
                    <p className="text-sm border-2 border-dashed border-gray-300 bg-gray-50/50 p-3 rounded-none leading-relaxed text-foreground">
                      {item.explanation}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(item.query_text)}
                      className="flex-1 border-4 border-black bg-white text-black font-bold uppercase text-xs py-2 flex items-center justify-center gap-2 transition-transform duration-150 ease-out cursor-pointer"
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
                      <Copy size={16} />
                      COPY
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 border-4 border-black bg-white text-black font-bold uppercase text-xs py-2 flex items-center justify-center gap-2 transition-transform duration-150 ease-out cursor-pointer hover:bg-red-50"
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
                <p className="text-lg font-semibold mb-2">
                  {loading ? "Loading queries..." : "No queries found"}
                </p>
                <p className="text-muted-foreground">
                  {loading ? "Please wait..." : "Try explaining and saving some queries from the editor!"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
