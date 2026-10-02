'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ─── shared skeleton helpers ─── */
function Sk({ w = 'w-full', h = 'h-2', dim = false }: { w?: string; h?: string; dim?: boolean }) {
  return <div className={`${w} ${h} rounded-full ${dim ? 'bg-[#EAF4FF]' : 'bg-[#DCEBFF]'}`} />
}

/* ─── auto-cycle engine ─── */
function CycleVisual({ frames, interval = 3600 }: { frames: React.ReactNode[]; interval?: number }) {
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
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 pointer-events-none">
        {frames.map((_, i) => (
          <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === idx ? 'w-5 bg-[#0066FF]' : 'w-1.5 bg-[#0066FF]/25'}`} />
        ))}
      </div>
    </div>
  )
}

/* ─── per-service visual frames ─── */

/* 01 Website */
const WebFrames = [
  /* browser landing page */
  <div className="absolute inset-0 bg-[#F5FAFF] p-4 flex flex-col gap-3">
    <div className="rounded-2xl border border-[#DCEBFF] bg-white overflow-hidden flex flex-col flex-1 shadow-[0_8px_32px_-8px_#0066FF18]">
      <div className="flex gap-1.5 items-center px-3 py-2.5 bg-[#F5FAFF] border-b border-[#DCEBFF]">
        {['bg-[#FCA5A5]','bg-[#FDE68A]','bg-[#6EE7B7]'].map((c,i)=><span key={i} className={`w-2.5 h-2.5 rounded-full ${c}`}/>)}
        <div className="flex-1 ml-2 h-4 rounded-full bg-white border border-[#DCEBFF]"/>
      </div>
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-5 h-5 rounded-md bg-[#0066FF]"/><Sk w="w-12" h="h-2"/></div><div className="h-5 w-14 rounded-lg bg-[#0066FF] opacity-80"/></div>
        <div className="flex-1 rounded-xl bg-gradient-to-br from-[#0066FF]/10 via-[#EAF4FF] to-[#F5FAFF] flex items-center px-4 gap-4"><div className="flex-1 flex flex-col gap-2"><div className="h-3 w-28 rounded-full bg-[#102A56]/20"/><Sk w="w-20" h="h-2" dim/><div className="h-6 w-14 rounded-lg bg-[#0066FF] opacity-70 mt-1"/></div><div className="w-16 h-20 rounded-xl bg-gradient-to-b from-[#EAF4FF] to-[#DCEBFF]"/></div>
        <div className="grid grid-cols-3 gap-2">{[1,2,3].map(i=><div key={i} className="rounded-xl bg-[#EAF4FF] border border-[#DCEBFF] p-2"><div className="w-4 h-4 rounded-md bg-[#0066FF]/20 mb-1"/><Sk h="h-1.5" dim/></div>)}</div>
      </div>
    </div>
  </div>,
  /* ecommerce */
  <div className="absolute inset-0 bg-white p-4 flex flex-col gap-2">
    <div className="rounded-2xl border border-[#DCEBFF] overflow-hidden flex-1 flex shadow-blue">
      <div className="w-20 border-r border-[#DCEBFF] p-2 flex flex-col gap-1.5 bg-[#F5FAFF]">{['Electronics','Fashion','Home','Sports'].map((_,i)=><div key={i} className={`h-4 rounded-md ${i===0?'bg-[#0066FF]/15':'bg-[#EAF4FF]'}`}/>)}</div>
      <div className="flex-1 p-3 flex flex-col gap-2"><div className="h-5 rounded-lg bg-[#F5FAFF] border border-[#DCEBFF]"/><div className="grid grid-cols-3 gap-1.5 flex-1">{[1,2,3,4,5,6].map(i=><div key={i} className="rounded-lg border border-[#DCEBFF] bg-white flex flex-col overflow-hidden"><div className="flex-1 bg-gradient-to-b from-[#EAF4FF] to-[#F5FAFF]"/><div className="p-1"><Sk h="h-1" dim/><div className="h-1.5 w-8 rounded-full bg-[#0066FF]/30 mt-0.5"/></div></div>)}</div></div>
    </div>
  </div>,
  /* responsive */
  <div className="absolute inset-0 bg-[#F5FAFF] flex items-center justify-center gap-3 p-5">
    <div className="flex-1 max-w-[160px] rounded-xl border border-[#DCEBFF] bg-white overflow-hidden shadow-blue"><div className="h-4 bg-[#F5FAFF] border-b border-[#DCEBFF] flex items-center gap-1 px-1.5">{['bg-[#FCA5A5]','bg-[#FDE68A]','bg-[#6EE7B7]'].map((c,i)=><div key={i} className={`w-1 h-1 rounded-full ${c}`}/>)}</div><div className="p-2 flex flex-col gap-1.5"><div className="h-8 rounded-lg bg-gradient-to-br from-[#0066FF]/10 to-[#EAF4FF]"/><div className="grid grid-cols-3 gap-1">{[1,2,3].map(i=><div key={i} className="h-3 rounded-sm bg-[#EAF4FF]"/>)}</div></div></div>
    <div className="w-16 rounded-[1.2rem] border-2 border-[#DCEBFF] bg-white overflow-hidden shadow-sm"><div className="h-3 bg-[#F5FAFF] border-b border-[#DCEBFF]"/><div className="p-1.5 flex flex-col gap-1"><div className="h-6 rounded-lg bg-gradient-to-b from-[#EAF4FF] to-[#F5FAFF]"/><Sk h="h-1.5"/><Sk w="w-3/4" h="h-1" dim/></div></div>
  </div>,
]

/* 02 Software */
const SoftFrames = [
  /* dark code editor */
  <div className="absolute inset-0 bg-[#071A3D] p-4 flex flex-col gap-2">
    <div className="flex items-center gap-2 mb-1"><motion.div animate={{scale:[1,1.4,1]}} transition={{repeat:Infinity,duration:2}} className="w-2 h-2 rounded-full bg-[#22C55E]"/><span className="text-[9px] font-mono text-[#4D9CFF]">API v2.4 · LIVE</span></div>
    {[{method:'GET',path:'/api/users',ms:'12ms'},{method:'POST',path:'/api/orders',ms:'28ms'},{method:'PUT',path:'/api/products',ms:'18ms'},{method:'DELETE',path:'/api/auth',ms:'8ms'}].map((e,i)=>(
      <div key={i} className="flex items-center gap-2 rounded-lg border border-[#1E3A6E] bg-[#0D2348]/60 px-2.5 py-1.5">
        <div className="text-[8px] font-bold font-mono px-1.5 py-0.5 rounded" style={{background:({GET:'#22C55E',POST:'#0066FF',PUT:'#FFA500',DELETE:'#EF4444'}[e.method]??'#0066FF')+'20',color:({GET:'#22C55E',POST:'#4D9CFF',PUT:'#FFA500',DELETE:'#EF4444'}[e.method]??'#4D9CFF')}}>{e.method}</div>
        <div className="text-[8px] font-mono text-[#4D9CFF]/70 flex-1">{e.path}</div>
        <div className="text-[8px] text-[#22C55E] font-mono">{e.ms}</div>
      </div>
    ))}
  </div>,
  /* analytics dashboard */
  <div className="absolute inset-0 bg-white p-4 flex flex-col gap-2.5">
    <div className="flex gap-1.5">{['Dashboard','Analytics','Users'].map((t,i)=><div key={t} className={`h-6 px-2 rounded-lg text-[8px] flex items-center font-semibold ${i===0?'bg-[#0066FF]/15 text-[#0066FF]':'text-[#64748B] bg-[#F5FAFF]'}`}>{t}</div>)}</div>
    <div className="grid grid-cols-3 gap-2">{[{l:'Revenue',v:'$84k'},{l:'Users',v:'12.5k'},{l:'Uptime',v:'99.9%'}].map(m=><div key={m.l} className="rounded-xl border border-[#DCEBFF] bg-[#F5FAFF] p-2"><div className="text-[8px] text-[#64748B]">{m.l}</div><div className="text-sm font-extrabold text-[#0066FF]">{m.v}</div></div>)}</div>
    <div className="flex-1 rounded-xl border border-[#DCEBFF] bg-[#F5FAFF] p-2.5 flex flex-col gap-1.5"><Sk w="w-20" h="h-1.5"/><div className="flex-1 flex items-end gap-1">{[40,65,50,80,60,90,75,88].map((h,i)=><div key={i} className="flex-1 rounded-t-sm" style={{height:`${h}%`,background:`linear-gradient(to top,#0066FF,#4D9CFF)`,opacity:0.55+i*0.05}}/>)}</div></div>
  </div>,
  /* CRM table */
  <div className="absolute inset-0 bg-[#F5FAFF] p-4 flex flex-col gap-2">
    <div className="flex items-center justify-between"><Sk w="w-24" h="h-2.5"/><div className="h-6 w-14 rounded-lg bg-[#0066FF]/15 text-[8px] text-[#0066FF] flex items-center justify-center font-bold">+ New</div></div>
    <div className="flex-1 rounded-xl border border-[#DCEBFF] bg-white overflow-hidden">
      <div className="grid grid-cols-4 bg-[#F5FAFF] border-b border-[#DCEBFF] px-3 py-1.5 gap-2">{['Company','Contact','Status','Value'].map(h=><div key={h} className="h-1.5 rounded-full bg-[#DCEBFF]"/>)}</div>
      {[{s:'#22C55E',v:'$12k'},{s:'#0066FF',v:'$8.4k'},{s:'#FFA500',v:'$22k'},{s:'#22C55E',v:'$5.1k'}].map((r,i)=>(
        <div key={i} className="grid grid-cols-4 px-3 py-2.5 gap-2 border-b border-[#DCEBFF] last:border-0 items-center">
          <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded-full bg-[#EAF4FF] shrink-0"/><Sk w="w-10" h="h-1.5"/></div>
          <Sk w="w-12" h="h-1.5" dim/>
          <div className="h-3.5 px-1.5 rounded-full text-[7px] font-bold flex items-center w-fit" style={{background:r.s+'20',color:r.s}}>{['Won','Active','Pending','Won'][i]}</div>
          <div className="h-2 rounded-full bg-[#0066FF]/20 text-[8px] flex items-center justify-center font-bold text-[#0066FF]">{r.v}</div>
        </div>
      ))}
    </div>
  </div>,
]

/* 03 Graphic Design */
const GraphicFrames = [
  <div className="absolute inset-0 p-4 overflow-hidden bg-[#F5FAFF]">
    <Image src="/images/work-branding.png" alt="Graphic Design" fill className="object-cover opacity-65" sizes="(max-width:768px) 100vw,50vw"/>
    <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/20 to-transparent"/>
    <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.3,duration:.6,ease:EASE}} className="absolute left-4 top-4 right-16 bottom-12 rounded-2xl border border-[#DCEBFF] bg-white/80 backdrop-blur-sm shadow-blue p-3 flex flex-col gap-2">
      <div className="flex-1 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#1683FF] flex items-center justify-center"><div className="w-8 h-8 rounded-xl bg-white/25"/></div>
      <Sk w="w-3/4" h="h-2"/><Sk w="w-1/2" h="h-1.5" dim/>
    </motion.div>
    <div className="absolute bottom-4 right-4 glass rounded-xl px-3 py-2 shadow-blue float-slow"><div className="text-xs font-extrabold text-[#0066FF]">500+</div><div className="text-[9px] text-[#64748B]">Designs Done</div></div>
  </div>,
  <div className="absolute inset-0 p-3 grid grid-cols-2 gap-2.5 bg-white">
    {[{bg:'from-[#0066FF] to-[#1683FF]',label:'Poster'},{bg:'from-[#EAF4FF] to-[#DCEBFF]',label:'Brochure'},{bg:'from-[#1683FF] to-[#4D9CFF]',label:'Social'},{bg:'from-[#F5FAFF] to-[#EAF4FF]',label:'Ad'}].map((c,i)=>(
      <motion.div key={i} initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} transition={{delay:i*.08,duration:.5,ease:EASE}} className={`rounded-2xl border border-[#DCEBFF] bg-gradient-to-br ${c.bg} flex flex-col items-center justify-center gap-2 overflow-hidden relative`}>
        <div className={`w-6 h-6 rounded-lg ${i<2?'bg-white/25':'bg-[#0066FF]/20'}`}/>
        <div className={`text-[8px] font-bold ${i<2?'text-white/60':'text-[#0066FF]/60'}`}>{c.label}</div>
      </motion.div>
    ))}
  </div>,
  <div className="absolute inset-0 p-4 flex gap-3 bg-[#F5FAFF]">
    <motion.div initial={{opacity:0,rotateY:8}} animate={{opacity:1,rotateY:3}} transition={{duration:.7,ease:EASE}} className="w-1/2 rounded-2xl overflow-hidden border border-[#DCEBFF] shadow-blue float relative" style={{perspective:700}}>
      <Image src="/images/work-social.png" alt="Social design" fill className="object-cover" sizes="200px"/>
      <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/30 to-transparent"/>
      <div className="absolute bottom-2 left-2 text-[8px] font-bold text-white/80">Social Media</div>
    </motion.div>
    <div className="flex-1 flex flex-col gap-2">
      {['/images/work-branding.png','/images/work-ads.png'].map((s,i)=>(
        <motion.div key={i} initial={{opacity:0,x:14}} animate={{opacity:1,x:0}} transition={{delay:.1+i*.12,duration:.55,ease:EASE}} className="flex-1 rounded-xl overflow-hidden border border-[#DCEBFF] shadow-sm relative float-slow">
          <Image src={s} alt="Design" fill className="object-cover" sizes="120px"/>
        </motion.div>
      ))}
    </div>
  </div>,
]

/* 04 Branding */
const BrandFrames = [
  <div className="absolute inset-0 overflow-hidden bg-[#F5FAFF]">
    <motion.div initial={{opacity:0,scale:1.07}} animate={{opacity:1,scale:1}} transition={{duration:.85,ease:EASE}} className="absolute inset-0">
      <Image src="/images/work-branding.png" alt="Branding" fill className="object-cover opacity-60" sizes="(max-width:768px) 100vw,50vw"/>
    </motion.div>
    <div className="absolute inset-0 bg-gradient-to-br from-white/65 via-white/30 to-transparent"/>
    <div className="absolute inset-4 grid grid-cols-5 grid-rows-3 gap-2">
      <div className="col-span-3 row-span-2 rounded-2xl bg-[#0066FF] flex items-center justify-center shadow-[0_8px_24px_-4px_#0066FF40]">
        <div className="text-center"><motion.div animate={{rotate:[0,6,-6,0]}} transition={{repeat:Infinity,duration:7,ease:'easeInOut'}} className="w-10 h-10 rounded-2xl bg-white/20 mx-auto mb-2.5 flex items-center justify-center"><div className="w-6 h-6 rounded-xl bg-white/65"/></motion.div><div className="h-2 w-14 rounded-full bg-white/50 mx-auto mb-1"/><div className="h-1.5 w-9 rounded-full bg-white/25 mx-auto"/></div>
      </div>
      {['#0066FF','#1683FF','#4D9CFF','#102A56'].map((c,i)=><div key={i} className={`${i<2?'col-span-2':'col-span-1'} rounded-xl`} style={{background:c,opacity:.75+i*.06}}/>)}
      <div className="col-span-5 rounded-xl border border-[#DCEBFF] bg-white/90 backdrop-blur-sm flex items-center gap-4 px-3"><div className="h-2.5 w-20 rounded-full bg-[#102A56]/20"/><div className="h-2 w-14 rounded-full bg-[#DCEBFF]"/></div>
    </div>
  </div>,
  <div className="absolute inset-0 p-4 flex flex-col gap-3 bg-white">
    <motion.div animate={{rotateZ:[0,1,-1,0]}} transition={{repeat:Infinity,duration:6,ease:'easeInOut'}} className="flex-1 rounded-2xl border border-[#DCEBFF] bg-gradient-to-br from-[#0066FF]/6 to-[#EAF4FF] p-4 flex items-center justify-between shadow-blue">
      <div className="flex flex-col gap-1.5"><div className="h-3 w-16 rounded-full bg-[#0066FF]/40"/><div className="h-1.5 w-20 rounded-full bg-[#102A56]/20"/><div className="h-1 w-14 rounded-full bg-[#64748B]/20"/></div>
      <div className="w-10 h-10 rounded-xl bg-[#0066FF] flex items-center justify-center shadow-sm"><div className="w-5 h-5 rounded-lg bg-white/50"/></div>
    </motion.div>
    {['Brand Guide','Colours','Typography'].map((s,i)=><div key={s} className="flex items-center gap-1.5 rounded-lg border border-[#DCEBFF] bg-white px-2.5 py-1.5"><div className="w-2.5 h-2.5 rounded-sm" style={{background:['#0066FF','#1683FF','#4D9CFF'][i]+'50'}}/><span className="text-[9px] font-semibold text-[#102A56]">{s}</span></div>)}
  </div>,
  <div className="absolute inset-0 p-3 grid grid-cols-2 gap-3 bg-[#F5FAFF]">
    <motion.div initial={{opacity:0,rotateY:8}} animate={{opacity:1,rotateY:4}} transition={{duration:.7,ease:EASE}} className="rounded-2xl overflow-hidden border border-[#DCEBFF] shadow-blue float relative" style={{perspective:600}}>
      <Image src="/images/work-branding.png" alt="Packaging" fill className="object-cover" sizes="200px"/>
      <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/40 to-transparent"/>
      <div className="absolute bottom-2 left-2 text-[8px] font-bold text-white/80">Packaging</div>
    </motion.div>
    <motion.div initial={{opacity:0,rotateY:-8}} animate={{opacity:1,rotateY:-4}} transition={{delay:.1,duration:.7,ease:EASE}} className="rounded-2xl overflow-hidden border border-[#DCEBFF] shadow-blue float-slow relative" style={{perspective:600}}>
      <Image src="/images/work-social.png" alt="Stationery" fill className="object-cover" sizes="200px"/>
      <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/40 to-transparent"/>
      <div className="absolute bottom-2 left-2 text-[8px] font-bold text-white/80">Stationery</div>
    </motion.div>
    <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.2,duration:.6,ease:EASE}} className="col-span-2 rounded-2xl border border-[#DCEBFF] bg-[#071A3D] flex overflow-hidden">
      <div className="flex-1 flex items-center p-3 gap-3"><div className="w-7 h-7 rounded-xl bg-[#0066FF]"/><div className="flex flex-col gap-1"><div className="h-2 w-20 rounded-full bg-white/50"/><div className="h-1.5 w-14 rounded-full bg-white/25"/></div></div>
      <div className="w-20 relative"><Image src="/images/work-branding.png" alt="Brand" fill className="object-cover opacity-40" sizes="80px"/></div>
    </motion.div>
  </div>,
]

