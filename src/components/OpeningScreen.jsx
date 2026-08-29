import React, { useEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'

const BOOK_FRAMES = Array.from({ length: 14 }, (_, i) => `/images/openingscreen/${i + 4}.png`)

function OpeningScreen({ onEnvelopeOpen }) {
  const introCopyRef = useRef(null)
  const bookWrapRef = useRef(null)
  const bookImgRef = useRef(null)
  const clickLabelRef = useRef(null)
  const overlayRef = useRef(null)
  const screenRef = useRef(null)
  const [frameIndex, setFrameIndex] = useState(0)
  const [isOpening, setIsOpening] = useState(false)
  const [idleReady, setIdleReady] = useState(false)
  const openingLock = useRef(false)

  const frameSrc = useMemo(() => BOOK_FRAMES[frameIndex] || BOOK_FRAMES[0], [frameIndex])

  useEffect(() => {
    // Preload book frames so the click animation doesn't hitch
    BOOK_FRAMES.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => setIdleReady(true)
    })
    const clickEl = clickLabelRef.current

    tl.fromTo(
      introCopyRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.82 }
    )
      .fromTo(
        bookWrapRef.current,
        { opacity: 0, y: 34, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.95 },
        '-=0.52'
      )
      .fromTo(
        clickEl,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.62 },
        '-=0.45'
      )

    return () => {
      tl.kill()
      // Strict Mode remount can kill mid-tween and leave opacity at 0
      if (clickEl) gsap.set(clickEl, { opacity: 1, y: 0, clearProps: 'transform' })
      if (introCopyRef.current) gsap.set(introCopyRef.current, { opacity: 1, y: 0 })
      if (bookWrapRef.current) gsap.set(bookWrapRef.current, { opacity: 1, y: 0, scale: 1 })
      setIdleReady(true)
    }
  }, [])

  const handleOpen = () => {
    if (openingLock.current) return
    openingLock.current = true
    setIsOpening(true)

    const frameState = { index: 0 }
    const lastFrame = BOOK_FRAMES.length - 1

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => {
        if (onEnvelopeOpen) onEnvelopeOpen()
      }
    })

    // Hide invitation copy + prompt while the book opens
    tl.to(
      [introCopyRef.current, clickLabelRef.current],
      { opacity: 0, y: -18, duration: 0.45, ease: 'power2.in' },
      0
    )

    // Step through book frames (closed → fully open)
    tl.to(
      frameState,
      {
        index: lastFrame,
        duration: 1.85,
        ease: 'none',
        onUpdate: () => {
          const next = Math.round(frameState.index)
          setFrameIndex((prev) => (prev === next ? prev : next))
        }
      },
      0.12
    )

    // Zoom into the glowing open book
    tl.to(
      bookWrapRef.current,
      {
        scale: 3.4,
        y: 40,
        duration: 2.1,
        ease: 'power3.in'
      },
      0.55
    )

    // Soften surrounding décor as we dive in
    tl.to(
      screenRef.current?.querySelectorAll('.opening-decor'),
      { opacity: 0, duration: 0.9, ease: 'power2.in' },
      0.7
    )

    // Warm glow wash → full cover → hand off to hero
    tl.to(
      overlayRef.current,
      {
        opacity: 1,
        duration: 1.05,
        ease: 'power2.in'
      },
      1.35
    )
  }

  return (
    <div ref={screenRef} className="fixed inset-0 z-[9999] overflow-hidden bg-[#FFF8F7]">
      <img
        src="/images/graphics/palace-1.png"
        alt=""
        className="opening-screen-bg-image opening-decor"
        style={{
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block'
        }}
        aria-hidden
      />
      <img
        src="/images/graphics/bird-2.png"
        alt=""
        aria-hidden
        className="opening-decor intro-corner-accent intro-corner-accent--lantern absolute top-0 right-0 z-[5] h-auto pointer-events-none"
      />
      <img
        src="/images/graphics/flower-left.png"
        alt=""
        aria-hidden
        className="opening-decor intro-corner-accent intro-corner-accent--flower-left absolute -bottom-[4%] -left-[12%] z-[5] h-auto pointer-events-none"
      />
      <img
        src="/images/graphics/flower-right.png"
        alt=""
        aria-hidden
        className="opening-decor intro-corner-accent intro-corner-accent--flower-right absolute bottom-0 right-0 z-[5] h-auto pointer-events-none"
      />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-0 px-4 py-6 text-center pointer-events-none sm:gap-3 sm:py-8">
        <div ref={introCopyRef} className="mb-1 shrink-0 sm:mb-0">
          <p
            className="opening-invite-title font-lavishly text-[1.85rem] leading-none px-2 sm:text-4xl md:text-5xl lg:text-6xl"
            style={{
              color: '#8B5560',
              textShadow: '0 1px 3px rgba(248, 241, 234, 0.85)'
            }}
          >
            Every great love story begins with a
            <br />
            single page.....
          </p>
        </div>

        <button
          ref={bookWrapRef}
          type="button"
          onClick={handleOpen}
          disabled={isOpening}
          aria-label="Open invitation book"
          className="opening-book-button focus:outline-none m-0 inline-flex shrink items-center justify-center border-0 bg-transparent p-0 leading-none pointer-events-auto relative origin-center will-change-transform disabled:cursor-default"
          style={{ transformOrigin: 'center center' }}
        >
          <span
            className={`opening-book-float ${
              idleReady && !isOpening ? 'is-floating' : ''
            }`}
          >
            <img
              ref={bookImgRef}
              src={frameSrc}
              alt="Storybook invitation"
              draggable={false}
              className={`opening-book-image block h-full w-full object-contain select-none ${
                idleReady && !isOpening ? 'is-glowing' : ''
              }`}
            />
          </span>
        </button>

        <p
          ref={clickLabelRef}
          className="alice-regular relative z-[25] -mt-1 shrink-0 px-3 py-1 text-sm font-semibold uppercase tracking-[0.28em] sm:mt-3 sm:py-1.5 sm:text-base md:text-lg"
          style={{
            color: '#5C3340',
            backgroundColor: 'rgba(255, 248, 247, 0.72)',
            textShadow: '0 1px 2px rgba(255, 248, 247, 0.9)'
          }}
        >
          {isOpening ? 'OPENING…' : 'CLICK TO OPEN'}
        </p>
      </div>

      {/* Zoom wash — warm parchment/glow into the hero */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-30 opacity-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255, 248, 235, 0.55) 0%, rgba(248, 241, 234, 0.92) 42%, #FFF8F7 78%)'
        }}
        aria-hidden
      />
    </div>
  )
}

export default OpeningScreen
