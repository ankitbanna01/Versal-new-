'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, MessageCircle, CheckCircle2, Zap } from 'lucide-react'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const TRUST_ITEMS = [
  '24-hour response guarantee',
  'Fixed-price project quotes',
  'No obligation consultation',
  'Dedicated project manager',
]

const MINI_SERVICES = [
  'Website Design',
  'Software Dev',
  'Graphic Design',
  'Digital Marketing',
  'Branding',
  'Logo Design',
  'Photography',
  'Google Ads',
  'Meta Ads',
]

export function ServicesCta() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-24 lg:py-36 bg-[#F5FAFF] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative rounded-3xl bg-[#071A3D] overflow-hidden"
        >
          {/* ── Background decoration ── */}
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-[#0066FF] opacity-[0.12] blur-[100px]" />
            <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-[#1683FF] opacity-[0.08] blur-[80px]" />
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #0066FF22 1px, transparent 1px), linear-gradient(to bottom, #0066FF22 1px, transparent 1px)',
                backgroundSize: '56px 56px',
              }}
            />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-0">
            {/* ── Left: main CTA ── */}
            <div className="flex flex-col gap-8 p-10 lg:p-16 lg:border-r border-white/10">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
                className="inline-flex items-center gap-2 self-start rounded-full border border-[#0066FF]/40 bg-[#0066FF]/15 px-3.5 py-1.5 text-xs font-bold tracking-widest text-[#4D9CFF] uppercase"
              >
                <Zap size={11} className="text-[#4D9CFF] fill-[#4D9CFF]" />
                Ready to Start?
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.16, ease: EASE }}
                className="text-4xl sm:text-5xl lg:text-[3.2rem] font-extrabold leading-[1.06] tracking-tight text-white"
              >
                Let's Build Something{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #4D9CFF 0%, #1683FF 60%, #0066FF 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Remarkable.
                </span>
              </motion.h2>

              {/* Sub */}
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
                className="text-lg text-[#94A3B8] leading-relaxed max-w-md"
              >
                Tell us about your project. We will review your brief and come back
                with a tailored strategy and fixed-price quote within 24 hours.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.28, ease: EASE }}
                className="flex flex-wrap items-center gap-3"
              >
                <Link
                  href="/book-now"
                  className="inline-flex items-center gap-2 rounded-xl btn-primary px-7 py-3.5 text-sm font-semibold text-white"
                >
                  Start Your Project
                  <ArrowRight size={15} />
                </Link>
                <a
                  href="https://wa.me/15550000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors duration-200"
                >
                  <MessageCircle size={15} className="text-[#25D366]" />
                  Chat on WhatsApp
                </a>
              </motion.div>

              {/* Trust items */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.38, ease: EASE }}
                className="flex flex-wrap gap-x-5 gap-y-2.5 pt-2 border-t border-white/10"
              >
                {TRUST_ITEMS.map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-xs text-[#64748B]">
                    <CheckCircle2 size={12} className="text-[#4D9CFF] shrink-0" />
                    {item}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: service list ── */}
            <div className="flex flex-col justify-center gap-6 p-10 lg:p-16">
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xs font-black tracking-[0.25em] text-[#4D9CFF] uppercase"
              >
                All Services
              </motion.p>
              <div className="grid grid-cols-1 gap-0">
                {MINI_SERVICES.map((svc, i) => (
                  <motion.div
                    key={svc}
                    initial={{ opacity: 0, x: 16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.25 + i * 0.06, ease: EASE }}
                    className="group flex items-center justify-between border-b border-white/8 py-3.5 cursor-default"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-[#0066FF]/50">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm font-semibold text-[#94A3B8] group-hover:text-white transition-colors duration-200">
                        {svc}
                      </span>
                    </div>
                    <Link
                      href={`/services/${svc.toLowerCase().replace(/\s+/g, '-')}`}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[#4D9CFF]"
                      aria-label={`Go to ${svc}`}
                    >
                      <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
