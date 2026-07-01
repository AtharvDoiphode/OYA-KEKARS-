import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFFBF5] font-sans text-foreground">
      <Navbar />
      <main className="flex-1 w-full pt-[120px] pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a24] mb-8">Terms & Conditions</h1>
          <div className="prose max-w-none text-[#2a2a32]">
            <p className="text-lg leading-relaxed mb-6">
              Welcome to OYA Kekars. By placing an order with us, you agree to the following terms and conditions.
            </p>
            <h2 className="text-2xl font-serif font-bold mt-8 mb-4">1. Orders and Cancellations</h2>
            <p className="mb-4">All orders must be placed at least 24 hours in advance. Cancellations made less than 12 hours before the delivery time may be subject to a cancellation fee.</p>
            <h2 className="text-2xl font-serif font-bold mt-8 mb-4">2. Payments</h2>
            <p className="mb-4">Full payment is required to confirm your order. We accept various payment methods including credit cards and UPI.</p>
            <h2 className="text-2xl font-serif font-bold mt-8 mb-4">3. Allergies</h2>
            <p className="mb-4">Our products may contain traces of nuts, gluten, and dairy. Please inform us of any severe allergies prior to placing your order, though we cannot guarantee a 100% allergen-free environment.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
