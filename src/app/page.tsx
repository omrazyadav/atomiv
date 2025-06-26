import { HeroSection } from '@/components/blocks/hero-section-1'
import { PainPoints } from '@/components/PainPoints'
import { HowItWorks } from '@/components/HowItWorks'
import { EnhancedFeatures } from '@/components/ui/enhanced-features'
import { TestimonialsDemo } from '@/components/blocks/testimonials-demo'
import { Pricing } from '@/components/Pricing'
import { FAQ } from '@/components/FAQ'
import { Footer } from '@/components/Footer'
import { EnhancedNavBarDemo } from '@/components/blocks/enhanced-navbar-demo'

export default function Home() {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-black">
      <EnhancedNavBarDemo />
      
      <section id="hero">
        <HeroSection />
      </section>
      
      <section id="painpoints">
        <PainPoints />
      </section>
      
      <section id="how-it-works">
        <HowItWorks />
      </section>
      
      <section id="features">
        <EnhancedFeatures />
      </section>
      
      <section id="testimonials">
        <TestimonialsDemo />
      </section>
      
      <section id="pricing">
        <Pricing />
      </section>
      
      <section id="faq">
        <FAQ />
      </section>
      
      <Footer />
    </div>
  )
}
