import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

import { FloatingActions } from "@/components/ui/FloatingActions";

export const metadata = {
  title: "Oya Kekars - Luxury Cakes",
  description: "Delicious local cakes from Oya Kekars.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${jakarta.variable}`}>
      <body className="antialiased min-h-full flex flex-col font-sans selection:bg-brand selection:text-white relative">
        {children}
        <FloatingActions />
      </body>
    </html>
  );
}
