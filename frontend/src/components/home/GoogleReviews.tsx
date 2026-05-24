"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { GOOGLE_REVIEWS, Review } from "../../lib/constants";
import { SectionTitle } from "../ui/SectionTitle";

export function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>(GOOGLE_REVIEWS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews");
        if (!res.ok) {
          console.log("Live Google Reviews disabled (Missing API Key), using static fallback.");
          return;
        }
        
        const data = await res.json();
        if (data.success && data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
      } catch (error) {
        console.error("Using fallback reviews (API Key likely missing):", error);
        // Fallback to GOOGLE_REVIEWS is automatic since it's the initial state
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchReviews();
  }, []);

  return (
    <section id="reviews" className="py-24 bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
        
        {/* Title */}
        <SectionTitle className="mb-16">REVIEWS</SectionTitle>

        {/* Marquee effect for reviews */}
        <div className="relative w-full flex overflow-x-hidden py-8">
          <motion.div 
            className="flex gap-8 px-4"
            animate={{ x: [0, -2000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {/* Double the array for seamless infinite scroll */}
            {[...reviews, ...reviews].map((review, idx) => (
              <div 
                key={`${review.id}-${idx}`} 
                className="bg-white p-10 rounded-sm shadow-xl min-w-[500px] md:min-w-[650px] flex gap-8 items-center"
              >
                {/* Profile Image */}
                {idx % 2 === 0 && (
                  <div className="w-40 h-40 rounded-full overflow-hidden shrink-0 relative bg-gray-100">
                    <Image 
                      src={(review as any).profilePhoto || `https://images.unsplash.com/photo-${1500000000000 + idx}?q=80&w=200&auto=format&fit=crop`} 
                      alt={review.name} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="text-5xl font-serif text-brand mb-4 leading-none h-6">"</div>
                  <h4 className="text-xl md:text-2xl font-serif text-foreground font-semibold mb-4 leading-snug">
                    «{review.text.split('.')[0]}»
                  </h4>
                  <p className="text-foreground/70 text-sm leading-relaxed mb-6">
                    «{review.text}»
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-foreground">
                      {review.name}
                    </p>
                    <span className="text-xs text-yellow-500 font-bold">
                      {Array(Math.floor(review.rating)).fill("★").join("")}
                    </span>
                    <span className="text-xs text-gray-400">
                      {review.date}
                    </span>
                  </div>
                </div>

                {idx % 2 !== 0 && (
                  <div className="w-40 h-40 rounded-full overflow-hidden shrink-0 relative bg-gray-100">
                    <Image 
                      src={(review as any).profilePhoto || `https://images.unsplash.com/photo-${1600000000000 + idx}?q=80&w=200&auto=format&fit=crop`} 
                      alt={review.name} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                )}
              </div>
            ))}
          </motion.div>
          
          {/* Gradients to fade edges */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-zinc-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-zinc-50 to-transparent z-10 pointer-events-none"></div>
        </div>

      </div>
    </section>
  );
}
