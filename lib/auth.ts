import { betterAuth } from 'better-auth'
import { nextCookies } from 'better-auth/next-js'
import { Pool } from 'pg'

function resolveBaseURL() {
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  if (process.env.V0_RUNTIME_URL) return process.env.V0_RUNTIME_URL
  return process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000'
}

function resolveDatabaseURL() {
  return process.env.DATABASE_URL
}

function resolveAuthSecret() {
  return process.env.BETTER_AUTH_SECRET ?? 'dev-local-secret-change-me'
}

function resolveTrustedOrigins() {
  const origins = new Set<string>()
  if (process.env.NODE_ENV === 'development') {
    origins.add('http://localhost:3000')
    for (const key of ['V0_RUNTIME_URL', 'V0_DEV_APP_URL', 'V0_BUILD_URL', 'V0_SANDBOX_URL']) {
      const value = process.env[key]
      if (value) origins.add(value)
    }
  } else {
    if (process.env.VERCEL_URL) origins.add(`https://${process.env.VERCEL_URL}`)
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
      origins.add(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  }
  return Array.from(origins)
}

const authEnabled = process.env.ENABLE_AUTH === 'true'
const databaseUrl = authEnabled ? resolveDatabaseURL() : undefined

const disabledAuth = Object.assign(
  async () => {
    throw new Error(
      'Authentication is disabled. Set ENABLE_AUTH=true and configure a valid DATABASE_URL to enable Better Auth.',
    )
  },
  {
    api: {
      getSession: async () => null,
    },
    handler: async () => {
      throw new Error(
        'Authentication is disabled. Set ENABLE_AUTH=true and configure a valid DATABASE_URL to enable Better Auth.',
      )
    },
  },
)

export const auth = databaseUrl
  ? betterAuth({
      secret: resolveAuthSecret(),
      database: new Pool({ connectionString: databaseUrl }),
      baseURL: resolveBaseURL(),
      trustedOrigins: resolveTrustedOrigins(),
      emailAndPassword: {
        enabled: true,
      },
      ...(process.env.NODE_ENV === 'development'
        ? {
            advanced: {
              // Required by the cross-site v0 preview iframe. Without these
              // attributes, login succeeds but the next request appears signed out.
              defaultCookieAttributes: {
                sameSite: 'none' as const,
                secure: true,
              },
            },
          }
        : {}),
      plugins: [nextCookies()],
    })
  : disabledAuth
