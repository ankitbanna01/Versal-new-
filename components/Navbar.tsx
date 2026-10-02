'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { OyeLogo } from '@/components/OyeLogo'

export function Navbar({ activeHref }: { activeHref?: string }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname                = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const currentPath = activeHref || pathname
  const isActive = (href: string) => href === '/' ? currentPath === '/' : currentPath.startsWith(href)

  return (
    <>
      {/* ══════════════════════════════════════
          HEADER BAR
      ══════════════════════════════════════ */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/94 backdrop-blur-xl border-b border-[#DCEBFF] shadow-[0_2px_24px_0_#0066FF0C]'
            : 'bg-white/82 backdrop-blur-md',
        )}
        style={{ height: 64 }}
      >
        {/*
          Three-column layout:
            [logo]   [nav — centered]   [cta]
          Each outer column is equal width so nav truly centres.
        */}
        <div
          className="h-full mx-auto grid items-center"
          style={{
            maxWidth: 1320,
            paddingLeft:  'clamp(24px, 4vw, 56px)',
            paddingRight: 'clamp(24px, 4vw, 56px)',
            gridTemplateColumns: '1fr auto 1fr',
            gap: 16,
          }}
        >
          {/* ─── Logo (left) ─── */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 group"
            aria-label="OyeCreatives — go to homepage"
          >
            <OyeLogo className="h-[22px] sm:h-[33px] lg:h-[22px] w-auto max-w-[50px] object-contain" size={32} />
            <span className="ml-2 flex min-w-0 flex-col justify-center leading-none">
              <span className="whitespace-nowrap text-[19px] font-extrabold text-[#102A56] sm:text-[20px]">Oye<span className="text-[#0066FF]">Creatives</span></span>
              <span className="mt-1 whitespace-nowrap text-[9px] font-medium text-[#64748B] sm:text-[10px]">Creativity Without Limits</span>
            </span>
          </Link>

          {/* ─── Desktop nav (center) ─── */}
          <nav
            className="hidden lg:flex items-center gap-0.5"
            role="navigation"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative px-3.5 py-2 text-[13px] font-semibold rounded-xl transition-all duration-200',
                    active
                      ? 'text-[#0066FF] bg-[#EAF4FF]'
                      : 'text-[#64748B] hover:text-[#0066FF] hover:bg-[#F5FAFF]',
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-0.5 left-3.5 right-3.5 h-[2px] rounded-full bg-[#0066FF]"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* ─── CTA (right) ─── */}
          <div className="hidden lg:flex items-center justify-end">
            <Link
              href="/book-now"
              className="group inline-flex items-center gap-2 rounded-full btn-primary px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_24px_0_#0066FF40] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] focus-visible:ring-offset-2"
            >
              Book Now
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* ─── Mobile: hamburger occupies right cell ─── */}
          <div className="lg:hidden flex items-center justify-end">
            <button
              className="p-2 text-[#64748B] hover:text-[#0066FF] hover:bg-[#EAF4FF] rounded-xl transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.14 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.14 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════
          MOBILE MENU
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="bd"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-40 bg-[#071A3D]/18 backdrop-blur-[2px] lg:hidden"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              id="mobile-menu"
              key="panel"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-16 left-0 right-0 z-40 lg:hidden bg-white border-b border-[#DCEBFF] shadow-[0_16px_48px_0_#0066FF12]"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <nav
                className="mx-auto flex flex-col py-2 pb-4"
                style={{
                  maxWidth: 1320,
                  paddingLeft:  'clamp(24px, 5vw, 56px)',
                  paddingRight: 'clamp(24px, 5vw, 56px)',
                }}
              >
                {NAV_LINKS.map((link, i) => {
                  const active = isActive(link.href)
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'flex items-center justify-between px-3 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-150',
                          active
                            ? 'text-[#0066FF] bg-[#EAF4FF]'
                            : 'text-[#102A56] hover:text-[#0066FF] hover:bg-[#F5FAFF]',
                        )}
                      >
                        {link.label}
                        {active && <span className="h-1.5 w-1.5 rounded-full bg-[#0066FF]" />}
                      </Link>
                    </motion.div>
                  )
                })}

                {/* Mobile Book Now */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.04 + 0.04, duration: 0.18 }}
                  className="mt-3 pt-3 border-t border-[#DCEBFF]"
                >
                  <Link
                    href="/book-now"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 w-full rounded-full btn-primary py-3.5 text-[14px] font-semibold text-white"
                  >
                    Book Now
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
