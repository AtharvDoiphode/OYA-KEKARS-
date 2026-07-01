"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, CheckCircle, Loader2 } from "lucide-react";

export function ReviewForm() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !text.trim() || rating === 0) {
      setError("Please fill in all fields and select a rating.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(
        (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api/reviews",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name.trim(), rating, text: text.trim() }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to submit review");
      }

      setIsSubmitted(true);
      setName("");
      setRating(0);
      setText("");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-20 max-w-2xl mx-auto w-full px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10"
      >
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground text-center mb-2">
          Share Your Experience
        </h3>
        <p className="text-foreground/60 text-center text-sm mb-8">
          We&apos;d love to hear about your experience with our cakes
        </p>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center py-8 gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-serif font-semibold text-foreground">
                Thank You!
              </h4>
              <p className="text-foreground/60 text-center text-sm max-w-sm">
                Your review has been submitted and will appear on the website after approval.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 text-brand hover:text-brand/80 font-medium text-sm transition-colors underline underline-offset-4"
              >
                Write another review
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Name Input */}
              <div>
                <label
                  htmlFor="review-name"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  Your Name
                </label>
                <input
                  id="review-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-foreground placeholder:text-gray-400"
                  disabled={isSubmitting}
                />
              </div>

              {/* Star Rating */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Rating
                </label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      disabled={isSubmitting}
                      className="group transition-transform hover:scale-110 active:scale-95 disabled:cursor-not-allowed"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoveredRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-none text-gray-300 group-hover:text-yellow-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label
                  htmlFor="review-text"
                  className="block text-sm font-semibold text-foreground mb-2"
                >
                  Your Review
                </label>
                <textarea
                  id="review-text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Tell us about your experience..."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-foreground placeholder:text-gray-400 resize-none"
                  disabled={isSubmitting}
                />
              </div>

              {/* Error Message */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm font-medium bg-red-50 px-4 py-2.5 rounded-lg border border-red-100"
                >
                  {error}
                </motion.p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-brand hover:bg-brand/90 disabled:bg-brand/50 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/30 disabled:shadow-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Review
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
