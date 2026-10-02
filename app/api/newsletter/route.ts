import { NextRequest, NextResponse } from 'next/server'
import { getClientIp, rateLimit } from '@/lib/rate-limit'
import { sendEmail } from '@/services/email'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]!)
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }

  const email = typeof body === 'object' && body !== null && 'email' in body && typeof body.email === 'string'
    ? body.email.trim().slice(0, 160).toLowerCase()
    : ''

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  }

  const limit = rateLimit(`newsletter:${getClientIp(request.headers)}`, 3, 60_000)
  if (!limit.success) {
    return NextResponse.json({ error: 'Too many attempts. Please try again shortly.' }, { status: 429 })
  }

  const result = await sendEmail({
    to: process.env.NEWSLETTER_TO || 'hello@oyecreative.us',
    replyTo: email,
    subject: 'New OyeCreatives newsletter subscriber',
    html: `<p>A visitor subscribed to the OyeCreatives newsletter.</p><p>Email: <strong>${escapeHtml(email)}</strong></p>`,
  })

  if (!result.sent) {
    return NextResponse.json({ error: 'Newsletter delivery is not configured.' }, { status: 503 })
  }

  return NextResponse.json({ success: true })
}