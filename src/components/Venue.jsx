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

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[800px] w-full flex-col justify-between overflow-x-clip bg-cover bg-center bg-no-repeat pt-24 pb-6 sm:pt-28 sm:pb-8"
      style={{
        backgroundColor: '#e5d7ed',
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
      <div className="relative z-20 w-full max-w-2xl mx-auto px-4 text-center">
        <h2 ref={headingRef} className="section-title-graphic section-title-graphic--center mx-auto mb-0">
          <span className="section-title-graphic-inner section-title-graphic-inner--line font-beautyofthebeast capitalize !mb-0 -translate-y-2 sm:-translate-y-3">
            The Venue
          </span>
        </h2>
      </div>

      <div className="relative z-20 w-full max-w-2xl mx-auto px-4 text-center">
        <div
          ref={venueNameRef}
          className="mx-auto w-fit max-w-full rounded-sm px-5 py-4 text-center sm:px-8 sm:py-5"
          style={{ backgroundColor: 'rgba(250, 232, 206, 0.94)' }}
        >
          {venueData.name ? (
            <p
              className="font-poppins text-lg capitalize leading-tight tracking-[0.02em] sm:text-xl md:text-2xl"
              style={{ color: '#3f3348' }}
            >
              {venueData.name}
            </p>
          ) : null}
          {venueData.main?.time ? (
            <div className="mt-2 font-poppins" style={{ color: '#3f3348' }}>
              <p className="text-base tracking-[0.04em] opacity-90 sm:text-lg md:text-xl">
                {[venueData.main.time, dayOfWeek].filter(Boolean).join(' | ')}
              </p>
            </div>
          ) : null}
        </div>

        <div className="mt-1 flex w-full justify-center sm:mt-2">
          <GraphicLink
            ref={buttonRef}
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            imageSrc="/images/graphics/button-container.png"
            className="graphic-button--cta graphic-button--cta-centered mx-auto shrink-0"
            contentClassName="font-beautyofthebeast lowercase !mb-0 items-center"
          >
            <span style={{ color: '#3f3348' }}>
              get direction
            </span>
            <FiArrowRight className="h-5 w-5 shrink-0 text-[#5a4868]" aria-hidden="true" />
          </GraphicLink>
        </div>
      </div>
    </section>
  )
}

export default Venue
