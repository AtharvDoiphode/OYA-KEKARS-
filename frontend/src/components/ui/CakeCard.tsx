"use client";
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import Link from 'next/link';
import { WHATSAPP_NUMBER } from '../../lib/constants';

export function CakeCard({ cake }: { cake: any }) {
  const [isChocolate, setIsChocolate] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    cakeMessage: ''
  });

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let message = `Hello, Oya Kekars! 🎂✨\nI would love to order a *${cake.name}* 🍰`;
    if (isChocolate) {
      message += `\n\nFlavor: *Chocolate Base* 🍫`;
    }
    
    message += `\n\n*Order Details:*`;
    message += `\nName: ${formData.name}`;
    message += `\nPhone: ${formData.phone}`;
    message += `\nAddress: ${formData.address}`;
    if (formData.cakeMessage) {
      message += `\nMessage on Cake: "${formData.cakeMessage}"`;
    }

    message += `\n\nPlease let me know the total price and availability! 😊`;

    const whatsappUrl = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setShowOrderModal(false);
  };

  // Safe fallback if image is undefined
  const imageUrl = cake.image || "https://via.placeholder.com/400x400?text=No+Image";

  return (
    <>
      <motion.div 
        whileHover={{ y: -5 }}
        className="group flex flex-col w-full h-full bg-white rounded-2xl shadow-xl p-3 sm:p-4 border border-white/20 relative"
      >
        {/* Square Image */}
        <Link href={`/cake/${cake._id}`} className="relative aspect-square w-full bg-gray-50 mb-4 overflow-hidden block rounded-lg">
          <Image 
            src={imageUrl} 
            alt={cake.name} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        </Link>
        
        {/* Title & Price Row */}
        <div className="flex justify-between items-start mb-4 px-1">
          <Link href={`/cake/${cake._id}`} className="font-sans text-sm font-semibold text-foreground group-hover:text-brand transition-colors leading-tight pr-2">
            {cake.name}
          </Link>
          <p className="font-sans text-sm font-bold text-foreground shrink-0">
            {cake.price > 0 ? `₹${cake.price}` : 'Price on Request'}
          </p>
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
          <button 
            onClick={() => setShowOrderModal(true)}
            className="flex-[1.5] bg-[#1a1a24] text-white text-xs font-semibold py-3 px-2 rounded-sm hover:bg-brand transition-colors text-center uppercase tracking-wider"
          >
            Order Now
          </button>
          <Link 
            href={`/cake/${cake._id}`}
            className="flex-1 bg-white border border-gray-300 text-foreground text-xs font-semibold py-3 px-2 rounded-sm hover:border-brand hover:text-brand transition-colors text-center uppercase tracking-wider flex items-center justify-center"
          >
            Details
          </Link>
        </div>
      </motion.div>

      {/* Order Popup Modal */}
      <AnimatePresence>
        {showOrderModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style={{ position: 'fixed' }}>
            <motion.div 
              initial={{opacity:0}} 
              animate={{opacity:1}} 
              exit={{opacity:0}} 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
              onClick={() => setShowOrderModal(false)} 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[24px] shadow-2xl p-6 z-10 overflow-y-auto max-h-[85vh]"
            >
              <button 
                onClick={() => setShowOrderModal(false)} 
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 transition-colors bg-gray-50 hover:bg-gray-200 rounded-full p-2"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              
              <div className="flex items-center gap-4 mb-6 pr-8">
                <div className="w-16 h-16 relative rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                  <Image src={imageUrl} alt={cake.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#1a1a24]" style={{ fontFamily: "var(--font-playfair), serif" }}>{cake.name}</h3>
                  <p className="text-sm font-bold text-brand">{cake.price > 0 ? `₹${cake.price}` : 'Price on Request'}</p>
                </div>
              </div>
              
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.1em] mb-1.5 ml-1">Full Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/10 transition-all text-sm font-medium text-foreground placeholder:text-gray-400 shadow-sm" placeholder="Enter your name" />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.1em] mb-1.5 ml-1">Phone Number</label>
                  <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/10 transition-all text-sm font-medium text-foreground placeholder:text-gray-400 shadow-sm" placeholder="+91 98765 43210" />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.1em] mb-1.5 ml-1">Address</label>
                  <textarea required rows={2} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/10 transition-all text-sm font-medium text-foreground placeholder:text-gray-400 resize-none shadow-sm" placeholder="Enter full address in Pune" />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.1em] mb-1.5 ml-1">Message on Cake <span className="text-gray-400 font-normal normal-case tracking-normal">(Optional)</span></label>
                  <input type="text" value={formData.cakeMessage} onChange={e => setFormData({...formData, cakeMessage: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/10 transition-all text-sm font-medium text-foreground placeholder:text-gray-400 shadow-sm" placeholder="e.g. Happy Birthday!" />
                </div>
                
                <button type="submit" className="w-full bg-brand text-white font-bold py-3.5 rounded-xl hover:bg-[#d91d24] hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-brand/30 mt-6 flex justify-center items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  Order via WhatsApp
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
