import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiArrowRight } from 'react-icons/fi'
import { venues as venuesData } from '../data'

gsap.registerPlugin(ScrollTrigger)

const Venue = () => {
  const randSize = (min, max) => `${Math.floor(Math.random() * (max - min + 1)) + min}px`
  const randPct = (min, max) => `${Math.floor(Math.random() * (max - min + 1)) + min}%`
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
    <section ref={sectionRef} className="relative py-20 w-full overflow-hidden" style={{ backgroundColor: 'transparent' }}>
      <div className="soft-blob soft-blob--alt z-0" style={{ width: randSize(90, 140), height: randSize(78, 118), top: randPct(8, 22), left: randPct(6, 18) }} />
      <div className="soft-blob soft-blob--small z-0" style={{ width: randSize(75, 118), height: randSize(64, 102), top: randPct(66, 82), left: randPct(68, 84) }} />
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
        <h2 ref={headingRef} className="leading-none mb-10">
          <span
            className="block font-halimun text-xl leading-none w-fit"
            style={{ color: '#6F2D36', marginLeft: '20%', marginBottom: '-10px' }}
          >
            the
          </span>
          <span className="block font-rozha text-5xl lowercase mt-1" style={{ color: '#6F2D36' }}>
            venue
          </span>
        </h2>

        <div ref={venuePhotoRef} className="flex justify-center mb-6">
          <img
            src={venuePhotoUrl}
            alt={venueData.name ? `Venue — ${venueData.name}` : 'Venue photo'}
            className="w-full max-w-[300px] h-auto object-contain"
          />
        </div>

        <p ref={venueNameRef} className="font-poppins text-lg tracking-[0.04em] mb-5" style={{ color: '#6F2D36' }}>
          {venueData.name}
          {venueData.main?.time ? (
            <>
              <br />
              <span className="text-base tracking-normal opacity-90">({venueData.main.time})</span>
            </>
          ) : null}
          {venueData.address ? (
            <>
              <br />
              <span className="text-sm tracking-normal opacity-90">{venueData.address}, {venueData.state}</span>
            </>
          ) : null}
        </p>

        <a
          ref={buttonRef}
          href={directionsUrl}
          target="_blank"
          rel="noreferrer"
          className="font-poppins inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-base bg-[#E28B91] text-white"
        >
          <span className="font-poppins">Get Direction</span>
          <FiArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

export default Venue
