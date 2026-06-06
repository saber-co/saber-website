import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { LogoStrip } from "@/components/LogoStrip";
import { StatsSection } from "@/components/StatsSection";
import { TweetsMarqueeSection } from "@/components/TweetsMarqueeSection";
import { FeatureBubblesSection } from "@/components/FeatureBubblesSection";
import { ContactSection } from "@/components/ContactSection";

function App() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <LogoStrip />
      <StatsSection />
      <TweetsMarqueeSection />
      <FeatureBubblesSection />
      <ContactSection />
    </main>
  );
}

export default App;
