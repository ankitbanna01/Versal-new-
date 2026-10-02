'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Check,
  Clock3,
  Code2,
  Compass,
  Eye,
  Lightbulb,
  Map,
  MessageSquare,
  Palette,
  Rocket,
  Search,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const JOURNEY = [
  { title: 'Discover', icon: Search },
  { title: 'Strategy', icon: Map },
  { title: 'Design', icon: Palette },
  { title: 'Develop', icon: Code2 },
  { title: 'Test', icon: BadgeCheck },
  { title: 'Launch', icon: Rocket },
]

const STEPS = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understanding your business, goals, audience and vision.',
    image: '/images/about-studio.png',
    alt: 'Creative team discussing ideas around a workspace',
    icon: Search,
    visualTitle: 'Start with the right questions',
    visualNote: 'Audience · goals · opportunity',
    kind: 'discover',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Building a clear strategy, roadmap and creative direction.',
    image: '/images/work-3d.png',
    alt: 'Creative direction and visual planning',
    icon: Compass,
    visualTitle: 'A clear route forward',
    visualNote: 'Insight · priorities · roadmap',
    kind: 'strategy',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Turning ideas into engaging visual experiences and intuitive designs.',
    image: '/images/work-branding.png',
    alt: 'OyeCreatives brand design work',
    icon: Palette,
    visualTitle: 'Make the idea tangible',
    visualNote: 'Explore · refine · approve',
    kind: 'design',
  },
  {
    number: '04',
    title: 'Develop',
    description: 'Bringing the approved designs to life with reliable technology.',
    image: '/images/work-website.png',
    alt: 'Digital experience designed and developed by OyeCreatives',
    icon: Code2,
    visualTitle: 'Built for the real world',
    visualNote: 'Craft · test · ship',
    kind: 'develop',
  },
  {
    number: '05',
    title: 'Launch & Grow',
    description: 'Launching, measuring performance and continuously improving.',
    image: '/images/work-ads.png',
    alt: 'Campaign performance creative by OyeCreatives',
    icon: Rocket,
    visualTitle: 'Launch is a beginning',
    visualNote: 'Measure · learn · grow',
    kind: 'launch',
  },
] as const

const EXPECTATIONS = [
  { number: '01', title: 'Clear Communication', icon: MessageSquare },
  { number: '02', title: 'Transparent Process', icon: Eye },
  { number: '03', title: 'Quality-Focused Execution', icon: BadgeCheck },
  { number: '04', title: 'On-Time Delivery', icon: Clock3 },
]

const COLLABORATION = [
  { title: 'Your Idea', icon: Lightbulb },
  { title: 'Our Strategy', icon: Compass },
  { title: 'Creative Execution', icon: Sparkles },
  { title: 'Your Success', icon: TrendingUp },
]

