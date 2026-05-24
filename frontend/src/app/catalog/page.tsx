import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CatalogPreview } from "@/components/home/CatalogPreview";

export const metadata = {
  title: "Cakes Catalog | Oya Kekars",
  description: "Explore our full catalog of delicious luxury cakes, pastries, and more.",
};

export default function CatalogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full pt-[76px]">
        {/* We pass isFullCatalog to force it to show all cakes and hide the 'Explore All' button */}
        <CatalogPreview isFullCatalog={true} />
      </main>
      <Footer />
    </div>
  );
}
