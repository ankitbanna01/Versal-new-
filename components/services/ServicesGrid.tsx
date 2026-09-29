'use client'

import { useRef, useCallback } from 'react'
import Link from 'next/link'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion'
import {
  ArrowRight,
  Globe,
  Code2,
  Palette,
  Megaphone,
  Layers,
  Pen,
  Camera,
  Search,
  Target,
} from 'lucide-react'
import {
  WebVisual,
  SoftwareVisual,
  GraphicVisual,
  MarketingVisual,
  BrandingVisual,
  LogoVisual,
  PhotoVisual,
  GoogleAdsVisual,
  MetaAdsVisual,
} from './ServiceVisual'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ─────────────────────────────────────────────
   Sub-service data — all 9 services
───────────────────────────────────────────── */
const SUB_SERVICES: Record<string, { label: string; icon: React.ElementType }[]> = {
  '01': [
    { label: 'Business Website', icon: Globe },
    { label: 'E-commerce Store', icon: Globe },
    { label: 'Landing Page', icon: Globe },
    { label: 'UI/UX Design', icon: Palette },
    { label: 'WordPress', icon: Code2 },
    { label: 'Webflow / Framer', icon: Code2 },
  ],
  '02': [
    { label: 'Custom Software', icon: Code2 },
    { label: 'CRM Development', icon: Code2 },
    { label: 'ERP Systems', icon: Code2 },
    { label: 'Web Applications', icon: Globe },
    { label: 'Business Automation', icon: Code2 },
    { label: 'Dashboard Dev', icon: Layers },
  ],
  '03': [
    { label: 'Social Media Design', icon: Palette },
    { label: 'Brochure Design', icon: Palette },
    { label: 'Flyer / Poster', icon: Palette },
    { label: 'Banner Design', icon: Palette },
    { label: 'Packaging Design', icon: Layers },
    { label: 'Presentation Design', icon: Layers },
  ],
  '04': [
    { label: 'Content Strategy', icon: Megaphone },
    { label: 'Social Media Mgmt', icon: Megaphone },
    { label: 'Email Marketing', icon: Megaphone },
    { label: 'SEO', icon: Search },
    { label: 'Community Building', icon: Megaphone },
    { label: 'Influencer Marketing', icon: Target },
  ],
  '05': [
    { label: 'Brand Identity', icon: Layers },
    { label: 'Brand Guidelines', icon: Layers },
    { label: 'Brand Strategy', icon: Target },
    { label: 'Rebranding', icon: Pen },
    { label: 'Stationery Design', icon: Palette },
    { label: 'Brand Voice & Tone', icon: Pen },
  ],
  '06': [
    { label: 'Wordmark Logo', icon: Pen },
    { label: 'Symbol / Icon', icon: Pen },
    { label: 'Combination Mark', icon: Pen },
    { label: 'Monogram Logo', icon: Pen },
    { label: 'Logo Animation', icon: Layers },
    { label: 'Full Logo Suite', icon: Layers },
  ],
  '07': [
    { label: 'Product Photography', icon: Camera },
    { label: 'Corporate Portraits', icon: Camera },
    { label: 'Food Photography', icon: Camera },
    { label: 'Lifestyle Shoots', icon: Camera },
    { label: 'Real Estate Photos', icon: Camera },
    { label: 'Photo Editing', icon: Palette },
  ],
  '08': [
    { label: 'Search Ads', icon: Search },
    { label: 'Display Ads', icon: Target },
    { label: 'Performance Max', icon: Target },
    { label: 'Shopping Ads', icon: Search },
    { label: 'Remarketing', icon: Target },
    { label: 'Google Analytics', icon: Layers },
  ],
  '09': [
    { label: 'Facebook Ads', icon: Target },
    { label: 'Instagram Ads', icon: Target },
    { label: 'Reels Ads', icon: Target },
    { label: 'Story Ads', icon: Target },
    { label: 'Retargeting', icon: Target },
    { label: 'Audience Research', icon: Search },
  ],
}

