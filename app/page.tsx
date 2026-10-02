import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { HomeHero } from '@/components/home/HomeHero'
import { HomeServicesPreview } from '@/components/home/HomeServicesPreview'
import { HomePortfolio } from '@/components/home/HomePortfolio'
import { HomeProcess } from '@/components/home/HomeProcess'
import { HomeWhyUs } from '@/components/home/HomeWhyUs'
import { HomePricing } from '@/components/home/HomePricing'
import { HomeBlog } from '@/components/home/HomeBlog'
import { HomeFinalCta } from '@/components/home/HomeFinalCta'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OyeCreative — We Turn Ideas Into Digital Experiences',
  description:
    'Creative design, technology and digital solutions built to help ambitious businesses move forward. Website design, branding, digital marketing, Google Ads & more.',
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HomeHero />
        <HomeServicesPreview />
        <HomePortfolio />
        <HomeProcess />
        <HomeWhyUs />
        <TestimonialsSection />
        <HomePricing />
        <HomeBlog />
        <HomeFinalCta />
      </main>
      <Footer />
    </>
  )
}
