import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { BlogIndex } from '@/components/blog/BlogIndex'

export const metadata: Metadata = {
  title: 'Ideas, Insights & Digital Inspiration — OyeCreatives',
  description:
    'Explore ideas, trends and practical insights about design, technology, branding and digital growth from OyeCreatives.',
}

export default function BlogRoute() {
  return (
    <>
      <Navbar activeHref="/blog" />
      <main>
        <BlogIndex />
      </main>
      <Footer />
    </>
  )
}