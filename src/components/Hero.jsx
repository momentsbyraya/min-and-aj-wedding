import React, { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { celebrant, venues } from '../data'
import './Hero.css'

const Hero = () => {
  const heroRef = useRef(null)
  const contentRef = useRef(null)

  const bgStyle = useMemo(
    () => ({
      backgroundImage: 'url(/images/bg-1.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
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
        id="hero"
        className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center py-8 px-4"
        aria-label="Invitation"
      >
        <div className="absolute inset-0 z-0" style={bgStyle} />

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
          className="relative z-10 max-w-2xl w-full px-6 py-8 sm:px-12 sm:py-10"
        >
          <div className="relative z-10 text-center">
            <div className="mb-3 sm:mb-4">
              <div className="text-[#8B5560] alice-regular font-bold text-xs sm:text-sm md:text-base tracking-widest leading-none">
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

            <h1 className="text-[#8B5560] font-caribbean text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center mb-3 sm:mb-4">
              <span
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none inline-block"
                style={{ lineHeight: '0.8' }}
              >
                O
              </span>
              <span className="inline-block">nce upon</span>
              <br />
              <span className="inline-block" style={{ paddingLeft: '1.5rem' }}>
                <span
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl inline-block leading-none mr-1"
                  style={{ lineHeight: '0.75', marginTop: '-0.1em' }}
                >
                  A
                </span>
                <span className="inline-block">time...</span>
              </span>
            </h1>

            <div className="hero-mirror mb-4 sm:mb-5">
              <div className="hero-mirror-photo">
                <img
                  src="/images/prenup/NZ6_7683.jpeg"
                  alt="AJ and Min"
                />
              </div>
              <img
                className="hero-mirror-frame"
                src="/images/graphics/oval-frame.png"
                alt=""
                aria-hidden="true"
              />
            </div>

            <div className="mb-2 sm:mb-3">
              <div className="text-[#8B5560] alice-regular font-bold text-base sm:text-lg md:text-xl tracking-wider text-center">
                {dateInfo.month}
              </div>
              <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 max-w-md mx-auto">
                <div className="flex flex-col items-center">
                  <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-px bg-[#8B5560] mb-0" />
                  <div className="text-[#8B5560] alice-regular font-bold text-sm sm:text-base md:text-lg tracking-wider">
                    {dateInfo.dayOfWeek}
                  </div>
                  <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-px bg-[#8B5560] mt-0" />
                </div>
                <div className="text-[#8B5560] alice-regular font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                  {dateInfo.day}
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-px bg-[#8B5560] mb-0" />
                  <div className="text-[#8B5560] alice-regular font-bold text-sm sm:text-base md:text-lg tracking-wider">
                    {venueTime}
                  </div>
                  <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-px bg-[#8B5560] mt-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
