/**
 * Lightweight in-memory sliding-window rate limiter. Suitable for a single
 * serverless instance / preview. For high-scale production, swap the store for
 * Upstash Redis without changing call sites.
 */
type Entry = { count: number; resetAt: number }
const store = new Map<string, Entry>()

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000,
): { success: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || entry.resetAt < now) {
    const resetAt = now + windowMs
    store.set(key, { count: 1, resetAt })
    return { success: true, remaining: limit - 1, resetAt }
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count += 1
  return { success: true, remaining: limit - entry.count, resetAt: entry.resetAt }
}

export function getClientIp(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  )
}
