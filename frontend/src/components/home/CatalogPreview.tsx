"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CakeCard } from "../ui/CakeCard";
import { SectionTitle } from "../ui/SectionTitle";
import { Sparkles, Star, Wand2 } from "lucide-react";

import Link from "next/link";
import { WHATSAPP_NUMBER } from "../../lib/constants";

export function CatalogPreview({ isFullCatalog = false }: { isFullCatalog?: boolean }) {
  const [visibleCount, setVisibleCount] = useState(isFullCatalog ? 1000 : 8);
  const [cakes, setCakes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCustomOrderSubmit = () => {
    const message = `Hello! I would like to order a Custom Theme Cake.\n\nPlease let me know the details and options!`;
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api/cakes")
      .then((res) => res.json())
      .then((data) => {
        setCakes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch cakes", err);
        setLoading(false);
      });
  }, []);
  
  // Specific categories order requested by user
  const displayCategories = ["All", "Cakes", "Mini Cakes", "Theme Cakes", "Wedding Cakes", "Chocolate", "Pastries"];

  // Mapping display categories to actual database values
  const categoryMap: Record<string, string[]> = {
    "Cakes": ["regular", "cakes", "cake", "regular cakes"],
    "Mini Cakes": ["mini-cakes", "mini cakes", "minicakes"],
    "Theme Cakes": ["theme-cakes", "theme cakes"],
    "Wedding Cakes": ["engagement-cakes", "engagement cakes", "wedding", "wedding cakes"],
    "Chocolate": ["chocolates", "chocolate"],
    "Pastries": ["pastries", "pastry"]
  };

  // Filter cakes based on selected category and mapping
  const filteredCakes = activeCategory === "All" 
    ? cakes 
    : cakes.filter(cake => {
        const dbCategory = (cake.category || "").toLowerCase();
        // If the exact category matches, or it's in our mapped list
        return dbCategory === activeCategory.toLowerCase() || categoryMap[activeCategory]?.includes(dbCategory);
      });

  const displayedCakes = filteredCakes.slice(0, visibleCount);

  return (
    <section id="catalog" className="relative py-24 bg-[#FFFBF5] text-foreground overflow-hidden">
      
      {/* Decorative Line-Art Bakery Pattern */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <g id="donut">
            <circle cx="12" cy="12" r="9"/>
            <circle cx="12" cy="12" r="3.5"/>
            <path d="M4.5 9 C6 11 8.5 8 12 9.5 C15.5 11 18 8 19.5 10" strokeWidth="1"/>
            <line x1="7" y1="5" x2="8" y2="6" strokeWidth="1"/>
            <line x1="16" y1="6" x2="15" y2="7" strokeWidth="1"/>
            <line x1="15" y1="17" x2="16" y2="18" strokeWidth="1"/>
            <line x1="7" y1="18" x2="8" y2="17" strokeWidth="1"/>
            <line x1="4" y1="12" x2="5" y2="13" strokeWidth="1"/>
            <line x1="19" y1="14" x2="20" y2="13" strokeWidth="1"/>
          </g>
          <g id="cupcake">
            <path d="M6 15 L7.5 22 H16.5 L18 15" />
            <path d="M4 15 C3 15 2.5 12 5 11 C4 9 5.5 7 8 7 C9 5 15 5 16 7 C18.5 7 20 9 19 11 C21.5 12 21 15 20 15 Z" />
            <path d="M6 11 C8 13 16 13 18 11" strokeWidth="1"/>
            <path d="M8 7 C10 9 14 9 16 7" strokeWidth="1"/>
            <circle cx="12" cy="4" r="2" />
            <line x1="9" y1="15" x2="9.5" y2="22" strokeWidth="1"/>
            <line x1="12" y1="15" x2="12" y2="22" strokeWidth="1"/>
            <line x1="15" y1="15" x2="14.5" y2="22" strokeWidth="1"/>
          </g>
          <g id="cherry">
            <circle cx="10" cy="16" r="3"/>
            <circle cx="16" cy="16" r="3"/>
            <circle cx="13" cy="12" r="3"/>
            <path d="M13 9 C13 5 18 3 20 5"/>
          </g>
          <g id="heart">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </g>

          <pattern id="bakery-pattern" x="0" y="0" width="800" height="800" patternUnits="userSpaceOnUse">
            <g stroke="#ffc1c1" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              
              {/* Donuts */}
              <use href="#donut" transform="translate(50, 80) scale(3.5) rotate(15)" />
              <use href="#donut" transform="translate(380, 200) scale(2.5) rotate(-25)" />
              <use href="#donut" transform="translate(650, 50) scale(4) rotate(45)" />
              <use href="#donut" transform="translate(150, 550) scale(3) rotate(-10)" />
              <use href="#donut" transform="translate(550, 600) scale(3.5) rotate(70)" />

              {/* Cupcakes */}
              <use href="#cupcake" transform="translate(250, 40) scale(3) rotate(-15)" />
              <use href="#cupcake" transform="translate(550, 150) scale(3.5) rotate(20)" />
              <use href="#cupcake" transform="translate(80, 350) scale(2.5) rotate(35)" />
              <use href="#cupcake" transform="translate(350, 450) scale(4) rotate(-5)" />
              <use href="#cupcake" transform="translate(700, 400) scale(3) rotate(-25)" />
              <use href="#cupcake" transform="translate(250, 700) scale(3.5) rotate(10)" />

              {/* Cherries */}
              <use href="#cherry" transform="translate(150, 250) scale(3) rotate(45)" />
              <use href="#cherry" transform="translate(450, 80) scale(2.5) rotate(-30)" />
              <use href="#cherry" transform="translate(750, 250) scale(3.5) rotate(15)" />
              <use href="#cherry" transform="translate(50, 650) scale(2.5) rotate(-15)" />
              <use href="#cherry" transform="translate(450, 650) scale(3) rotate(60)" />

              {/* Hearts */}
              <use href="#heart" transform="translate(120, 150) scale(1.5) rotate(-20)" />
              <use href="#heart" transform="translate(320, 180) scale(1) rotate(25)" />
              <use href="#heart" transform="translate(500, 250) scale(2) rotate(-15)" />
              <use href="#heart" transform="translate(200, 450) scale(1.2) rotate(40)" />
              <use href="#heart" transform="translate(600, 350) scale(1.8) rotate(-30)" />
              <use href="#heart" transform="translate(300, 600) scale(1.5) rotate(15)" />
              <use href="#heart" transform="translate(650, 700) scale(1.2) rotate(-45)" />
              <use href="#heart" transform="translate(50, 50) scale(1) rotate(10)" />

              {/* Confetti & Dots */}
              <circle cx="200" cy="100" r="3" />
              <circle cx="400" cy="50" r="2.5" />
              <circle cx="600" cy="100" r="4" />
              <circle cx="100" cy="300" r="2" />
              <circle cx="300" cy="350" r="3.5" />
              <circle cx="500" cy="400" r="2" />
              <circle cx="700" cy="200" r="3" />
              <circle cx="150" cy="500" r="2.5" />
              <circle cx="450" cy="550" r="4" />
              <circle cx="650" cy="550" r="2" />
              <circle cx="200" cy="750" r="3" />
              <circle cx="500" cy="750" r="2.5" />
              
              <path d="M80 60 L100 45" />
              <path d="M350 120 L365 135" />
              <path d="M720 80 Q730 90 710 100" />
              <path d="M220 280 Q210 300 230 310" />
              <path d="M420 280 L440 270" />
              <path d="M620 250 Q640 260 630 280" />
              <path d="M80 450 L95 465" />
              <path d="M380 380 Q390 390 410 370" />
              <path d="M550 480 L570 470" />
              <path d="M750 450 Q740 470 760 480" />
              <path d="M120 680 L140 690" />
              <path d="M350 680 Q360 660 380 670" />
              <path d="M580 680 L560 695" />
              
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bakery-pattern)" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center z-10">
        
        {/* Title */}
        <SectionTitle className="mb-12">CATALOG</SectionTitle>

        {/* Categories */}
        <div className="flex justify-center mb-10 w-full">
          <div className="inline-flex flex-wrap justify-center gap-4 md:gap-8 px-8 py-3 bg-white/80 backdrop-blur-md rounded-[2rem] shadow-sm border border-white/50 z-10 max-w-full">
            {displayCategories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => { setActiveCategory(cat); setVisibleCount(isFullCatalog ? 1000 : 8); }}
                className={`relative px-2 py-1.5 transition-all duration-300 text-sm md:text-base font-semibold ${
                  activeCategory === cat 
                    ? 'text-foreground' 
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {cat}
                {/* Active Underline */}
                {activeCategory === cat && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[2.5px] bg-brand rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Cake Button */}
        <div className="flex justify-center mb-16 w-full px-6">
          <button 
            onClick={() => handleCustomOrderSubmit()}
            className="group relative w-full sm:w-auto px-6 py-2.5 bg-brand text-white overflow-hidden rounded-xl font-bold tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            {/* Shimmer Sweep Animation */}
            <div className="absolute top-0 -left-[100%] w-[120%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out z-0"></div>
            
            <Wand2 size={16} strokeWidth={2.5} className="relative z-10 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300 origin-bottom-left" />
            <span className="relative z-10 text-sm">Order Custom Theme Cake</span>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center w-full py-12">
            <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Grid (4 columns) */}
        {!loading && (
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
            <AnimatePresence mode="popLayout">
              {displayedCakes.map((cake, idx) => (
                <motion.div 
                  layout
                  key={cake._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: (idx % 4) * 0.1 }}
                >
                  <CakeCard cake={cake} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Explore/Load More Button */}
        {!loading && filteredCakes.length > visibleCount && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-16 flex justify-center w-full"
          >
            {activeCategory === "All" && !isFullCatalog ? (
              <Link 
                href="/catalog"
                className="group relative px-8 py-4 bg-white text-brand border-2 border-brand font-bold rounded-full shadow-md overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"
              >
                <div className="absolute inset-0 w-full h-full bg-brand origin-left transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 z-0"></div>
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Explore All Cakes</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 transition-colors duration-300 group-hover:text-white group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            ) : (
              <button 
                onClick={() => setVisibleCount(prev => prev + 4)}
                className="group relative px-8 py-4 bg-white text-brand border-2 border-brand font-bold rounded-full shadow-md overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 flex items-center gap-2"
              >
                <div className="absolute inset-0 w-full h-full bg-brand origin-left transform scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 z-0"></div>
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Explore More Cakes</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 transition-colors duration-300 group-hover:text-white group-hover:translate-x-1"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            )}
          </motion.div>
        )}

      </div>
    </section>
  );
}
