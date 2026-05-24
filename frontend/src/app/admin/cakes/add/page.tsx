"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, Loader2, Save } from "lucide-react";

export default function AddCake() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    weight: "",
    description: "",
    available: true,
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("adminToken");
      
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("category", formData.category);
      submitData.append("price", formData.price);
      submitData.append("weight", formData.weight);
      submitData.append("description", formData.description);
      submitData.append("available", String(formData.available));
      
      if (imageFile) {
        submitData.append("image", imageFile);
      }

      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api/cakes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: submitData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create cake");
      }

      router.push("/admin/cakes");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-foreground font-sans">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/cakes"
          className="p-2 hover:bg-white border border-transparent hover:border-gray-200 shadow-sm hover:shadow rounded-lg text-foreground/60 hover:text-foreground transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Cake</h1>
          <p className="text-foreground/70 mt-1">Fill in the details to add a cake to the catalog</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg shadow-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/80">Cake Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-brand focus:bg-white transition-colors"
                placeholder="e.g. Chocolate Truffle"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/80">Category *</label>
              <input
                type="text"
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-brand focus:bg-white transition-colors"
                placeholder="e.g. Birthday, Anniversary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/80">Price (₹) *</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-brand focus:bg-white transition-colors"
                placeholder="e.g. 500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/80">Weight *</label>
              <input
                type="text"
                name="weight"
                required
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-brand focus:bg-white transition-colors"
                placeholder="e.g. 500g, 1kg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">Description</label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-brand focus:bg-white transition-colors resize-none"
              placeholder="Enter cake description..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">Cake Image</label>
            <div className="flex items-start gap-6">
              <div
                className={`relative w-40 h-40 rounded-xl overflow-hidden border-2 border-dashed ${
                  imagePreview ? "border-transparent" : "border-gray-300 bg-gray-50"
                } flex flex-col items-center justify-center group hover:bg-gray-100 transition-colors`}
              >
                {imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-xs text-white font-semibold">Change Image</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-xs text-gray-500 font-semibold">Upload Image</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <div className="text-sm text-foreground/60 mt-2">
                <p>Recommended size: 800x800px</p>
                <p>Max file size: 5MB</p>
                <p>Formats: JPG, PNG, WEBP</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand"></div>
              <span className="ml-3 text-sm font-semibold text-foreground/80">
                In Stock / Available for Order
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-brand hover:bg-brand/90 text-white px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Cake
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
