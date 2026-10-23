import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TESTIMONIALS } from '../data/products.js'

export default function Testimonials() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % TESTIMONIALS.length), 6500)
    return () => clearInterval(t)
  }, [])

  const t = TESTIMONIALS[i]

  return (
    <section className="relative bg-wine-700 text-cream-50 py-24 md:py-32 overflow-hidden">
      {/* Giant quotes */}
      <span
        aria-hidden
        className="absolute -top-10 left-5 md:left-10 font-display text-[20rem] leading-none text-honey-500/15 select-none"
      >
        “
      </span>
      <span
        aria-hidden
        className="absolute -bottom-32 right-5 md:right-10 font-display text-[20rem] leading-none text-honey-500/15 select-none"
      >
        ”
      </span>

      <div className="max-w-4xl mx-auto px-6 md:px-10 relative text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream-50/60">
          From the house
        </p>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={t.quote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-3xl md:text-5xl leading-[1.15] tracking-tightest text-balance"
          >
            “<span className="serif-italic text-honey-400">{t.quote}</span>”
          </motion.blockquote>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div
            key={t.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 font-mono text-[12px] uppercase tracking-[0.22em] text-cream-50/70"
          >
            — {t.name} · {t.role}
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="mt-10 flex items-center justify-center gap-3">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Testimonial ${idx + 1}`}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                i === idx ? 'bg-honey-500 w-10' : 'bg-cream-50/30 w-5'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
