import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { FiHeart } from 'react-icons/fi'
import { celebrant, venues } from '../data'

const Hero = () => {
  const crownRef = useRef(null)
  const inviteLineRef = useRef(null)
  const nameRef = useRef(null)
  const dividerRef = useRef(null)
  const debutLineRef = useRef(null)
  const datetimeRef = useRef(null)

  const debutInfo = celebrant?.debutant?.debut ?? {}
  const debutTime = (debutInfo.time || '').trim()
  const venueName = (venues?.venue?.name || '').trim()
  let debutDateLabel = ''
  if (debutInfo.date) {
    const [year, month, day] = debutInfo.date.split('-').map(Number)
    if (year && month && day) {
      const d = new Date(year, month - 1, day)
      debutDateLabel = d.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()
    }
  }

  useLayoutEffect(() => {
    const steps = [
      crownRef.current,
      inviteLineRef.current,
      nameRef.current,
      dividerRef.current,
      debutLineRef.current,
      datetimeRef.current
    ].filter(Boolean)

    if (!steps.length) return undefined

    gsap.set(steps, { opacity: 0, y: 26 })

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
    // Staggered starts with overlap (not simultaneous, not strictly serial)
    const overlap = '-=0.42'

    tl.to(crownRef.current, { opacity: 1, y: 0, duration: 0.68 })
      .to(inviteLineRef.current, { opacity: 1, y: 0, duration: 0.62 }, overlap)
      .to(nameRef.current, { opacity: 1, y: 0, duration: 0.78 }, overlap)
      .to(dividerRef.current, { opacity: 1, y: 0, duration: 0.52 }, overlap)
      .to(debutLineRef.current, { opacity: 1, y: 0, duration: 0.52 }, overlap)
      .to(datetimeRef.current, { opacity: 1, y: 0, duration: 0.6 }, overlap)

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
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-cover bg-center opacity-25"
        style={{ backgroundImage: "url('/images/graphics/butterflies-bg.png')" }}
        aria-hidden
      />
      <img
        src="/images/graphics/fan%20flower%20-%201.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--fan absolute bottom-0 left-0 z-[3] h-auto pointer-events-none opacity-80"
      />
      <img
        src="/images/graphics/flower-right-2.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--flower-right absolute bottom-0 right-0 z-[3] h-auto pointer-events-none opacity-80"
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
                color: '#3f3348',
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
              alt="Shanara"
              className="block w-full h-auto max-w-full object-contain mx-auto"
              draggable={false}
            />
          </h1>

          <div className="flex flex-col items-center text-center gap-2 mt-0 max-w-[min(100%,36rem)]">
            <div ref={dividerRef} className="flex w-full items-center justify-center gap-3 opacity-95">
              <span
                className="block h-px flex-1 max-w-[5rem]"
                style={{ backgroundColor: 'rgba(63, 51, 72, 0.35)' }}
              />
              <FiHeart
                className="h-3 w-3 shrink-0 fill-current"
                style={{ color: '#5a4868' }}
                aria-hidden="true"
              />
              <span
                className="block h-px flex-1 max-w-[5rem]"
                style={{ backgroundColor: 'rgba(63, 51, 72, 0.35)' }}
              />
            </div>
            <p
              ref={debutLineRef}
              className="font-foglihten uppercase leading-tight m-0 opacity-92"
              style={{
                color: '#3f3348',
                fontSize: 'clamp(0.875rem, 3vw, 1.25rem)',
                letterSpacing: '0.22em'
              }}
            >
              A DECADE AND EIGHT
            </p>
          </div>
        </div>
      </div>

      <div
        ref={datetimeRef}
        className="absolute bottom-0 left-0 right-0 z-40 flex flex-col items-center text-center pb-6 sm:pb-8 md:pb-10 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-1.5 px-4">
          {debutDateLabel || debutTime ? (
            <p
              className="font-poppins uppercase leading-none m-0"
              style={{
                color: '#3f3348',
                fontSize: 'clamp(0.55rem, 1.6vw, 0.7rem)',
                letterSpacing: '0.18em'
              }}
            >
              {[debutDateLabel, debutTime].filter(Boolean).join('  |  ')}
            </p>
          ) : null}
          {venueName ? (
            <p
              className="font-poppins uppercase leading-tight m-0"
              style={{
                color: '#5a4868',
                fontSize: 'clamp(0.55rem, 1.6vw, 0.7rem)',
                letterSpacing: '0.18em'
              }}
            >
              {venueName}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default Hero
