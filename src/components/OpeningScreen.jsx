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
      <img
        src="/images/graphics/fan%20flower%20-%201.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--fan absolute top-0 left-0 z-[5] h-auto pointer-events-none"
      />
      <img
        src="/images/graphics/bird-2.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--lantern absolute top-0 right-0 z-[5] h-auto pointer-events-none"
      />
      <img
        src="/images/graphics/flower-left.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--flower-left absolute bottom-0 left-0 z-[5] h-auto pointer-events-none"
      />
      <img
        src="/images/graphics/flower-right.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--flower-right absolute bottom-0 right-0 z-[5] h-auto pointer-events-none"
      />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 px-4 py-8 text-center pointer-events-none sm:gap-4">
        <div ref={introCopyRef} className="mb-0">
          <p
            className="opening-invite-kicker font-foglihten tracking-[0.2em] text-sm sm:text-base md:text-lg uppercase"
            style={{
              color: '#6b5a70',
              textShadow: '0 1px 2px rgba(250, 232, 206, 0.8)'
            }}
          >
            YOU ARE CORDIALLY
          </p>
          <p
            className="opening-invite-title font-pinyon text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight"
            style={{
              color: '#6b5a70',
              textShadow: '0 1px 3px rgba(250, 232, 206, 0.85)'
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
            color: '#6b5a70',
            textShadow: '0 1px 2px rgba(250, 232, 206, 0.8)'
          }}
        >
          CLICK TO OPEN
        </p>
      </div>
    </div>
  )
}

export default OpeningScreen

