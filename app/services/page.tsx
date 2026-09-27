import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ServicesHero } from '@/components/services/ServicesHero'
import { ServicesGrid } from '@/components/services/ServicesGrid'
import { ServicesCta } from '@/components/services/ServicesCta'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services — Nova Studio',
  description:
    'Website design, software development, graphic design, digital marketing, branding, logo design, photography, Google Ads and Meta Ads — all under one roof.',
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <ServicesHero />
        <ServicesGrid />
        <ServicesCta />
      </main>
      <Footer />
    </>
  )
}
