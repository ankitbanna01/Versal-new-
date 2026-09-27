'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ── Animated hero visual elements ── */
const heroSlides = [
  {
    id: 'web',
    label: 'Website Design',
    color: '#0066FF',
    bg: '#EAF4FF',
    elements: [
      { type: 'browser', x: 10, y: 12, w: 80, delay: 0 },
      { type: 'card',    x: 60, y: 55, w: 36, delay: 0.2 },
      { type: 'dot',     x: 5,  y: 60, w: 6,  delay: 0.4 },
    ],
  },
  {
    id: 'brand',
    label: 'Branding',
    color: '#1683FF',
    bg: '#F0F7FF',
    elements: [
      { type: 'circle',  x: 30, y: 15, w: 40, delay: 0 },
      { type: 'card',    x: 8,  y: 45, w: 44, delay: 0.15 },
      { type: 'line',    x: 55, y: 70, w: 38, delay: 0.3 },
    ],
  },
  {
    id: 'marketing',
    label: 'Digital Marketing',
    color: '#4D9CFF',
    bg: '#E8F3FF',
    elements: [
      { type: 'chart',  x: 8,  y: 18, w: 55, delay: 0 },
      { type: 'metric', x: 62, y: 18, w: 32, delay: 0.2 },
      { type: 'card',   x: 8,  y: 58, w: 84, delay: 0.35 },
    ],
  },
  {
    id: 'design',
    label: 'Graphic Design',
    color: '#0052CC',
    bg: '#EDF4FF',
    elements: [
      { type: 'poster', x: 6,  y: 8,  w: 42, delay: 0 },
      { type: 'poster', x: 53, y: 8,  w: 42, delay: 0.18 },
      { type: 'dot',    x: 42, y: 75, w: 8,  delay: 0.4 },
    ],
  },
]

function HeroVisualSlide({ slide }: { slide: (typeof heroSlides)[0] }) {
  return (
    <div className="relative w-full h-full">
      {slide.elements.map((el, i) => {
        const style: React.CSSProperties = {
          position: 'absolute',
          left: `${el.x}%`,
          top:  `${el.y}%`,
          width: `${el.w}%`,
        }

        if (el.type === 'browser') return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: el.delay, duration: 0.6, ease: EASE }}
            style={style}
            className="rounded-xl border border-[#DCEBFF] bg-white shadow-blue overflow-hidden"
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#DCEBFF] bg-[#F5FAFF]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FECACA]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEF08A]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#BBF7D0]" />
              <div className="flex-1 ml-2 h-2 rounded-full bg-[#DCEBFF]" />
            </div>
            {/* Content skeleton */}
            <div className="p-3 flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded-lg bg-[#EAF4FF] shrink-0" />
                <div className="flex flex-col gap-1 flex-1">
                  <div className="h-2 rounded-full bg-[#DCEBFF] w-3/4" />
                  <div className="h-2 rounded-full bg-[#EAF4FF] w-1/2" />
                </div>
              </div>
              <div className="h-16 rounded-lg bg-gradient-to-br from-[#EAF4FF] to-[#F5FAFF]" />
              <div className="grid grid-cols-3 gap-1.5">
                {[1,2,3].map(j => (
                  <div key={j} className="h-6 rounded-md bg-[#EAF4FF]" />
                ))}
              </div>
            </div>
          </motion.div>
        )

        if (el.type === 'card') return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: el.delay, duration: 0.5, ease: EASE }}
            style={style}
            className="rounded-2xl border border-[#DCEBFF] bg-white shadow-blue p-3"
          >
            <div className="h-2 rounded-full bg-[#0066FF] w-1/2 mb-2 opacity-40" />
            <div className="h-2 rounded-full bg-[#DCEBFF] w-3/4 mb-1.5" />
            <div className="h-2 rounded-full bg-[#EAF4FF] w-2/3" />
            <div className="mt-3 flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-[#0066FF]" />
              <div className="h-1.5 rounded-full bg-[#0066FF]/20 flex-1" />
            </div>
          </motion.div>
        )

        if (el.type === 'chart') return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: el.delay, duration: 0.6, ease: EASE }}
            style={style}
            className="rounded-2xl border border-[#DCEBFF] bg-white shadow-blue p-4"
          >
            <div className="text-[9px] font-bold text-[#102A56] mb-3 opacity-60">Performance</div>
            <div className="flex items-end gap-1.5 h-12">
              {[35,55,42,70,60,85,75].map((h, j) => (
                <motion.div
                  key={j}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: el.delay + j * 0.04, duration: 0.4 }}
                  style={{ height: `${h}%`, transformOrigin: 'bottom' }}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-[#0066FF] to-[#4D9CFF] opacity-80"
                />
              ))}
            </div>
          </motion.div>
        )

        if (el.type === 'metric') return (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: el.delay, duration: 0.5, ease: EASE }}
            style={style}
            className="rounded-2xl border border-[#DCEBFF] bg-white shadow-blue p-3"
          >
            <div className="text-[8px] text-[#64748B] mb-1">Conversions</div>
            <div className="text-lg font-extrabold text-[#0066FF]">+248%</div>
            <div className="mt-2 h-1.5 rounded-full bg-[#EAF4FF] overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '72%' }}
                transition={{ delay: el.delay + 0.3, duration: 0.8 }}
                className="h-full rounded-full bg-[#0066FF]"
              />
            </div>
          </motion.div>
        )

        if (el.type === 'circle') return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: el.delay, duration: 0.7, ease: EASE }}
            style={{ ...style, aspectRatio: '1', borderRadius: '50%' }}
            className="border-4 border-[#0066FF]/20 flex items-center justify-center"
          >
            <div
              className="rounded-full border-4 border-[#0066FF] w-1/2 h-1/2"
              style={{ aspectRatio: '1' }}
            />
          </motion.div>
        )

        if (el.type === 'poster') return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: el.delay, duration: 0.55, ease: EASE }}
            style={{ ...style, aspectRatio: '3/4' }}
            className="rounded-xl overflow-hidden border border-[#DCEBFF] shadow-blue"
          >
            <div className="w-full h-full bg-gradient-to-br from-[#EAF4FF] via-[#F5FAFF] to-[#DCEBFF] flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 rounded-lg bg-[#0066FF]/20 mx-auto mb-2" />
                <div className="h-1.5 w-10 rounded-full bg-[#0066FF]/30 mx-auto" />
              </div>
            </div>
          </motion.div>
        )

        if (el.type === 'line') return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: el.delay, duration: 0.5 }}
            style={{ ...style, transformOrigin: 'left', height: '3px' }}
            className="rounded-full bg-gradient-to-r from-[#0066FF] to-[#4D9CFF]"
          />
        )

        if (el.type === 'dot') return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: el.delay, duration: 0.4, type: 'spring' }}
            style={{ ...style, aspectRatio: '1', borderRadius: '50%' }}
            className="bg-[#0066FF]/20 flex items-center justify-center"
          >
            <div className="w-1/2 h-1/2 rounded-full bg-[#0066FF]" style={{ aspectRatio: '1' }} />
          </motion.div>
        )

        return null
      })}
    </div>
  )
}

