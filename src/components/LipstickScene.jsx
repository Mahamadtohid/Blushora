import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

/**
 * A sticky 300vh scroll scene: a CSS-3D lipstick rotates into view,
 * the cap lifts off with a twist, the bullet rises out of the tube,
 * and a hand-drawn SVG swash paints across the viewport.
 *
 * All motion values come from scroll progress (not scroll direction),
 * so scrolling back up smoothly reverses every stage.
 */
export default function LipstickScene() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  // Smooth the raw scroll with a spring for buttery motion.
  const sp = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.6
  })

  // Scene choreography — map scroll [0..1] to transforms.
  const sceneRotateY = useTransform(sp, [0, 0.5, 1], [-28, 0, 22])
  const sceneRotateX = useTransform(sp, [0, 1], [8, -8])
  const sceneScale = useTransform(sp, [0, 0.3, 0.7, 1], [0.78, 1, 1, 0.9])

  // Cap: lifts, tilts, drifts off.
  const capY = useTransform(sp, [0.18, 0.5], [0, -260])
  const capRotateZ = useTransform(sp, [0.18, 0.5], [0, -22])
  const capRotateX = useTransform(sp, [0.18, 0.5], [0, -18])
  const capOpacity = useTransform(sp, [0.42, 0.55], [1, 0])

  // Bullet (the actual lipstick): twists up out of the tube.
  const bulletY = useTransform(sp, [0.42, 0.82], [40, -160])
  const bulletRotateZ = useTransform(sp, [0.42, 0.82], [0, 20])

  // Text column choreography.
  const textY = useTransform(sp, [0, 0.5], [60, 0])
  const textOpacity = useTransform(sp, [0.02, 0.18, 0.9, 1], [0, 1, 1, 0.4])

  // Stage ticker numbers.
  const stage = useTransform(sp, (v) => {
    if (v < 0.33) return '01'
    if (v < 0.66) return '02'
    return '03'
  })
  const stageLabel = useTransform(sp, (v) => {
    if (v < 0.33) return 'Closed, sealed'
    if (v < 0.66) return 'Lift the cap'
    return 'Draw the line'
  })

  // SVG swash: pathLength eased by scroll — becomes a "drawn" line.
  const pathLength = useTransform(sp, [0.55, 0.95], [0, 1])
  const swashOpacity = useTransform(sp, [0.5, 0.6, 0.95, 1], [0, 1, 1, 0.6])

  return (
    <section
      ref={ref}
      className="relative bg-cream-100"
      style={{ height: '320vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        {/* Backdrop glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-honey-500/20 blur-[120px]" />
          <div className="absolute right-[8%] bottom-[8%] w-[40vw] h-[40vw] rounded-full bg-blush-500/25 blur-[120px]" />
        </div>

        {/* Hand-drawn swash across the viewport (draws with scroll) */}
        <motion.svg
          viewBox="0 0 1600 400"
          preserveAspectRatio="none"
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-[55%] pointer-events-none"
          style={{ opacity: swashOpacity }}
        >
          <motion.path
            d="M 40 260 C 240 100, 480 420, 760 220 S 1200 60, 1560 240"
            fill="none"
            stroke="url(#swash)"
            strokeWidth="22"
            strokeLinecap="round"
            style={{ pathLength }}
          />
          <defs>
            <linearGradient id="swash" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#D97A6C" />
              <stop offset="55%" stopColor="#B85C50" />
              <stop offset="100%" stopColor="#4A0E26" />
            </linearGradient>
          </defs>
        </motion.svg>

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-10 w-full grid grid-cols-12 gap-6 items-center">
          {/* Text column */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="col-span-12 md:col-span-5 lg:col-span-5 relative"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-wine-700/60">
              Chapter 02 — The Lipstick Object
            </p>
            <h2 className="mt-4 font-display text-wine-700 text-5xl md:text-7xl tracking-tightest leading-[0.95]">
              Watch it
              <br />
              <span className="serif-italic text-blush-500">open</span>.
            </h2>
            <p className="mt-6 max-w-md text-[14.5px] leading-relaxed text-wine-700/75">
              The Afterglow Lip Tint arrives in a magnetised brass cap, a
              weighted body, and an angled bullet cut for a single, precise
              stroke. Scroll to meet it.
            </p>

            <div className="mt-10 flex items-center gap-6">
              <motion.span className="font-mono text-6xl md:text-7xl text-wine-700 tabular leading-none">
                {stage}
              </motion.span>
              <div className="h-10 w-px bg-wine-700/25" />
              <div className="min-w-0">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-wine-700/55">
                  Stage
                </p>
                <motion.p className="font-display text-xl md:text-2xl text-wine-700 mt-0.5">
                  {stageLabel}
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* 3D lipstick scene */}
          <div className="col-span-12 md:col-span-7 h-[65vh] relative flex items-center justify-center">
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ perspective: '1600px' }}
            >
              <motion.div
                className="relative"
                style={{
                  rotateY: sceneRotateY,
                  rotateX: sceneRotateX,
                  scale: sceneScale,
                  transformStyle: 'preserve-3d'
                }}
              >
                <Lipstick
                  capY={capY}
                  capRotateZ={capRotateZ}
                  capRotateX={capRotateX}
                  capOpacity={capOpacity}
                  bulletY={bulletY}
                  bulletRotateZ={bulletRotateZ}
                />
              </motion.div>
            </div>

            {/* Floor shadow — scales with scene */}
            <motion.div
              style={{ scale: sceneScale }}
              className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-56 h-6 rounded-full bg-wine-900/30 blur-2xl"
            />
          </div>
        </div>

        {/* Vignette for depth */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(42,7,18,0.18)_100%)]" />

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-wine-700/50 font-mono text-[10.5px] uppercase tracking-[0.22em]">
          <span>Keep scrolling</span>
          <svg viewBox="0 0 12 24" className="w-3 h-6 stroke-wine-700/40 fill-none" strokeWidth="1.4">
            <rect x="1" y="1" width="10" height="22" rx="5" />
            <motion.circle
              cx="6"
              cy="7"
              r="1.6"
              className="fill-wine-700/70 stroke-none"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </div>
      </div>
    </section>
  )
}

