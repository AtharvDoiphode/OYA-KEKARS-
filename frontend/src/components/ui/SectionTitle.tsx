"use client";
import React from 'react';
import { motion } from 'framer-motion';

export function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-current uppercase tracking-widest px-4 py-2">
        {children}
      </h2>
    </div>
  );
}
