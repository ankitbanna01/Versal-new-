'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const CASES = [
  {
    title:    'How We Built a Restaurant Brand from Zero to 10k Followers',
    industry: 'Restaurant & Hospitality',
    result:   '+10k Social Followers',
    summary:  'A new restaurant needed a full brand identity, social media presence, and content strategy. We built the brand system, shot the photography, and launched targeted Meta campaigns.',
    image:    '/images/case-restaurant.png',
    href:     '/case-studies',
    color:    '#0066FF',
  },
  {
    title:    'Real Estate Agency: 3× Lead Growth with Performance Ads',
    industry: 'Real Estate',
    result:   '3× Lead Volume',
    summary:  'An established agency was generating expensive leads through cold outreach. We rebuilt their funnel with a high-converting landing page, Google Ads and retargeting — tripling qualified leads in 90 days.',
    image:    '/images/case-realestate.png',
    href:     '/case-studies',
    color:    '#1683FF',
  },
]

export function HomeCaseStudies() {
  const headRef = useRef<HTMLDivElement>(null)
  const inView  = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section className="py-24 lg:py-32 bg-white" id="case-studies">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* header */}
        <div ref={headRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3 py-1 text-xs font-semibold text-[#0066FF] mb-5">
              Case Studies
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#102A56]">
              Real results for<br />
              <span className="gradient-text">real businesses.</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
            <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066FF] hover:underline underline-offset-4 shrink-0">
              View All Case Studies <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* cards */}
        <div className="flex flex-col gap-8">
          {CASES.map((cs, i) => {
            const ref    = useRef<HTMLDivElement>(null)
            const inView = useInView(ref, { once: true, margin: '-80px' })
            const reversed = i % 2 !== 0
            return (
              <motion.div
                key={cs.title}
                ref={ref}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
              >
                <Link
                  href={cs.href}
                  className={`group grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-[#DCEBFF] bg-white transition-all duration-400 hover:border-[#0066FF]/30 hover:shadow-[0_24px_60px_-16px_#0066FF18] ${reversed ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''}`}
                >
                  {/* image */}
                  <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden min-h-[260px]">
                    <Image
                      src={cs.image}
                      alt={cs.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width:1024px) 100vw,50vw"
                    />
                    {/* gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/40 to-transparent" />
                    {/* result badge */}
                    <div className="absolute top-5 left-5 flex items-center gap-2">
                      <span className="rounded-full bg-white/90 backdrop-blur-sm border border-[#DCEBFF] px-2.5 py-1 text-xs font-semibold text-[#102A56]">
                        {cs.industry}
                      </span>
                      <span className="rounded-full bg-[#0066FF] px-2.5 py-1 text-xs font-bold text-white shadow-[0_2px_8px_0_#0066FF40]">
                        {cs.result}
                      </span>
                    </div>
                  </div>

                  {/* content */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center gap-6 bg-white">
                    <div className="flex items-center gap-2">
                      <div className="h-px w-8" style={{ background: cs.color }} />
                      <span className="text-xs font-bold tracking-widest uppercase" style={{ color: cs.color }}>{cs.industry}</span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-extrabold text-[#102A56] leading-snug group-hover:text-[#0066FF] transition-colors duration-200">
                      {cs.title}
                    </h3>
                    <p className="text-[#64748B] leading-relaxed">
                      {cs.summary}
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm font-bold text-[#0066FF] self-start">
                      <span className="relative">
                        View Case Study
                        <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#0066FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </span>
                      <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
