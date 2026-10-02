'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    content:
      'OyeCreative completely transformed our brand. The new identity resonates perfectly with our audience and we have seen a measurable increase in customer engagement since launch.',
    author: 'Sarah Al-Rashid',
    company: 'Bloom Restaurant Group',
    role: 'Founder & CEO',
    rating: 5,
  },
  {
    content:
      'The website they built for us is fast, beautiful, and actually converts visitors into leads. Our Google Ads campaign is now generating 3× more qualified inquiries than before.',
    author: 'James Harrington',
    company: 'Harrington Real Estate',
    role: 'Managing Director',
    rating: 5,
  },
  {
    content:
      'Working with OyeCreative felt seamless from day one. They understood our vision immediately, delivered ahead of schedule, and the quality of the creative work is outstanding.',
    author: 'Priya Mehta',
    company: 'Zenith Wellness',
    role: 'Marketing Director',
    rating: 5,
  },
]

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: EASE },
  }),
}

export function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 bg-white" id="testimonials">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-xl mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3 py-1 text-xs font-semibold text-[#0066FF] mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#102A56] text-balance">
            Clients who trust us to{' '}
            <span className="gradient-text">deliver results</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="flex flex-col gap-5 rounded-2xl border border-[#DCEBFF] bg-white p-6 transition-all duration-300 hover:border-[#0066FF]/40 hover:shadow-blue"
            >
              {/* Quote icon + stars */}
              <div className="flex items-center justify-between">
                <div className="h-9 w-9 rounded-xl bg-[#EAF4FF] flex items-center justify-center">
                  <Quote size={16} className="text-[#0066FF] fill-[#0066FF]" />
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} size={12} className="fill-[#0066FF] text-[#0066FF]" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <p className="text-sm text-[#64748B] leading-relaxed flex-1">
                &ldquo;{t.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#DCEBFF]">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#0066FF] to-[#1683FF] flex items-center justify-center text-sm font-extrabold text-white shrink-0 shadow-[0_2px_8px_0_#0066FF30]">
                  {t.author[0]}
                </div>
                <div>
                  <div className="text-sm font-bold text-[#102A56]">{t.author}</div>
                  <div className="text-xs text-[#64748B]">{t.role}, {t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
