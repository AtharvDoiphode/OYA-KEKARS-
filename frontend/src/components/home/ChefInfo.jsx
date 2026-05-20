"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { SectionTitle } from "../ui/SectionTitle";

const team = [
  {
    name: "Owner Name",
    role: "Founder & Owner",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
    description: "The visionary behind Oya Kekars. Turned a passion for premium baking into Pune's most loved cake brand.",
  },
  {
    name: "Chef 1",
    role: "Head Pastry Chef",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=600&auto=format&fit=crop",
    description: "Specializes in European-style cakes and custom wedding designs. 8+ years of professional experience.",
  },
  {
    name: "Chef 2",
    role: "Creative Chef",
    image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=600&auto=format&fit=crop",
    description: "The creative force behind our seasonal specials and trending flavor combinations. Master of presentation.",
  },
];

export function ChefInfo() {
  return (
    <section className="py-24 bg-[#1a1a1a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h4 className="text-brand font-medium tracking-widest text-sm uppercase mb-4">Meet The Team</h4>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            The heart behind the <span className="text-brand italic">Bakes.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Every cake that leaves our studio carries the passion, skill, and love of the incredible team behind Oya Kekars.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="flex flex-col items-center group"
            >
              {/* Polaroid Card */}
              <div className={`relative p-3 pb-14 bg-white shadow-2xl rounded-sm max-w-xs w-full mx-auto hover:rotate-0 transition-transform duration-500 ${idx === 0 ? 'rotate-[-2deg]' : idx === 1 ? 'rotate-[1deg]' : 'rotate-[-1deg]'}`}>
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="absolute bottom-3 left-0 w-full text-center">
                  <span className="font-serif text-black/80 font-bold text-lg">{member.name}</span>
                </div>
              </div>

              {/* Info below card */}
              <div className="mt-6 text-center">
                <p className="text-brand font-bold tracking-widest text-xs uppercase mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">{member.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
