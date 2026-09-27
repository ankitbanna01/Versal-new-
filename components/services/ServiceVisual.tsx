'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Image from 'next/image'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ═══════════════════════════════════════════════════════════
   REUSABLE CYCLE ENGINE
═══════════════════════════════════════════════════════════ */
export function CycleVisual({
  frames,
  interval = 3400,
}: {
  frames: React.ReactNode[]
  interval?: number
}) {
  const [idx, setIdx] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setIdx(p => (p + 1) % frames.length), interval)
    return () => clearInterval(id)
  }, [frames.length, interval, inView])

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="absolute inset-0"
        >
          {frames[idx]}
        </motion.div>
      </AnimatePresence>
      {/* progress dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 pointer-events-none">
        {frames.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === idx ? 'w-5 bg-[#0066FF]' : 'w-1.5 bg-[#0066FF]/25'
            }`} />
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   SHARED PRIMITIVES
═══════════════════════════════════════════════════════════ */
function Sk({ w = 'w-full', h = 'h-2', dim = false }: { w?: string; h?: string; dim?: boolean }) {
  return <div className={`${w} ${h} rounded-full ${dim ? 'bg-[#EAF4FF]' : 'bg-[#DCEBFF]'}`} />
}

function Browser({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`w-full h-full rounded-2xl overflow-hidden flex flex-col border shadow-[0_8px_32px_-8px_#0066FF18] ${dark ? 'border-[#1E3A6E] bg-[#071A3D]' : 'border-[#DCEBFF] bg-white'
      }`}>
      <div className={`flex items-center gap-1.5 px-3 py-2.5 shrink-0 border-b ${dark ? 'bg-[#0D2348] border-[#1E3A6E]' : 'bg-[#F5FAFF] border-[#DCEBFF]'
        }`}>
        <span className="h-2.5 w-2.5 rounded-full bg-[#FCA5A5]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FDE68A]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#6EE7B7]" />
        <div className={`flex-1 ml-2 h-5 rounded-full flex items-center px-2 gap-1 border ${dark ? 'bg-[#1E3A6E]/60 border-[#1E3A6E]' : 'bg-white border-[#DCEBFF]'
          }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${dark ? 'bg-[#4D9CFF]/40' : 'bg-[#0066FF]/30'}`} />
          <div className={`h-1.5 flex-1 rounded-full ${dark ? 'bg-[#4D9CFF]/20' : 'bg-[#EAF4FF]'}`} />
        </div>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}

function Phone({ children, narrow = false }: { children: React.ReactNode; narrow?: boolean }) {
  return (
    <div className={`mx-auto ${narrow ? 'w-24 h-44' : 'w-28 h-52'} rounded-[1.5rem] border-2 border-[#DCEBFF] bg-white overflow-hidden flex flex-col shadow-[0_8px_24px_-4px_#0066FF18]`}>
      <div className="h-5 bg-[#F5FAFF] border-b border-[#DCEBFF] flex items-center justify-center shrink-0">
        <div className="w-8 h-1 rounded-full bg-[#DCEBFF]" />
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
      <div className="h-4 bg-[#F5FAFF] border-t border-[#DCEBFF] flex items-center justify-center shrink-0">
        <div className="w-5 h-1 rounded-full bg-[#DCEBFF]" />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   3D PHOTO CARD — floats in space with depth
   Used across all service visuals
───────────────────────────────────────────── */
function PhotoCard3D({
  src,
  alt,
  className = '',
  style = {},
  floatClass = 'float',
  delay = 0,
  perspective = 800,
  rotateY = 0,
  rotateX = 0,
  scale = 1,
}: {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
  floatClass?: string
  delay?: number
  perspective?: number
  rotateY?: number
  rotateX?: number
  scale?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: scale * 0.88, y: 16 }}
      animate={{ opacity: 1, scale, y: 0 }}
      transition={{ delay, duration: 0.7, ease: EASE }}
      className={`${floatClass} ${className}`}
      style={{
        perspective,
        transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
        ...style,
      }}
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-[#DCEBFF] shadow-[0_16px_48px_-12px_#0066FF28]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Image
          src={src}
          alt={alt}
          width={400}
          height={280}
          className="w-full h-full object-cover"
        />
        {/* Glass overlay strip at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#071A3D]/40 to-transparent" />
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   FLOATING STAT BADGE — overlaid on photos
───────────────────────────────────────────── */
function StatBadge({
  value, label, delay = 0, className = '',
}: { value: string; label: string; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: EASE }}
      className={`glass rounded-xl px-3 py-2 shadow-blue float-delayed z-20 ${className}`}
    >
      <div className="text-sm font-extrabold text-[#0066FF] leading-none">{value}</div>
      <div className="text-[9px] text-[#64748B] mt-0.5 whitespace-nowrap">{label}</div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   CHART COMPONENTS
───────────────────────────────────────────── */
function BarChart({ bars, height = 'h-12' }: { bars: number[]; height?: string }) {
  return (
    <div className={`${height} flex items-end gap-1`}>
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: i * 0.05, duration: 0.5, ease: EASE }}
          style={{
            height: `${h}%`, transformOrigin: 'bottom', opacity: 0.55 + i * 0.045,
            background: `linear-gradient(to top, #0066FF, #4D9CFF)`
          }}
          className="flex-1 rounded-t-sm"
        />
      ))}
    </div>
  )
}

function LineChart() {
  return (
    <svg className="w-full h-full" viewBox="0 0 200 60" fill="none" preserveAspectRatio="none">
      <defs>
        <linearGradient id="lgLine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0066FF" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path d="M0,52 C25,46 45,32 70,28 S110,12 135,16 S165,4 200,6"
        stroke="#0066FF" strokeWidth="2.5" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }} />
      <path d="M0,52 C25,46 45,32 70,28 S110,12 135,16 S165,4 200,6 V60 H0 Z" fill="url(#lgLine)" />
      <motion.path d="M0,56 C30,52 70,48 110,44 S165,40 200,38"
        stroke="#4D9CFF" strokeWidth="1.5" fill="none" strokeDasharray="4 3" opacity="0.6"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }} />
    </svg>
  )
}

