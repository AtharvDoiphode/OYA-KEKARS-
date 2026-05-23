"use client";
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import Link from 'next/link';
import { WHATSAPP_NUMBER } from '../../lib/constants';

import { Cake } from '../../lib/constants';

export function CakeCard({ cake }: { cake: Cake }) {
  const [isChocolate, setIsChocolate] = useState(false);

  let message = `Hello, Oya Kekars! 🎂✨\nI would love to order a *${cake.name}* 🍰`;
  if (isChocolate) {
    message += `\n\nFlavor: *Chocolate* 🍫`;
  }
  message += `\n\nPlease let me know the details and availability! 😊`;

  const whatsappUrl = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group flex flex-col w-full h-full bg-white rounded-2xl shadow-xl p-3 sm:p-4 border border-white/20"
    >
      {/* Square Image */}
      <Link href={`/cake/${cake.id}`} className="relative aspect-square w-full bg-gray-50 mb-4 overflow-hidden block">
        <Image 
          src={cake.image} 
          alt={cake.name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105" 
        />
      </Link>
      
      {/* Title & Price Row */}
      <div className="flex justify-between items-start mb-4 px-1">
        <Link href={`/cake/${cake.id}`} className="font-sans text-sm font-semibold text-foreground group-hover:text-brand transition-colors leading-tight pr-2">
          {cake.name}
        </Link>
        <p className="font-sans text-sm font-bold text-foreground shrink-0">{cake.price}</p>
      </div>

      {/* Options Row */}
      <div className="flex items-center mb-3 px-1 py-1">
        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsChocolate(!isChocolate);
          }}
          className="flex items-center gap-2 group outline-none"
        >
          <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-all duration-200 ${
            isChocolate 
              ? 'bg-brand border-brand' 
              : 'bg-white border-foreground/30 group-hover:border-brand'
          }`}>
            {isChocolate && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5 text-white">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
          </div>
          <span className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${
            isChocolate ? 'text-brand' : 'text-foreground/70 group-hover:text-foreground'
          }`}>
            Chocolate Base (+₹100)
          </span>
        </button>
      </div>

      {/* Buttons Row */}
      <div className="flex gap-2 w-full mt-auto">
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.5] bg-[#1a1a24] text-white text-xs font-semibold py-3 px-2 rounded-sm hover:bg-brand transition-colors text-center uppercase tracking-wider"
        >
          Order on WhatsApp
        </a>
        <Link 
          href={`/cake/${cake.id}`}
          className="flex-1 bg-white border border-gray-300 text-foreground text-xs font-semibold py-3 px-2 rounded-sm hover:border-brand hover:text-brand transition-colors text-center uppercase tracking-wider flex items-center justify-center"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
