'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const cases = [
  {
    title: 'How We Grew a Restaurant Brand from Zero to 10k Followers',
    industry: 'Restaurant',
    result: '+10k Social Followers',
    image: '/images/case-restaurant.png',
    href: '/case-studies',
  },
  {
    title: 'Real Estate Agency: 3× Lead Growth with Performance Ads',
    industry: 'Real Estate',
    result: '3× Lead Volume',
    image: '/images/case-realestate.png',
    href: '/case-studies',
  },
]

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: EASE },
  }),
}

export function CaseStudiesSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#F5FAFF]" id="case-studies">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3 py-1 text-xs font-semibold text-[#0066FF] mb-4">
              Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#102A56] text-balance">
              Real results for{' '}
              <span className="gradient-text">real businesses</span>
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066FF] hover:underline underline-offset-4 shrink-0"
          >
            All Case Studies
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {cases.map((cs, i) => (
            <motion.div
              key={cs.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              <Link
                href={cs.href}
                className="group flex flex-col rounded-2xl overflow-hidden border border-[#DCEBFF] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#0066FF]/40 hover:shadow-blue-lg"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={cs.image}
                    alt={cs.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Category badge on image */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="rounded-full bg-white/90 backdrop-blur-sm border border-[#DCEBFF] px-2.5 py-0.5 text-xs font-semibold text-[#102A56]">
                      {cs.industry}
                    </span>
                    <span className="rounded-full bg-[#0066FF] px-2.5 py-0.5 text-xs font-bold text-white shadow-[0_2px_8px_0_#0066FF40]">
                      {cs.result}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-3">
                  <h3 className="font-bold text-[#102A56] leading-snug group-hover:text-[#0066FF] transition-colors duration-200">
                    {cs.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0066FF]">
                    Read case study <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