function ProgressBar({ label, pct, color = '#0066FF' }: { label: string; pct: number; color?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        <span className="text-[8px] font-semibold text-[#102A56]">{label}</span>
        <span className="text-[8px] font-bold" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-[#EAF4FF] overflow-hidden">
        <motion.div
          initial={{ width: 0 }} animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="h-full rounded-full" style={{ background: color }}
        />
      </div>
    </div>
  )
}

function KpiCard({ label, value, color = '#0066FF', trend }: {
  label: string; value: string; color?: string; trend?: string
}) {
  return (
    <div className="rounded-xl border border-[#DCEBFF] bg-white p-2.5 flex flex-col gap-1">
      <div className="text-[8px] text-[#64748B] font-medium">{label}</div>
      <div className="text-sm font-extrabold leading-none" style={{ color }}>{value}</div>
      {trend && <div className="text-[8px] text-emerald-500">{trend}</div>}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   01 — WEBSITE DESIGN & DEVELOPMENT
══════════════════════════════════════════════════════════ */

/* Frame A — real photo of website work + floating browser mockup */
function Web1() {
  return (
    <div className="absolute inset-0 bg-[#F5FAFF] overflow-hidden">
      {/* Real work photo — fills background with 3D tilt */}
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="absolute inset-0"
        style={{ perspective: 1200 }}
      >
        <motion.div
          animate={{ rotateX: [0, 1.5, 0, -1.5, 0], rotateY: [0, 2, 0, -2, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Image
            src="/images/work-website.png"
            alt="Website design work"
            fill
            className="object-cover opacity-80"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
        {/* Gradient overlay so UI elements read clearly */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5FAFF]/80 via-transparent to-transparent" />
      </motion.div>

      {/* Floating browser mockup — foreground layer */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotateY: -8 }}
        animate={{ opacity: 1, y: 0, rotateY: -4 }}
        transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
        className="absolute left-4 top-6 right-16 bottom-14"
        style={{ perspective: 900, transformStyle: 'preserve-3d' }}
      >
        <Browser>
          <div className="flex flex-col h-full p-3 gap-2">
            {/* Nav */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-[#0066FF]" />
                <Sk w="w-12" h="h-2" />
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3].map(i => <Sk key={i} w="w-6" h="h-1.5" dim />)}
                <div className="h-5 w-12 rounded-lg bg-[#0066FF] opacity-80" />
              </div>
            </div>
            {/* Hero */}
            <div className="flex-1 rounded-xl bg-gradient-to-br from-[#0066FF]/10 via-[#EAF4FF] to-[#F5FAFF] flex items-center px-4 gap-3">
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-3 w-28 rounded-full bg-[#102A56]/20" />
                <div className="h-2 w-20 rounded-full bg-[#DCEBFF]" />
                <div className="flex gap-2 mt-1">
                  <div className="h-6 w-14 rounded-lg bg-[#0066FF] opacity-80" />
                  <div className="h-6 w-14 rounded-lg border border-[#DCEBFF]" />
                </div>
              </div>
              <div className="w-12 h-16 rounded-xl bg-gradient-to-b from-[#EAF4FF] to-[#DCEBFF]" />
            </div>
            {/* Cards */}
            <div className="grid grid-cols-3 gap-1.5">
              {['bg-[#0066FF]/8', 'bg-[#EAF4FF]', 'bg-[#F5FAFF]'].map((bg, i) => (
                <div key={i} className={`${bg} rounded-xl p-2 border border-[#DCEBFF]`}>
                  <div className="w-4 h-4 rounded-md bg-[#0066FF]/20 mb-1" />
                  <Sk w="w-full" h="h-1" dim />
                </div>
              ))}
            </div>
          </div>
        </Browser>
      </motion.div>

      {/* Floating stat badges */}
      <StatBadge value="+340%" label="Conversion Lift" delay={0.6} className="absolute bottom-16 right-3" />
      <StatBadge value="100+" label="Sites Delivered" delay={0.8} className="absolute top-4 right-3" />
    </div>
  )
}

/* Frame B — responsive device showcase with photo */
function Web2() {
  return (
    <div className="absolute inset-0 bg-white overflow-hidden flex items-center justify-center p-4 gap-3">
      {/* Desktop with real screenshot */}
      <motion.div
        initial={{ opacity: 0, y: 16, rotateY: 4 }}
        animate={{ opacity: 1, y: 0, rotateY: 2 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex-1 rounded-xl border border-[#DCEBFF] overflow-hidden shadow-blue float"
        style={{ maxWidth: 170, perspective: 700 }}
      >
        <div className="h-4 bg-[#F5FAFF] border-b border-[#DCEBFF] flex items-center gap-1 px-2">
          {['bg-[#FCA5A5]', 'bg-[#FDE68A]', 'bg-[#6EE7B7]'].map((c, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${c}`} />
          ))}
        </div>
        <div className="relative" style={{ height: 100 }}>
          <Image src="/images/work-website.png" alt="Website mockup" fill className="object-cover" sizes="200px" />
          <div className="absolute inset-0 bg-white/10" />
        </div>
      </motion.div>

      {/* Phone with social work */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.65, ease: EASE }}
        className="float-delayed"
        style={{ perspective: 700 }}
      >
        <Phone narrow>
          <div className="relative w-full h-full">
            <Image src="/images/work-social.png" alt="Mobile UI" fill className="object-cover" sizes="120px" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0066FF]/20 to-transparent" />
          </div>
        </Phone>
      </motion.div>

      {/* Floating KPI */}
      <StatBadge value="98%" label="PageSpeed Score" delay={0.5} className="absolute bottom-4 left-4" />
    </div>
  )
}

/* Frame C — e-commerce + analytics overlay */
function Web3() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F5FAFF]">
      {/* Photo background */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="absolute inset-0"
      >
        <Image src="/images/work-website.png" alt="Website work" fill
          className="object-cover opacity-25" sizes="(max-width: 768px) 100vw, 50vw" />
      </motion.div>

      {/* Floating analytics dashboard */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.65, ease: EASE }}
        className="absolute inset-3 rounded-2xl border border-[#DCEBFF] bg-white/95 backdrop-blur-sm shadow-[0_8px_32px_-8px_#0066FF20] p-3 flex flex-col gap-2"
      >
        <div className="grid grid-cols-3 gap-2">
          <KpiCard label="Sessions" value="24.8k" trend="↑ 32%" />
          <KpiCard label="Bounce" value="28.4%" color="#1683FF" trend="↓ 6%" />
          <KpiCard label="Conv." value="9.2%" trend="↑ 2.1%" />
        </div>
        <div className="flex-1 rounded-xl bg-[#F5FAFF] border border-[#DCEBFF] p-2.5">
          <div className="h-2 w-24 rounded-full bg-[#DCEBFF] mb-2" />
          <div className="flex-1 relative" style={{ height: 60 }}><LineChart /></div>
        </div>
      </motion.div>
    </div>
  )
}

/* Frame D — 3D device stack */
function Web4() {
  return (
    <div className="absolute inset-0 bg-[#F5FAFF] flex items-center justify-center gap-3 p-4 overflow-hidden">
      {/* Devices at different z-depths */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotateY: 8 }}
        animate={{ opacity: 1, y: 0, rotateY: 4 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="float rounded-2xl overflow-hidden border-2 border-[#DCEBFF] shadow-[0_20px_48px_-12px_#0066FF22]"
        style={{ width: 130, perspective: 600 }}
      >
        <div className="h-4 bg-[#F5FAFF] border-b border-[#DCEBFF] flex items-center gap-1 px-1.5">
          {['bg-[#FCA5A5]', 'bg-[#FDE68A]', 'bg-[#6EE7B7]'].map((c, i) => (
            <div key={i} className={`w-1 h-1 rounded-full ${c}`} />
          ))}
        </div>
        <div className="relative" style={{ height: 90 }}>
          <Image src="/images/work-website.png" alt="Desktop website" fill className="object-cover" sizes="140px" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
        className="float-slow"
        style={{ perspective: 600 }}
      >
        <Phone narrow>
          <div className="relative w-full h-full">
            <Image src="/images/work-social.png" alt="Mobile" fill className="object-cover" sizes="100px" />
          </div>
        </Phone>
      </motion.div>

      {/* Floating badge */}
      <StatBadge value="5★" label="Client Rating" delay={0.5} className="absolute top-3 right-3" />
      <StatBadge value="SEO" label="First Page" delay={0.7} className="absolute bottom-3 left-3" />
    </div>
  )
}

export function WebVisual() {
  return <CycleVisual frames={[<Web1 key="w1" />, <Web2 key="w2" />, <Web3 key="w3" />, <Web4 key="w4" />]} interval={3400} />
}

/* ══════════════════════════════════════════════════════════
   02 — SOFTWARE DEVELOPMENT
══════════════════════════════════════════════════════════ */

function Soft1() {
  return (
    <div className="absolute inset-0 bg-[#071A3D] overflow-hidden">
      {/* Dark code environment */}
      <div className="absolute inset-0 flex">
        <div className="w-20 border-r border-[#1E3A6E] p-2 flex flex-col gap-1 shrink-0">
          {['src', 'components', 'pages', 'lib', 'api'].map((_, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-sm" style={{ background: ['#4D9CFF', '#1683FF', '#0066FF', '#4D9CFF', '#1683FF'][i] + '60' }} />
              <div className="h-1.5 rounded-full bg-[#4D9CFF]/20 flex-1" />
            </div>
          ))}
        </div>
        <div className="flex-1 p-3 flex flex-col gap-1.5">
          {[{ w: 'w-3/4', c: '#4D9CFF' }, { w: 'w-1/2', c: '#1683FF' }, { w: 'w-4/5', c: '#4D9CFF' },
          { w: 'w-2/3', c: '#0066FF' }, { w: 'w-1/3', c: '#1683FF' }, { w: 'w-3/5', c: '#4D9CFF' }].map((l, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[8px] font-mono w-3 text-[#4D9CFF]/30 shrink-0">{i + 1}</span>
              <div className={`${l.w} h-1.5 rounded-full`} style={{ background: l.c + '45', marginLeft: i > 2 ? 8 : 0 }} />
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span className="text-[8px] font-mono w-3 text-[#4D9CFF]/30 shrink-0">7</span>
            <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }}
              className="w-0.5 h-3 bg-[#4D9CFF]" />
          </div>
        </div>
      </div>
      {/* Floating dashboard screenshot */}
      <motion.div
        initial={{ opacity: 0, x: 20, rotateY: -12 }}
        animate={{ opacity: 1, x: 0, rotateY: -6 }}
        transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
        className="absolute right-2 bottom-2 left-24 top-12 rounded-xl overflow-hidden border border-[#1E3A6E] shadow-[0_8px_32px_-8px_#0066FF30] float-slow"
        style={{ perspective: 600 }}
      >
        <Image src="/images/work-website.png" alt="Software dashboard" fill
          className="object-cover opacity-60" sizes="200px" />
        <div className="absolute inset-0 bg-[#071A3D]/50" />
        {/* Overlay metrics */}
        <div className="absolute top-2 left-2 right-2 grid grid-cols-3 gap-1">
          {[{ l: 'Uptime', v: '99.9%' }, { l: 'Req/s', v: '4.2k' }, { l: 'Errors', v: '0.01%' }].map(m => (
            <div key={m.l} className="rounded-lg bg-[#0D2348]/80 backdrop-blur-sm p-1.5">
              <div className="text-[7px] text-[#4D9CFF]/60">{m.l}</div>
              <div className="text-[10px] font-bold text-[#4D9CFF]">{m.v}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function Soft2() {
  return (
    <Browser>
      <div className="p-3 flex flex-col gap-2.5 h-full">
        <div className="flex gap-1.5">
          {['Dashboard', 'Analytics', 'Users', 'Settings'].map((t, i) => (
            <div key={t} className={`h-6 px-2 rounded-lg text-[8px] flex items-center font-semibold ${i === 0 ? 'bg-[#0066FF]/15 text-[#0066FF]' : 'text-[#64748B] bg-[#F5FAFF]'
              }`}>{t}</div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          <KpiCard label="Revenue" value="$84.2k" trend="↑ 23%" />
          <KpiCard label="Users" value="12,480" trend="↑ 8%" />
          <KpiCard label="Uptime" value="99.97%" color="#1683FF" />
        </div>
        <div className="flex-1 rounded-xl border border-[#DCEBFF] bg-[#F5FAFF] p-2.5 flex flex-col gap-1">
          <div className="flex items-center justify-between mb-1">
            <Sk w="w-20" h="h-2" />
            <div className="flex gap-1.5">
              {['#0066FF', '#1683FF'].map(c => <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />)}
            </div>
          </div>
          <div className="flex-1 relative" style={{ minHeight: 40 }}><LineChart /></div>
        </div>
      </div>
    </Browser>
  )
}

function Soft3() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F5FAFF]">
      {/* Background screenshot faded */}
      <Image src="/images/work-website.png" alt="Software" fill
        className="object-cover opacity-10" sizes="(max-width: 768px) 100vw, 50vw" />

      {/* CRM table */}
      <motion.div
        initial={{ opacity: 0, y: 14, rotateX: -6 }}
        animate={{ opacity: 1, y: 0, rotateX: -2 }}
        transition={{ delay: 0.15, duration: 0.65, ease: EASE }}
        className="absolute inset-3 rounded-2xl border border-[#DCEBFF] bg-white/95 backdrop-blur-sm shadow-blue p-3 flex flex-col gap-2"
        style={{ perspective: 700 }}
      >
        <div className="flex items-center justify-between">
          <Sk w="w-28" h="h-2.5" />
          <div className="h-6 w-16 rounded-lg bg-[#0066FF]/15 text-[8px] text-[#0066FF] flex items-center justify-center font-bold">+ New</div>
        </div>
        <div className="rounded-xl border border-[#DCEBFF] overflow-hidden flex-1">
          <div className="grid grid-cols-4 bg-[#F5FAFF] border-b border-[#DCEBFF] px-3 py-2 gap-2">
            {['Company', 'Contact', 'Status', 'Value'].map(h => (
              <div key={h} className="h-1.5 rounded-full bg-[#DCEBFF]" />
            ))}
          </div>
          {[{ s: '#22C55E', v: '$12k' }, { s: '#0066FF', v: '$8.4k' }, { s: '#FFA500', v: '$22k' }, { s: '#22C55E', v: '$5.1k' }].map((row, i) => (
            <div key={i} className="grid grid-cols-4 px-3 py-2 gap-2 border-b border-[#DCEBFF] last:border-0 items-center">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-[#EAF4FF] shrink-0" />
                <Sk w="w-10" h="h-1.5" />
              </div>
              <Sk w="w-12" h="h-1.5" dim />
              <div className="h-3.5 px-1.5 rounded-full text-[7px] font-bold flex items-center w-fit"
                style={{ background: row.s + '20', color: row.s }}>
                {['Won', 'Active', 'Pending', 'Won'][i]}
              </div>
              <div className="h-2 rounded-full bg-[#0066FF]/20 text-[8px] flex items-center justify-center font-bold text-[#0066FF]">{row.v}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function Soft4() {
  return (
    <div className="absolute inset-0 bg-[#071A3D] p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 2 }}
            className="w-2 h-2 rounded-full bg-[#22C55E]" />
          <span className="text-[9px] font-mono text-[#4D9CFF]">API v2.4 · LIVE</span>
        </div>
        <div className="text-[8px] text-[#4D9CFF]/40 font-mono">99.97% uptime</div>
      </div>
      {[{ method: 'GET', path: '/api/users', ms: '12ms' }, { method: 'POST', path: '/api/orders', ms: '28ms' },
      { method: 'PUT', path: '/api/products', ms: '18ms' }, { method: 'DELETE', path: '/api/session', ms: '8ms' }].map((ep, i) => (
        <div key={i} className="flex items-center gap-2 rounded-lg border border-[#1E3A6E] bg-[#0D2348]/60 px-2.5 py-1.5">
          <div className="text-[8px] font-bold font-mono px-1.5 py-0.5 rounded"
            style={{
              background: ({ GET: '#22C55E', POST: '#0066FF', PUT: '#FFA500', DELETE: '#EF4444' }[ep.method] ?? '#0066FF') + '20',
              color: ({ GET: '#22C55E', POST: '#4D9CFF', PUT: '#FFA500', DELETE: '#EF4444' }[ep.method] ?? '#4D9CFF'),
            }}>{ep.method}</div>
          <div className="text-[8px] font-mono text-[#4D9CFF]/70 flex-1">{ep.path}</div>
          <div className="text-[8px] text-[#22C55E] font-mono">{ep.ms}</div>
        </div>
      ))}
      {/* Floating screenshot */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute right-3 bottom-3 w-24 h-16 rounded-xl overflow-hidden border border-[#1E3A6E] shadow-blue float-delayed"
      >
        <Image src="/images/work-website.png" alt="Dashboard preview" fill className="object-cover opacity-50" sizes="100px" />
        <div className="absolute inset-0 bg-[#071A3D]/40" />
      </motion.div>
    </div>
  )
}

export function SoftwareVisual() {
  return <CycleVisual frames={[<Soft1 key="s1" />, <Soft2 key="s2" />, <Soft3 key="s3" />, <Soft4 key="s4" />]} interval={3200} />
}

/* ══════════════════════════════════════════════════════════
   03 — GRAPHIC DESIGN
══════════════════════════════════════════════════════════ */

function Graphic1() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F5FAFF]">
      {/* Real branding photo — large background */}
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.85, ease: EASE }}
        className="absolute inset-0"
        style={{ perspective: 1000 }}
      >
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image src="/images/work-branding.png" alt="Graphic design work" fill
            className="object-cover opacity-70" sizes="(max-width: 768px) 100vw, 50vw" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5FAFF]/80 via-transparent to-transparent" />
      </motion.div>

      {/* Floating design cards */}
      <motion.div
        initial={{ opacity: 0, x: -16, rotate: -3 }}
        animate={{ opacity: 1, x: 0, rotate: -2 }}
        transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
        className="absolute left-3 top-4 w-28 rounded-2xl border border-[#DCEBFF] bg-white/90 backdrop-blur-sm shadow-blue p-2 float"
      >
        <div className="h-14 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#4D9CFF] mb-2" />
        <Sk w="w-3/4" h="h-1.5" />
        <Sk w="w-1/2" h="h-1" dim />
      </motion.div>

      <StatBadge value="500+" label="Designs Done" delay={0.6} className="absolute bottom-4 right-3" />
    </div>
  )
}

function Graphic2() {
  return (
    <div className="absolute inset-0 p-3 flex gap-3 bg-white overflow-hidden">
      {/* Real work photo */}
      <motion.div
        initial={{ opacity: 0, rotateY: 8 }}
        animate={{ opacity: 1, rotateY: 3 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="w-1/2 rounded-2xl overflow-hidden border border-[#DCEBFF] shadow-blue float relative"
        style={{ perspective: 700 }}
      >
        <Image src="/images/work-branding.png" alt="Branding design" fill className="object-cover" sizes="200px" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/30 to-transparent" />
        <div className="absolute bottom-2 left-2 right-2">
          <div className="h-1.5 rounded-full bg-white/50 mb-1" />
          <div className="h-1 rounded-full bg-white/30 w-3/4" />
        </div>
      </motion.div>

      {/* Social designs stack */}
      <div className="flex-1 flex flex-col gap-2">
        {['/images/work-social.png', '/images/work-branding.png'].map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.12, duration: 0.55, ease: EASE }}
            className="flex-1 rounded-xl overflow-hidden border border-[#DCEBFF] shadow-sm relative float-slow"
          >
            <Image src={src} alt={`Design ${i + 1}`} fill className="object-cover" sizes="120px" />
          </motion.div>
        ))}
        <StatBadge value="Branding" label="Identity Work" delay={0.5} className="absolute bottom-3 right-3" />
      </div>
    </div>
  )
}

function Graphic3() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F5FAFF]">
      {/* Social photo background */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        <Image src="/images/work-social.png" alt="Social media design" fill
          className="object-cover opacity-30" sizes="(max-width: 768px) 100vw, 50vw" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40" />
      </motion.div>

      {/* 2×2 design card grid */}
      <div className="absolute inset-3 grid grid-cols-2 gap-2.5">
        {[
          { src: '/images/work-branding.png', label: 'Brand Identity' },
          { src: '/images/work-social.png', label: 'Social Media' },
          { src: '/images/work-ads.png', label: 'Ad Creatives' },
          { src: '/images/work-branding.png', label: 'Packaging' },
        ].map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
            className="rounded-2xl overflow-hidden border border-[#DCEBFF] shadow-sm relative"
          >
            <Image src={c.src} alt={c.label} fill className="object-cover" sizes="200px" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/50 to-transparent" />
            <div className="absolute bottom-1.5 left-2 right-1 text-[8px] font-bold text-white/80">{c.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Graphic4() {
  return (
    <div className="absolute inset-0 bg-[#F5FAFF] flex items-center justify-center gap-4 p-4 overflow-hidden">
      {/* 3D rotating photo card */}
      <motion.div
        animate={{ rotateY: [0, 8, 0, -8, 0], rotateX: [0, 2, 0, -2, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
        className="relative w-32 rounded-2xl overflow-hidden border border-[#DCEBFF] shadow-[0_16px_40px_-8px_#0066FF25]"
        style={{ perspective: 700, transformStyle: 'preserve-3d', height: 120 }}
      >
        <Image src="/images/work-branding.png" alt="Design work" fill className="object-cover" sizes="140px" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/40 to-transparent" />
        <div className="absolute bottom-2 left-2 right-2 text-[8px] font-bold text-white/80">Brand Identity</div>
      </motion.div>

      {/* Side info */}
      <div className="flex flex-col gap-2.5">
        {['Social Media', 'Brochures', 'Packaging', 'Posters'].map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            className="flex items-center gap-2 rounded-lg border border-[#DCEBFF] bg-white px-2.5 py-1.5 shadow-sm"
          >
            <div className="w-2 h-2 rounded-full bg-[#0066FF]" />
            <span className="text-[9px] font-semibold text-[#102A56]">{s}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function GraphicVisual() {
  return <CycleVisual frames={[<Graphic1 key="g1" />, <Graphic2 key="g2" />, <Graphic3 key="g3" />, <Graphic4 key="g4" />]} interval={3500} />
}

/* ══════════════════════════════════════════════════════════
   04 — DIGITAL MARKETING
══════════════════════════════════════════════════════════ */

function Mktg1() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-white">
      {/* Social photo faded background */}
      <Image src="/images/work-social.png" alt="Marketing" fill
        className="object-cover opacity-10" sizes="(max-width: 768px) 100vw, 50vw" />
      <div className="absolute inset-0 p-3 flex flex-col gap-2.5">
        <div className="grid grid-cols-3 gap-2">
          <KpiCard label="Impressions" value="124k" trend="↑ 32%" />
          <KpiCard label="CTR" value="4.8%" color="#1683FF" trend="↑ 0.4%" />
          <KpiCard label="Conv." value="248" trend="↑ 18%" />
        </div>
        <div className="flex-1 rounded-xl border border-[#DCEBFF] bg-white p-3 flex flex-col gap-1.5">
          <div className="flex items-center justify-between mb-0.5">
            <Sk w="w-20" h="h-2" />
            <div className="flex gap-1.5">
              {['#0066FF', '#1683FF', '#4D9CFF'].map(c => (
                <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
              ))}
            </div>
          </div>
          <div className="flex-1 relative" style={{ minHeight: 50 }}><LineChart /></div>
          <div className="flex justify-between px-1">
            {['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'].map(m => (
              <span key={m} className="text-[7px] text-[#64748B]">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Mktg2() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F5FAFF]">
      {/* Real social work photo */}
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="absolute inset-0"
        style={{ perspective: 900 }}
      >
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image src="/images/work-social.png" alt="Social media campaign" fill
            className="object-cover opacity-55" sizes="(max-width: 768px) 100vw, 50vw" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/30 to-transparent" />
      </motion.div>

      <div className="absolute inset-3 flex flex-col gap-2">
        <Sk w="w-28" h="h-2.5" />
        {['Instagram', 'Facebook', 'LinkedIn', 'Email'].map((ch, i) => (
          <div key={ch} className="flex items-center gap-2.5 rounded-xl border border-[#DCEBFF] bg-white/90 backdrop-blur-sm p-2">
            <div className="w-7 h-7 rounded-lg shrink-0"
              style={{ background: ['#E040FB', '#1877F2', '#0A66C2', '#0066FF'][i] + '20' }}>
              <div className="w-full h-full rounded-lg" style={{ background: ['#E040FB', '#1877F2', '#0A66C2', '#0066FF'][i] + '40' }} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between text-[9px] mb-1">
                <span className="font-bold text-[#102A56]">{ch}</span>
                <span className="text-[#0066FF] font-bold">{[82, 67, 51, 89][i]}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#EAF4FF] overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${[82, 67, 51, 89][i]}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="h-full rounded-full bg-gradient-to-r from-[#0066FF] to-[#4D9CFF]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Mktg3() {
  return (
    <div className="absolute inset-0 bg-white overflow-hidden p-3 flex gap-3">
      {/* Real social post photo */}
      <motion.div
        initial={{ opacity: 0, rotateY: 6 }}
        animate={{ opacity: 1, rotateY: 2 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex-1 rounded-2xl overflow-hidden border border-[#DCEBFF] shadow-blue float relative"
        style={{ perspective: 600 }}
      >
        <Image src="/images/work-social.png" alt="Social campaign" fill className="object-cover" sizes="200px" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/50 to-transparent" />
        <div className="absolute bottom-2 left-2 right-2 flex gap-3">
          {['♥ 2.4k', '💬 412', '↗ 820'].map(v => (
            <span key={v} className="text-[8px] text-white/80 font-semibold">{v}</span>
          ))}
        </div>
      </motion.div>

      {/* Insight metrics */}
      <div className="w-28 flex flex-col gap-2">
        {[{ l: 'Reach', v: '12.4k', c: '#0066FF' }, { l: 'Saves', v: '840', c: '#1683FF' }, { l: 'Shares', v: '320', c: '#4D9CFF' }].map(m => (
          <div key={m.l} className="flex-1 rounded-xl border border-[#DCEBFF] bg-white p-2 flex flex-col justify-center">
            <div className="text-[8px] text-[#64748B]">{m.l}</div>
            <div className="text-sm font-extrabold" style={{ color: m.c }}>{m.v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Mktg4() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F5FAFF]">
      <Image src="/images/work-ads.png" alt="Marketing ads" fill
        className="object-cover opacity-15" sizes="(max-width: 768px) 100vw, 50vw" />
      <div className="absolute inset-3 flex flex-col gap-2.5">
        <Sk w="w-32" h="h-2.5" />
        <div className="grid grid-cols-2 gap-2 flex-1">
          <div className="rounded-xl border border-[#DCEBFF] bg-white p-3 flex flex-col gap-2">
            <div className="text-[9px] font-bold text-[#102A56]">Content Calendar</div>
            <div className="grid grid-cols-7 gap-0.5 flex-1">
              {Array.from({ length: 28 }).map((_, i) => (
                <div key={i} className={`rounded-sm aspect-square ${[2, 5, 8, 11, 14, 17, 20].includes(i) ? 'bg-[#0066FF]/40' :
                    [3, 7, 12, 19, 25].includes(i) ? 'bg-[#1683FF]/25' : 'bg-[#EAF4FF]'
                  }`} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex-1 rounded-xl border border-[#DCEBFF] bg-white p-2.5 flex flex-col justify-between">
              <div className="text-[8px] font-bold text-[#64748B]">Email Open Rate</div>
              <div className="text-xl font-extrabold text-[#0066FF]">38.2%</div>
              <div className="h-1.5 rounded-full bg-[#EAF4FF] overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '38%' }}
                  transition={{ duration: 0.9 }} className="h-full rounded-full bg-[#0066FF]" />
              </div>
            </div>
            <div className="flex-1 rounded-xl border border-[#DCEBFF] bg-white p-2.5 flex flex-col justify-between">
              <div className="text-[8px] font-bold text-[#64748B]">Click Rate</div>
              <div className="text-xl font-extrabold text-[#1683FF]">12.7%</div>
              <div className="h-1.5 rounded-full bg-[#EAF4FF] overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '12.7%' }}
                  transition={{ duration: 0.9, delay: 0.2 }} className="h-full rounded-full bg-[#1683FF]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function MarketingVisual() {
  return <CycleVisual frames={[<Mktg1 key="m1" />, <Mktg2 key="m2" />, <Mktg3 key="m3" />, <Mktg4 key="m4" />]} interval={3300} />
}

/* ══════════════════════════════════════════════════════════
   05 — BRANDING
══════════════════════════════════════════════════════════ */

function Brand1() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F5FAFF]">
      {/* Real branding photo */}
      <motion.div
        initial={{ opacity: 0, scale: 1.07 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.85, ease: EASE }}
        className="absolute inset-0"
        style={{ perspective: 1000 }}
      >
        <motion.div
          animate={{ rotateX: [0, 1.5, 0], rotateY: [0, 2.5, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Image src="/images/work-branding.png" alt="Brand identity work" fill
            className="object-cover opacity-65" sizes="(max-width: 768px) 100vw, 50vw" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F5FAFF]/70 via-transparent to-transparent" />
      </motion.div>

      {/* Floating identity grid */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.65, ease: EASE }}
        className="absolute inset-4 grid grid-cols-5 grid-rows-3 gap-2"
      >
        <div className="col-span-3 row-span-2 rounded-2xl bg-[#0066FF] flex items-center justify-center shadow-[0_8px_24px_-4px_#0066FF40]">
          <div className="text-center">
            <motion.div
              animate={{ rotate: [0, 6, -6, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
              className="w-10 h-10 rounded-2xl bg-white/20 mx-auto mb-2.5 flex items-center justify-center"
            >
              <div className="w-6 h-6 rounded-xl bg-white/65" />
            </motion.div>
            <div className="h-2 w-14 rounded-full bg-white/50 mx-auto mb-1" />
            <div className="h-1.5 w-9 rounded-full bg-white/25 mx-auto" />
          </div>
        </div>
        {['#0066FF', '#1683FF', '#4D9CFF', '#102A56'].map((c, i) => (
          <div key={i} className={`${i < 2 ? 'col-span-2' : 'col-span-1'} rounded-xl`}
            style={{ background: c, opacity: 0.75 + i * 0.06 }} />
        ))}
        <div className="col-span-5 rounded-xl border border-[#DCEBFF] bg-white/90 backdrop-blur-sm flex items-center gap-4 px-3">
          <div className="h-2.5 w-20 rounded-full bg-[#102A56]/20" />
          <div className="h-2 w-14 rounded-full bg-[#DCEBFF]" />
          <div className="h-2 w-14 rounded-full bg-[#EAF4FF] ml-auto" />
        </div>
      </motion.div>
    </div>
  )
}

function Brand2() {
  return (
    <div className="absolute inset-0 flex gap-3 p-3 bg-white overflow-hidden">
      {/* Real work photo */}
      <motion.div
        initial={{ opacity: 0, rotateY: 7 }}
        animate={{ opacity: 1, rotateY: 3 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="w-1/2 rounded-2xl overflow-hidden border border-[#DCEBFF] shadow-blue float relative"
        style={{ perspective: 600 }}
      >
        <Image src="/images/work-branding.png" alt="Brand work" fill className="object-cover" sizes="200px" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/35 to-transparent" />
        <div className="absolute bottom-2 left-2 text-[8px] font-bold text-white/80">Brand System</div>
      </motion.div>

      {/* Stationery / card info */}
      <div className="flex-1 flex flex-col gap-2">
        <motion.div
          animate={{ rotateZ: [0, 1, -1, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="flex-1 rounded-xl border border-[#DCEBFF] bg-gradient-to-br from-[#0066FF]/6 to-[#EAF4FF] p-3 flex items-center justify-between shadow-sm"
        >
          <div className="flex flex-col gap-1.5">
            <div className="h-2.5 w-16 rounded-full bg-[#0066FF]/40" />
            <div className="h-1.5 w-20 rounded-full bg-[#102A56]/20" />
            <div className="h-1 w-14 rounded-full bg-[#64748B]/20" />
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#0066FF] flex items-center justify-center shadow-sm">
            <div className="w-5 h-5 rounded-lg bg-white/50" />
          </div>
        </motion.div>
        {['Brand Guide', 'Colours', 'Typography'].map((s, i) => (
          <div key={s} className="flex items-center gap-1.5 rounded-lg border border-[#DCEBFF] bg-white px-2 py-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: ['#0066FF', '#1683FF', '#4D9CFF'][i] + '50' }} />
            <span className="text-[9px] font-semibold text-[#102A56]">{s}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Brand3() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F5FAFF]">
      {/* Branding photo with slow zoom */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image src="/images/work-branding.png" alt="Branding" fill
            className="object-cover opacity-35" sizes="(max-width: 768px) 100vw, 50vw" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/50" />
      </motion.div>

      {/* Guidelines book */}
      <div className="absolute inset-3 flex items-center justify-center gap-4">
        <motion.div
          animate={{ rotateY: [0, 5, 0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          className="w-28 rounded-r-xl rounded-l-md bg-white border border-[#DCEBFF] shadow-[0_8px_24px_-4px_#0066FF18] overflow-hidden flex flex-col"
          style={{ height: 140, transformStyle: 'preserve-3d', perspective: 600 }}
        >
          <div className="h-full absolute left-0 top-0 w-2.5 bg-[#0066FF] rounded-l-md" />
          <div className="flex-1 pl-5 pr-2 pt-3 flex flex-col gap-1.5">
            <div className="h-2 w-14 rounded-full bg-[#102A56]/20" />
            <div className="h-px bg-[#DCEBFF] my-1" />
            <div className="grid grid-cols-4 gap-1">
              {['#0066FF', '#1683FF', '#4D9CFF', '#102A56', '#EAF4FF', '#F5FAFF', '#DCEBFF', '#071A3D'].map(c => (
                <div key={c} className="aspect-square rounded-sm" style={{ background: c }} />
              ))}
            </div>
            <div className="mt-2 flex flex-col gap-1"><Sk w="w-full" h="h-1.5" /><Sk w="w-3/4" h="h-1" dim /></div>
          </div>
          <div className="h-8 bg-[#0066FF] flex items-center px-3">
            <div className="h-1.5 w-12 rounded-full bg-white/40" />
          </div>
        </motion.div>

        <div className="flex flex-col gap-2.5">
          {['Logo System', 'Typography', 'Colour Palette', 'Iconography'].map((item, i) => (
            <div key={item} className="flex items-center gap-2 rounded-lg border border-[#DCEBFF] bg-white/90 backdrop-blur-sm px-2.5 py-1.5 shadow-sm">
              <div className="w-5 h-5 rounded-md flex items-center justify-center text-[9px]"
                style={{
                  background: ['#0066FF', '#1683FF', '#4D9CFF', '#102A56'][i] + '20',
                  color: ['#0066FF', '#1683FF', '#4D9CFF', '#102A56'][i]
                }}>◆</div>
              <span className="text-[9px] font-semibold text-[#102A56]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Brand4() {
  return (
    <div className="absolute inset-0 p-3 bg-[#F5FAFF] overflow-hidden">
      <div className="grid grid-cols-2 gap-3 h-full">
        <motion.div
          initial={{ opacity: 0, rotateY: 8 }}
          animate={{ opacity: 1, rotateY: 4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="rounded-2xl overflow-hidden border border-[#DCEBFF] shadow-blue float relative"
          style={{ perspective: 600 }}
        >
          <Image src="/images/work-branding.png" alt="Brand mockup" fill className="object-cover" sizes="200px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/40 to-transparent" />
          <div className="absolute bottom-2 left-2 text-[8px] font-bold text-white/80">Packaging</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, rotateY: -8 }}
          animate={{ opacity: 1, rotateY: -4 }}
          transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
          className="rounded-2xl overflow-hidden border border-[#DCEBFF] shadow-blue float-slow relative"
          style={{ perspective: 600 }}
        >
          <Image src="/images/work-social.png" alt="Brand application" fill className="object-cover" sizes="200px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/40 to-transparent" />
          <div className="absolute bottom-2 left-2 text-[8px] font-bold text-white/80">Stationery</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
          className="col-span-2 rounded-2xl border border-[#DCEBFF] bg-[#071A3D] flex overflow-hidden"
        >
          <div className="flex-1 flex items-center p-4 gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#0066FF]" />
            <div className="flex flex-col gap-1">
              <div className="h-2.5 w-20 rounded-full bg-white/50" />
              <div className="h-1.5 w-14 rounded-full bg-white/25" />
            </div>
          </div>
          <div className="w-24 relative">
            <Image src="/images/work-branding.png" alt="Signage" fill className="object-cover opacity-40" sizes="100px" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export function BrandingVisual() {
  return <CycleVisual frames={[<Brand1 key="b1" />, <Brand2 key="b2" />, <Brand3 key="b3" />, <Brand4 key="b4" />]} interval={3400} />
}

/* ══════════════════════════════════════════════════════════
   06 — LOGO DESIGN
══════════════════════════════════════════════════════════ */

function Logo1() {
  return (
    <div className="absolute inset-0 bg-[#F5FAFF] flex items-center justify-center">
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="relative w-24 h-24"
      >
        <div className="absolute inset-0 rounded-full border-2 border-[#0066FF]/15" />
        <div className="absolute inset-2 rounded-full border-2 border-[#0066FF]/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 rounded-2xl bg-[#0066FF] flex items-center justify-center shadow-[0_4px_16px_-4px_#0066FF60]"
          >
            <div className="w-5 h-5 rounded-xl bg-white/65" />
          </motion.div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#0066FF]/50" />
      </motion.div>
    </div>
  )
}

function Logo2() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F5FAFF]">
      {/* Branding photo as context */}
      <Image src="/images/work-branding.png" alt="Logo context" fill
        className="object-cover opacity-20" sizes="(max-width: 768px) 100vw, 50vw" />
      <div className="absolute inset-3 grid grid-cols-2 gap-2.5">
        {[
          { bg: '#FFFFFF', dark: false },
          { bg: '#071A3D', dark: true },
          { bg: '#0066FF', dark: true },
          { bg: '#F5FAFF', dark: false },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08, duration: 0.45, ease: EASE }}
            className="rounded-xl flex items-center justify-center border border-[#DCEBFF]"
            style={{ background: s.bg }}
          >
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-md" style={{ background: s.dark ? '#ffffff60' : '#0066FF90' }} />
              <div className="flex flex-col gap-0.5">
                <div className="h-1.5 w-9 rounded-full" style={{ background: s.dark ? '#ffffff50' : '#102A5225' }} />
                <div className="h-1 w-6 rounded-full" style={{ background: s.dark ? '#ffffff30' : '#64748B20' }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function Logo3() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-white">
      <Image src="/images/work-branding.png" alt="Logo presentation" fill
        className="object-cover opacity-10" sizes="(max-width: 768px) 100vw, 50vw" />
      <div className="absolute inset-3 flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-1">
          <Sk w="w-20" h="h-2" />
          <div className="ml-auto h-5 w-12 rounded-lg bg-[#0066FF]/15 text-[8px] text-[#0066FF] flex items-center justify-center font-bold">v3.0</div>
        </div>
        <div className="flex-1 flex items-center justify-around">
          {[{ opacity: 0.25, scale: 0.75, label: 'v1' }, { opacity: 0.55, scale: 0.85, label: 'v2' }, { opacity: 1, scale: 1, label: 'Final' }].map((v, i) => (
            <div key={i} className="flex flex-col items-center gap-2" style={{ opacity: v.opacity }}>
              <div className="rounded-2xl bg-[#0066FF] flex items-center justify-center shadow-sm"
                style={{ width: 36 * v.scale, height: 36 * v.scale }}>
                <div className="rounded-xl bg-white/40" style={{ width: 18 * v.scale, height: 18 * v.scale }} />
              </div>
              <div className="text-[8px] text-[#64748B]">{v.label}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-[#EAF4FF] p-2.5 flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#0066FF] flex items-center justify-center">
            <div className="w-4 h-4 rounded-lg bg-white/60" />
          </div>
          <div className="flex flex-col gap-1"><Sk w="w-16" h="h-2" /><Sk w="w-10" h="h-1.5" dim /></div>
        </div>
      </div>
    </div>
  )
}

function Logo4() {
  return (
    <div className="absolute inset-0 bg-[#F5FAFF] flex items-center justify-center gap-4 p-4 overflow-hidden">
      {/* Real branding photo as floating card */}
      <motion.div
        animate={{ rotateY: [0, 6, 0, -6, 0], rotateX: [0, 2, 0, -2, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="relative rounded-2xl overflow-hidden border border-[#DCEBFF] shadow-[0_16px_40px_-8px_#0066FF25]"
        style={{ width: 110, height: 80, perspective: 600, transformStyle: 'preserve-3d' }}
      >
        <Image src="/images/work-branding.png" alt="Logo on real object" fill className="object-cover" sizes="120px" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/40 to-transparent" />
        <div className="absolute bottom-1.5 left-2 text-[8px] font-bold text-white/80">Logo Applied</div>
      </motion.div>

      <div className="flex flex-col gap-2.5">
        <div className="w-14 h-14 rounded-full border-4 border-[#0066FF]/20 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-[#0066FF]/10 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[#0066FF]/30" />
          </div>
        </div>
        {['Versatile', 'Timeless', 'Scalable'].map((l, i) => (
          <div key={l} className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
            <span className="text-[9px] font-semibold text-[#102A56]">{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function LogoVisual() {
  return <CycleVisual frames={[<Logo1 key="l1" />, <Logo2 key="l2" />, <Logo3 key="l3" />, <Logo4 key="l4" />]} interval={2900} />
}

/* ══════════════════════════════════════════════════════════
   07 — PHOTOGRAPHY
══════════════════════════════════════════════════════════ */

const PHOTO_SETUPS = [
  { src: '/images/case-restaurant.png', label: 'Food Photography', badge: 'Restaurant' },
  { src: '/images/work-branding.png', label: 'Product Photography', badge: 'Commercial' },
  { src: '/images/case-realestate.png', label: 'Real Estate Shoots', badge: 'Property' },
  { src: '/images/about-studio.png', label: 'Corporate Portraits', badge: 'Corporate' },
]

function PhotoFrame3D({ setup }: { setup: typeof PHOTO_SETUPS[0] }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main photo with 3D slow-pan */}
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="absolute inset-0"
        style={{ perspective: 1200 }}
      >
        <motion.div
          animate={{ scale: [1, 1.04, 1], rotateX: [0, 1, 0], rotateY: [0, 1.5, 0] }}
          transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Image
            src={setup.src}
            alt={setup.label}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
        {/* Film-style vignette */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(7,26,61,0.45) 100%)' }} />
        {/* Top gradient */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#071A3D]/40 to-transparent" />
      </motion.div>

      {/* Camera HUD overlay */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <div className="text-[8px] font-mono text-white/70 bg-[#071A3D]/40 backdrop-blur-sm rounded-lg px-2 py-1">
          f/2.8 · 1/200s · ISO 400
        </div>
        <div className="flex items-center gap-1.5 bg-[#071A3D]/40 backdrop-blur-sm rounded-lg px-2 py-1">
          <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 rounded-full bg-red-400" />
          <div className="text-[8px] font-mono text-white/70">REC</div>
        </div>
      </div>

      {/* Rule-of-thirds grid (subtle) */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        {[1, 2].map(i => (
          <div key={`v${i}`} className="absolute top-0 bottom-0 w-px bg-white" style={{ left: `${i * 33.33}%` }} />
        ))}
        {[1, 2].map(i => (
          <div key={`h${i}`} className="absolute left-0 right-0 h-px bg-white" style={{ top: `${i * 33.33}%` }} />
        ))}
      </div>

      {/* Bottom info strip */}
      <div className="absolute bottom-0 left-0 right-0 p-3 pt-8"
        style={{ background: 'linear-gradient(to top, rgba(7,26,61,0.75), transparent)' }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-bold text-[10px] mb-0.5">{setup.label}</div>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-5 w-7 rounded-sm bg-white/20" />
              ))}
            </div>
          </div>
          <div className="glass rounded-lg px-2.5 py-1.5">
            <div className="text-[9px] font-bold text-white">{setup.badge}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PhotoVisual() {
  return (
    <CycleVisual
      frames={PHOTO_SETUPS.map((s, i) => <PhotoFrame3D key={i} setup={s} />)}
      interval={3200}
    />
  )
}

/* ══════════════════════════════════════════════════════════
   08 — GOOGLE ADS
══════════════════════════════════════════════════════════ */

function Gads1() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-white">
      <Image src="/images/work-ads.png" alt="Google Ads" fill
        className="object-cover opacity-10" sizes="(max-width: 768px) 100vw, 50vw" />
      <div className="absolute inset-3 flex flex-col gap-2">
        {/* Search bar */}
        <div className="flex items-center gap-2 rounded-full border border-[#DCEBFF] bg-white px-3 py-2 shadow-sm">
          <div className="flex gap-0.5">
            {['#4285F4', '#EA4335', '#FBBC05', '#34A853'].map(c => (
              <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <div className="flex-1 h-2 rounded-full bg-[#EAF4FF]" />
          <div className="w-5 h-5 rounded-full border border-[#DCEBFF] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full border border-[#DCEBFF]" />
          </div>
        </div>
        {[0, 1, 2].map(i => (
          <div key={i} className={`rounded-xl border p-2.5 ${i === 0 ? 'border-[#0066FF]/25 bg-[#EAF4FF]/80' : 'border-[#DCEBFF] bg-white'}`}>
            <div className="flex items-center gap-1.5 mb-1">
              {i === 0 && <div className="inline-flex items-center px-1.5 py-0.5 rounded-sm bg-[#0066FF]/12">
                <span className="text-[8px] font-bold text-[#0066FF]">Sponsored</span>
              </div>}
              <div className="h-1.5 w-20 rounded-full" style={{ background: i === 0 ? '#0066FF60' : '#DCEBFF' }} />
            </div>
            <div className="h-2 w-3/4 rounded-full bg-[#DCEBFF] mb-1" />
            <div className="h-1.5 w-full rounded-full bg-[#EAF4FF]" />
            {i === 0 && <div className="flex gap-2 mt-1.5">
              {['Fast Delivery', 'Free Quote', '24/7 Support'].map(ext => (
                <div key={ext} className="h-4 px-1.5 rounded-full border border-[#0066FF]/20 text-[7px] text-[#0066FF] flex items-center">{ext}</div>
              ))}
            </div>}
          </div>
        ))}
      </div>
    </div>
  )
}

function Gads2() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F5FAFF]">
      {/* Ads work photo */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="absolute inset-0"
        style={{ perspective: 900 }}
      >
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 11, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image src="/images/work-ads.png" alt="Google Ads dashboard" fill
            className="object-cover opacity-40" sizes="(max-width: 768px) 100vw, 50vw" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/50 to-transparent" />
      </motion.div>

      <div className="absolute inset-3 flex flex-col gap-2.5">
        <div className="grid grid-cols-2 gap-2">
          <KpiCard label="CTR" value="4.8%" trend="↑ 0.6%" />
          <KpiCard label="ROAS" value="6.2×" color="#1683FF" trend="↑ 1.1×" />
          <KpiCard label="Clicks" value="3,240" color="#4D9CFF" trend="↑ 12%" />
          <KpiCard label="Conv. Rate" value="9.4%" trend="↑ 2.1%" />
        </div>
        <div className="flex-1 rounded-xl border border-[#DCEBFF] bg-white/90 backdrop-blur-sm p-2.5 flex flex-col gap-1.5">
          <Sk w="w-20" h="h-2" />
          <div className="flex-1 relative" style={{ minHeight: 40 }}><LineChart /></div>
        </div>
      </div>
    </div>
  )
}

function Gads3() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-white p-3 flex flex-col gap-2">
      <Image src="/images/work-ads.png" alt="Ads" fill
        className="object-cover opacity-8" sizes="(max-width: 768px) 100vw, 50vw" />
      <Sk w="w-28" h="h-2.5" />
      {[
        { name: 'Brand Keywords', impressions: '24k', ctr: '6.2%', budget: '70%' },
        { name: 'Competitor Terms', impressions: '11k', ctr: '3.8%', budget: '20%' },
        { name: 'Generic Search', impressions: '38k', ctr: '2.1%', budget: '10%' },
      ].map((c, i) => (
        <div key={i} className="rounded-xl border border-[#DCEBFF] bg-white p-2.5 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
              <span className="text-[9px] font-bold text-[#102A56]">{c.name}</span>
            </div>
            <span className="text-[8px] font-bold text-[#0066FF]">CTR {c.ctr}</span>
          </div>
          <div className="h-1.5 rounded-full bg-[#EAF4FF] overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: c.budget }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="h-full rounded-full bg-gradient-to-r from-[#0066FF] to-[#4D9CFF]" />
          </div>
        </div>
      ))}
    </div>
  )
}

function Gads4() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F5FAFF]">
      {/* Real ads work photo with 3D float */}
      <motion.div
        initial={{ opacity: 0, rotateX: -6, y: 12 }}
        animate={{ opacity: 1, rotateX: -2, y: 0 }}
        transition={{ duration: 0.75, ease: EASE }}
        className="absolute inset-3 rounded-2xl overflow-hidden border border-[#DCEBFF] shadow-[0_16px_40px_-8px_#0066FF22] float-slow"
        style={{ perspective: 700, transformStyle: 'preserve-3d' }}
      >
        <Image src="/images/work-ads.png" alt="Google Ads campaign" fill
          className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/50 to-transparent" />

        {/* Overlay metrics */}
        <div className="absolute bottom-3 left-3 right-3 grid grid-cols-3 gap-1.5">
          {[{ l: 'Quality Score', v: '9/10', c: '#22C55E' }, { l: 'Ad Rank', v: '#2', c: '#0066FF' }, { l: 'Imp. Share', v: '68%', c: '#1683FF' }].map(m => (
            <div key={m.l} className="rounded-lg bg-white/90 backdrop-blur-sm p-1.5">
              <div className="text-[7px] text-[#64748B]">{m.l}</div>
              <div className="text-[11px] font-extrabold" style={{ color: m.c }}>{m.v}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export function GoogleAdsVisual() {
  return <CycleVisual frames={[<Gads1 key="ga1" />, <Gads2 key="ga2" />, <Gads3 key="ga3" />, <Gads4 key="ga4" />]} interval={3200} />
}

/* ══════════════════════════════════════════════════════════
   09 — META ADS
══════════════════════════════════════════════════════════ */

function Meta1() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#F5FAFF] p-4 gap-4 overflow-hidden">
      {/* Real social ads photo as background */}
      <Image src="/images/work-social.png" alt="Meta ads" fill
        className="object-cover opacity-12" sizes="(max-width: 768px) 100vw, 50vw" />

      {/* Instagram phone mockup */}
      <motion.div
        initial={{ opacity: 0, y: 16, rotateY: -8 }}
        animate={{ opacity: 1, y: 0, rotateY: -4 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="w-32 h-56 rounded-[1.75rem] border-2 border-[#DCEBFF] bg-white overflow-hidden flex flex-col shadow-[0_16px_40px_-8px_#0066FF20] float"
        style={{ perspective: 600 }}
      >
        <div className="h-6 bg-[#F5FAFF] border-b border-[#DCEBFF] flex items-center justify-between px-2 shrink-0">
          <div className="text-[8px] font-bold text-[#102A56]">Instagram</div>
          <div className="flex gap-1">{[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-[#DCEBFF]" />)}</div>
        </div>
        <div className="flex gap-1.5 p-1.5 border-b border-[#DCEBFF]">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`w-6 h-6 rounded-full ${i === 0 ? 'ring-2 ring-[#E040FB]' : 'ring-1 ring-[#DCEBFF]'} overflow-hidden relative`}>
              <Image src="/images/work-social.png" alt="story" fill className="object-cover" sizes="30px" />
            </div>
          ))}
        </div>
        {/* Ad post with real photo */}
        <div className="flex items-center gap-1.5 p-1.5">
          <div className="w-4 h-4 rounded-full overflow-hidden relative">
            <Image src="/images/work-branding.png" alt="avatar" fill className="object-cover" sizes="20px" />
          </div>
          <div className="flex-1">
            <Sk w="w-10" h="h-1" />
          </div>
          <div className="text-[7px] text-[#0066FF] font-bold">Sponsored</div>
        </div>
        <div className="flex-1 relative overflow-hidden">
          <Image src="/images/work-ads.png" alt="Ad creative" fill className="object-cover" sizes="130px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0066FF]/20 to-transparent" />
        </div>
        <div className="flex items-center gap-2 p-1.5 border-t border-[#DCEBFF]">
          {['♥', '💬', '↗'].map(v => <span key={v} className="text-[10px]">{v}</span>)}
          <div className="ml-auto h-4 px-2 rounded-lg bg-[#0066FF] text-[7px] text-white flex items-center font-bold">Shop</div>
        </div>
      </motion.div>

      {/* Insights panel */}
      <div className="flex flex-col gap-2">
        {[{ l: 'Reach', v: '45.2k', c: '#E040FB' }, { l: 'Clicks', v: '3,840', c: '#0066FF' }, { l: 'CPL', v: '$1.80', c: '#1683FF' }].map(m => (
          <div key={m.l} className="rounded-xl border border-[#DCEBFF] bg-white/90 backdrop-blur-sm p-2">
            <div className="text-[8px] text-[#64748B]">{m.l}</div>
            <div className="text-sm font-extrabold" style={{ color: m.c }}>{m.v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Meta2() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F5FAFF]">
      {/* Real ads photo background */}
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.85, ease: EASE }}
        className="absolute inset-0"
        style={{ perspective: 1000 }}
      >
        <motion.div
          animate={{ scale: [1, 1.025, 1] }}
          transition={{ repeat: Infinity, duration: 11, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image src="/images/work-ads.png" alt="Meta Ads" fill
            className="object-cover opacity-45" sizes="(max-width: 768px) 100vw, 50vw" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/75 via-white/45 to-transparent" />
      </motion.div>

      {/* FB post + stats */}
      <div className="absolute inset-3 flex flex-col gap-2.5">
        <div className="flex-1 rounded-2xl border border-[#DCEBFF] bg-white/90 backdrop-blur-sm overflow-hidden flex flex-col shadow-sm">
          <div className="flex items-center gap-2 p-2.5 border-b border-[#DCEBFF]">
            <div className="w-6 h-6 rounded-full overflow-hidden relative">
              <Image src="/images/work-branding.png" alt="profile" fill className="object-cover" sizes="25px" />
            </div>
            <div className="flex-1 flex flex-col gap-0.5">
              <Sk w="w-16" h="h-1.5" />
              <div className="flex items-center gap-1">
                <Sk w="w-8" h="h-1" dim />
                <div className="h-2.5 px-1 rounded bg-[#1877F2]/10 text-[7px] text-[#1877F2] font-bold flex items-center">Sponsored</div>
              </div>
            </div>
          </div>
          <div className="flex-1 relative overflow-hidden">
            <Image src="/images/work-social.png" alt="Facebook ad" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <div className="bg-[#F5FAFF] border-t border-[#DCEBFF] p-2 flex items-center justify-between">
            <div className="flex flex-col gap-1"><Sk w="w-24" h="h-1.5" /><Sk w="w-16" h="h-1" dim /></div>
            <div className="h-6 px-2.5 rounded-lg bg-[#0066FF] text-[8px] text-white font-bold flex items-center">Learn More</div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[{ l: 'Imp.', v: '124k', c: '#0066FF' }, { l: 'CPL', v: '$2.1', c: '#1683FF' }, { l: 'ROAS', v: '5.8×', c: '#4D9CFF' }, { l: 'Conv.', v: '7.3%', c: '#102A56' }].map(m => (
            <div key={m.l} className="rounded-xl border border-[#DCEBFF] bg-white p-1.5">
              <div className="text-[7px] text-[#64748B]">{m.l}</div>
              <div className="text-[10px] font-extrabold" style={{ color: m.c }}>{m.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Meta3() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-3 p-3 bg-[#F5FAFF] overflow-hidden">
      {/* Story with real photo */}
      <div className="w-24 flex flex-col items-center gap-1.5">
        <div className="w-24 h-40 rounded-2xl overflow-hidden relative shadow-blue"
          style={{
            border: '2px solid transparent',
            background: 'linear-gradient(#F5FAFF,#F5FAFF) padding-box, linear-gradient(135deg,#E040FB,#FF7043,#FBBC05) border-box'
          }}>
          <Image src="/images/work-social.png" alt="Instagram story ad" fill className="object-cover" sizes="100px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/50 to-transparent" />
          {/* Progress bar */}
          <div className="absolute top-2 left-2 right-2 h-0.5 rounded-full bg-white/30">
            <motion.div initial={{ width: '0%' }} animate={{ width: '65%' }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="h-full rounded-full bg-white" />
          </div>
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center">
            <div className="h-5 px-2 rounded-full bg-white/80 text-[7px] font-bold text-[#0066FF] flex items-center">Shop Now</div>
          </div>
        </div>
        <div className="text-[8px] font-semibold text-[#64748B]">Story Ad</div>
      </div>

      {/* Reels with real photo */}
      <div className="w-24 flex flex-col items-center gap-1.5">
        <div className="w-24 h-40 rounded-2xl overflow-hidden border border-[#DCEBFF] relative shadow-blue flex flex-col">
          <Image src="/images/work-ads.png" alt="Reels ad" fill className="object-cover" sizes="100px" />
          <div className="absolute inset-0 bg-[#071A3D]/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-white/50 flex items-center justify-center backdrop-blur-sm">
              <div className="w-0 h-0 ml-0.5" style={{ borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '8px solid rgba(255,255,255,0.8)' }} />
            </div>
          </div>
          <div className="absolute bottom-2 left-2 right-2">
            <div className="h-3 px-1.5 rounded-full border border-white/20 text-[7px] text-white/60 flex items-center w-fit">Sponsored</div>
          </div>
        </div>
        <div className="text-[8px] font-semibold text-[#64748B]">Reels Ad</div>
      </div>

      <StatBadge value="7.3%" label="Conv. Rate" delay={0.4} className="absolute top-3 right-3" />
    </div>
  )
}

function Meta4() {
  return (
    <div className="absolute inset-0 p-3 bg-white flex flex-col gap-2.5 overflow-hidden">
      <Image src="/images/work-ads.png" alt="Meta ads manager" fill
        className="object-cover opacity-8" sizes="(max-width: 768px) 100vw, 50vw" />
      <div className="flex items-center gap-2 relative">
        <div className="w-5 h-5 rounded-md bg-[#0066FF]" />
        <Sk w="w-24" h="h-2" />
        <div className="ml-auto h-5 px-2 rounded-lg bg-[#0066FF] text-[8px] text-white flex items-center font-bold">+ Create</div>
      </div>
      {[
        { name: 'Summer Sale', status: 'Active', budget: '$120/d', result: '248 conv.' },
        { name: 'Retargeting', status: 'Active', budget: '$60/d', result: '142 conv.' },
        { name: 'Awareness', status: 'Paused', budget: '$80/d', result: '840k imp.' },
      ].map((c, i) => (
        <div key={i} className="rounded-xl border border-[#DCEBFF] bg-white p-2.5 flex items-center gap-2.5 relative">
          <div className={`w-2 h-2 rounded-full shrink-0 ${c.status === 'Active' ? 'bg-[#22C55E]' : 'bg-[#FFA500]'}`} />
          <div className="flex-1 flex flex-col gap-0.5">
            <span className="text-[9px] font-bold text-[#102A56]">{c.name}</span>
            <span className="text-[8px] text-[#64748B]">{c.budget}</span>
          </div>
          <div className="text-right flex flex-col gap-0.5">
            <span className="text-[8px] font-bold text-[#0066FF]">{c.result}</span>
            <div className={`text-[7px] px-1.5 py-0.5 rounded-full ${c.status === 'Active' ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-[#FFA500]/10 text-[#FFA500]'}`}>{c.status}</div>
          </div>
        </div>
      ))}
      <div className="flex-1 rounded-xl border border-[#DCEBFF] bg-[#F5FAFF] p-2 relative overflow-hidden">
        <BarChart bars={[40, 55, 48, 70, 62, 80, 72, 88, 75, 84, 78, 90]} height="h-10" />
      </div>
    </div>
  )
}

export function MetaAdsVisual() {
  return <CycleVisual frames={[<Meta1 key="mt1" />, <Meta2 key="mt2" />, <Meta3 key="mt3" />, <Meta4 key="mt4" />]} interval={3100} />
}
