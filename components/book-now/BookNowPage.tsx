'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  CalendarDays,
  Camera,
  Check,
  CheckCircle2,
  Clock3,
  Code2,
  FileText,
  Globe,
  Mail,
  Megaphone,
  MessageCircle,
  Palette,
  Phone,
  Sparkles,
  Target,
} from 'lucide-react'
import { whatsappUrl, WHATSAPP_MESSAGES } from '@/lib/whatsapp'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const SERVICES = [
  'Website Design & Development',
  'Software Development',
  'Graphic Design',
  'Digital Marketing',
  'Branding',
  'Logo Design',
  'Photography',
  'Google Ads',
  'Meta Ads',
  'Other',
]

const BUDGETS = ['₹10K – ₹25K', '₹25K – ₹50K', '₹50K – ₹1L', '₹1L – ₹2L', '₹2L+', 'Not Sure Yet']
const TIMELINES = ['ASAP', '1–2 Weeks', '1 Month', '1–3 Months', 'Flexible']

const QUICK_BOOKING = [
  { title: 'Website Project', service: 'Website Design & Development', icon: Globe },
  { title: 'Branding Project', service: 'Branding', icon: Palette },
  { title: 'Marketing Project', service: 'Digital Marketing', icon: Megaphone },
  { title: 'Software Project', service: 'Software Development', icon: Code2 },
]

const TRUST = [
  { title: 'Creative & Experienced Team', icon: Sparkles },
  { title: 'Transparent Communication', icon: MessageCircle },
  { title: 'Customized Solutions', icon: Target },
  { title: 'On-Time Delivery', icon: CheckCircle2 },
]

type BookingValues = {
  name: string
  email: string
  phone: string
  company: string
  service: string
  budgetRange: string
  timeline: string
  message: string
  website: string
  plan: string
}

const EMPTY_VALUES: BookingValues = {
  name: '', email: '', phone: '', company: '', service: '', budgetRange: '', timeline: '', message: '', website: '', plan: '',
}

type ContactDetails = { email: string; phone: string; whatsapp: string; initialPlan?: string; initialService?: string }
const PLAN_LABELS: Record<string, string> = { starter: 'Starter', growth: 'Growth', pro: 'Pro', custom: 'Custom plan' }

