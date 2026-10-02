'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Palette, Workflow, Target, MessageSquare, Cpu, Gauge, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const REASONS = [
  {
    icon: Palette,
    title: 'Creative Quality',
    desc:  'Design that looks expensive and communicates with intent. Every asset we produce is crafted to the highest standard.',
    color: '#0066FF',
  },
  {
    icon: Workflow,
    title: 'End-to-End Execution',
    desc:  'One partner from idea to launch to growth. No hand-offs, no misalignment, no excuses.',
    color: '#1683FF',
  },
  {
    icon: Target,
    title: 'Business-Focused Strategy',
    desc:  'Every decision tied to measurable outcomes. We build for results, not aesthetics alone.',
    color: '#0052CC',
  },
  {
    icon: MessageSquare,
    title: 'Fast Communication',
    desc:  'Responsive, transparent and easy to work with. You will always know where your project stands.',
    color: '#0066FF',
  },
  {
    icon: Cpu,
    title: 'Technology Driven',
    desc:  'Modern, secure and scalable engineering. We build with the tools that will still work in five years.',
    color: '#1683FF',
  },
  {
    icon: Gauge,
    title: 'Performance Focused',
    desc:  'Speed, SEO and conversion built in from day one — not bolted on as an afterthought.',
    color: '#0052CC',
  },
]

export function HomeWhyUs() {
  const headRef = useRef<HTMLDivElement>(null)
  const inView  = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section className="py-24 lg:py-32 bg-white" id="why-oyecreative">
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
              Why OyeCreative
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#102A56]">
              Built different.<br />
              <span className="gradient-text">Built to deliver.</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
            <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066FF] hover:underline underline-offset-4 shrink-0">
              About Us <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map((r, i) => {
            const ref    = useRef<HTMLDivElement>(null)
            const iv     = useInView(ref, { once: true, margin: '-40px' })
            const Icon   = r.icon
            return (
              <motion.div
                key={r.title}
                ref={ref}
                initial={{ opacity: 0, y: 24 }}
                animate={iv ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                className="group relative flex flex-col gap-5 rounded-2xl border border-[#DCEBFF] bg-white p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[#0066FF]/40 hover:shadow-[0_8px_32px_-8px_#0066FF18]"
              >
                {/* background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 flex flex-col gap-5">
                  {/* icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: r.color + '18' }}
                  >
                    <Icon size={20} style={{ color: r.color }} />
                  </div>

                  {/* text */}
                  <div>
                    <h3 className="font-bold text-[#102A56] mb-2 group-hover:text-[#0066FF] transition-colors duration-200">
                      {r.title}
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">{r.desc}</p>
                  </div>

                  {/* animated line */}
                  <motion.div
                    className="h-0.5 rounded-full origin-left"
                    style={{ background: r.color }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 0.3 }}
                    whileHover={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
