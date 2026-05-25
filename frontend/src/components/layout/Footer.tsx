import { WHATSAPP_NUMBER } from "../../lib/constants";
import { InstagramIcon } from "../ui/Icons";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#fcf0f0] pt-12 pb-8 text-foreground/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          
          {/* Brand Info */}
          <div className="lg:w-1/4">
            <h2 className="text-3xl font-serif font-bold text-foreground tracking-tight mb-4">Oya Kekars</h2>
            <p className="text-xs mb-8">We deliver the best bakery in your city</p>
            <p className="text-[10px]">&copy;{new Date().getFullYear()} Oya Kekars. All rights reserved</p>
          </div>

          {/* Newsletter */}
          <div className="lg:w-2/5">
            <p className="text-sm font-medium mb-4 text-foreground">Sign up for our newsletters and offers and get 12% off your first purchase</p>
            <div className="flex gap-4">
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-transparent border border-gray-400 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-foreground"
              />
              <button className="bg-[#1a1a24] text-white px-6 py-2.5 rounded-md text-sm hover:bg-brand transition-colors shrink-0 font-medium">
                Subscribe
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="lg:w-1/3 flex justify-between gap-4">
            
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-foreground text-sm mb-1">Contact us</h4>
              <a href="mailto:hello@oyakekars.com" className="text-xs hover:text-brand transition-colors">hello@oyakekars.com</a>
              <a href={`tel:+${WHATSAPP_NUMBER}`} className="text-xs hover:text-brand transition-colors">+{WHATSAPP_NUMBER}</a>
              <div className="flex gap-3 mt-2 text-foreground">
                <a href="#" className="w-8 h-8 rounded-full bg-[#1a1a24] text-white flex items-center justify-center hover:bg-brand transition-colors">
                  <InstagramIcon size={14} />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-foreground text-sm mb-1">About</h4>
              <a href="#" className="text-xs hover:text-brand transition-colors">About us</a>
              <a href="#" className="text-xs hover:text-brand transition-colors">Catalog</a>
              <a href="#" className="text-xs hover:text-brand transition-colors">Delivery</a>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-foreground text-sm mb-1">Support</h4>
              <a href="#" className="text-xs hover:text-brand transition-colors">Leave a review</a>
              <a href="#" className="text-xs hover:text-brand transition-colors">Terms & Conditions</a>
              <a href="#" className="text-xs hover:text-brand transition-colors">Privacy</a>
              <Link href="/admin" className="text-xs text-foreground/40 hover:text-brand transition-colors mt-4">Admin Login</Link>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}
