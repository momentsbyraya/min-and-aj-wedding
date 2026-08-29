import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { venues as venuesData } from '../data'

gsap.registerPlugin(ScrollTrigger)

const Venue = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const venueData = venuesData.venue

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
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    )

    return () => {
      tl.kill()
    }
  }, [])

  const locationLine = [venueData.address, venueData.city, [venueData.state, venueData.zip].filter(Boolean).join(' ')]
    .filter(Boolean)
    .join(', ')

  const times = [venueData.main?.time, venueData.reception?.time].filter(Boolean)
  const timeLine = times.length > 1 && times[0] !== times[1]
    ? times.join(' · ')
    : times[0] || ''

  const hasCeremony = Boolean(venueData.main?.time || venueData.main?.label)
  const hasReception = Boolean(venueData.reception?.time || venueData.reception?.label)
  const sameVenueLabel =
    hasCeremony && hasReception
      ? 'Ceremony & Reception'
      : hasCeremony
        ? venueData.main?.label || 'Ceremony'
        : hasReception
          ? venueData.reception?.label || 'Reception'
          : ''

  const mapUrl = venueData.googleMapsUrl || venueData.directionsUrl

  return (
    <section
      ref={sectionRef}
      id="where-to-go"
      className="relative flex min-h-[800px] w-full flex-col items-center justify-between overflow-x-clip bg-cover bg-center bg-no-repeat pt-24 pb-10 sm:pt-28 sm:pb-14"
      style={{
        backgroundColor: '#F0C9CE',
        backgroundImage: `url(${venueData.image || '/images/venue/venue.png'})`
      }}
    >
      <div className="soft-blob soft-blob--small absolute top-[10%] left-[6%] z-[1] h-36 w-36" aria-hidden="true" />
      <img
        src="/images/graphics/flower-left.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--flower-left pointer-events-none absolute -right-[8%] -top-[4%] z-[8] h-auto scale-[-1]"
      />
      <img
        src="/images/graphics/flower-left.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--flower-left pointer-events-none absolute -bottom-[4%] -left-[8%] z-[8] h-auto"
      />

      <div
        ref={contentRef}
        className="relative z-20 mx-auto flex w-full max-w-2xl flex-col items-center px-6 text-center sm:px-10"
      >
        {sameVenueLabel ? (
          <p
            className="font-lavishly text-xl leading-none sm:text-2xl md:text-3xl"
            style={{ color: '#8B5560' }}
          >
            {sameVenueLabel}
          </p>
        ) : null}

        {venueData.name ? (() => {
          const words = venueData.name.trim().split(/\s+/)
          const line1Words = words.slice(0, 2)
          const line2Words = words.slice(2)
          const firstWord = line1Words[0] || ''
          const firstLetter = firstWord.charAt(0)
          const firstWordRest = firstWord.slice(1)
          const line1Rest = [firstWordRest, ...line1Words.slice(1)].filter(Boolean).join(' ')
          const line2 = line2Words.join(' ')

          return (
            <h2
              className="font-caribbean mt-2 text-2xl leading-snug sm:mt-3 sm:text-3xl md:text-4xl lg:text-5xl"
              style={{ color: '#8B5560', lineHeight: '1.15' }}
            >
              <span
                className="inline-block text-4xl leading-none sm:text-5xl md:text-6xl lg:text-7xl"
                style={{ lineHeight: '1' }}
              >
                {firstLetter}
              </span>
              <span className="inline-block">{line1Rest}</span>
              {line2 ? (
                <>
                  <br />
                  <span className="inline-block" style={{ paddingLeft: '1.25rem' }}>
                    {line2}
                  </span>
                </>
              ) : null}
            </h2>
          )
        })() : null}

        <div className="mt-3 mb-4 flex items-center justify-center gap-3 sm:mt-4 sm:mb-5" aria-hidden="true">
          <span className="h-px w-8 bg-[#8B5560]/40 sm:w-12" />
          <span className="text-sm leading-none text-[#8B5560]/70">✦</span>
          <span className="h-px w-8 bg-[#8B5560]/40 sm:w-12" />
        </div>

        <div className="mx-auto w-fit max-w-full alice-regular" style={{ color: '#8B5560' }}>
          {timeLine ? (
            <p className="text-base tracking-[0.04em] sm:text-lg">{timeLine}</p>
          ) : null}
          {locationLine ? (
            <p className={`font-albert font-thin text-sm leading-snug tracking-[0.02em] sm:text-base ${timeLine ? 'mt-1' : ''}`}>
              {locationLine}
            </p>
          ) : null}
        </div>
      </div>

      {mapUrl ? (
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="alice-regular relative z-20 shrink-0 px-3 py-1.5 text-sm font-semibold uppercase tracking-[0.28em] sm:text-base md:text-lg transition-opacity hover:opacity-80"
          style={{
            color: '#5C3340',
            backgroundColor: 'rgba(255, 248, 247, 0.72)',
            textShadow: '0 1px 2px rgba(255, 248, 247, 0.9)'
          }}
        >
          View on map
        </a>
      ) : null}
    </section>
  )
}

export default Venue
