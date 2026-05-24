"use client";
import { useState, useEffect } from "react";
import { MapPin, ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WHATSAPP_NUMBER } from "../../lib/constants";
import Link from "next/link";

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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? "bg-brand/90 backdrop-blur-md shadow-md border-b border-white/10" : "bg-brand shadow-md"
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
        <div className="flex flex-1 justify-start">
          <Link href="/" className="flex items-center">
            <img
              src="/assets/oyakekarslogo.png"
              alt="OYA Kekars"
              className="h-9 md:h-11 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center justify-center gap-10 text-sm font-medium text-white/90 shrink-0">
          <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
          <Link href="/catalog" className="hover:text-white transition-colors">Catalog</Link>
          <a href="https://instagram.com/oyakekars_3jewels" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
          <Link href="/#contact" className="hover:text-white transition-colors">Contact Us</Link>
          <Link href="/#reviews" className="hover:text-white transition-colors">Reviews</Link>
        </div>

        {/* Actions */}
        <div className="flex flex-1 justify-end items-center text-brand">
          <a
            href="/#catalog"
            className="flex items-center gap-2 bg-white text-brand px-5 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md border-none"
          >
            <span>Order Now</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.81 11.81 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
            </svg>
          </a>
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
              { name: 'About Us', id: 'about', href: '/about' },
              { name: 'Catalog', id: 'catalog', href: '/catalog' },
              { name: 'Instagram', id: 'instagram', href: 'https://instagram.com/oyakekars_3jewels', external: true },
              { name: 'Contact Us', id: 'contact', href: '/#contact' },
              { name: 'Reviews', id: 'reviews', href: '/#reviews' }
            ].map((item) => (
              item.external ? (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif font-bold text-white hover:text-white/80 transition-colors"
                >
                  {item.name}
                </a>
              ) : (
                <Link 
                  key={item.id}
                  href={item.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif font-bold text-white hover:text-white/80 transition-colors"
                >
                  {item.name}
                </Link>
              )
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
