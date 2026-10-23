import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Plus, X } from 'lucide-react'
import { useStore } from '../context/StoreContext.jsx'

export default function WishlistDrawer() {
  const {
    wishlistOpen,
    setWishlistOpen,
    wishlistItems,
    dispatch,
    setCartOpen
  } = useStore()

  return (
    <AnimatePresence>
      {wishlistOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setWishlistOpen(false)}
            className="fixed inset-0 z-[80] bg-wine-900/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '110%' }}
            animate={{ x: 0 }}
            exit={{ x: '110%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[90] w-full sm:w-[460px] bg-cream-50 flex flex-col"
          >
            <header className="p-6 flex items-center justify-between border-b border-wine-700/10">
              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-wine-700/60">
                  Saved for later
                </p>
                <h3 className="font-display text-3xl text-wine-700 mt-1">
                  Your{' '}
                  <span className="serif-italic text-blush-500">wishlist</span>
                </h3>
              </div>
              <button
                onClick={() => setWishlistOpen(false)}
                className="w-10 h-10 rounded-full hover:bg-wine-700/8 flex items-center justify-center text-wine-700"
                aria-label="Close wishlist"
              >
                <X size={18} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {wishlistItems.length === 0 ? (
                <div className="py-16 text-center">
                  <Heart
                    size={32}
                    className="mx-auto text-blush-500 mb-5"
                    strokeWidth={1.4}
                  />
                  <p className="font-display text-wine-700 text-3xl tracking-tightest leading-tight">
                    Nothing saved
                    <br />
                    <span className="serif-italic text-blush-500">yet</span>.
                  </p>
                  <p className="text-wine-700/60 mt-4 text-sm">
                    Tap the heart on anything you want to remember.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-wine-700/10">
                  <AnimatePresence>
                    {wishlistItems.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        className="py-5 flex gap-4 items-center"
                      >
                        <div className="w-20 h-24 shrink-0 rounded-xl overflow-hidden bg-cream-200">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-lg text-wine-700 leading-tight truncate">
                            {item.name}
                          </p>
                          <p className="text-[12px] text-wine-700/55 mt-0.5 line-clamp-2">
                            {item.desc}
                          </p>
                          <p className="font-mono text-[12px] text-wine-700 tabular mt-2">
                            ₹{item.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <button
                            onClick={() => {
                              dispatch({ type: 'ADD_TO_CART', id: item.id })
                              setWishlistOpen(false)
                              setCartOpen(true)
                            }}
                            className="w-9 h-9 rounded-full bg-wine-700 text-cream-50 flex items-center justify-center hover:bg-wine-800 transition"
                            aria-label="Add to bag"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() =>
                              dispatch({
                                type: 'TOGGLE_WISHLIST',
                                id: item.id
                              })
                            }
                            className="w-9 h-9 rounded-full border border-wine-700/15 text-wine-700/70 hover:text-blush-500 flex items-center justify-center transition"
                            aria-label="Remove"
                          >
                            <Heart size={14} fill="currentColor" />
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
