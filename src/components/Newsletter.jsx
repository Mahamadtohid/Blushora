import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | error | success

  const onSubmit = (e) => {
    e.preventDefault()
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!ok) {
      setStatus('error')
      return
    }
    setStatus('success')
    setEmail('')
    setTimeout(() => setStatus('idle'), 5000)
  }

  return (
    <section className="py-20 md:py-28 max-w-[1400px] mx-auto px-5 md:px-10">
      <div className="relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-blush-500 text-cream-50 p-8 md:p-16">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-honey-500/50 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 w-60 h-60 rounded-full bg-wine-700/40 blur-3xl" />

        <div className="relative grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream-50/80">
              Love letters, every Sunday
            </p>
            <h2 className="mt-4 font-display text-cream-50 text-5xl md:text-7xl tracking-tightest leading-[0.95]">
              Early drops.
              <br />
              <span className="serif-italic text-honey-400">Softer</span> inboxes.
            </h2>
            <p className="mt-6 text-cream-50/85 text-[14.5px] max-w-md leading-relaxed">
              Three essays, one ingredient deep-dive, and one first-dibs product
              drop — hand-sent each Sunday morning. Unsubscribe anytime.
            </p>
          </div>

          <div className="col-span-12 md:col-span-5">
            <form
              onSubmit={onSubmit}
              className="relative flex items-center bg-cream-50/95 rounded-full p-1.5 pl-6"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status === 'error') setStatus('idle')
                }}
                placeholder="you@yourmorning.com"
                className="flex-1 bg-transparent outline-none text-wine-700 placeholder:text-wine-700/40 py-3 text-[15px]"
              />
              <button
                type="submit"
                className="h-11 pl-5 pr-5 rounded-full bg-wine-700 hover:bg-wine-800 text-cream-50 flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium transition"
              >
                Subscribe <ArrowRight size={14} />
              </button>
            </form>
            <div className="mt-3 h-5 text-[12.5px]">
              <AnimatePresence mode="wait">
                {status === 'error' && (
                  <motion.p
                    key="err"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-wine-900/90"
                  >
                    That doesn’t look like an email — try again.
                  </motion.p>
                )}
                {status === 'success' && (
                  <motion.p
                    key="ok"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-cream-50 flex items-center gap-1"
                  >
                    <Check size={14} /> You’re on the list (demo — nothing was
                    sent).
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
