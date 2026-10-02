import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PricingPage } from '@/components/pricing/PricingPage'

export const metadata: Metadata = {
  title: 'Pricing — OyeCreatives',
  description:
    'Explore OyeCreatives engagement plans and request a custom quote for creative, technology and digital growth work.',
}

export default function PricingRoute() {
  return (
    <>
      <Navbar activeHref="/pricing" />
      <main className="overflow-x-hidden">
        <PricingPage />
      </main>
      <Footer />
    </>
  )
}