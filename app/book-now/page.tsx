import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { BookNowPage } from '@/components/book-now/BookNowPage'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Book a Project — OyeCreatives',
  description:
    'Tell OyeCreatives about your project. Share your goals, timeline and budget so our team can recommend a clear path forward.',
}

function firstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] ?? '' : value ?? ''
}

export default async function BookNowRoute({ searchParams }: { searchParams: Promise<{ plan?: string | string[]; service?: string | string[] }> }) {
  const query = await searchParams
  const email = process.env.CONTACT_EMAIL || 'hello@oyecreative.us'
  const phone = process.env.CONTACT_PHONE || ''
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''

  return (
    <>
      <Navbar />
      <main>
        <BookNowPage email={email} phone={phone} whatsapp={whatsapp} initialPlan={firstParam(query.plan)} initialService={firstParam(query.service)} />
      </main>
      <Footer />
    </>
  )
}