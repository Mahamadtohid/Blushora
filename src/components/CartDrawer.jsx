import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, Trash2, X } from 'lucide-react'
import { useStore } from '../context/StoreContext.jsx'

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cartItems, subtotal, dispatch } = useStore()

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setCartOpen(false)}
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
                  Your bag
                </p>
                <h3 className="font-display text-3xl text-wine-700 mt-1">
                  The{' '}
                  <span className="serif-italic text-blush-500">edit</span>
                </h3>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="w-10 h-10 rounded-full hover:bg-wine-700/8 flex items-center justify-center text-wine-700"
                aria-label="Close bag"
              >
                <X size={18} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartItems.length === 0 && (
                <div className="py-16 text-center">
                  <p className="font-display text-wine-700 text-3xl tracking-tightest">
                    An empty bag,
                    <br />
                    <span className="serif-italic text-blush-500">
                      full of possibility
                    </span>
                    .
                  </p>
                  <p className="text-wine-700/60 mt-4 text-sm">
                    Add anything from the shelf to see it here.
                  </p>
                </div>
              )}
              <ul className="divide-y divide-wine-700/10">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      className="py-5 flex gap-4"
                    >
                      <div className="w-20 h-24 shrink-0 rounded-xl overflow-hidden bg-cream-200">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <p className="font-display text-lg text-wine-700 leading-tight">
                            {item.name}
                          </p>
                          <p className="text-[12px] text-wine-700/55 mt-0.5">
                            ₹{item.price.toLocaleString('en-IN')} each
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 border border-wine-700/15 rounded-full px-1.5 py-1">
                            <button
                              onClick={() =>
                                dispatch({ type: 'DEC_FROM_CART', id: item.id })
                              }
                              className="w-6 h-6 rounded-full hover:bg-wine-700/8 flex items-center justify-center text-wine-700"
                              aria-label="Decrease"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="font-mono text-sm tabular w-6 text-center text-wine-700">
                              {item.qty}
                            </span>
                            <button
                              onClick={() =>
                                dispatch({ type: 'ADD_TO_CART', id: item.id })
                              }
                              className="w-6 h-6 rounded-full hover:bg-wine-700/8 flex items-center justify-center text-wine-700"
                              aria-label="Increase"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() =>
                              dispatch({
                                type: 'REMOVE_FROM_CART',
                                id: item.id
                              })
                            }
                            className="text-wine-700/50 hover:text-blush-500 transition"
                            aria-label="Remove"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                      <p className="font-display text-wine-700 text-lg tabular self-start">
                        ₹{(item.price * item.qty).toLocaleString('en-IN')}
                      </p>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>

            <footer className="p-6 border-t border-wine-700/10 bg-cream-100">
              <div className="flex items-end justify-between mb-5">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-wine-700/60">
                    Subtotal
                  </p>
                  <p className="font-display text-4xl text-wine-700 tabular leading-none mt-1">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </p>
                </div>
                <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-wine-700/50 text-right max-w-[140px]">
                  Shipping & taxes at checkout
                </p>
              </div>
              <button
                disabled={!cartItems.length}
                className="w-full h-14 bg-wine-700 text-cream-50 rounded-full font-medium text-sm uppercase tracking-[0.18em] hover:bg-wine-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Checkout (demo)
              </button>
              <p className="text-[11px] text-center text-wine-700/50 mt-3">
                No real payment is processed — this is a demo storefront.
              </p>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
