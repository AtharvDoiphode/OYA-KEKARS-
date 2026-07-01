import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFFBF5] font-sans text-foreground">
      <Navbar />
      <main className="flex-1 w-full pt-[120px] pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a24] mb-8">Privacy Policy</h1>
          <div className="prose max-w-none text-[#2a2a32]">
            <p className="text-lg leading-relaxed mb-6">
              At OYA Kekars, we take your privacy seriously. This policy outlines how we collect and use your data.
            </p>
            <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Information Collection</h2>
            <p className="mb-4">We collect information such as your name, contact details, and delivery address solely for the purpose of fulfilling your order and providing a seamless experience.</p>
            <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Data Usage</h2>
            <p className="mb-4">Your data is used exclusively to process transactions, schedule deliveries, and send you updates about your order. We do not sell or share your personal information with third parties.</p>
            <h2 className="text-2xl font-serif font-bold mt-8 mb-4">Security</h2>
            <p className="mb-4">We implement a variety of security measures to maintain the safety of your personal information when you place an order.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
