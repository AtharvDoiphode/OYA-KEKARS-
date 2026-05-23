"use client";
import React from 'react';
import { motion } from 'framer-motion';

export function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute -inset-x-6 inset-y-1 bg-current/10 rounded-full origin-left -z-10 transform -skew-x-12"
      ></motion.div>
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-current uppercase tracking-widest px-4 py-2">
        {children}
      </h2>
    </div>
  );
}