/* 05 Digital Marketing */
const MarketingFrames = [
  <div className="absolute inset-0 p-4 flex flex-col gap-2.5 bg-white">
    <div className="grid grid-cols-3 gap-2">{[{l:'Impressions',v:'124k'},{l:'CTR',v:'4.8%'},{l:'Conv.',v:'248'}].map(m=><div key={m.l} className="rounded-xl border border-[#DCEBFF] bg-[#F5FAFF] p-2.5"><div className="text-[8px] text-[#64748B]">{m.l}</div><div className="text-sm font-extrabold text-[#0066FF]">{m.v}</div><div className="text-[8px] text-emerald-500">↑ This month</div></div>)}</div>
    <div className="flex-1 rounded-xl border border-[#DCEBFF] bg-white p-2.5 flex flex-col gap-1.5">
      <Sk w="w-20" h="h-2"/>
      <div className="flex-1 relative">
        <svg className="w-full h-full" viewBox="0 0 200 60" fill="none" preserveAspectRatio="none">
          <defs><linearGradient id="lgHS" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0066FF" stopOpacity=".18"/><stop offset="100%" stopColor="#0066FF" stopOpacity="0"/></linearGradient></defs>
          <motion.path d="M0,52 C25,46 45,32 70,28 S110,12 135,16 S165,4 200,6" stroke="#0066FF" strokeWidth="2.5" fill="none" strokeLinecap="round" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:1.2,ease:'easeOut'}}/>
          <path d="M0,52 C25,46 45,32 70,28 S110,12 135,16 S165,4 200,6 V60 H0 Z" fill="url(#lgHS)"/>
        </svg>
      </div>
      <div className="flex justify-between px-1">{['Jan','Mar','May','Jul','Sep','Nov'].map(m=><span key={m} className="text-[7px] text-[#64748B]">{m}</span>)}</div>
    </div>
  </div>,
  <div className="absolute inset-0 overflow-hidden bg-[#F5FAFF]">
    <motion.div initial={{opacity:0,scale:1.06}} animate={{opacity:1,scale:1}} transition={{duration:.8,ease:EASE}} className="absolute inset-0">
      <Image src="/images/work-social.png" alt="Social campaign" fill className="object-cover opacity-50" sizes="(max-width:768px) 100vw,50vw"/>
    </motion.div>
    <div className="absolute inset-0 bg-gradient-to-br from-white/75 via-white/45 to-transparent"/>
    <div className="absolute inset-4 flex flex-col gap-2">
      {['Instagram','Facebook','LinkedIn','Email'].map((ch,i)=>(
        <div key={ch} className="flex items-center gap-2.5 rounded-xl border border-[#DCEBFF] bg-white/90 backdrop-blur-sm p-2">
          <div className="w-6 h-6 rounded-lg shrink-0" style={{background:['#E040FB','#1877F2','#0A66C2','#0066FF'][i]+'20'}}/>
          <div className="flex-1"><div className="flex justify-between text-[9px] mb-1"><span className="font-bold text-[#102A56]">{ch}</span><span className="text-[#0066FF] font-bold">{[82,67,51,89][i]}%</span></div>
          <div className="h-1.5 rounded-full bg-[#EAF4FF] overflow-hidden"><motion.div initial={{width:0}} animate={{width:`${[82,67,51,89][i]}%`}} transition={{duration:.8,delay:i*.1}} className="h-full rounded-full bg-gradient-to-r from-[#0066FF] to-[#4D9CFF]"/></div></div>
        </div>
      ))}
    </div>
  </div>,
  <div className="absolute inset-0 p-4 flex gap-3 bg-white">
    <motion.div initial={{opacity:0,rotateY:6}} animate={{opacity:1,rotateY:2}} transition={{duration:.7,ease:EASE}} className="flex-1 rounded-2xl overflow-hidden border border-[#DCEBFF] shadow-blue float relative" style={{perspective:600}}>
      <Image src="/images/work-social.png" alt="Campaign" fill className="object-cover" sizes="200px"/>
      <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/50 to-transparent"/>
      <div className="absolute bottom-2 left-2 right-2 flex gap-3">{['♥ 2.4k','💬 412','↗ 820'].map(v=><span key={v} className="text-[8px] text-white/80 font-semibold">{v}</span>)}</div>
    </motion.div>
    <div className="w-28 flex flex-col gap-2">{[{l:'Reach',v:'12.4k'},{l:'Saves',v:'840'},{l:'Shares',v:'320'}].map(m=><div key={m.l} className="flex-1 rounded-xl border border-[#DCEBFF] bg-white p-2 flex flex-col justify-center"><div className="text-[8px] text-[#64748B]">{m.l}</div><div className="text-sm font-extrabold text-[#0066FF]">{m.v}</div></div>)}</div>
  </div>,
]

