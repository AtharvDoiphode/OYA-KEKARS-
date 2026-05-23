"use client";
import { motion } from "framer-motion";
import { SectionTitle } from "../ui/SectionTitle";
import Image from "next/image";

import { WHATSAPP_NUMBER } from "../../lib/constants";

export function Contacts() {
  return (
    <section id="contact" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
        
        <SectionTitle className="mb-20">CONTACTS</SectionTitle>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 w-full">
          
          {/* Left - Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8 lg:w-1/4"
          >
            <div>
              <h4 className="font-bold text-foreground mb-1">Working hours</h4>
              <p className="text-foreground/70 text-sm">Mon to Sat: 10 a.m. to 7 p.m.</p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-1">Phone / WhatsApp</h4>
              <a href={`tel:+${WHATSAPP_NUMBER}`} className="text-brand text-sm hover:underline">+{WHATSAPP_NUMBER}</a>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-1">Email</h4>
              <a href="mailto:hello@oyakekars.com" className="text-brand text-sm hover:underline">hello@oyakekars.com</a>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-1">Address</h4>
              <p className="text-foreground/70 text-sm">Pune, Maharashtra, 411001</p>
            </div>
          </motion.div>

          {/* Middle - Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3 bg-[#fcf0f0] p-8 pt-10 rounded-tl-xl rounded-bl-xl rounded-tr-xl rounded-br-[80px]"
          >
            <p className="text-foreground font-medium mb-6 leading-relaxed">
              If you have any questions, fill in this form and we will get back to you as soon as possible
            </p>
            
            <form className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full bg-transparent border border-brand/30 rounded-full px-5 py-3 placeholder:text-foreground/50 text-foreground focus:outline-none focus:border-brand"
              />
              <input 
                type="tel" 
                placeholder="Phone" 
                className="w-full bg-transparent border border-brand/30 rounded-full px-5 py-3 placeholder:text-foreground/50 text-foreground focus:outline-none focus:border-brand"
              />
              <textarea 
                placeholder="Your message" 
                rows={4}
                className="w-full bg-transparent border border-brand/30 rounded-2xl px-5 py-3 placeholder:text-foreground/50 text-foreground focus:outline-none focus:border-brand resize-none"
              ></textarea>
              
              <div className="flex items-start gap-3 mt-2">
                <input type="checkbox" id="terms" className="mt-1 shrink-0 accent-brand" />
                <label htmlFor="terms" className="text-xs text-foreground/70">
                  I agree with the Terms of office and Privacy Policy
                </label>
              </div>

              <button type="button" className="mt-4 w-32 bg-[#1a1a24] text-white py-3 rounded-md mx-auto hover:bg-brand transition-colors font-medium">
                Send
              </button>
            </form>
          </motion.div>

          {/* Right - Map */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-[41%] min-h-[300px] relative rounded-md overflow-hidden bg-gray-100"
          >
            {/* Simple static map image placeholder for now to match UI perfectly */}
            <Image 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop"
              alt="Map Location"
              fill
              className="object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-700"
            />
            {/* Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#E3242B" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
