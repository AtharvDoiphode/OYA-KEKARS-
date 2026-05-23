import Image from "next/image";
import Link from "next/link";
import { CAKE_CATALOG, WHATSAPP_NUMBER } from "@/lib/constants";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChevronLeft, Check } from "lucide-react";

export async function generateStaticParams() {
  return CAKE_CATALOG.map((cake) => ({
    id: cake.id.toString(),
  }));
}

export default function CakeDetailsPage({ params }) {
  const cake = CAKE_CATALOG.find((c) => c.id.toString() === params.id);

  if (!cake) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Cake not found</h1>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(`Hi! I want to order the ${cake.name}. Could you please help me with the customization?`);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-1 w-full pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Back Button */}
          <Link href="/#catalog" className="inline-flex items-center gap-2 text-foreground/60 hover:text-brand transition-colors font-medium mb-10">
            <ChevronLeft size={20} /> Back to Catalog
          </Link>

          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Left: Images */}
            <div className="lg:w-1/2 flex flex-col gap-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                <Image 
                  src={cake.image}
                  alt={cake.name}
                  fill
                  className="object-cover"
                />
              </div>
              {cake.gallery && cake.gallery.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {cake.gallery.map((img, idx) => (
                    <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0 cursor-pointer border-2 border-transparent hover:border-brand transition-colors">
                      <Image src={img} alt={`${cake.name} view ${idx + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
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
                {cake.price}
              </p>

              <p className="text-foreground/80 leading-relaxed mb-10 text-lg">
                {cake.description}
              </p>

              <div className="mb-8">
                <h3 className="font-bold text-foreground mb-3 uppercase tracking-wider text-sm">Available Sizes</h3>
                <div className="flex flex-wrap gap-3">
                  {cake.sizes?.map((size, idx) => (
                    <div key={idx} className={`px-4 py-2 border rounded-md text-sm font-medium cursor-pointer transition-colors ${idx === 0 ? 'border-brand text-brand bg-brand/5' : 'border-gray-200 text-foreground/70 hover:border-brand'}`}>
                      {size}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-10">
                <h3 className="font-bold text-foreground mb-3 uppercase tracking-wider text-sm">Key Ingredients</h3>
                <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                  {cake.ingredients?.map((ing, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-foreground/80">
                      <Check size={16} className="text-brand shrink-0" /> {ing}
                    </li>
                  ))}
                </ul>
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
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
