"use client";
import { motion } from "framer-motion";
import { CAKE_CATALOG } from "../../lib/constants";
import { CakeCard } from "../ui/CakeCard";
import { SectionTitle } from "../ui/SectionTitle";

export function CatalogPreview() {
  const categories = ["Cakes", "Wedding cakes", "Cupcakes", "Donuts", "Bakery"];

  return (
    <section id="catalog" className="py-24 bg-[#fcf0f0] text-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
        
        {/* Title */}
        <SectionTitle className="mb-12">CATALOG</SectionTitle>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-16 text-sm font-semibold text-foreground/70">
          {categories.map((cat, i) => (
            <button 
              key={cat} 
              className={`hover:text-foreground transition-colors pb-1 border-b-2 ${i === 0 ? 'border-brand text-foreground' : 'border-transparent hover:border-gray-300'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid (4 columns) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 w-full"
        >
          {CAKE_CATALOG.concat(CAKE_CATALOG.slice(0, 2)).map((cake, idx) => ( // Duplicated 2 for 8 items total
            <motion.div 
              key={`${cake.id}-${idx}`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <CakeCard cake={cake} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
