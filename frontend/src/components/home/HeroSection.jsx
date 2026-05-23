"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { WHATSAPP_NUMBER } from "../../lib/constants";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1559553156-2e97137af16f?q=80&w=1200&auto=format&fit=crop", // Strawberry/red accent cake
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200&auto=format&fit=crop", // Chocolate cake
  "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1200&auto=format&fit=crop", // Sparkler cake
];

export function HeroSection() {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20 flex flex-col lg:flex-row gap-12 items-center min-h-[85vh]">
      
      {/* Left Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col flex-1 w-full z-10"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
          <div className="h-[1px] w-12 bg-brand"></div>
          <span className="text-brand font-medium tracking-widest text-sm uppercase">Premium European Style</span>
        </motion.div>

        <motion.h2 
          variants={itemVariants}
          className="text-5xl md:text-6xl lg:text-8xl font-serif font-medium leading-[1.1] text-foreground"
        >
          Delicious <br className="hidden md:block"/> 
          <span className="text-brand italic">Moments,</span> <br className="hidden md:block"/> 
          Crafted Beautifully
        </motion.h2>

        <motion.p 
          variants={itemVariants}
          className="mt-6 text-foreground/70 max-w-md text-lg leading-relaxed"
        >
          Handcrafted with love and the finest ingredients. 100% vegetarian cakes bringing a taste of elegance to every celebration in Pune.
        </motion.p>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4"
          >
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'm interested in ordering a cake.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#1a1a24] text-white rounded-full font-medium text-lg hover:bg-brand transition-colors text-center"
            >
              Order on WhatsApp
            </a>
            <a href="#catalog" className="w-full sm:w-auto px-8 py-4 bg-white text-foreground border-2 border-gray-200 rounded-full font-medium text-lg hover:border-brand hover:text-brand transition-colors text-center">
              View Catalog
            </a>
          </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="mt-16 flex gap-12">
          <div>
            <h4 className="text-3xl font-serif font-bold text-foreground">4.8</h4>
            <p className="text-sm text-foreground/60 font-medium">★★★★★ (514+)</p>
          </div>
          <div>
            <h4 className="text-3xl font-serif font-bold text-foreground">5+</h4>
            <p className="text-sm text-foreground/60 font-medium">Years of Craft</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Content - Image Slider */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="flex-1 w-full lg:h-[700px] h-[500px] relative"
      >
        <div className="absolute inset-0 rounded-[40px] overflow-hidden bg-brand/5 p-4">
          <div className="relative w-full h-full rounded-[30px] overflow-hidden shadow-2xl bg-brand/5">
            
            <AnimatePresence>
              <motion.div
                key={currentImageIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
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
            
            {/* Red accent overlays */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand rounded-full mix-blend-multiply opacity-80 blur-2xl z-10"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full mix-blend-overlay opacity-50 blur-xl z-10"></div>

            {/* Slider Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {HERO_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIdx(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentImageIdx ? 'bg-brand w-8' : 'bg-white/50 hover:bg-white'}`}
                />
              ))}
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
