'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<FormState>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('submitting')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      setState(response.ok ? 'success' : 'error')
    } catch {
      setState('error')
    }
  }

  return (
    <div className="w-full max-w-md">
      {state === 'success' ? (
        <p role="status" className="inline-flex items-center gap-2 rounded-lg border border-[#B8D7FF] bg-white px-4 py-3 text-sm font-semibold text-[#0066FF]">
          <CheckCircle2 size={17} /> You&apos;re subscribed. Look out for our next issue.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
          <label className="sr-only" htmlFor="newsletter-email">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={160}
            value={email}
            onChange={event => {
              setEmail(event.target.value)
              if (state === 'error') setState('idle')
            }}
            placeholder="Enter your email"
            className="min-w-0 flex-1 rounded-lg border border-[#CFE2FA] bg-white px-4 py-3 text-sm text-[#102A56] outline-none transition-shadow placeholder:text-[#8A9AB0] focus:border-[#1683FF] focus:ring-2 focus:ring-[#1683FF]/15"
          />
          <button
            type="submit"
            disabled={state === 'submitting'}
            className="group inline-flex items-center justify-center gap-2 rounded-lg btn-primary px-5 py-3 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-70"
          >
            {state === 'submitting' ? 'Subscribing...' : 'Subscribe'}
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>
          {state === 'error' && (
            <p role="alert" className="text-xs text-[#B42318] sm:absolute sm:mt-14">
              We couldn&apos;t subscribe you right now. Please try again later.
            </p>
          )}
        </form>
      )}
    </div>
  )
}