/* ─────────────────────────────────────────────
   Full service definitions
───────────────────────────────────────────── */
const SERVICES = [
  {
    num: '01', title: 'Website Design\n& Development', short: 'Web',
    description: 'We craft fast, beautiful, and conversion-optimised websites that work hard for your business — from bold landing pages to complex web applications.',
    tags: ['UI/UX Design', 'Next.js', 'SEO Optimised', 'CMS'],
    href: '/services/website-design-development', Visual: WebVisual, bg: 'bg-white',
  },
  {
    num: '02', title: 'Software\nDevelopment', short: 'Software',
    description: 'Bespoke web apps, dashboards, and platforms engineered for scale. We turn complex business logic into clean, maintainable software.',
    tags: ['React', 'Node.js', 'APIs', 'Databases'],
    href: '/services/software-development', Visual: SoftwareVisual, bg: 'bg-[#F5FAFF]',
  },
  {
    num: '03', title: 'Graphic\nDesign', short: 'Design',
    description: 'Print, digital, social — every touchpoint elevated. Posters, packaging, presentations and marketing collateral that make your brand impossible to ignore.',
    tags: ['Print', 'Social Media', 'Presentations', 'Packaging'],
    href: '/services/graphic-design', Visual: GraphicVisual, bg: 'bg-white',
  },
  {
    num: '04', title: 'Digital\nMarketing', short: 'Marketing',
    description: 'Strategy-led content, social media management, and email campaigns that grow your audience, build authority, and drive consistent inbound leads.',
    tags: ['Content Strategy', 'Social Media', 'Email', 'SEO'],
    href: '/services/digital-marketing', Visual: MarketingVisual, bg: 'bg-[#F5FAFF]',
  },
  {
    num: '05', title: 'Branding', short: 'Branding',
    description: 'Complete brand systems built to last — visual identity, tone of voice, guidelines, and everything your team needs to show up consistently across every channel.',
    tags: ['Identity', 'Guidelines', 'Typography', 'Colour'],
    href: '/services/branding', Visual: BrandingVisual, bg: 'bg-white',
  },
  {
    num: '06', title: 'Logo\nDesign', short: 'Logo',
    description: 'A logo is the cornerstone of your brand. We design marks that are timeless, versatile, and instantly recognisable — crafted with intent, not templates.',
    tags: ['Wordmarks', 'Symbols', 'Monograms', 'Full Suite'],
    href: '/services/logo-design', Visual: LogoVisual, bg: 'bg-[#F5FAFF]',
  },
  {
    num: '07', title: 'Photography', short: 'Photo',
    description: 'High-quality commercial photography for brands, products, food, real estate and more. Images that tell your story with authenticity and style.',
    tags: ['Commercial', 'Product', 'Lifestyle', 'Editing'],
    href: '/services/photography', Visual: PhotoVisual, bg: 'bg-white',
  },
  {
    num: '08', title: 'Google\nAds', short: 'Google Ads',
    description: 'Search, Display, and Performance Max campaigns engineered for ROI. We manage everything from strategy and creative to bidding and optimisation.',
    tags: ['Search Ads', 'Display', 'Remarketing', 'Analytics'],
    href: '/services/google-ads', Visual: GoogleAdsVisual, bg: 'bg-[#F5FAFF]',
  },
  {
    num: '09', title: 'Meta\nAds', short: 'Meta Ads',
    description: 'Facebook and Instagram advertising that reaches the right people at the right moment. Creative-led campaigns built to convert cold audiences into loyal customers.',
    tags: ['Facebook', 'Instagram', 'Retargeting', 'Creative'],
    href: '/services/meta-ads', Visual: MetaAdsVisual, bg: 'bg-white',
  },
]

