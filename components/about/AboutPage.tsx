'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { animate, motion, useInView, useMotionValue, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Cpu,
  HeartHandshake,
  Lightbulb,
  Palette,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const STUDIO_IMAGE = '/images/about-studio.png'

const PILLARS = [
  {
    title: 'Our Mission',
    text: 'To deliver innovative and result-driven digital solutions that help brands stand out and grow.',
    icon: Target,
  },
  {
    title: 'Our Vision',
    text: 'To become a globally recognized digital agency known for creativity, technology and impact.',
    icon: Lightbulb,
  },
  {
    title: 'Our Values',
    text: 'Creativity, Collaboration, Quality, Transparency and Long-Term Partnerships.',
    icon: HeartHandshake,
  },
]

const TEAM = [
  { title: 'Design', role: 'Team Lead', position: '28% 56%' },
  { title: 'UI/UX', role: 'Designer', position: '47% 54%' },
  { title: 'Developer', role: 'Developer', position: '62% 53%' },
  { title: 'Marketing', role: 'Specialist', position: '79% 55%' },
]

const STATS = [
  { value: 200, suffix: '+', label: 'Projects Delivered', icon: Rocket },
  { value: 50, suffix: '+', label: 'Happy Clients', icon: HeartHandshake },
  { value: 8, suffix: '', label: 'Core Services', icon: Cpu },
  { value: 5, suffix: '+', label: 'Years of Experience', icon: TrendingUp },
]

const REASONS = [
  'Creative & Experienced Team',
  'Customized Solutions',
  'On-Time Delivery',
  'Ongoing Support',
]

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const count = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => count.on('change', latest => setDisplay(Math.round(latest))), [count])
  useEffect(() => {
    if (!inView) return
    const controls = animate(count, value, { duration: 1.5, ease: 'easeOut' })
    return () => controls.stop()
  }, [count, inView, value])

  return <span ref={ref}>{display}{suffix}</span>
}

