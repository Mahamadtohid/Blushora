import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.2 }
  }
}
const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
  }
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  // Parallax: image drifts down slower, tiles drift up, headline eases up.
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const tileY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
  const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.4])

  return (
    <section
      ref={ref}
      className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 relative">
        {/* Decorative seal moved low-left so it doesn't collide with the floating lipstick */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="hidden lg:block absolute bottom-10 left-8 w-24 h-24 slow-spin"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-wine-700/80">
            <defs>
              <path
                id="circle"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <text className="font-mono" fontSize="7" letterSpacing="2.4">
              <textPath href="#circle">
                BLUSHORA · EST 2026 · BEAUTY, CURATED ·
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Scroll hint — invites the user to begin the drawing */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="hidden lg:flex absolute top-28 right-10 flex-col items-end gap-2 text-wine-700/70 font-mono text-[10.5px] uppercase tracking-[0.22em]"
        >
          <span>Scroll to open · draw</span>
          <svg
            viewBox="0 0 12 24"
            className="w-3 h-6 stroke-wine-700/50 fill-none"
            strokeWidth="1.4"
          >
            <rect x="1" y="1" width="10" height="22" rx="5" />
            <motion.circle
              cx="6"
              cy="7"
              r="1.6"
              className="fill-wine-700/70 stroke-none"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-12 gap-6 md:gap-8 items-end"
        >
          {/* Left column — eyebrow + mini meta */}
          <div className="col-span-12 md:col-span-3 md:pb-8 space-y-5">
            <motion.div
              variants={item}
              className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-wine-700/70 font-mono"
            >
              <Sparkles size={12} className="text-honey-500" />
              Edit — Autumn / Winter 2026
            </motion.div>
            <motion.p
              variants={item}
              className="text-[13.5px] leading-relaxed text-wine-700/70 max-w-xs"
            >
              An original beauty house. Clean ingredients, slow routines, and a
              shade range that doesn’t stop at Fair-Beige.
            </motion.p>
            <motion.div
              variants={item}
              className="flex items-center gap-4 pt-2"
            >
              <div className="h-px w-10 bg-wine-700/40" />
              <span className="font-mono text-[11px] text-wine-700/60 tabular">
                No. 0001 / 0008
              </span>
            </motion.div>
          </div>

          {/* Center — the headline */}
          <motion.div
            className="col-span-12 md:col-span-9"
            style={{ y: headlineY, opacity: headlineOpacity }}
          >
            <motion.h1
              variants={item}
              className="font-display font-light text-wine-700 tracking-tightest text-[14vw] md:text-[11.5vw] leading-[0.86] text-balance"
            >
              Beauty,
              <br />
              <span className="serif-italic text-blush-500">curated</span>
              <span className="inline-block relative">
                <svg
                  viewBox="0 0 100 20"
                  className="inline-block w-16 md:w-28 ml-2 md:ml-4 fill-honey-500 align-middle"
                >
                  <path d="M0 10 Q 25 -5 50 10 T 100 10 L 100 20 L 0 20 Z" />
                </svg>
              </span>
              <br />
              slowly.
            </motion.h1>
          </motion.div>
        </motion.div>

        {/* Image strip + CTA */}
        <div className="mt-10 md:mt-14 grid grid-cols-12 gap-5 md:gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 md:col-span-7 relative aspect-[16/10] rounded-[2.5rem] overflow-hidden bg-wine-700"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1600&q=80"
              alt="A tabletop still-life of amber dropper bottles and warm cream flowers."
              style={{ y: imageY, scale: imageScale }}
              className="absolute -top-10 -bottom-10 left-0 right-0 w-full h-[120%] object-cover opacity-95 will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-wine-800/60 via-transparent to-honey-500/0" />
            <div className="absolute bottom-5 md:bottom-8 left-5 md:left-8 right-5 md:right-8 flex items-end justify-between gap-6 text-cream-50">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-80">
                  The Golden Hour Edit
                </p>
                <p className="font-display text-2xl md:text-3xl mt-2 max-w-md leading-tight">
                  Three warm-weather rituals. One
                  <span className="serif-italic"> lit-from-within </span>
                  finish.
                </p>
              </div>
              <a
                href="#shop"
                className="hidden md:inline-flex items-center gap-2 bg-cream-50 text-wine-700 pill text-xs uppercase tracking-[0.18em] hover:bg-honey-500 hover:text-wine-800"
              >
                Shop the edit <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: tileY }}
            className="col-span-12 md:col-span-5 grid grid-rows-2 gap-5 md:gap-8 will-change-transform"
          >
            <div className="relative rounded-[2rem] overflow-hidden bg-blush-400/40 flex items-end p-6">
              <img
                src="https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?w=1200&q=80"
                alt="A hand holding a glossy blush compact against a warm cream background."
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative text-cream-50">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-90">
                  New / 06
                </p>
                <p className="font-display text-xl mt-1">Hush Blush, dropped.</p>
              </div>
            </div>
            <div className="relative rounded-[2rem] overflow-hidden bg-honey-500/80 p-6 flex flex-col justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-wine-800">
                The Journal
              </p>
              <div>
                <p className="font-display text-wine-800 text-2xl leading-tight max-w-[220px]">
                  How a scent becomes a <em className="serif-italic">memory</em>.
                </p>
                <a
                  href="#journal"
                  className="mt-3 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.22em] text-wine-800 ink-link"
                >
                  Read Edit 10
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom-strip meta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-10 md:mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-wine-700/15 pt-6 text-[11px] font-mono uppercase tracking-[0.22em] text-wine-700/60"
        >
          <span>Clean-ingredient certified</span>
          <span className="hidden sm:inline">
            Cruelty-free · Dermatologist-tested
          </span>
          <span>Ships from India, worldwide</span>
          <span className="hidden md:inline">Free returns, 30 days</span>
        </motion.div>
      </div>
    </section>
  )
}
