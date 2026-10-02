export type BlogCategory = 'Design' | 'Development' | 'Branding' | 'Marketing' | 'Technology' | 'Business'

export type BlogArticle = {
  title: string
  slug: string
  category: BlogCategory
  image: string
  excerpt: string
  author: string
  date: string
  publishedAt: string
  readTime: string
  featured?: boolean
  content: { heading: string; paragraphs: string[] }[]
}

export const BLOG_CATEGORIES = [
  'All',
  'Design',
  'Development',
  'Branding',
  'Marketing',
  'Technology',
  'Business',
] as const

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    title: 'How Great Design Turns Ideas Into Powerful Digital Experiences',
    slug: 'great-design-digital-experiences',
    category: 'Design',
    image: '/images/work-website.png',
    excerpt: 'Great digital design does more than look good. It brings your story, your audience and your business goals into one clear experience.',
    author: 'OyeCreatives Editorial',
    date: 'Sep 30, 2026',
    publishedAt: '2026-09-30',
    readTime: '5 min read',
    featured: true,
    content: [
      {
        heading: 'Design is how an idea becomes an experience',
        paragraphs: [
          'The best digital experiences feel simple because someone has done the hard work of making every decision intentional. Clear hierarchy, thoughtful interaction and a distinct visual voice help people understand what matters and what to do next.',
          'That work starts by listening. When a design reflects the audience, the brand and the purpose behind a project, it becomes more than a collection of polished screens. It becomes a useful part of the relationship between a business and its customers.',
        ],
      },
      {
        heading: 'A strong process makes the difference',
        paragraphs: [
          'Good creative work moves between exploration and focus. We test ideas early, use real content to shape layouts, and bring accessibility and performance into the conversation before the final polish.',
          'The result is an experience that is memorable without getting in the way: one that earns attention, builds trust and helps people make progress.',
        ],
      },
    ],
  },
  {
    title: '5 Web Design Trends That Will Shape Modern Websites',
    slug: 'web-design-trends',
    category: 'Design',
    image: '/images/work-website.png',
    excerpt: 'From purposeful motion to clearer content, these are the shifts making websites easier to use and more memorable.',
    author: 'OyeCreatives Editorial',
    date: 'Sep 24, 2026',
    publishedAt: '2026-09-24',
    readTime: '6 min read',
    content: [
      {
        heading: 'Useful beats fashionable',
        paragraphs: [
          'Web design changes quickly, but the strongest trends solve familiar problems. Stronger editorial hierarchy helps visitors scan. Flexible layouts make content feel considered on every screen. Motion, when used with restraint, explains how an interface responds.',
          'These choices work best when they support a clear brand voice instead of competing with it. A trend is only useful when it makes the experience more understandable, accessible or distinctive.',
        ],
      },
      {
        heading: 'Five shifts worth paying attention to',
        paragraphs: [
          'Look for intentional typography, expressive but readable color, responsive image composition, small moments of feedback and simpler paths to important actions. Each can improve a site without adding clutter.',
          'Start with the needs of your visitors, then choose the ideas that help them. A website should feel current because it is useful, not because it follows every new visual convention.',
        ],
      },
    ],
  },
  {
    title: 'Why Your Brand Needs More Than Just a Logo',
    slug: 'brand-needs-more-than-a-logo',
    category: 'Branding',
    image: '/images/blog-branding.png',
    excerpt: 'A logo is one recognizable piece of a much bigger system. Learn how voice, visuals and consistency build a brand people remember.',
    author: 'OyeCreatives Editorial',
    date: 'Sep 18, 2026',
    publishedAt: '2026-09-18',
    readTime: '5 min read',
    content: [
      {
        heading: 'A brand lives in every interaction',
        paragraphs: [
          'People experience a brand through more than its mark. They notice the words on a website, the way a team responds, the packaging they open and the details that stay consistent across channels.',
          'A useful brand system gives those moments a common point of view. It defines the visual language and the tone so the business can show up with confidence wherever customers meet it.',
        ],
      },
      {
        heading: 'Build a system people can use',
        paragraphs: [
          'Start with the audience and the promise the business intends to keep. Then translate that into a flexible identity: a clear logo suite, typography, color, imagery, voice and practical guidance for everyday use.',
          'When teams can apply the system consistently, the brand becomes easier to recognize and easier to trust. The logo matters, but the experience around it is what makes it meaningful.',
        ],
      },
    ],
  },
  {
    title: 'How Performance Marketing Helps Businesses Grow',
    slug: 'performance-marketing-business-growth',
    category: 'Marketing',
    image: '/images/work-ads.png',
    excerpt: 'Connect thoughtful creative to measurable goals, then use what the data reveals to make each campaign work harder.',
    author: 'OyeCreatives Editorial',
    date: 'Sep 12, 2026',
    publishedAt: '2026-09-12',
    readTime: '7 min read',
    content: [
      {
        heading: 'Begin with a business outcome',
        paragraphs: [
          'Performance marketing works when a campaign is built around an outcome the business can recognize: qualified enquiries, product sales, bookings or another meaningful action.',
          'That clarity helps teams choose an audience, message, channel and landing experience that work together. It also makes reporting useful, because the numbers connect back to a real decision.',
        ],
      },
      {
        heading: 'Learn, then improve',
        paragraphs: [
          'A campaign is not a set-and-forget activity. Strong teams review the whole journey, from the first impression to the conversion, and look for evidence about what is helping or creating friction.',
          'Small, deliberate changes to creative, targeting or the landing page can compound over time. The goal is not more dashboards; it is better decisions and sustainable growth.',
        ],
      },
    ],
  },
  {
    title: 'Building Digital Experiences That People Remember',
    slug: 'digital-experiences-people-remember',
    category: 'Development',
    image: '/images/work-website.png',
    excerpt: 'The details behind digital products that feel intuitive, load quickly and leave a lasting impression.',
    author: 'OyeCreatives Editorial',
    date: 'Sep 06, 2026',
    publishedAt: '2026-09-06',
    readTime: '6 min read',
    content: [
      {
        heading: 'Make every interaction feel considered',
        paragraphs: [
          'A memorable digital experience is not necessarily complicated. It is one where the next step feels obvious, the interface responds consistently and the content answers the question a visitor actually has.',
          'That quality comes from close collaboration between design and development. Shared components, accessible patterns and realistic content turn a promising concept into a dependable product.',
        ],
      },
      {
        heading: 'Performance is part of the experience',
        paragraphs: [
          'Speed, responsive behavior and accessibility all shape how a site feels. A carefully built experience respects people’s time and works across the devices and conditions they use.',
          'Measure what matters, observe where people get stuck and keep improving. The strongest digital work stays useful long after launch.',
        ],
      },
    ],
  },
  {
    title: 'UI/UX Principles Every Modern Website Should Follow',
    slug: 'ui-ux-principles-modern-websites',
    category: 'Design',
    image: '/images/work-social.png',
    excerpt: 'A practical foundation for interfaces that feel clear, consistent and welcoming to a wider range of people.',
    author: 'OyeCreatives Editorial',
    date: 'Aug 29, 2026',
    publishedAt: '2026-08-29',
    readTime: '8 min read',
    content: [
      {
        heading: 'Clarity is a design decision',
        paragraphs: [
          'People should not have to decode an interface before they can use it. Clear labels, predictable navigation and a visible hierarchy make a website easier to scan and reduce unnecessary effort.',
          'Consistency matters just as much. Reusable patterns help people understand how controls behave and help teams maintain the experience as it grows.',
        ],
      },
      {
        heading: 'Design for real people and contexts',
        paragraphs: [
          'Accessible contrast, keyboard support, meaningful image descriptions and layouts that adapt to small screens are part of good user experience, not optional finishing touches.',
          'Test with realistic content and real tasks. A site becomes more useful when its choices are informed by how people actually move through it.',
        ],
      },
    ],
  },
  {
    title: 'How AI Is Changing Creative Digital Work',
    slug: 'ai-creative-digital-work',
    category: 'Technology',
    image: '/images/work-3d.png',
    excerpt: 'A grounded look at where AI can help creative teams move faster, and where human judgment still matters most.',
    author: 'OyeCreatives Editorial',
    date: 'Aug 20, 2026',
    publishedAt: '2026-08-20',
    readTime: '6 min read',
    content: [
      {
        heading: 'A tool, not a point of view',
        paragraphs: [
          'AI can help teams explore directions, organize information and speed up repetitive work. That can create more room for the questions that need human attention: what should we make, who is it for and what should it mean?',
          'The strongest use cases are specific and reviewed carefully. Teams still need to check accuracy, protect sensitive information and make sure the final work reflects the brand and its audience.',
        ],
      },
      {
        heading: 'Keep craft and responsibility in the loop',
        paragraphs: [
          'Creative quality depends on taste, context and care. A generated starting point is not the same as a considered solution, and faster output does not automatically create better outcomes.',
          'Use new tools transparently and deliberately. The opportunity is to combine their speed with human judgment, not to remove the people who give the work direction.',
        ],
      },
    ],
  },
]

export const FEATURED_ARTICLE = BLOG_ARTICLES.find(article => article.featured)!