export function AboutPage() {
  const heroRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLElement>(null)
  const statsInView = useInView(statsRef, { once: true, amount: 0.18 })
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const decorY = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])

  return (
    <>
      <section ref={heroRef} className="relative overflow-hidden bg-white pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div style={{ y: decorY }} className="absolute -right-40 -top-32 h-[32rem] w-[32rem] rounded-full bg-[#1683FF]/[0.08] blur-[110px]" />
          <div className="absolute -bottom-48 left-[22%] h-[28rem] w-[28rem] rounded-full bg-[#0066FF]/[0.05] blur-[100px]" />
          <div className="absolute right-[6%] top-28 h-20 w-20 rotate-12 rounded-3xl border border-[#0066FF]/15 bg-[#EAF4FF]/60" />
          <div className="absolute right-[12%] top-40 h-4 w-4 rounded-full bg-[#1683FF]/40" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:px-8">
          <div className="flex flex-col items-start gap-6">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3.5 py-1.5 text-xs font-bold text-[#0066FF]"
            >
              <Sparkles size={13} /> About Us
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
              className="max-w-xl text-5xl font-extrabold leading-[1.04] text-[#102A56] sm:text-6xl lg:text-[4.5rem]"
            >
              We&apos;re a Creative<br />
              Digital Agency<br />
              <span className="gradient-text">on a Mission.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
              className="max-w-xl text-base leading-relaxed text-[#64748B] sm:text-lg"
            >
              OyeCreatives is a team of creative thinkers, designers, and developers, united by one goal — to help brands build a strong digital presence and grow.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26, ease: EASE }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/book-now" className="group inline-flex items-center gap-2 rounded-lg btn-primary px-5 py-3 text-sm font-semibold text-white">
                Let&apos;s Work Together
                <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link href="/portfolio" className="group inline-flex items-center gap-2 rounded-lg border border-[#DCEBFF] bg-white px-5 py-3 text-sm font-semibold text-[#102A56] transition-colors hover:border-[#0066FF]/40 hover:text-[#0066FF]">
                Explore Our Work
                <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.14, ease: EASE }}
            className="relative mx-auto w-full max-w-2xl"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] border border-[#DCEBFF] bg-[#EAF4FF] shadow-[0_24px_70px_-24px_#0066FF55]"
            >
              <Image src={STUDIO_IMAGE} alt="Creative team collaborating in their studio" fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#071A3D]/25 via-transparent to-[#1683FF]/10" />
              <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-lg border border-white/70 bg-white/90 px-3 py-2 text-xs font-bold text-[#102A56] shadow-blue backdrop-blur-sm sm:bottom-7 sm:left-7">
                <Palette size={15} className="text-[#0066FF]" /> Creative Ideas
              </div>
              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-lg border border-white/70 bg-white/90 px-3 py-2 text-xs font-bold text-[#102A56] shadow-blue backdrop-blur-sm sm:left-7 sm:top-7">
                <Sparkles size={14} className="text-[#0066FF]" /> Design
              </div>
              <div className="absolute right-5 top-5 flex items-center gap-2 rounded-lg border border-white/70 bg-white/90 px-3 py-2 text-xs font-bold text-[#102A56] shadow-blue backdrop-blur-sm sm:right-7 sm:top-7">
                <TrendingUp size={15} className="text-[#0066FF]" /> Growth
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [0, 1.5, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="absolute -bottom-5 right-4 rounded-xl border border-[#DCEBFF] bg-white px-4 py-3 shadow-[0_12px_32px_-12px_#0066FF40] sm:-bottom-6 sm:right-8"
            >
              <div className="flex items-center gap-2 text-sm font-extrabold text-[#0066FF]">+248% <span className="text-[11px] font-medium text-[#64748B]">Growth</span></div>
            </motion.div>
            <div aria-hidden className="absolute -left-4 top-[38%] -z-0 h-14 w-14 rounded-2xl border border-[#0066FF]/15 bg-[#EAF4FF]/70 shadow-blue sm:-left-7" />
          </motion.div>
        </div>
      </section>

      <section className="bg-[#F5FAFF] py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative"
          >
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.25rem] border border-[#DCEBFF] shadow-[0_18px_52px_-20px_#0066FF45]">
              <Image src={STUDIO_IMAGE} alt="OyeCreatives workspace and team" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-5 -right-3 rounded-lg border border-[#DCEBFF] bg-white px-4 py-3 shadow-blue sm:right-5">
              <span className="block text-xl font-extrabold text-[#0066FF]">One team</span>
              <span className="text-xs text-[#64748B]">From idea to impact</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-col items-start gap-5"
          >
            <span className="rounded-full border border-[#DCEBFF] bg-white px-3.5 py-1.5 text-xs font-bold text-[#0066FF]">Our Story</span>
            <h2 className="text-4xl font-extrabold leading-tight text-[#102A56] sm:text-5xl">
              Turning Ideas Into<br /><span className="gradient-text">Digital Success</span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-[#64748B]">
              OyeCreatives began with a simple idea: ambitious brands deserve creative work that looks exceptional and delivers real results. That idea grew into a close-knit digital agency bringing strategy, design and technology together under one roof.
            </p>
            <div className="grid w-full gap-3 pt-2 sm:grid-cols-3">
              {[
                { title: 'Creative Designs', icon: Palette },
                { title: 'Smart Technology', icon: Cpu },
                { title: 'Measurable Results', icon: Target },
              ].map(({ title, icon: Icon }) => (
                <div key={title} className="flex items-center gap-2.5 rounded-lg border border-[#DCEBFF] bg-white px-3 py-3 text-sm font-semibold text-[#102A56]">
                  <Icon size={17} className="shrink-0 text-[#0066FF]" /> {title}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#EAF4FF] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-3 lg:px-8">
          {PILLARS.map(({ title, text, icon: Icon }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
              className="border-l-2 border-[#0066FF]/25 pl-6 sm:pl-7"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-white text-[#0066FF] shadow-sm">
                <Icon size={20} />
              </div>
              <h3 className="mb-2 text-xl font-extrabold text-[#102A56]">{title}</h3>
              <p className="max-w-sm text-sm leading-relaxed text-[#526783]">{text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col items-start gap-5"
          >
            <span className="rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3.5 py-1.5 text-xs font-bold text-[#0066FF]">Our Team</span>
            <h2 className="text-4xl font-extrabold leading-tight text-[#102A56] sm:text-[2.65rem]">
              Meet the People<br />Behind the <span className="gradient-text">Magic</span>
            </h2>
            <p className="max-w-md text-base leading-relaxed text-[#64748B]">
              We&apos;re a team of passionate designers, developers, marketers and strategists — all working together to bring your ideas to life.
            </p>
            <Link href="/book-now" className="group inline-flex items-center gap-2 rounded-lg border border-[#DCEBFF] bg-white px-4 py-2.5 text-sm font-semibold text-[#0066FF] transition-all hover:border-[#0066FF]/40 hover:bg-[#F5FAFF]">
              Join Our Team
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {TEAM.map((person, index) => (
              <motion.article
                key={person.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: EASE }}
                whileHover={{ y: -4 }}
                className="group overflow-hidden rounded-xl border border-[#DCEBFF] bg-white p-2.5 shadow-[0_6px_22px_-14px_#0066FF50] transition-shadow hover:shadow-[0_14px_30px_-14px_#0066FF55] sm:p-3"
              >
                <div className="relative aspect-[4/4.5] overflow-hidden rounded-lg bg-[#EAF4FF]">
                  <Image
                    src={STUDIO_IMAGE}
                    alt={`${person.title} team member working in the OyeCreatives studio`}
                    fill
                    sizes="(max-width: 640px) 42vw, (max-width: 1024px) 30vw, 18vw"
                    className="object-cover"
                    style={{ objectPosition: person.position, transform: 'scale(2.5)', transformOrigin: person.position }}
                  />
                </div>
                <div className="px-1 pb-1 pt-3">
                  <h3 className="text-sm font-extrabold text-[#102A56] sm:text-base">{person.title}</h3>
                  <p className="mt-0.5 text-xs text-[#64748B]">{person.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section ref={statsRef} className="relative overflow-hidden bg-gradient-to-r from-[#0066FF] via-[#1683FF] to-[#0052CC] py-14 text-white sm:py-16">
        <div aria-hidden className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'linear-gradient(to right,white 1px,transparent 1px),linear-gradient(to bottom,white 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-6 sm:grid-cols-4 lg:px-8">
          {STATS.map(({ value, suffix, label, icon: Icon }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 14 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
              className="flex flex-col items-center gap-2 text-center"
            >
              <Icon size={21} className="text-white/85" />
              <span className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                <CountUp value={value} suffix={suffix} />
              </span>
              <span className="text-xs font-medium text-white/80 sm:text-sm">{label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: EASE }}
            className="relative"
          >
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.25rem] border border-[#DCEBFF] shadow-[0_18px_52px_-20px_#0066FF45]">
              <Image src={STUDIO_IMAGE} alt="The OyeCreatives team working together" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0066FF]/15 to-transparent" />
            </div>
            <div aria-hidden className="absolute -bottom-4 -left-4 -z-0 h-16 w-16 rounded-2xl bg-[#EAF4FF]" />
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-[1fr_0.9fr] sm:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex flex-col items-start gap-5"
            >
              <span className="rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3.5 py-1.5 text-xs font-bold text-[#0066FF]">Why Choose Us</span>
              <h2 className="text-4xl font-extrabold leading-tight text-[#102A56] sm:text-[2.7rem]">
                More Than Just a<br /><span className="gradient-text">Creative Agency</span>
              </h2>
              <p className="text-sm leading-relaxed text-[#64748B]">
                We bring imaginative thinking, thoughtful technology and dependable delivery together to make every project count.
              </p>
              <Link href="/book-now" className="group inline-flex items-center gap-2 rounded-lg btn-primary px-4 py-2.5 text-sm font-semibold text-white">
                Book Now
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
              className="flex flex-col justify-center gap-4"
            >
              {REASONS.map(reason => (
                <li key={reason} className="flex items-center gap-3 text-sm font-semibold text-[#102A56]">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EAF4FF] text-[#0066FF]"><Check size={15} strokeWidth={2.5} /></span>
                  {reason}
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>
    </>
  )
}