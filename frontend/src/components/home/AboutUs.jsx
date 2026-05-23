"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { SectionTitle } from "../ui/SectionTitle";

export function AboutUs() {
  return (
    <section id="about" className="py-24 bg-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 flex flex-col items-start"
          >
            <SectionTitle className="mb-8">OUR STORY</SectionTitle>
            <h3 className="text-2xl font-serif font-bold text-foreground mb-6">
              Baking memories in Pune since 2018.
            </h3>
            <p className="text-foreground/70 leading-relaxed mb-6">
              What started as a small home kitchen experiment has grown into Pune's most beloved premium bakery. At Oya Kekars, we believe that every celebration deserves a centerpiece that looks as spectacular as it tastes.
            </p>
            <p className="text-foreground/70 leading-relaxed mb-8">
              We specialize in 100% vegetarian, European-style cakes and desserts. Our mission is simple: to bring joy to your special moments using only the finest ingredients, zero preservatives, and a whole lot of love. Every cake that leaves our studio is handcrafted, ensuring that your birthday, wedding, or quiet evening craving is nothing short of perfect.
            </p>
            
            <div className="flex gap-12 border-t border-gray-200 pt-8 w-full">
              <div>
                <p className="text-4xl font-bold text-brand mb-1">6+</p>
                <p className="text-sm font-semibold text-foreground/60 uppercase tracking-wider">Years Experience</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-brand mb-1">15k+</p>
                <p className="text-sm font-semibold text-foreground/60 uppercase tracking-wider">Happy Customers</p>
              </div>
            </div>
          </motion.div>

          {/* Image Collage */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative h-[500px] w-full"
          >
            {/* Main Image */}
            <div className="absolute top-0 right-0 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl z-10">
              <Image 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop" 
                alt="Bakery Interior" 
                fill 
                className="object-cover"
              />
            </div>
            {/* Secondary Image */}
            <div className="absolute bottom-0 left-0 w-3/5 h-2/5 rounded-2xl overflow-hidden shadow-xl z-20 border-8 border-zinc-50">
              <Image 
                src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=600&auto=format&fit=crop" 
                alt="Baking Process" 
                fill 
                className="object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand/10 rounded-full -z-10"></div>
            <div className="absolute bottom-12 -left-6 w-24 h-24 bg-yellow-400/20 rounded-full -z-10"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
