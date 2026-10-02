export const PRICING_PERIODS = ['Monthly', '3 Months', '6 Months', '1 Year'] as const
export type PricingPeriod = (typeof PRICING_PERIODS)[number]

export const PERIOD_COPY: Record<PricingPeriod, string> = {
  Monthly: 'month-to-month engagement',
  '3 Months': 'quarterly engagement',
  '6 Months': 'six-month partnership',
  '1 Year': 'annual partnership',
}

export const PRICING_PLANS = [
  {
    slug: 'starter',
    name: 'Starter',
    description: 'Perfect for new businesses and personal brands just getting started.',
    features: [
      'Social media content',
      'Basic creative design',
      'Monthly strategy',
      'Performance tracking',
      'Email support',
    ],
  },
  {
    slug: 'growth',
    name: 'Growth',
    description: 'Ideal for established businesses ready to scale their digital presence.',
    features: [
      'Social media content',
      'Reels and short-form creative',
      'Creative campaigns',
      'Monthly strategy',
      'Performance tracking',
      'Growth reporting',
      'Priority support',
    ],
  },
  {
    slug: 'pro',
    name: 'Pro',
    description: 'For brands looking for a broader, ongoing creative partnership.',
    features: [
      'Advanced content',
      'Reels and campaigns',
      'Branding support',
      'Paid advertising support',
      'Strategy',
      'Analytics and reporting',
      'Dedicated support',
    ],
  },
] as const

export const SERVICE_QUOTES = [
  { name: 'Website Design & Development', description: 'A considered digital home built around your goals.' },
  { name: 'Software Development', description: 'Purpose-built platforms, tools and digital products.' },
  { name: 'Graphic Design', description: 'Visual assets for the moments your brand shows up.' },
  { name: 'Digital Marketing', description: 'A clear strategy for growing reach and demand.' },
  { name: 'Branding', description: 'A distinctive identity system with room to grow.' },
  { name: 'Logo Design', description: 'A recognisable mark made for your brand.' },
  { name: 'Photography', description: 'Purposeful imagery for products, people and places.' },
  { name: 'Google Ads', description: 'Search campaigns shaped around your objectives.' },
  { name: 'Meta Ads', description: 'Campaign creative for Facebook and Instagram.' },
] as const

export const INCLUDED_FEATURES = [
  { title: 'Creative Strategy', icon: 'strategy' },
  { title: 'Professional Design', icon: 'design' },
  { title: 'Content & Development', icon: 'development' },
  { title: 'Performance Tracking', icon: 'tracking' },
  { title: 'Regular Communication', icon: 'communication' },
  { title: 'Ongoing Support', icon: 'support' },
] as const

export const COMPARISON_FEATURES = [
  { title: 'Social media content', starter: true, growth: true, pro: true },
  { title: 'Reels and short-form creative', starter: false, growth: true, pro: true },
  { title: 'Creative campaigns', starter: false, growth: true, pro: true },
  { title: 'Branding support', starter: false, growth: false, pro: true },
  { title: 'Paid advertising support', starter: false, growth: false, pro: true },
  { title: 'Performance tracking', starter: true, growth: true, pro: true },
  { title: 'Growth reporting', starter: false, growth: true, pro: true },
  { title: 'Ongoing support', starter: true, growth: true, pro: true },
] as const

export const FAQS = [
  {
    question: 'Can I customize a pricing plan?',
    answer: 'Yes. Share your goals and requirements and we can shape the scope around what your project actually needs.',
  },
  {
    question: 'How do I choose the right plan?',
    answer: 'Start with the outcomes you want and the support you need. We will talk through the options and recommend a suitable scope before you commit.',
  },
  {
    question: 'Can I upgrade my plan later?',
    answer: 'Yes. We can review your needs together and adjust the scope as your business changes.',
  },
  {
    question: 'Do you offer custom services?',
    answer: 'Yes. We can scope individual services or a combination of creative, technology and marketing work.',
  },
  {
    question: 'How does payment work?',
    answer: 'Payment terms are outlined in your project proposal before work begins. The schedule depends on the agreed scope and engagement.',
  },
  {
    question: 'Can I book a consultation before starting?',
    answer: 'Absolutely. Send us a brief and we can arrange an initial conversation to understand your goals and answer questions.',
  },
] as const