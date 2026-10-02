'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Code2,
  Compass,
  Layers,
  Megaphone,
  MessageCircle,
  Minus,
  Palette,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'
import {
  COMPARISON_FEATURES,
  FAQS,
  INCLUDED_FEATURES,
  PERIOD_COPY,
  PRICING_PERIODS,
  PRICING_PLANS,
  SERVICE_QUOTES,
  type PricingPeriod,
} from '@/lib/pricing'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const FEATURE_ICONS = {
  strategy: Compass,
  design: Palette,
  development: Code2,
  tracking: TrendingUp,
  communication: MessageCircle,
  support: ShieldCheck,
} as const

function PricingArtwork() {
  return (
    <div className="relative mx-auto aspect-[1.22] w-full max-w-xl overflow-hidden rounded-[1.2rem] border border-[#DCEBFF] bg-[#F5FAFF] shadow-[0_22px_62px_-24px_#0066FF50]">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_42%,#FFFFFF_0%,#EAF4FF_75%)]" />
      <div aria-hidden className="absolute inset-0 dot-grid opacity-35" />
      <motion.div animate={{ rotate: [8, 13, 8], y: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-[12%] top-[12%] h-14 w-14 rounded-2xl border border-[#0066FF]/15 bg-white/65" />
      <motion.div animate={{ rotate: [-8, -3, -8], y: [0, 6, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-[11%] left-[8%] h-10 w-10 rounded-xl border border-[#0066FF]/15 bg-[#DCEBFF]/55" />

      <motion.div initial={{ opacity: 0, y: 10, rotateY: -5 }} animate={{ opacity: 1, y: 0, rotateY: 0 }} transition={{ duration: 0.65, ease: EASE }} className="absolute left-[11%] top-[17%] w-[61%] rounded-xl border border-[#DCEBFF] bg-white p-4 shadow-[0_16px_40px_-18px_#0066FF55] sm:p-5" style={{ perspective: 900 }}>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[10px] font-bold text-[#64748B]">PROJECT SCOPE</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF4FF] text-[#0066FF]"><Layers size={16} /></span>
        </div>
        <div className="mb-3 flex items-end gap-2">
          <span className="h-7 w-7 rounded-md bg-[#0066FF]" />
          <span className="h-9 w-9 rounded-lg bg-[#4D9CFF]" />
          <span className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#7AB8FF]" />
          <span className="ml-auto flex h-9 items-center rounded-md border border-[#DCEBFF] bg-[#F5FAFF] px-2 text-[10px] font-bold text-[#0066FF]">Custom</span>
        </div>
        <div className="space-y-2">{[0, 1, 2].map(index => <div key={index} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#1683FF]" /><span className={`h-1.5 rounded-full bg-[#DCEBFF] ${index === 0 ? 'w-4/5' : index === 1 ? 'w-3/5' : 'w-2/5'}`} /></div>)}</div>
        <div className="mt-4 flex items-center justify-between border-t border-[#EAF4FF] pt-3"><span className="text-[9px] text-[#74849A]">Scope shaped around you</span><span className="text-[10px] font-bold text-[#0066FF]">Let&apos;s plan <ArrowUpRight size={11} className="inline" /></span></div>
      </motion.div>

      <motion.div animate={{ y: [0, -6, 0], rotate: [0, 1, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-[7%] top-[34%] flex w-32 flex-col gap-2 rounded-xl border border-[#DCEBFF] bg-white/95 p-3 shadow-[0_14px_34px_-18px_#0066FF70] sm:w-36">
        <div className="flex items-center gap-2 text-[10px] font-bold text-[#102A56]"><Target size={14} className="text-[#0066FF]" /> Growth goals</div>
        {[0, 1, 2].map(index => <span key={index} className={`h-1.5 rounded-full ${index === 0 ? 'w-full bg-[#A8CBFF]' : index === 1 ? 'w-4/5 bg-[#DCEBFF]' : 'w-3/5 bg-[#EAF4FF]'}`} />)}
      </motion.div>

      <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }} className="absolute bottom-[14%] right-[10%] flex items-center gap-2 rounded-lg border border-[#DCEBFF] bg-white/95 px-3 py-2 shadow-blue">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EAF4FF] text-[#0066FF]"><Search size={15} /></span>
        <span className="text-[10px] font-bold text-[#102A56]">Clear scope. Clear quote.</span>
      </motion.div>
      <span aria-hidden className="absolute right-[22%] top-[15%] h-2.5 w-2.5 rounded-full bg-[#1683FF] shadow-[0_0_16px_#1683FF70]" />
    </div>
  )
}

function PlanCard({ plan, period }: { plan: (typeof PRICING_PLANS)[number]; period: PricingPeriod }) {
  const isGrowth = plan.slug === 'growth'

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, ease: EASE }}
      whileHover={{ y: -3 }}
      className={`relative flex h-full flex-col rounded-xl border bg-white p-6 transition-shadow sm:p-7 ${isGrowth ? 'border-[#1683FF] shadow-[0_18px_48px_-24px_#0066FF70] lg:-translate-y-2' : 'border-[#DCEBFF] shadow-[0_12px_34px_-28px_#0066FF60] hover:shadow-[0_18px_40px_-24px_#0066FF55]'}`}
    >
      {isGrowth && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#0066FF] px-3 py-1 text-[10px] font-bold text-white shadow-[0_4px_12px_-4px_#0066FF70]">Featured Plan</span>}
      <div className="mb-4 flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${isGrowth ? 'bg-[#0066FF]' : plan.slug === 'pro' ? 'bg-[#4D9CFF]' : 'bg-[#82B8FF]'}`} />
        <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#0066FF]">{plan.name}</span>
      </div>
      <h3 className="text-xl font-extrabold text-[#102A56]">{plan.description}</h3>
      <div className="mt-6 border-y border-[#EAF4FF] py-5">
        <div className="text-3xl font-extrabold tracking-tight text-[#102A56]">Custom Quote</div>
        <div className="mt-1 text-xs font-medium text-[#74849A]">Scoped for a {PERIOD_COPY[period]}</div>
      </div>
      <div className="mt-5 space-y-3">
        {plan.features.map(feature => <div key={feature} className="flex items-start gap-2.5 text-sm text-[#526783]"><Check size={15} className="mt-0.5 shrink-0 text-[#1683FF]" /> <span>{feature}</span></div>)}
      </div>
      <Link href={`/book-now?plan=${plan.slug}`} className={`group mt-7 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition-all ${isGrowth ? 'btn-primary text-white' : 'border border-[#DCEBFF] text-[#0066FF] hover:border-[#1683FF] hover:bg-[#F5FAFF]'}`}>
        Choose {plan.name} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.article>
  )
}

function PlanComparison({ period }: { period: PricingPeriod }) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <span className="mb-3 inline-flex rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3 py-1.5 text-xs font-bold text-[#0066FF]">At a glance</span>
          <h2 className="text-3xl font-extrabold text-[#102A56] sm:text-4xl">Compare Plans</h2>
          <p className="mt-2 text-sm text-[#64748B]">Each engagement is scoped to your goals; this comparison shows the usual focus of each plan.</p>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[#DCEBFF] [scrollbar-width:thin]" style={{ contain: 'layout' }}>
          <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
            <thead className="bg-[#F5FAFF]">
              <tr>
                <th scope="col" className="min-w-52 bg-[#F5FAFF] px-4 py-4 text-xs font-bold uppercase tracking-wide text-[#64748B] sm:px-6">Plan features</th>
                {PRICING_PLANS.map(plan => <th scope="col" key={plan.slug} className={`min-w-36 px-4 py-4 text-center font-extrabold text-[#102A56] sm:px-6 ${plan.slug === 'growth' ? 'text-[#0066FF]' : ''}`}>{plan.name}<span className="mt-1 block text-[10px] font-medium text-[#8292A8]">{PERIOD_COPY[period]}</span></th>)}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_FEATURES.map((feature, index) => (
                <tr key={feature.title} className={index % 2 === 0 ? 'bg-white' : 'bg-[#FBFDFF]'}>
                  <th scope="row" className={`px-4 py-3.5 text-xs font-semibold text-[#526783] sm:px-6 ${index % 2 === 0 ? 'bg-white' : 'bg-[#FBFDFF]'}`}>{feature.title}</th>
                  {PRICING_PLANS.map(plan => {
                    const included = feature[plan.slug]
                    return <td key={plan.slug} className="px-4 py-3.5 text-center">
                      {included ? <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0066FF]"><Check size={14} /><span className="sr-only">Included</span></span> : <span className="text-[#9AA8BA]" aria-label="Not included">—</span>}
                    </td>
                  })}
                </tr>
              ))}
              <tr className="border-t border-[#DCEBFF] bg-[#F5FAFF]">
                <th scope="row" className="bg-[#F5FAFF] px-4 py-4 text-xs font-bold text-[#102A56] sm:px-6">Pricing</th>
                {PRICING_PLANS.map(plan => <td key={plan.slug} className="px-4 py-4 text-center text-xs font-bold text-[#0066FF]">Custom quote</td>)}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export function PricingPage() {
  const [period, setPeriod] = useState<PricingPeriod>('Monthly')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <section className="relative overflow-hidden bg-white pb-16 pt-32 sm:pt-36 lg:pb-20 lg:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-36 -top-36 h-[30rem] w-[30rem] rounded-full bg-[#1683FF]/[0.08] blur-[105px]" />
          <div className="absolute -bottom-36 left-[10%] h-72 w-72 rounded-full bg-[#0066FF]/[0.045] blur-[90px]" />
          <div className="absolute left-[8%] top-40 h-11 w-11 rotate-12 rounded-2xl border border-[#0066FF]/15 bg-[#EAF4FF]/60" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[0.94fr_1.06fr] lg:gap-14 lg:px-8">
          <div className="flex flex-col items-start gap-6">
            <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="inline-flex items-center gap-2 rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3.5 py-1.5 text-xs font-bold text-[#0066FF]"><Sparkles size={13} /> Our Pricing</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.06, ease: EASE }} className="max-w-xl text-5xl font-extrabold leading-[1.04] text-[#102A56] sm:text-6xl lg:text-[4.25rem]">
              Plans Designed to<br /><span className="gradient-text">Grow Your Business.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15, ease: EASE }} className="max-w-xl text-base leading-relaxed text-[#64748B] sm:text-lg">
              Flexible packages designed around your goals, budget and growth. Choose a plan that works for you or talk to us for a custom solution.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.22, ease: EASE }} className="flex flex-wrap gap-3">
              <Link href="/book-now" className="group inline-flex items-center gap-2 rounded-lg btn-primary px-5 py-3 text-sm font-semibold text-white">Book Now <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></Link>
              <Link href="/book-now" className="group inline-flex items-center gap-2 rounded-lg border border-[#DCEBFF] bg-white px-5 py-3 text-sm font-semibold text-[#102A56] transition-colors hover:border-[#B8D7FF] hover:text-[#0066FF]">Talk to Us <MessageCircle size={15} /></Link>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.97, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.12, ease: EASE }}><PricingArtwork /></motion.div>
        </div>
      </section>

      <section className="bg-[#F5FAFF] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-9 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="mb-3 inline-flex rounded-full border border-[#DCEBFF] bg-white px-3 py-1.5 text-xs font-bold text-[#0066FF]">Engagement plans</span>
              <h2 className="text-3xl font-extrabold text-[#102A56] sm:text-4xl">Choose a starting <span className="gradient-text">point.</span></h2>
              <p className="mt-2 text-sm leading-relaxed text-[#64748B]">Plan rates are quoted after scope and deliverables are agreed. No fixed prices or discounts are shown because none are configured in the current site data.</p>
            </div>
            <div className="inline-flex w-fit max-w-full overflow-x-auto rounded-lg border border-[#DCEBFF] bg-white p-1 [scrollbar-width:none]" role="group" aria-label="Choose engagement period">
              {PRICING_PERIODS.map(option => {
                const active = period === option
                return <button key={option} type="button" aria-pressed={active} onClick={() => setPeriod(option)} className={`relative min-h-10 whitespace-nowrap rounded-md px-3 text-xs font-semibold transition-colors sm:px-4 sm:text-sm ${active ? 'text-white' : 'text-[#64748B] hover:text-[#0066FF]'}`}>
                  {active && <motion.span layoutId="pricing-period" className="absolute inset-0 -z-0 rounded-md bg-[#0066FF]" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />}
                  <span className="relative z-10">{option}</span>
                </button>
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={period} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }} className="mb-5 flex items-center gap-2 text-xs text-[#74849A]">
              <Clock3 size={14} className="text-[#1683FF]" /> Showing options for a <span className="font-semibold text-[#526783]">{PERIOD_COPY[period]}</span>. Exact fees are confirmed in your quote.
            </motion.div>
          </AnimatePresence>

          <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
            {PRICING_PLANS.map(plan => <PlanCard key={plan.slug} plan={plan} period={period} />)}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mb-3 inline-flex rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3 py-1.5 text-xs font-bold text-[#0066FF]">Custom scope</span>
              <h2 className="text-3xl font-extrabold text-[#102A56] sm:text-4xl">Need a Specific Service?</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#64748B]">Request a quote for one service or combine a few into a custom engagement.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_QUOTES.map((service, index) => (
              <motion.article key={service.name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.35, delay: index * 0.035, ease: EASE }} className="flex items-start justify-between gap-3 rounded-lg border border-[#DCEBFF] bg-white p-4 transition-colors hover:border-[#B8D7FF] hover:bg-[#FBFDFF]">
                <div><h3 className="text-sm font-bold text-[#102A56]">{service.name}</h3><p className="mt-1 text-xs leading-relaxed text-[#74849A]">{service.description}</p></div>
                <Link aria-label={`Get a quote for ${service.name}`} href={{ pathname: '/book-now', query: { service: service.name } }} className="group mt-0.5 inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-[#0066FF]">Quote <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" /></Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5FAFF] py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-3 inline-flex rounded-full border border-[#DCEBFF] bg-white px-3 py-1.5 text-xs font-bold text-[#0066FF]">Flexible by design</span>
            <h2 className="text-3xl font-extrabold text-[#102A56] sm:text-4xl">Need Something <span className="gradient-text">Custom?</span></h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#64748B] sm:text-base">Every business is different. If our packages don&apos;t fit your requirements, we&apos;ll create a custom plan around your goals.</p>
          </div>
          <Link href="/book-now?plan=custom" className="group inline-flex w-fit items-center gap-2 rounded-lg btn-primary px-5 py-3 text-sm font-semibold text-white">Build My Custom Plan <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></Link>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-9 max-w-2xl">
            <span className="mb-3 inline-flex rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3 py-1.5 text-xs font-bold text-[#0066FF]">Our approach</span>
            <h2 className="text-3xl font-extrabold text-[#102A56] sm:text-4xl">What&apos;s Included <span className="gradient-text">With Our Plans?</span></h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {INCLUDED_FEATURES.map((feature, index) => {
              const Icon = FEATURE_ICONS[feature.icon]
              return <motion.div key={feature.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.35, delay: index * 0.05, ease: EASE }} className="group flex items-center gap-3 rounded-lg border border-[#DCEBFF] bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-[#B8D7FF] hover:shadow-[0_10px_28px_-22px_#0066FF80]">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[#EAF4FF] text-[#0066FF] transition-colors group-hover:bg-[#0066FF] group-hover:text-white"><Icon size={18} /></span>
                <span className="text-sm font-bold text-[#102A56]">{feature.title}</span>
              </motion.div>
            })}
          </div>
        </div>
      </section>

      <PlanComparison period={period} />

      <section className="bg-[#F5FAFF] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="mb-3 inline-flex rounded-full border border-[#DCEBFF] bg-white px-3 py-1.5 text-xs font-bold text-[#0066FF]">A few answers</span>
            <h2 className="text-3xl font-extrabold text-[#102A56] sm:text-4xl">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-[#DCEBFF] border-y border-[#DCEBFF] bg-white px-4 sm:px-6">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index
              return <div key={faq.question}>
                <button type="button" aria-expanded={isOpen} onClick={() => setOpenFaq(current => current === index ? null : index)} className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-bold text-[#102A56] transition-colors hover:text-[#0066FF] sm:text-base">
                  {faq.question}<span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isOpen ? 'bg-[#0066FF] text-white' : 'bg-[#EAF4FF] text-[#0066FF]'}`}>{isOpen ? <Minus size={15} /> : <Plus size={15} />}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.24, ease: EASE }} className="overflow-hidden"><p className="max-w-3xl pb-5 pr-10 text-sm leading-relaxed text-[#64748B]">{faq.answer}</p></motion.div>}
                </AnimatePresence>
              </div>
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#0052CC] via-[#0066FF] to-[#1683FF] py-16 text-white sm:py-20 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-40 h-80 w-80 rounded-full border border-white/15" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-white/[0.08] blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(circle,white 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, ease: EASE }} className="relative mx-auto flex max-w-7xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="max-w-2xl"><h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">Not Sure Which Plan Is Right for You?</h2><p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">Tell us what you&apos;re trying to achieve and we&apos;ll help you find the right approach.</p></div>
          <Link href="/book-now" className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#0052CC] shadow-[0_8px_24px_-8px_#071A3D80] transition-all hover:-translate-y-0.5">Book Now <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></Link>
        </motion.div>
      </section>
    </>
  )
}