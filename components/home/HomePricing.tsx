'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* Floating animated dots in background */
const DOTS = Array.from({ length: 12 }, (_, i) => ({
  x: (i * 55 + 18) % 90,
  y: (i * 47 + 12) % 85,
  size: ((i % 3) + 1) * 1.5,
  dur: 4 + (i % 3),
  delay: i * 0.35,
}))

const TIERS = [
  { label: 'Starter',    desc: 'Perfect for new businesses and personal brands just getting started.',           color: '#4D9CFF' },
  { label: 'Growth',     desc: 'Ideal for established businesses ready to scale their digital presence.',        color: '#0066FF' },
  { label: 'Enterprise', desc: 'Full-service partnerships for larger brands and complex digital requirements.',  color: '#0052CC' },
]

export function HomePricing() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="relative py-24 lg:py-32 bg-[#F5FAFF] overflow-hidden" id="pricing">

      {/* bg decoration */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full bg-[#0066FF] opacity-[0.05] blur-[80px]" />
        <div className="absolute -bottom-24 -left-24 h-[350px] w-[350px] rounded-full bg-[#1683FF] opacity-[0.04] blur-[70px]" />
        {DOTS.map((d, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -8, 0], opacity: [0.15, 0.5, 0.15] }}
            transition={{ repeat: Infinity, duration: d.dur, delay: d.delay, ease: 'easeInOut' }}
            className="absolute rounded-full bg-[#0066FF]"
            style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size }}
          />
        ))}
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3 py-1 text-xs font-semibold text-[#0066FF] mb-5">
            Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#102A56] mb-4">
            Find the right solution<br />
            <span className="gradient-text">for your business.</span>
          </h2>
          <p className="text-lg text-[#64748B] leading-relaxed">
            Every project is different. We offer flexible engagement models — from focused one-off
            projects to ongoing growth partnerships.
          </p>
        </motion.div>

        {/* tier cards */}
        <div className="grid sm:grid-cols-3 gap-5 mb-12">
          {TIERS.map((tier, i) => {
            const rv = useRef<HTMLDivElement>(null)
            const iv = useInView(rv, { once: true, margin: '-40px' })
            const isMiddle = i === 1
            return (
              <motion.div
                key={tier.label}
                ref={rv}
                initial={{ opacity: 0, y: 28 }}
                animate={iv ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.1, ease: EASE }}
                className={`relative rounded-2xl border p-6 flex flex-col gap-4 transition-all duration-300 ${
                  isMiddle
                    ? 'border-[#0066FF]/40 bg-white shadow-[0_16px_48px_-8px_#0066FF20] lg:-translate-y-2'
                    : 'border-[#DCEBFF] bg-white hover:border-[#0066FF]/30 hover:shadow-blue'
                }`}
              >
                {isMiddle && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#0066FF] px-3 py-0.5 text-[10px] font-bold text-white shadow-[0_4px_12px_-2px_#0066FF40]">
                    Most Popular
                  </div>
                )}

                {/* dot */}
                <div className="w-3 h-3 rounded-full" style={{ background: tier.color }} />

                <div>
                  <div className="text-lg font-extrabold text-[#102A56] mb-2">{tier.label}</div>
                  <p className="text-sm text-[#64748B] leading-relaxed">{tier.desc}</p>
                </div>

                {[
                  'Custom project scoping',
                  'Dedicated project manager',
                  'Fixed-price or retainer',
                ].map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-[#64748B]">
                    <CheckCircle2 size={13} style={{ color: tier.color }} className="shrink-0" />
                    {f}
                  </div>
                ))}

                <div className="mt-auto pt-2">
                  <Link
                    href="/pricing"
                    className={`inline-flex items-center justify-center gap-2 w-full rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 ${
                      isMiddle
                        ? 'btn-primary text-white'
                        : 'border border-[#DCEBFF] text-[#102A56] hover:border-[#0066FF]/40 hover:text-[#0066FF] hover:bg-[#F5FAFF]'
                    }`}
                  >
                    View Pricing <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-[#64748B]"
        >
          All projects start with a free 30-minute discovery call.{' '}
          <Link href="/book-now" className="text-[#0066FF] font-semibold hover:underline underline-offset-4">
            Book yours today →
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
