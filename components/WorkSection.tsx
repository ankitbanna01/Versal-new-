'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const works = [
  { title: 'Brand Identity Design', category: 'Branding',     image: '/images/work-branding.png', href: '/portfolio' },
  { title: 'Social Media Content',  category: 'Social Media', image: '/images/work-social.png',   href: '/portfolio' },
  { title: 'Website Development',   category: 'Web',          image: '/images/work-website.png',  href: '/portfolio' },
  { title: 'Video Production',      category: 'Video',        image: '/images/work-video.png',    href: '/portfolio' },
  { title: '3D Visualisation',      category: '3D',           image: '/images/work-3d.png',       href: '/portfolio' },
  { title: 'Paid Advertising',      category: 'Meta Ads',     image: '/images/work-ads.png',      href: '/portfolio' },
]

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: EASE },
  }),
}

export function WorkSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#F5FAFF]" id="work">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3 py-1 text-xs font-semibold text-[#0066FF] mb-4">
              Our Work
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#102A56] text-balance">
              Work we are{' '}
              <span className="gradient-text">proud of</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066FF] hover:underline underline-offset-4 shrink-0"
          >
            Full Portfolio
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {works.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              <Link
                href={item.href}
                className="group relative block rounded-2xl overflow-hidden border border-[#DCEBFF] bg-white aspect-[4/3] transition-all duration-300 hover:shadow-blue-lg hover:-translate-y-1"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/80 via-[#071A3D]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Hover text */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/30 backdrop-blur-sm px-2.5 py-0.5 text-xs font-semibold text-white mb-1.5">
                    {item.category}
                  </div>
                  <div className="text-sm font-bold text-white">{item.title}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
