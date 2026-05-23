"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { GOOGLE_REVIEWS } from "../../lib/constants";
import { SectionTitle } from "../ui/SectionTitle";

export function GoogleReviews() {
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
            {[...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS].map((review, idx) => (
              <div 
                key={idx} 
                className="bg-white p-10 rounded-sm shadow-xl min-w-[500px] md:min-w-[650px] flex gap-8 items-center"
              >
                {/* Profile Image (alternating left/right logic simplified here) */}
                {idx % 2 === 0 && (
                  <div className="w-40 h-40 rounded-full overflow-hidden shrink-0 relative bg-gray-100">
                    <Image src={`https://images.unsplash.com/photo-${1500000000000 + idx}?q=80&w=200&auto=format&fit=crop`} alt={review.name} fill className="object-cover" />
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
                  <p className="text-xs font-bold text-foreground">
                    {review.name}, Pune
                  </p>
                </div>

                {idx % 2 !== 0 && (
                  <div className="w-40 h-40 rounded-full overflow-hidden shrink-0 relative bg-gray-100">
                    <Image src={`https://images.unsplash.com/photo-${1600000000000 + idx}?q=80&w=200&auto=format&fit=crop`} alt={review.name} fill className="object-cover" />
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
