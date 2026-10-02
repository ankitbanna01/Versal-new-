'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const POSTS = [
  {
    title:    'Why Branding is the Most Important Investment You Can Make',
    excerpt:  'A strong brand is not just a logo — it is how every customer interaction feels. Here is why getting it right from day one changes everything.',
    category: 'Branding',
    image:    '/images/blog-branding.png',
    href:     '/blog',
    date:     'Sep 2026',
    readTime: '5 min read',
  },
  {
    title:    'How to Build a Website That Actually Converts Visitors into Leads',
    excerpt:  'Beautiful websites that do not convert are expensive decoration. Here is the framework we use to design sites with measurable business impact.',
    category: 'Web Design',
    image:    '/images/work-website.png',
    href:     '/blog',
    date:     'Aug 2026',
    readTime: '7 min read',
  },
  {
    title:    'The Complete Guide to Meta Ads for Local Businesses',
    excerpt:  'Facebook and Instagram advertising remains one of the highest-ROI channels for local businesses. Here is how to do it correctly.',
    category: 'Advertising',
    image:    '/images/work-ads.png',
    href:     '/blog',
    date:     'Aug 2026',
    readTime: '9 min read',
  },
]

export function HomeBlog() {
  const headRef = useRef<HTMLDivElement>(null)
  const inView  = useInView(headRef, { once: true, margin: '-60px' })

  return (
    <section className="py-24 lg:py-32 bg-white" id="blog">
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
              Insights &amp; Ideas
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#102A56]">
              Thinking out loud on<br />
              <span className="gradient-text">design and growth.</span>
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066FF] hover:underline underline-offset-4 shrink-0">
              View All Articles <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* editorial grid: large + 2 small */}
        <div className="grid lg:grid-cols-12 gap-5">

          {/* Feature post — spans 7 cols */}
          {POSTS.slice(0, 1).map((post) => {
            const ref    = useRef<HTMLDivElement>(null)
            const iv     = useInView(ref, { once: true, margin: '-60px' })
            return (
              <motion.div
                key={post.title}
                ref={ref}
                initial={{ opacity: 0, y: 28 }}
                animate={iv ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, ease: EASE }}
                className="lg:col-span-7"
              >
                <Link
                  href={post.href}
                  className="group relative flex flex-col rounded-2xl overflow-hidden border border-[#DCEBFF] bg-white h-full transition-all duration-300 hover:-translate-y-1 hover:border-[#0066FF]/40 hover:shadow-[0_16px_48px_-8px_#0066FF18]"
                >
                  {/* image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-600 group-hover:scale-[1.04]"
                      sizes="(max-width:1024px) 100vw,700px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/30 to-transparent" />
                    {/* category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="rounded-full bg-[#0066FF] px-2.5 py-0.5 text-xs font-bold text-white shadow-[0_2px_8px_0_#0066FF40]">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* text */}
                  <div className="flex flex-col gap-3 p-6">
                    <div className="flex items-center gap-3 text-xs text-[#64748B]">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-[#102A56] leading-snug group-hover:text-[#0066FF] transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center gap-1.5 text-sm font-bold text-[#0066FF] mt-auto">
                      Read Article <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}

          {/* Side posts — 2 stacked */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {POSTS.slice(1).map((post, i) => {
              const ref    = useRef<HTMLDivElement>(null)
              const iv     = useInView(ref, { once: true, margin: '-60px' })
              return (
                <motion.div
                  key={post.title}
                  ref={ref}
                  initial={{ opacity: 0, y: 24 }}
                  animate={iv ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.12 + i * 0.1, ease: EASE }}
                  className="flex-1"
                >
                  <Link
                    href={post.href}
                    className="group flex flex-col sm:flex-row lg:flex-col rounded-2xl overflow-hidden border border-[#DCEBFF] bg-white h-full transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0066FF]/40 hover:shadow-blue"
                  >
                    {/* thumbnail */}
                    <div className="relative sm:w-40 lg:w-full aspect-video overflow-hidden shrink-0">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:640px) 100vw,200px"
                      />
                    </div>
                    {/* text */}
                    <div className="flex flex-col gap-2 p-4 justify-center">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#0066FF] bg-[#EAF4FF] border border-[#DCEBFF] rounded-full px-2 py-0.5">{post.category}</span>
                        <span className="text-xs text-[#64748B]">{post.date}</span>
                      </div>
                      <h3 className="text-sm font-bold text-[#102A56] leading-snug group-hover:text-[#0066FF] transition-colors duration-200">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs font-semibold text-[#0066FF]">
                        Read <ArrowRight size={11} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
