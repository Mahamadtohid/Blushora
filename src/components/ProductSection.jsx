import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../context/StoreContext.jsx'
import { CATEGORIES } from '../data/products.js'
import ProductCard from './ProductCard.jsx'

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price · low → high' },
  { id: 'price-desc', label: 'Price · high → low' },
  { id: 'name', label: 'Name · A–Z' }
]

export default function ProductSection() {
  const {
    filteredProducts,
    category,
    setCategory,
    sort,
    setSort,
    query
  } = useStore()

  return (
    <section
      id="shop"
      className="py-20 md:py-28 bg-cream-100/60 relative"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10 md:mb-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-wine-700/60">
              The Shelf — {filteredProducts.length} products
            </p>
            <h2 className="mt-3 font-display text-wine-700 text-5xl md:text-7xl tracking-tightest leading-[0.95]">
              Shop by <span className="serif-italic text-blush-500">intention</span>.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-wine-700/60">
              Sort
            </label>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none bg-cream-50 border border-wine-700/20 rounded-full pl-5 pr-10 h-11 font-medium text-sm text-wine-700 focus:outline-none focus:border-wine-700"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-wine-700 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-10 md:mb-14">
          <Pill
            active={category === 'all'}
            onClick={() => setCategory('all')}
            label="All"
            tag="00"
          />
          {CATEGORIES.map((c) => (
            <Pill
              key={c.id}
              active={category === c.id}
              onClick={() => setCategory(c.id)}
              label={c.label}
              tag={c.tag}
            />
          ))}
        </div>

        {/* Grid or empty state */}
        <AnimatePresence mode="wait">
          {filteredProducts.length ? (
            <motion.div
              key={`${category}-${sort}-${query}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7"
            >
              {filteredProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="py-24 text-center"
            >
              <p className="font-display text-wine-700 text-4xl md:text-5xl tracking-tightest">
                Nothing on this shelf,
                <br />
                <span className="serif-italic text-blush-500">yet</span>.
              </p>
              <p className="text-wine-700/60 mt-4">
                Try a different search or clear your filters.
              </p>
              <button
                onClick={() => setCategory('all')}
                className="mt-6 pill bg-wine-700 text-cream-50 text-xs uppercase tracking-[0.18em]"
              >
                Show everything
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function Pill({ active, onClick, label, tag }) {
  return (
    <button
      onClick={onClick}
      className={`group h-10 md:h-11 pl-3 pr-5 rounded-full border transition flex items-center gap-2 text-sm font-medium ${
        active
          ? 'bg-wine-700 text-cream-50 border-wine-700'
          : 'bg-cream-50 text-wine-700 border-wine-700/15 hover:border-wine-700/60'
      }`}
    >
      <span
        className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full ${
          active
            ? 'bg-honey-500/90 text-wine-800'
            : 'bg-wine-700/8 text-wine-700/60'
        }`}
      >
        {tag}
      </span>
      {label}
    </button>
  )
}
