import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Heart, Plus, Star } from 'lucide-react'
import { useStore } from '../context/StoreContext.jsx'

const SPRING = { stiffness: 180, damping: 20, mass: 0.4 }

export default function ProductCard({ product, index }) {
  const { state, dispatch, setCartOpen } = useStore()
  const isWishlisted = state.wishlist.has(product.id)
  const inCart = Boolean(state.cart[product.id])

  // Pointer-tracked 3D tilt.
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), SPRING)
  const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), SPRING)
  const glareX = useTransform(mx, [0, 1], ['0%', '100%'])
  const glareY = useTransform(my, [0, 1], ['0%', '100%'])
  const glareBg = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.45), transparent 55%)`
  )

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }
  const handleLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.7,
        delay: (index % 4) * 0.08,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover="hover"
      className="group relative"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{
          rotateX: rx,
          rotateY: ry,
          transformStyle: 'preserve-3d',
          transformPerspective: 1200
        }}
        className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-cream-200 will-change-transform"
      >
        <motion.img
          src={product.img}
          alt={product.name}
          variants={{ hover: { scale: 1.07 } }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: 'translateZ(0)' }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-wine-900/30 via-transparent to-transparent" />

        {/* Glare that follows the cursor */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: glareBg, mixBlendMode: 'overlay' }}
        />

        {product.featured && (
          <span
            className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] bg-honey-500 text-wine-800 px-2.5 py-1 rounded-full"
            style={{ transform: 'translateZ(40px)' }}
          >
            House pick
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation()
            dispatch({ type: 'TOGGLE_WISHLIST', id: product.id })
          }}
          aria-label="Toggle wishlist"
          style={{ transform: 'translateZ(60px)' }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition ${
            isWishlisted
              ? 'bg-blush-500 text-cream-50'
              : 'bg-cream-50/90 text-wine-700 hover:bg-cream-50'
          }`}
        >
          <Heart size={15} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Hover reveal CTA */}
        <motion.div
          variants={{ hover: { y: 0, opacity: 1 } }}
          initial={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-3 right-3 bottom-3"
          style={{ transform: 'translateZ(50px)' }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              dispatch({ type: 'ADD_TO_CART', id: product.id })
              setCartOpen(true)
            }}
            className="w-full h-11 bg-wine-700 text-cream-50 rounded-full flex items-center justify-center gap-2 font-medium text-xs uppercase tracking-[0.18em] hover:bg-wine-800 transition"
          >
            {inCart ? 'Add another' : 'Add to bag'}
            <Plus size={14} />
          </button>
        </motion.div>
      </motion.div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-wine-700/55">
            {product.tagline}
          </p>
          <h3 className="font-display text-lg md:text-xl text-wine-700 leading-tight mt-1 truncate">
            {product.name}
          </h3>
          <p className="text-[12.5px] text-wine-700/60 mt-1 line-clamp-2">
            {product.desc}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-display text-lg text-wine-700 tabular">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
          <p className="font-mono text-[11px] text-wine-700/60 mt-1 flex items-center justify-end gap-1 tabular">
            <Star size={11} className="fill-honey-500 stroke-honey-500" />
            {product.rating.toFixed(1)}
          </p>
        </div>
      </div>
    </motion.article>
  )
}
