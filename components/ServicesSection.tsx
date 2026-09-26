'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Palette,
  Globe,
  Video,
  Megaphone,
  BarChart2,
  Layers,
  ArrowRight,
} from 'lucide-react'

const services = [
  {
    icon: Palette,
    title: 'Branding & Identity',
    description:
      'Logo design, brand systems, guidelines, and visual identities that position you for long-term success.',
    href: '/services',
    iconBg: 'bg-[#EAF4FF]',
    iconColor: 'text-[#0066FF]',
  },
  {
    icon: Globe,
    title: 'Web Development',
    description:
      'Fast, responsive, SEO-optimised websites and web applications built with modern technology.',
    href: '/services',
    iconBg: 'bg-[#EAF4FF]',
    iconColor: 'text-[#0066FF]',
  },
  {
    icon: Video,
    title: 'Video & Motion',
    description:
      'Brand films, social reels, explainer videos, and motion graphics that stop the scroll.',
    href: '/services',
    iconBg: 'bg-[#EAF4FF]',
    iconColor: 'text-[#0066FF]',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description:
      'Content strategy, social media management, and email campaigns that grow your audience.',
    href: '/services',
    iconBg: 'bg-[#EAF4FF]',
    iconColor: 'text-[#0066FF]',
  },
  {
    icon: BarChart2,
    title: 'Paid Advertising',
    description:
      'Meta and Google Ads campaigns engineered for measurable ROI and qualified lead generation.',
    href: '/services',
    iconBg: 'bg-[#EAF4FF]',
    iconColor: 'text-[#0066FF]',
  },
  {
    icon: Layers,
    title: 'Graphic Design',
    description:
      'Print, packaging, social media graphics, and marketing collateral that communicate with intent.',
    href: '/services',
    iconBg: 'bg-[#EAF4FF]',
    iconColor: 'text-[#0066FF]',
  },
]

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: EASE },
  }),
}

export function ServicesSection() {
  return (
    <section className="py-24 lg:py-32 bg-white" id="services">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3 py-1 text-xs font-semibold text-[#0066FF] mb-4">
              What We Do
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#102A56] text-balance">
              Everything your brand needs to{' '}
              <span className="gradient-text">grow and scale</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066FF] hover:underline underline-offset-4 shrink-0"
          >
            All Services
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              <Link
                href={svc.href}
                className="group flex flex-col gap-5 rounded-2xl border border-[#DCEBFF] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0066FF]/40 hover:shadow-blue"
              >
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl ${svc.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                  <svc.icon size={20} className={svc.iconColor} />
                </div>

                <div>
                  <h3 className="font-bold text-[#102A56] mb-2">{svc.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{svc.description}</p>
                </div>

                <div className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-[#0066FF] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Learn more <ArrowRight size={12} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
