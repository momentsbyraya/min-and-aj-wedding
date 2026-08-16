import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { venues as venuesData, celebrant } from '../data'

gsap.registerPlugin(ScrollTrigger)

const Venue = () => {
  const sectionRef = useRef(null)
  const venueNameRef = useRef(null)
  const venueData = venuesData.venue
  const dayOfWeek = celebrant?.debutant?.debut?.dayOfWeek || ''

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 72%',
        end: 'bottom 35%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.fromTo(
      venueNameRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )

    return () => {
      tl.kill()
    }
  }, [])

  const addressLine = [venueData.address, venueData.city, [venueData.state, venueData.zip].filter(Boolean).join(' ')]
    .filter(Boolean)
    .join(', ')

  return (
    <section
      ref={sectionRef}
      id="where-to-go"
      className="relative flex min-h-[800px] w-full flex-col items-center justify-center overflow-x-clip bg-cover bg-center bg-no-repeat pt-24 pb-12 sm:pt-28 sm:pb-16"
      style={{
        backgroundColor: '#F0C9CE',
        backgroundImage: `url(${venueData.image || '/images/venue/venue.png'})`
      }}
    >
      <div className="soft-blob soft-blob--small absolute top-[10%] left-[6%] w-36 h-36 z-[1]" aria-hidden="true" />
      <img
        src="/images/graphics/flower-left.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--flower-left absolute top-0 right-0 z-[8] h-auto pointer-events-none scale-[-1]"
      />
      <img
        src="/images/graphics/flower-left.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--flower-left absolute bottom-0 left-0 z-[8] h-auto pointer-events-none"
      />
      <div className="relative z-20 mx-auto flex w-full max-w-2xl flex-col items-center px-4 text-center">
        <div
          ref={venueNameRef}
          className="mx-auto w-fit max-w-full rounded-sm px-5 py-4 text-center sm:px-8 sm:py-5"
          style={{ backgroundColor: 'rgba(248, 241, 234, 0.94)' }}
        >
          {venueData.name ? (
            <p
              className="font-lavishly text-2xl capitalize leading-tight tracking-[0.02em] sm:text-3xl md:text-4xl"
              style={{ color: '#8B5560' }}
            >
              {venueData.name}
            </p>
          ) : null}
          {addressLine ? (
            <p
              className="mt-2 font-albert font-thin text-sm leading-snug tracking-[0.02em] opacity-90 sm:text-base"
              style={{ color: '#8B5560' }}
            >
              {addressLine}
            </p>
          ) : null}
          {venueData.main?.time || venueData.reception?.time ? (
            <div className="mt-2 alice-regular" style={{ color: '#8B5560' }}>
              {venueData.main?.time ? (
                <p className="text-base tracking-[0.04em] opacity-90 sm:text-lg md:text-xl">
                  {[venueData.main.label || 'Ceremony', venueData.main.time, dayOfWeek].filter(Boolean).join(' · ')}
                </p>
              ) : null}
              {venueData.reception?.time ? (
                <p className="text-base tracking-[0.04em] opacity-90 sm:text-lg md:text-xl">
                  {[venueData.reception.label || 'Reception', venueData.reception.time].filter(Boolean).join(' · ')}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default Venue
