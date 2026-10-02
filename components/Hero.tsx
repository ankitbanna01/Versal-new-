'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, animate } from 'framer-motion'
import { ArrowRight, Play, Zap, ChevronDown } from 'lucide-react'
import { HeroVisual } from '@/components/HeroVisual'

/* ══════════════════════════════════════════════
   ANIMATION CONSTANTS
══════════════════════════════════════════════ */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** One element fades + slides up */
const item = (delay: number) => ({
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: EASE },
  },
})

/* ══════════════════════════════════════════════
   ANIMATED COUNT-UP HOOK
══════════════════════════════════════════════ */
function useCountUp(target: number, duration = 1.5, start = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!start) return
    const ctrl = animate(0, target, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => ctrl.stop()
  }, [start, target, duration])
  return val
}

/* ══════════════════════════════════════════════
   STAT ITEM
══════════════════════════════════════════════ */
function Stat({
  value, suffix, label, index, start,
}: {
  value: number; suffix: string; label: string; index: number; start: boolean
}) {
  const n = useCountUp(value, 1.4 + index * 0.1, start)
  return (
    <div className={`flex flex-col gap-0.5 ${index > 0 ? 'pl-6 border-l border-[#DCEBFF]' : ''}`}>
      <span className="text-2xl sm:text-[1.75rem] font-extrabold text-[#0066FF] tabular-nums leading-none">
        {start ? n : 0}{suffix}
      </span>
      <span className="text-xs text-[#64748B] mt-0.5 leading-snug">{label}</span>
    </div>
  )
}

