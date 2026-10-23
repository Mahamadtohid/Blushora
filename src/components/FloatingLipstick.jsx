import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform
} from 'framer-motion'

/**
 * A lipstick that lives on screen for the whole session and paints a single
 * HEART across the viewport as the user scrolls.
 *
 *   0.00 → 0.14  Act 1 — cap lifts, bullet extends
 *   0.14 → 0.95  Act 2 — heart is drawn, one continuous stroke
 */

const TIP_X = 2 // rem — bullet centre
const TIP_Y = 0 // rem — bullet tip when fully extended

const CAP_END = 0.14
const HEART_START = 0.14
const HEART_END = 0.95

export default function FloatingLipstick() {
  const heartRef = useRef(null)
  const [vp, setVp] = useState({ w: 1600, h: 900 })
  const [heartLen, setHeartLen] = useState(1)

  const { scrollYProgress } = useScroll()
  const sp = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 24,
    mass: 0.7
  })

  // Act 1 — cap off, bullet up
  const capY = useTransform(sp, [0.0, 0.1], [0, -70])
  const capRotateZ = useTransform(sp, [0, 0.1], [0, -14])
  const capOpacity = useTransform(sp, [0.08, CAP_END], [1, 0])
  const bulletY = useTransform(sp, [0.04, CAP_END], [34, 0])

  // Lipstick scale: hero prop → painting tool
  const lipScale = useTransform(sp, [0, CAP_END, 1], [1.3, 0.85, 0.72])

  // 3D presence — eases out as the pen settles in
  const sceneRotY = useTransform(sp, [0, CAP_END, 1], [-18, -4, 6])
  const sceneRotX = useTransform(sp, [0, CAP_END, 1], [6, 0, -3])

  // Upright sway, scroll-keyed (never tangent-driven)
  const uprightTilt = useTransform(
    sp,
    [0, 0.25, 0.5, 0.75, 1],
    [-8, 6, -4, 8, -5]
  )

  // Heart draw progress
  const heartProgress = useTransform(sp, [HEART_START, HEART_END], [0, 1])

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useLayoutEffect(() => {
    const update = () =>
      setVp({ w: window.innerWidth, h: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    if (heartRef.current) {
      setHeartLen(heartRef.current.getTotalLength() || 1)
    }
  }, [vp])

  useMotionValueEvent(sp, 'change', (v) => {
    if (!heartRef.current || !heartLen) return
    const t = Math.max(0, Math.min(1, v))
    const localT = Math.max(
      0,
      Math.min(1, (t - HEART_START) / (HEART_END - HEART_START))
    )
    const point = heartRef.current.getPointAtLength(localT * heartLen)
    x.set(point.x)
    y.set(point.y)
  })

  const W = vp.w
  const H = vp.h
  const heartD = buildHeartPath(W, H)

  const left = useTransform(x, (v) => `calc(${v}px - ${TIP_X}rem)`)
  const top = useTransform(y, (v) => `calc(${v}px - ${TIP_Y}rem)`)

  const blotLeft = useTransform(x, (v) => `${v}px`)
  const blotTop = useTransform(y, (v) => `${v}px`)
  const blotScale = useTransform(sp, [0, 0.12, 0.95, 1], [0, 1, 1, 0])

  return (
    <div className="fixed inset-0 pointer-events-none z-[25]">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="inkGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E29287" />
            <stop offset="40%" stopColor="#D97A6C" />
            <stop offset="100%" stopColor="#842045" />
          </linearGradient>
          <linearGradient id="inkHighlight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="3" result="off" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Faint ghost of the full heart */}
        <path
          d={heartD}
          fill="none"
          stroke="#4A0E26"
          strokeWidth="1"
          strokeDasharray="2 8"
          opacity="0.05"
        />

        {/* Shadow stroke */}
        <motion.path
          d={heartD}
          fill="none"
          stroke="rgba(42,7,18,0.3)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
          style={{ pathLength: heartProgress }}
          filter="url(#softShadow)"
        />

        {/* Main painted stroke */}
        <motion.path
          ref={heartRef}
          d={heartD}
          fill="none"
          stroke="url(#inkGradient)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
          style={{ pathLength: heartProgress }}
        />

        {/* Specular highlight */}
        <motion.path
          d={heartD}
          fill="none"
          stroke="url(#inkHighlight)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
          style={{ pathLength: heartProgress }}
        />
      </svg>

      {/* Ink blot at the pen tip */}
      <motion.div
        className="absolute"
        style={{
          left: blotLeft,
          top: blotTop,
          scale: blotScale,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <div
          className="w-7 h-7 rounded-full"
          style={{
            background:
              'radial-gradient(circle, #F5A28F 0%, #D97A6C 45%, rgba(217,122,108,0) 72%)',
            filter: 'blur(0.4px)'
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
          style={{
            background:
              'radial-gradient(circle, #FFF1C8 0%, #F5A28F 60%, rgba(0,0,0,0) 100%)'
          }}
        />
      </motion.div>

      {/* The lipstick */}
      <motion.div
        className="absolute"
        style={{
          left,
          top,
          scale: lipScale,
          rotateY: sceneRotY,
          rotateX: sceneRotX,
          transformStyle: 'preserve-3d',
          perspective: '1800px'
        }}
      >
        <motion.div
          style={{
            rotate: uprightTilt,
            transformOrigin: `${TIP_X}rem ${TIP_Y}rem`
          }}
        >
          <Lipstick
            capY={capY}
            capRotateZ={capRotateZ}
            capOpacity={capOpacity}
            bulletY={bulletY}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

/** HEART — upper-right of the viewport, drawn as one continuous stroke. */
function buildHeartPath(W, H) {
  const p = (fx, fy) => `${(W * fx).toFixed(1)} ${(H * fy).toFixed(1)}`
  return [
    `M ${p(0.72, 0.3)}`,
    // Left lobe
    `C ${p(0.7, 0.22)}, ${p(0.6, 0.2)}, ${p(0.58, 0.3)}`,
    `C ${p(0.56, 0.4)}, ${p(0.62, 0.48)}, ${p(0.72, 0.56)}`,
    // Right lobe
    `C ${p(0.82, 0.48)}, ${p(0.88, 0.4)}, ${p(0.86, 0.3)}`,
    `C ${p(0.84, 0.2)}, ${p(0.74, 0.22)}, ${p(0.72, 0.3)}`
  ].join(' ')
}

/** The lipstick — bullet, barrel, pink band, bronze base, cap. */
function Lipstick({ capY, capRotateZ, capOpacity, bulletY }) {
  return (
    <div
      className="relative"
      style={{
        width: '4rem',
        height: '12rem',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Dark base */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0"
        style={{
          width: '3rem',
          height: '5rem',
          background:
            'linear-gradient(90deg, #0a0205 0%, #3B0C1C 25%, #651634 50%, #3B0C1C 75%, #0a0205 100%)',
          borderBottomLeftRadius: '0.4rem',
          borderBottomRightRadius: '0.4rem',
          borderTopLeftRadius: '0.1rem',
          borderTopRightRadius: '0.1rem',
          boxShadow:
            '0 12px 24px -6px rgba(42,7,18,0.55), inset 0 1px 0 rgba(255,255,255,0.08)'
        }}
      />

      {/* Pink metallic band */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: '5rem',
          width: '3rem',
          height: '0.55rem',
          background:
            'linear-gradient(180deg, #F0B5A8 0%, #D97A6C 50%, #B85C50 100%)',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.25)'
        }}
      />

      {/* Dark barrel */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: '5.55rem',
          width: '2.8rem',
          height: '2.4rem',
          background:
            'linear-gradient(90deg, #050204 0%, #1A0509 25%, #2A0712 50%, #1A0509 75%, #050204 100%)',
          borderTopLeftRadius: '0.3rem',
          borderTopRightRadius: '0.3rem',
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.4)'
        }}
      />
      {/* Inner barrel hole */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: '7.9rem',
          width: '2.2rem',
          height: '0.4rem',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, #000 0%, #1A0509 70%, #2A0712 100%)',
          boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.8)'
        }}
      />

      {/* Red domed bullet */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: '8rem',
          y: bulletY,
          width: '2rem',
          height: '4rem',
          transformOrigin: 'bottom center',
          filter: 'drop-shadow(0 6px 12px rgba(42,7,18,0.5))'
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, #6B1612 0%, #A52F27 20%, #D4615A 42%, #F5A28F 55%, #D4615A 72%, #8C2A26 95%)',
            borderTopLeftRadius: '50%',
            borderTopRightRadius: '50%',
            borderBottomLeftRadius: '0.1rem',
            borderBottomRightRadius: '0.1rem'
          }}
        />
        <div
          className="absolute"
          style={{
            top: '5%',
            bottom: '15%',
            left: '34%',
            width: '0.25rem',
            borderRadius: '2px',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0) 85%)',
            filter: 'blur(0.3px)'
          }}
        />
      </motion.div>

      {/* Cap */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: '7.6rem',
          y: capY,
          rotateZ: capRotateZ,
          opacity: capOpacity,
          width: '3rem',
          height: '4.4rem',
          transformOrigin: 'bottom center',
          filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.45))'
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, #050204 0%, #1A0509 20%, #2A0712 48%, #1A0509 80%, #050204 100%)',
            borderTopLeftRadius: '0.6rem',
            borderTopRightRadius: '0.6rem',
            borderBottomLeftRadius: '0.1rem',
            borderBottomRightRadius: '0.1rem',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)'
          }}
        />
        <div
          className="absolute"
          style={{
            top: '0.6rem',
            bottom: '0.6rem',
            left: '42%',
            width: '0.3rem',
            borderRadius: '2px',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.4), rgba(255,255,255,0) 90%)'
          }}
        />
      </motion.div>
    </div>
  )
}
