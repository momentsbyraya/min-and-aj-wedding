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
  const venueEmbedUrl =
    venueData.googleMapsEmbedUrl ||
    `https://www.google.com/maps?q=${encodeURIComponent(venueData.name || venueData.address || '')}&output=embed`

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
      className="relative py-20 w-full overflow-x-clip"
      style={{ backgroundColor: '#e5d7ed' }}
    >
      <div className="soft-blob soft-blob--small absolute top-[10%] left-[6%] w-36 h-36 z-[1]" aria-hidden="true" />
      <img
        ref={fanBannerRef}
        src="/images/graphics/fan-banner.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 z-[5] h-auto -translate-x-1/2"
        style={{ width: '150vw', maxWidth: 'none' }}
      />
      <img
        src="/images/graphics/location.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-8 right-6 z-[6] h-16 w-16 sm:h-20 sm:w-20 object-contain opacity-90"
      />
      <div className="relative z-20 w-full max-w-2xl mx-auto px-4 text-center">
        <h2 ref={headingRef} className="section-title-graphic section-title-graphic--center mb-10">
          <span className="section-title-graphic-inner section-title-graphic-inner--line font-beautyofthebeast capitalize">
            The Venue
          </span>
        </h2>

        <div className="px-4 pt-8 pb-3 sm:px-6 sm:pt-10 sm:pb-4 md:px-8 md:pt-12 md:pb-5">
          <div className="flex flex-col items-center justify-center gap-6 sm:gap-8">
            <div ref={venuePhotoRef} className="flex w-full justify-center">
              <div
                className="venue-map-frame h-[264px] w-full max-w-[576px] sm:h-[336px] md:h-[384px]"
                style={{ willChange: 'transform', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
              >
                <iframe
                  src={venueEmbedUrl}
                  title={venueData.name ? `Google Map — ${venueData.name}` : 'Google Map location'}
                  className="venue-map-frame__iframe h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div ref={venueNameRef} className="w-full text-center">
              {venueData.name ? (
                <p className="font-poppins text-lg capitalize leading-tight tracking-[0.02em] sm:text-xl md:text-2xl">
                  <span className="bg-gradient-to-r from-[#8a7399] via-[#c9b4d4] to-[#6b5a70] bg-clip-text text-transparent">
                    {venueData.name}
                  </span>
                </p>
              ) : null}
              {venueData.main?.time ? (
                <div className="mt-3 font-poppins" style={{ color: '#6b5a70' }}>
                  <p className="text-base tracking-[0.04em] opacity-90 sm:text-lg md:text-xl">{venueData.main.time} | Saturday</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-1 flex w-full justify-center sm:mt-2">
          <GraphicLink
            ref={buttonRef}
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            imageSrc="/images/graphics/button-container.png"
            className="graphic-button--cta attendance-confirm-button mx-auto shrink-0"
            contentClassName="font-beautyofthebeast lowercase mb-2"
          >
            <span className="bg-gradient-to-r from-[#8a7399] via-[#c9b4d4] to-[#6b5a70] bg-clip-text text-transparent">
              get direction
            </span>
            <FiArrowRight className="h-5 w-5 shrink-0 text-[#8a7399]" aria-hidden="true" />
          </GraphicLink>
        </div>
      </div>
    </section>
  )
}

export default Venue
