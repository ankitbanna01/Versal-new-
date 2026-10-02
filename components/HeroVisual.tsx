'use client'

import { motion } from 'framer-motion'
import {
  TrendingUp,
  Users,
  BarChart2,
  Zap,
  Target,
  Globe,
  MousePointerClick,
  ArrowUpRight,
  ArrowUp,
} from 'lucide-react'

/* ─── typed ease ─── */
const E: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ══════════════════════════════════════════════════
   SPARKLINE  (inline SVG, no external asset)
══════════════════════════════════════════════════ */
function Sparkline({ color = '#0066FF', h = 28, w = 80, id = 'default' }: { color?: string; h?: number; w?: number; id?: string }) {
  const pts = '0,22 10,18 20,20 32,12 44,16 56,8 68,10 80,5'
  const gradId = `sg-${id}`
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={pts}
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <polygon
        points={`${pts} ${w},${h} 0,${h}`}
        fill={`url(#${gradId})`}
      />
    </svg>
  )
}

/* ══════════════════════════════════════════════════
   BAR CHART  (7 bars, last one highlighted)
══════════════════════════════════════════════════ */
function BarChart() {
  const bars = [38, 55, 42, 70, 52, 80, 66]
  const maxH = 36
  return (
    <svg width="76" height={maxH} viewBox={`0 ${0} 76 ${maxH}`} fill="none" aria-hidden="true">
      {bars.map((pct, i) => {
        const barH = (pct / 100) * maxH
        return (
          <rect
            key={i}
            x={i * 12}
            y={maxH - barH}
            width="8"
            height={barH}
            rx="2"
            fill={i === bars.length - 1 ? '#0066FF' : '#DCEBFF'}
          />
        )
      })}
    </svg>
  )
}

/* ══════════════════════════════════════════════════
   DONUT CHART  (pure SVG)
══════════════════════════════════════════════════ */
function DonutChart() {
  const r = 28
  const cx = 36
  const cy = 36
  const circumference = 2 * Math.PI * r
  const segments = [
    { pct: 0.45, color: '#0066FF' },
    { pct: 0.28, color: '#4D9CFF' },
    { pct: 0.17, color: '#DCEBFF' },
    { pct: 0.10, color: '#EAF4FF' },
  ]
  let offset = 0
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
      {segments.map(({ pct, color }, i) => {
        const dash = circumference * pct
        const gap = circumference - dash
        const rotate = offset * 360 - 90
        offset += pct
        return (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={`${dash} ${gap}`}
            strokeLinecap="round"
            style={{ transform: `rotate(${rotate}deg)`, transformOrigin: `${cx}px ${cy}px` }}
          />
        )
      })}
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="11" fontWeight="800" fill="#102A56">45%</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="7" fill="#64748B">SEO</text>
    </svg>
  )
}

/* ══════════════════════════════════════════════════
   AREA CHART  (big growth chart inside dashboard)
══════════════════════════════════════════════════ */
function AreaChart() {
  const w = 300
  const h = 80
  // 12 month data points (relative)
  const raw = [30, 38, 35, 50, 45, 62, 58, 75, 70, 82, 78, 95]
  const maxV = Math.max(...raw)
  const pts = raw.map((v, i) => {
    const x = (i / (raw.length - 1)) * w
    const y = h - (v / maxV) * h * 0.88 - 4
    return `${x},${y}`
  })
  const polyLine = pts.join(' ')
  const polyFill = `0,${h} ${polyLine} ${w},${h}`

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0066FF" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0066FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map((t) => (
        <line key={t} x1="0" y1={h * t} x2={w} y2={h * t} stroke="#EAF4FF" strokeWidth="1" />
      ))}
      {/* Fill */}
      <polygon points={polyFill} fill="url(#areaGrad)" />
      {/* Line */}
      <polyline
        points={polyLine}
        stroke="#0066FF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* End dot */}
      {(() => {
        const last = pts[pts.length - 1].split(',')
        return (
          <>
            <circle cx={last[0]} cy={last[1]} r="4" fill="#0066FF" />
            <circle cx={last[0]} cy={last[1]} r="7" fill="#0066FF" opacity="0.2" />
          </>
        )
      })()}
    </svg>
  )
}

/* ══════════════════════════════════════════════════
   METRIC CARD  (floating glass card)
══════════════════════════════════════════════════ */
interface MetricCardProps {
  icon: React.ReactNode
  label: string
  value: string
  delta?: string
  positive?: boolean
  chart?: React.ReactNode
  className?: string
  delay?: number
  floatY?: number
  floatDuration?: number
}

