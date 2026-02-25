import { Hero } from "@/components/Hero"
import { StatsSection } from "@/components/StatsSection"
import { FeatureBubblesSection } from "@/components/FeatureBubblesSection"
import { ContactSection } from "@/components/ContactSection"

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "#050505" }}>
      <Hero />
      <StatsSection />
      <FeatureBubblesSection />
      <ContactSection />
    </main>
  )
}
