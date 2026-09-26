'use client'

import { motion } from 'framer-motion'
import { PROCESS_STEPS } from '@/lib/constants'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.055, ease: EASE },
  }),
}

export function ProcessSection() {
  return (
    <section className="py-24 lg:py-32 bg-white" id="process">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3 py-1 text-xs font-semibold text-[#0066FF] mb-4">
            How We Work
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#102A56] text-balance">
            A proven process from{' '}
            <span className="gradient-text">discovery to growth</span>
          </h2>
          <p className="mt-4 text-[#64748B] leading-relaxed">
            Every engagement follows our end-to-end framework, ensuring consistency, clarity, and
            measurable outcomes at every stage.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="relative rounded-2xl border border-[#DCEBFF] bg-white p-5 transition-all duration-300 hover:border-[#0066FF]/40 hover:shadow-blue"
            >
              {/* Step number */}
              <div className="flex items-center gap-3 mb-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAF4FF] text-xs font-extrabold text-[#0066FF]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-bold text-[#102A56] text-sm">{step.title}</h3>
              </div>
              <p className="text-xs text-[#64748B] leading-relaxed">{step.description}</p>

              {/* Connector dot (xl only, not last) */}
              {i < PROCESS_STEPS.length - 1 && (
                <div className="absolute top-[28px] -right-2.5 w-5 h-px bg-[#DCEBFF] hidden xl:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
