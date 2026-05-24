import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChevronLeft } from "lucide-react";
import { CakeOrderForm } from "@/components/ui/CakeOrderForm";

export default async function CakeDetailsPage({ params }: { params: { id: string } }) {
  // Fetch from the backend
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/cakes/${params.id}`, { cache: "no-store" });
  
  if (!res.ok) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1 w-full pt-32 pb-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Cake Not Found</h1>
            <Link href="/#catalog" className="text-brand hover:underline">
              Return to Catalog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const cake = await res.json();

  const imageUrl = cake.image || "https://via.placeholder.com/800x800?text=No+Image";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-1 w-full pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Back Button */}
          <Link href="/#catalog" className="inline-flex items-center gap-2 text-foreground/60 hover:text-brand transition-colors font-medium mb-10">
            <ChevronLeft size={20} /> Back to Catalog
          </Link>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            
            {/* Left: Images */}
            <div className="lg:w-1/2 flex flex-col gap-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                <Image 
                  src={imageUrl}
                  alt={cake.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right: Details */}
            <div className="lg:w-1/2 flex flex-col">
              <span className="text-brand font-bold tracking-widest uppercase text-sm mb-3">
                {cake.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                {cake.name}
              </h1>
              <p className="text-2xl font-sans font-bold text-foreground mb-8">
                {cake.price > 0 ? `₹${cake.price}` : 'Price on Request'}
              </p>

              {cake.description && (
                <p className="text-foreground/80 leading-relaxed mb-10 text-lg whitespace-pre-wrap">
                  {cake.description}
                </p>
              )}

              <CakeOrderForm cake={cake} />

            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
