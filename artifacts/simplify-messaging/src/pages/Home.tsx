import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { KnowledgeBase } from "@/components/sections/KnowledgeBase";
import { MultiAgent } from "@/components/sections/MultiAgent";
import { MassCampaigns } from "@/components/sections/MassCampaigns";
import { Analytics } from "@/components/sections/Analytics";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        <KnowledgeBase />
        <MultiAgent />
        <MassCampaigns />
        <Analytics />
      </main>

      <Footer />
    </div>
  );
}