/* ── Hero floaters ── */
const floaters = [
  { label: 'Projects Delivered', value: '200+', delay: 0.8,  pos: 'top-6 left-4'  },
  { label: 'Client Satisfaction', value: '98%',  delay: 1.0,  pos: 'bottom-6 right-4' },
  { label: 'Years of Expertise',  value: '5+',   delay: 1.2,  pos: 'top-1/2 -translate-y-1/2 right-0 translate-x-1/4' },
]

export function ServicesHero() {
  const [current, setCurrent] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y   = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(prev => (prev + 1) % heroSlides.length)
    }, 3200)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-16"
    >
      {/* Decorative BG */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full bg-[#0066FF] opacity-[0.04] blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#1683FF] opacity-[0.05] blur-[100px]" />
        <div className="absolute inset-0 dot-grid opacity-30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Left: text ── */}
          <motion.div
            style={{ y, opacity }}
            className="flex flex-col gap-7"
          >
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

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
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
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? 'w-5 bg-[#0066FF]' : 'w-1.5 bg-[#DCEBFF]'
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

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center gap-6 pt-4 border-t border-[#DCEBFF]"
            >
              {[
                { v: '200+', l: 'Projects' },
                { v: '50+',  l: 'Clients'  },
                { v: '9',    l: 'Services' },
              ].map((s, i) => (
                <div key={s.l} className={`flex flex-col gap-0.5 ${i > 0 ? 'pl-6 border-l border-[#DCEBFF]' : ''}`}>
                  <span className="text-2xl font-extrabold text-[#0066FF]">{s.v}</span>
                  <span className="text-xs text-[#64748B]">{s.l}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: animated visual ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="relative hidden lg:block"
          >
            {/* Main panel */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-[#DCEBFF] bg-[#F5FAFF] shadow-blue-lg p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 p-6"
                >
                  <HeroVisualSlide slide={heroSlides[current]} />
                </motion.div>
              </AnimatePresence>

              {/* Corner decorations */}
              <div className="absolute top-4 right-4 flex gap-1.5">
                {[0,1,2].map(i => (
                  <div key={i} className="h-1.5 w-1.5 rounded-full bg-[#DCEBFF]" />
                ))}
              </div>
            </div>

            {/* Floating stat cards */}
            {floaters.map((f) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: f.delay, duration: 0.5, ease: EASE }}
                className={`absolute ${f.pos} glass rounded-xl px-4 py-3 float shadow-blue z-10`}
              >
                <div className="text-lg font-extrabold text-[#0066FF]">{f.value}</div>
                <div className="text-[10px] text-[#64748B] whitespace-nowrap">{f.label}</div>
              </motion.div>
            ))}

            {/* Orbital decoration */}
            <div
              aria-hidden
              className="absolute -inset-6 rounded-3xl border border-[#0066FF]/5 pointer-events-none"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
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