function BookingVisual() {
  return (
    <div className="relative mx-auto aspect-[1.2] w-full max-w-xl overflow-hidden rounded-[1.25rem] border border-[#DCEBFF] bg-[#F5FAFF] shadow-[0_24px_64px_-24px_#0066FF55]">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_65%_40%,#FFFFFF_0%,#EAF4FF_75%)]" />
      <div aria-hidden className="absolute inset-0 dot-grid opacity-40" />
      <motion.div animate={{ rotate: [10, 16, 10], y: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-[11%] top-[11%] h-14 w-14 rounded-2xl border border-[#0066FF]/15 bg-white/55" />
      <motion.div animate={{ rotate: [-8, -2, -8], y: [0, 7, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-[13%] left-[8%] h-10 w-10 rounded-xl border border-[#0066FF]/15 bg-[#DCEBFF]/50" />

      <motion.div initial={{ opacity: 0, y: 12, rotateY: -6 }} animate={{ opacity: 1, y: 0, rotateY: 0 }} transition={{ duration: 0.65, ease: EASE }} className="absolute left-[12%] top-[18%] w-[66%] overflow-hidden rounded-xl border border-[#DCEBFF] bg-white shadow-[0_16px_40px_-18px_#0066FF55]" style={{ perspective: 900 }}>
        <div className="flex h-8 items-center gap-1.5 border-b border-[#DCEBFF] bg-[#F5FAFF] px-3">
          <span className="h-2 w-2 rounded-full bg-[#FCA5A5]" /><span className="h-2 w-2 rounded-full bg-[#FDE68A]" /><span className="h-2 w-2 rounded-full bg-[#6EE7B7]" />
          <div className="ml-2 h-3 flex-1 rounded-full bg-white" />
        </div>
        <div className="p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <div><div className="mb-1 h-2 w-24 rounded-full bg-[#102A56]/20" /><div className="h-1.5 w-16 rounded-full bg-[#DCEBFF]" /></div>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EAF4FF] text-[#0066FF]"><FileText size={16} /></span>
          </div>
          <div className="rounded-lg border border-[#DCEBFF] bg-[#F5FAFF] p-3">
            <div className="mb-3 flex items-center gap-2 text-[10px] font-bold text-[#0066FF]"><Sparkles size={13} /> PROJECT BRIEF</div>
            {[0, 1, 2].map(index => <div key={index} className={`mb-2 h-1.5 rounded-full last:mb-0 ${index === 0 ? 'w-full bg-[#B8D7FF]' : index === 1 ? 'w-4/5 bg-[#DCEBFF]' : 'w-3/5 bg-[#EAF4FF]'}`} />)}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">{['bg-[#EAF4FF]', 'bg-[#DCEBFF]', 'bg-[#EAF4FF]'].map((color, index) => <div key={index} className={`h-9 rounded-md ${color}`} />)}</div>
        </div>
      </motion.div>

      <motion.div animate={{ y: [0, -6, 0], rotate: [0, 1.5, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-[8%] top-[37%] flex w-36 flex-col gap-2 rounded-xl border border-[#DCEBFF] bg-white/95 p-3 shadow-[0_14px_34px_-18px_#0066FF70] sm:w-40">
        <div className="flex items-center gap-2 text-[10px] font-bold text-[#102A56]"><CalendarDays size={14} className="text-[#0066FF]" /> Kick-off call</div>
        <div className="h-1.5 w-full rounded-full bg-[#DCEBFF]" />
        <div className="flex items-center justify-between text-[8px] text-[#64748B]"><span>Project timeline</span><span className="font-bold text-[#1683FF]">01 / 05</span></div>
      </motion.div>

      <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }} className="absolute bottom-[13%] right-[10%] flex items-center gap-2 rounded-lg border border-[#DCEBFF] bg-white/95 px-3 py-2 shadow-blue">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EAF4FF] text-[#0066FF]"><Check size={15} /></span>
        <span className="text-[10px] font-bold text-[#102A56]">A clear next step</span>
      </motion.div>
      <span aria-hidden="true" className="absolute right-[21%] top-[17%] h-2.5 w-2.5 rounded-full bg-[#1683FF] shadow-[0_0_16px_#1683FF70]" />
    </div>
  )
}

function ContactPanel({ email, phone, whatsapp }: ContactDetails) {
  const whatsappHref = whatsapp ? whatsappUrl(WHATSAPP_MESSAGES.consultation, whatsapp) : ''

  return (
    <aside className="h-fit rounded-xl border border-[#DCEBFF] bg-[#F5FAFF] p-5 sm:p-6">
      <span className="mb-3 inline-flex rounded-full border border-[#DCEBFF] bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#0066FF]">Direct contact</span>
      <h3 className="text-xl font-extrabold text-[#102A56]">Prefer to Talk Directly?</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#64748B]">We&apos;re happy to talk through your project before you send a brief.</p>
      <div className="mt-5 space-y-3">
        <a href={`mailto:${email}`} className="flex items-center gap-3 rounded-lg border border-[#DCEBFF] bg-white p-3 text-sm font-semibold text-[#102A56] transition-colors hover:border-[#B8D7FF] hover:text-[#0066FF]">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#EAF4FF] text-[#0066FF]"><Mail size={16} /></span>
          <span className="min-w-0"><span className="block text-[10px] font-medium text-[#8292A8]">Email</span><span className="block break-all">{email}</span></span>
        </a>
        {phone && <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-3 rounded-lg border border-[#DCEBFF] bg-white p-3 text-sm font-semibold text-[#102A56] transition-colors hover:border-[#B8D7FF] hover:text-[#0066FF]">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#EAF4FF] text-[#0066FF]"><Phone size={16} /></span>
          <span><span className="block text-[10px] font-medium text-[#8292A8]">Phone</span>{phone}</span>
        </a>}
        {whatsapp && <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg border border-[#DCEBFF] bg-white p-3 text-sm font-semibold text-[#102A56] transition-colors hover:border-[#B8D7FF] hover:text-[#0066FF]">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#EAF4FF] text-[#0066FF]"><MessageCircle size={16} /></span>
          <span><span className="block text-[10px] font-medium text-[#8292A8]">WhatsApp</span>Start a conversation</span>
        </a>}
      </div>
    </aside>
  )
}

export function BookNowPage({ email, phone, whatsapp, initialPlan = '', initialService = '' }: ContactDetails) {
  const [values, setValues] = useState<BookingValues>(() => ({
    ...EMPTY_VALUES,
    plan: PLAN_LABELS[initialPlan.toLowerCase()] ? initialPlan.toLowerCase() : '',
    service: SERVICES.includes(initialService) ? initialService : '',
  }))
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reference, setReference] = useState('')
  const selectedQuickBooking = QUICK_BOOKING.find(option => option.service === values.service)?.title

  function updateField(field: keyof BookingValues, value: string) {
    setValues(current => ({ ...current, [field]: value }))
    setFieldErrors(current => ({ ...current, [field]: '' }))
    setFormError('')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setFieldErrors({})
    setFormError('')

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const result = await response.json() as { success?: boolean; ref?: string; error?: string; errors?: Record<string, string> }

      if (!response.ok || !result.success) {
        setFieldErrors(result.errors ?? {})
        setFormError(result.error || 'We could not send your inquiry. Please try again.')
        return
      }

      setValues(EMPTY_VALUES)
      setFieldErrors({})
      setReference(result.ref || '')
    } catch {
      setFormError('We could not connect right now. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const fieldClass = (field: keyof BookingValues) => `w-full rounded-lg border bg-white px-3.5 py-3 text-sm text-[#102A56] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#91A0B4] focus:border-[#1683FF] focus:ring-2 focus:ring-[#1683FF]/15 ${fieldErrors[field] ? 'border-[#DC5A5A]' : 'border-[#DCEBFF]'}`

  return (
    <>
      <section className="relative overflow-hidden bg-white pb-16 pt-32 sm:pt-36 lg:pb-20 lg:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-[#1683FF]/[0.08] blur-[110px]" />
          <div className="absolute -bottom-40 left-[8%] h-80 w-80 rounded-full bg-[#0066FF]/[0.045] blur-[100px]" />
          <div className="absolute left-[7%] top-40 h-11 w-11 rotate-12 rounded-2xl border border-[#0066FF]/15 bg-[#EAF4FF]/60" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:px-8">
          <div className="flex flex-col items-start gap-6">
            <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="inline-flex items-center gap-2 rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3.5 py-1.5 text-xs font-bold text-[#0066FF]">
              <Sparkles size={13} /> Let&apos;s Work Together
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.06, ease: EASE }} className="max-w-xl text-5xl font-extrabold leading-[1.04] text-[#102A56] sm:text-6xl lg:text-[4.25rem]">
              Let&apos;s Turn Your<br /><span className="gradient-text">Ideas Into Reality.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15, ease: EASE }} className="max-w-xl text-base leading-relaxed text-[#64748B] sm:text-lg">
              Have a project in mind? Tell us about it and let&apos;s create something meaningful, creative and impactful together.
            </motion.p>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.97, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.12, ease: EASE }}>
            <BookingVisual />
          </motion.div>
        </div>
      </section>

      <section className="bg-[#F5FAFF] py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#0066FF]">A quick starting point</span>
              <h2 className="mt-2 text-2xl font-extrabold text-[#102A56] sm:text-3xl">What are you working on?</h2>
            </div>
            <p className="text-sm text-[#74849A]">Choose a starting point, then tell us more below.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {QUICK_BOOKING.map(({ title, service, icon: Icon }, index) => {
              const selected = selectedQuickBooking === title
              return (
                <motion.button key={title} type="button" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.4, delay: index * 0.05, ease: EASE }} whileHover={{ y: -2 }} aria-pressed={selected} onClick={() => updateField('service', service)} className={`flex min-h-24 items-center gap-3 rounded-lg border px-3 py-4 text-left transition-colors sm:px-5 ${selected ? 'border-[#1683FF] bg-white shadow-[0_8px_24px_-16px_#0066FF80] ring-2 ring-[#1683FF]/10' : 'border-[#DCEBFF] bg-white/75 hover:border-[#B8D7FF] hover:bg-white'}`}>
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${selected ? 'bg-[#0066FF] text-white' : 'bg-[#EAF4FF] text-[#0066FF]'}`}><Icon size={18} /></span>
                  <span className="text-xs font-bold leading-snug text-[#102A56] sm:text-sm">{title}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-9 max-w-2xl">
            <span className="mb-3 inline-flex rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3 py-1.5 text-xs font-bold text-[#0066FF]">Project inquiry</span>
            <h2 className="text-3xl font-extrabold text-[#102A56] sm:text-4xl">Tell Us About Your Project</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#64748B] sm:text-base">The more we know about your project, the better we can understand your needs.</p>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(17rem,0.65fr)] lg:gap-10">
            <div className="rounded-xl border border-[#DCEBFF] bg-white p-5 shadow-[0_16px_42px_-32px_#0066FF70] sm:p-8">
              <AnimatePresence mode="wait">
                {reference ? (
                  <motion.div key="success" initial={{ opacity: 0, y: 14, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: EASE }} className="flex min-h-[31rem] flex-col items-center justify-center px-3 py-10 text-center">
                    <motion.span initial={{ scale: 0.7, rotate: -8 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.08 }} className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF4FF] text-[#0066FF] ring-8 ring-[#F5FAFF]"><CheckCircle2 size={32} /></motion.span>
                    <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-[#0066FF]"><Check size={14} /> Inquiry Received</span>
                    <h3 className="max-w-lg text-3xl font-extrabold leading-tight text-[#102A56] sm:text-4xl">Thank You! Your Project Is On Its Way.</h3>
                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#64748B] sm:text-base">We&apos;ve received your project details. Our team will review your inquiry and get back to you soon.</p>
                    <p className="mt-4 rounded-full border border-[#DCEBFF] bg-[#F5FAFF] px-3 py-1.5 text-xs font-semibold text-[#64748B]">Reference: {reference}</p>
                    <Link href="/" className="group mt-7 inline-flex items-center gap-2 rounded-lg btn-primary px-5 py-3 text-sm font-semibold text-white">Back to Home <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></Link>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} noValidate className="space-y-5">
                    {values.plan && <div className="flex items-center justify-between gap-3 rounded-lg border border-[#B8D7FF] bg-[#F5FAFF] px-3.5 py-3">
                      <div><span className="block text-[10px] font-medium text-[#74849A]">Selected from pricing</span><span className="text-sm font-bold text-[#0066FF]">{PLAN_LABELS[values.plan] || values.plan}</span></div>
                      <button type="button" onClick={() => updateField('plan', '')} className="text-xs font-semibold text-[#64748B] underline underline-offset-2 hover:text-[#0066FF]">Change</button>
                    </div>}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="booking-name" className="mb-1.5 block text-xs font-bold text-[#334B6C]">Full Name <span className="text-[#0066FF]">*</span></label>
                        <input id="booking-name" name="name" required autoComplete="name" maxLength={120} value={values.name} onChange={event => updateField('name', event.target.value)} placeholder="Your name" aria-invalid={!!fieldErrors.name} className={fieldClass('name')} />
                        {fieldErrors.name && <p className="mt-1.5 text-xs text-[#B42318]">{fieldErrors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="booking-email" className="mb-1.5 block text-xs font-bold text-[#334B6C]">Email Address <span className="text-[#0066FF]">*</span></label>
                        <input id="booking-email" name="email" type="email" required autoComplete="email" maxLength={160} value={values.email} onChange={event => updateField('email', event.target.value)} placeholder="you@company.com" aria-invalid={!!fieldErrors.email} className={fieldClass('email')} />
                        {fieldErrors.email && <p className="mt-1.5 text-xs text-[#B42318]">{fieldErrors.email}</p>}
                      </div>
                      <div>
                        <label htmlFor="booking-phone" className="mb-1.5 block text-xs font-bold text-[#334B6C]">Phone Number</label>
                        <input id="booking-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} value={values.phone} onChange={event => updateField('phone', event.target.value)} placeholder="Your phone number" className={fieldClass('phone')} />
                      </div>
                      <div>
                        <label htmlFor="booking-company" className="mb-1.5 block text-xs font-bold text-[#334B6C]">Company / Brand Name</label>
                        <input id="booking-company" name="company" autoComplete="organization" maxLength={160} value={values.company} onChange={event => updateField('company', event.target.value)} placeholder="Your company or brand" className={fieldClass('company')} />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="booking-service" className="mb-1.5 block text-xs font-bold text-[#334B6C]">Select Service <span className="text-[#0066FF]">*</span></label>
                        <select id="booking-service" name="service" required value={values.service} onChange={event => updateField('service', event.target.value)} aria-invalid={!!fieldErrors.service} className={`${fieldClass('service')} ${values.service ? '' : 'text-[#91A0B4]'}`}>
                          <option value="" disabled>Select a service</option>
                          {SERVICES.map(service => <option key={service} value={service} className="text-[#102A56]">{service}</option>)}
                        </select>
                        {fieldErrors.service && <p className="mt-1.5 text-xs text-[#B42318]">{fieldErrors.service}</p>}
                      </div>
                      <div>
                        <label htmlFor="booking-timeline" className="mb-1.5 block text-xs font-bold text-[#334B6C]">Project Timeline</label>
                        <select id="booking-timeline" name="timeline" value={values.timeline} onChange={event => updateField('timeline', event.target.value)} aria-invalid={!!fieldErrors.timeline} className={`${fieldClass('timeline')} ${values.timeline ? '' : 'text-[#91A0B4]'}`}>
                          <option value="">Choose a timeline</option>
                          {TIMELINES.map(timeline => <option key={timeline} value={timeline} className="text-[#102A56]">{timeline}</option>)}
                        </select>
                        {fieldErrors.timeline && <p className="mt-1.5 text-xs text-[#B42318]">{fieldErrors.timeline}</p>}
                      </div>
                    </div>

                    <fieldset>
                      <legend className="mb-2.5 text-xs font-bold text-[#334B6C]">Project Budget</legend>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {BUDGETS.map(budget => {
                          const selected = values.budgetRange === budget
                          return <label key={budget} className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors sm:text-sm ${selected ? 'border-[#1683FF] bg-[#EAF4FF] text-[#0066FF]' : 'border-[#DCEBFF] bg-white text-[#64748B] hover:border-[#B8D7FF]'}`}>
                            <input type="radio" name="budgetRange" value={budget} checked={selected} onChange={() => updateField('budgetRange', budget)} className="h-3.5 w-3.5 accent-[#0066FF]" />{budget}
                          </label>
                        })}
                      </div>
                      {fieldErrors.budgetRange && <p className="mt-1.5 text-xs text-[#B42318]">{fieldErrors.budgetRange}</p>}
                    </fieldset>

                    <div>
                      <label htmlFor="booking-message" className="mb-1.5 block text-xs font-bold text-[#334B6C]">Tell Us About Your Project <span className="text-[#0066FF]">*</span></label>
                      <textarea id="booking-message" name="message" required minLength={3} maxLength={4000} rows={6} value={values.message} onChange={event => updateField('message', event.target.value)} placeholder="Tell us about your idea, goals, requirements or anything else we should know..." aria-invalid={!!fieldErrors.message} className={`${fieldClass('message')} resize-y leading-relaxed`} />
                      <div className="mt-1.5 flex items-center justify-between">
                        {fieldErrors.message ? <p className="text-xs text-[#B42318]">{fieldErrors.message}</p> : <span className="text-xs text-[#91A0B4]">A few details help us prepare for the conversation.</span>}
                        <span className="text-[10px] text-[#91A0B4]">{values.message.length}/4000</span>
                      </div>
                    </div>

                    <input name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={event => updateField('website', event.target.value)} className="hidden" aria-hidden="true" />
                    {formError && <p role="alert" className="rounded-lg border border-[#F3C7C7] bg-[#FFF7F7] px-3 py-2.5 text-sm text-[#A13535]">{formError}</p>}
                    <button type="submit" disabled={isSubmitting} className="group inline-flex w-full items-center justify-center gap-2 rounded-lg btn-primary px-5 py-3.5 text-sm font-bold text-white transition-transform duration-200 hover:scale-[1.01] hover:shadow-[0_10px_26px_0_#0066FF55] disabled:cursor-wait disabled:opacity-70">
                      {isSubmitting ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> Sending Inquiry...</> : <>Send Project Inquiry <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" /></>}
                    </button>
                    <p className="text-center text-[11px] leading-relaxed text-[#91A0B4]">Your project details are only used to respond to this inquiry.</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-5">
              <ContactPanel email={email} phone={phone} whatsapp={whatsapp} />
              <div className="rounded-xl border border-[#DCEBFF] bg-white p-5 sm:p-6">
                <h3 className="text-sm font-extrabold text-[#102A56]">A thoughtful first conversation</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#64748B]">Share the essentials now. We&apos;ll follow up to understand the details and agree on a clear next step.</p>
                <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold text-[#526783]"><Clock3 size={14} className="text-[#0066FF]" /> We usually reply within one business day.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F5FAFF] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-7">
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#0066FF]">How we work</span>
            <h2 className="mt-2 text-2xl font-extrabold text-[#102A56] sm:text-3xl">Why Work With OyeCreatives?</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST.map(({ title, icon: Icon }, index) => (
              <motion.div key={title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.4, delay: index * 0.05, ease: EASE }} className="flex items-center gap-3 rounded-lg border border-[#DCEBFF] bg-white px-4 py-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#EAF4FF] text-[#0066FF]"><Icon size={17} /></span>
                <span className="text-xs font-bold leading-snug text-[#102A56] sm:text-sm">{title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#DCEBFF] bg-white py-14 sm:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div><h2 className="text-2xl font-extrabold text-[#102A56]">Have Questions Before You Start?</h2><p className="mt-1 text-sm text-[#64748B]">Let&apos;s talk about your idea.</p></div>
          <a href={`mailto:${email}`} className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-[#DCEBFF] bg-white px-5 py-3 text-sm font-semibold text-[#0066FF] transition-colors hover:border-[#B8D7FF] hover:bg-[#F5FAFF">Talk to Us <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></a>
        </div>
      </section>
    </>
  )
}