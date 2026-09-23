/**
 * Email service abstraction.
 *
 * Supports Resend (via REST API) out of the box. When no provider credentials
 * are configured the messages are logged so the lead flow keeps working in
 * development and preview environments without failing the request.
 *
 * To enable Resend: set RESEND_API_KEY and EMAIL_FROM.
 */

export type EmailMessage = {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}

function getFrom() {
  return process.env.EMAIL_FROM || 'Nova Studio <onboarding@resend.dev>'
}

async function sendViaResend(message: EmailMessage): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY
  if (!apiKey) return false
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: getFrom(),
        to: Array.isArray(message.to) ? message.to : [message.to],
        subject: message.subject,
        html: message.html,
        reply_to: message.replyTo,
      }),
    })
    if (!res.ok) {
      console.error('[v0] Resend email failed:', res.status, await res.text())
      return false
    }
    return true
  } catch (err) {
    console.error('[v0] Resend email error:', err)
    return false
  }
}

export async function sendEmail(message: EmailMessage): Promise<{ sent: boolean }> {
  const sent = await sendViaResend(message)
  if (!sent) {
    console.log('[v0] Email not dispatched (no provider configured). Preview:', {
      to: message.to,
      subject: message.subject,
    })
  }
  return { sent }
}

/* ----------------------------- Templates ----------------------------- */

function layout(inner: string) {
  return `<!doctype html><html><body style="margin:0;background:#0f0f12;font-family:Inter,Arial,sans-serif;color:#e9e9ec;padding:32px">
    <div style="max-width:560px;margin:0 auto;background:#17171b;border:1px solid #2a2a30;border-radius:16px;overflow:hidden">
      <div style="padding:24px 28px;border-bottom:1px solid #2a2a30">
        <span style="font-size:18px;font-weight:700;color:#fff">Nova<span style="color:#ff7a1a">Studio</span></span>
      </div>
      <div style="padding:28px">${inner}</div>
      <div style="padding:18px 28px;border-top:1px solid #2a2a30;font-size:12px;color:#8a8a92">
        Nova Studio — From Idea to Execution.
      </div>
    </div>
  </body></html>`
}

export function clientConfirmationEmail(name: string, ref: string) {
  return layout(`
    <h1 style="font-size:20px;margin:0 0 12px;color:#fff">Thank you for reaching out, ${escapeHtml(name)}</h1>
    <p style="line-height:1.6;color:#c5c5cc">We have received your project enquiry. Our team will review the details and get back to you shortly.</p>
    <p style="line-height:1.6;color:#c5c5cc">Your reference number is <strong style="color:#ff7a1a">${escapeHtml(ref)}</strong>. Please keep it for future correspondence.</p>
    <p style="line-height:1.6;color:#c5c5cc">In the meantime, feel free to explore our work and services.</p>
  `)
}

export function adminNotificationEmail(payload: {
  ref: string
  name: string
  company?: string | null
  email: string
  phone?: string | null
  services: string[]
  budget?: string | null
  message?: string | null
}) {
  const row = (label: string, value?: string | null) =>
    value
      ? `<tr><td style="padding:6px 0;color:#8a8a92;width:140px">${label}</td><td style="padding:6px 0;color:#e9e9ec">${escapeHtml(value)}</td></tr>`
      : ''
  return layout(`
    <h1 style="font-size:20px;margin:0 0 12px;color:#fff">New project enquiry received</h1>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${row('Reference', payload.ref)}
      ${row('Name', payload.name)}
      ${row('Company', payload.company)}
      ${row('Email', payload.email)}
      ${row('Phone', payload.phone)}
      ${row('Services', payload.services.join(', '))}
      ${row('Budget', payload.budget)}
      ${row('Message', payload.message)}
    </table>
  `)
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
