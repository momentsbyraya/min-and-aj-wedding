import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiArrowRight } from 'react-icons/fi'
import { venues as venuesData, celebrant } from '../data'
import GraphicLink from './GraphicLink'

gsap.registerPlugin(ScrollTrigger)

const Venue = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const venueNameRef = useRef(null)
  const buttonRef = useRef(null)
  const venueData = venuesData.venue
  const dayOfWeek = celebrant?.debutant?.debut?.dayOfWeek || ''
  const directionsUrl = venueData.googleMapsUrl || venueData.directionsUrl || '#'

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
      headingRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
    )
      .fromTo(
        venueNameRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.25'
      )
      .fromTo(
        buttonRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        '-=0.2'
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
      className="relative flex min-h-[800px] w-full flex-col items-center justify-center overflow-x-clip bg-cover bg-center bg-no-repeat pt-24 pb-12 sm:pt-28 sm:pb-16"
      style={{
        backgroundColor: '#E8C4C8',
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
        <h2 ref={headingRef} className="section-title-graphic section-title-graphic--center mx-auto mb-4 sm:mb-6">
          <span className="section-title-graphic-inner section-title-graphic-inner--line font-caribbean capitalize !mb-0 -translate-y-2 sm:-translate-y-3">
            The Venue
          </span>
        </h2>

        <div
          ref={venueNameRef}
          className="mx-auto w-fit max-w-full rounded-sm px-5 py-4 text-center sm:px-8 sm:py-5"
          style={{ backgroundColor: 'rgba(248, 241, 234, 0.94)' }}
        >
          {venueData.name ? (
            <p
              className="font-lavishly text-2xl capitalize leading-tight tracking-[0.02em] sm:text-3xl md:text-4xl"
              style={{ color: '#6F4A52' }}
            >
              {venueData.name}
            </p>
          ) : null}
          {addressLine ? (
            <p
              className="mt-2 font-albert font-thin text-sm leading-snug tracking-[0.02em] opacity-90 sm:text-base"
              style={{ color: '#6F4A52' }}
            >
              {addressLine}
            </p>
          ) : null}
          {venueData.main?.time ? (
            <div className="mt-2 alice-regular" style={{ color: '#6F4A52' }}>
              <p className="text-base tracking-[0.04em] opacity-90 sm:text-lg md:text-xl">
                {[venueData.main.time, dayOfWeek].filter(Boolean).join(' | ')}
              </p>
            </div>
          ) : null}
        </div>

        <div className="mt-3 flex w-full justify-center sm:mt-4">
          <GraphicLink
            ref={buttonRef}
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            imageSrc="/images/graphics/button-container.png"
            className="graphic-button--cta graphic-button--cta-centered mx-auto shrink-0"
            contentClassName="alice-regular lowercase !mb-0 items-center"
          >
            <span style={{ color: '#6F4A52' }}>
              get direction
            </span>
            <FiArrowRight className="h-5 w-5 shrink-0 text-[#9B737C]" aria-hidden="true" />
          </GraphicLink>
        </div>
      </div>
    </section>
  )
}

export default Venue
