import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const PETAL_SRCS = [
  '/images/graphics/petal-1.png',
  '/images/graphics/petal-2.png'
]

const PETAL_COUNT = 10

const randomBetween = (min, max) => min + Math.random() * (max - min)

/** Random wind path: mostly left→right, with varied vertical progress. */
const createPetal = (id) => {
  const leftToRight = Math.random() > 0.2
  const startX = leftToRight ? randomBetween(-12, 28) : randomBetween(72, 112)
  const endX = leftToRight ? randomBetween(68, 118) : randomBetween(-18, 32)
  const startY = randomBetween(-8, 108)
  const endY = randomBetween(-8, 108)
  const midX = (startX + endX) / 2 + randomBetween(-18, 18)
  const midY = (startY + endY) / 2 + randomBetween(-22, 22)

  return {
    id,
    src: PETAL_SRCS[id % PETAL_SRCS.length],
    size: randomBetween(24, 42),
    duration: randomBetween(16, 28),
    delay: randomBetween(0, 18),
    startX,
    startY,
    midX,
    midY,
    endX,
    endY,
    rotateStart: randomBetween(-40, 40),
    rotateMid: randomBetween(-80, 80),
    rotateEnd: randomBetween(-120, 120),
    opacity: randomBetween(0.55, 0.85)
  }
}

/**
 * Petals drifted by wind (random paths across the viewport).
 * Portaled to document.body so overflow/transform ancestors cannot clip it.
 */
const FallingPetals = ({ count = PETAL_COUNT }) => {
  const [petals, setPetals] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setPetals(Array.from({ length: count }, (_, i) => createPetal(i)))
  }, [count])

  if (!mounted || petals.length === 0) return null

  return createPortal(
    <div className="falling-petals" aria-hidden="true">
      {petals.map((petal) => (
        <img
          key={petal.id}
          src={petal.src}
          alt=""
          className="falling-petal"
          draggable={false}
          style={{
            width: `${petal.size}px`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            '--petal-x0': `${petal.startX}vw`,
            '--petal-y0': `${petal.startY}vh`,
            '--petal-x1': `${petal.midX}vw`,
            '--petal-y1': `${petal.midY}vh`,
            '--petal-x2': `${petal.endX}vw`,
            '--petal-y2': `${petal.endY}vh`,
            '--petal-rotate-start': `${petal.rotateStart}deg`,
            '--petal-rotate-mid': `${petal.rotateMid}deg`,
            '--petal-rotate-end': `${petal.rotateEnd}deg`,
            '--petal-opacity': petal.opacity
          }}
        />
      ))}
    </div>,
    document.body
  )
}

export default FallingPetals
