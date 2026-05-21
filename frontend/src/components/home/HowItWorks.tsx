"use client";
import { motion } from "framer-motion";
import { SectionTitle } from "../ui/SectionTitle";

export function HowItWorks() {
  const steps = [
    { title: "Visit & Browse", desc: "Customer visits website & sees cakes/catalog" },
    { title: "Contact Us", desc: "Clicks WhatsApp / Call to initiate order" },
    { title: "Place Order", desc: "Customer places the order with details" },
    { title: "Order Received", desc: "Owner receives and reviews the order" },
    { title: "Status Updates", desc: "Owner updates customer through WhatsApp" },
    { title: "Management", desc: "Admin updates catalog & prices via panel" },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      
      {/* Decorative background curve */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand/5 rounded-l-[100px] -z-10 hidden md:block"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
        
        <SectionTitle className="mb-16">ORDER PROCESS</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12 relative w-full mt-8">
          
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col relative z-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100"
            >
              <div className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center font-bold text-xl mb-6 shadow-md absolute -top-6 -left-4 border-4 border-white">
                {idx + 1}
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-2 mt-2">{step.title}</h3>
              <p className="text-foreground/70 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
