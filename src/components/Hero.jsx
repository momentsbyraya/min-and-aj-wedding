import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Hero = () => {
  const randSize = (min, max) => `${Math.floor(Math.random() * (max - min + 1)) + min}px`
  const randPct = (min, max) => `${Math.floor(Math.random() * (max - min + 1)) + min}%`
  const invitedRef = useRef(null)
  const eighteenRef = useRef(null)
  const birthdayRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    tl.fromTo(
      invitedRef.current,
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 0.75 }
    )
      .fromTo(
        eighteenRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.85 },
        '-=0.35'
      )
      .fromTo(
        birthdayRef.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.3'
      )

    return () => tl.kill()
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="soft-blob soft-blob--alt z-[2]" style={{ width: randSize(100, 150), height: randSize(80, 130), top: randPct(8, 22), left: randPct(6, 20) }} />
      <div className="soft-blob soft-blob--small z-[2]" style={{ width: randSize(80, 125), height: randSize(70, 110), top: randPct(62, 78), left: randPct(68, 84) }} />
      <img
        src="/images/graphics/bg-2.png"
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <img
        src="/images/graphics/opening-2.png"
        alt="Hero overlay"
        className="absolute inset-0 w-full h-full object-cover z-[6]"
      />
      <img
        src="/images/graphics/flower-1.png"
        alt="Flower decoration"
        className="absolute top-0 left-0 h-auto z-20 pointer-events-none -scale-x-100"
        style={{ width: '60vw' }}
      />
      <img
        src="/images/graphics/flower-2.png"
        alt="Flower decoration"
        className="absolute bottom-0 right-0 h-auto z-20 pointer-events-none -scale-x-100"
        style={{ width: '100vw' }}
      />
      <div className="absolute bottom-0 left-0 z-10 pointer-events-none" style={{ width: '80vw' }}>
        <div className="flex flex-col items-center justify-center w-full">
          <p
            ref={invitedRef}
            className="font-rozha uppercase tracking-[0.15em] text-center mb-[-0.35em] leading-none"
            style={{
              color: '#FFFFFF',
              fontSize: 'clamp(1.2rem, 3vw, 2.4rem)',
              lineHeight: 1,
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.35), 0 1px 2px rgba(0, 0, 0, 0.25)'
            }}
          >
            YOU ARE INVITED TO
          </p>
          <img
            ref={eighteenRef}
            src="/images/graphics/18.png"
            alt="18"
            className="hero-18-image w-full h-auto block mx-auto"
          />
          <p
            ref={birthdayRef}
            className="font-rozha uppercase tracking-[0.2em] text-center mt-[-0.35em] leading-none"
            style={{
              color: '#E28B91',
              fontSize: 'clamp(1.6rem, 4.4vw, 3.8rem)',
              lineHeight: 1
            }}
          >
            BIRTHDAY
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero


