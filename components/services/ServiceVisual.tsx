'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ─────────────────────────────────────────────
   Generic wrapper — cycles through N frames
───────────────────────────────────────────── */
function CycleVisual({
  frames,
  interval = 3000,
}: {
  frames: React.ReactNode[]
  interval?: number
}) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(
      () => setIdx(p => (p + 1) % frames.length),
      interval,
    )
    return () => clearInterval(id)
  }, [frames.length, interval])

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="absolute inset-0"
        >
          {frames[idx]}
        </motion.div>
      </AnimatePresence>

      {/* progress dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {frames.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-400 ${
              i === idx ? 'w-4 bg-[#0066FF]' : 'w-1.5 bg-[#0066FF]/25'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Shared primitives
───────────────────────────────────────────── */
function SkeletonLine({ w = 'w-full', h = 'h-2', dim = false }: { w?: string; h?: string; dim?: boolean }) {
  return <div className={`${w} ${h} rounded-full ${dim ? 'bg-[#EAF4FF]' : 'bg-[#DCEBFF]'}`} />
}

function BrowserShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full rounded-xl border border-[#DCEBFF] bg-white overflow-hidden flex flex-col shadow-blue">
      <div className="flex items-center gap-1.5 px-3 py-2.5 bg-[#F5FAFF] border-b border-[#DCEBFF] shrink-0">
        <span className="h-2 w-2 rounded-full bg-[#FCA5A5]" />
        <span className="h-2 w-2 rounded-full bg-[#FDE68A]" />
        <span className="h-2 w-2 rounded-full bg-[#6EE7B7]" />
        <div className="flex-1 ml-2 h-1.5 rounded-full bg-[#DCEBFF]" />
      </div>
      <div className="flex-1 overflow-hidden p-3">{children}</div>
    </div>
  )
}

function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-28 h-52 rounded-2xl border-2 border-[#DCEBFF] bg-white overflow-hidden flex flex-col shadow-blue">
      <div className="h-4 bg-[#F5FAFF] border-b border-[#DCEBFF] flex items-center justify-center">
        <div className="w-8 h-1 rounded-full bg-[#DCEBFF]" />
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   01 — Website Design & Development
───────────────────────────────────────────── */
function WebFrame1() {
  return (
    <BrowserShell>
      <div className="flex flex-col gap-2 h-full">
        <div className="flex gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#EAF4FF] shrink-0 flex items-center justify-center">
            <div className="w-5 h-5 rounded-md bg-[#0066FF]/30" />
          </div>
          <div className="flex flex-col gap-1.5 flex-1 pt-1">
            <SkeletonLine w="w-2/3" />
            <SkeletonLine w="w-1/3" dim />
          </div>
        </div>
        <div className="flex-1 rounded-lg bg-gradient-to-br from-[#EAF4FF] to-[#F5FAFF] flex items-center justify-center">
          <div className="text-center">
            <div className="w-10 h-1.5 rounded-full bg-[#0066FF]/30 mx-auto mb-1.5" />
            <div className="w-16 h-1 rounded-full bg-[#DCEBFF] mx-auto" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[0.9, 0.6, 0.75].map((o, i) => (
            <div key={i} className="h-7 rounded-md bg-[#EAF4FF]" style={{ opacity: o }} />
          ))}
        </div>
      </div>
    </BrowserShell>
  )
}

