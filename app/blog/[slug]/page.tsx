import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Clock3 } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { BlogCard } from '@/components/blog/BlogCard'
import { NewsletterSection } from '@/components/blog/NewsletterSection'
import { BLOG_ARTICLES } from '@/lib/blog'

type ArticleRouteProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return BLOG_ARTICLES.map(article => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: ArticleRouteProps): Promise<Metadata> {
  const { slug } = await params
  const article = BLOG_ARTICLES.find(item => item.slug === slug)
  if (!article) return { title: 'Article Not Found — OyeCreatives' }

  return {
    title: `${article.title} — OyeCreatives`,
    description: article.excerpt,
  }
}

export default async function ArticleRoute({ params }: ArticleRouteProps) {
  const { slug } = await params
  const article = BLOG_ARTICLES.find(item => item.slug === slug)
  if (!article) notFound()

  const sameCategory = BLOG_ARTICLES.filter(item => item.slug !== article.slug && item.category === article.category)
  const otherArticles = BLOG_ARTICLES.filter(item => item.slug !== article.slug && item.category !== article.category)
  const relatedArticles = [...sameCategory, ...otherArticles].slice(0, 3)

  return (
    <>
      <Navbar activeHref="/blog" />
      <main>
        <article>
          <header className="bg-white pb-10 pt-32 sm:pt-36 lg:pb-14 lg:pt-40">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
              <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] transition-colors hover:text-[#0066FF]">
                <ArrowLeft size={15} /> Back to all articles
              </Link>
              <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold text-[#64748B]">
                <span className="rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3 py-1 text-[#0066FF]">{article.category}</span>
                <span>{article.author}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={article.publishedAt}>{article.date}</time>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1"><Clock3 size={12} /> {article.readTime}</span>
              </div>
              <h1 className="text-4xl font-extrabold leading-tight text-[#102A56] sm:text-5xl lg:text-6xl">{article.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#64748B] sm:text-lg">{article.excerpt}</p>
            </div>
          </header>

          <div className="relative mx-auto aspect-[1.85] max-w-7xl overflow-hidden rounded-xl bg-[#EAF4FF] px-0 sm:mx-6 sm:rounded-2xl lg:mx-auto lg:px-8">
            <Image src={article.image} alt={article.title} fill priority sizes="(max-width: 1280px) 100vw, 1216px" className="object-cover" />
          </div>

          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-20 lg:px-8 lg:py-20">
            <div className="mx-auto w-full max-w-3xl">
              {article.content.map(section => (
                <section key={section.heading} className="mb-10 last:mb-0">
                  <h2 className="mb-4 text-2xl font-extrabold text-[#102A56] sm:text-3xl">{section.heading}</h2>
                  {section.paragraphs.map((paragraph, index) => <p key={index} className="mb-4 text-base leading-[1.85] text-[#526783] last:mb-0">{paragraph}</p>)}
                </section>
              ))}
              <div className="mt-10 border-t border-[#DCEBFF] pt-6">
                <Link href="/blog" className="group inline-flex items-center gap-2 text-sm font-bold text-[#0066FF]">Explore more ideas <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></Link>
              </div>
            </div>
            <aside className="hidden lg:block">
              <div className="sticky top-28 border-l border-[#DCEBFF] pl-6">
                <div className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#0066FF]">In this article</div>
                <ul className="mt-4 space-y-3">
                  {article.content.map(section => <li key={section.heading} className="text-sm leading-relaxed text-[#64748B]">{section.heading}</li>)}
                </ul>
                <div className="mt-8 h-px w-full bg-[#DCEBFF]" />
                <div className="mt-5 text-xs font-semibold text-[#64748B]">Written by</div>
                <div className="mt-1 text-sm font-bold text-[#102A56]">{article.author}</div>
              </div>
            </aside>
          </div>
        </article>

        <section className="bg-[#F5FAFF] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <span className="mb-3 inline-flex rounded-full border border-[#DCEBFF] bg-white px-3 py-1 text-xs font-bold text-[#0066FF]">Keep exploring</span>
                <h2 className="text-3xl font-extrabold text-[#102A56] sm:text-4xl">Related Articles</h2>
              </div>
              <Link href="/blog" className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-[#0066FF] sm:inline-flex">All articles <ArrowRight size={14} /></Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((related, index) => <BlogCard key={related.slug} article={related} index={index} />)}
            </div>
          </div>
        </section>
        <NewsletterSection />
      </main>
      <Footer />
    </>
  )
}