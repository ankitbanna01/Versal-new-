export const SERVICE_CATEGORIES = [
  'Design',
  'Branding',
  'Video & Motion',
  'Web',
  'Marketing',
  'Advertising',
] as const

export const PORTFOLIO_CATEGORIES = [
  'Graphic Design',
  'Logo',
  'Branding',
  'Social Media',
  'Video',
  'Website',
  'Marketing',
  'Meta Ads',
  'Google Ads',
  'Photography',
  '3D',
  'Motion Graphics',
] as const

export const LEAD_STATUSES = [
  'New',
  'Contacted',
  'Qualified',
  'Proposal Sent',
  'Negotiation',
  'Won',
  'Lost',
] as const

export type LeadStatus = (typeof LEAD_STATUSES)[number]

export const LEAD_STATUS_COLORS: Record<string, string> = {
  New: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  Contacted: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Qualified: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  'Proposal Sent': 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  Negotiation: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  Won: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Lost: 'bg-red-500/15 text-red-400 border-red-500/30',
}

export const BUDGET_RANGES = [
  'Under $1,000',
  '$1,000 – $5,000',
  '$5,000 – $15,000',
  '$15,000 – $50,000',
  '$50,000+',
]

export const TIMELINES = ['ASAP', '1–2 weeks', '1 month', '2–3 months', 'Flexible']

export const BUSINESS_TYPES = [
  'Startup',
  'Small Business',
  'E-commerce',
  'Corporate',
  'Personal Brand',
  'Agency',
  'Non-profit',
  'Other',
]

export const PROCESS_STEPS = [
  { title: 'Discover', description: 'We learn your business, audience and goals to define the opportunity.' },
  { title: 'Strategy', description: 'We map positioning, messaging and a roadmap that drives measurable outcomes.' },
  { title: 'Branding', description: 'We craft the visual identity, tone and brand system that sets you apart.' },
  { title: 'Design', description: 'We design interfaces, assets and content that feel premium and on-brand.' },
  { title: 'Content', description: 'We produce copy, video, motion and imagery that tells your story.' },
  { title: 'Development', description: 'We build fast, secure, scalable digital experiences.' },
  { title: 'Marketing', description: 'We launch campaigns across the channels your customers actually use.' },
  { title: 'Advertising', description: 'We run Meta and Google ads engineered for conversions.' },
  { title: 'Lead Generation', description: 'We capture and route qualified leads into your pipeline.' },
  { title: 'Optimization', description: 'We test, measure and refine to improve performance continuously.' },
  { title: 'Growth', description: 'We scale what works into sustainable, compounding growth.' },
]

export const DEV_PROCESS = [
  'Research',
  'Wireframe',
  'UI Design',
  'Frontend',
  'Backend',
  'Database',
  'Testing',
  'Deployment',
  'Maintenance',
]

export const WEBSITE_TYPES = [
  { title: 'Business Website', description: 'Credible, conversion-focused sites for growing companies.' },
  { title: 'Landing Page', description: 'High-converting single pages built for campaigns.' },
  { title: 'Portfolio', description: 'Showcase work with elegance and performance.' },
  { title: 'E-commerce', description: 'Storefronts engineered to sell and scale.' },
  { title: 'Booking Website', description: 'Appointment and reservation systems that reduce friction.' },
  { title: 'Custom Web Application', description: 'Bespoke platforms tailored to your operations.' },
]

export const MARKETING_FUNNEL = [
  'Ad',
  'Landing Page',
  'Lead Form',
  'CRM',
  'WhatsApp / Email',
  'Sales',
  'Analytics',
]

export const WHY_CHOOSE_US = [
  { title: 'Creative Quality', description: 'Design that looks expensive and communicates with intent.', icon: 'Palette' },
  { title: 'End-to-End Execution', description: 'One partner from idea to launch to growth.', icon: 'Workflow' },
  { title: 'Business-Focused Strategy', description: 'Every decision tied to measurable outcomes.', icon: 'Target' },
  { title: 'Fast Communication', description: 'Responsive, transparent and easy to work with.', icon: 'MessageSquare' },
  { title: 'Technology Driven', description: 'Modern, secure and scalable engineering.', icon: 'Cpu' },
  { title: 'Performance Focused', description: 'Speed, SEO and conversion built in from day one.', icon: 'Gauge' },
]

export const INDUSTRIES = [
  { name: 'Restaurants', slug: 'restaurants', services: ['Branding', 'Social Media', 'Photography', 'Meta Ads'] },
  { name: 'Real Estate', slug: 'real-estate', services: ['Website Development', 'Lead Generation', 'Google Ads', 'Video Editing'] },
  { name: 'Healthcare', slug: 'healthcare', services: ['Website Design', 'Branding', 'Content Creation', 'Google Ads'] },
  { name: 'Education', slug: 'education', services: ['Website Development', 'Social Media Management', 'Content Creation', 'Meta Ads'] },
  { name: 'E-commerce', slug: 'ecommerce', services: ['Website Development', 'Meta Ads', 'Google Ads', 'Content Creation'] },
  { name: 'Startups', slug: 'startups', services: ['Branding', 'Logo Design', 'Website Development', 'Digital Marketing'] },
  { name: 'Local Businesses', slug: 'local-businesses', services: ['Branding', 'Google Ads', 'Social Media Management', 'Photography'] },
  { name: 'Events', slug: 'events', services: ['Branding', 'Video Editing', 'Social Media Management', 'Photography'] },
  { name: 'Personal Brands', slug: 'personal-brands', services: ['Branding', 'Content Creation', 'Social Media Management', 'Video Editing'] },
  { name: 'Corporate', slug: 'corporate', services: ['Website Development', 'Branding', 'Motion Graphics', 'Digital Marketing'] },
]

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Process', href: '/process' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
]
