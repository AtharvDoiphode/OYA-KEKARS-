"use client";
import { MapPin, ShoppingBag, Menu } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="flex items-center justify-between px-6 lg:px-12 py-4 max-w-7xl mx-auto w-full">
        {/* Mobile Menu */}
        <button className="lg:hidden text-foreground">
          <Menu size={24} />
        </button>

        {/* Logo */}
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-serif font-bold text-brand tracking-tight">OYA</h1>
          <span className="text-[10px] tracking-[0.2em] font-medium text-foreground uppercase">Kekars</span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10 text-sm font-medium text-foreground/80">
          <a href="#about" className="hover:text-brand transition-colors">Our Story</a>
          <a href="#catalog" className="hover:text-brand transition-colors">Catalog</a>
          <a href="#custom" className="hover:text-brand transition-colors">Custom Cakes</a>
          <a href="#reviews" className="hover:text-brand transition-colors">Reviews</a>
          <a href="#contact" className="hover:text-brand transition-colors">Contact</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6 text-brand">
          <button className="hidden sm:flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity">
            <MapPin size={18} />
            <span>Pune</span>
          </button>
          <button className="relative hover:opacity-80 transition-opacity">
            <ShoppingBag size={24} />
            <span className="absolute -top-1 -right-1.5 bg-foreground text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
