import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Hero = () => {
  const crownRef = useRef(null)
  const inviteLineRef = useRef(null)
  const nameRef = useRef(null)
  const birthdayLineRef = useRef(null)
  const debutLineRef = useRef(null)

  useLayoutEffect(() => {
    const steps = [
      crownRef.current,
      inviteLineRef.current,
      nameRef.current,
      birthdayLineRef.current,
      debutLineRef.current
    ].filter(Boolean)

    if (!steps.length) return undefined

    gsap.set(steps, { opacity: 0, y: 26 })

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
    // Staggered starts with overlap (not simultaneous, not strictly serial)
    const overlap = '-=0.42'

    tl.to(crownRef.current, { opacity: 1, y: 0, duration: 0.68 })
      .to(inviteLineRef.current, { opacity: 1, y: 0, duration: 0.62 }, overlap)
      .to(nameRef.current, { opacity: 1, y: 0, duration: 0.78 }, overlap)
      .to(birthdayLineRef.current, { opacity: 1, y: 0, duration: 0.52 }, overlap)
      .to(debutLineRef.current, { opacity: 1, y: 0, duration: 0.52 }, overlap)

    return () => tl.kill()
  }, [])

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      aria-label="Invitation"
    >
      <img
        src="/images/graphics/hero-bg.png"
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover z-[1]"
      />
      <div className="absolute top-0 left-0 right-0 z-40 flex justify-end pt-8 sm:pt-12 md:pt-14 pl-5 sm:pl-8 pr-5 sm:pr-8 md:pr-12 lg:pr-16 pointer-events-none">
        <div className="hero-invitation-serif flex flex-col items-center text-center w-[min(88vw,28rem)] shrink-0">
          <header className="flex flex-col items-center text-center gap-2 sm:gap-2.5">
            <img
              ref={crownRef}
              src="/images/graphics/crown.png"
              alt=""
              aria-hidden
              className="block h-auto w-[clamp(2.5rem,9vw,3.75rem)] object-contain opacity-95"
              draggable={false}
            />
            <p
              ref={inviteLineRef}
              className="uppercase max-w-[min(100%,36rem)] leading-none opacity-95"
              style={{
                color: '#f4dcce',
                fontSize: 'clamp(0.4375rem, 1.25vw, 0.5625rem)',
                letterSpacing: '0.12em'
              }}
            >
              YOU ARE INVITED TO CELEBRATE
            </p>
          </header>

          <h1
            ref={nameRef}
            className="m-0 mt-0 p-0 w-full leading-none border-0 [font:inherit]"
          >
            <img
              src="/images/graphics/name.png"
              alt="Yrenea"
              className="block w-full h-auto max-w-full object-contain mx-auto"
              draggable={false}
            />
          </h1>

          <div className="flex flex-col items-center text-center gap-1 mt-0 max-w-[min(100%,36rem)]">
            <p
              ref={birthdayLineRef}
              className="uppercase leading-tight m-0 opacity-92"
              style={{
                color: '#ffd8ea',
                fontSize: 'clamp(0.6875rem, 2.25vw, 1rem)',
                letterSpacing: '0.1em'
              }}
            >
              18TH BIRTHDAY
            </p>
            <p
              ref={debutLineRef}
              className="uppercase leading-tight m-0 opacity-92"
              style={{
                color: '#ffe9f2',
                fontSize: 'clamp(0.875rem, 3.25vw, 1.35rem)',
                letterSpacing: '0.1em'
              }}
            >
              DEBUT CELEBRATION
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
