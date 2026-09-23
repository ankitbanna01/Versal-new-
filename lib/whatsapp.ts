/**
 * Build a WhatsApp click-to-chat URL with a prefilled, context-aware message.
 * The number comes from NEXT_PUBLIC_WHATSAPP_NUMBER (digits only, incl. country
 * code) and falls back to a passed-in number from admin settings.
 */
export function whatsappUrl(message: string, number?: string): string {
  const raw = number || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''
  const digits = raw.replace(/\D/g, '')
  const text = encodeURIComponent(message)
  return `https://wa.me/${digits}?text=${text}`
}

export const WHATSAPP_MESSAGES = {
  default: 'Hi, I found your agency website and would like to discuss a project.',
  service: (service: string) => `Hi, I am interested in your ${service} service.`,
  project: (project: string) => `Hi, I saw your "${project}" project and would like to discuss something similar.`,
  consultation: 'Hi, I would like to book a free consultation.',
} as const
