"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { INSTAGRAM_REELS } from "../../lib/constants";
import { Play } from "lucide-react";
import { InstagramIcon } from "../ui/Icons";

export function InstagramFeed() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
        
        {/* Top Handle */}
        <motion.a 
          href="https://instagram.com/oyakekars" 
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-3 mb-12 hover:opacity-80 transition-opacity"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-fuchsia-600 p-[2px]">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center border-2 border-white">
              <span className="font-serif font-bold text-xl">O</span>
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-foreground flex items-center justify-center gap-2">
              <InstagramIcon size={18} /> @oyakekars
            </h3>
            <p className="text-sm text-foreground/60 mt-1">Join 15k+ cake lovers on our journey</p>

          </div>
        </motion.a>

        {/* Reels Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {INSTAGRAM_REELS.map((src, idx) => (
            <motion.a
              key={idx}
              href="https://instagram.com/oyakekars"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative aspect-[9/16] rounded-2xl overflow-hidden group cursor-pointer"
            >
              <Image 
                src={src} 
                alt="Instagram Reel" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-100">
                  <Play fill="white" size={20} className="ml-1" />
                </div>
              </div>
              
              {/* Instagram top right icon */}
              <div className="absolute top-3 right-3 text-white">
                <InstagramIcon size={20} />
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
            href="https://instagram.com/oyakekars"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#fafafa] border border-gray-200 rounded-full font-medium hover:border-brand hover:text-brand transition-colors text-foreground"
          >
            Follow us on Instagram
          </a>
        </motion.div>

      </div>
    </section>
  );
}
