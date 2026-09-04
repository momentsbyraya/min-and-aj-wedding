import React, { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { celebrant, venues } from '../data'
import { prenupAsset, FEATURE_PHOTOS } from '../utils/prenupAssets'
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
  const venueTime = (venue.main?.time || debutInfo.time || '2:00 PM').trim()

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
          src="/images/graphics/corner-border-2.png"
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
          src="/images/graphics/corner-border-2.png"
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
          src="/images/graphics/corner-border-2.png"
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
          src="/images/graphics/corner-border-2.png"
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
          className="relative z-10 max-w-2xl w-full py-8 sm:py-10"
        >
          <div className="relative z-10 text-center">
            <div className="mb-3 sm:mb-4">
              <div className="text-[#8B5560] alice-regular font-bold text-xs sm:text-sm md:text-base tracking-widest leading-none">
                <div
                  className="text-sm sm:text-base md:text-lg font-black whitespace-nowrap"
                  style={{ fontWeight: 900, lineHeight: '1.1' }}
                >
                  OUR GREATEST
                </div>
                <div
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black"
                  style={{ fontWeight: 900, lineHeight: '1.1' }}
                >
                  CHAPTER
                </div>
                <div
                  className="text-[10px] sm:text-xs md:text-sm whitespace-nowrap"
                  style={{ lineHeight: '1.1' }}
                >
                  BEGINS ON
                </div>
              </div>
            </div>

            <h1 className="text-[#8B5560] alice-regular text-lg sm:text-xl md:text-2xl lg:text-3xl text-center mb-3 sm:mb-4 uppercase">
              <span className="inline-block whitespace-nowrap">
                <span className="inline-block">#once</span>
                <span className="inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl">apen</span>
                <span className="inline-block">a</span>
                <span className="inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl">mini</span>
                <span className="inline-block">ngfulstory</span>
              </span>
            </h1>

            <div className="hero-mirror mb-4 sm:mb-5">
              <div className="hero-mirror-photo">
                <img
                  src={prenupAsset(FEATURE_PHOTOS.hero)}
                  alt="Min and AJ"
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
