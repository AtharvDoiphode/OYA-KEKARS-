"use client";
"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';

import Link from 'next/link';
import { WHATSAPP_NUMBER } from '../../lib/constants';

export function CakeCard({ cake }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group cursor-pointer flex flex-col w-full h-full"
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

      {/* Buttons Row */}
      <div className="flex gap-2 w-full mt-auto">
        <a 
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi! I'm interested in ordering the ${cake.name}.`)}`}
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
