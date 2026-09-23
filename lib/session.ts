import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function getSession() {
  return auth.api.getSession({ headers: await headers() })
}

/** Require an authenticated admin. Redirects to login when absent. */
export async function requireAdmin() {
  const session = await getSession()
  if (!session?.user) redirect('/admin/login')
  return session
}
