import { Sparkles } from 'lucide-react'
import { NewsletterForm } from '@/components/blog/NewsletterForm'

export function NewsletterSection() {
  return (
    <section className="relative overflow-hidden border-t border-[#DCEBFF] bg-[#EAF4FF] py-16 sm:py-20">
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-[#1683FF]/[0.1] blur-[90px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-[12%] h-px w-56 bg-gradient-to-r from-transparent via-[#0066FF]/30 to-transparent" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="max-w-2xl">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#DCEBFF] bg-white/80 px-3 py-1.5 text-xs font-bold text-[#0066FF]">
            <Sparkles size={13} /> A thoughtful note, now and then
          </span>
          <h2 className="text-3xl font-extrabold leading-tight text-[#102A56] sm:text-4xl">Get Creative Insights <span className="gradient-text">in Your Inbox.</span></h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#64748B] sm:text-base">
            Stay updated with useful ideas, trends and insights from the world of design, technology and digital growth.
          </p>
        </div>
        <NewsletterForm />
      </div>
    </section>
  )
}