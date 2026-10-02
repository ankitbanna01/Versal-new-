import {
  boolean,
  doublePrecision,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

/* ---------------------------------------------------------------------------
 * Better Auth tables (camelCase columns are required by Better Auth defaults)
 * ------------------------------------------------------------------------- */
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
})

/* ---------------------------------------------------------------------------
 * Application tables
 * ------------------------------------------------------------------------- */
export const serviceCategory = pgTable('service_category', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const service = pgTable('service', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  categoryId: integer('category_id'),
  shortDescription: text('short_description').notNull().default(''),
  description: text('description').notNull().default(''),
  icon: text('icon').notNull().default('Sparkles'),
  heroImage: text('hero_image'),
  gallery: jsonb('gallery').$type<string[]>().notNull().default([]),
  deliverables: jsonb('deliverables').$type<string[]>().notNull().default([]),
  process: jsonb('process').$type<{ title: string; description: string }[]>().notNull().default([]),
  faqs: jsonb('faqs').$type<{ question: string; answer: string }[]>().notNull().default([]),
  relatedServices: jsonb('related_services').$type<string[]>().notNull().default([]),
  ctaText: text('cta_text').notNull().default('Start Your Project'),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  featured: boolean('featured').notNull().default(false),
  published: boolean('published').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const portfolioProject = pgTable('portfolio_project', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  category: text('category').notNull().default('Branding'),
  clientName: text('client_name'),
  industry: text('industry'),
  description: text('description').notNull().default(''),
  challenge: text('challenge'),
  solution: text('solution'),
  services: jsonb('services').$type<string[]>().notNull().default([]),
  projectDate: text('project_date'),
  thumbnail: text('thumbnail'),
  images: jsonb('images').$type<string[]>().notNull().default([]),
  videos: jsonb('videos').$type<string[]>().notNull().default([]),
  results: jsonb('results').$type<{ label: string; value: string }[]>().notNull().default([]),
  technology: jsonb('technology').$type<string[]>().notNull().default([]),
  externalUrl: text('external_url'),
  featured: boolean('featured').notNull().default(false),
  published: boolean('published').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const caseStudy = pgTable('case_study', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  client: text('client'),
  industry: text('industry'),
  challenge: text('challenge'),
  objectives: jsonb('objectives').$type<string[]>().notNull().default([]),
  strategy: text('strategy'),
  creativeDirection: text('creative_direction'),
  design: text('design'),
  development: text('development'),
  marketing: text('marketing'),
  advertising: text('advertising'),
  execution: text('execution'),
  results: jsonb('results').$type<{ label: string; value: string }[]>().notNull().default([]),
  gallery: jsonb('gallery').$type<string[]>().notNull().default([]),
  testimonial: text('testimonial'),
  testimonialAuthor: text('testimonial_author'),
  coverImage: text('cover_image'),
  featured: boolean('featured').notNull().default(false),
  published: boolean('published').notNull().default(true),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const testimonial = pgTable('testimonial', {
  id: serial('id').primaryKey(),
  clientName: text('client_name').notNull(),
  company: text('company'),
  role: text('role'),
  photo: text('photo'),
  content: text('content').notNull(),
  rating: integer('rating'),
  project: text('project'),
  featured: boolean('featured').notNull().default(false),
  published: boolean('published').notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const blogCategory = pgTable('blog_category', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const blogPost = pgTable('blog_post', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  coverImage: text('cover_image'),
  excerpt: text('excerpt'),
  content: text('content').notNull().default(''),
  author: text('author').notNull().default('Admin'),
  category: text('category'),
  tags: jsonb('tags').$type<string[]>().notNull().default([]),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  status: text('status').notNull().default('draft'),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const mediaAsset = pgTable('media_asset', {
  id: serial('id').primaryKey(),
  publicId: text('public_id').notNull(),
  url: text('url').notNull(),
  resourceType: text('resource_type').notNull().default('image'),
  format: text('format'),
  width: integer('width'),
  height: integer('height'),
  duration: doublePrecision('duration'),
  bytes: integer('bytes'),
  folder: text('folder'),
  category: text('category'),
  alt: text('alt'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const packages = pgTable('package', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  tagline: text('tagline'),
  description: text('description'),
  features: jsonb('features').$type<string[]>().notNull().default([]),
  ctaText: text('cta_text').notNull().default('Get a Custom Quote'),
  highlighted: boolean('highlighted').notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const contactSetting = pgTable('contact_setting', {
  id: integer('id').primaryKey().default(1),
  agencyName: text('agency_name').notNull().default('OyeCreative'),
  logo: text('logo'),
  email: text('email'),
  phone: text('phone'),
  whatsapp: text('whatsapp'),
  address: text('address'),
  instagram: text('instagram'),
  facebook: text('facebook'),
  linkedin: text('linkedin'),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  gaId: text('ga_id'),
  metaPixelId: text('meta_pixel_id'),
  ctaText: text('cta_text').notNull().default('Start Your Project'),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const lead = pgTable('lead', {
  id: serial('id').primaryKey(),
  ref: text('ref').notNull().unique(),
  name: text('name').notNull(),
  company: text('company'),
  phone: text('phone'),
  email: text('email').notNull(),
  businessType: text('business_type'),
  servicesRequired: jsonb('services_required').$type<string[]>().notNull().default([]),
  budgetRange: text('budget_range'),
  timeline: text('timeline'),
  message: text('message'),
  status: text('status').notNull().default('New'),
  assignedTo: text('assigned_to'),
  followUpDate: timestamp('follow_up_date'),
  source: text('source').default('website'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const leadNote = pgTable('lead_note', {
  id: serial('id').primaryKey(),
  leadId: integer('lead_id').notNull(),
  author: text('author'),
  body: text('body').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const leadActivity = pgTable('lead_activity', {
  id: serial('id').primaryKey(),
  leadId: integer('lead_id').notNull(),
  type: text('type').notNull(),
  detail: text('detail'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export type Service = typeof service.$inferSelect
export type PortfolioProject = typeof portfolioProject.$inferSelect
export type CaseStudy = typeof caseStudy.$inferSelect
export type Testimonial = typeof testimonial.$inferSelect
export type BlogPost = typeof blogPost.$inferSelect
export type MediaAsset = typeof mediaAsset.$inferSelect
export type Package = typeof packages.$inferSelect
export type ContactSetting = typeof contactSetting.$inferSelect
export type Lead = typeof lead.$inferSelect
export type LeadNote = typeof leadNote.$inferSelect
export type LeadActivity = typeof leadActivity.$inferSelect
