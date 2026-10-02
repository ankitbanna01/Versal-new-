'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MessageCircle, CheckCircle2 } from 'lucide-react'
import { whatsappUrl, WHATSAPP_MESSAGES } from '@/lib/whatsapp'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const trust = [
  '24-hour response guarantee',
  'No obligation initial consultation',
  'Fixed-price project quotes',
]

export function CtaSection() {
  const waUrl = whatsappUrl(WHATSAPP_MESSAGES.consultation)

  return (
    <section className="py-24 lg:py-32 bg-[#F5FAFF]" id="contact">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: EASE }}
          className="relative rounded-3xl overflow-hidden border border-[#DCEBFF] bg-white p-10 lg:p-16 text-center shadow-blue-lg"
        >
          {/* Background decorative blobs */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 h-[360px] w-[360px] rounded-full bg-[#0066FF] opacity-[0.05] blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 h-[320px] w-[320px] rounded-full bg-[#1683FF] opacity-[0.05] blur-[80px]" />
          </div>

          <div className="relative flex flex-col items-center gap-7 max-w-2xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3.5 py-1.5 text-xs font-semibold text-[#0066FF]">
              Ready to Start?
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#102A56] text-balance">
              Let&apos;s build something{' '}
              <span className="gradient-text">remarkable together</span>
            </h2>

            {/* Sub-copy */}
            <p className="text-lg text-[#64748B] text-balance leading-relaxed">
              Tell us about your project. We will review your brief and come back with a tailored
              strategy within 24 hours.
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {trust.map((t) => (
                <div key={t} className="flex items-center gap-1.5 text-xs text-[#64748B]">
                  <CheckCircle2 size={13} className="text-[#0066FF] shrink-0" />
                  {t}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/book-now"
                className="inline-flex items-center gap-2 rounded-xl btn-primary px-7 py-3.5 text-sm font-semibold text-white"
              >
                Start Your Project
                <ArrowRight size={16} />
              </Link>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#DCEBFF] bg-white px-7 py-3.5 text-sm font-semibold text-[#102A56] transition-all duration-200 hover:border-[#0066FF]/40 hover:text-[#0066FF] hover:bg-[#F5FAFF]"
              >
                <MessageCircle size={16} className="text-[#25D366]" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
