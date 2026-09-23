export type LeadInput = {
  name: string
  company?: string
  phone?: string
  email: string
  businessType?: string
  servicesRequired?: string[]
  budgetRange?: string
  timeline?: string
  message?: string
  website?: string // honeypot
}

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string> }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clean(v: unknown, max = 2000): string {
  if (typeof v !== 'string') return ''
  return v.trim().slice(0, max)
}

export function validateLead(raw: Record<string, unknown>): ValidationResult<LeadInput> {
  const errors: Record<string, string> = {}

  const name = clean(raw.name, 120)
  const email = clean(raw.email, 160).toLowerCase()
  const phone = clean(raw.phone, 40)
  const company = clean(raw.company, 160)
  const businessType = clean(raw.businessType, 120)
  const budgetRange = clean(raw.budgetRange, 60)
  const timeline = clean(raw.timeline, 60)
  const message = clean(raw.message, 4000)
  const website = clean(raw.website, 200) // honeypot must stay empty
  const servicesRequired = Array.isArray(raw.servicesRequired)
    ? raw.servicesRequired.map((s) => clean(s, 80)).filter(Boolean).slice(0, 20)
    : []

  if (!name || name.length < 2) errors.name = 'Please enter your name.'
  if (!email) errors.email = 'Please enter your email.'
  else if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.'
  if (message && message.length < 3) errors.message = 'Message is too short.'

  if (Object.keys(errors).length > 0) return { success: false, errors }

  return {
    success: true,
    data: {
      name,
      email,
      phone,
      company,
      businessType,
      budgetRange,
      timeline,
      message,
      servicesRequired,
      website,
    },
  }
}
