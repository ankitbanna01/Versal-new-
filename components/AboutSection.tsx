'use client'

import type { ElementType } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Palette, Workflow, Target, MessageSquare, Cpu, Gauge } from 'lucide-react'
import { WHY_CHOOSE_US } from '@/lib/constants'

const iconMap: Record<string, ElementType> = {
  Palette,
  Workflow,
  Target,
  MessageSquare,
  Cpu,
  Gauge,
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: EASE },
  }),
}

export function AboutSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#F5FAFF]" id="about">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Two-col: image + text */}
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center mb-20">

          {/* Image */}
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-[#DCEBFF] shadow-blue-lg"
          >
            <Image
              src="/images/about-studio.png"
              alt="OyeCreative team at work"
              width={640}
              height={480}
              className="w-full h-auto object-cover"
            />
            {/* Decorative accent */}
            <div className="absolute -bottom-3 -right-3 h-16 w-16 rounded-2xl bg-[#0066FF] opacity-10 blur-xl" />
          </motion.div>

          {/* Text */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#DCEBFF] bg-[#EAF4FF] px-3 py-1 text-xs font-semibold text-[#0066FF]">
              About the Studio
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#102A56] text-balance">
              One studio,{' '}
              <span className="gradient-text">every discipline</span>
            </h2>
            <p className="text-[#64748B] leading-relaxed">
              OyeCreative is a full-service creative and digital agency. We partner with founders,
              marketers, and enterprise teams to build brands that are memorable, digital experiences
              that convert, and marketing systems that scale.
            </p>
            <p className="text-[#64748B] leading-relaxed">
              We believe great design and smart strategy are inseparable. That is why we keep
              everything — strategy, creative, tech, and media — under one roof, so nothing gets lost
              in translation.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066FF] hover:underline underline-offset-4 self-start"
            >
              Learn more about us
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Why choose us */}
        <div>
          <h3 className="text-xl font-extrabold text-[#102A56] mb-8">
            Why teams choose OyeCreative
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_CHOOSE_US.map((item, i) => {
              const Icon = iconMap[item.icon] ?? Palette
              return (
                <motion.div
                  key={item.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-40px' }}
                  className="flex gap-4 rounded-2xl border border-[#DCEBFF] bg-white p-5 transition-all duration-300 hover:border-[#0066FF]/40 hover:shadow-blue"
                >
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-[#EAF4FF] flex items-center justify-center">
                    <Icon size={18} className="text-[#0066FF]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#102A56] text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-[#64748B] leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
