'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const STEPS = [
  { num: '01', title: 'Discover',    desc: 'We learn your business, audience and goals to define the opportunity.' },
  { num: '02', title: 'Strategy',    desc: 'We map positioning, messaging and a roadmap that drives measurable outcomes.' },
  { num: '03', title: 'Design',      desc: 'We design interfaces, assets and content that feel premium and on-brand.' },
  { num: '04', title: 'Develop',     desc: 'We build fast, secure, scalable digital experiences that perform.' },
  { num: '05', title: 'Launch',      desc: 'We launch campaigns across the channels your customers actually use.' },
]

function StepCard({ step, index }: { step: (typeof STEPS)[0]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      className="relative flex flex-col gap-5"
    >
      {/* connector line to next (hidden on last) */}
      {index < STEPS.length - 1 && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.3, ease: EASE }}
          className="hidden lg:block absolute top-6 left-[calc(50%+28px)] right-[-calc(50%-28px)] h-px origin-left"
          style={{ background: 'linear-gradient(to right, #0066FF60, #0066FF10)' }}
        />
      )}

      {/* number circle */}
      <div className="relative z-10 flex flex-col items-center lg:items-start gap-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0066FF] shadow-[0_4px_16px_-4px_#0066FF60] text-sm font-extrabold text-white">
          {step.num}
        </div>
        <div className="flex flex-col gap-2 text-center lg:text-left">
          <h3 className="text-lg font-extrabold text-[#102A56]">{step.title}</h3>
          <p className="text-sm text-[#64748B] leading-relaxed">{step.desc}</p>
        </div>
      </div>
    </motion.div>
  )
}

/* scroll-driven progress bar */
function ProcessProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DCEBFF] overflow-hidden">
      <motion.div style={{ scaleX, transformOrigin: 'left' }} className="h-full bg-gradient-to-r from-[#0066FF] to-[#4D9CFF]" />
    </div>
  )
}

export function HomeProcess() {
  const headRef = useRef<HTMLDivElement>(null)
  const inView  = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden" id="process">
      <ProcessProgress />

      {/* background grid texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg opacity-60" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* header */}
        <div ref={headRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3 py-1 text-xs font-semibold text-[#0066FF] mb-5">
              How We Work
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#102A56]">
              A process built for<br />
              <span className="gradient-text">extraordinary results.</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.25 }}>
            <Link href="/process" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066FF] hover:underline underline-offset-4 shrink-0">
              Our Full Process <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* steps — horizontal on desktop, vertical on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {STEPS.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </div>

        {/* bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mt-16 rounded-2xl border border-[#DCEBFF] bg-[#EAF4FF] p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12"
        >
          <div className="flex-1">
            <div className="text-sm font-bold text-[#102A56] mb-1">Ready to get started?</div>
            <p className="text-sm text-[#64748B]">Every project begins with a free discovery call. Tell us your idea — we'll take it from there.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/book-now" className="inline-flex items-center gap-2 rounded-xl btn-primary px-5 py-2.5 text-sm font-semibold text-white">
              Start a Project <ArrowRight size={14} />
            </Link>
            <Link href="/process" className="inline-flex items-center gap-2 rounded-xl border border-[#DCEBFF] bg-white px-5 py-2.5 text-sm font-semibold text-[#102A56] hover:border-[#0066FF]/40 hover:text-[#0066FF] transition-all duration-200">
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
