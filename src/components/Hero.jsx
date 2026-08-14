import React, { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { celebrant, venues } from '../data'

const Hero = () => {
  const heroRef = useRef(null)
  const contentRef = useRef(null)

  const bgStyle = useMemo(
    () => ({
      backgroundImage: 'url(/images/graphics/old-book-2.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: 0.75
    }),
    []
  )

  const bgTopStyle = useMemo(
    () => ({
      backgroundImage: 'url(/images/graphics/old-book-bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: 0.5
    }),
    []
  )

  const formatDate = (dateString) => {
    if (!dateString) {
      return { dayOfWeek: '', month: '', day: '', year: '' }
    }
    const [year, month, day] = String(dateString).split('-').map(Number)
    const date =
      year && month && day ? new Date(year, month - 1, day) : new Date(dateString)
    return {
      dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase(),
      month: date.toLocaleDateString('en-US', { month: 'long' }).toUpperCase(),
      day: date.getDate().toString().padStart(2, '0'),
      year: date.getFullYear().toString()
    }
  }

  const debutInfo = celebrant?.debutant?.debut ?? {}
  const dateInfo = formatDate(debutInfo.date)
  const venue = venues?.venue ?? {}
  const venueTime = (venue.main?.time || debutInfo.time || '').replace(/\s/g, '').toUpperCase()
  const preferredName = (
    celebrant?.debutant?.name?.preferred ||
    celebrant?.debutant?.name?.nickname ||
    celebrant?.debutant?.name?.first ||
    'Althea'
  ).trim()
  const venueAddressLine = [venue.address, venue.city, [venue.state, venue.zip].filter(Boolean).join(' ')]
    .filter(Boolean)
    .join(', ')

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          delay: 0.3
        }
      )
    }
  }, [])

  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center py-8 px-4"
        aria-label="Invitation"
      >
        <div className="absolute inset-0 z-0" style={bgStyle} />
        <div className="absolute inset-0 z-0" style={bgTopStyle} />

        <img
          src="/images/graphics/corner-border.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-0 z-10 object-contain"
          style={{
            width: '25vh',
            height: '25vh',
            minWidth: '120px',
            minHeight: '120px',
            maxWidth: '300px',
            maxHeight: '300px',
            transform: 'rotate(90deg) scaleY(-1)'
          }}
        />
        <img
          src="/images/graphics/corner-border.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 z-10 object-contain transform rotate-90"
          style={{
            width: '25vh',
            height: '25vh',
            minWidth: '120px',
            minHeight: '120px',
            maxWidth: '300px',
            maxHeight: '300px'
          }}
        />
        <img
          src="/images/graphics/corner-border.svg"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 z-10 object-contain transform -rotate-90"
          style={{
            width: '25vh',
            height: '25vh',
            minWidth: '120px',
            minHeight: '120px',
            maxWidth: '300px',
            maxHeight: '300px'
          }}
        />
        <img
          src="/images/graphics/corner-border.svg"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 right-0 z-10 object-contain transform rotate-180"
          style={{
            width: '25vh',
            height: '25vh',
            minWidth: '120px',
            minHeight: '120px',
            maxWidth: '300px',
            maxHeight: '300px'
          }}
        />

        <div
          ref={contentRef}
          className="relative z-10 max-w-2xl w-full px-8 py-12 sm:px-12 sm:py-16"
        >
          <div className="relative z-10 text-center">
            <div className="mb-4 sm:mb-6">
              <div className="text-[#6F4A52] alice-regular font-bold text-xs sm:text-sm md:text-base tracking-widest leading-none">
                <div className="text-sm sm:text-base md:text-lg font-black" style={{ fontWeight: 900, lineHeight: '1.1' }}>
                  A NEW
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black" style={{ fontWeight: 900, lineHeight: '1.1' }}>
                  CHAPTER
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm" style={{ lineHeight: '1.1' }}>
                  WILL SOON BEGIN
                </div>
              </div>
            </div>

            <div className="mb-6 sm:mb-8">
              <h1 className="text-[#6F4A52] font-caribbean text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center">
                <span
                  className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-none inline-block"
                  style={{ lineHeight: '0.8' }}
                >
                  O
                </span>
                <span className="inline-block">nce upon</span>
                <br />
                <span className="inline-block" style={{ paddingLeft: '2rem' }}>
                  <span
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none mr-1"
                    style={{ lineHeight: '0.75', marginTop: '-0.1em' }}
                  >
                    A
                  </span>
                  <span className="inline-block">time...</span>
                </span>
              </h1>
            </div>

            <div className="mb-6 sm:mb-8 text-center max-w-xl mx-auto">
              <p
                className="text-[#6F4A52] font-albert font-thin text-sm sm:text-base md:text-lg leading-relaxed"
                style={{ textIndent: '0', overflow: 'hidden' }}
              >
                <span
                  className="font-caribbean text-4xl sm:text-5xl md:text-6xl inline-block leading-none mr-1"
                  style={{ lineHeight: '0.75', marginTop: '0' }}
                >
                  I
                </span>
                <span>
                  n a kingdom not so far away, <br /> a story was planned <br /> for a debutante turning eighteen.
                </span>
              </p>
            </div>

            <div className="mb-6 sm:mb-8">
              <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
                <span className="text-[#6F4A52] font-lavishly text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  {preferredName}
                </span>
              </div>
            </div>

            <div className="mb-2 sm:mb-3">
              <div className="text-[#6F4A52] alice-regular font-bold text-base sm:text-lg md:text-xl tracking-wider text-center">
                {dateInfo.month}
              </div>
              <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 max-w-md mx-auto">
                <div className="flex flex-col items-center">
                  <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-px bg-[#6F4A52] mb-0" />
                  <div className="text-[#6F4A52] alice-regular font-bold text-sm sm:text-base md:text-lg tracking-wider">
                    {dateInfo.dayOfWeek}
                  </div>
                  <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-px bg-[#6F4A52] mt-0" />
                </div>
                <div className="text-[#6F4A52] alice-regular font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                  {dateInfo.day}
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-px bg-[#6F4A52] mb-0" />
                  <div className="text-[#6F4A52] alice-regular font-bold text-sm sm:text-base md:text-lg tracking-wider">
                    {venueTime}
                  </div>
                  <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-px bg-[#6F4A52] mt-0" />
                </div>
              </div>
            </div>

            <div className="text-center max-w-md mx-auto text-[#6F4A52] font-albert font-thin text-xs sm:text-sm md:text-base space-y-1 mb-6">
              {venue.name ? <div className="alice-regular font-bold">{venue.name}</div> : null}
              {venueAddressLine ? <div>{venueAddressLine}</div> : null}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
