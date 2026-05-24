"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { INSTAGRAM_REELS } from "../../lib/constants";
import { Play } from "lucide-react";
import { InstagramIcon } from "../ui/Icons";

export function InstagramFeed() {
  return (
    <section id="blogs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
        
        {/* Top Handle */}
        <motion.a 
          href="https://instagram.com/oyakekars_3jewels" 
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3 mb-12 hover:opacity-80 transition-opacity"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-fuchsia-600 p-[2px]">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center border-2 border-white overflow-hidden">
              <img src="/assets/profile.jpg" alt="Oya Kekars" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-foreground flex items-center justify-center gap-2">
              <InstagramIcon size={18} /> @oyakekars_3jewels
            </h3>
            <p className="text-sm text-foreground/60 mt-1">Join 15k+ cake lovers on our journey</p>

          </div>
        </motion.a>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {INSTAGRAM_REELS.map((reel, idx) => (
            <motion.a
              key={idx}
              href={reel.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-lg border border-gray-100 group cursor-pointer block"
            >
              {/* Thumbnail Background */}
              <Image 
                src={reel.thumbnail} 
                alt={reel.caption || "Instagram Reel"} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlay for Text */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none transition-opacity duration-300 group-hover:opacity-90"></div>

              {/* Top Left Badge */}
              <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Play fill="white" size={12} />
                Reel
              </div>

              {/* Center Play Button */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full border-2 border-white/60 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/90 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                  <Play fill="currentColor" size={24} className="ml-1" />
                </div>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white flex flex-col gap-3 pointer-events-none">
                <p className="font-sans text-sm md:text-base leading-snug line-clamp-3 drop-shadow-md">
                  {reel.caption}
                </p>
                <div className="text-[11px] font-bold tracking-widest uppercase text-white/80 flex items-center gap-1 group-hover:text-white transition-colors">
                  WATCH ON INSTAGRAM <span className="text-lg leading-none transform translate-y-[-1px] group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom Handle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <a 
            href="https://instagram.com/oyakekars_3jewels"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a1a24] text-white rounded-full font-bold text-lg hover:bg-brand hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl"
          >
            <InstagramIcon size={20} /> Follow us on Instagram
          </a>
        </motion.div>

      </div>
    </section>
  );
}
