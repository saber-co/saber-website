import { Hero } from "@/components/Hero"
import { StatsSection } from "@/components/StatsSection"
import { TweetsMarqueeSection } from "@/components/TweetsMarqueeSection"
import { FeatureBubblesSection } from "@/components/FeatureBubblesSection"
import { GuaranteeSection } from "@/components/GuaranteeSection"
import { ContactSection } from "@/components/ContactSection"

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "#050505" }}>
      <Hero />
      <StatsSection />
      <TweetsMarqueeSection />
      <FeatureBubblesSection />
      <GuaranteeSection />
      <ContactSection />
    </main>
  )
}
