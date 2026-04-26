import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { theme, eighteenths } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const EighteenList2 = () => {
  const sectionRef = useRef(null)
  const titleTheRef = useRef(null)
  const titleEighteenthsRef = useRef(null)
  const beThereCardRef = useRef(null)

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

    // Animate title text elements
    if (titleTheRef.current) {
      tl.fromTo(titleTheRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      )
    }
    
    if (titleEighteenthsRef.current) {
      tl.fromTo(titleEighteenthsRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      )
    }

    // Animate names per category - categories in same row animate together, names within category stagger
    // Row 1: Roses (0) and Blue Bills (1) - animate together
    tl.fromTo(".eighteenth-names-0 .eighteenth-name",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.08
      },
      "-=0.2"
    )
    
    tl.fromTo(".eighteenth-names-1 .eighteenth-name",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.08
      },
      "-=0.4" // Start at same time as category 0
    )
    
    // Row 2: Bags (2) and Gifts & Candles (3) - animate together
    tl.fromTo(".eighteenth-names-2 .eighteenth-name",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.08
      },
      "-=0.2"
    )
    
    tl.fromTo(".eighteenth-names-3 .eighteenth-name",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.08
      },
      "-=0.4" // Start at same time as category 2
    )
    
    // Row 3: Slices (4) - animate alone
    tl.fromTo(".eighteenth-names-4 .eighteenth-name",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.08
      },
      "-=0.2"
    )

    // Row 4: Slices Names (5) - animate alone
    tl.fromTo(".eighteenth-names-5 .eighteenth-name",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.08
      },
      "-=0.2"
    )


    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
      <style>{`
        .eighteen-bg-texture::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url(/images/graphics/bg-textured.png);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.85;
          z-index: 0;
        }
        @media (min-width: 1024px) {
          .eighteen-title {
            padding-top: 6rem !important;
          }
          .eighteen-description {
            font-size: clamp(0.75rem, 1vw, 0.875rem) !important;
          }
        }
      `}</style>
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden eighteen-bg-texture"
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
              className="text-center eighteen-title"
              style={{
                borderBottom: '2px solid #f5f1eb',
                paddingTop: '3rem',
                paddingBottom: '3rem'
              }}
            >
              {/* The in Ballet font */}
              <h1
                ref={titleTheRef}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-ballet mb-2"
                style={{ color: '#f5f1eb' }}
              >
                The
              </h1>

              {/* EIGHTEENTH'S */}
              <h2
                ref={titleEighteenthsRef}
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
            {/* Tennis Matches - Full Row */}
            <div className="col-span-2 flex flex-col h-full" style={{ borderBottom: '2px solid #f5f1eb', padding: '1.5rem', backgroundColor: theme.colors.tertiary }}>
              <h3 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-tebranos mb-3 text-center"
                style={{ 
                  color: '#f5f1eb',
                  fontWeight: 900,
                  lineHeight: '1',
                  fontFamily: "'Tebranos', cursive !important"
                }}
              >
                {eighteenths.categories[0].name.toUpperCase()}
              </h3>
              {eighteenths.categories[0].description && (
                <div 
                  className="text-center font-poppins eighteen-description"
                  style={{ 
                    color: '#f5f1eb', 
                    fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
                    lineHeight: '1.6',
                    opacity: 0.9,
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  {eighteenths.categories[0].description.split('\n').map((paragraph, index) => (
                    <p key={index} className="font-poppins" style={{ marginBottom: paragraph.trim() ? '0.75rem' : '0.5rem', fontFamily: "'Poppins', sans-serif" }}>
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Matches - Full Row */}
            <div className="col-span-2 flex flex-col h-full" style={{ borderBottom: '2px solid #f5f1eb', padding: '1.5rem' }}>
              <div className="eighteenth-names-1 text-center" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {eighteenths.categories[1].matches && eighteenths.categories[1].matches.map((match, matchIndex) => (
                  <div key={matchIndex} style={{ marginBottom: '0.5rem' }}>
                    <h3 
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-instrument-serif font-semibold mb-3 text-center"
                      style={{ 
                        color: '#f5f1eb',
                        lineHeight: '1',
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)'
                      }}
                    >
                      MATCH {match.number}
                    </h3>
                    {match.names.map((name, nameIndex) => (
                      <div key={nameIndex} className="eighteenth-name font-poppins" style={{ color: '#f5f1eb', fontSize: '14px', opacity: 0.8, fontFamily: "'Poppins', sans-serif" }}>
                        {name}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Sets - White BG First (Full Row) */}
            <div className="col-span-2 flex flex-col h-full" style={{ borderBottom: '2px solid #f5f1eb', padding: '1.5rem', backgroundColor: '#f0ede6' }}>
              <h3 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-tebranos mb-3 text-center"
                style={{ 
                  color: theme.colors.primary,
                  fontWeight: 900,
                  lineHeight: '1',
                  fontFamily: "'Tebranos', cursive !important"
                }}
              >
                {eighteenths.categories[3].title || eighteenths.categories[3].name.toUpperCase()}
              </h3>
              {eighteenths.categories[3].description && (
                <div 
                  className="text-center font-poppins eighteen-description"
                  style={{ 
                    color: theme.colors.primary, 
                    fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
                    lineHeight: '1.6',
                    opacity: 0.9,
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  {eighteenths.categories[3].description.split('\n').map((paragraph, index) => (
                    <p key={index} className="font-poppins" style={{ marginBottom: paragraph.trim() ? '0.75rem' : '0.5rem', fontFamily: "'Poppins', sans-serif" }}>
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Sets - Names (Full Row) */}
            <div className="col-span-2 flex flex-col h-full" style={{ borderBottom: '2px solid #f5f1eb', padding: '1.5rem' }}>
              <h3 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-tebranos mb-3 text-center"
                style={{ 
                  color: '#f5f1eb',
                  fontWeight: 900,
                  lineHeight: '1',
                  fontFamily: "'Tebranos', cursive !important"
                }}
              >
                SETS
              </h3>
              <div className="eighteenth-names-2 text-center" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {eighteenths.categories[2].names.map((name, index) => (
                  <div key={index} className="eighteenth-name font-poppins uppercase" style={{ color: '#f5f1eb', fontSize: '14px', opacity: 0.8 }}>
                    {name.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>

            {/* Slices - Pink BG First (Full Row) */}
            <div className="col-span-2 flex flex-col h-full" style={{ borderBottom: '2px solid #f5f1eb', padding: '1.5rem', backgroundColor: theme.colors.tertiary }}>
              <h3 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-tebranos mb-3 text-center"
                style={{ 
                  color: '#f5f1eb',
                  fontWeight: 900,
                  lineHeight: '1',
                  fontFamily: "'Tebranos', cursive !important"
                }}
              >
                {eighteenths.categories[4].title || eighteenths.categories[4].name.toUpperCase()}
              </h3>
              {eighteenths.categories[4].description && (
                <div 
                  className="text-center font-poppins eighteen-description"
                  style={{ 
                    color: '#f5f1eb', 
                    fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
                    lineHeight: '1.6',
                    opacity: 0.9,
                    fontFamily: "'Poppins', sans-serif"
                  }}
                >
                  {eighteenths.categories[4].description.split('\n').map((paragraph, index) => (
                    <p key={index} className="font-poppins" style={{ marginBottom: paragraph.trim() ? '0.75rem' : '0.5rem', fontFamily: "'Poppins', sans-serif" }}>
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Slices Names (Full Row) */}
            <div ref={beThereCardRef} className="col-span-2 flex flex-col h-full" style={{ borderBottom: '2px solid #f5f1eb', padding: '1.5rem' }}>
              <h3 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-tebranos mb-3 text-center"
                style={{ 
                  color: '#f5f1eb',
                  fontWeight: 900,
                  lineHeight: '1',
                  fontFamily: "'Tebranos', cursive !important"
                }}
              >
                SLICES
              </h3>
              <div className="eighteenth-names-5 text-center" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {eighteenths.categories[5]?.names?.map((name, index) => (
                  <div key={index} className="eighteenth-name font-poppins uppercase" style={{ color: '#f5f1eb', fontSize: '14px', opacity: 0 }}>
                    {name.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>

            {/* Duplicate of BE THERE Card - Full Row */}
            <div className="col-span-2 flex flex-col h-full items-center justify-center" style={{ borderBottom: '2px solid #f5f1eb', paddingTop: '3rem', paddingBottom: '3rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
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
                  src="/images/graphics/tennis.png" 
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
                  src="/images/graphics/sparkle.png" 
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
    </>
  )
}

export default EighteenList2

