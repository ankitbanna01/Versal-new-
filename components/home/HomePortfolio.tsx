'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const WORKS = [
  { title: 'Brand Identity Design',  category: 'Branding',     image: '/images/work-branding.png', href: '/portfolio', span: 'col-span-2 row-span-2' },
  { title: 'Social Media Content',   category: 'Social Media', image: '/images/work-social.png',   href: '/portfolio', span: 'col-span-1 row-span-1' },
  { title: 'Website Development',    category: 'Web',          image: '/images/work-website.png',  href: '/portfolio', span: 'col-span-1 row-span-1' },
  { title: '3D Visualisation',       category: '3D / Motion',  image: '/images/work-3d.png',       href: '/portfolio', span: 'col-span-1 row-span-2' },
  { title: 'Paid Advertising',       category: 'Meta Ads',     image: '/images/work-ads.png',      href: '/portfolio', span: 'col-span-1 row-span-1' },
  { title: 'Video Production',       category: 'Video',        image: '/images/work-video.png',    href: '/portfolio', span: 'col-span-1 row-span-1' },
]

function PortfolioItem({
  item,
  index,
}: {
  item: (typeof WORKS)[0]
  index: number
}) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 + index * 4 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
      className={item.span}
    >
      <Link
        href={item.href}
        className="group relative block w-full h-full min-h-[200px] rounded-2xl overflow-hidden border border-[#DCEBFF] bg-[#F5FAFF]"
        style={{ minHeight: item.span.includes('row-span-2') ? '420px' : '200px' }}
      >
        {/* image */}
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
        />

        {/* base gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/70 via-[#071A3D]/10 to-transparent" />

        {/* hover overlay */}
        <div className="absolute inset-0 bg-[#0066FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* category pill — always visible */}
        <div className="absolute top-4 left-4">
          <span className="rounded-full bg-white/90 backdrop-blur-sm border border-[#DCEBFF] px-2.5 py-0.5 text-xs font-semibold text-[#102A56]">
            {item.category}
          </span>
        </div>

        {/* arrow icon top-right — appears on hover */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight size={14} className="text-[#0066FF]" />
        </div>

        {/* title — slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
          <div className="text-sm font-bold text-white leading-snug">{item.title}</div>
        </div>
      </Link>
    </motion.div>
  )
}

export function HomePortfolio() {
  const headRef = useRef<HTMLDivElement>(null)
  const inView  = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section className="py-24 lg:py-32 bg-[#F5FAFF]" id="portfolio">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* header */}
        <div
          ref={headRef}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3 py-1 text-xs font-semibold text-[#0066FF] mb-5">
              Selected Work
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#102A56]">
              Work that speaks<br />
              <span className="gradient-text">for itself.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066FF] hover:underline underline-offset-4 shrink-0"
            >
              View All Projects
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* asymmetric grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[220px]">
          {WORKS.map((item, i) => (
            <PortfolioItem key={item.title} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
