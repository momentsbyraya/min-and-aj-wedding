import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { theme, eighteenths } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const EighteenList2 = () => {
  const sectionRef = useRef(null)
  const titleHeroRef = useRef(null)
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

    if (titleHeroRef.current) {
      tl.fromTo(
        titleHeroRef.current,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }
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
        border: '2px solid #F8F1EA'
      }}
    >
      {/* Content */}
      <div className={`relative z-20 ${theme.container.maxWidth} ${theme.container.center}`}>
        {/* Lists - 2 categories per row using grid, all centered */}
        <div className="max-w-6xl mx-auto px-8 md:px-16">
          <div 
            style={{
              borderLeft: '2px solid #F8F1EA',
              borderRight: '2px solid #F8F1EA'
            }}
          >
            {/* Section Title */}
            <div 
              className="text-center eighteen-title"
              style={{
                borderBottom: '2px solid #F8F1EA',
                paddingTop: '3rem',
                paddingBottom: '3rem'
              }}
            >
              <h1 ref={titleHeroRef} className="section-title-graphic section-title-graphic--display section-title-graphic--center mb-6 text-center">
                <span className="section-title-graphic-inner section-title-graphic-inner--line section-title-graphic-inner--light font-beautyofthebeast capitalize">
                  The eighteenth&apos;s
                </span>
              </h1>
            </div>
            
            <div className="grid grid-cols-2" style={{ alignItems: 'stretch', gap: 0 }}>
            {/* Tennis Matches - Full Row */}
            <div className="col-span-2 flex flex-col h-full" style={{ borderBottom: '2px solid #F8F1EA', padding: '1.5rem', backgroundColor: theme.colors.tertiary }}>
              <div className="mb-3 flex w-full justify-center">
                <h3 className="section-title-graphic section-title-graphic--wide section-title-graphic--center inline-block text-center">
                  <span className="section-title-graphic-inner section-title-graphic-inner--line section-title-graphic-inner--light font-beautyofthebeast capitalize">
                    {eighteenths.categories[0].name.toLowerCase()}
                  </span>
                </h3>
              </div>
              {eighteenths.categories[0].description && (
                <div 
                  className="text-center font-poppins eighteen-description"
                  style={{ 
                    color: '#6F4A52', 
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
            <div className="col-span-2 flex flex-col h-full" style={{ borderBottom: '2px solid #F8F1EA', padding: '1.5rem' }}>
              <div className="eighteenth-names-1 text-center" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {eighteenths.categories[1].matches && eighteenths.categories[1].matches.map((match, matchIndex) => (
                  <div key={matchIndex} style={{ marginBottom: '0.5rem' }}>
                    <div className="mb-3 flex w-full justify-center">
                      <h3 className="section-title-graphic section-title-graphic--wide section-title-graphic--center inline-block text-center">
                        <span className="section-title-graphic-inner section-title-graphic-inner--line section-title-graphic-inner--light font-beautyofthebeast capitalize">
                          {`match ${match.number}`}
                        </span>
                      </h3>
                    </div>
                    {match.names.map((name, nameIndex) => (
                      <div key={nameIndex} className="eighteenth-name font-poppins" style={{ color: '#6F4A52', fontSize: '14px', opacity: 0.8, fontFamily: "'Poppins', sans-serif" }}>
                        {name}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Sets - White BG First (Full Row) */}
            <div className="col-span-2 flex flex-col h-full" style={{ borderBottom: '2px solid #F8F1EA', padding: '1.5rem', backgroundColor: '#F8F1EA' }}>
              <div className="mb-3 flex w-full justify-center">
                <h3 className="section-title-graphic section-title-graphic--wide section-title-graphic--center inline-block text-center">
                  <span className="section-title-graphic-inner section-title-graphic-inner--line font-beautyofthebeast capitalize">
                    {(eighteenths.categories[3].title || eighteenths.categories[3].name).toLowerCase()}
                  </span>
                </h3>
              </div>
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
            <div className="col-span-2 flex flex-col h-full" style={{ borderBottom: '2px solid #F8F1EA', padding: '1.5rem' }}>
              <div className="mb-3 flex w-full justify-center">
                <h3 className="section-title-graphic section-title-graphic--wide section-title-graphic--center inline-block text-center">
                  <span className="section-title-graphic-inner section-title-graphic-inner--line section-title-graphic-inner--light font-beautyofthebeast capitalize">
                    sets
                  </span>
                </h3>
              </div>
              <div className="eighteenth-names-2 text-center" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {eighteenths.categories[2].names.map((name, index) => (
                  <div key={index} className="eighteenth-name font-poppins uppercase" style={{ color: '#6F4A52', fontSize: '14px', opacity: 0.8 }}>
                    {name.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>

            {/* Slices - Pink BG First (Full Row) */}
            <div className="col-span-2 flex flex-col h-full" style={{ borderBottom: '2px solid #F8F1EA', padding: '1.5rem', backgroundColor: theme.colors.tertiary }}>
              <div className="mb-3 flex w-full justify-center">
                <h3 className="section-title-graphic section-title-graphic--wide section-title-graphic--center inline-block text-center">
                  <span className="section-title-graphic-inner section-title-graphic-inner--line section-title-graphic-inner--light font-beautyofthebeast capitalize">
                    {(eighteenths.categories[4].title || eighteenths.categories[4].name).toLowerCase()}
                  </span>
                </h3>
              </div>
              {eighteenths.categories[4].description && (
                <div 
                  className="text-center font-poppins eighteen-description"
                  style={{ 
                    color: '#6F4A52', 
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
            <div ref={beThereCardRef} className="col-span-2 flex flex-col h-full" style={{ borderBottom: '2px solid #F8F1EA', padding: '1.5rem' }}>
              <div className="mb-3 flex w-full justify-center">
                <h3 className="section-title-graphic section-title-graphic--wide section-title-graphic--center inline-block text-center">
                  <span className="section-title-graphic-inner section-title-graphic-inner--line section-title-graphic-inner--light font-beautyofthebeast capitalize">
                    slices
                  </span>
                </h3>
              </div>
              <div className="eighteenth-names-5 text-center" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {eighteenths.categories[5]?.names?.map((name, index) => (
                  <div key={index} className="eighteenth-name font-poppins uppercase" style={{ color: '#6F4A52', fontSize: '14px', opacity: 0 }}>
                    {name.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>

            {/* Duplicate of BE THERE Card - Full Row */}
            <div className="col-span-2 flex flex-col h-full items-center justify-center" style={{ borderBottom: '2px solid #F8F1EA', paddingTop: '3rem', paddingBottom: '3rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
              <div className="text-center">
                <h3 className="section-title-graphic section-title-graphic--display section-title-graphic--center mx-auto mb-8 inline-block text-center">
                  <span className="section-title-graphic-inner section-title-graphic-inner--line section-title-graphic-inner--light font-beautyofthebeast capitalize">
                    be there
                  </span>
                </h3>
                <p 
                  className="text-base sm:text-lg md:text-xl font-poppins uppercase mb-8"
                  style={{ 
                    color: '#6F4A52',
                    letterSpacing: '0.1em'
                  }}
                >
                  Game · On
                </p>
                <img 
                  src="/images/graphics/flower.png" 
                  alt="Decoration" 
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