/* ─────────────────────────────────────────────
   Sub-service pill chip
───────────────────────────────────────────── */
function SubChip({ label, icon: Icon, index }: { label: string; icon: React.ElementType; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35, delay: index * 0.055, ease: EASE }}
      whileHover={{ y: -2, scale: 1.04 }}
      className="group flex items-center gap-2 rounded-xl border border-[#DCEBFF] bg-white px-3 py-2.5 cursor-default
                 hover:border-[#0066FF]/40 hover:bg-[#F5FAFF] hover:shadow-[0_4px_16px_-4px_#0066FF18]
                 transition-shadow duration-200"
    >
      <div className="w-6 h-6 rounded-lg bg-[#EAF4FF] flex items-center justify-center shrink-0
                      group-hover:bg-[#0066FF] transition-colors duration-200">
        <Icon size={11} className="text-[#0066FF] group-hover:text-white transition-colors duration-200" />
      </div>
      <span className="text-xs font-semibold text-[#64748B] group-hover:text-[#102A56] transition-colors duration-200 whitespace-nowrap">
        {label}
      </span>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   3D tilt visual panel — mouse-reactive
───────────────────────────────────────────── */
function TiltVisual({
  service,
  inView,
  reversed,
}: {
  service: typeof SERVICES[0]
  inView: boolean
  reversed: boolean
}) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 120, damping: 18 })
  const sry = useSpring(ry, { stiffness: 120, damping: 18 })

  // reflection opacity — peaks at the extremes of the tilt range
  const reflectOpacity = useTransform(sry, [-10, 0, 10], [0.12, 0, 0.12])

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width - 0.5
    const cy = (e.clientY - rect.top) / rect.height - 0.5
    ry.set(cx * 10)
    rx.set(-cy * 8)
  }, [rx, ry])

  const handleLeave = useCallback(() => {
    rx.set(0)
    ry.set(0)
  }, [rx, ry])

  return (
    <motion.div
      initial={{ opacity: 0, x: reversed ? -40 : 40, rotateY: reversed ? -8 : 8 }}
      animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.75, delay: 0.12, ease: EASE }}
      className="relative"
      style={{ perspective: 1000 }}
    >
      {/* Number watermark */}
      <div
        aria-hidden
        className="absolute -bottom-4 -right-4 text-[7rem] font-black leading-none text-[#0066FF]/[0.035]
                   select-none pointer-events-none z-0"
      >
        {service.num}
      </div>

      {/* Outer glow ring */}
      <div aria-hidden className="absolute -inset-5 rounded-3xl border border-[#0066FF]/5 pointer-events-none" />

      {/* Tiltable visual card */}
      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        className="relative w-full aspect-[4/3] rounded-2xl border border-[#DCEBFF] overflow-hidden
                   shadow-[0_20px_60px_-16px_#0066FF18] bg-[#F5FAFF] z-10 cursor-default"
      >
        <service.Visual />

        {/* Subtle inner reflection on tilt */}
        <motion.div
          style={{ opacity: reflectOpacity }}
          className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-br from-white/20 to-transparent"
          aria-hidden
        />
      </motion.div>

      {/* Floating accent badge — top corner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.55, duration: 0.4, ease: EASE }}
        className={`absolute -top-3 ${reversed ? 'left-4' : 'right-4'} glass rounded-xl px-3 py-1.5 z-20 shadow-blue float-slow`}
      >
        <span className="text-[10px] font-black tracking-widest text-[#0066FF] uppercase">
          {service.num} · {service.short}
        </span>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Individual service row
───────────────────────────────────────────── */
function ServiceRow({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reversed = index % 2 !== 0

  const subs = SUB_SERVICES[service.num] ?? []

  return (
    <div
      ref={ref}
      id={`service-${service.num}`}
      className={`relative ${service.bg} overflow-hidden`}
    >
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DCEBFF] to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-start ${reversed ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''
          }`}>

          {/* ── TEXT SIDE ── */}
          <div className="flex flex-col gap-7">

            {/* Number + label */}
            <motion.div
              initial={{ opacity: 0, x: reversed ? 20 : -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, ease: EASE }}
              className="flex items-center gap-3"
            >
              <span className="text-xs font-black tracking-[0.2em] text-[#0066FF] uppercase">{service.num}</span>
              <div className="h-px w-8 bg-[#0066FF]/40" />
              <span className="text-xs font-semibold tracking-widest text-[#64748B] uppercase">{service.short}</span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
              className="text-4xl sm:text-5xl lg:text-[3.2rem] font-extrabold leading-[1.06] tracking-tight text-[#102A56] whitespace-pre-line"
            >
              {service.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
              className="text-lg text-[#64748B] leading-relaxed max-w-lg"
            >
              {service.description}
            </motion.p>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.24, ease: EASE }}
              className="flex flex-wrap gap-2"
            >
              {service.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3 py-1 text-xs font-semibold text-[#0066FF]"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Sub-services */}
            {subs.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-[#DCEBFF]" />
                  <span className="text-[10px] font-black tracking-[0.2em] text-[#64748B] uppercase">
                    What&apos;s included
                  </span>
                  <div className="h-px flex-1 bg-[#DCEBFF]" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {subs.map((sub, i) => (
                    <SubChip key={sub.label} label={sub.label} icon={sub.icon} index={i} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.38, ease: EASE }}
            >
              <Link
                href={service.href}
                className="group inline-flex items-center gap-2.5 text-sm font-bold text-[#102A56] hover:text-[#0066FF] transition-colors duration-200"
              >
                <span className="relative">
                  Explore Service
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#0066FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </span>
                <motion.span
                  whileHover={{ x: 3 }}
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-[#DCEBFF]
                             group-hover:border-[#0066FF] group-hover:bg-[#0066FF] transition-all duration-200"
                >
                  <ArrowRight size={13} className="text-[#0066FF] group-hover:text-white transition-colors duration-200" />
                </motion.span>
              </Link>
            </motion.div>
          </div>

          {/* ── VISUAL SIDE ── */}
          <TiltVisual service={service} inView={inView} reversed={reversed} />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Sticky scroll block  (services 04-06)
───────────────────────────────────────────── */
function StickyVisualPane({
  children,
  scrollYProgress,
  index,
  total,
}: {
  children: React.ReactNode
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  index: number
  total: number
}) {
  const start = index / total
  const end = (index + 1) / total
  const opacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0.97, 1, 1, 0.97])
  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0">
      {children}
    </motion.div>
  )
}

function StickyDot({
  scrollYProgress, index, total, label,
}: {
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  index: number; total: number; label: string
}) {
  const start = index / total
  const end = (index + 1) / total
  const opacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0.3, 1, 1, 0.3])
  const scale = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0.8, 1, 1, 0.8])
  return (
    <motion.div style={{ opacity, scale }} className="flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
      <span className="text-[10px] font-semibold text-[#0066FF] whitespace-nowrap">{label}</span>
    </motion.div>
  )
}

function StickyServiceContent({ service }: { service: typeof SERVICES[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const subs = SUB_SERVICES[service.num] ?? []

  return (
    <div ref={ref} className="flex flex-col gap-7 max-w-lg">
      {/* Mobile visual */}
      <div className="lg:hidden w-full aspect-[4/3] rounded-2xl border border-[#DCEBFF] overflow-hidden shadow-blue bg-white">
        <service.Visual />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE }}
        className="flex items-center gap-3"
      >
        <span className="text-xs font-black tracking-[0.2em] text-[#0066FF] uppercase">{service.num}</span>
        <div className="h-px w-8 bg-[#0066FF]/40" />
        <span className="text-xs font-semibold tracking-widest text-[#64748B] uppercase">{service.short}</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
        className="text-4xl sm:text-5xl font-extrabold leading-[1.06] tracking-tight text-[#102A56] whitespace-pre-line"
      >
        {service.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.16, ease: EASE }}
        className="text-lg text-[#64748B] leading-relaxed"
      >
        {service.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.24, ease: EASE }}
        className="flex flex-wrap gap-2"
      >
        {service.tags.map(tag => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3 py-1 text-xs font-semibold text-[#0066FF]"
          >
            {tag}
          </span>
        ))}
      </motion.div>

      {/* Sub-services in sticky view */}
      {subs.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-[#DCEBFF]" />
            <span className="text-[10px] font-black tracking-[0.2em] text-[#64748B] uppercase">
              What&apos;s included
            </span>
            <div className="h-px flex-1 bg-[#DCEBFF]" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {subs.map((sub, i) => (
              <SubChip key={sub.label} label={sub.label} icon={sub.icon} index={i} />
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.38, ease: EASE }}
      >
        <Link
          href={service.href}
          className="group inline-flex items-center gap-2.5 text-sm font-bold text-[#102A56] hover:text-[#0066FF] transition-colors duration-200"
        >
          <span className="relative">
            Explore Service
            <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#0066FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </span>
          <motion.span
            whileHover={{ x: 3 }}
            className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-[#DCEBFF]
                       group-hover:border-[#0066FF] group-hover:bg-[#0066FF] transition-all duration-200"
          >
            <ArrowRight size={13} className="text-[#0066FF] group-hover:text-white transition-colors duration-200" />
          </motion.span>
        </Link>
      </motion.div>
    </div>
  )
}

function StickyScrollBlock() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const subset = SERVICES.slice(3, 6)

  return (
    <div ref={containerRef} className="relative bg-[#F5FAFF]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#DCEBFF] to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-[#DCEBFF]" />
          <span className="text-xs font-black tracking-[0.25em] text-[#0066FF] uppercase">Marketing & Identity</span>
          <div className="h-px flex-1 bg-[#DCEBFF]" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-20">

          {/* Sticky visual */}
          <div className="hidden lg:block sticky top-24 h-[calc(100vh-8rem)] self-start">
            <div className="relative h-full flex items-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl border border-[#DCEBFF] overflow-hidden
                              shadow-[0_20px_60px_-16px_#0066FF18] bg-white">
                {subset.map((svc, i) => (
                  <StickyVisualPane
                    key={svc.num}
                    scrollYProgress={scrollYProgress}
                    index={i}
                    total={subset.length}
                  >
                    <svc.Visual />
                  </StickyVisualPane>
                ))}
              </div>

              {/* Step dots */}
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                {subset.map((svc, i) => (
                  <StickyDot
                    key={svc.num}
                    scrollYProgress={scrollYProgress}
                    index={i}
                    total={subset.length}
                    label={svc.short}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Scrolling text */}
          <div className="flex flex-col">
            {subset.map(service => (
              <div
                key={service.num}
                id={`service-${service.num}`}
                className="min-h-screen lg:min-h-[80vh] flex items-center py-16 lg:py-0"
              >
                <StickyServiceContent service={service} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Marquee ticker
───────────────────────────────────────────── */
function ServiceMarquee() {
  const items = SERVICES.map(s => s.short)
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-[#DCEBFF] bg-[#EAF4FF] py-4">
      <motion.div
        animate={{ x: [0, '-50%'] }}
        transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
        className="flex items-center gap-8 whitespace-nowrap w-max"
      >
        {doubled.map((label, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="text-xs font-black tracking-[0.2em] text-[#0066FF] uppercase">{label}</span>
            <span className="text-[#0066FF]/30 text-lg font-light">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Section divider
───────────────────────────────────────────── */
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="bg-white border-y border-[#DCEBFF]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-5">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-[#DCEBFF]" />
          <span className="text-xs font-black tracking-[0.25em] text-[#64748B] uppercase">{label}</span>
          <div className="h-px flex-1 bg-[#DCEBFF]" />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Main export — structure unchanged
───────────────────────────────────────────── */
export function ServicesGrid() {
  const topServices = SERVICES.slice(0, 3)
  const bottomServices = SERVICES.slice(6, 9)

  return (
    <section aria-label="Our Services">
      <ServiceMarquee />
      <SectionDivider label="Creative & Digital" />

      {topServices.map((service, i) => (
        <ServiceRow key={service.num} service={service} index={i} />
      ))}

      <StickyScrollBlock />

      <SectionDivider label="Advertising & Content" />
      {bottomServices.map((service, i) => (
        <ServiceRow key={service.num} service={service} index={i} />
      ))}
    </section>
  )
}
