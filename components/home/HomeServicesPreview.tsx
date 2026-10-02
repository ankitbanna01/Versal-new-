'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const PREVIEWS = [
  { title: 'Digital Experiences', image: '/images/work-website.png', detail: 'Thoughtful, made-to-fit digital work' },
  { title: 'Distinctive Brand Worlds', image: '/images/work-branding.png', detail: 'Identity with a point of view' },
  { title: 'Ideas Built to Grow', image: '/images/work-ads.png', detail: 'Creative made to move businesses forward' },
]

export function HomeServicesPreview() {
  return (
    <section aria-label="Explore what we create" id="services" className="relative overflow-hidden bg-[#F5FAFF] py-20 lg:py-28">
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-40 h-[30rem] w-[30rem] rounded-full bg-[#1683FF]/[0.07] blur-[100px]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center rounded-full border border-[#DCEBFF] bg-white px-3 py-1 text-xs font-semibold text-[#0066FF]">
              A little of what we do
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight text-[#102A56] sm:text-5xl">
              Explore what <span className="gradient-text">we create.</span>
            </h2>
          </div>
          <Link href="/services" className="group inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#0066FF]">
            View All Services
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {PREVIEWS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group relative min-h-[17rem] overflow-hidden rounded-xl bg-[#102A56]"
            >
              <Image src={item.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/90 via-[#071A3D]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-white/75">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}