function JourneyGraphic() {
  return (
    <div className="relative mx-auto aspect-[1.16] w-full max-w-[38rem] overflow-hidden rounded-[1.4rem] border border-[#DCEBFF] bg-[#F5FAFF] shadow-[0_24px_70px_-24px_#0066FF45]">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,#FFFFFF_0%,#F5FAFF_68%)]" />
      <div aria-hidden className="absolute inset-0 dot-grid opacity-40" />
      <div aria-hidden className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#0066FF]/[0.08] sm:h-72 sm:w-72" />
      <div aria-hidden className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#0066FF]/[0.12] sm:h-56 sm:w-56" />

      <svg aria-hidden="true" viewBox="0 0 600 400" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="journey-path" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8CBFFF" />
            <stop offset="55%" stopColor="#0066FF" />
            <stop offset="100%" stopColor="#4D9CFF" />
          </linearGradient>
        </defs>
        <path d="M60 290 C110 290 103 112 156 112 S210 290 258 290 S312 112 360 112 S418 290 465 290 S515 112 540 112" fill="none" stroke="#DCEBFF" strokeWidth="3" strokeDasharray="7 8" />
        <motion.path
          d="M60 290 C110 290 103 112 156 112 S210 290 258 290 S312 112 360 112 S418 290 465 290 S515 112 540 112"
          fill="none"
          stroke="url(#journey-path)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, delay: 0.25, ease: EASE }}
        />
      </svg>

      {JOURNEY.map(({ title, icon: Icon }, index) => {
        const xPositions = [10, 26, 43, 60, 77.5, 90]
        const yPositions = [72.5, 28, 72.5, 28, 72.5, 28]
        return (
          <motion.div
            key={title}
            initial={{ opacity: 0, scale: 0.82, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 + index * 0.12, ease: EASE }}
            className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
            style={{ left: `${xPositions[index]}%`, top: `${yPositions[index]}%` }}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3.5 + index * 0.25, delay: index * 0.18, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white bg-white/95 text-[#0066FF] shadow-[0_8px_24px_-10px_#0066FF70] sm:h-14 sm:w-14 sm:rounded-2xl"
            >
              <Icon size={20} strokeWidth={1.8} className="sm:h-[22px] sm:w-[22px]" />
            </motion.div>
            <span className="whitespace-nowrap rounded-full border border-[#DCEBFF] bg-white/90 px-2 py-0.5 text-[9px] font-bold text-[#526783] shadow-sm sm:px-2.5 sm:text-[10px]">
              {title}
            </span>
          </motion.div>
        )
      })}

      <div aria-hidden className="absolute bottom-4 right-4 h-2.5 w-2.5 rounded-full bg-[#0066FF] shadow-[0_0_16px_#0066FF88] sm:bottom-6 sm:right-6" />
      <div className="absolute left-1/2 top-1/2 flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-[#DCEBFF] bg-white/90 text-[#0066FF] shadow-[0_12px_34px_-12px_#0066FF55] backdrop-blur-sm sm:h-24 sm:w-24">
        <span className="flex flex-col items-center gap-1">
          <Sparkles size={20} />
          <span className="text-[8px] font-extrabold tracking-wide text-[#102A56] sm:text-[9px]">IDEA → IMPACT</span>
        </span>
      </div>
    </div>
  )
}

function StepArtwork({ step }: { step: (typeof STEPS)[number] }) {
  const Icon = step.icon

  return (
    <div className="group relative aspect-[1.36] overflow-hidden rounded-[1.1rem] border border-[#DCEBFF] bg-[#EAF4FF] shadow-[0_16px_42px_-20px_#0066FF50]">
      <Image
        src={step.image}
        alt={step.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 42vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/80 via-[#071A3D]/[0.08] to-[#071A3D]/[0.06]" />
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-md border border-white/50 bg-white/90 px-2.5 py-1.5 text-[10px] font-bold text-[#102A56] shadow-sm backdrop-blur-sm sm:left-5 sm:top-5 sm:text-xs">
        <Icon size={14} className="text-[#0066FF]" /> {step.title}
      </div>

      {step.kind === 'discover' && (
        <div className="absolute right-4 top-4 hidden w-32 rotate-2 rounded-lg border border-[#DCEBFF] bg-white/95 p-3 shadow-lg sm:block">
          <div className="mb-2 h-1.5 w-14 rounded-full bg-[#0066FF]/70" />
          <div className="space-y-1.5"><div className="h-1 w-full rounded-full bg-[#DCEBFF]" /><div className="h-1 w-4/5 rounded-full bg-[#EAF4FF]" /><div className="h-1 w-3/5 rounded-full bg-[#EAF4FF]" /></div>
          <div className="mt-2 inline-flex items-center gap-1 text-[8px] font-bold text-[#0066FF]"><Check size={10} /> Customer insight</div>
        </div>
      )}

      {step.kind === 'strategy' && (
        <div className="absolute right-4 top-4 hidden rotate-[-2deg] gap-1.5 rounded-lg border border-[#DCEBFF] bg-white/95 p-2.5 shadow-lg sm:flex">
          {['Focus', 'Plan', 'Move'].map((item, index) => (
            <div key={item} className="flex items-center gap-1.5">
              <span className="flex h-6 items-center rounded bg-[#EAF4FF] px-1.5 text-[8px] font-bold text-[#0066FF]">{item}</span>
              {index < 2 && <span className="h-px w-2 bg-[#4D9CFF]" />}
            </div>
          ))}
        </div>
      )}

      {step.kind === 'design' && (
        <div className="absolute right-4 top-4 hidden rotate-2 rounded-lg border border-[#DCEBFF] bg-white/95 p-2.5 shadow-lg sm:block">
          <div className="mb-2 flex gap-1">{['#0066FF', '#1683FF', '#B8D7FF', '#102A56'].map(color => <span key={color} className="h-4 w-4 rounded" style={{ backgroundColor: color }} />)}</div>
          <div className="grid grid-cols-3 gap-1"><span className="h-7 rounded bg-[#EAF4FF]" /><span className="col-span-2 h-7 rounded bg-[#0066FF]/10" /><span className="col-span-3 h-2 rounded bg-[#DCEBFF]" /></div>
        </div>
      )}

      {step.kind === 'develop' && (
        <div className="absolute right-4 top-4 hidden w-36 rotate-1 rounded-lg border border-white/10 bg-[#071A3D]/90 p-3 font-mono text-[8px] leading-relaxed text-[#B9D8FF] shadow-lg sm:block">
          <div className="mb-1 flex gap-1"><span className="h-1.5 w-1.5 rounded-full bg-[#FF8B8B]" /><span className="h-1.5 w-1.5 rounded-full bg-[#FFD36E]" /><span className="h-1.5 w-1.5 rounded-full bg-[#71D8A7]" /></div>
          <div><span className="text-[#6EB4FF]">const</span> launch = () =&gt; {'{'}</div>
          <div className="pl-2 text-[#8BE3C1]">buildWithCare()</div>
          <div>{'}'}</div>
        </div>
      )}

      {step.kind === 'launch' && (
        <div className="absolute right-4 top-4 hidden w-32 rotate-[-2deg] rounded-lg border border-[#DCEBFF] bg-white/95 p-3 shadow-lg sm:block">
          <div className="mb-1 flex items-center justify-between text-[8px] font-semibold text-[#64748B]"><span>Growth</span><span className="text-emerald-600">+32%</span></div>
          <div className="flex h-10 items-end gap-1">{[30, 42, 38, 57, 52, 70, 88].map((height, index) => <span key={index} className="flex-1 rounded-t-sm bg-gradient-to-t from-[#0066FF] to-[#69AEFF]" style={{ height: `${height}%` }} />)}</div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-5">
        <div className="text-sm font-bold sm:text-base">{step.visualTitle}</div>
        <div className="mt-1 text-[10px] text-white/75 sm:text-xs">{step.visualNote}</div>
      </div>
    </div>
  )
}

function TimelineStep({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.28, margin: '-30px' })
  const isLeft = index % 2 === 0
  const Icon = step.icon

  return (
    <div
      ref={ref}
      className="relative mb-14 grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 gap-y-5 last:mb-0 lg:mb-24 lg:grid-cols-[minmax(0,1fr)_3.5rem_minmax(0,1fr)] lg:gap-x-8"
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
        className="col-start-1 row-span-2 flex justify-center pt-1 lg:col-start-2 lg:row-span-1"
      >
        <span className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border text-[10px] font-extrabold transition-colors duration-500 lg:h-12 lg:w-12 lg:text-xs ${inView ? 'border-[#0066FF] bg-[#0066FF] text-white shadow-[0_4px_18px_-5px_#0066FF80]' : 'border-[#B9D8FF] bg-white text-[#0066FF]'}`}>
          {step.number}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: isLeft ? -26 : 26 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
        className={`col-start-2 row-start-1 flex flex-col justify-center py-1 lg:row-start-1 ${isLeft ? 'lg:col-start-1 lg:text-right' : 'lg:col-start-3 lg:text-left'}`}
      >
        <div className={`mb-3 flex items-center gap-3 ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAF4FF] text-[#0066FF]"><Icon size={17} /></span>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#0066FF]">Step {step.number}</span>
        </div>
        <h3 className="text-2xl font-extrabold text-[#102A56] sm:text-3xl">{step.title}</h3>
        <p className={`mt-2 max-w-md text-sm leading-relaxed text-[#64748B] sm:text-base ${isLeft ? 'lg:ml-auto' : ''}`}>{step.description}</p>
        <span className={`mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#526783] ${isLeft ? 'lg:ml-auto' : ''}`}>
          <span className="h-px w-7 bg-[#0066FF]/45" /> A shared milestone
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20, rotateY: isLeft ? 5 : -5 }}
        animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
        className={`col-start-2 row-start-2 lg:row-start-1 ${isLeft ? 'lg:col-start-3' : 'lg:col-start-1'}`}
        style={{ perspective: 1000 }}
      >
        <StepArtwork step={step} />
      </motion.div>
    </div>
  )
}

function ProcessTimeline() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-32" id="process-overview">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto mb-16 max-w-3xl text-center sm:mb-20"
        >
          <span className="mb-4 inline-flex rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3.5 py-1.5 text-xs font-bold text-[#0066FF]">Process Overview</span>
          <h2 className="text-4xl font-extrabold leading-tight text-[#102A56] sm:text-5xl">How We Turn Ideas <span className="gradient-text">Into Reality</span></h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#64748B] sm:text-base">A clear, collaborative journey that keeps the work moving and every decision connected to your goals.</p>
        </motion.div>

        <div className="relative mx-auto max-w-6xl">
          <div aria-hidden className="absolute bottom-4 left-[17px] top-4 w-px bg-[#DCEBFF] lg:bottom-0 lg:left-1/2 lg:top-0">
            <motion.div style={{ scaleY: lineScale, transformOrigin: 'top' }} className="h-full w-full bg-gradient-to-b from-[#4D9CFF] via-[#0066FF] to-[#1683FF]" />
          </div>
          {STEPS.map((step, index) => <TimelineStep key={step.number} step={step} index={index} />)}
        </div>
      </div>
    </section>
  )
}

function ExpectationSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="bg-[#F5FAFF] py-18 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease: EASE }} className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-3 inline-flex rounded-full border border-[#DCEBFF] bg-white px-3 py-1.5 text-xs font-bold text-[#0066FF]">The OyeCreatives promise</span>
            <h2 className="text-4xl font-extrabold text-[#102A56] sm:text-5xl">What You Can <span className="gradient-text">Expect</span></h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#64748B]">Good work comes from trust, clarity and care at every stage.</p>
        </motion.div>

        <div className="grid border-y border-[#CFE2FA] sm:grid-cols-2 lg:grid-cols-4">
          {EXPECTATIONS.map(({ number, title, icon: Icon }, index) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: index * 0.07, ease: EASE }}
              className="group flex min-h-36 items-center gap-4 border-b border-[#CFE2FA] px-2 py-6 transition-colors hover:bg-white/65 sm:px-5 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#0066FF] shadow-sm transition-transform duration-300 group-hover:-translate-y-1"><Icon size={19} /></span>
              <span>
                <span className="mb-1 block text-[10px] font-extrabold tracking-[0.12em] text-[#1683FF]">{number}</span>
                <span className="text-sm font-bold leading-snug text-[#102A56]">{title}</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CollaborationSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })

  return (
    <section className="overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, ease: EASE }} className="mb-12 max-w-2xl">
          <span className="mb-4 inline-flex rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3.5 py-1.5 text-xs font-bold text-[#0066FF]">A true partnership</span>
          <h2 className="text-4xl font-extrabold leading-tight text-[#102A56] sm:text-5xl">Built Together, <span className="gradient-text">From Start to Finish.</span></h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#64748B] sm:text-base">We believe the best work happens when ideas, strategy and collaboration come together.</p>
        </motion.div>

        <div className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {COLLABORATION.map(({ title, icon: Icon }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 + index * 0.12, ease: EASE }}
              className="relative flex min-h-28 items-center gap-4 rounded-lg border border-[#DCEBFF] bg-white px-4 py-4 shadow-[0_8px_26px_-20px_#0066FF65] lg:min-h-32 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-5 lg:shadow-none"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FF] text-[#0066FF]"><Icon size={21} /></span>
              <span className="text-sm font-bold text-[#102A56] sm:text-base">{title}</span>
              {index < COLLABORATION.length - 1 && (
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.45, delay: 0.3 + index * 0.12, ease: EASE }}
                  className="absolute -bottom-3 left-1/2 z-10 hidden h-px w-8 origin-left bg-[#4D9CFF] lg:bottom-auto lg:left-auto lg:right-[-1rem] lg:top-1/2 lg:block lg:w-8"
                />
              )}
              {index < COLLABORATION.length - 1 && <ArrowRight size={15} className="ml-auto text-[#1683FF] lg:hidden" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalProcessCta() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-br from-[#0052CC] via-[#0066FF] to-[#1683FF] py-20 text-white sm:py-24 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-40 h-96 w-96 rounded-full border border-white/15" />
      <div aria-hidden className="pointer-events-none absolute -right-8 -top-24 h-64 w-64 rounded-full border border-white/10" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-white/[0.08] blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(circle,white 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE }}
        className="relative mx-auto max-w-4xl px-6 text-center lg:px-8"
      >
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-white/90"><Sparkles size={13} /> YOUR NEXT CHAPTER</span>
        <h2 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">Ready to Turn Your Idea <span className="text-[#B9D8FF]">Into Reality?</span></h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">Let&apos;s discuss your idea and create a clear path from concept to launch.</p>
        <Link href="/book-now" className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#0052CC] shadow-[0_8px_24px_-8px_#071A3D80] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_#071A3D80]">
          Book Now <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </motion.div>
      <motion.div aria-hidden animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="pointer-events-none absolute bottom-10 right-[9%] hidden text-white/35 lg:block">
        <ArrowDown size={38} />
      </motion.div>
    </section>
  )
}

