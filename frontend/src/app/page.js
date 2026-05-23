import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { CatalogPreview } from "@/components/home/CatalogPreview";
import { FreshDaily } from "@/components/home/FreshDaily";
import { HowItWorks } from "@/components/home/HowItWorks";
import { AboutUs } from "@/components/home/AboutUs";
import { ChefInfo } from "@/components/home/ChefInfo";
import { GoogleReviews } from "@/components/home/GoogleReviews";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { Contacts } from "@/components/home/Contacts";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full">
        <HeroSection />
        <CatalogPreview />
        <FreshDaily />
        <HowItWorks />
        <AboutUs />
        <ChefInfo />
        <GoogleReviews />
        <InstagramFeed />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}
