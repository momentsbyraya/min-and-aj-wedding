import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

function OpeningScreen({ onEnvelopeOpen }) {
  const introCopyRef = useRef(null)
  const envelopeButtonRef = useRef(null)
  const clickLabelRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    tl.fromTo(
      introCopyRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.82 }
    )
      .fromTo(
        envelopeButtonRef.current,
        { opacity: 0, y: 34 },
        { opacity: 1, y: 0, duration: 0.88 },
        '-=0.52'
      )
      .fromTo(
        clickLabelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.62 },
        '-=0.45'
      )

    return () => tl.kill()
  }, [])

  const handleOpen = () => {
    if (onEnvelopeOpen) onEnvelopeOpen()
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-white">
      <img
        src="/images/graphics/palace-1.png"
        alt=""
        className="opening-screen-bg-image"
        style={{ width: '100vw', height: '100vh', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
        aria-hidden
      />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-4 py-8 text-center pointer-events-none sm:gap-4">
        <div ref={introCopyRef} className="mb-0">
          <p
            className="opening-invite-kicker font-foglihten tracking-[0.2em] text-sm sm:text-base md:text-lg uppercase"
            style={{
              color: '#ffffff',
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.35), 0 1px 3px rgba(0, 0, 0, 0.45)'
            }}
          >
            YOU ARE CORDIALLY
          </p>
          <p
            className="opening-invite-title font-pinyon text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight"
            style={{
              color: '#ffffff',
              textShadow: '0 2px 18px rgba(0, 0, 0, 0.35), 0 1px 4px rgba(0, 0, 0, 0.45)'
            }}
          >
            Invited
          </p>
        </div>
        <button
          ref={envelopeButtonRef}
          type="button"
          onClick={handleOpen}
          aria-label="Open invitation"
          className="focus:outline-none m-0 inline-block border-0 bg-transparent p-0 leading-none pointer-events-auto relative"
        >
          <img
            src="/images/graphics/envelope.png"
            alt="Envelope"
            className="w-[74vw] h-auto max-w-[460px] md:w-auto md:h-[21vh] opening-envelope-image"
          />
          <img
            src="/images/graphics/stamp.png"
            alt="Stamp"
            aria-hidden="true"
            className="absolute pointer-events-none opening-stamp-spin"
            style={{
              width: '22%',
              height: 'auto',
              left: '50%',
              top: '72%'
            }}
          />
        </button>
        <p
          ref={clickLabelRef}
          className="font-foglihten mt-0 text-xs uppercase tracking-[0.3em] sm:text-sm md:text-base"
          style={{
            color: '#ffffff',
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.35), 0 1px 3px rgba(0, 0, 0, 0.45)'
          }}
        >
          CLICK TO OPEN
        </p>
      </div>
    </div>
  )
}

export default OpeningScreen

