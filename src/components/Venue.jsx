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
  const fanBannerRef = useRef(null)
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
      .fromTo(
        fanBannerRef.current,
        { opacity: 0, y: '40%' },
        {
          opacity: 1,
          y: '0%',
          duration: 1,
          ease: 'power3.out'
        },
        0
      )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 w-full overflow-hidden"
      style={{ backgroundColor: '#0a8885' }}
    >
      <img
        ref={fanBannerRef}
        src="/images/graphics/fan-banner.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-[5] h-auto"
        style={{ width: '100vw' }}
      />
      <div className="relative z-20 w-full max-w-2xl mx-auto px-4 text-center">
        <h2 ref={headingRef} className="section-title-graphic section-title-graphic--center mb-10">
          <span className="section-title-graphic-inner section-title-graphic-inner--line font-beautyofthebeast capitalize">
            The Venue
          </span>
        </h2>

        <div className="px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12">
          <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8">
            <div ref={venuePhotoRef} className="flex shrink-0 justify-center">
              <img
                src={venuePhotoUrl}
                alt={venueData.name ? `Venue — ${venueData.name}` : 'Venue photo'}
                className="h-auto w-[40vw] max-w-[260px] object-contain"
              />
            </div>

            <div ref={venueNameRef} className="min-w-0 flex-1 text-left">
              {venueData.name ? (
                <p className="font-poppins text-lg capitalize leading-tight tracking-[0.02em] sm:text-xl md:text-2xl">
                  <span className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] bg-clip-text text-transparent">
                    {venueData.name}
                  </span>
                </p>
              ) : null}
              {venueData.main?.time || venueData.address ? (
                <div className="mt-3 space-y-1 font-poppins" style={{ color: '#EFE9DC' }}>
                  {venueData.main?.time ? (
                    <p className="text-sm tracking-[0.04em] opacity-90 sm:text-base">({venueData.main.time})</p>
                  ) : null}
                  {venueData.address ? (
                    <p className="text-xs tracking-[0.04em] opacity-90 sm:text-sm">
                      {venueData.address}, {venueData.state}
                    </p>
                  ) : null}
                </div>
              ) : null}
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
            contentClassName="font-beautyofthebeast lowercase mb-2"
          >
            <span className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] bg-clip-text text-transparent">
              get direction
            </span>
            <FiArrowRight className="h-5 w-5 shrink-0 text-[#D4AF37]" aria-hidden="true" />
          </GraphicLink>
        </div>
      </div>
    </section>
  )
}

export default Venue
