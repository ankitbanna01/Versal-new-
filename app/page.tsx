import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { ServicesSection } from '@/components/ServicesSection'
import { WorkSection } from '@/components/WorkSection'
import { ProcessSection } from '@/components/ProcessSection'
import { CaseStudiesSection } from '@/components/CaseStudiesSection'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { AboutSection } from '@/components/AboutSection'
import { BlogSection } from '@/components/BlogSection'
import { CtaSection } from '@/components/CtaSection'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <WorkSection />
        <ProcessSection />
        <CaseStudiesSection />
        <TestimonialsSection />
        <AboutSection />
        <BlogSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
