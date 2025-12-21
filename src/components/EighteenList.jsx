import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { theme, eighteenths } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const EighteenList = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    // Scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Animate title
    if (titleRef.current) {
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ 
        backgroundColor: theme.colors.primary,
        border: '2px solid #f0ede6'
      }}
    >
      {/* Content */}
      <div className={`relative z-20 ${theme.container.maxWidth} ${theme.container.center}`}>
        {/* Lists - 2 categories per row using grid, all centered */}
        <div className="max-w-6xl mx-auto px-8 md:px-16">
          <div 
            style={{
              borderLeft: '2px solid #f5f1eb',
              borderRight: '2px solid #f5f1eb'
            }}
          >
            {/* Section Title */}
            <div 
              ref={titleRef} 
              className="text-center"
              style={{
                borderBottom: '2px solid #f5f1eb',
                paddingTop: '3rem',
                paddingBottom: '3rem'
              }}
            >
              {/* The in Ballet font */}
              <h1
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-ballet mb-2"
                style={{ color: '#f5f1eb' }}
              >
                The
              </h1>

              {/* EIGHTEENTH'S */}
              <h2
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-tebranos"
                style={{
                  color: '#f5f1eb',
                  fontWeight: 900,
                  lineHeight: '1',
                  marginTop: '-0.4em'
                }}
              >
                EIGHTEENTH'S
              </h2>
            </div>
            
            <div className="grid grid-cols-2" style={{ alignItems: 'stretch', gap: 0 }}>
            {/* Roses */}
            <div className="flex flex-col h-full" style={{ borderRight: '2px solid #f5f1eb', borderBottom: '2px solid #f5f1eb', padding: '1.5rem', backgroundColor: theme.colors.tertiary }}>
              <h3 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-tebranos mb-3 text-center"
                style={{ 
                  color: '#f5f1eb',
                  fontWeight: 900,
                  lineHeight: '1',
                  fontFamily: "'Tebranos', cursive !important"
                }}
              >
                ROSES
              </h3>
              <div className="text-center" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {eighteenths.categories[0].names.map((name, index) => (
                  <div key={index} className="font-poppins uppercase" style={{ color: '#f5f1eb', fontSize: '14px', opacity: 0.8 }}>
                    {name.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>

            {/* Blue Bills */}
            <div className="flex flex-col h-full" style={{ borderBottom: '2px solid #f5f1eb', padding: '1.5rem' }}>
              <h3 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-tebranos mb-3 text-center"
                style={{ 
                  color: '#f5f1eb',
                  fontWeight: 900,
                  lineHeight: '1',
                  fontFamily: "'Tebranos', cursive !important"
                }}
              >
                BLUE BILLS
              </h3>
              <div className="text-center" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {eighteenths.categories[1].names.map((name, index) => (
                  <div key={index} className="font-poppins uppercase" style={{ color: '#f5f1eb', fontSize: '14px', opacity: 0.8 }}>
                    {name.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>

            {/* Bags */}
            <div className="flex flex-col h-full" style={{ borderBottom: '2px solid #f5f1eb', borderRight: '2px solid #f5f1eb', padding: '1.5rem' }}>
              <h3 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-tebranos mb-3 text-center"
                style={{ 
                  color: '#f5f1eb',
                  fontWeight: 900,
                  lineHeight: '1',
                  fontFamily: "'Tebranos', cursive !important"
                }}
              >
                BAGS
              </h3>
              <div className="text-center" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {eighteenths.categories[2].names.map((name, index) => (
                  <div key={index} className="font-poppins uppercase" style={{ color: '#f5f1eb', fontSize: '14px', opacity: 0.8 }}>
                    {name.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>

            {/* Gifts and Candles */}
            <div className="flex flex-col h-full" style={{ borderBottom: '2px solid #f5f1eb', padding: '1.5rem', backgroundColor: '#f0ede6' }}>
              <h3 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-tebranos mb-3 text-center"
                style={{ 
                  color: theme.colors.primary,
                  fontWeight: 900,
                  lineHeight: '1',
                  fontFamily: "'Tebranos', cursive !important"
                }}
              >
                GIFTS & CANDLES
              </h3>
              <div className="text-center" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {eighteenths.categories[3].names.map((name, index) => (
                  <div key={index} className="font-poppins uppercase" style={{ color: theme.colors.primary, fontSize: '14px', opacity: 0.8 }}>
                    {name.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>

            {/* Shots */}
            <div className="flex flex-col h-full" style={{ borderRight: '2px solid #f5f1eb', borderBottom: '2px solid #f5f1eb', padding: '1.5rem', backgroundColor: theme.colors.tertiary }}>
              <h3 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-tebranos mb-3 text-center"
                style={{ 
                  color: '#f5f1eb',
                  fontWeight: 900,
                  lineHeight: '1',
                  fontFamily: "'Tebranos', cursive !important"
                }}
              >
                SHOTS
              </h3>
              <div className="text-center" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {eighteenths.categories[4].names.map((name, index) => (
                  <div key={index} className="font-poppins uppercase" style={{ color: '#f5f1eb', fontSize: '14px', opacity: 0.8 }}>
                    {name.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>

            {/* Sixth Category - Card */}
            <div className="flex flex-col h-full items-center justify-center" style={{ borderBottom: '2px solid #f5f1eb', padding: '1.5rem' }}>
              <div className="text-center">
                <h3 
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-tebranos mb-8"
                  style={{ 
                    color: '#f5f1eb',
                    fontWeight: 900,
                    lineHeight: '1',
                    fontFamily: "'Tebranos', cursive !important"
                  }}
                >
                  BE<br />THERE
                </h3>
                <img 
                  src="/assets/images/graphics/tennis.png" 
                  alt="Tennis" 
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain mx-auto mb-8"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
                <p 
                  className="text-base sm:text-lg md:text-xl font-poppins uppercase mb-8"
                  style={{ 
                    color: '#f5f1eb',
                    letterSpacing: '0.1em'
                  }}
                >
                  Game · On
                </p>
                <img 
                  src="/assets/images/graphics/sparkle.png" 
                  alt="Sparkle" 
                  className="w-6 h-6 sm:w-8 sm:h-8 object-contain mx-auto mt-8"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EighteenList

