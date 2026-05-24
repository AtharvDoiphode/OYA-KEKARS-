"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export function FreshDaily() {
  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-12">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 w-full"
        >
          <div className="relative">
            <div className="relative aspect-square md:aspect-auto md:h-[600px] w-full rounded-[40px] overflow-hidden shadow-xl">
              <Image 
                src="/assets/cakes/regular/rose bouqet/rosebouqet.png"
                alt="Beautiful Rose Bouquet Cake"
                fill
                className="object-cover"
              />
            </div>
            {/* Overlay badge half out */}
            <div className="absolute -top-10 -left-10 bg-emerald-600/95 backdrop-blur-sm text-white p-4 rounded-full w-32 h-32 flex flex-col items-center justify-center text-center shadow-2xl border-4 border-white transition-all duration-500 hover:scale-105 rotate-12 hover:rotate-0 z-20">
              {/* Authentic Veg Icon */}
              <div className="flex items-center justify-center w-5 h-5 border-[2px] border-white rounded-sm shrink-0 mb-1">
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
              </div>
              <span className="font-serif text-2xl font-bold leading-none mt-1">100%</span>
              <span className="text-[10px] tracking-widest uppercase font-bold mt-1">Veg</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Made <span className="text-brand">Fresh</span> Daily.
          </h2>
          <p className="text-foreground/70 text-lg leading-relaxed mb-8">
            Every morning, our kitchen comes alive with the aroma of premium vanilla, rich Belgian chocolate, and fresh seasonal fruits. We believe that true luxury lies in freshness, which is why we never compromise on our daily baking ritual.
          </p>
          <ul className="space-y-4">
            {[
              "Zero preservatives or artificial enhancers",
              "Sourced from the finest local and international suppliers",
              "100% vegetarian kitchen environment",
              "Custom baked exactly to your order"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0">
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-foreground font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

      </div>
    </section>
  );
}
