import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react'
import { useStore } from '../context/StoreContext.jsx'
import { CATEGORIES } from '../data/products.js'

export default function Navbar() {
  const {
    cartCount,
    state,
    setCartOpen,
    setWishlistOpen,
    query,
    setQuery,
    setCategory
  } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const wishlistCount = state.wishlist.size

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream-50/85 backdrop-blur-xl border-b border-wine-700/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-16 md:h-20 flex items-center justify-between gap-6">
          <button
            className="md:hidden text-wine-700"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <a
            href="#"
            className="font-display text-2xl md:text-3xl tracking-tightest text-wine-700 leading-none"
          >
            Blush
            <span className="serif-italic text-blush-500">ora</span>
            <span className="text-honey-500">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-[13px] uppercase tracking-[0.14em] text-wine-700/85 font-medium">
            {CATEGORIES.map((c) => (
              <a
                key={c.id}
                href="#shop"
                onClick={(e) => {
                  e.preventDefault()
                  setCategory(c.id)
                  document
                    .getElementById('shop')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="ink-link"
              >
                {c.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-2 text-wine-700">
            <button
              onClick={() => setSearchOpen((s) => !s)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-wine-700/8 transition"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => setWishlistOpen(true)}
              className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-wine-700/8 transition"
              aria-label="Wishlist"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-blush-500 text-cream-50 text-[10px] font-mono tabular w-4 h-4 rounded-full flex items-center justify-center"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative pl-3 pr-4 h-10 flex items-center gap-2 rounded-full bg-wine-700 text-cream-50 hover:bg-wine-800 transition group"
            >
              <ShoppingBag size={16} />
              <span className="text-xs uppercase tracking-[0.14em] font-medium">
                Bag
              </span>
              <span className="font-mono tabular text-xs opacity-80">
                ({cartCount})
              </span>
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
              className="overflow-hidden border-t border-wine-700/10 bg-cream-50/90 backdrop-blur-xl"
            >
              <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-5 flex items-center gap-4">
                <Search size={18} className="text-wine-700/60" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for Velvet Dusk, Smoke &amp; Rose, bath soak…"
                  className="flex-1 bg-transparent outline-none text-wine-700 placeholder:text-wine-700/40 text-lg font-display"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-wine-700/60 hover:text-wine-700"
                  aria-label="Close search"
                >
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-[70] bg-cream-50 md:hidden flex flex-col p-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl text-wine-700">
                Menu
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-wine-700"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <nav className="mt-16 flex flex-col gap-6">
              {CATEGORIES.map((c, i) => (
                <motion.a
                  key={c.id}
                  href="#shop"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  onClick={(e) => {
                    e.preventDefault()
                    setCategory(c.id)
                    setMenuOpen(false)
                    setTimeout(
                      () =>
                        document
                          .getElementById('shop')
                          ?.scrollIntoView({ behavior: 'smooth' }),
                      250
                    )
                  }}
                  className="font-display text-4xl text-wine-700 flex items-baseline gap-4"
                >
                  <span className="font-mono text-xs text-honey-600">
                    {c.tag}
                  </span>
                  {c.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
