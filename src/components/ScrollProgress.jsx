import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4
  })

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 h-[2px] origin-left z-[60] pointer-events-none"
      style={{
        scaleX,
        background:
          'linear-gradient(90deg, #E9A95C 0%, #D97A6C 50%, #4A0E26 100%)'
      }}
    />
  )
}
