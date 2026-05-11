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

      <div className="opening-flower-wind-layer absolute inset-0 z-[5] overflow-hidden pointer-events-none">
          <img
            src="/images/graphics/flower.png"
            alt=""
            aria-hidden="true"
            className="opening-flower-petal"
            style={{
              animationDelay: '0s',
              animationDuration: '10.5s',
              '--start-x': '4vw',
              '--start-y': '18vh',
              '--end-x': '84vw',
              '--end-y': '60vh'
            }}
          />
          <img
            src="/images/graphics/flower.png"
            alt=""
            aria-hidden="true"
            className="opening-flower-petal"
            style={{
              animationDelay: '1.8s',
              animationDuration: '12.2s',
              '--start-x': '10vw',
              '--start-y': '76vh',
              '--end-x': '90vw',
              '--end-y': '42vh'
            }}
          />
          <img
            src="/images/graphics/flower.png"
            alt=""
            aria-hidden="true"
            className="opening-flower-petal"
            style={{
              animationDelay: '4.2s',
              animationDuration: '11.4s',
              '--start-x': '2vw',
              '--start-y': '52vh',
              '--end-x': '78vw',
              '--end-y': '22vh'
            }}
          />
          <img
            src="/images/graphics/flower.png"
            alt=""
            aria-hidden="true"
            className="opening-flower-petal"
            style={{
              animationDelay: '6s',
              animationDuration: '13s',
              '--start-x': '16vw',
              '--start-y': '30vh',
              '--end-x': '96vw',
              '--end-y': '72vh'
            }}
          />
          <img
            src="/images/graphics/flower.png"
            alt=""
            aria-hidden="true"
            className="opening-flower-petal"
            style={{
              animationDelay: '7.4s',
              animationDuration: '12.8s',
              '--start-x': '6vw',
              '--start-y': '88vh',
              '--end-x': '86vw',
              '--end-y': '50vh'
            }}
          />
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center justify-center px-4 text-center pointer-events-none z-10">
        <div ref={introCopyRef} className="mb-0 md:mb-1.5">
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
          className="focus:outline-none p-0 m-0 border-0 bg-transparent leading-none pointer-events-auto relative inline-block -mt-2 sm:-mt-3 md:mt-0"
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
          className="font-foglihten tracking-[0.3em] text-xs sm:text-sm md:text-base uppercase mt-3"
          style={{
            color: '#6F2D36',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.22)'
          }}
        >
          CLICK TO OPEN
        </p>
      </div>
    </div>
  )
}

export default OpeningScreen