/**
 * The lipstick itself — tube, bullet, cap.
 * All sized in rems and layered on the Z-axis for a clean 3D feel.
 */
function Lipstick({
  capY,
  capRotateZ,
  capRotateX,
  capOpacity,
  bulletY,
  bulletRotateZ
}) {
  return (
    <div
      className="relative"
      style={{ width: '14rem', height: '22rem', transformStyle: 'preserve-3d' }}
    >
      {/* --- TUBE (base + top rim) --- */}
      <div
        className="absolute left-1/2 bottom-0 -translate-x-1/2"
        style={{
          width: '6.5rem',
          height: '13rem',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Tube body — cylinder illusion via multi-stop gradient */}
        <div
          className="absolute inset-0 rounded-b-[1.6rem] rounded-t-[0.4rem] shadow-[0_30px_60px_-20px_rgba(42,7,18,0.55)]"
          style={{
            background:
              'linear-gradient(90deg, #2A0712 0%, #651634 22%, #9B3357 48%, #651634 78%, #2A0712 100%)',
            borderTop: '2px solid rgba(233,169,92,0.35)'
          }}
        />
        {/* Gold band */}
        <div
          className="absolute left-0 right-0 h-5 top-6 rounded"
          style={{
            background:
              'linear-gradient(90deg, #B07A2A 0%, #F0C878 25%, #FFF1C8 50%, #F0C878 75%, #B07A2A 100%)',
            boxShadow:
              'inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.3)'
          }}
        />
        {/* Engraved brand mark on the band */}
        <div className="absolute left-0 right-0 top-6 h-5 flex items-center justify-center font-mono text-[8px] tracking-[0.3em] text-wine-900/70 select-none">
          BLUSHORA
        </div>

        {/* Tube inner hole (shows when bullet is up) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-1 rounded-full"
          style={{
            width: '3.8rem',
            height: '1rem',
            background:
              'radial-gradient(ellipse at center, #1a0509 0%, #2A0712 70%, #4A0E26 100%)',
            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.7)'
          }}
        />
      </div>

      {/* --- BULLET (the lipstick itself) --- */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-[6.5rem]"
        style={{
          y: bulletY,
          rotateZ: bulletRotateZ,
          transformOrigin: 'bottom center',
          width: '3rem',
          height: '7rem',
          transformStyle: 'preserve-3d',
          filter: 'drop-shadow(0 10px 20px rgba(74,14,38,0.4))'
        }}
      >
        {/* Bullet body with angled top via clip-path */}
        <div
          className="absolute inset-0 rounded-sm"
          style={{
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 18%, 0% 0%)',
            background:
              'linear-gradient(90deg, #8C2A26 0%, #D4615A 30%, #F5A28F 50%, #D4615A 70%, #8C2A26 100%)'
          }}
        />
        {/* Specular highlight running down the bullet */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            left: '38%',
            width: '0.35rem',
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 14%, 0% 2%)',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.75), rgba(255,255,255,0) 70%)'
          }}
        />
      </motion.div>

      {/* --- CAP --- */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-0"
        style={{
          y: capY,
          rotateZ: capRotateZ,
          rotateX: capRotateX,
          opacity: capOpacity,
          width: '6.8rem',
          height: '10rem',
          transformOrigin: 'bottom center',
          transformStyle: 'preserve-3d',
          filter: 'drop-shadow(0 20px 30px rgba(42,7,18,0.5))'
        }}
      >
        {/* Cap body */}
        <div
          className="absolute inset-0 rounded-t-[1.8rem] rounded-b-[0.3rem]"
          style={{
            background:
              'linear-gradient(90deg, #1A0509 0%, #4A0E26 24%, #842045 50%, #4A0E26 76%, #1A0509 100%)',
            borderBottom: '2px solid rgba(233,169,92,0.5)'
          }}
        />
        {/* Highlight down the cap */}
        <div
          className="absolute top-4 bottom-4"
          style={{
            left: '44%',
            width: '0.4rem',
            borderRadius: '2px',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0) 85%)'
          }}
        />
        {/* Honey jewel at top */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-5 w-6 h-6 rounded-full"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, #FFF1C8 0%, #E9A95C 45%, #B07A2A 100%)',
            boxShadow:
              'inset 0 -1px 2px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.3)'
          }}
        />
        {/* Thin gold band near base */}
        <div
          className="absolute left-0 right-0 bottom-2 h-1.5"
          style={{
            background:
              'linear-gradient(90deg, #B07A2A, #FFF1C8 50%, #B07A2A)'
          }}
        />
      </motion.div>
    </div>
  )
}
