'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useMotionValue,
} from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, TrendingUp, Star, Zap, Globe, Palette, BarChart2 } from 'lucide-react'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ─────────────────────────────────────────────
   Hero 3D visual slides — richer compositions
───────────────────────────────────────────── */
const heroSlides = [
  { id: 'web', label: 'Website Design', icon: Globe },
  { id: 'brand', label: 'Branding', icon: Palette },
  { id: 'marketing', label: 'Digital Marketing', icon: BarChart2 },
  { id: 'design', label: 'Graphic Design', icon: Zap },
]

/* ── 3D Floating browser window ── */
function HeroWebSlide() {
  return (
    <div className="absolute inset-0 p-5 flex flex-col gap-3">
      {/* Main browser */}
      <motion.div
        initial={{ opacity: 0, y: 16, rotateX: -8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ perspective: 800 }}
        className="flex-1 rounded-2xl border border-[#DCEBFF] bg-white overflow-hidden shadow-[0_8px_32px_-8px_#0066FF20]"
      >
        {/* Browser bar */}
        <div className="flex items-center gap-1.5 px-3 py-2.5 bg-[#F5FAFF] border-b border-[#DCEBFF]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FCA5A5]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FDE68A]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#6EE7B7]" />
          <div className="flex-1 mx-3 h-5 rounded-full bg-white border border-[#DCEBFF] flex items-center px-2 gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]/30" />
            <div className="h-1.5 flex-1 rounded-full bg-[#EAF4FF]" />
          </div>
        </div>
        {/* Page content */}
        <div className="p-4 flex flex-col gap-3 h-full">
          {/* Nav */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-[#0066FF]" />
              <div className="h-2 w-14 rounded-full bg-[#102A56]/20" />
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-1.5 w-7 rounded-full bg-[#DCEBFF]" />
              ))}
              <div className="h-5 w-12 rounded-lg bg-[#0066FF] opacity-80" />
            </div>
          </div>
          {/* Hero area */}
          <div className="flex-1 rounded-xl bg-gradient-to-br from-[#0066FF]/8 via-[#EAF4FF] to-[#F5FAFF] flex items-center px-5 gap-5">
            <div className="flex-1 flex flex-col gap-2">
              <div className="h-3 w-32 rounded-full bg-[#0066FF]/25" />
              <div className="h-2 w-24 rounded-full bg-[#102A56]/15" />
              <div className="h-2 w-28 rounded-full bg-[#DCEBFF]" />
              <div className="flex gap-2 mt-2">
                <div className="h-6 w-16 rounded-lg bg-[#0066FF] opacity-70" />
                <div className="h-6 w-16 rounded-lg border border-[#DCEBFF]" />
              </div>
            </div>
            <div className="w-16 h-20 rounded-xl bg-gradient-to-b from-[#EAF4FF] to-[#DCEBFF] shadow-sm" />
          </div>
          {/* Feature cards */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { c: 'bg-[#0066FF]/10', l: '#0066FF' },
              { c: 'bg-[#EAF4FF]', l: '#1683FF' },
              { c: 'bg-[#F5FAFF]', l: '#4D9CFF' },
            ].map((s, i) => (
              <div key={i} className={`${s.c} rounded-lg p-2 flex flex-col gap-1`}>
                <div className="w-4 h-4 rounded-md" style={{ background: s.l + '30' }} />
                <div className="h-1.5 rounded-full bg-current" style={{ color: s.l + '30' }} />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating phone mockup */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
        className="absolute right-6 bottom-16 w-16 rounded-xl border-2 border-[#DCEBFF] bg-white shadow-blue overflow-hidden"
        style={{ height: 100 }}
      >
        <div className="h-3 bg-[#F5FAFF] border-b border-[#DCEBFF] flex items-center justify-center">
          <div className="w-5 h-0.5 rounded-full bg-[#DCEBFF]" />
        </div>
        <div className="p-1.5 flex flex-col gap-1">
          <div className="h-8 rounded-lg bg-gradient-to-b from-[#EAF4FF] to-[#F5FAFF]" />
          <div className="h-1 rounded-full bg-[#DCEBFF]" />
          <div className="h-1 rounded-full bg-[#EAF4FF] w-3/4" />
        </div>
      </motion.div>
    </div>
  )
}

/* ── Branding composition ── */
function HeroBrandSlide() {
  return (
    <div className="absolute inset-0 p-5 flex flex-col gap-3">
      {/* Identity board */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.65, ease: EASE }}
        className="flex-1 grid grid-cols-5 grid-rows-3 gap-2.5"
      >
        {/* Large logo block */}
        <div className="col-span-3 row-span-2 rounded-2xl bg-[#0066FF] flex items-center justify-center shadow-[0_8px_24px_-4px_#0066FF40]">
          <div className="text-center">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="w-12 h-12 rounded-2xl bg-white/20 mx-auto mb-3 flex items-center justify-center"
            >
              <div className="w-6 h-6 rounded-xl bg-white/70" />
            </motion.div>
            <div className="h-2.5 w-16 rounded-full bg-white/50 mx-auto mb-1" />
            <div className="h-1.5 w-10 rounded-full bg-white/25 mx-auto" />
          </div>
        </div>
        {/* Color palette */}
        {['#0066FF', '#1683FF', '#4D9CFF', '#102A56'].map((c, i) => (
          <div key={i} className={`${i < 2 ? 'col-span-2' : 'col-span-1'} rounded-xl`}
            style={{ background: c, opacity: 0.85 + i * 0.04 }}
          />
        ))}
        {/* Tagline strip */}
        <div className="col-span-5 rounded-xl border border-[#DCEBFF] bg-white flex items-center gap-3 px-4">
          <div className="h-3 w-20 rounded-full bg-[#102A56]/20" />
          <div className="h-1.5 w-1.5 rounded-full bg-[#0066FF]/30" />
          <div className="h-2 w-14 rounded-full bg-[#DCEBFF]" />
          <div className="h-2 w-14 rounded-full bg-[#EAF4FF] ml-auto" />
        </div>
      </motion.div>

      {/* Business card floating */}
      <motion.div
        initial={{ opacity: 0, x: -12, rotate: -4 }}
        animate={{ opacity: 1, x: 0, rotate: -3 }}
        transition={{ delay: 0.25, duration: 0.6, ease: EASE }}
        className="absolute left-4 bottom-4 w-28 h-16 rounded-xl bg-white border border-[#DCEBFF] shadow-blue p-2.5 flex flex-col gap-1.5"
      >
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-md bg-[#0066FF]" />
          <div className="h-1.5 w-10 rounded-full bg-[#102A56]/20" />
        </div>
        <div className="h-1 rounded-full bg-[#DCEBFF] w-4/5" />
        <div className="h-1 rounded-full bg-[#EAF4FF] w-3/5" />
      </motion.div>
    </div>
  )
}

/* ── Marketing / Analytics dashboard ── */
function HeroMarketingSlide() {
  return (
    <div className="absolute inset-0 p-4 flex flex-col gap-3">
      {/* KPI row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="grid grid-cols-3 gap-2"
      >
        {[
          { label: 'Conversions', val: '+248%', c: '#0066FF' },
          { label: 'Reach', val: '48.2k', c: '#1683FF' },
          { label: 'ROAS', val: '6.8×', c: '#4D9CFF' },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="rounded-xl border border-[#DCEBFF] bg-white p-2.5"
          >
            <div className="text-[8px] text-[#64748B] mb-0.5">{m.label}</div>
            <div className="text-sm font-extrabold" style={{ color: m.c }}>{m.val}</div>
          </motion.div>
        ))}
      </motion.div>
      {/* Chart */}
      <div className="flex-1 rounded-xl border border-[#DCEBFF] bg-white p-3 flex flex-col gap-2">
        <div className="flex items-center justify-between mb-1">
          <div className="h-2 w-20 rounded-full bg-[#102A56]/15" />
          <div className="flex gap-1.5">
            {['#0066FF', '#1683FF', '#4D9CFF'].map(c => (
              <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
            ))}
          </div>
        </div>
        {/* Line chart shape */}
        <div className="flex-1 relative">
          <svg className="w-full h-full" viewBox="0 0 200 60" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lgA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0066FF" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,50 C20,45 40,30 60,35 S100,15 120,20 S160,5 200,8" stroke="#0066FF" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M0,50 C20,45 40,30 60,35 S100,15 120,20 S160,5 200,8 V60 H0 Z" fill="url(#lgA)" />
            <path d="M0,55 C30,50 60,45 100,42 S150,38 200,35" stroke="#4D9CFF" strokeWidth="1.5" fill="none" strokeDasharray="3,3" />
          </svg>
        </div>
        {/* X-axis */}
        <div className="flex justify-between px-1">
          {['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map(m => (
            <span key={m} className="text-[7px] text-[#64748B]">{m}</span>
          ))}
        </div>
      </div>
      {/* Channel bars */}
      <div className="grid grid-cols-4 gap-1.5">
        {[
          { ch: 'IG', pct: 78, c: '#E040FB' },
          { ch: 'FB', pct: 62, c: '#1877F2' },
          { ch: 'GG', pct: 85, c: '#4285F4' },
          { ch: 'EM', pct: 54, c: '#0066FF' },
        ].map(b => (
          <div key={b.ch} className="rounded-xl border border-[#DCEBFF] bg-white p-2 flex flex-col gap-1.5">
            <div className="text-[8px] font-bold text-[#64748B]">{b.ch}</div>
            <div className="h-1 rounded-full bg-[#EAF4FF]">
              <div className="h-full rounded-full" style={{ width: `${b.pct}%`, background: b.c }} />
            </div>
            <div className="text-[7px] font-semibold" style={{ color: b.c }}>{b.pct}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Graphic design poster grid ── */
function HeroDesignSlide() {
  return (
    <div className="absolute inset-0 p-4">
      <div className="grid grid-cols-3 grid-rows-3 gap-2.5 h-full">
        {/* Large hero poster */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="col-span-2 row-span-2 rounded-2xl overflow-hidden border border-[#DCEBFF] shadow-blue relative"
          style={{ background: 'linear-gradient(135deg, #0066FF 0%, #1683FF 50%, #4D9CFF 100%)' }}
        >
          <div className="absolute inset-0 flex flex-col items-start justify-end p-4">
            <div className="h-3 w-24 rounded-full bg-white/60 mb-2" />
            <div className="h-2 w-16 rounded-full bg-white/35" />
          </div>
          <div className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-white/20" />
        </motion.div>
        {/* Tall thin poster */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.55, ease: EASE }}
          className="row-span-2 rounded-2xl overflow-hidden border border-[#DCEBFF]"
          style={{ background: 'linear-gradient(180deg, #EAF4FF 0%, #DCEBFF 100%)' }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-2">
            <div className="w-8 h-8 rounded-full border-2 border-[#0066FF]/30" />
            <div className="h-2 w-10 rounded-full bg-[#0066FF]/25" />
            <div className="h-1.5 w-8 rounded-full bg-[#DCEBFF]" />
          </div>
        </motion.div>
        {/* Bottom panels */}
        {[
          'bg-[#F5FAFF]',
          'bg-gradient-to-br from-[#EAF4FF] to-[#DCEBFF]',
          'bg-[#0066FF]',
        ].map((bg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 + i * 0.07, duration: 0.45 }}
            className={`rounded-xl ${bg} border border-[#DCEBFF] flex items-center justify-center`}
          >
            <div className={`w-5 h-5 rounded-lg ${i === 2 ? 'bg-white/30' : 'bg-[#0066FF]/15'}`} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const SLIDE_COMPONENTS = [HeroWebSlide, HeroBrandSlide, HeroMarketingSlide, HeroDesignSlide]

/* ─────────────────────────────────────────────
   Floating stat cards
───────────────────────────────────────────── */
const FLOATERS = [
  {
    icon: TrendingUp,
    label: 'Conversion Rate',
    value: '+248%',
    pos: { top: '8%', left: '-5%' },
    delay: 0.9,
    floatClass: 'float',
  },
  {
    icon: Star,
    label: 'Client Rating',
    value: '5.0 ★',
    pos: { bottom: '10%', right: '-4%' },
    delay: 1.1,
    floatClass: 'float-delayed',
  },
  {
    icon: Zap,
    label: 'Projects Done',
    value: '200+',
    pos: { top: '46%', right: '-6%' },
    delay: 1.3,
    floatClass: 'float-slow',
  },
]

/* ─────────────────────────────────────────────
   Particle dots background
───────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  x: (i * 37 + 15) % 95,
  y: (i * 53 + 8) % 90,
  size: (i % 3) + 1,
  delay: (i * 0.3) % 2.5,
  duration: 3 + (i % 4),
}))

/* ─────────────────────────────────────────────
   Main hero component
───────────────────────────────────────────── */
export function ServicesHero() {
  const [current, setCurrent] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  /* scroll parallax */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const textOp = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const visualY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  /* mouse parallax — layers at different depths */
  const rawMx = useMotionValue(0)
  const rawMy = useMotionValue(0)
  const mx = useSpring(rawMx, { stiffness: 80, damping: 20 })
  const my = useSpring(rawMy, { stiffness: 80, damping: 20 })

  // three depth layers
  const layer1x = useTransform(mx, [-1, 1], ['-12px', '12px'])
  const layer1y = useTransform(my, [-1, 1], ['-8px', '8px'])
  const layer2x = useTransform(mx, [-1, 1], ['-6px', '6px'])
  const layer2y = useTransform(my, [-1, 1], ['-4px', '4px'])
  const layer3x = useTransform(mx, [-1, 1], ['8px', '-8px'])  // counter
  const layer3y = useTransform(my, [-1, 1], ['5px', '-5px'])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const cy = ((e.clientY - rect.top) / rect.height) * 2 - 1
    rawMx.set(cx)
    rawMy.set(cy)
  }, [rawMx, rawMy])

  const handleMouseLeave = useCallback(() => {
    rawMx.set(0)
    rawMy.set(0)
  }, [rawMx, rawMy])

  /* auto-cycle slides */
  useEffect(() => {
    const id = setInterval(() => setCurrent(p => (p + 1) % heroSlides.length), 3400)
    return () => clearInterval(id)
  }, [])

  const CurrentSlide = SLIDE_COMPONENTS[current]

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-16"
    >
      {/* ── BG layer ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full bg-[#0066FF] opacity-[0.04] blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#1683FF] opacity-[0.05] blur-[100px]" />
        <div className="absolute inset-0 dot-grid opacity-30" />
        {/* Particles */}
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -8, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ repeat: Infinity, duration: p.duration, delay: p.delay, ease: 'easeInOut' }}
            className="absolute rounded-full bg-[#0066FF]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size * 2,
              height: p.size * 2,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── LEFT: text ── */}
          <motion.div style={{ y: textY, opacity: textOp }} className="flex flex-col gap-7">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2 self-start rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3.5 py-1.5 text-xs font-bold tracking-widest text-[#0066FF] uppercase"
            >
              <Sparkles size={11} />
              Services
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="text-[2.6rem] sm:text-5xl lg:text-[3.4rem] xl:text-[4rem] font-extrabold leading-[1.06] tracking-tight text-[#102A56]"
            >
              We Create Digital{' '}
              <span className="gradient-text">Experiences</span>
              <br />
              That Move Businesses{' '}
              <br className="hidden xl:block" />
              Forward.
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22, ease: EASE }}
              className="text-lg text-[#64748B] leading-relaxed max-w-lg"
            >
              From strategy to launch — we combine design, technology and
              marketing into a single powerful system that grows your business.
            </motion.p>

            {/* Slide indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2"
            >
              <span className="text-xs text-[#64748B]">Crafting:</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={current}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs font-bold text-[#0066FF]"
                >
                  {heroSlides[current].label}
                </motion.span>
              </AnimatePresence>
              <div className="flex gap-1 ml-2">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Show ${heroSlides[i].label}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-5 bg-[#0066FF]' : 'w-1.5 bg-[#DCEBFF]'
                      }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.32, ease: EASE }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl btn-primary px-6 py-3.5 text-sm font-semibold text-white"
              >
                Start Your Project
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#DCEBFF] bg-white px-6 py-3.5 text-sm font-semibold text-[#102A56] transition-all duration-200 hover:border-[#0066FF]/40 hover:text-[#0066FF] hover:bg-[#F5FAFF]"
              >
                View Our Work
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center gap-6 pt-4 border-t border-[#DCEBFF]"
            >
              {[
                { v: '200+', l: 'Projects' },
                { v: '50+', l: 'Clients' },
                { v: '9', l: 'Services' },
              ].map((s, i) => (
                <div key={s.l} className={`flex flex-col gap-0.5 ${i > 0 ? 'pl-6 border-l border-[#DCEBFF]' : ''}`}>
                  <span className="text-2xl font-extrabold text-[#0066FF]">{s.v}</span>
                  <span className="text-xs text-[#64748B]">{s.l}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: 3D visual panel ── */}
          <motion.div
            ref={visualRef}
            style={{ y: visualY }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="relative hidden lg:block"
          >
            {/* Outer glow ring */}
            <div
              aria-hidden
              className="absolute -inset-6 rounded-3xl border border-[#0066FF]/6 pointer-events-none"
            />

            {/* Main panel — layer 2 (mid depth) */}
            <motion.div
              style={{ x: layer2x, y: layer2y }}
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-[#DCEBFF] bg-[#F5FAFF] shadow-[0_24px_64px_-16px_#0066FF18]"
              whileHover={{ scale: 1.012 }}
              transition={{ duration: 0.4 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.55, ease: EASE }}
                  className="absolute inset-0"
                >
                  <CurrentSlide />
                </motion.div>
              </AnimatePresence>

              {/* Corner dots */}
              <div className="absolute top-4 right-4 flex gap-1.5">
                {[0, 1, 2].map(i => (
                  <div key={i} className="h-1.5 w-1.5 rounded-full bg-[#DCEBFF]" />
                ))}
              </div>
            </motion.div>

            {/* Floating stat cards — layer 1 (foreground) */}
            {FLOATERS.map((f) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={f.label}
                  style={{ x: layer1x, y: layer1y, position: 'absolute', ...f.pos }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: f.delay, duration: 0.5, ease: EASE }}
                  className={`${f.floatClass} glass rounded-xl px-4 py-3 shadow-blue z-10`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#EAF4FF] flex items-center justify-center shrink-0">
                      <Icon size={13} className="text-[#0066FF]" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-[#0066FF] leading-none">{f.value}</div>
                      <div className="text-[9px] text-[#64748B] whitespace-nowrap mt-0.5">{f.label}</div>
                    </div>
                  </div>
                </motion.div>
              )
            })}

            {/* Background depth element — layer 3 (behind, counter-moves) */}
            <motion.div
              aria-hidden
              style={{ x: layer3x, y: layer3y }}
              className="absolute -bottom-8 -left-8 w-32 h-32 rounded-3xl bg-gradient-to-br from-[#0066FF]/6 to-[#4D9CFF]/4 blur-xl pointer-events-none"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-semibold tracking-widest text-[#64748B] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="h-6 w-px bg-gradient-to-b from-[#0066FF]/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}
