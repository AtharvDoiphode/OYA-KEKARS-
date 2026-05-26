"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "../ui/SectionTitle";
import Image from "next/image";
import { Copy, Check } from "lucide-react";

import { WHATSAPP_NUMBER } from "../../lib/constants";

export function Contacts() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("oyakekars.3jewels@gmail.com");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

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
              <p className="text-foreground/70 text-sm">10 a.m. to 11 p.m.</p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-1">Phone / WhatsApp</h4>
              <a href={`tel:+${WHATSAPP_NUMBER}`} className="text-brand text-sm hover:underline">+{WHATSAPP_NUMBER}</a>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-1">Email</h4>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=oyakekars.3jewels@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand text-sm hover:underline"
              >
                oyakekars.3jewels@gmail.com
              </a>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-1">Address</h4>
              <p className="text-foreground/70 text-sm">Shop No. 9, Three Jewels, Tilekar Nagar, Kondhwa Bk., Pune, Maharashtra, 411048</p>
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
            className="lg:w-[41%] min-h-[300px] relative rounded-md overflow-hidden bg-gray-100 shadow-inner group"
          >
            <iframe
              title="Oya Kekars Location"
              src="https://maps.google.com/maps?q=OYA+Kekars,+Three+Jewels,+Tilekar+Nagar,+Kondhwa+Bk.,+Pune,+Maharashtra&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "300px", position: "absolute", top: 0, left: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
            ></iframe>
            {/* Interactive overlay that disappears on hover so the map can be clicked */}
            <div className="absolute inset-0 bg-brand/5 pointer-events-none group-hover:opacity-0 transition-opacity duration-700"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