/* 06 Photography */
const PhotoFrames = [0,1,2,3].map((i) => (
  <div key={i} className="absolute inset-0 overflow-hidden">
    {i===0&&<Image src="/images/case-restaurant.png" alt="Food Photography" fill className="object-cover" sizes="(max-width:768px) 100vw,50vw"/>}
    {i===1&&<Image src="/images/work-branding.png" alt="Product Photography" fill className="object-cover" sizes="(max-width:768px) 100vw,50vw"/>}
    {i===2&&<Image src="/images/case-realestate.png" alt="Real Estate Photography" fill className="object-cover" sizes="(max-width:768px) 100vw,50vw"/>}
    {i===3&&<Image src="/images/about-studio.png" alt="Corporate Photography" fill className="object-cover" sizes="(max-width:768px) 100vw,50vw"/>}
    <div className="absolute inset-0" style={{background:'radial-gradient(ellipse at center, transparent 50%, rgba(7,26,61,0.45) 100%)'}}/>
    <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-[#071A3D]/40 to-transparent"/>
    <div className="absolute top-3 left-3 text-[8px] font-mono text-white/70 bg-[#071A3D]/40 backdrop-blur-sm rounded-lg px-2 py-1">f/2.8 · 1/200s · ISO 400</div>
    <div className="absolute bottom-0 left-0 right-0 p-3 pt-8" style={{background:'linear-gradient(to top, rgba(7,26,61,0.75), transparent)'}}>
      <div className="text-white font-bold text-[10px]">{['Food Photography','Product Photography','Real Estate Shoots','Corporate Portraits'][i]}</div>
      <div className="flex gap-1 mt-1">{[1,2,3,4].map(j=><div key={j} className="h-4 w-6 rounded-sm bg-white/20"/>)}</div>
    </div>
  </div>
))

/* 07 Google Ads */
const GoogleAdsFrames = [
  <div className="absolute inset-0 p-4 flex flex-col gap-2 bg-white">
    <div className="flex items-center gap-2 rounded-full border border-[#DCEBFF] bg-white px-3 py-2 shadow-sm"><div className="flex gap-0.5">{['#4285F4','#EA4335','#FBBC05','#34A853'].map(c=><div key={c} className="w-1.5 h-1.5 rounded-full" style={{background:c}}/>)}</div><div className="flex-1 h-2 rounded-full bg-[#EAF4FF]"/></div>
    {[0,1,2].map(i=>(
      <div key={i} className={`rounded-xl border p-2.5 ${i===0?'border-[#0066FF]/25 bg-[#EAF4FF]/80':'border-[#DCEBFF] bg-white'}`}>
        {i===0&&<div className="inline-flex items-center px-1.5 py-0.5 rounded-sm bg-[#0066FF]/12 mb-1"><span className="text-[8px] font-bold text-[#0066FF]">Sponsored</span></div>}
        <div className="h-1.5 w-3/4 rounded-full mb-1" style={{background:i===0?'#0066FF60':'#DCEBFF'}}/>
        <div className="h-1 w-full rounded-full bg-[#EAF4FF]"/>
        {i===0&&<div className="flex gap-2 mt-1.5">{['Fast Delivery','Free Quote'].map(ext=><div key={ext} className="h-4 px-1.5 rounded-full border border-[#0066FF]/20 text-[7px] text-[#0066FF] flex items-center">{ext}</div>)}</div>}
      </div>
    ))}
  </div>,
  <div className="absolute inset-0 overflow-hidden bg-[#F5FAFF]">
    <motion.div initial={{opacity:0,scale:1.05}} animate={{opacity:1,scale:1}} transition={{duration:.8,ease:EASE}} className="absolute inset-0">
      <Image src="/images/work-ads.png" alt="Google Ads" fill className="object-cover opacity-40" sizes="(max-width:768px) 100vw,50vw"/>
    </motion.div>
    <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/50 to-transparent"/>
    <div className="absolute inset-4 flex flex-col gap-2.5">
      <div className="grid grid-cols-2 gap-2">{[{l:'CTR',v:'4.8%'},{l:'ROAS',v:'6.2×'},{l:'Clicks',v:'3,240'},{l:'Conv.',v:'9.4%'}].map(m=><div key={m.l} className="rounded-xl border border-[#DCEBFF] bg-white/90 backdrop-blur-sm p-2.5"><div className="text-[8px] text-[#64748B]">{m.l}</div><div className="text-sm font-extrabold text-[#0066FF]">{m.v}</div></div>)}</div>
      <div className="flex-1 rounded-xl border border-[#DCEBFF] bg-white/90 backdrop-blur-sm p-2.5 flex flex-col gap-1.5"><Sk w="w-20" h="h-2"/><div className="flex-1 flex items-end gap-1">{[55,40,70,60,85,65,90,75].map((h,i)=><div key={i} className="flex-1 rounded-t-sm bg-[#0066FF]/60" style={{height:`${h}%`}}/>)}</div></div>
    </div>
  </div>,
  <div className="absolute inset-0 overflow-hidden bg-[#F5FAFF]">
    <motion.div initial={{opacity:0,rotateX:-6,y:12}} animate={{opacity:1,rotateX:-2,y:0}} transition={{duration:.75,ease:EASE}} className="absolute inset-4 rounded-2xl overflow-hidden border border-[#DCEBFF] shadow-[0_16px_40px_-8px_#0066FF22] float-slow" style={{perspective:700,transformStyle:'preserve-3d'}}>
      <Image src="/images/work-ads.png" alt="Google Ads campaign" fill className="object-cover" sizes="(max-width:768px) 100vw,50vw"/>
      <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/50 to-transparent"/>
      <div className="absolute bottom-3 left-3 right-3 grid grid-cols-3 gap-1.5">{[{l:'Quality',v:'9/10',c:'#22C55E'},{l:'Ad Rank',v:'#2',c:'#0066FF'},{l:'Imp.',v:'68%',c:'#1683FF'}].map(m=><div key={m.l} className="rounded-lg bg-white/90 backdrop-blur-sm p-1.5"><div className="text-[7px] text-[#64748B]">{m.l}</div><div className="text-[11px] font-extrabold" style={{color:m.c}}>{m.v}</div></div>)}</div>
    </motion.div>
  </div>,
]

/* 08 Meta Ads */
const MetaAdsFrames = [
  <div className="absolute inset-0 flex items-center justify-center bg-[#F5FAFF] p-4 gap-4 overflow-hidden">
    <Image src="/images/work-social.png" alt="Meta Ads" fill className="object-cover opacity-12" sizes="(max-width:768px) 100vw,50vw"/>
    <motion.div initial={{opacity:0,y:16,rotateY:-8}} animate={{opacity:1,y:0,rotateY:-4}} transition={{duration:.7,ease:EASE}} className="w-32 h-56 rounded-[1.75rem] border-2 border-[#DCEBFF] bg-white overflow-hidden flex flex-col shadow-[0_16px_40px_-8px_#0066FF20] float" style={{perspective:600}}>
      <div className="h-6 bg-[#F5FAFF] border-b border-[#DCEBFF] flex items-center justify-between px-2 shrink-0"><div className="text-[8px] font-bold text-[#102A56]">Instagram</div></div>
      <div className="flex gap-1.5 p-1.5 border-b border-[#DCEBFF]">{[0,1,2,3].map(i=><div key={i} className={`w-6 h-6 rounded-full ${i===0?'ring-2 ring-[#E040FB]':'ring-1 ring-[#DCEBFF]'} overflow-hidden relative`}><Image src="/images/work-social.png" alt="story" fill className="object-cover" sizes="30px"/></div>)}</div>
      <div className="flex items-center gap-1.5 p-1.5"><div className="w-4 h-4 rounded-full overflow-hidden relative"><Image src="/images/work-branding.png" alt="avatar" fill className="object-cover" sizes="20px"/></div><div className="flex-1 h-1 rounded-full bg-[#EAF4FF]"/><div className="text-[7px] text-[#0066FF] font-bold">Sponsored</div></div>
      <div className="flex-1 relative overflow-hidden"><Image src="/images/work-ads.png" alt="Ad" fill className="object-cover" sizes="130px"/></div>
      <div className="flex items-center gap-2 p-1.5 border-t border-[#DCEBFF]">{['♥','💬','↗'].map(v=><span key={v} className="text-[10px]">{v}</span>)}<div className="ml-auto h-4 px-2 rounded-lg bg-[#0066FF] text-[7px] text-white flex items-center font-bold">Shop</div></div>
    </motion.div>
    <div className="flex flex-col gap-2">{[{l:'Reach',v:'45.2k',c:'#E040FB'},{l:'Clicks',v:'3,840',c:'#0066FF'},{l:'CPL',v:'$1.80',c:'#1683FF'}].map(m=><div key={m.l} className="rounded-xl border border-[#DCEBFF] bg-white/90 backdrop-blur-sm p-2"><div className="text-[8px] text-[#64748B]">{m.l}</div><div className="text-sm font-extrabold" style={{color:m.c}}>{m.v}</div></div>)}</div>
  </div>,
  <div className="absolute inset-0 overflow-hidden bg-[#F5FAFF]">
    <motion.div initial={{opacity:0,scale:1.06}} animate={{opacity:1,scale:1}} transition={{duration:.85,ease:EASE}} className="absolute inset-0"><Image src="/images/work-ads.png" alt="Meta Ads" fill className="object-cover opacity-45" sizes="(max-width:768px) 100vw,50vw"/></motion.div>
    <div className="absolute inset-0 bg-gradient-to-br from-white/75 via-white/45 to-transparent"/>
    <div className="absolute inset-4 flex flex-col gap-2.5">
      <div className="flex-1 rounded-2xl border border-[#DCEBFF] bg-white/90 backdrop-blur-sm overflow-hidden flex flex-col shadow-sm">
        <div className="flex items-center gap-2 p-2.5 border-b border-[#DCEBFF]"><div className="w-6 h-6 rounded-full overflow-hidden relative"><Image src="/images/work-branding.png" alt="profile" fill className="object-cover" sizes="25px"/></div><div className="flex-1 flex flex-col gap-0.5"><Sk w="w-16" h="h-1.5"/><div className="h-2.5 px-1 rounded bg-[#1877F2]/10 text-[7px] text-[#1877F2] font-bold flex items-center w-fit">Sponsored</div></div></div>
        <div className="flex-1 relative overflow-hidden"><Image src="/images/work-social.png" alt="Facebook ad" fill className="object-cover" sizes="(max-width:768px) 100vw,50vw"/></div>
        <div className="bg-[#F5FAFF] border-t border-[#DCEBFF] p-2 flex items-center justify-between"><div className="flex flex-col gap-1"><Sk w="w-24" h="h-1.5"/><Sk w="w-16" h="h-1" dim/></div><div className="h-6 px-2.5 rounded-lg bg-[#0066FF] text-[8px] text-white font-bold flex items-center">Learn More</div></div>
      </div>
      <div className="grid grid-cols-4 gap-2">{[{l:'Imp.',v:'124k'},{l:'CPL',v:'$2.1'},{l:'ROAS',v:'5.8×'},{l:'Conv.',v:'7.3%'}].map(m=><div key={m.l} className="rounded-xl border border-[#DCEBFF] bg-white p-1.5"><div className="text-[7px] text-[#64748B]">{m.l}</div><div className="text-[10px] font-extrabold text-[#0066FF]">{m.v}</div></div>)}</div>
    </div>
  </div>,
  <div className="absolute inset-0 flex items-center justify-center gap-3 p-3 bg-[#F5FAFF] overflow-hidden">
    <div className="w-24 flex flex-col items-center gap-1.5">
      <div className="w-24 h-40 rounded-2xl overflow-hidden relative shadow-blue" style={{border:'2px solid transparent',background:'linear-gradient(#F5FAFF,#F5FAFF) padding-box, linear-gradient(135deg,#E040FB,#FF7043,#FBBC05) border-box'}}>
        <Image src="/images/work-social.png" alt="Story ad" fill className="object-cover" sizes="100px"/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/50 to-transparent"/>
        <div className="absolute top-2 left-2 right-2 h-0.5 rounded-full bg-white/30"><motion.div initial={{width:'0%'}} animate={{width:'65%'}} transition={{duration:2,repeat:Infinity,repeatDelay:1}} className="h-full rounded-full bg-white"/></div>
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center"><div className="h-5 px-2 rounded-full bg-white/80 text-[7px] font-bold text-[#0066FF] flex items-center">Shop Now</div></div>
      </div>
      <div className="text-[8px] font-semibold text-[#64748B]">Story Ad</div>
    </div>
    <div className="w-24 flex flex-col items-center gap-1.5">
      <div className="w-24 h-40 rounded-2xl overflow-hidden border border-[#DCEBFF] relative shadow-blue flex flex-col"><Image src="/images/work-ads.png" alt="Reels" fill className="object-cover" sizes="100px"/><div className="absolute inset-0 bg-[#071A3D]/40"/><div className="absolute inset-0 flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-white/50 flex items-center justify-center backdrop-blur-sm"><div className="w-0 h-0 ml-0.5" style={{borderTop:'5px solid transparent',borderBottom:'5px solid transparent',borderLeft:'8px solid rgba(255,255,255,0.8)'}}/></div></div><div className="absolute bottom-2 left-2 right-2"><div className="text-[7px] text-white/60 border border-white/20 rounded-full px-1.5 py-0.5 w-fit">Sponsored</div></div></div>
      <div className="text-[8px] font-semibold text-[#64748B]">Reels Ad</div>
    </div>
  </div>,
]

/* ─── service list ─── */
const SERVICES = [
  { num:'01', title:'Website Design\n& Development', short:'Web Design',       href:'/services/website-design-development', frames: WebFrames,        bg:'bg-white' },
  { num:'02', title:'Software\nDevelopment',         short:'Software Dev',      href:'/services/software-development',       frames: SoftFrames,       bg:'bg-[#F5FAFF]' },
  { num:'03', title:'Graphic\nDesign',               short:'Graphic Design',    href:'/services/graphic-design',             frames: GraphicFrames,    bg:'bg-white' },
  { num:'04', title:'Branding',                      short:'Branding',          href:'/services/branding',                   frames: BrandFrames,      bg:'bg-[#F5FAFF]' },
  { num:'05', title:'Digital\nMarketing',            short:'Digital Marketing', href:'/services/digital-marketing',          frames: MarketingFrames,  bg:'bg-white' },
  { num:'06', title:'Photography',                   short:'Photography',       href:'/services/photography',                frames: PhotoFrames,      bg:'bg-[#F5FAFF]' },
  { num:'07', title:'Google\nAds',                   short:'Google Ads',        href:'/services/google-ads',                 frames: GoogleAdsFrames,  bg:'bg-white' },
  { num:'08', title:'Meta\nAds',                     short:'Meta Ads',          href:'/services/meta-ads',                   frames: MetaAdsFrames,    bg:'bg-[#F5FAFF]' },
] as const

/* ─── service row ─── */
function ServiceRow({ svc, index }: { svc: typeof SERVICES[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reversed = index % 2 !== 0

  return (
    <div ref={ref} id={`service-${svc.num}`} className={`relative ${svc.bg} overflow-hidden`}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DCEBFF] to-transparent" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-start ${reversed ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''}`}>

          {/* text */}
          <div className="flex flex-col gap-7">
            <motion.div
              initial={{ opacity: 0, x: reversed ? 20 : -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, ease: EASE }}
              className="flex items-center gap-3"
            >
              <span className="text-xs font-black tracking-[0.2em] text-[#0066FF] uppercase">{svc.num}</span>
              <div className="h-px w-8 bg-[#0066FF]/40" />
              <span className="text-xs font-semibold tracking-widest text-[#64748B] uppercase">{svc.short}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
              className="text-4xl sm:text-5xl lg:text-[3.2rem] font-extrabold leading-[1.06] tracking-tight text-[#102A56] whitespace-pre-line"
            >
              {svc.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
              className="text-lg text-[#64748B] leading-relaxed max-w-lg"
            >
              {[
                'Fast, beautiful, conversion-optimised websites that work hard for your business — from landing pages to complex web applications.',
                'Bespoke dashboards, platforms and tools engineered for scale. We turn complex business logic into clean, maintainable software.',
                'Print, digital, social — every touchpoint elevated. Posters, packaging, presentations and collateral that make your brand impossible to ignore.',
                'Complete brand systems built to last — visual identity, tone of voice, guidelines and everything your team needs.',
                'Strategy-led content, social media management, and campaigns that grow your audience and drive consistent inbound leads.',
                'High-quality commercial photography for brands, products, food, real estate and more — images that tell your story.',
                'Search, Display, and Performance Max campaigns engineered for ROI. Strategy, creative, bidding and optimisation — all handled.',
                'Facebook and Instagram advertising that reaches the right people at the right moment — creative-led campaigns built to convert.',
              ][index]}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
            >
              <Link href={svc.href} className="group inline-flex items-center gap-2.5 text-sm font-bold text-[#102A56] hover:text-[#0066FF] transition-colors duration-200">
                <span className="relative">
                  Explore Service
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#0066FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </span>
                <motion.span whileHover={{ x: 3 }} className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-[#DCEBFF] group-hover:border-[#0066FF] group-hover:bg-[#0066FF] transition-all duration-200">
                  <ArrowRight size={13} className="text-[#0066FF] group-hover:text-white transition-colors duration-200" />
                </motion.span>
              </Link>
            </motion.div>
          </div>

          {/* visual */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? -40 : 40, rotateY: reversed ? -8 : 8 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.12, ease: EASE }}
            className="relative"
            style={{ perspective: 1000 }}
          >
            <div aria-hidden className="absolute -inset-5 rounded-3xl border border-[#0066FF]/5 pointer-events-none" />
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.4 }}
              className="relative w-full aspect-[4/3] rounded-2xl border border-[#DCEBFF] overflow-hidden shadow-[0_20px_60px_-16px_#0066FF18] bg-[#F5FAFF] z-10"
            >
              <CycleVisual frames={svc.frames as React.ReactNode[]} interval={3400} />
            </motion.div>
            <div aria-hidden className="absolute -bottom-4 -right-4 text-[7rem] font-black leading-none text-[#0066FF]/[0.035] select-none pointer-events-none z-0">{svc.num}</div>
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.55, duration: 0.4, ease: EASE }}
              className={`absolute -top-3 ${reversed ? 'left-4' : 'right-4'} glass rounded-xl px-3 py-1.5 z-20 shadow-blue float-slow`}
            >
              <span className="text-[10px] font-black tracking-widest text-[#0066FF] uppercase">{svc.num} · {svc.short}</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* ─── marquee ─── */
function Marquee() {
  const labels = SERVICES.map(s => s.short)
  const doubled = [...labels, ...labels]
  return (
    <div className="overflow-hidden border-y border-[#DCEBFF] bg-[#EAF4FF] py-3.5">
      <motion.div animate={{ x: [0, '-50%'] }} transition={{ repeat: Infinity, duration: 30, ease: 'linear' }} className="flex items-center gap-8 whitespace-nowrap w-max">
        {doubled.map((l, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="text-xs font-black tracking-[0.2em] text-[#0066FF] uppercase">{l}</span>
            <span className="text-[#0066FF]/30 text-lg font-light">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ─── export ─── */
export function HomeServices() {
  return (
    <section aria-label="Our Services" id="services">
      {/* section header */}
      <div className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3 py-1 text-xs font-semibold text-[#0066FF] mb-5">What We Do</div>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#102A56]">
                Eight ways we grow<br />
                <span className="gradient-text">your business.</span>
              </h2>
            </div>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066FF] hover:underline underline-offset-4 shrink-0">All Services <ArrowRight size={14} /></Link>
          </motion.div>
        </div>
      </div>

      <Marquee />

      {SERVICES.map((svc, i) => (
        <ServiceRow key={svc.num} svc={svc} index={i} />
      ))}
    </section>
  )
}
