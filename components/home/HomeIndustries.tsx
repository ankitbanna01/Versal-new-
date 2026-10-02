'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ShoppingBag, Home, UtensilsCrossed, Heart, GraduationCap, Cpu, Briefcase, Building2, User, Calendar } from 'lucide-react'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const INDUSTRIES = [
  { name: 'E-commerce',          slug: 'ecommerce',        icon: ShoppingBag,       services: ['Web Dev', 'Meta Ads', 'Google Ads', 'Content'],     color: '#0066FF', bg: 'bg-[#EAF4FF]',   desc: 'Storefronts and performance advertising built to sell and scale.' },
  { name: 'Real Estate',         slug: 'real-estate',      icon: Home,              services: ['Website', 'Lead Gen', 'Google Ads', 'Video'],        color: '#1683FF', bg: 'bg-[#F0F7FF]',   desc: 'Lead generation systems and digital marketing for property professionals.' },
  { name: 'Restaurants',         slug: 'restaurants',      icon: UtensilsCrossed,   services: ['Branding', 'Social', 'Photography', 'Meta Ads'],      color: '#0052CC', bg: 'bg-[#EAF4FF]',   desc: 'Brand identity, photography and social campaigns that fill tables.' },
  { name: 'Healthcare',          slug: 'healthcare',       icon: Heart,             services: ['Website', 'Branding', 'Content', 'Google Ads'],       color: '#0066FF', bg: 'bg-[#F0F7FF]',   desc: 'Professional digital presence and patient-focused marketing.' },
  { name: 'Education',           slug: 'education',        icon: GraduationCap,     services: ['Website', 'Social', 'Content', 'Meta Ads'],           color: '#1683FF', bg: 'bg-[#EAF4FF]',   desc: 'Enrollment-driving websites, content and paid campaigns.' },
  { name: 'Technology',          slug: 'startups',         icon: Cpu,               services: ['Branding', 'Logo', 'Website', 'Digital Marketing'],   color: '#0052CC', bg: 'bg-[#F0F7FF]',   desc: 'From MVP launch to growth — brand, web and marketing for tech companies.' },
  { name: 'Professional Services', slug: 'corporate',     icon: Briefcase,         services: ['Website', 'Branding', 'Motion', 'Digital Marketing'], color: '#0066FF', bg: 'bg-[#EAF4FF]',   desc: 'Authority-building digital presence for B2B firms.' },
  { name: 'Local Businesses',    slug: 'local-businesses', icon: Building2,         services: ['Branding', 'Google Ads', 'Social', 'Photography'],    color: '#1683FF', bg: 'bg-[#F0F7FF]',   desc: 'Local SEO, ads and social to help nearby businesses thrive.' },
  { name: 'Personal Brands',     slug: 'personal-brands',  icon: User,              services: ['Branding', 'Content', 'Social', 'Video'],             color: '#0052CC', bg: 'bg-[#EAF4FF]',   desc: 'Build an audience and monetise your personal brand.' },
  { name: 'Events',              slug: 'events',           icon: Calendar,          services: ['Branding', 'Video', 'Social', 'Photography'],         color: '#0066FF', bg: 'bg-[#F0F7FF]',   desc: 'End-to-end event marketing from brand to post-event content.' },
]

export function HomeIndustries() {
  const [hovered, setHovered] = useState<string | null>(null)
  const headRef = useRef<HTMLDivElement>(null)
  const inView  = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section className="py-24 lg:py-32 bg-[#F5FAFF]" id="industries">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* header */}
        <div ref={headRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3 py-1 text-xs font-semibold text-[#0066FF] mb-5">
              Industries We Serve
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#102A56]">
              Deep expertise across<br />
              <span className="gradient-text">every sector.</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
            <Link href="/industries" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066FF] hover:underline underline-offset-4 shrink-0">
              View All Industries <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {INDUSTRIES.map((ind, i) => {
            const ref    = useRef<HTMLDivElement>(null)
            const iv     = useInView(ref, { once: true, margin: '-40px' })
            const Icon   = ind.icon
            const active = hovered === ind.slug
            return (
              <motion.div
                key={ind.slug}
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={iv ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.055, ease: EASE }}
              >
                <Link
                  href={`/industries`}
                  onMouseEnter={() => setHovered(ind.slug)}
                  onMouseLeave={() => setHovered(null)}
                  className={`group relative flex flex-col gap-4 rounded-2xl border p-5 h-full transition-all duration-300 cursor-pointer overflow-hidden ${active ? 'border-[#0066FF]/40 bg-white shadow-[0_8px_32px_-8px_#0066FF20] -translate-y-1' : 'border-[#DCEBFF] bg-white hover:-translate-y-0.5'}`}
                >
                  {/* icon */}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${active ? 'bg-[#0066FF] scale-110' : `${ind.bg}`}`}>
                    <Icon size={20} className={`transition-colors duration-300 ${active ? 'text-white' : 'text-[#0066FF]'}`} />
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className={`font-bold text-sm transition-colors duration-200 ${active ? 'text-[#0066FF]' : 'text-[#102A56]'}`}>
                      {ind.name}
                    </h3>

                    {/* description — revealed on hover */}
                    <AnimatePresence>
                      {active && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.28 }}
                          className="text-xs text-[#64748B] leading-relaxed overflow-hidden"
                        >
                          {ind.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* service tags */}
                    <div className={`flex flex-wrap gap-1 mt-auto transition-opacity duration-200 ${active ? 'opacity-100' : 'opacity-60'}`}>
                      {ind.services.map(s => (
                        <span key={s} className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-[#EAF4FF] text-[#0066FF] border border-[#DCEBFF]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* arrow */}
                  <motion.div
                    animate={{ x: active ? 2 : 0, opacity: active ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-4 right-4"
                  >
                    <ArrowRight size={14} className="text-[#0066FF]" />
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
