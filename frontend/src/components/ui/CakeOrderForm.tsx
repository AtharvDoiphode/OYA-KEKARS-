"use client";
import { useState } from "react";
import { WHATSAPP_NUMBER } from "../../lib/constants";

export function CakeOrderForm({ cake }: { cake: any }) {
  const [selectedSize, setSelectedSize] = useState(cake.sizes?.[0] || "");
  const [isChocolate, setIsChocolate] = useState(false);

  let message = `Hello, Oya Kekars! 🎂✨\nI would love to order a *${cake.name}* 🍰\nSize: *${selectedSize}* 📏`;
  
  if (isChocolate) {
    message += `\n\nFlavor: *Chocolate* 🍫`;
  }
  
  message += `\n\nPlease let me know the details and availability! 😊`;

  const whatsappUrl = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;

  return (
    <div className="flex flex-col flex-1 mt-2">
      {/* Sizes */}
      <div className="mb-8">
        <h3 className="font-bold text-foreground mb-3 uppercase tracking-wider text-sm">Available Sizes</h3>
        <div className="flex flex-wrap gap-3">
          {cake.sizes?.map((size: string, idx: number) => (
            <button
              key={idx}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 border rounded-md text-sm font-medium cursor-pointer transition-colors ${
                selectedSize === size
                  ? "border-brand text-brand bg-brand/5"
                  : "border-gray-200 text-foreground/70 hover:border-brand"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Flavor Option */}
      <div className="mb-8">
        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsChocolate(!isChocolate);
          }}
          className="flex items-center gap-3 group outline-none w-full py-2"
        >
          <div className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-all duration-200 shrink-0 ${
            isChocolate 
              ? 'bg-brand border-brand shadow-md shadow-brand/20' 
              : 'bg-white border-gray-300 group-hover:border-brand'
          }`}>
            {isChocolate && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
          </div>
          <div className="flex flex-col items-start">
            <span className={`font-bold text-sm transition-colors ${isChocolate ? 'text-brand' : 'text-foreground'}`}>
              Chocolate Flavour Base
            </span>
            <span className={`text-xs mt-0.5 transition-colors ${isChocolate ? 'text-brand/80' : 'text-foreground/60'}`}>
              +₹100 extra charge
            </span>
          </div>
        </button>
      </div>

      {/* Order Box */}
      <div className="bg-zinc-50 p-6 rounded-xl border border-gray-100 mt-auto">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-foreground/70">Estimated Preparation:</span>
          <span className="text-sm font-bold text-foreground">{cake.deliveryTime}</span>
        </div>
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#20bd5a] transition-colors shadow-lg shadow-[#25D366]/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.81 11.81 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/>
          </svg>
          Order on WhatsApp
        </a>
        <p className="text-center text-xs text-foreground/50 mt-4">No payment required until confirmation.</p>
      </div>
    </div>
  );
}
