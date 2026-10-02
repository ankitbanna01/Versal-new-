'use client'

import {
  useRef,
  useCallback,
  useEffect,
  useState,
} from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
  animate,
  useInView,
} from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, TrendingUp, Users, Star, Zap } from 'lucide-react'
import { OyeLogo } from '@/components/OyeLogo'

/* ─────────────────── constants ─────────────────── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const count = useMotionValue(0)
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => count.on('change', latest => setDisplayValue(Math.round(latest))), [count])
  useEffect(() => {
    if (!inView) return
    const controls = animate(count, value, { duration: 1.35, ease: 'easeOut' })
    return () => controls.stop()
  }, [count, inView, value])

  return (
    <div ref={ref} className="flex flex-col gap-0.5">
      <span className="text-2xl font-extrabold text-[#0066FF]">{displayValue}{suffix}</span>
      <span className="text-xs text-[#64748B]">{label}</span>
    </div>
  )
}

/* ─────────────────── particle dots ─────────────── */
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  x: (i * 41 + 17) % 96,
  y: (i * 57 + 9) % 88,
  r: ((i % 3) + 1) * 1.5,
  delay: (i * 0.28) % 3,
  dur: 3.2 + (i % 4) * 0.6,
}))

/* ─────────────────── hero visual slides ─────────────────── */
function BrowserMockup() {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden flex flex-col border border-[#DCEBFF] bg-white shadow-[0_12px_40px_-8px_#0066FF22]">
      {/* Chrome bar */}
      <div className="flex items-center gap-1.5 px-3 py-2.5 bg-[#F5FAFF] border-b border-[#DCEBFF] shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FCA5A5]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FDE68A]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#6EE7B7]" />
        <div className="flex-1 ml-2 h-5 rounded-full bg-white border border-[#DCEBFF] flex items-center px-2 gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]/30" />
          <div className="h-1.5 flex-1 rounded-full bg-[#EAF4FF]" />
        </div>
      </div>
      {/* Page skeleton */}
      <div className="flex-1 p-3.5 flex flex-col gap-3">
        {/* Nav row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-[#0066FF]" />
            <div className="h-2 w-14 rounded-full bg-[#102A56]/20" />
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map(i => <div key={i} className="h-1.5 w-7 rounded-full bg-[#DCEBFF]" />)}
            <div className="h-5 w-12 rounded-lg bg-[#0066FF] opacity-80" />
          </div>
        </div>
        {/* Hero block */}
        <div className="flex-1 rounded-xl bg-gradient-to-br from-[#0066FF]/8 via-[#EAF4FF] to-[#F5FAFF] flex items-center px-4 gap-4">
          <div className="flex-1 flex flex-col gap-2">
            <div className="h-3 w-32 rounded-full bg-[#102A56]/20" />
            <div className="h-2 w-24 rounded-full bg-[#DCEBFF]" />
            <div className="flex gap-2 mt-1">
              <div className="h-6 w-14 rounded-lg bg-[#0066FF] opacity-80" />
              <div className="h-6 w-14 rounded-lg border border-[#DCEBFF]" />
            </div>
          </div>
          <div className="w-14 h-16 rounded-xl bg-gradient-to-b from-[#EAF4FF] to-[#DCEBFF]" />
        </div>
        {/* Feature row */}
        <div className="grid grid-cols-3 gap-2">
          {['bg-[#0066FF]/8', 'bg-[#EAF4FF]', 'bg-[#F5FAFF]'].map((bg, i) => (
            <div key={i} className={`${bg} rounded-xl p-2 border border-[#DCEBFF]`}>
              <div className="w-4 h-4 rounded-lg bg-[#0066FF]/20 mb-1" />
              <div className="h-1.5 rounded-full bg-[#DCEBFF]" />
              <div className="h-1 rounded-full bg-[#EAF4FF] mt-1 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PhoneMockup({ offset = 0 }: { offset?: number }) {
  return (
    <div
      className="w-20 rounded-[1.4rem] border-2 border-[#DCEBFF] bg-white overflow-hidden flex flex-col shadow-[0_8px_24px_-4px_#0066FF18]"
      style={{ height: 140, marginTop: offset }}
    >
      <div className="h-4 bg-[#F5FAFF] border-b border-[#DCEBFF] flex items-center justify-center shrink-0">
        <div className="w-6 h-0.5 rounded-full bg-[#DCEBFF]" />
      </div>
      <div className="flex-1 flex flex-col gap-1.5 p-1.5">
        <div className="h-10 rounded-lg bg-gradient-to-b from-[#EAF4FF] to-[#F5FAFF]" />
        <div className="h-1.5 rounded-full bg-[#DCEBFF]" />
        <div className="h-1 rounded-full bg-[#EAF4FF] w-3/4" />
        <div className="h-5 w-12 rounded-lg bg-[#0066FF]/20 mt-auto" />
      </div>
    </div>
  )
}

function AnalyticsMockup() {
  return (
    <div className="rounded-2xl border border-[#DCEBFF] bg-white p-3 shadow-blue flex flex-col gap-2">
      <div className="flex items-center justify-between mb-0.5">
        <div className="h-2 w-20 rounded-full bg-[#102A56]/20" />
        <div className="flex gap-1">
          {['#0066FF', '#1683FF', '#4D9CFF'].map(c => (
            <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
      </div>
      {/* Bar chart */}
      <div className="flex items-end gap-1 h-10">
        {[35, 55, 42, 70, 60, 85, 75, 90].map((h, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            style={{ height: `${h}%`, transformOrigin: 'bottom', background: `linear-gradient(to top, #0066FF, #4D9CFF)`, opacity: 0.55 + i * 0.05 }}
            className="flex-1 rounded-t-sm"
          />
        ))}
      </div>
      {/* KPI row */}
      <div className="flex gap-2">
        {[{ l: 'CTR', v: '4.8%' }, { l: 'ROAS', v: '6.2×' }, { l: 'Leads', v: '248' }].map(m => (
          <div key={m.l} className="flex-1 rounded-lg bg-[#EAF4FF] p-1.5">
            <div className="text-[8px] text-[#64748B]">{m.l}</div>
            <div className="text-[11px] font-extrabold text-[#0066FF]">{m.v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BrandCard() {
  return (
    <div className="rounded-2xl bg-[#0066FF] p-3 shadow-[0_8px_24px_-4px_#0066FF40] flex flex-col gap-2">
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="w-9 h-9 rounded-xl bg-white/25 flex items-center justify-center"
      >
        <div className="w-5 h-5 rounded-lg bg-white/70" />
      </motion.div>
      <div className="h-2 w-16 rounded-full bg-white/50" />
      <div className="h-1.5 w-10 rounded-full bg-white/25" />
      <div className="flex gap-1 mt-1">
        {['#40B3FF', '#1A6FFF', '#0033EE', '#071A3D'].map((c, i) => (
          <div key={i} className="flex-1 h-2.5 rounded-sm" style={{ background: c }} />
        ))}
      </div>
    </div>
  )
}

/* ─────────────────── floating stat cards ─────────────────── */
const FLOATERS = [
  {
    icon: TrendingUp,
    label: 'Conversion Lift',
    value: '+248%',
    style: { top: '6%', left: '-5%' } as React.CSSProperties,
    delay: 1.0,
    floatCls: 'float',
  },
  {
    icon: Star,
    label: 'Client Rating',
    value: '5.0 ★',
    style: { bottom: '8%', right: '-4%' } as React.CSSProperties,
    delay: 1.2,
    floatCls: 'float-delayed',
  },
  {
    icon: Users,
    label: 'Projects Done',
    value: '200+',
    style: { top: '48%', right: '-6%' } as React.CSSProperties,
    delay: 1.4,
    floatCls: 'float-slow',
  },
]

/* ─────────────────── main component ─────────────────── */
export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null)

  /* scroll parallax */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textOp = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const visualY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  /* mouse parallax */
  const rawMx = useMotionValue(0)
  const rawMy = useMotionValue(0)
  const mx = useSpring(rawMx, { stiffness: 80, damping: 20 })
  const my = useSpring(rawMy, { stiffness: 80, damping: 20 })
  const l1x = useTransform(mx, [-1, 1], ['-14px', '14px'])
  const l1y = useTransform(my, [-1, 1], ['-10px', '10px'])
  const l2x = useTransform(mx, [-1, 1], ['-6px', '6px'])
  const l2y = useTransform(my, [-1, 1], ['-4px', '4px'])
  const l3x = useTransform(mx, [-1, 1], ['8px', '-8px'])
  const l3y = useTransform(my, [-1, 1], ['5px', '-5px'])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = sectionRef.current?.getBoundingClientRect()
    if (!r) return
    rawMx.set(((e.clientX - r.left) / r.width) * 2 - 1)
    rawMy.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }, [rawMx, rawMy])

  const handleLeave = useCallback(() => { rawMx.set(0); rawMy.set(0) }, [rawMx, rawMy])

  /* typing animation for tagline */
  const [shown, setShown] = useState(0)
  const tagline = 'Full-Service Creative Digital Agency'
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i++
      setShown(i)
      if (i >= tagline.length) clearInterval(id)
    }, 38)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-16"
    >
      {/* ── background decoration ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full bg-[#0066FF] opacity-[0.04] blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#1683FF] opacity-[0.05] blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[700px] rounded-full bg-[#EAF4FF] opacity-50 blur-[80px]" />
        <div className="absolute inset-0 dot-grid opacity-30" />
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -8, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{ repeat: Infinity, duration: p.dur, delay: p.delay, ease: 'easeInOut' }}
            className="absolute rounded-full bg-[#0066FF]"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.r * 2, height: p.r * 2 }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── LEFT: text ── */}
          <motion.div style={{ y: textY, opacity: textOp }} className="flex flex-col gap-7">

            {/* Eyebrow with typewriter */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2 self-start rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3.5 py-1.5 text-xs font-bold tracking-wider text-[#0066FF]"
            >
              <Sparkles size={11} />
              <span className="min-w-[190px]">{tagline.slice(0, shown)}<span className="animate-pulse">|</span></span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              className="text-[2.75rem] sm:text-5xl lg:text-[3.6rem] xl:text-[4.2rem] font-extrabold leading-[1.04] tracking-tight text-[#102A56]"
            >
              We Turn Ideas Into{' '}
              <br className="hidden sm:block" />
              <span className="gradient-text">Digital Experiences.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28, ease: EASE }}
              className="text-lg text-[#64748B] leading-relaxed max-w-xl"
            >
              Creative design, technology and digital solutions built to help
              ambitious businesses move forward — from brand identity to
              performance marketing.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38, ease: EASE }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                href="/book-now"
                className="inline-flex items-center gap-2 rounded-xl btn-primary px-6 py-3.5 text-sm font-semibold text-white"
              >
                Start a Project
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#DCEBFF] bg-white px-6 py-3.5 text-sm font-semibold text-[#102A56] transition-all duration-200 hover:border-[#0066FF]/40 hover:text-[#0066FF] hover:bg-[#F5FAFF]"
              >
                Explore Our Work
                <ArrowRight size={15} className="opacity-60" />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="flex items-center gap-6 pt-4 border-t border-[#DCEBFF]"
            >
              {[
                { value: 200, suffix: '+', label: 'Projects Delivered' },
                { value: 50, suffix: '+', label: 'Happy Clients' },
                { value: 8, suffix: '', label: 'Core Services' },
              ].map((s, i) => (
                <div key={s.label} className={i > 0 ? 'pl-6 border-l border-[#DCEBFF]' : ''}>
                  <AnimatedStat value={s.value} suffix={s.suffix} label={s.label} />
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: 3D visual composition ── */}
          <motion.div
            style={{ y: visualY, perspective: 1000 }}
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.25, ease: EASE }}
            className="relative block w-full max-w-2xl mx-auto lg:max-w-none"
          >
            {/* Layer 2 — main browser card */}
            <motion.div
              style={{ x: l2x, y: l2y }}
              initial={false}
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-[#DCEBFF] bg-[#F5FAFF] shadow-[0_24px_64px_-16px_#0066FF18]"
              whileHover={{ scale: 1.012 }}
              transition={{ duration: 0.4 }}
            >
              <BrowserMockup />
              {/* Corner dots */}
              <div className="absolute top-3.5 right-4 flex gap-1.5">
                {[0, 1, 2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#DCEBFF]" />)}
              </div>
            </motion.div>

            {/* Layer 1 (foreground) — analytics card bottom-left */}
            <motion.div
              style={{ x: l1x, y: l1y, position: 'absolute', bottom: '-20px', left: '-16px' }}
              initial={false}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.55, ease: EASE }}
              className="w-48 float-slow z-10"
            >
              <AnalyticsMockup />
            </motion.div>

            {/* Layer 1 — brand card top-right */}
            <motion.div
              style={{ x: l1x, y: l1y, position: 'absolute', top: '-20px', right: '-20px' }}
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.55, ease: EASE }}
              className="w-32 float z-10"
            >
              <BrandCard />
            </motion.div>

            {/* Layer 1 — phone stacked right */}
            <motion.div
              style={{ x: l1x, y: l1y, position: 'absolute', top: '20%', right: '-28px' }}
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.55, ease: EASE }}
              className="z-10 float-delayed"
            >
              <PhoneMockup />
            </motion.div>

            {/* Floating stat badges */}
            {FLOATERS.map((f) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={f.label}
                  style={{ ...f.style, x: l1x, y: l1y, position: 'absolute' }}
                  initial={false}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: f.delay, duration: 0.45, ease: EASE }}
                  className={`${f.floatCls} glass rounded-xl px-3.5 py-2.5 shadow-blue z-20`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#EAF4FF] flex items-center justify-center shrink-0">
                      <Icon size={12} className="text-[#0066FF]" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-[#0066FF] leading-none">{f.value}</div>
                      <div className="text-[9px] text-[#64748B] whitespace-nowrap mt-0.5">{f.label}</div>
                    </div>
                  </div>
                </motion.div>
              )
            })}

            {/* Layer 3 (background) — counter-moves blob */}
            <motion.div
              aria-hidden
              style={{ x: l3x, y: l3y }}
              className="absolute -bottom-10 -left-10 w-40 h-40 rounded-3xl bg-gradient-to-br from-[#0066FF]/6 to-[#4D9CFF]/4 blur-2xl pointer-events-none"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#64748B] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="h-6 w-px bg-gradient-to-b from-[#0066FF]/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}
