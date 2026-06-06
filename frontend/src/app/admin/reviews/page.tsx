"use client";

import { useEffect, useState } from "react";
import { Trash2, Loader2, CheckCircle, Search, Star, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface Review {
  _id: string;
  name: string;
  rating: number;
  text: string;
  approved: boolean;
  createdAt: string;
}

export default function AdminReviewsList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(
        (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api/reviews/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/reviews/${id}/approve`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to approve review");

      setReviews(
        reviews.map((r) => (r._id === id ? { ...r, approved: true } : r))
      );
    } catch (err: any) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    setActionLoading(id);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/reviews/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete review");

      setReviews(reviews.filter((r) => r._id !== id));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-brand animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg shadow-sm">
        {error}
      </div>
    );
  }

  const filteredReviews = reviews.filter(
    (review) =>
      review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingCount = reviews.filter((r) => !r.approved).length;

  return (
    <div className="space-y-6 text-foreground font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customer Reviews</h1>
          <p className="text-foreground/70 mt-1">
            Manage reviews submitted by customers
            {pendingCount > 0 && (
              <span className="ml-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">
                <Clock className="w-3 h-3" />
                {pendingCount} pending
              </span>
            )}
          </p>
        </div>
        <div className="relative flex-1 sm:w-64 sm:flex-initial">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand shadow-sm text-sm"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-foreground/80">
            <thead className="bg-gray-50 text-foreground border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Rating</th>
                <th className="px-6 py-4 font-semibold">Review</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredReviews.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-foreground/50"
                  >
                    {searchQuery
                      ? "No reviews found matching your search."
                      : "No reviews yet. They'll appear here when customers submit them."}
                  </td>
                </tr>
              ) : (
                filteredReviews.map((review) => (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={review._id}
                    className={`transition-colors ${
                      !review.approved
                        ? "bg-amber-50/50 hover:bg-amber-50"
                        : "hover:bg-gray-50/80"
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold text-foreground whitespace-nowrap">
                      {review.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-yellow-500 font-bold tracking-wide">
                        {Array(review.rating).fill("★").join("")}
                        {Array(5 - review.rating)
                          .fill("☆")
                          .join("")}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="truncate" title={review.text}>
                        {review.text}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          review.approved
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-amber-100 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {review.approved ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            Approved
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3" />
                            Pending
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-foreground/60 whitespace-nowrap text-xs">
                      {new Date(review.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap space-x-2">
                      {!review.approved && (
                        <button
                          onClick={() => handleApprove(review._id)}
                          disabled={actionLoading === review._id}
                          className="inline-flex items-center gap-1 text-green-600 hover:text-green-700 transition-colors p-2 hover:bg-green-50 rounded-lg disabled:opacity-50"
                          title="Approve Review"
                        >
                          {actionLoading === review._id ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <CheckCircle className="w-5 h-5" />
                          )}
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(review._id)}
                        disabled={actionLoading === review._id}
                        className="text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg disabled:opacity-50"
                        title="Delete Review"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
