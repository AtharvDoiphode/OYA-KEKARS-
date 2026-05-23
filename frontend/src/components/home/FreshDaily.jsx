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
          <div className="relative aspect-square md:aspect-auto md:h-[600px] w-full rounded-[40px] overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1557925923-33b251d590e8?q=80&w=800&auto=format&fit=crop"
              alt="Baking fresh cakes"
              fill
              className="object-cover"
            />
            {/* Red overlay badge */}
            <div className="absolute top-8 left-8 bg-brand text-white p-6 rounded-full w-32 h-32 flex flex-col items-center justify-center text-center shadow-xl rotate-12 hover:rotate-0 transition-transform duration-500">
              <span className="font-serif text-3xl font-bold">100%</span>
              <span className="text-xs tracking-wider uppercase font-medium mt-1">Veg</span>
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
