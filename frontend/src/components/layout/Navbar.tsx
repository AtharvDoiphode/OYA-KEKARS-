"use client";
import { useState, useEffect } from "react";
import { MapPin, ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? "bg-brand/90 backdrop-blur-md shadow-md border-b border-white/10" : "bg-brand shadow-md"
      }`}
    >
      <div className="flex items-center justify-between px-6 lg:px-12 py-4 max-w-7xl mx-auto w-full relative z-10">
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-white hover:opacity-80 transition-opacity"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">OYA</h1>
          <span className="text-[10px] tracking-[0.2em] font-medium text-white/90 uppercase">Kekars</span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10 text-sm font-medium text-white/90">
          <a href="#about" className="hover:text-white transition-colors">Our Story</a>
          <a href="#catalog" className="hover:text-white transition-colors">Catalog</a>
          <a href="#custom" className="hover:text-white transition-colors">Custom Cakes</a>
          <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6 text-white">
          <button className="hidden sm:flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity">
            <MapPin size={18} />
            <span>Pune</span>
          </button>
          <button className="relative hover:opacity-80 transition-opacity">
            <ShoppingBag size={24} />
            <span className="absolute -top-1 -right-1.5 bg-white text-brand text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 w-full bg-brand/95 backdrop-blur-md flex flex-col items-center pt-12 pb-20 gap-8 h-[100vh] border-t border-white/10"
          >
            {[
              { name: 'Our Story', id: 'about' },
              { name: 'Catalog', id: 'catalog' },
              { name: 'Custom Cakes', id: 'custom' },
              { name: 'Reviews', id: 'reviews' },
              { name: 'Contact', id: 'contact' }
            ].map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-serif font-bold text-white hover:text-white/80 transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-white/80">
              <MapPin size={18} />
              <span>Delivering across Pune</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
