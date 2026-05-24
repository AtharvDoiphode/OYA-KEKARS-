"use client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, useScroll, useTransform, animate } from "framer-motion";
import Image from "next/image";
import { CakeSlice, Cake, Heart, Leaf, ChefHat, Sparkles, CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Animated counter component
function AnimatedCounter({ from, to, duration = 2, suffix = "" }: { from: number, to: number, duration?: number, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.5 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        onUpdate(value) {
          if (nodeRef.current) nodeRef.current.textContent = Math.round(value) + suffix;
        },
      });
      return () => controls.stop();
    }
  }, [from, to, duration, suffix, inView]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
}

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFBF5] font-sans overflow-x-hidden text-foreground">
      <Navbar />
      
      <main className="flex-1 w-full pt-[76px]">
        {/* 1. Cinematic Parallax Hero Section */}
        <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-black flex items-center justify-center">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 w-full h-full">
            <Image 
              src="/assets/cakes/regular/corolla/corolla.png"
              alt="OYA Kekars Signature Cake"
              fill
              className="object-cover opacity-60"
            />
            {/* Elegant overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#FFFBF5]"></div>
          </motion.div>
          
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto -mt-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Pure Elegance
              </h1>
              <p className="text-xl md:text-3xl text-white/90 font-light tracking-wide italic">
                A Few Words About OYA Kekars
              </p>
            </motion.div>
          </div>
        </section>

        {/* 2. "Our Story" - Magazine Style Layout */}
        <section className="py-24 lg:py-32 relative z-20 bg-[#FFFBF5]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2"
              >
                <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl">
                  <Image 
                    src="/assets/cakes/regular/whirlpool/whirlpool.png"
                    alt="Crafting Moments"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 text-white">
                    <p className="text-sm uppercase tracking-[0.2em] font-bold mb-2 text-brand">Since 2017</p>
                    <h3 className="text-3xl font-serif font-bold">Crafting Joy</h3>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full lg:w-1/2"
              >
                <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#1a1a24] mb-10 leading-tight">
                  Where Baking Meets <br/><span className="text-brand italic">Artistry.</span>
                </h2>
                
                <div className="prose max-w-none text-[#2a2a32]">
                  <p className="first-letter:text-[60px] first-letter:font-serif first-letter:font-black first-letter:text-brand first-letter:mr-3 first-letter:float-left first-letter:leading-[0.85] first-letter:mt-1 text-[17px] leading-[1.8] font-light tracking-wide">
                    Born from a deep passion for the culinary arts, OYA Kekars began its journey in 2017 with a simple yet ambitious vision: to completely redefine the standard of European baking. Over the years, we have evolved from a humble local bakery into a premier destination for those who seek uncompromising quality and exquisite taste.
                  </p>
                  <p className="mt-6 text-[17px] leading-[1.8] text-gray-600 font-light tracking-wide">
                    We believe that a cake is far more than just a dessert—it is the stunning centerpiece of your most cherished celebrations. That is exactly why every single creation that leaves our transparent live kitchens is meticulously handcrafted by master chefs using only the world's finest ingredients. 
                  </p>
                  <p className="mt-6 text-lg leading-relaxed font-serif font-bold text-brand italic border-l-4 border-brand/30 pl-5">
                    "Unwavering hygiene, flawless aesthetics, and an absolutely unforgettable taste—this is the OYA promise."
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. Dynamic Stats Counter */}
        <section className="py-24 relative overflow-hidden bg-[#1a1a24] text-white">
          <div className="absolute inset-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,rgba(217,29,36,0.8)_0%,transparent_70%)]"></div>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
              {[
                { end: 350, suffix: "+", label: "Cake Varieties", icon: Cake },
                { end: 10, suffix: "k+", label: "Happy Customers", icon: Heart },
                { end: 5, suffix: "+", label: "Stores Nationwide", icon: Leaf },
                { end: 50, suffix: "+", label: "Master Chefs", icon: ChefHat },
              ].map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 text-center flex flex-col items-center group hover:bg-white/10 transition-colors"
                >
                  <div className="w-16 h-16 rounded-2xl bg-brand/20 text-brand flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    <stat.icon size={32} />
                  </div>
                  <h4 className="text-4xl lg:text-5xl font-serif font-bold mb-2">
                    <AnimatedCounter from={0} to={stat.end} suffix={stat.suffix} />
                  </h4>
                  <p className="text-sm text-gray-400 uppercase tracking-widest font-semibold">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. "Why We Are Different" - Interactive Cards */}
        <section className="py-24 lg:py-32 bg-[#FFFBF5]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#1a1a24] mb-6">Why Choose Us</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">Discover the pillars that make OYA Kekars the premier choice for your celebrations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: Sparkles,
                  title: "Luxury Ingredients", 
                  desc: "Exclusively handpicked, imported, and premium quality ingredients ensure every bite is rich, authentic, and unforgettable."
                },
                { 
                  icon: CakeSlice,
                  title: "Artistic Designs", 
                  desc: "Every cake is a uniquely crafted masterpiece, meticulously designed by our expert chefs to match your wildest imagination."
                },
                { 
                  icon: CheckCircle2,
                  title: "Elite Experience", 
                  desc: "From our contactless ordering to the final pristine delivery, we guarantee a pure, premium, and utterly flawless experience."
                }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  className="group bg-white rounded-3xl p-10 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-brand/20 hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-brand/10 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-bl-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700 ease-out"></div>
                  
                  <div className="w-14 h-14 rounded-2xl bg-brand text-white flex items-center justify-center mb-8 shadow-lg shadow-brand/30">
                    <card.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1a1a24] mb-4">{card.title}</h3>
                  <p className="text-gray-600 leading-relaxed relative z-10">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. "Philosophy, Mission, Vision" - Elegant Pillars */}
        <section className="py-24 lg:py-32 bg-[#1a1a24] text-white relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
             {/* Floating ambient orbs */}
             <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity }} className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-brand rounded-full blur-[150px]"></motion.div>
             <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }} className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] bg-brand rounded-full blur-[150px]"></motion.div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
              {[
                {
                  title: "Philosophy",
                  text: "‘O’ signifies calling someone with respect, and ‘YA’ represents welcoming them. At OYA Kekars, we welcome our customers with open arms and loving hearts. Transparency and trust are at the heart of everything we do."
                },
                {
                  title: "Mission",
                  text: "We are redefining the cake-buying journey through stringent hygiene, uncompromising safety, and premium quality. Our contactless service ensures a safe, seamless experience, crafting moments of joy with precision."
                },
                {
                  title: "Vision",
                  text: "To be recognized globally as a premier European cake brand. We aim to deliver unforgettable dessert experiences worldwide by seamlessly blending tradition, innovation, and profound care into every creation."
                }
              ].map((pillar, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                  className="flex flex-col h-full border-l border-white/20 pl-8 lg:pl-10 relative group"
                >
                  <div className="absolute left-0 top-0 w-[3px] h-0 bg-brand group-hover:h-full transition-all duration-700 ease-out"></div>
                  <h3 className="text-3xl font-serif font-bold mb-6 group-hover:text-brand transition-colors duration-300">{pillar.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">{pillar.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Craftsmanship Callout */}
        <section className="py-32 bg-[#FFFBF5] relative overflow-hidden flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[400px] text-gray-100 font-serif font-black leading-none pointer-events-none select-none z-0">
            "
          </div>
          <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-sm font-bold text-brand uppercase tracking-[0.3em] mb-8">Our Craftsmanship</h2>
              <p className="text-3xl md:text-5xl text-[#1a1a24] leading-[1.4] font-serif italic">
                "Every curve, texture, and delicate detail is carefully sculpted to perfection—beautifully marrying modern aesthetics with timeless, classic baking techniques."
              </p>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
