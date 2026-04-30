import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { venues as venuesData } from '../data'

gsap.registerPlugin(ScrollTrigger)

const Venue = () => {
  const randSize = (min, max) => `${Math.floor(Math.random() * (max - min + 1)) + min}px`
  const randPct = (min, max) => `${Math.floor(Math.random() * (max - min + 1)) + min}%`
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const qrRef = useRef(null)
  const venueNameRef = useRef(null)
  const buttonRef = useRef(null)
  const venueData = venuesData.venue
  const directionsUrl = venueData.googleMapsUrl || venueData.directionsUrl || '#'
  const qrCodeUrl = '/images/qr/venue.png'

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
        qrRef.current,
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

        <div ref={qrRef} className="flex justify-center mb-6">
          <img
            src={qrCodeUrl}
            alt="QR code for venue directions"
            className="w-[170px] h-[170px] object-contain"
          />
        </div>

        <p ref={venueNameRef} className="tracking-[0.08em] mb-5" style={{ color: '#6F2D36' }}>
          <span className="font-rozha text-2xl">Double Tree</span>
          <br />
          <span className="font-poppins text-lg">by Hilton Ballroom</span>
        </p>

        <a
          ref={buttonRef}
          href={directionsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-base bg-[#E28B91] text-white"
        >
          <span style={{ fontFamily: 'Poppins, sans-serif' }}>Get Direction</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

export default Venue
