import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ReviewPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFFBF5] font-sans text-foreground">
      <Navbar />
      <main className="flex-1 w-full pt-[120px] pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a24] mb-8">Leave a Review</h1>
          <div className="prose max-w-none text-[#2a2a32]">
            <p className="text-lg leading-relaxed mb-6">
              We&apos;d love to hear about your experience with OYA Kekars!
            </p>
            <p className="mb-4">
              Please send your reviews and feedback to <a href="mailto:oyakekars.3jewels@gmail.com" className="text-brand hover:underline">oyakekars.3jewels@gmail.com</a> or message us directly on WhatsApp.
            </p>
            <div className="mt-12 bg-white p-8 rounded-2xl shadow-sm border border-brand/10">
              <h3 className="text-xl font-bold mb-4">Why your feedback matters</h3>
              <p className="mb-0">
                Your feedback helps us continuously improve our cakes and service. It also helps other customers make informed decisions about their celebrations.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
