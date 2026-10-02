import { randomUUID } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { getClientIp, rateLimit } from '@/lib/rate-limit'
import { db } from '@/lib/db'
import { lead } from '@/lib/db/schema'
import { validateLead } from '@/lib/validation'
import { getSettings } from '@/lib/queries'
import { adminNotificationEmail, clientConfirmationEmail, sendEmail } from '@/services/email'

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
] as const

const BUDGETS = ['₹10K – ₹25K', '₹25K – ₹50K', '₹50K – ₹1L', '₹1L – ₹2L', '₹2L+', 'Not Sure Yet']
const TIMELINES = ['ASAP', '1–2 Weeks', '1 Month', '1–3 Months', 'Flexible']
const PLANS = ['starter', 'growth', 'pro', 'custom']

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Please submit a valid inquiry.' }, { status: 400 })
  }

  if (!isRecord(body)) {
    return NextResponse.json({ error: 'Please submit a valid inquiry.' }, { status: 400 })
  }
  if (typeof body.website === 'string' && body.website.trim()) {
    return NextResponse.json({ error: 'Unable to submit this inquiry.' }, { status: 400 })
  }

  const serviceName = typeof body.service === 'string' ? body.service.trim() : ''
  const budgetRange = typeof body.budgetRange === 'string' ? body.budgetRange.trim() : ''
  const timeline = typeof body.timeline === 'string' ? body.timeline.trim() : ''
  const plan = typeof body.plan === 'string' ? body.plan.trim().toLowerCase() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''
  const errors: Record<string, string> = {}

  if (!SERVICES.includes(serviceName as (typeof SERVICES)[number])) errors.service = 'Please select a service.'
  if (budgetRange && !BUDGETS.includes(budgetRange as (typeof BUDGETS)[number])) errors.budgetRange = 'Please choose a listed budget range.'
  if (timeline && !TIMELINES.includes(timeline as (typeof TIMELINES)[number])) errors.timeline = 'Please choose a listed timeline.'
  if (plan && !PLANS.includes(plan)) errors.plan = 'Please choose a valid plan.'
  if (!message || message.length < 3) errors.message = 'Please tell us a little about your project.'

  const validation = validateLead({ ...body, message, servicesRequired: serviceName ? [serviceName] : [] })
  if (!validation.success) Object.assign(errors, validation.errors)
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: 'Please check the highlighted fields.', errors }, { status: 400 })
  }
  if (!validation.success) {
    return NextResponse.json({ error: 'Please check the highlighted fields.' }, { status: 400 })
  }

  const limit = rateLimit(`booking:${getClientIp(request.headers)}`, 5, 60_000)
  if (!limit.success) {
    return NextResponse.json({ error: 'Too many inquiries. Please try again in a minute.' }, { status: 429 })
  }

  const data = validation.data
  const ref = `OYE-${randomUUID().slice(0, 8).toUpperCase()}`
  const selectedPlan = plan ? `${plan[0].toUpperCase()}${plan.slice(1)}` : ''
  const inquiryMessage = `${data.message}${selectedPlan ? `\n\nSelected plan: ${selectedPlan}` : ''}${timeline ? `\n\nPreferred timeline: ${timeline}` : ''}`
  let persisted = false

  if (db) {
    try {
      await db.insert(lead).values({
        ref,
        name: data.name,
        company: data.company || null,
        phone: data.phone || null,
        email: data.email,
        servicesRequired: [serviceName],
        budgetRange: budgetRange || null,
        timeline: timeline || null,
        message: inquiryMessage,
        source: 'book-now',
      })
      persisted = true
    } catch (error) {
      console.error('[bookings] Failed to persist project inquiry:', error)
      return NextResponse.json({ error: 'We could not save your inquiry right now. Please try again shortly.' }, { status: 503 })
    }
  }

  const settings = await getSettings().catch(() => null)
  const recipient = process.env.LEADS_TO || settings?.email || process.env.CONTACT_EMAIL || 'hello@oyecreative.us'
  const deliveries = await Promise.allSettled([
    sendEmail({
      to: recipient,
      replyTo: data.email,
      subject: `New project inquiry ${ref}`,
      html: adminNotificationEmail({
        ref,
        name: data.name,
        company: data.company,
        email: data.email,
        phone: data.phone,
        services: [serviceName],
        budget: budgetRange,
        message: inquiryMessage,
      }),
    }),
    sendEmail({ to: data.email, subject: `We received your project inquiry ${ref}`, html: clientConfirmationEmail(data.name, ref) }),
  ])

  const adminEmailSent = deliveries[0].status === 'fulfilled' && deliveries[0].value.sent
  if (!persisted && !adminEmailSent) {
    return NextResponse.json({ error: 'Project inquiries are temporarily unavailable. Please try again shortly.' }, { status: 503 })
  }

  return NextResponse.json({ success: true, ref }, { status: 201 })
}