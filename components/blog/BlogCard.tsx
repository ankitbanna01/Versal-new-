'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Clock3 } from 'lucide-react'
import type { BlogArticle } from '@/lib/blog'

export function BlogCard({ article, index = 0 }: { article: BlogArticle; index?: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35, delay: index * 0.045 }}
      whileHover={{ y: -4 }}
      className="group h-full"
    >
      <Link
        href={`/blog/${article.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-xl border border-[#DCEBFF] bg-white transition-shadow duration-300 hover:border-[#B8D7FF] hover:shadow-[0_16px_42px_-22px_#0066FF65]"
      >
        <div className="relative aspect-[1.56] overflow-hidden bg-[#EAF4FF]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.045]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/35 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/95 px-2.5 py-1 text-[10px] font-bold text-[#526783] shadow-sm transition-colors group-hover:bg-[#0066FF] group-hover:text-white sm:text-xs">
            {article.category}
          </span>
          <span className="absolute bottom-4 right-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white text-[#0066FF] opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowRight size={16} />
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="mb-3 flex items-center gap-2 text-[11px] text-[#7A8BA4]">
            <span>{article.date}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1"><Clock3 size={12} /> {article.readTime}</span>
          </div>
          <h3 className="text-lg font-extrabold leading-snug text-[#102A56] transition-colors group-hover:text-[#0066FF] sm:text-xl">
            {article.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#64748B]">{article.excerpt}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0066FF]">
            Read More <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}