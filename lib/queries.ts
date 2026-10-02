import 'server-only'
import { db } from '@/lib/db'
import {
  blogPost,
  caseStudy,
  contactSetting,
  packages,
  portfolioProject,
  service,
  testimonial,
} from '@/lib/db/schema'
import { and, asc, desc, eq } from 'drizzle-orm'

/* ------------------------------- Settings ------------------------------- */
export async function getSettings() {
  if (!db) return null
  const rows = await db.select().from(contactSetting).where(eq(contactSetting.id, 1)).limit(1)
  return rows[0] ?? null
}

/* ------------------------------- Services ------------------------------- */
export async function getServices() {
  if (!db) return []
  return db
    .select()
    .from(service)
    .where(eq(service.published, true))
    .orderBy(asc(service.sortOrder), asc(service.title))
}

export async function getFeaturedServices(limit = 8) {
  if (!db) return []
  return db
    .select()
    .from(service)
    .where(eq(service.published, true))
    .orderBy(desc(service.featured), asc(service.sortOrder))
    .limit(limit)
}

export async function getServiceBySlug(slug: string) {
  if (!db) return null
  const rows = await db.select().from(service).where(eq(service.slug, slug)).limit(1)
  return rows[0] ?? null
}

/* ------------------------------ Portfolio ------------------------------- */
export async function getProjects() {
  if (!db) return []
  return db
    .select()
    .from(portfolioProject)
    .where(eq(portfolioProject.published, true))
    .orderBy(desc(portfolioProject.featured), asc(portfolioProject.sortOrder), desc(portfolioProject.createdAt))
}

export async function getFeaturedProjects(limit = 6) {
  if (!db) return []
  return db
    .select()
    .from(portfolioProject)
    .where(and(eq(portfolioProject.published, true), eq(portfolioProject.featured, true)))
    .orderBy(asc(portfolioProject.sortOrder))
    .limit(limit)
}

export async function getProjectBySlug(slug: string) {
  if (!db) return null
  const rows = await db
    .select()
    .from(portfolioProject)
    .where(eq(portfolioProject.slug, slug))
    .limit(1)
  return rows[0] ?? null
}

/* ----------------------------- Case Studies ----------------------------- */
export async function getCaseStudies() {
  if (!db) return []
  return db
    .select()
    .from(caseStudy)
    .where(eq(caseStudy.published, true))
    .orderBy(desc(caseStudy.featured), desc(caseStudy.createdAt))
}

export async function getCaseStudyBySlug(slug: string) {
  if (!db) return null
  const rows = await db.select().from(caseStudy).where(eq(caseStudy.slug, slug)).limit(1)
  return rows[0] ?? null
}

/* ----------------------------- Testimonials ----------------------------- */
export async function getTestimonials(onlyFeatured = false) {
  if (!db) return []
  const where = onlyFeatured
    ? and(eq(testimonial.published, true), eq(testimonial.featured, true))
    : eq(testimonial.published, true)
  return db.select().from(testimonial).where(where).orderBy(asc(testimonial.sortOrder))
}

/* -------------------------------- Blog ---------------------------------- */
export async function getPublishedPosts() {
  if (!db) return []
  return db
    .select()
    .from(blogPost)
    .where(eq(blogPost.status, 'published'))
    .orderBy(desc(blogPost.publishedAt), desc(blogPost.createdAt))
}

export async function getPostBySlug(slug: string) {
  if (!db) return null
  const rows = await db.select().from(blogPost).where(eq(blogPost.slug, slug)).limit(1)
  return rows[0] ?? null
}

/* ------------------------------ Packages -------------------------------- */
export async function getPackages() {
  if (!db) return []
  return db.select().from(packages).orderBy(asc(packages.sortOrder))
}
