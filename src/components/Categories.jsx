import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { CATEGORIES } from '../data/products.js'
import { useStore } from '../context/StoreContext.jsx'

const COVERS = {
  skincare:
    'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=900&q=80',
  makeup:
    'https://images.unsplash.com/photo-1583241800698-9c3550778f72?w=900&q=80',
  haircare:
    'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=900&q=80',
  fragrance:
    'https://images.unsplash.com/photo-1541643600914-78b084683601?w=900&q=80',
  'bath-body':
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&q=80'
}

const COPY = {
  skincare: 'Rituals for every weather',
  makeup: 'Weightless, buildable, you',
  haircare: 'Scalp-first, strand-forward',
  fragrance: 'Signatures worth stealing',
  'bath-body': 'The long soak collection'
}

export default function Categories() {
  const { setCategory } = useStore()

  return (
    <section className="py-20 md:py-28 max-w-[1400px] mx-auto px-5 md:px-10">
      <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-wine-700/60">
            Five houses, one shelf
          </p>
          <h2 className="mt-3 font-display text-wine-700 text-5xl md:text-7xl tracking-tightest leading-[0.95]">
            Pick a <span className="serif-italic text-blush-500">world</span>.
          </h2>
        </div>
        <a
          href="#shop"
          className="hidden md:inline-flex items-center gap-1 text-xs uppercase tracking-[0.22em] text-wine-700 ink-link"
          onClick={() => setCategory('all')}
        >
          Shop everything
          <ArrowUpRight size={13} />
        </a>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {CATEGORIES.map((c, i) => {
          const isTall = i === 0 || i === 3
          return (
            <motion.a
              key={c.id}
              href="#shop"
              onClick={(e) => {
                e.preventDefault()
                setCategory(c.id)
                document
                  .getElementById('shop')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.8,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover="hover"
              className={`group relative overflow-hidden rounded-[2rem] bg-cream-200 col-span-12 sm:col-span-6 lg:col-span-4 ${
                isTall ? 'lg:row-span-2 aspect-[3/4] lg:aspect-[4/6]' : 'aspect-[4/5]'
              } ${i === 2 ? 'lg:col-span-4' : ''}`}
            >
              <motion.img
                src={COVERS[c.id]}
                alt=""
                variants={{ hover: { scale: 1.08 } }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wine-900/80 via-wine-900/10 to-transparent" />
              <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.22em] text-cream-50/85">
                  {c.tag}
                </span>
                <motion.span
                  variants={{ hover: { x: 4, y: -4 } }}
                  transition={{ duration: 0.4 }}
                  className="w-9 h-9 rounded-full bg-cream-50/85 text-wine-700 flex items-center justify-center"
                >
                  <ArrowUpRight size={14} />
                </motion.span>
              </div>
              <div className="absolute left-5 right-5 bottom-5 text-cream-50">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-80">
                  {COPY[c.id]}
                </p>
                <h3 className="font-display text-3xl md:text-4xl tracking-tightest mt-1">
                  {c.label}
                </h3>
              </div>
            </motion.a>
          )
        })}
      </div>
    </section>
  )
}
