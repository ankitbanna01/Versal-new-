import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { AboutPage } from '@/components/about/AboutPage'

export const metadata: Metadata = {
  title: 'About Us — OyeCreatives',
  description:
    'Meet OyeCreatives: a team of creative thinkers, designers, and developers helping brands build a strong digital presence and grow.',
}

export default function AboutRoute() {
  return (
    <>
      <Navbar activeHref="/about" />
      <main>
        <AboutPage />
      </main>
      <Footer socialIcons />
    </>
  )
}