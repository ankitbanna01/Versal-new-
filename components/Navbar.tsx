'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Zap } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-[#DCEBFF] shadow-[0_2px_16px_0_#0066FF0D]'
          : 'bg-white/70 backdrop-blur-md',
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0066FF] shadow-[0_2px_8px_0_#0066FF40]">
              <Zap size={16} className="text-white fill-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-[#102A56]">
              Nova<span className="text-[#0066FF]">Studio</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 text-sm font-medium text-[#64748B] hover:text-[#0066FF] transition-colors duration-200 rounded-md hover:bg-[#EAF4FF] group"
              >
                {link.label}
                <span className="absolute bottom-1 left-3 right-3 h-px bg-[#0066FF] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg btn-primary px-4 py-2 text-sm font-semibold text-white"
            >
              Start a Project
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-[#64748B] hover:text-[#0066FF] hover:bg-[#EAF4FF] rounded-lg transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-[#DCEBFF] shadow-[0_8px_24px_0_#0066FF0D]">
          <nav className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-[#64748B] hover:text-[#0066FF] hover:bg-[#EAF4FF] transition-colors rounded-md"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded-lg btn-primary px-4 py-2.5 text-sm font-semibold text-white"
            >
              Start a Project
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
