'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const posts = [
  {
    title: 'Why Branding is the Most Important Investment You Can Make',
    excerpt:
      'A strong brand is not just a logo — it is how every customer interaction feels. Here is why getting it right from day one changes everything.',
    category: 'Branding',
    image: '/images/blog-branding.png',
    href: '/blog',
    date: 'Sep 2026',
  },
]

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
}

export function BlogSection() {
  return (
    <section className="py-24 lg:py-32 bg-white" id="blog">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3 py-1 text-xs font-semibold text-[#0066FF] mb-4">
              From the Blog
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#102A56] text-balance">
              Insights on design,{' '}
              <span className="gradient-text">strategy and growth</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066FF] hover:underline underline-offset-4 shrink-0"
          >
            All Articles
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Posts */}
        <div className="max-w-3xl">
          {posts.map((post) => (
            <motion.div
              key={post.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              <Link
                href={post.href}
                className="group flex flex-col sm:flex-row rounded-2xl overflow-hidden border border-[#DCEBFF] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#0066FF]/40 hover:shadow-blue-lg"
              >
                {/* Thumbnail */}
                <div className="relative sm:w-56 aspect-video sm:aspect-auto overflow-hidden shrink-0">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 224px"
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-3 p-6 justify-center">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-[#0066FF] bg-[#EAF4FF] border border-[#DCEBFF] rounded-full px-2.5 py-0.5">
                      {post.category}
                    </span>
                    <span className="text-xs text-[#64748B]">{post.date}</span>
                  </div>
                  <h3 className="font-bold text-[#102A56] leading-snug group-hover:text-[#0066FF] transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0066FF] mt-auto">
                    Read article <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
