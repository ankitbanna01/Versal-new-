'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* Particles purely decorative */
const DOTS = Array.from({ length: 16 }, (_, i) => ({
  x: (i * 43 + 11) % 92,
  y: (i * 61 + 7) % 86,
  size: ((i % 3) + 1) * 2,
  dur: 4 + (i % 3),
  delay: i * 0.3,
}))

export function HomeCreativeBreak() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const y2 = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const rotZ = useTransform(scrollYProgress, [0, 1], [-4, 4])

  /* word-by-word reveal */
  const words = ['IDEAS', 'SHOULD', 'NEVER', 'LOOK', 'ORDINARY.']

  return (
    <section
      ref={ref}
      className="relative py-28 lg:py-40 bg-[#071A3D] overflow-hidden"
    >
      {/* ── animated background geometry ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large gradient orbs */}
        <motion.div style={{ y: y1 }} className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#0066FF] opacity-[0.08] blur-[120px]" />
        <motion.div style={{ y: y2 }} className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#1683FF] opacity-[0.06] blur-[100px]" />

        {/* Grid texture */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(to right,#0066FF22 1px,transparent 1px),linear-gradient(to bottom,#0066FF22 1px,transparent 1px)', backgroundSize: '56px 56px' }} />

        {/* Rotating large ring */}
        <motion.div
          style={{ rotateZ: rotZ }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#0066FF]/10"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#0066FF]/5"
        />

        {/* Floating particles */}
        {DOTS.map((d, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -10, 0], opacity: [0.15, 0.5, 0.15] }}
            transition={{ repeat: Infinity, duration: d.dur, delay: d.delay, ease: 'easeInOut' }}
            className="absolute rounded-full bg-[#0066FF]"
            style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size }}
          />
        ))}

        {/* 3D floating geometry shapes */}
        <motion.div
          animate={{ y: [0, -16, 0], rotate: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          className="absolute top-[15%] right-[8%] w-16 h-16 rounded-2xl border-2 border-[#0066FF]/20 bg-[#0066FF]/5"
        />
        <motion.div
          animate={{ y: [0, 14, 0], rotate: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-[20%] left-[6%] w-12 h-12 rounded-full border-2 border-[#4D9CFF]/20 bg-[#4D9CFF]/5"
        />
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut', delay: 0.8 }}
          className="absolute top-[60%] right-[15%] w-8 h-8 rounded-lg border border-[#0066FF]/15 bg-[#0066FF]/4"
        />
      </div>

      {/* ── main content ── */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">

        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 px-3.5 py-1.5 text-xs font-bold tracking-widest text-[#4D9CFF] uppercase mb-10"
        >
          Our Philosophy
        </motion.div>

        {/* Large headline — word by word */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-8">
          {words.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: 0.65, delay: 0.1 + i * 0.12, ease: EASE }}
              className={`text-[3rem] sm:text-[4.5rem] lg:text-[6rem] xl:text-[7rem] font-extrabold leading-none tracking-tight ${word === 'ORDINARY.' ? 'gradient-text' : 'text-white'
                }`}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* sub text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
          className="text-lg text-[#94A3B8] max-w-xl mx-auto leading-relaxed"
        >
          Every pixel, every word, every campaign we create is built to be
          distinctive, purposeful and impossible to ignore.
        </motion.p>

      </div>
    </section>
  )
}