function WebFrame2() {
  return (
    <BrowserShell>
      <div className="flex h-full gap-2">
        <div className="w-20 flex flex-col gap-1.5 border-r border-[#DCEBFF] pr-2">
          {['Home', 'About', 'Services', 'Contact'].map((_, i) => (
            <div
              key={i}
              className={`h-5 rounded-md ${i === 0 ? 'bg-[#0066FF]/20' : 'bg-[#EAF4FF]'}`}
            />
          ))}
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-16 rounded-lg bg-gradient-to-br from-[#0066FF]/10 to-[#EAF4FF]" />
          <SkeletonLine w="w-4/5" />
          <SkeletonLine w="w-2/3" dim />
          <div className="h-5 w-16 rounded-md bg-[#0066FF]/20 mt-1" />
        </div>
      </div>
    </BrowserShell>
  )
}

function WebFrame3() {
  return (
    <BrowserShell>
      <div className="flex flex-col gap-2 h-full">
        <div className="grid grid-cols-2 gap-2 flex-1">
          {[1,2,3,4].map(i => (
            <div key={i} className="rounded-lg bg-[#EAF4FF] flex items-center justify-center">
              <div className="w-6 h-6 rounded-md bg-[#0066FF]/20" />
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <SkeletonLine w="flex-1" h="h-6" />
          <div className="h-6 w-12 rounded-md bg-[#0066FF]/30 shrink-0" />
        </div>
      </div>
    </BrowserShell>
  )
}

export function WebVisual() {
  return <CycleVisual frames={[<WebFrame1 />, <WebFrame2 />, <WebFrame3 />]} interval={3200} />
}

/* ─────────────────────────────────────────────
   02 — Software Development
───────────────────────────────────────────── */
function SoftwareFrame1() {
  return (
    <div className="w-full h-full rounded-xl border border-[#DCEBFF] bg-[#071A3D] overflow-hidden flex flex-col p-3 gap-2">
      <div className="flex items-center gap-1.5 mb-1">
        {['#4D9CFF','#1683FF','#0066FF'].map((c,i)=>(
          <div key={i} className="h-4 rounded px-2 text-[8px] font-mono flex items-center" style={{ background: `${c}22`, color: c }}>
            {['function','const','return'][i]}
          </div>
        ))}
      </div>
      {['w-4/5','w-3/5','w-2/3','w-1/2','w-3/4','w-2/5'].map((w, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-3 text-[8px] font-mono text-[#4D9CFF]/40 shrink-0">{i+1}</div>
          <div
            className={`${w} h-1.5 rounded-full`}
            style={{ background: ['#4D9CFF','#1683FF','#0066FF','#4D9CFF','#1683FF','#0066FF'][i] + '50' }}
          />
        </div>
      ))}
    </div>
  )
}

function SoftwareFrame2() {
  return (
    <BrowserShell>
      <div className="flex flex-col gap-2 h-full">
        <div className="flex gap-2">
          {['Dashboard','Analytics','Settings'].map((_, i) => (
            <div
              key={i}
              className={`h-5 px-2 rounded-md text-[8px] flex items-center ${
                i===0 ? 'bg-[#0066FF]/20 text-[#0066FF]' : 'bg-[#EAF4FF] text-[#64748B]'
              }`}
            >
              {['DB','An','Se'][i]}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {['+48%','1.2k','99%'].map((v,i) => (
            <div key={i} className="rounded-lg bg-[#EAF4FF] p-2">
              <div className="text-[10px] font-bold text-[#0066FF]">{v}</div>
              <div className="w-full h-1 rounded-full bg-[#DCEBFF] mt-1" />
            </div>
          ))}
        </div>
        <div className="flex-1 rounded-lg bg-[#F5FAFF] flex items-end px-2 pb-2 gap-1">
          {[40,65,50,80,60,90,75].map((h,i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-[#0066FF] to-[#4D9CFF]"
              style={{ height: `${h}%`, opacity: 0.6 + i * 0.04 }}
            />
          ))}
        </div>
      </div>
    </BrowserShell>
  )
}

function SoftwareFrame3() {
  return (
    <div className="w-full h-full rounded-xl border border-[#DCEBFF] bg-white overflow-hidden p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between mb-1">
        <SkeletonLine w="w-24" h="h-2" />
        <div className="h-5 w-10 rounded-md bg-[#0066FF]/20" />
      </div>
      {[1,2,3].map(i => (
        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-[#F5FAFF]">
          <div className="h-6 w-6 rounded-full bg-[#EAF4FF] shrink-0" />
          <div className="flex-1 flex flex-col gap-1">
            <SkeletonLine w="w-2/3" h="h-1.5" />
            <SkeletonLine w="w-1/2" h="h-1" dim />
          </div>
          <div className="h-4 w-8 rounded-full bg-[#0066FF]/15" />
        </div>
      ))}
    </div>
  )
}

export function SoftwareVisual() {
  return <CycleVisual frames={[<SoftwareFrame1 />, <SoftwareFrame2 />, <SoftwareFrame3 />]} interval={3000} />
}

/* ─────────────────────────────────────────────
   03 — Graphic Design
───────────────────────────────────────────── */
function GraphicFrame1() {
  return (
    <div className="w-full h-full grid grid-cols-2 gap-3 p-1">
      {[
        'from-[#0066FF]/20 to-[#EAF4FF]',
        'from-[#EAF4FF] to-[#DCEBFF]',
        'from-[#1683FF]/15 to-[#F5FAFF]',
        'from-[#DCEBFF] to-[#EAF4FF]',
      ].map((g, i) => (
        <div
          key={i}
          className={`rounded-xl bg-gradient-to-br ${g} flex items-center justify-center border border-[#DCEBFF]`}
        >
          <div className="text-center">
            <div className="w-8 h-8 rounded-lg bg-white/60 mx-auto mb-1.5 flex items-center justify-center shadow-sm">
              <div className="w-4 h-4 rounded-md bg-[#0066FF]/25" />
            </div>
            <div className="h-1.5 w-8 rounded-full bg-[#0066FF]/20 mx-auto" />
          </div>
        </div>
      ))}
    </div>
  )
}

function GraphicFrame2() {
  return (
    <div className="w-full h-full flex gap-3 p-1">
      {['3/5','2/5'].map((_, i) => (
        <div
          key={i}
          className="flex-1 rounded-2xl border border-[#DCEBFF] overflow-hidden"
          style={{ flex: i === 0 ? 3 : 2 }}
        >
          <div
            className={`w-full h-full flex items-center justify-center ${
              i===0
                ? 'bg-gradient-to-br from-[#0066FF]/10 via-[#EAF4FF] to-[#F5FAFF]'
                : 'bg-gradient-to-b from-[#EAF4FF] to-[#DCEBFF]'
            }`}
          >
            {i===0 ? (
              <div className="text-center px-4">
                <div className="w-10 h-10 rounded-full border-2 border-[#0066FF]/30 mx-auto mb-2" />
                <div className="h-1.5 w-12 rounded-full bg-[#0066FF]/25 mx-auto" />
              </div>
            ) : (
              <div className="flex flex-col gap-2 w-full px-3">
                {[1,2,3].map(j => (
                  <div key={j} className="h-2 rounded-full bg-white/60" />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function GraphicFrame3() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <PhoneShell>
        <div className="w-full h-full bg-gradient-to-b from-[#0066FF]/15 to-[#EAF4FF] flex flex-col p-2 gap-2">
          <div className="h-14 rounded-lg bg-white/70" />
          <div className="flex gap-1.5">
            {[1,2].map(i => (
              <div key={i} className="flex-1 h-6 rounded-md bg-white/60" />
            ))}
          </div>
          <div className="flex flex-col gap-1">
            <div className="h-1.5 rounded-full bg-[#0066FF]/20 w-4/5" />
            <div className="h-1.5 rounded-full bg-[#0066FF]/15 w-3/5" />
          </div>
        </div>
      </PhoneShell>
    </div>
  )
}

export function GraphicVisual() {
  return <CycleVisual frames={[<GraphicFrame1 />, <GraphicFrame2 />, <GraphicFrame3 />]} interval={3400} />
}

/* ─────────────────────────────────────────────
   04 — Digital Marketing
───────────────────────────────────────────── */
function MarketingFrame1() {
  return (
    <div className="w-full h-full p-2 flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'Reach', val: '48.2k', up: true },
          { label: 'Engagement', val: '12.4%', up: true },
        ].map(m => (
          <div key={m.label} className="rounded-xl border border-[#DCEBFF] bg-white p-2.5">
            <div className="text-[9px] text-[#64748B]">{m.label}</div>
            <div className="text-base font-extrabold text-[#102A56] leading-none mt-0.5">{m.val}</div>
            <div className="text-[9px] text-green-500 mt-1">↑ This month</div>
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-xl border border-[#DCEBFF] bg-white p-3 flex flex-col gap-2">
        <div className="flex items-end gap-1 h-14">
          {[30,50,40,65,55,80,70,90,78,85].map((h,i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm"
              style={{
                height: `${h}%`,
                background: `linear-gradient(to top, #0066FF, #4D9CFF)`,
                opacity: 0.5 + i * 0.05,
              }}
            />
          ))}
        </div>
        <div className="flex justify-between">
          {['Jan','Apr','Jul','Oct'].map(m => (
            <span key={m} className="text-[8px] text-[#64748B]">{m}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function MarketingFrame2() {
  return (
    <div className="w-full h-full p-2 flex flex-col gap-2">
      {['Instagram','Facebook','LinkedIn','Email'].map((ch, i) => (
        <div key={ch} className="flex items-center gap-2 rounded-xl border border-[#DCEBFF] bg-white p-2.5">
          <div
            className="w-6 h-6 rounded-lg shrink-0"
            style={{ background: ['#E040FB','#1877F2','#0A66C2','#0066FF'][i] + '25' }}
          />
          <div className="flex-1">
            <div className="flex justify-between text-[9px] mb-0.5">
              <span className="font-semibold text-[#102A56]">{ch}</span>
              <span className="text-[#0066FF]">{[72,58,45,89][i]}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#EAF4FF] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#0066FF]"
                style={{ width: `${[72,58,45,89][i]}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function MarketingFrame3() {
  return (
    <div className="w-full h-full rounded-xl border border-[#DCEBFF] bg-white p-3 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[#EAF4FF]" />
        <div className="flex flex-col gap-1">
          <SkeletonLine w="w-20" h="h-1.5" />
          <SkeletonLine w="w-12" h="h-1" dim />
        </div>
      </div>
      <div className="h-24 rounded-lg bg-gradient-to-br from-[#EAF4FF] to-[#F5FAFF]" />
      <div className="flex gap-4">
        {['♥ 2.4k','◆ 1.1k','↗ 820'].map(v => (
          <span key={v} className="text-[9px] text-[#64748B]">{v}</span>
        ))}
      </div>
    </div>
  )
}

export function MarketingVisual() {
  return <CycleVisual frames={[<MarketingFrame1 />, <MarketingFrame2 />, <MarketingFrame3 />]} interval={3100} />
}

/* ─────────────────────────────────────────────
   05 — Branding
───────────────────────────────────────────── */
function BrandingFrame1() {
  return (
    <div className="w-full h-full p-2 grid grid-cols-5 grid-rows-3 gap-2">
      {/* Logo card */}
      <div className="col-span-3 row-span-2 rounded-xl bg-[#0066FF] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full bg-white/20 mx-auto mb-2 flex items-center justify-center">
            <div className="w-5 h-5 rounded-md bg-white/60" />
          </div>
          <div className="h-2 w-16 rounded-full bg-white/40 mx-auto" />
        </div>
      </div>
      {/* Color swatches */}
      {['#0066FF','#1683FF','#4D9CFF','#102A56','#EAF4FF','#DCEBFF'].slice(0,2).map((c,i)=>(
        <div key={i} className="col-span-2 rounded-xl" style={{ background: c }} />
      ))}
      {['#0066FF','#1683FF','#4D9CFF','#102A56'].map((c,i)=>(
        <div key={i} className="rounded-lg" style={{ background: c, opacity: 0.7 + i*0.08 }} />
      ))}
      <div className="col-span-5 rounded-xl border border-[#DCEBFF] bg-white flex items-center gap-2 px-3">
        <SkeletonLine w="w-1/3" h="h-2" />
        <SkeletonLine w="w-1/4" h="h-2" dim />
      </div>
    </div>
  )
}

function BrandingFrame2() {
  return (
    <div className="w-full h-full flex flex-col gap-2 p-2">
      {/* Business card */}
      <div className="flex-1 rounded-xl border border-[#DCEBFF] bg-gradient-to-br from-[#0066FF]/5 to-[#EAF4FF] p-4 flex items-center justify-between">
        <div>
          <div className="h-2.5 w-16 rounded-full bg-[#0066FF]/40 mb-1.5" />
          <div className="h-1.5 w-20 rounded-full bg-[#102A56]/20 mb-1" />
          <div className="h-1 w-12 rounded-full bg-[#64748B]/20" />
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#0066FF]/15 flex items-center justify-center">
          <div className="w-5 h-5 rounded-md bg-[#0066FF]/30" />
        </div>
      </div>
      {/* Typography sample */}
      <div className="rounded-xl border border-[#DCEBFF] bg-white p-3 flex gap-3">
        {['Aa','Bb'].map(l => (
          <div key={l} className="flex flex-col items-center gap-1">
            <div className="text-xl font-extrabold text-[#102A56]/20">{l}</div>
            <div className="h-1 w-6 rounded-full bg-[#DCEBFF]" />
          </div>
        ))}
      </div>
    </div>
  )
}

function BrandingFrame3() {
  return (
    <div className="w-full h-full p-2 flex gap-2">
      {/* Packaging mockup */}
      <div className="w-1/2 rounded-xl bg-gradient-to-b from-[#EAF4FF] to-[#DCEBFF] flex items-end justify-center pb-3 border border-[#DCEBFF]">
        <div className="w-10 h-20 rounded-xl border-2 border-[#0066FF]/20 bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-4 h-4 rounded-md bg-[#0066FF]/20 mx-auto" />
            <div className="h-1 w-6 rounded-full bg-[#DCEBFF] mt-1" />
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        {['Brand Guide','Colour','Motion'].map((label,i) => (
          <div key={i} className="flex-1 rounded-xl border border-[#DCEBFF] bg-white flex items-center px-2 gap-1.5">
            <div className="h-3 w-3 rounded-sm" style={{ background: ['#0066FF','#1683FF','#4D9CFF'][i] + '50' }} />
            <div className="h-1.5 flex-1 rounded-full bg-[#EAF4FF]" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function BrandingVisual() {
  return <CycleVisual frames={[<BrandingFrame1 />, <BrandingFrame2 />, <BrandingFrame3 />]} interval={3300} />
}

/* ─────────────────────────────────────────────
   06 — Logo Design
───────────────────────────────────────────── */
function LogoFrame({ bg, variant }: { bg: string; variant: 'circle' | 'hex' | 'wordmark' }) {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: bg }}>
      {variant === 'circle' && (
        <div className="w-20 h-20 rounded-full border-4 border-[#0066FF]/40 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-[#0066FF]/30 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[#0066FF]" />
          </div>
        </div>
      )}
      {variant === 'hex' && (
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rotate-45 border-4 border-[#0066FF]/40 flex items-center justify-center">
            <div className="w-6 h-6 bg-[#0066FF]/30 rotate-0" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="h-2 w-20 rounded-full bg-[#0066FF]/30" />
            <div className="h-1 w-12 rounded-full bg-[#0066FF]/15" />
          </div>
        </div>
      )}
      {variant === 'wordmark' && (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-[#0066FF] flex items-center justify-center">
            <div className="text-white text-lg font-extrabold" style={{ fontFamily: 'sans-serif' }}>N</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="h-3 w-14 rounded-sm bg-[#102A56]/30" />
            <div className="h-1.5 w-10 rounded-sm bg-[#64748B]/20" />
          </div>
        </div>
      )}
    </div>
  )
}

export function LogoVisual() {
  return (
    <CycleVisual
      frames={[
        <LogoFrame bg="#F5FAFF" variant="circle" />,
        <LogoFrame bg="#EAF4FF" variant="hex" />,
        <LogoFrame bg="white" variant="wordmark" />,
      ]}
      interval={2800}
    />
  )
}

/* ─────────────────────────────────────────────
   07 — Photography
───────────────────────────────────────────── */
const photoGradients = [
  'from-[#071A3D] via-[#102A56] to-[#0066FF]/40',
  'from-[#0066FF]/20 via-[#EAF4FF] to-[#F5FAFF]',
  'from-[#EAF4FF] via-[#DCEBFF] to-[#0066FF]/10',
]

function PhotoFrame({ i }: { i: number }) {
  return (
    <div className={`w-full h-full rounded-xl bg-gradient-to-br ${photoGradients[i % photoGradients.length]} flex flex-col`}>
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-12 h-12 rounded-full border-2 border-white/30"
            style={{ boxShadow: '0 0 0 8px rgba(255,255,255,0.05)' }}
          />
          <div className="h-1.5 w-16 rounded-full bg-white/20" />
        </div>
      </div>
      <div className="p-3 flex gap-1.5 flex-wrap">
        {[...Array(4)].map((_,j) => (
          <div key={j} className="h-8 flex-1 rounded-md bg-white/10 min-w-[20%]" />
        ))}
      </div>
    </div>
  )
}

export function PhotoVisual() {
  return (
    <CycleVisual
      frames={[<PhotoFrame i={0} />, <PhotoFrame i={1} />, <PhotoFrame i={2} />]}
      interval={2900}
    />
  )
}

/* ─────────────────────────────────────────────
   08 — Google Ads
───────────────────────────────────────────── */
function GoogleAdsFrame1() {
  return (
    <div className="w-full h-full p-2 flex flex-col gap-2">
      {/* Search bar */}
      <div className="flex items-center gap-2 rounded-full border border-[#DCEBFF] bg-white px-3 py-2">
        <div className="w-3 h-3 rounded-full border-2 border-[#4285F4]/50" />
        <div className="flex-1 h-1.5 rounded-full bg-[#EAF4FF]" />
      </div>
      {/* Ad result */}
      {[0,1,2].map(i => (
        <div key={i} className={`rounded-xl border ${i===0 ? 'border-[#0066FF]/30 bg-[#EAF4FF]' : 'border-[#DCEBFF] bg-white'} p-2.5`}>
          {i===0 && (
            <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#0066FF]/10 mb-1">
              <span className="text-[8px] font-bold text-[#0066FF]">Ad</span>
            </div>
          )}
          <div className="h-1.5 w-3/4 rounded-full bg-[#0066FF]/30 mb-1" />
          <div className="h-1 w-full rounded-full bg-[#DCEBFF]" />
        </div>
      ))}
    </div>
  )
}

function GoogleAdsFrame2() {
  return (
    <div className="w-full h-full p-2 flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'CTR',     val: '4.8%',  c: '#0066FF' },
          { label: 'ROAS',    val: '6.2×',  c: '#1683FF' },
          { label: 'Clicks',  val: '3,240', c: '#4D9CFF' },
          { label: 'Conv.',   val: '182',   c: '#102A56' },
        ].map(m => (
          <div key={m.label} className="rounded-xl border border-[#DCEBFF] bg-white p-2.5">
            <div className="text-[9px] text-[#64748B]">{m.label}</div>
            <div className="font-extrabold text-sm mt-0.5" style={{ color: m.c }}>{m.val}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-xl border border-[#DCEBFF] bg-white p-2 flex items-end gap-1">
        {[55,40,70,60,85,65,90,75].map((h,i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-[#0066FF]/60"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  )
}

function GoogleAdsFrame3() {
  return (
    <div className="w-full h-full flex flex-col gap-2 p-2">
      <div className="flex-1 rounded-xl border border-[#DCEBFF] bg-white overflow-hidden">
        <div className="bg-[#0066FF] h-10 flex items-center px-3">
          <div className="flex gap-1.5">
            <div className="h-2 w-12 rounded-full bg-white/40" />
            <div className="h-2 w-8 rounded-full bg-white/25" />
          </div>
        </div>
        <div className="p-3 flex flex-col gap-2">
          <div className="h-2 w-3/4 rounded-full bg-[#DCEBFF]" />
          <div className="h-2 w-1/2 rounded-full bg-[#EAF4FF]" />
          <div className="h-6 w-16 rounded-lg bg-[#0066FF]/20 mt-1" />
        </div>
      </div>
      <div className="rounded-xl border border-[#0066FF]/20 bg-[#EAF4FF] p-2 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-[#0066FF]" />
        <div className="flex-1 h-1.5 rounded-full bg-[#0066FF]/20" />
        <div className="text-[9px] font-bold text-[#0066FF]">Sponsored</div>
      </div>
    </div>
  )
}

export function GoogleAdsVisual() {
  return <CycleVisual frames={[<GoogleAdsFrame1 />, <GoogleAdsFrame2 />, <GoogleAdsFrame3 />]} interval={3200} />
}

/* ─────────────────────────────────────────────
   09 — Meta Ads
───────────────────────────────────────────── */
function MetaFrame1() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#F5FAFF] rounded-xl">
      <PhoneShell>
        <div className="w-full h-full bg-white flex flex-col">
          {/* Feed post */}
          <div className="flex items-center gap-1.5 p-1.5 border-b border-[#DCEBFF]">
            <div className="w-4 h-4 rounded-full bg-[#EAF4FF]" />
            <div className="h-1.5 flex-1 rounded-full bg-[#EAF4FF]" />
          </div>
          <div className="flex-1 bg-gradient-to-b from-[#0066FF]/10 to-[#EAF4FF]" />
          <div className="p-1.5 flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <span className="text-[7px] font-bold px-1 bg-[#0066FF]/10 rounded text-[#0066FF]">Sponsored</span>
            </div>
            <div className="h-1 rounded-full bg-[#DCEBFF] w-4/5" />
            <div className="h-4 rounded-md bg-[#0066FF]/15 w-12 mt-0.5" />
          </div>
        </div>
      </PhoneShell>
    </div>
  )
}

function MetaFrame2() {
  return (
    <div className="w-full h-full p-2 flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'Impressions', val: '124k', color: '#0066FF' },
          { label: 'CPL',         val: '$2.40', color: '#1683FF' },
          { label: 'ROAS',        val: '5.8×',  color: '#4D9CFF' },
          { label: 'Conv. Rate',  val: '7.3%',  color: '#102A56' },
        ].map(m => (
          <div key={m.label} className="rounded-xl border border-[#DCEBFF] bg-white p-2">
            <div className="text-[8px] text-[#64748B]">{m.label}</div>
            <div className="font-extrabold text-xs mt-0.5" style={{ color: m.color }}>{m.val}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-xl border border-[#DCEBFF] bg-white p-2">
        <div className="text-[9px] text-[#64748B] mb-2">Audience Reach</div>
        <div className="flex items-end gap-1 h-12">
          {[45,60,50,75,65,85,70,90,80,88].map((h,i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm"
              style={{
                height: `${h}%`,
                background: `linear-gradient(to top, #0066FF, #4D9CFF)`,
                opacity: 0.55 + i * 0.04,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function MetaFrame3() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#F5FAFF] rounded-xl gap-3">
      {/* Instagram story */}
      <div className="w-20 h-36 rounded-xl border-2 border-[#0066FF]/30 bg-gradient-to-b from-[#0066FF]/20 to-[#EAF4FF] overflow-hidden flex flex-col">
        <div className="h-1 bg-[#0066FF]/40 mx-2 mt-2 rounded-full" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 rounded-lg bg-white/60 mx-auto mb-1" />
            <div className="h-1 w-10 rounded-full bg-white/40 mx-auto" />
          </div>
        </div>
        <div className="p-2">
          <div className="h-5 rounded-lg bg-white/40 flex items-center justify-center">
            <div className="h-1.5 w-8 rounded-full bg-[#0066FF]/40" />
          </div>
        </div>
      </div>
      {/* Facebook post */}
      <div className="w-24 rounded-xl border border-[#DCEBFF] bg-white overflow-hidden">
        <div className="h-12 bg-gradient-to-br from-[#EAF4FF] to-[#DCEBFF]" />
        <div className="p-2 flex flex-col gap-1">
          <div className="h-1.5 rounded-full bg-[#DCEBFF] w-3/4" />
          <div className="h-1 rounded-full bg-[#EAF4FF] w-1/2" />
          <div className="flex gap-2 mt-1">
            {['♥','◆','↗'].map(v => (
              <span key={v} className="text-[8px] text-[#64748B]">{v}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function MetaAdsVisual() {
  return <CycleVisual frames={[<MetaFrame1 />, <MetaFrame2 />, <MetaFrame3 />]} interval={3000} />
}