function MetricCard({
  icon, label, value, delta, positive = true,
  chart, className = '', delay = 0, floatY = -6, floatDuration = 5,
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay, ease: E }}
      className={`absolute glass rounded-2xl shadow-[0_8px_32px_0_#0066FF15] ${className}`}
    >
      <motion.div
        animate={{ y: [0, floatY, 0] }}
        transition={{ duration: floatDuration, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
        className="px-4 py-3"
      >
        <div className="flex items-center gap-2.5 mb-2">
          <div className="h-8 w-8 rounded-xl bg-[#EAF4FF] flex items-center justify-center shrink-0">
            {icon}
          </div>
          <div className="min-w-0">
            <div className="text-[10px] text-[#64748B] font-medium leading-none mb-0.5">{label}</div>
            <div className="text-base font-extrabold text-[#102A56] leading-none">{value}</div>
          </div>
          {delta && (
            <span
              className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                positive ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-red-50 text-red-500'
              }`}
            >
              {positive ? '▲' : '▼'} {delta}
            </span>
          )}
        </div>
        {chart}
      </motion.div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════
   SOCIAL PILL  (compact social icon pill)
══════════════════════════════════════════════════ */
function SocialPills({ delay = 0, style = {} }: { delay?: number; style?: React.CSSProperties }) {
  const platforms = [
    { label: 'IG',  bg: 'bg-pink-50',   text: 'text-pink-500',   ring: 'border-pink-100'  },
    { label: 'FB',  bg: 'bg-blue-50',   text: 'text-blue-600',   ring: 'border-blue-100'  },
    { label: 'LI',  bg: 'bg-sky-50',    text: 'text-sky-600',    ring: 'border-sky-100'   },
    { label: 'YT',  bg: 'bg-red-50',    text: 'text-red-500',    ring: 'border-red-100'   },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: E }}
      className="absolute glass rounded-2xl shadow-[0_4px_20px_0_#0066FF12]"
      style={style}
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop', delay: 0.5 }}
        className="px-3.5 py-3"
      >
        <div className="text-[9px] font-semibold text-[#64748B] mb-2 uppercase tracking-wide">Social Reach</div>
        <div className="flex items-center gap-1.5">
          {platforms.map(({ label, bg, text, ring }) => (
            <div
              key={label}
              className={`h-7 w-7 rounded-lg border ${bg} ${ring} flex items-center justify-center`}
            >
              <span className={`text-[9px] font-extrabold ${text}`}>{label}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-1">
          <ArrowUp size={10} className="text-[#22C55E]" />
          <span className="text-[10px] font-bold text-[#22C55E]">2.1M impressions</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════
   DECORATIVE RINGS  (SVG orbital rings)
══════════════════════════════════════════════════ */
function OrbitalRings({ mouseX = 0, mouseY = 0 }: { mouseX: number; mouseY: number }) {
  return (
    <>
      {/* Outer dashed ellipse */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ x: mouseX * -4, y: mouseY * -3 }}
      >
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.10]"
          width="560" height="560" viewBox="0 0 560 560" fill="none"
        >
          <ellipse cx="280" cy="280" rx="258" ry="150"
            stroke="#0066FF" strokeWidth="1.5" strokeDasharray="7 5" />
        </svg>
      </motion.div>

      {/* Inner solid circle */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ x: mouseX * 3, y: mouseY * 2 }}
      >
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
          width="460" height="460" viewBox="0 0 460 460" fill="none"
        >
          <circle cx="230" cy="230" r="215" stroke="#0066FF" strokeWidth="1" />
        </svg>
      </motion.div>
    </>
  )
}

/* ══════════════════════════════════════════════════
   3D SPHERES
══════════════════════════════════════════════════ */
function Spheres({ mouseX = 0, mouseY = 0 }: { mouseX: number; mouseY: number }) {
  return (
    <>
      {/* Large sphere — top-right */}
      <motion.div
        className="absolute -top-8 right-0 w-[72px] h-[72px] rounded-full z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 35% 30%, #6DB8FF, #0066FF 55%, #071A3D)',
          boxShadow: '0 12px 40px 0 #0066FF35, inset 0 -6px 16px 0 #071A3D25',
          x: mouseX * 8,
          y: mouseY * 5,
        }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
      />
      {/* Medium sphere — bottom-left */}
      <motion.div
        className="absolute -bottom-6 left-2 w-[44px] h-[44px] rounded-full z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 35% 30%, #A3CFFF, #1683FF 50%, #0055CC)',
          boxShadow: '0 6px 20px 0 #0066FF25',
          x: mouseX * -6,
          y: mouseY * -4,
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 7.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop', delay: 1 }}
      />
      {/* Small accent sphere */}
      <motion.div
        className="absolute top-[45%] -left-4 w-5 h-5 rounded-full z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 40% 35%, #C5DEFF, #4D9CFF)',
          boxShadow: '0 2px 8px 0 #0066FF20',
          x: mouseX * -5,
          y: mouseY * 3,
        }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop', delay: 0.5 }}
      />
    </>
  )
}

/* ══════════════════════════════════════════════════
   PARTICLE DOTS
══════════════════════════════════════════════════ */
function Particles() {
  const dots = [
    { left: '5%',  top: '12%', s: 4, o: 0.30, d: 4.5, delay: 0    },
    { left: '90%', top: '8%',  s: 3, o: 0.22, d: 5.5, delay: 0.7  },
    { left: '82%', top: '78%', s: 5, o: 0.25, d: 4.2, delay: 1.4  },
    { left: '12%', top: '82%', s: 3, o: 0.18, d: 6.0, delay: 0.3  },
    { left: '48%', top: '3%',  s: 4, o: 0.22, d: 5.0, delay: 2.0  },
    { left: '95%', top: '48%', s: 3, o: 0.18, d: 4.8, delay: 1.0  },
  ]
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {dots.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#0066FF]"
          style={{ left: p.left, top: p.top, width: p.s, height: p.s, opacity: p.o }}
          animate={{ y: [0, -16, 0], opacity: [p.o, p.o * 0.35, p.o] }}
          transition={{ duration: p.d, delay: p.delay, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
        />
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════
   MAIN DASHBOARD PANEL  (the central visual)
══════════════════════════════════════════════════ */
function DashboardPanel({ mouseX = 0, mouseY = 0 }: { mouseX: number; mouseY: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.35, ease: E }}
      className="relative z-10 w-full rounded-3xl bg-white border border-[#DCEBFF] overflow-hidden"
      style={{
        boxShadow: '0 32px 80px -12px #0066FF1A, 0 8px 32px -4px #0066FF0F',
        x: mouseX * 3,
        y: mouseY * 2,
      }}
    >
      {/* ─ Top bar ─ */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#F5FAFF] border-b border-[#DCEBFF]">
        <div className="flex items-center gap-2.5">
          <div className="h-6 w-6 rounded-lg bg-[#0066FF] flex items-center justify-center">
            <Zap size={12} className="text-white fill-white" />
          </div>
          <span className="text-xs font-bold text-[#102A56]">Marketing Dashboard</span>
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#64748B] bg-white border border-[#DCEBFF] rounded-full px-2 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] inline-block" />
            Live
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {['bg-[#EAF4FF]', 'bg-[#DCEBFF]', 'bg-[#0066FF]'].map((c, i) => (
            <div key={i} className={`h-2.5 w-2.5 rounded-full ${c}`} />
          ))}
        </div>
      </div>

      {/* ─ KPI row ─ */}
      <div className="grid grid-cols-3 divide-x divide-[#EAF4FF] border-b border-[#DCEBFF]">
        {[
          { label: 'Total Reach',  val: '2.4M',   delta: '+18%', green: true  },
          { label: 'Conversions', val: '8,340',   delta: '+24%', green: true  },
          { label: 'ROAS',        val: '4.8×',    delta: '+0.6', green: true  },
        ].map(({ label, val, delta, green }) => (
          <div key={label} className="px-4 py-3">
            <div className="text-[9px] text-[#64748B] font-medium mb-1">{label}</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-[#102A56]">{val}</span>
              <span className={`text-[10px] font-bold ${green ? 'text-[#22C55E]' : 'text-red-500'}`}>
                {green ? '▲' : '▼'} {delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ─ Area chart ─ */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-[10px] text-[#64748B] font-medium">Revenue Growth</div>
            <div className="text-sm font-extrabold text-[#102A56]">$142,800 <span className="text-[10px] text-[#22C55E] font-bold">▲ 32.4%</span></div>
          </div>
          <div className="flex items-center gap-1">
            {['3M', '6M', '1Y'].map((t, i) => (
              <button
                key={t}
                className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${
                  i === 2
                    ? 'bg-[#0066FF] text-white'
                    : 'text-[#64748B] hover:bg-[#EAF4FF]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <AreaChart />
        {/* Month labels */}
        <div className="flex justify-between mt-1 px-0.5">
          {['J','F','M','A','M','J','J','A','S','O','N','D'].map((m, idx) => (
            <span key={idx} className="text-[8px] text-[#64748B]">{m}</span>
          ))}
        </div>
      </div>

      {/* ─ Bottom row ─ */}
      <div className="grid grid-cols-2 divide-x divide-[#EAF4FF] border-t border-[#DCEBFF]">
        {/* Channel mix */}
        <div className="px-4 py-3 flex items-center gap-3">
          <DonutChart />
          <div className="flex flex-col gap-1">
            {[
              { label: 'SEO',    pct: '45%', color: '#0066FF' },
              { label: 'Paid',   pct: '28%', color: '#4D9CFF' },
              { label: 'Social', pct: '17%', color: '#DCEBFF' },
            ].map(({ label, pct, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
                <span className="text-[9px] text-[#64748B]">{label}</span>
                <span className="text-[9px] font-bold text-[#102A56] ml-auto">{pct}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Weekly traffic */}
        <div className="px-4 py-3">
          <div className="text-[9px] text-[#64748B] font-medium mb-1.5">Weekly Traffic</div>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-sm font-extrabold text-[#102A56]">+24.5%</span>
            <ArrowUpRight size={12} className="text-[#22C55E]" />
          </div>
          <Sparkline id="growth-card" />
        </div>
      </div>

      {/* ─ Active campaigns strip ─ */}
      <div className="px-5 py-3 bg-[#F5FAFF] border-t border-[#DCEBFF] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target size={12} className="text-[#0066FF]" />
          <span className="text-[10px] font-semibold text-[#102A56]">Active Campaigns</span>
        </div>
        <div className="flex items-center gap-3">
          {[
            { name: 'Google Ads', val: '2.1K clicks' },
            { name: 'Meta',       val: '18K reach'   },
          ].map(({ name, val }) => (
            <div key={name} className="flex items-center gap-1.5 bg-white border border-[#DCEBFF] rounded-full px-2.5 py-1">
              <div className="h-1.5 w-1.5 rounded-full bg-[#0066FF]" />
              <span className="text-[9px] font-medium text-[#64748B]">{name}</span>
              <span className="text-[9px] font-bold text-[#0066FF]">{val}</span>
            </div>
          ))}
          <span className="text-[10px] font-bold text-[#0066FF]">48 total</span>
        </div>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════
   ROOT EXPORT
══════════════════════════════════════════════════ */
export function HeroVisual({ mouseX = 0, mouseY = 0 }: { mouseX?: number; mouseY?: number }) {
  return (
    <div
      className="relative w-full select-none"
      style={{ minHeight: 520 }}
    >
      {/* Background glow blob */}
      <div
        aria-hidden="true"
        className="absolute -inset-12 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 55% 45%, #EAF4FF 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      {/* Orbital rings */}
      <OrbitalRings mouseX={mouseX} mouseY={mouseY} />

      {/* 3D Spheres */}
      <Spheres mouseX={mouseX} mouseY={mouseY} />

      {/* Particles */}
      <Particles />

      {/* ─── MAIN DASHBOARD ─── */}
      <div className="relative z-10 pt-8 pr-16 pb-10 pl-2">
        <DashboardPanel mouseX={mouseX} mouseY={mouseY} />
      </div>

      {/* ─── FLOATING CARD 1 — Growth Rate (top-left) ─── */}
      <MetricCard
        icon={<TrendingUp size={15} className="text-[#0066FF]" />}
        label="Growth Rate"
        value="+230%"
        chart={<Sparkline id="growth-metric" />}
        className="top-0 left-0 z-20 min-w-[156px]"
        delay={0.85}
        floatY={-7}
        floatDuration={5}
      />

      {/* ─── FLOATING CARD 2 — Active Users (top-right) ─── */}
      <MetricCard
        icon={<Users size={15} className="text-[#0066FF]" />}
        label="Active Users"
        value="24.8K"
        delta="12%"
        positive
        className="top-4 right-0 z-20 min-w-[148px]"
        delay={1.0}
        floatY={-9}
        floatDuration={6}
      />

      {/* ─── FLOATING CARD 3 — ROI (bottom-right) ─── */}
      <MetricCard
        icon={<BarChart2 size={15} className="text-[#0066FF]" />}
        label="Campaign ROI"
        value="$4.80"
        delta="0.6× MoM"
        positive
        chart={<BarChart />}
        className="bottom-0 right-0 z-20 min-w-[160px]"
        delay={1.15}
        floatY={8}
        floatDuration={6.5}
      />

      {/* ─── SOCIAL PILL CARD (bottom-left) ─── */}
      <SocialPills
        delay={1.3}
        style={{ bottom: 12, left: 0, zIndex: 20 }}
      />

      {/* ─── MINI WEBSITE CLICKS CARD (mid-left) ─── */}
      <MetricCard
        icon={<MousePointerClick size={15} className="text-[#0066FF]" />}
        label="Click Rate"
        value="6.8%"
        delta="1.2%"
        positive
        className="top-[44%] -left-2 z-20 min-w-[136px]"
        delay={1.05}
        floatY={-5}
        floatDuration={4.5}
      />
    </div>
  )
}
