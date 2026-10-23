import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { EDITORIAL } from '../data/products.js'

export default function Editorial() {
  return (
    <section id="journal" className="py-20 md:py-28 max-w-[1400px] mx-auto px-5 md:px-10">
      <div className="grid grid-cols-12 gap-6 items-end mb-10 md:mb-14">
        <div className="col-span-12 md:col-span-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-wine-700/60">
            The Journal
          </p>
          <h2 className="mt-3 font-display text-wine-700 text-5xl md:text-7xl tracking-tightest leading-[0.95]">
            Essays for the
            <br />
            <span className="serif-italic text-blush-500">slow shopper</span>.
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5 md:text-right">
          <p className="text-wine-700/70 text-[14.5px] max-w-md md:ml-auto leading-relaxed">
            A quiet corner of the house for long reads about ingredients,
            rituals, and the humans who build the formulas you buy.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 md:gap-8">
        {EDITORIAL.map((e, i) => (
          <motion.a
            key={i}
            href="#"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.8,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
            whileHover="hover"
            className={`relative group col-span-12 md:col-span-6 lg:col-span-4 ${
              i === 1 ? 'lg:translate-y-10' : ''
            }`}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-cream-200">
              <motion.img
                src={e.img}
                alt=""
                variants={{ hover: { scale: 1.06 } }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wine-900/50 via-transparent to-transparent" />
              <motion.span
                variants={{ hover: { x: 4, y: -4 } }}
                transition={{ duration: 0.4 }}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-cream-50 text-wine-700 flex items-center justify-center"
              >
                <ArrowUpRight size={16} />
              </motion.span>
            </div>
            <div className="mt-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-wine-700/60">
                {e.kicker} · {e.read}
              </p>
              <h3 className="mt-3 font-display text-2xl md:text-3xl tracking-tightest text-wine-700 leading-tight">
                {e.title}
              </h3>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
