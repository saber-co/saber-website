import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { LogoStrip } from "@/components/LogoStrip";
import { StatsSection } from "@/components/StatsSection";
import { FeatureBubblesSection } from "@/components/FeatureBubblesSection";
import { MetricsSection } from "@/components/MetricsSection";
import { VoicesSection } from "@/components/VoicesSection";
import { ContactSection } from "@/components/ContactSection";

function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <LogoStrip />
      <StatsSection />
      <FeatureBubblesSection />
      <MetricsSection />
      <VoicesSection />
      <ContactSection />
    </main>
  );
}

export default App;
