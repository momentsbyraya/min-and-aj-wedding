import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiArrowRight } from 'react-icons/fi'
import { venues as venuesData } from '../data'
import GraphicLink from './GraphicLink'

gsap.registerPlugin(ScrollTrigger)

const Venue = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const venuePhotoRef = useRef(null)
  const venueNameRef = useRef(null)
  const buttonRef = useRef(null)
  const venueData = venuesData.venue
  const directionsUrl = venueData.googleMapsUrl || venueData.directionsUrl || '#'
  const venuePhotoUrl = '/images/venue/venue.png'

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
        venuePhotoRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(
        venueNameRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
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
      className="relative py-20 w-full overflow-hidden"
      style={{ backgroundColor: '#F9E8F0' }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/graphics/palace-2.png)',
          opacity: 0.6
        }}
        aria-hidden="true"
      />
      <img
        src="/images/graphics/flower-banner.png"
        alt="Floral banner"
        className="intro-flower-banner pointer-events-none absolute left-1/2 top-0 z-10 h-auto -translate-x-1/2"
        style={{ width: '100vw', maxWidth: 'none' }}
      />
      <img
        src="/images/graphics/flower-banner.png"
        alt=""
        aria-hidden="true"
        className="schedule-flower-banner-bottom pointer-events-none absolute bottom-0 left-1/2 z-10 h-auto -translate-x-1/2 rotate-180"
        style={{ width: '100vw', maxWidth: 'none' }}
      />
      <div className="relative z-20 w-full max-w-md mx-auto px-4 text-center">
        <h2 ref={headingRef} className="section-title-graphic section-title-graphic--center mb-10">
          <span className="section-title-graphic-inner section-title-graphic-inner--line font-beautyofthebeast capitalize">
            The Venue
          </span>
        </h2>

        <div style={{ filter: 'drop-shadow(0 10px 28px rgba(55, 30, 40, 0.12))' }}>
          <div className="intro-content-soft-panel">
            <div className="px-6 py-8 text-center sm:px-9 sm:py-10 md:px-10 md:py-12">
              <div ref={venuePhotoRef} className="mb-5 flex justify-center md:mb-6">
                <img
                  src={venuePhotoUrl}
                  alt={venueData.name ? `Venue — ${venueData.name}` : 'Venue photo'}
                  className="h-auto w-full max-w-[300px] object-contain"
                />
              </div>

              <div ref={venueNameRef} className="text-center" style={{ color: '#6F2D36' }}>
                {venueData.name ? (
                  <p className="font-beautyofthebeast text-xl capitalize leading-tight tracking-[0.02em] sm:text-2xl">
                    {venueData.name}
                  </p>
                ) : null}
                {venueData.main?.time || venueData.address ? (
                  <div className="mt-3 space-y-1 font-poppins">
                    {venueData.main?.time ? (
                      <p className="text-base tracking-[0.04em] opacity-90">({venueData.main.time})</p>
                    ) : null}
                    {venueData.address ? (
                      <p className="text-sm tracking-[0.04em] opacity-90">
                        {venueData.address}, {venueData.state}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex w-full justify-center">
          <GraphicLink
            ref={buttonRef}
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            imageSrc="/images/graphics/button-container.png"
            className="graphic-button--cta attendance-confirm-button mx-auto shrink-0"
            contentClassName="font-beautyofthebeast lowercase"
          >
            get direction
            <FiArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
          </GraphicLink>
        </div>
      </div>
    </section>
  )
}

export default Venue
