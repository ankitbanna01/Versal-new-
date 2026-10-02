'use client'

import { useRef, useCallback } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MessageCircle, CheckCircle2 } from 'lucide-react'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* Floating geometry */
const SHAPES = [
  { size: 80,  top: '8%',  left: '5%',  delay: 0,    dur: 9,  rotate: 12  },
  { size: 48,  top: '65%', left: '3%',  delay: 1.2,  dur: 11, rotate: -8  },
  { size: 64,  top: '15%', right: '4%', delay: 0.6,  dur: 8,  rotate: 20  },
  { size: 36,  top: '75%', right: '8%', delay: 1.8,  dur: 10, rotate: -15 },
  { size: 52,  top: '40%', left: '10%', delay: 0.9,  dur: 12, rotate: 5   },
  { size: 40,  top: '50%', right: '5%', delay: 1.5,  dur: 9,  rotate: -10 },
] as const

/* Animated particles */
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  x: (i * 47 + 13) % 94,
  y: (i * 59 + 7)  % 88,
  r: ((i % 3) + 1) * 1.5,
  dur: 3.5 + (i % 4) * 0.5,
  delay: i * 0.25,
}))

const TRUST = [
  '24-hour response guarantee',
  'Fixed-price project quotes',
  'No obligation consultation',
  'Dedicated project manager',
]

export function HomeFinalCta() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView     = useInView(sectionRef, { once: true, amount: 0.25 })

  /* mouse parallax for shapes */
  const rawMx = useMotionValue(0)
  const rawMy = useMotionValue(0)
  const mx = useSpring(rawMx, { stiffness: 60, damping: 18 })
  const my = useSpring(rawMy, { stiffness: 60, damping: 18 })
  const shapeX = useTransform(mx, [-1, 1], ['-12px', '12px'])
  const shapeY = useTransform(my, [-1, 1], ['-8px',  '8px' ])

  const handleMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = sectionRef.current?.getBoundingClientRect()
    if (!r) return
    rawMx.set(((e.clientX - r.left) / r.width) * 2 - 1)
    rawMy.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }, [rawMx, rawMy])
  const handleLeave = useCallback(() => { rawMx.set(0); rawMy.set(0) }, [rawMx, rawMy])

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative py-28 lg:py-40 bg-[#071A3D] overflow-hidden"
      id="contact"
    >
      {/* ── animated background ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* gradient orbs */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#0066FF] opacity-[0.10] blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#1683FF] opacity-[0.07] blur-[100px]" />

        {/* grid */}
        <div className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: 'linear-gradient(to right,#0066FF22 1px,transparent 1px),linear-gradient(to bottom,#0066FF22 1px,transparent 1px)', backgroundSize: '56px 56px' }} />

        {/* particles */}
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -10, 0], opacity: [0.15, 0.5, 0.15] }}
            transition={{ repeat: Infinity, duration: p.dur, delay: p.delay, ease: 'easeInOut' }}
            className="absolute rounded-full bg-[#0066FF]"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.r * 2, height: p.r * 2 }}
          />
        ))}

        {/* 3D floating shapes */}
        {SHAPES.map((s, i) => (
          <motion.div
            key={i}
            style={{
              x: shapeX,
              y: shapeY,
              position: 'absolute',
              top: s.top,
              left: ('left' in s) ? s.left : undefined,
              right: ('right' in s) ? s.right : undefined,
              width: s.size,
              height: s.size,
            }}
            animate={{ y: [0, -14, 0], rotate: [0, s.rotate, 0] }}
            transition={{ repeat: Infinity, duration: s.dur, delay: s.delay, ease: 'easeInOut' }}
            className="rounded-2xl border border-[#0066FF]/15 bg-[#0066FF]/5"
          />
        ))}
      </div>

      {/* ── content ── */}
      <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">

        {/* badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 px-3.5 py-1.5 text-xs font-bold tracking-widest text-[#4D9CFF] uppercase mb-8"
        >
          Ready to Start?
        </motion.div>

        {/* headline */}
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="text-4xl sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-extrabold leading-[1.05] tracking-tight text-white mb-6"
        >
            Have an idea?{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #4D9CFF 0%, #1683FF 60%, #0066FF 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Let&apos;s Make It Remarkable.
          </span>
        </motion.h2>

        {/* sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
          className="text-xl text-[#94A3B8] leading-relaxed max-w-xl mx-auto mb-10"
        >
          Let&apos;s turn it into something remarkable. Tell us what you have in mind and we will
          come back within 24 hours.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          <Link
            href="/book-now"
            className="inline-flex items-center gap-2 rounded-xl btn-primary px-8 py-4 text-base font-semibold text-white"
          >
            Book Now
            <ArrowRight size={16} />
          </Link>
          <a
            href="https://wa.me/15550000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors duration-200"
          >
            <MessageCircle size={16} className="text-[#25D366]" />
            Chat on WhatsApp
          </a>
        </motion.div>

        {/* trust items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {TRUST.map(t => (
            <div key={t} className="flex items-center gap-1.5 text-xs text-[#64748B]">
              <CheckCircle2 size={12} className="text-[#4D9CFF] shrink-0" />
              {t}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
