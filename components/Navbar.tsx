'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { OyeLogo } from '@/components/OyeLogo'

export function Navbar({ activeHref }: { activeHref?: string }) {
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

          {/* ── Logo — links to homepage, exact uploaded asset ── */}
          <Link
            href="/"
            className="shrink-0 flex items-center h-[64px] pr-4 overflow-hidden transition-opacity duration-200 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] rounded-md"
            aria-label="OyeCreatives — go to homepage"
          >
            <OyeLogo className="h-[42px] sm:h-[46px] lg:h-[52px] w-auto max-w-[280px] object-contain" size={52} />
            <span className="ml-2 flex min-w-0 flex-col justify-center leading-none">
              <span className="whitespace-nowrap text-[19px] font-extrabold text-[#102A56] sm:text-[20px]">
                Oye<span className="text-[#0066FF]">Creatives</span>
              </span>
              <span className="mt-1 whitespace-nowrap text-[9px] font-medium text-[#64748B] sm:text-[10px]">
                Creativity Without Limits
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={link.href === activeHref ? 'page' : undefined}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md hover:bg-[#EAF4FF] group',
                  link.href === activeHref ? 'text-[#0066FF]' : 'text-[#64748B] hover:text-[#0066FF]',
                )}
              >
                {link.label}
                <span className={cn(
                  'absolute bottom-1 left-3 right-3 h-px bg-[#0066FF] transition-transform duration-200 origin-left',
                  link.href === activeHref ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                )} />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/book-now"
              className="group inline-flex items-center gap-2 rounded-lg btn-primary px-4 py-2 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.03] hover:shadow-[0_8px_28px_0_#0066FF55]"
            >
              Book Now
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile hamburger — right side, never overlaps logo */}
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
                aria-current={link.href === activeHref ? 'page' : undefined}
                className={cn(
                  'px-3 py-2.5 text-sm font-medium hover:text-[#0066FF] hover:bg-[#EAF4FF] transition-colors rounded-md',
                  link.href === activeHref ? 'text-[#0066FF] bg-[#EAF4FF]' : 'text-[#64748B]',
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book-now"
              onClick={() => setOpen(false)}
              className="group mt-3 inline-flex items-center justify-center gap-2 rounded-lg btn-primary px-4 py-2.5 text-sm font-semibold text-white"
            >
              Book Now
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