/* ══════════════════════════════════════════════
   HERO
══════════════════════════════════════════════ */
export function Hero() {
  /* — prefers-reduced-motion — */
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const h = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  /* — mouse parallax (desktop only) — */
  const sectionRef = useRef<HTMLElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springCfg = { stiffness: 55, damping: 16, mass: 0.5 }
  const mx = useSpring(rawX, springCfg)
  const my = useSpring(rawY, springCfg)

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reduced) return
      const r = sectionRef.current?.getBoundingClientRect()
      if (!r) return
      rawX.set((e.clientX - (r.left + r.width / 2)) / (r.width / 2))
      rawY.set((e.clientY - (r.top + r.height / 2)) / (r.height / 2))
    },
    [reduced, rawX, rawY],
  )
  const onMouseLeave = useCallback(() => { rawX.set(0); rawY.set(0) }, [rawX, rawY])

  /* expose plain numbers to HeroVisual */
  const [mxN, setMxN] = useState(0)
  const [myN, setMyN] = useState(0)
  useEffect(() => mx.on('change', setMxN), [mx])
  useEffect(() => my.on('change', setMyN), [my])

  /* — count-up trigger — */
  const [countStart, setCountStart] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setCountStart(true), 1000)
    return () => clearTimeout(t)
  }, [])

  /* — scroll indicator — */
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* — stats data — */
  const stats = [
    { value: 200, suffix: '+', label: 'Projects Delivered' },
    { value: 50,  suffix: '+', label: 'Happy Clients'      },
    { value: 5,   suffix: '+', label: 'Years Experience'   },
  ]

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative w-full bg-white overflow-hidden"
      style={{ minHeight: '92vh', paddingTop: 64 /* navbar height */ }}
    >
      {/* ════════════════════════════════════
          BACKGROUND LAYER
      ════════════════════════════════════ */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-right blue glow */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 860, height: 860,
            top: -320, right: -300,
            background: 'radial-gradient(circle, #EAF4FF 0%, #F5FAFF 40%, transparent 68%)',
            x: reduced ? 0 : mx,
            y: reduced ? 0 : my,
          }}
        />
        {/* Bottom-left glow */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 540, height: 540,
            bottom: -200, left: -200,
            background: 'radial-gradient(circle, #EAF4FF 0%, transparent 65%)',
            opacity: 0.7,
            x: reduced ? 0 : mx,
            y: reduced ? 0 : my,
          }}
        />
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-30" />
        {/* Subtle horizontal shimmer */}
        <div className="absolute inset-x-0 top-[55%] h-px bg-gradient-to-r from-transparent via-[#DCEBFF] to-transparent opacity-50" />
      </div>

      {/* ════════════════════════════════════
          CONTENT GRID
      ════════════════════════════════════ */}
      <div
        className="relative mx-auto w-full flex flex-col lg:grid lg:items-center"
        style={{
          maxWidth: 1320,
          paddingLeft:  'clamp(24px, 5vw, 72px)',
          paddingRight: 'clamp(24px, 5vw, 72px)',
          paddingTop:   'clamp(40px, 6vw, 80px)',
          paddingBottom:'clamp(64px, 8vw, 96px)',
          gridTemplateColumns: '46fr 54fr',
          gap: 'clamp(32px, 4vw, 64px)',
          minHeight: 'calc(92vh - 64px)',
        }}
      >
        {/* ──────────────────────────────────
            LEFT COLUMN — text content
        ────────────────────────────────── */}
        <div className="flex flex-col" style={{ gap: 0 }}>

          {/* 1 — Badge */}
          <motion.div
            variants={item(0.08)}
            initial="hidden"
            animate="show"
            style={{ marginBottom: 28 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-4 py-1.5 text-[11px] font-semibold text-[#0066FF]">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0066FF] opacity-55" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0066FF]" />
              </span>
              Digital Marketing Agency
            </span>
          </motion.div>

          {/* 2 — Headline (3 separate lines, staggered) */}
          <div style={{ marginBottom: 28 }}>
            {/* Line 1 */}
            <motion.div
              variants={item(0.18)}
              initial="hidden"
              animate="show"
              className="block font-extrabold tracking-tight text-[#102A56] leading-[1.07]"
              style={{ fontSize: 'clamp(36px, 4.5vw, 68px)', letterSpacing: '-0.025em' }}
            >
              Turn Your Ideas
            </motion.div>

            {/* Line 2 */}
            <motion.div
              variants={item(0.30)}
              initial="hidden"
              animate="show"
              className="block font-extrabold tracking-tight text-[#102A56] leading-[1.07]"
              style={{ fontSize: 'clamp(36px, 4.5vw, 68px)', letterSpacing: '-0.025em' }}
            >
              Into Real Digital
            </motion.div>

            {/* Line 3 — animated gradient */}
            <motion.div
              variants={item(0.42)}
              initial="hidden"
              animate="show"
              className="block font-extrabold leading-[1.07]"
              style={{ fontSize: 'clamp(36px, 4.5vw, 68px)', letterSpacing: '-0.025em' }}
            >
              <span
                className="bg-clip-text text-transparent inline-block"
                style={{
                  backgroundImage: 'linear-gradient(100deg, #0066FF 0%, #1683FF 50%, #635BFF 100%)',
                  backgroundSize: '200% auto',
                  animation: reduced ? 'none' : 'heroGradShift 5s ease infinite',
                }}
              >
                Growth.
              </span>
            </motion.div>
          </div>

          {/* gradient keyframe */}
          <style>{`
            @keyframes heroGradShift {
              0%   { background-position: 0%   center; }
              50%  { background-position: 100% center; }
              100% { background-position: 0%   center; }
            }
          `}</style>

          {/* 3 — Description */}
          <motion.p
            variants={item(0.52)}
            initial="hidden"
            animate="show"
            className="text-[#64748B] leading-[1.7]"
            style={{
              fontSize: 'clamp(16px, 1.25vw, 19px)',
              maxWidth: 490,
              marginBottom: 36,
            }}
          >
            We design, build, and grow brands that stand out. Strategy,
            branding, web, video, and performance marketing — all under one roof.
          </motion.p>

          {/* 4 — CTA buttons */}
          <motion.div
            variants={item(0.62)}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-3"
            style={{ marginBottom: 40 }}
          >
            {/* Primary */}
            <Link
              href="/book-now"
              className="group relative inline-flex items-center gap-2.5 rounded-full btn-primary text-white font-semibold overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] focus-visible:ring-offset-2"
              style={{ height: 52, paddingLeft: 28, paddingRight: 24, fontSize: 14 }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
              />
              Book Now
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5 shrink-0"
              />
            </Link>

            {/* Secondary */}
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2.5 rounded-full border-2 border-[#DCEBFF] bg-white text-[#102A56] font-semibold transition-all duration-250 hover:border-[#0066FF] hover:text-[#0066FF] hover:bg-[#F5FAFF] hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] focus-visible:ring-offset-2"
              style={{ height: 52, paddingLeft: 24, paddingRight: 24, fontSize: 14 }}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EAF4FF] group-hover:bg-[#DCEBFF] transition-colors duration-200">
                <Play size={11} className="text-[#0066FF] fill-[#0066FF]" />
              </span>
              Watch Our Work
            </Link>
          </motion.div>

          {/* 5 — Stats */}
          <motion.div
            variants={item(0.72)}
            initial="hidden"
            animate="show"
            className="flex items-center gap-6 pt-5 border-t border-[#DCEBFF]"
          >
            {stats.map((s, i) => (
              <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} index={i} start={countStart} />
            ))}
          </motion.div>

          {/* 6 — Trust badges */}
          <motion.div
            variants={item(0.80)}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-2"
            style={{ marginTop: 20 }}
          >
            {[
              'Google Partner',
              'Meta Business Partner',
              'Award Winning',
            ].map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#DCEBFF] bg-white px-3 py-1 text-[11px] font-medium text-[#64748B]"
              >
                <Zap size={9} className="text-[#0066FF]" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ──────────────────────────────────
            RIGHT COLUMN — visual
        ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.25, ease: EASE }}
          className="relative order-last lg:order-none mt-12 lg:mt-0"
        >
          {/*
            Wrapper constrains the visual so floating cards
            never escape, even on smaller viewports.
            padding creates safe-zone so cards don't clip.
          */}
          <div className="relative px-10 pt-8 pb-10">
            <HeroVisual mouseX={reduced ? 0 : mxN} mouseY={reduced ? 0 : myN} />
          </div>
        </motion.div>
      </div>

      {/* ════════════════════════════════════
          SCROLL INDICATOR
      ════════════════════════════════════ */}
      <motion.button
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: scrolled ? 0 : 0.7, y: 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
        aria-label="Scroll to next section"
      >
        <div className="w-5 h-[30px] rounded-full border border-[#DCEBFF] flex items-start justify-center pt-1.5">
          <motion.div
            className="w-1 h-1.5 rounded-full bg-[#0066FF]"
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
          />
        </div>
        <span className="text-[9px] font-semibold text-[#64748B] tracking-[0.12em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 1.4, ease: 'easeInOut', repeat: Infinity, delay: 0.2 }}
        >
          <ChevronDown size={12} className="text-[#0066FF]" />
        </motion.div>
      </motion.button>

      {/* ════════════════════════════════════
          SECTION TRANSITION WAVE
      ════════════════════════════════════ */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ height: 56 }}>
        <svg
          viewBox="0 0 1440 56"
          preserveAspectRatio="none"
          className="w-full h-full"
          aria-hidden="true"
        >
          <path
            d="M0,28 C240,56 480,0 720,28 C960,56 1200,0 1440,28 L1440,56 L0,56 Z"
            fill="#F5FAFF"
          />
        </svg>
      </div>
    </section>
  )
}
