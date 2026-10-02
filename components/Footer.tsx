import Link from 'next/link'
import { NAV_LINKS } from '@/lib/constants'
import { OyeLogo } from '@/components/OyeLogo'

const socialLinks = [
  { label: 'Instagram', href: '#', mark: 'IG' },
  { label: 'Facebook', href: '#', mark: 'f' },
  { label: 'LinkedIn', href: '#', mark: 'in' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
]

export function Footer({ socialIcons = false }: { socialIcons?: boolean }) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#071A3D] text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-14 pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand col */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-5">
            <Link
              href="/"
              className="flex h-16 items-center transition-opacity duration-200 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D9CFF] rounded-md"
              aria-label="OyeCreatives — go to homepage"
            >
              <OyeLogo className="h-full w-16 shrink-0" size={52} />
              <span className="ml-2 flex min-w-0 flex-col justify-center leading-none">
                <span className="whitespace-nowrap text-[19px] font-extrabold text-white sm:text-[20px]">
                  Oye<span className="text-[#4D9CFF]">Creatives</span>
                </span>
                <span className="mt-1 whitespace-nowrap text-[9px] font-medium text-[#94A3B8] sm:text-[10px]">
                  Creativity Without Limits
                </span>
              </span>
            </Link>
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-xs">
              From idea to execution. Strategy, branding, web, video, and performance marketing —
              all under one roof.
            </p>
            <div className="flex items-center gap-4 mt-1">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-xs text-[#64748B] hover:text-[#4D9CFF] transition-colors duration-200"
                >
                  {socialIcons ? (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-[11px] font-bold text-white/80" aria-hidden="true">
                      {s.mark}
                    </span>
                  ) : s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation col */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#4D9CFF] mb-2">
              Navigation
            </h3>
            {NAV_LINKS.slice(0, 5).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* More col */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#4D9CFF] mb-2">
              More
            </h3>
            {NAV_LINKS.slice(5).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/book-now"
              className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Contact col */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#4D9CFF] mb-2">
              Contact
            </h3>
            <p className="text-sm text-[#94A3B8]">hello@oyecreative.us</p>
            <p className="text-sm text-[#94A3B8]">+1 (555) 000-0000</p>
            <Link
              href="/book-now"
              className="mt-3 inline-flex items-center justify-center rounded-lg btn-primary px-4 py-2 text-xs font-semibold text-white self-start"
            >
              Start a Project
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#102A56] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#64748B]">
            &copy; {year} OyeCreative. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {legalLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs text-[#64748B] hover:text-[#4D9CFF] transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
