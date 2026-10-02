'use client'

import { useDeferredValue, useState, useTransition } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Clock3, FileText, Search, Sparkles } from 'lucide-react'
import { BLOG_ARTICLES, BLOG_CATEGORIES, FEATURED_ARTICLE } from '@/lib/blog'
import type { BlogCategory } from '@/lib/blog'
import { BlogCard } from '@/components/blog/BlogCard'
import { NewsletterSection } from '@/components/blog/NewsletterSection'

const ARTICLES = BLOG_ARTICLES.filter(article => !article.featured)
const FEATURE_NOTES = [
  { title: 'Design that moves', icon: Sparkles },
  { title: 'Ideas worth keeping', icon: FileText },
]

export function BlogIndex() {
  const [category, setCategory] = useState<'All' | BlogCategory>('All')
  const [search, setSearch] = useState('')
  const [isPending, startTransition] = useTransition()
  const deferredSearch = useDeferredValue(search.trim().toLowerCase())

  const articles = ARTICLES.filter(article => {
    const matchesCategory = category === 'All' || article.category === category
    const searchable = `${article.title} ${article.excerpt} ${article.category}`.toLowerCase()
    return matchesCategory && (!deferredSearch || searchable.includes(deferredSearch))
  })

  return (
    <>
      <section className="relative overflow-hidden bg-white pb-16 pt-32 sm:pt-36 lg:pb-20 lg:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-36 h-[30rem] w-[30rem] rounded-full bg-[#1683FF]/[0.08] blur-[105px]" />
          <div className="absolute -bottom-40 left-[10%] h-80 w-80 rounded-full bg-[#0066FF]/[0.045] blur-[90px]" />
          <div className="absolute left-[8%] top-40 h-11 w-11 rotate-12 rounded-2xl border border-[#0066FF]/15 bg-[#EAF4FF]/60" />
          <div className="absolute right-[8%] top-44 h-2.5 w-2.5 rounded-full bg-[#1683FF]/60 shadow-[0_0_18px_#1683FF70]" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:px-8">
          <div className="flex flex-col items-start gap-6">
            <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3.5 py-1.5 text-xs font-bold text-[#0066FF]">
              <Sparkles size={13} /> Our Blog
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.07 }} className="max-w-2xl text-5xl font-extrabold leading-[1.04] text-[#102A56] sm:text-6xl lg:text-[4.5rem]">
              Ideas, Insights &amp;<br /><span className="gradient-text">Digital Inspiration.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="max-w-xl text-base leading-relaxed text-[#64748B] sm:text-lg">
              Explore ideas, trends and practical insights about design, technology, branding and digital growth.
            </motion.p>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.97, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.12 }} className="relative mx-auto w-full max-w-2xl">
            <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="relative aspect-[1.35] overflow-hidden rounded-[1.2rem] border border-[#DCEBFF] bg-[#EAF4FF] shadow-[0_22px_64px_-22px_#0066FF50]">
              <Image src="/images/work-website.png" alt="A digital article experience on a laptop" fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#071A3D]/40 via-transparent to-[#1683FF]/10" />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-lg border border-white/70 bg-white/90 px-3 py-2.5 shadow-blue backdrop-blur-sm sm:inset-x-6 sm:bottom-6 sm:px-4">
                <span className="flex items-center gap-2 text-xs font-bold text-[#102A56] sm:text-sm"><FileText size={15} className="text-[#0066FF]" /> The Creative Brief</span>
                <span className="text-[10px] text-[#64748B]">Ideas in progress</span>
              </div>
            </motion.div>
            <motion.div animate={{ y: [0, -5, 0], rotate: [0, 1, 0] }} transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }} className="absolute -left-3 top-5 flex items-center gap-2 rounded-lg border border-[#DCEBFF] bg-white/95 px-3 py-2 shadow-blue sm:-left-7 sm:top-8">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#EAF4FF] text-[#0066FF]"><Sparkles size={15} /></span>
              <span className="text-[10px] font-bold text-[#102A56] sm:text-xs">Fresh perspectives</span>
            </motion.div>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }} className="absolute -right-2 top-[28%] hidden w-36 rounded-lg border border-[#DCEBFF] bg-white p-3 shadow-[0_14px_32px_-16px_#0066FF60] sm:block">
              <div className="mb-2 flex items-center gap-2 text-[10px] font-bold text-[#102A56]"><span className="h-2 w-2 rounded-full bg-[#1683FF]" /> Notes for later</div>
              {[0, 1, 2].map(index => <div key={index} className={`mb-1.5 h-1.5 rounded-full ${index === 0 ? 'w-full bg-[#B8D7FF]' : index === 1 ? 'w-4/5 bg-[#EAF4FF]' : 'w-3/5 bg-[#EAF4FF]'}`} />)}
            </motion.div>
            <div className="absolute -bottom-4 right-8 flex items-center gap-2 rounded-lg border border-[#DCEBFF] bg-white px-3 py-2 text-[10px] font-bold text-[#0066FF] shadow-blue sm:right-12 sm:text-xs">
              <ArrowUpRight size={14} /> Ideas into action
            </div>
            {FEATURE_NOTES.map(({ title, icon: Icon }, index) => (
              <span key={title} aria-hidden="true" className={`absolute ${index === 0 ? 'right-[16%] top-[8%]' : 'bottom-[23%] left-[7%]'} hidden h-9 w-9 items-center justify-center rounded-xl border border-white/75 bg-white/80 text-[#1683FF] shadow-sm sm:flex`}>
                <Icon size={15} />
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#F5FAFF] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-[#0066FF]" />
            <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#0066FF]">Featured Article</span>
          </div>
          <Link href={`/blog/${FEATURED_ARTICLE.slug}`} className="group grid overflow-hidden rounded-[1.15rem] border border-[#DCEBFF] bg-white shadow-[0_18px_50px_-30px_#0066FF50] transition-shadow hover:shadow-[0_22px_55px_-26px_#0066FF60] lg:grid-cols-[1.12fr_0.88fr]">
            <div className="relative aspect-[1.55] overflow-hidden bg-[#EAF4FF] lg:aspect-auto lg:min-h-[24rem]">
              <Image src={FEATURED_ARTICLE.image} alt={FEATURED_ARTICLE.title} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/25 to-transparent" />
              <span className="absolute bottom-5 left-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0066FF] shadow-lg transition-transform duration-300 group-hover:translate-x-1 sm:bottom-7 sm:left-7"><ArrowRight size={18} /></span>
            </div>
            <div className="flex flex-col items-start justify-center p-6 sm:p-9 lg:p-10">
              <span className="mb-5 rounded-full border border-[#B8D7FF] bg-[#EAF4FF] px-3 py-1 text-xs font-bold text-[#0066FF]">Featured · {FEATURED_ARTICLE.category}</span>
              <h2 className="text-2xl font-extrabold leading-tight text-[#102A56] transition-colors group-hover:text-[#0066FF] sm:text-3xl lg:text-[2.1rem]">{FEATURED_ARTICLE.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#64748B] sm:text-base">{FEATURED_ARTICLE.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#74849A]">
                <span className="inline-flex items-center gap-1.5"><Clock3 size={13} /> {FEATURED_ARTICLE.readTime}</span>
                <span>{FEATURED_ARTICLE.date}</span>
              </div>
              <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#0066FF]">Read Article <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" /></span>
            </div>
          </Link>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-9 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="mb-3 inline-flex rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3 py-1.5 text-xs font-bold text-[#0066FF]">The Journal</span>
              <h2 className="text-3xl font-extrabold text-[#102A56] sm:text-4xl">Explore the <span className="gradient-text">latest ideas.</span></h2>
            </div>
            <label className="relative block w-full lg:max-w-xs">
              <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8292A8]" />
              <span className="sr-only">Search articles</span>
              <input
                type="search"
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder="Search articles..."
                className="w-full rounded-lg border border-[#DCEBFF] bg-white py-3 pl-10 pr-4 text-sm text-[#102A56] outline-none transition-shadow placeholder:text-[#8292A8] focus:border-[#1683FF] focus:ring-2 focus:ring-[#1683FF]/15"
              />
            </label>
          </div>

          <div className="mb-8 overflow-x-auto pb-2 [scrollbar-width:thin]">
            <div className="flex min-w-max gap-2" role="group" aria-label="Filter articles by category">
              {BLOG_CATEGORIES.map(item => {
                const active = category === item
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={active}
                    onClick={() => startTransition(() => setCategory(item))}
                    className={`relative rounded-full border px-4 py-2 text-xs font-semibold transition-colors duration-200 sm:text-sm ${active ? 'border-[#0066FF] text-white' : 'border-[#DCEBFF] bg-white text-[#64748B] hover:border-[#B8D7FF] hover:text-[#0066FF]'}`}
                  >
                    {active && <motion.span layoutId="blog-category-pill" className="absolute inset-0 -z-0 rounded-full bg-[#0066FF]" transition={{ type: 'spring', stiffness: 360, damping: 30 }} />}
                    <span className="relative z-10">{item}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div aria-live="polite" aria-busy={isPending || search !== deferredSearch}>
            <AnimatePresence mode="popLayout">
              {articles.length > 0 ? (
                <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {articles.map((article, index) => <BlogCard key={article.slug} article={article} index={index} />)}
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed border-[#B8D7FF] bg-[#F5FAFF] px-6 text-center">
                  <Search size={22} className="mb-3 text-[#1683FF]" />
                  <h3 className="text-base font-bold text-[#102A56]">No articles found</h3>
                  <p className="mt-1 text-sm text-[#64748B]">Try another search or choose a different category.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  )
}