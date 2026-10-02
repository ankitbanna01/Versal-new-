import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ProcessPage } from '@/components/process/ProcessPage'

export const metadata: Metadata = {
  title: 'Our Process — OyeCreatives',
  description:
    'See how OyeCreatives takes projects from discovery and strategy through design, development, launch and growth.',
}

export default function ProcessRoute() {
  return (
    <>
      <Navbar activeHref="/process" />
      <main>
        <ProcessPage />
      </main>
      <Footer />
    </>
  )
}