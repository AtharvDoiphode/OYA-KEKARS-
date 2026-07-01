"use client";
import { motion } from "framer-motion";

import { useState, useEffect, useRef } from "react";
import { GOOGLE_REVIEWS, Review } from "../../lib/constants";
import { SectionTitle } from "../ui/SectionTitle";
import { ReviewForm } from "./ReviewForm";

export function GoogleReviews() {
  const [reviews, setReviews] = useState<Review[]>(GOOGLE_REVIEWS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(
          (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api/reviews"
        );
        if (!res.ok) {
          console.log("Live reviews not available, using static fallback.");
          return;
        }
        
        const data = await res.json();
        if (data.success && data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
      } catch (error) {
        console.error("Using fallback reviews:", error);
        // Fallback to GOOGLE_REVIEWS is automatic since it's the initial state
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchReviews();
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic that allows manual scrolling
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let isHovered = false;
    let isDragging = false;

    const scroll = () => {
      if (!isHovered && !isDragging) {
        scrollContainer.scrollLeft += 0.5; // Adjust speed here
        // If we've scrolled past the first half of the duplicated reviews, jump back
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    const handleMouseEnter = () => isHovered = true;
    const handleMouseLeave = () => isHovered = false;
    const handleTouchStart = () => isDragging = true;
    const handleTouchEnd = () => {
      setTimeout(() => { isDragging = false; }, 1000); // Wait a bit after touch ends to resume
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    scrollContainer.addEventListener('touchend', handleTouchEnd);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <section id="reviews" className="py-24 bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
        
        {/* Title */}
        <SectionTitle className="mb-16">REVIEWS</SectionTitle>

        {/* Scrollable Container for reviews */}
        <div className="relative w-full py-8">
          <div 
            ref={scrollRef}
            className="flex gap-8 px-4 overflow-x-auto no-scrollbar"
            style={{ 
              scrollbarWidth: 'none', /* Firefox */
              msOverflowStyle: 'none'  /* IE and Edge */
            }}
          >
            <style jsx>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none; /* Chrome, Safari and Opera */
              }
            `}</style>
            
            {/* Double the array for seamless infinite scroll */}
            {[...reviews, ...reviews].map((review, idx) => (
              <div 
                key={`${review.id}-${idx}`} 
                className="bg-white p-10 rounded-sm shadow-xl min-w-[500px] md:min-w-[650px] flex gap-8 items-center"
              >
                {/* Profile Image */}
                {idx % 2 === 0 && (
                  <div className="w-40 h-40 rounded-full overflow-hidden shrink-0 relative bg-gray-100">
                    <img 
                      src={(review as any).profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=E3242B&color=fff&size=200&font-size=0.4&bold=true`} 
                      alt={review.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="text-5xl font-serif text-brand mb-4 leading-none h-6">&quot;</div>
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
                    <img 
                      src={(review as any).profilePhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=E3242B&color=fff&size=200&font-size=0.4&bold=true`} 
                      alt={review.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Gradients to fade edges */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-zinc-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-zinc-50 to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Review Submission Form */}
        <ReviewForm />

      </div>
    </section>
  );
}
