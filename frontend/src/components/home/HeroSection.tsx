"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { WHATSAPP_NUMBER } from "../../lib/constants";

import { Star, Sparkles } from "lucide-react";

const HERO_IMAGES = [
  "/assets/cakes/chocolates/lotus/lotus.png",
  "/assets/cakes/minicakes/pearl/pearl.png",
  "/assets/cakes/regular/whirlpool/whirlpool.png",
];

export function HeroSection() {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // Slower, more elegant transition
    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative w-full min-h-[90vh] overflow-hidden bg-[linear-gradient(to_bottom,#7f1d1d_0%,#dc2626_50%,#7f1d1d_100%)]">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-black/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] right-[-10%] w-[50%] h-[50%] bg-black/30 rounded-full blur-[100px]"></div>
        
        {/* Floating Stars */}
        <motion.div animate={{ y: [0, -20, 0], rotate: [0, 180, 360], opacity: [0.4, 1, 0.4] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} className="absolute top-[20%] left-[5%] text-white">
          <Sparkles size={28} strokeWidth={1} />
        </motion.div>
        <motion.div animate={{ y: [0, 25, 0], rotate: [0, -180, -360], opacity: [0.3, 0.9, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute bottom-[30%] left-[45%] text-amber-200">
          <Star size={20} fill="currentColor" className="opacity-70" />
        </motion.div>
        <motion.div animate={{ x: [0, 20, 0], y: [0, -15, 0], opacity: [0.2, 0.8, 0.2], rotate: [0, 90, 180] }} transition={{ duration: 7, repeat: Infinity, ease: "linear" }} className="absolute top-[15%] right-[10%] text-white">
          <Star size={14} fill="currentColor" className="opacity-50" />
        </motion.div>
      </div>
      
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center z-10 min-h-[80vh]">
        
        {/* Left Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col w-full lg:w-1/2 xl:w-[45%] shrink-0 z-20"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
            <div className="h-[2px] w-10 bg-white/60"></div>
            <span className="text-white/90 font-semibold tracking-[0.2em] text-[10px] sm:text-xs uppercase">Premium European Bakery</span>
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold leading-[1.05] text-white"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Baking Pure <br className="hidden md:block"/> 
            <span className="text-[#ffd1d1] italic font-semibold pr-2">Elegance,</span> <br className="hidden md:block"/> 
            Just for You
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="mt-8 text-white/80 max-w-md text-sm lg:text-[1.05rem] leading-[1.8] tracking-[0.02em] font-medium"
            style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
          >
            Pune's premier 100% vegetarian cakes. Handcrafted with elite ingredients for unforgettable celebrations.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 pt-10"
          >
            <motion.a 
              href="/#catalog"
              animate={{ boxShadow: ["0 0 15px rgba(255,255,255,0.2)", "0 0 30px rgba(255,255,255,0.6)", "0 0 15px rgba(255,255,255,0.2)"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="group relative overflow-hidden w-full sm:w-auto px-8 py-3 bg-white text-brand rounded-full font-bold text-sm lg:text-base hover:-translate-y-1 hover:bg-gray-50 transition-all duration-300 text-center flex items-center justify-center gap-2"
            >
              {/* Sleek recurring shine sweep */}
              <motion.div 
                animate={{ x: ["-150%", "250%"] }} 
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 3 }} 
                className="absolute inset-0 w-[50%] h-full bg-gradient-to-r from-transparent via-brand/15 to-transparent skew-x-12"
              />
              <span className="relative z-10">Order Now</span>
            </motion.a>
            <a 
              href="#catalog" 
              className="w-full sm:w-auto px-8 py-3 bg-transparent text-white border-2 border-white/30 rounded-full font-bold text-sm lg:text-base hover:border-white transition-all duration-300 text-center"
            >
              View Menu
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div variants={itemVariants} className="mt-8 lg:mt-10 flex items-center gap-6 lg:gap-8 border-t border-white/20 pt-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1 text-amber-300">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <p className="text-[11px] lg:text-xs text-white/80 font-semibold"><span className="text-white font-bold">4.9/5</span> (300+ Reviews)</p>
            </div>
            <div className="w-[1px] h-8 bg-white/20"></div>
            <div className="flex flex-col gap-1">
              <h4 className="text-base lg:text-lg font-bold text-white">5+ Years</h4>
              <p className="text-[11px] lg:text-xs text-white/80 font-semibold">Of Craftsmanship</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content - Elegant Arch Image Slider */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          whileInView={{ opacity: 1, scale: 1, x: 0, y: [0, -15, 0] }}
          viewport={{ once: true }}
          transition={{ 
            opacity: { duration: 1, delay: 0.2 },
            scale: { duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
            x: { duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
          }}
          className="w-full lg:flex-1 h-[350px] sm:h-[450px] lg:h-[450px] xl:h-[560px] relative mt-8 lg:mt-0 z-10"
        >
          {/* Main Arch Container */}
          <div className="absolute inset-0 rounded-t-[200px] rounded-b-[24px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-[6px] border-white z-10 bg-white">
            <AnimatePresence>
              <motion.div
                key={currentImageIdx}
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  opacity: { duration: 1.5, ease: "easeInOut" },
                  scale: { duration: 6, ease: "easeOut" } 
                }}
                className="absolute inset-0 w-full h-full"
              >
                <Image 
                  src={HERO_IMAGES[currentImageIdx]}
                  alt={`Signature Cake ${currentImageIdx + 1}`}
                  fill
                  className="object-cover"
                  priority={currentImageIdx === 0}
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Gradient Overlay for better contrast at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

            {/* Slider Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {HERO_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIdx(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentImageIdx ? 'bg-white w-6 opacity-100 shadow-lg' : 'bg-white/40 w-1.5 hover:bg-white/80'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Floating '100% Eggless' Glass Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20, rotate: -5 }}
            animate={{ opacity: 1, y: [0, -12, 0], rotate: [-5, 2, -5] }}
            transition={{ 
              opacity: { delay: 1, duration: 0.8 },
              y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1.5 },
              rotate: { repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1.5 }
            }}
            className="absolute top-12 -left-4 lg:-left-12 z-20 bg-white/90 backdrop-blur-md border border-white p-2 lg:p-3 rounded-xl lg:rounded-2xl shadow-xl flex items-center gap-2 lg:gap-3"
          >
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lg:w-5 lg:h-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <div>
              <p className="text-[8px] lg:text-[10px] text-gray-500 font-bold uppercase tracking-wider">Certified</p>
              <p className="text-[#1a1a24] font-black text-sm lg:text-base">100% Eggless</p>
            </div>
          </motion.div>

          {/* Decorative background shape behind arch */}
          <div className="absolute top-4 -right-3 lg:top-6 lg:-right-5 w-full h-full rounded-t-[200px] rounded-b-[24px] border-2 border-white/30 -z-10"></div>
        </motion.div>
      </div>
    </section>
  );
}
