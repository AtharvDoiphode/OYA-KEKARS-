"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, Loader2, Edit2, Search } from "lucide-react";
import { motion } from "framer-motion";

interface Cake {
  _id: string;
  name: string;
  category: string;
  price: number;
  weight: string;
  available: boolean;
  image?: string;
}

export default function AdminCakesList() {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [displayCount, setDisplayCount] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCakes = async () => {
    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api/cakes");
      if (!res.ok) throw new Error("Failed to fetch cakes");
      const data = await res.json();
      setCakes(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCakes();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this cake?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/cakes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete cake");

      // Remove from state
      setCakes(cakes.filter((cake) => cake._id !== id));
    } catch (err: any) {
      alert(err.message);
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

  const filteredCakes = cakes.filter((cake) => 
    cake.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    cake.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-foreground font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cakes Catalog</h1>
          <p className="text-foreground/70 mt-1">Manage all cakes in the store</p>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search cakes..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setDisplayCount(10); // Reset pagination on search
              }}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand shadow-sm text-sm"
            />
          </div>
          <Link
            href="/admin/cakes/add"
            className="flex items-center gap-2 bg-brand hover:bg-brand/90 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Add New Cake
          </Link>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-foreground/80">
            <thead className="bg-gray-50 text-foreground border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Image</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCakes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-foreground/50">
                    {searchQuery ? "No cakes found matching your search." : "No cakes found. Add some to get started."}
                  </td>
                </tr>
              ) : (
                filteredCakes.slice(0, displayCount).map((cake) => (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={cake._id}
                    className="hover:bg-gray-50/80 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {cake.image ? (
                        <img
                          src={cake.image}
                          alt={cake.name}
                          className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No img</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-semibold text-foreground">
                      {cake.name}
                    </td>
                    <td className="px-6 py-4">{cake.category}</td>
                    <td className="px-6 py-4">
                      {cake.price > 0 ? `₹${cake.price}` : "Custom"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          cake.available
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-red-100 text-red-700 border border-red-200"
                        }`}
                      >
                        {cake.available ? "Available" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <Link
                        href={`/admin/cakes/edit/${cake._id}`}
                        className="inline-block text-gray-400 hover:text-brand transition-colors p-2 hover:bg-brand/10 rounded-lg"
                        title="Edit Cake"
                      >
                        <Edit2 className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(cake._id)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
                        title="Delete Cake"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
          
          {filteredCakes.length > displayCount && (
            <div className="p-6 flex justify-center bg-gray-50/50 border-t border-gray-200">
              <button
                onClick={() => setDisplayCount((prev) => prev + 10)}
                className="px-8 py-2.5 bg-white border border-gray-300 text-foreground font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
              >
                Explore More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