export function ProcessPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-white pb-16 pt-32 sm:pt-36 lg:pb-24 lg:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#1683FF]/[0.08] blur-[110px]" />
          <div className="absolute -bottom-44 left-[20%] h-[28rem] w-[28rem] rounded-full bg-[#0066FF]/[0.05] blur-[100px]" />
          <div className="absolute left-[8%] top-40 h-12 w-12 rotate-12 rounded-2xl border border-[#0066FF]/15 bg-[#EAF4FF]/70" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-8">
          <div className="flex flex-col items-start gap-6">
            <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="inline-flex items-center gap-2 rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3.5 py-1.5 text-xs font-bold text-[#0066FF]">
              <Sparkles size={13} /> Our Process
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08, ease: EASE }} className="max-w-2xl text-5xl font-extrabold leading-[1.04] text-[#102A56] sm:text-6xl lg:text-[4.25rem]">
              From Idea to Impact,<br /><span className="gradient-text">We Make Every Step Count.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18, ease: EASE }} className="max-w-xl text-base leading-relaxed text-[#64748B] sm:text-lg">
              From the first conversation to the final launch, our process keeps every project clear, creative and focused on results.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.26, ease: EASE }} className="flex flex-wrap gap-3">
              <Link href="/book-now" className="group inline-flex items-center gap-2 rounded-lg btn-primary px-5 py-3 text-sm font-semibold text-white">
                Book Now <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link href="/portfolio" className="group inline-flex items-center gap-2 rounded-lg border border-[#DCEBFF] bg-white px-5 py-3 text-sm font-semibold text-[#102A56] transition-colors hover:border-[#0066FF]/40 hover:text-[#0066FF]">
                Explore Our Work <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.97, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.14, ease: EASE }}>
            <JourneyGraphic />
          </motion.div>
        </div>
      </section>

      <ProcessTimeline />
      <ExpectationSection />
      <CollaborationSection />
      <FinalProcessCta />
    </>
  )
}