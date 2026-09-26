'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, TrendingUp, Users, Star } from 'lucide-react'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: EASE },
  }),
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-white">

      {/* ── Decorative background layer ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large top-right gradient orb */}
        <div className="absolute -top-40 -right-40 h-[700px] w-[700px] rounded-full bg-[#0066FF] opacity-[0.05] blur-[120px]" />
        {/* Bottom-left orb */}
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#1683FF] opacity-[0.06] blur-[100px]" />
        {/* Center accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[800px] rounded-full bg-[#EAF4FF] opacity-60 blur-[80px]" />
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Left: text content ── */}
          <div className="flex flex-col gap-7">

            {/* Badge */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2 self-start rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3.5 py-1.5 text-xs font-semibold text-[#0066FF]"
            >
              <Sparkles size={11} className="text-[#0066FF]" />
              Full-Service Digital Agency
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-extrabold leading-[1.08] tracking-tight text-[#102A56] text-balance"
            >
              From Idea.{' '}
              <br className="hidden sm:block" />
              To{' '}
              <span className="gradient-text">Digital Growth.</span>
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-lg text-[#64748B] leading-relaxed max-w-lg text-balance"
            >
              We design, build, and grow brands that stand out. Strategy, branding,
              web, video, and performance marketing — all under one roof.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl btn-primary px-6 py-3 text-sm font-semibold text-white"
              >
                Start Your Project
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#DCEBFF] bg-white px-6 py-3 text-sm font-semibold text-[#102A56] transition-all duration-200 hover:border-[#0066FF] hover:text-[#0066FF] hover:bg-[#F5FAFF]"
              >
                View Our Work
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex items-center gap-6 pt-2 border-t border-[#DCEBFF]"
            >
              {[
                { value: '200+', label: 'Projects Delivered' },
                { value: '50+',  label: 'Happy Clients'      },
                { value: '5+',   label: 'Years Experience'   },
              ].map((stat, i) => (
                <div key={stat.label} className={cn('flex flex-col gap-0.5', i !== 0 && 'pl-6 border-l border-[#DCEBFF]')}>
                  <span className="text-2xl font-extrabold text-[#0066FF]">{stat.value}</span>
                  <span className="text-xs text-[#64748B]">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: visual panel ── */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Main image card */}
            <div className="relative rounded-2xl overflow-hidden border border-[#DCEBFF] shadow-blue-lg w-full max-w-[520px]">
              <Image
                src="/images/hero-abstract.png"
                alt="Creative agency work showcase"
                width={640}
                height={480}
                className="w-full h-auto object-cover"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A3D]/10 to-transparent" />
            </div>

            {/* Floating stat card — top left */}
            <div className="absolute -top-4 -left-6 glass rounded-xl px-4 py-3 float shadow-blue">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-[#EAF4FF] flex items-center justify-center">
                  <TrendingUp size={16} className="text-[#0066FF]" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#102A56]">Growth Rate</div>
                  <div className="text-sm font-extrabold text-[#0066FF]">+340%</div>
                </div>
              </div>
            </div>

            {/* Floating client card — bottom right */}
            <div className="absolute -bottom-4 -right-6 glass rounded-xl px-4 py-3 float-delayed shadow-blue">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-[#EAF4FF] flex items-center justify-center">
                  <Users size={16} className="text-[#0066FF]" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#102A56]">Latest Project</div>
                  <div className="text-xs text-[#64748B]">Restaurant Brand Identity</div>
                </div>
              </div>
            </div>

            {/* Floating star rating card — bottom left */}
            <div className="absolute bottom-16 -left-8 glass rounded-xl px-3.5 py-2.5 float-slow shadow-blue">
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={11} className="fill-[#0066FF] text-[#0066FF]" />
                ))}
                <span className="text-xs font-semibold text-[#102A56] ml-1">5.0</span>
              </div>
              <div className="text-[10px] text-[#64748B] mt-0.5">Client satisfaction</div>
            </div>

            {/* Decorative orbital ring */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-[#0066FF]/8 scale-110 pointer-events-none"
              style={{ borderRadius: '50%', width: '110%', height: '110%', top: '-5%', left: '-5%' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// tiny inline helper to avoid importing cn just for one conditional
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
