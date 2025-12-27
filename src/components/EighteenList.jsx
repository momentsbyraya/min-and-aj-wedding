import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { theme, eighteenths } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const EighteenList = () => {
  const sectionRef = useRef(null)
  const titleTheRef = useRef(null)
  const titleEighteenthsRef = useRef(null)
  const tennisMatchesHeadingRef = useRef(null)
  const tennisMatchesDescRef = useRef(null)
  const tennisMatchesImageRef = useRef(null)
  const matchesGridTitleRef = useRef(null)
  const setsHeadingRef = useRef(null)
  const setsDescRef = useRef(null)
  const setsImageRef = useRef(null)
  const setsGridTitleRef = useRef(null)
  const slicesHeadingRef = useRef(null)
  const slicesDescRef = useRef(null)
  const slicesImageRef = useRef(null)
  const slicesGridTitleRef = useRef(null)

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

    // Animate title "The" - slide down
    if (titleTheRef.current) {
      tl.fromTo(titleTheRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
      )
    }
    
    // Animate title "EIGHTEENTH'S" - slide down
    if (titleEighteenthsRef.current) {
      tl.fromTo(titleEighteenthsRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.4"
      )
    }

    // Animate "18 Tennis Matches" heading - slide from left
    if (tennisMatchesHeadingRef.current) {
      tl.fromTo(tennisMatchesHeadingRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate description - slide from right
    if (tennisMatchesDescRef.current) {
      tl.fromTo(tennisMatchesDescRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate image - slide from right
    if (tennisMatchesImageRef.current) {
      tl.fromTo(tennisMatchesImageRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate matches grid title - slide down
    if (matchesGridTitleRef.current) {
      tl.fromTo(matchesGridTitleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate match cards with stagger
    tl.fromTo(".match-card",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1
      },
      "-=0.2"
    )

    // Animate SETS heading - slide from left
    if (setsHeadingRef.current) {
      tl.fromTo(setsHeadingRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate SETS description - slide from right
    if (setsDescRef.current) {
      tl.fromTo(setsDescRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate SETS image - slide from left
    if (setsImageRef.current) {
      tl.fromTo(setsImageRef.current,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate SETS grid title - slide down
    if (setsGridTitleRef.current) {
      tl.fromTo(setsGridTitleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate SETS names with stagger
    tl.fromTo(".set-card",
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        stagger: 0.08
      },
      "-=0.2"
    )

    // Animate SLICES heading - slide from left
    if (slicesHeadingRef.current) {
      tl.fromTo(slicesHeadingRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate SLICES description - slide from right
    if (slicesDescRef.current) {
      tl.fromTo(slicesDescRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate SLICES image - slide from right
    if (slicesImageRef.current) {
      tl.fromTo(slicesImageRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate SLICES grid title - slide down
    if (slicesGridTitleRef.current) {
      tl.fromTo(slicesGridTitleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate SLICES name groups - slide up
    tl.fromTo(".slice-group",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.15
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
          background-image: url(/assets/images/graphics/Background%20for%20Eighteenths.png);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.85;
          z-index: -1;
        }
        .eighteen-bg-texture > * {
          position: relative;
          z-index: 1;
        }
        .matches-grid {
          grid-template-columns: repeat(2, minmax(0, 200px));
          justify-items: center;
          justify-content: center;
        }
        @media (min-width: 768px) {
          .matches-grid {
            grid-template-columns: repeat(3, minmax(0, 200px));
            justify-items: center;
            justify-content: center;
            max-width: 680px;
            margin-left: auto;
            margin-right: auto;
            width: 100%;
          }
        }
        @media (min-width: 1024px) {
          .matches-grid {
            grid-template-columns: repeat(5, minmax(0, 200px));
            justify-items: center;
            justify-content: center;
            max-width: 1100px;
            margin-left: auto;
            margin-right: auto;
            width: 100%;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .match-10-full-width {
            grid-column: 1 / -1;
            max-width: 100% !important;
            width: 100%;
          }
        }
        @media (max-width: 1023px) {
          .eighteen-image-mobile {
            object-position: right center !important;
          }
        }
        @media (min-width: 768px) {
          .tennis-matches-image {
            object-position: center 25% !important;
          }
        }
        .sets-image {
          object-position: 50% center !important;
        }
      `}</style>
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ 
        backgroundColor: theme.colors.primary
      }}
    >
      {/* Container 1 - Paragraph with title and photo */}
      <div className="relative z-20 flex flex-col lg:flex-row items-stretch gap-0 px-8 pt-16 pb-8 eighteen-bg-texture">
        {/* Paragraph with title */}
        <div className="w-full lg:w-1/2 lg:pl-8 lg:pr-8 pb-8 lg:pb-16 lg:flex lg:flex-col text-center lg:text-left relative z-10">
          {/* Title Group */}
          <div className="pb-8 mb-8" style={{ borderBottom: '1px solid #f5f1eb' }}>
            {/* The in Ballet font */}
            <h1
              ref={titleTheRef}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-ballet mb-2"
              style={{ color: '#f5f1eb', fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}
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
                marginTop: '-0.4em',
                fontSize: 'clamp(3rem, 8vw, 8rem)'
              }}
            >
              EIGHTEENTH'S
            </h2>
          </div>
          <h3 ref={tennisMatchesHeadingRef} className="mb-4" style={{ color: '#f5f1eb' }}>
            <span className="font-instrument-serif font-semibold" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: "'Instrument Serif', serif" }}>18</span>
            <span className="font-tebranos uppercase" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, fontFamily: "'Tebranos', cursive" }}> Tennis Matches</span>
          </h3>
          {eighteenths.categories[0].description && (
            <div ref={tennisMatchesDescRef} className="font-poppins" style={{ color: '#f5f1eb', fontSize: 'clamp(0.875rem, 1.2vw, 1rem)', lineHeight: '1.6', fontFamily: "'Poppins', sans-serif" }}>
              {eighteenths.categories[0].description.split('\n').map((paragraph, index) => (
                <p key={index} className="font-poppins" style={{ marginBottom: paragraph.trim() ? '1rem' : '0.5rem', fontFamily: "'Poppins', sans-serif" }}>
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          )}
        </div>
        {/* Photo */}
        <div className="w-full lg:w-1/2 lg:mt-0 mt-8 h-96 lg:h-auto lg:flex-1 overflow-hidden flex relative z-10">
          <img 
            ref={tennisMatchesImageRef}
            src="/assets/images/prenup/prenup3.jpg" 
            alt="18 Tennis Matches" 
            className="tennis-matches-image w-full h-full object-cover flex-1 eighteen-image-mobile"
            style={{ 
              display: 'block',
              minHeight: '100%',
              objectFit: 'cover',
              objectPosition: 'left center'
            }}
          />
        </div>
      </div>

      {/* Container 2 - Matches */}
      <div className="relative z-20 px-8 py-8 eighteen-bg-texture">
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Title */}
          <h3 ref={matchesGridTitleRef} className="mb-8 text-center" style={{ color: '#f5f1eb' }}>
            <span className="font-instrument-serif font-semibold" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: "'Instrument Serif', serif" }}>18</span>
            <span className="font-tebranos uppercase" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, fontFamily: "'Tebranos', cursive" }}> Tennis Matches</span>
          </h3>
          {/* Grid container for matches */}
          <div className="grid gap-4 justify-items-center matches-grid">
            {eighteenths.categories[1].matches && eighteenths.categories[1].matches.map((match, matchIndex) => (
              <div 
                key={matchIndex} 
                className={`match-card text-center py-6 px-3 w-full ${match.number === 10 ? 'match-10-full-width' : ''}`}
                style={{
                  backgroundColor: theme.colors.primary,
                  border: '0.5px solid #f5f1eb',
                  outline: '0.5px solid #f5f1eb',
                  outlineOffset: '-5px',
                  borderRadius: 0,
                  maxWidth: '200px'
                }}
              >
                <h3 
                  className="text-2xl sm:text-3xl md:text-4xl font-instrument-serif font-semibold mb-4"
                  style={{ 
                    color: '#f5f1eb',
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)'
                  }}
                >
                  MATCH {match.number}
                </h3>
                <div className="flex flex-col items-center">
                  {match.names.map((name, nameIndex) => (
                    <div 
                      key={nameIndex} 
                      className="font-poppins"
                      style={{ 
                        color: '#f5f1eb', 
                        fontSize: '14px',
                        fontFamily: "'Poppins', sans-serif"
                      }}
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Container 3 - SETS */}
      <div className="relative z-20 flex flex-col lg:flex-row items-stretch gap-0 px-8 pt-16 pb-8 eighteen-bg-texture">
        {/* Paragraph with title */}
        <div className="w-full lg:w-1/2 lg:pl-8 lg:pr-8 pb-8 lg:pb-16 lg:flex lg:flex-col text-center lg:text-left relative z-10">
          <h3 ref={setsHeadingRef} className="mb-4" style={{ color: '#f5f1eb' }}>
            <span className="font-instrument-serif font-semibold" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: "'Instrument Serif', serif" }}>18</span>
            <span className="font-tebranos uppercase" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, fontFamily: "'Tebranos', cursive" }}> {eighteenths.categories[3]?.title || 'SETS'}</span>
          </h3>
          {eighteenths.categories[3]?.description && (
            <div ref={setsDescRef} className="font-poppins" style={{ color: '#f5f1eb', fontSize: 'clamp(0.875rem, 1.2vw, 1rem)', lineHeight: '1.6', fontFamily: "'Poppins', sans-serif" }}>
              {eighteenths.categories[3].description.split('\n').map((paragraph, index) => (
                <p key={index} className="font-poppins" style={{ marginBottom: paragraph.trim() ? '1rem' : '0.5rem', fontFamily: "'Poppins', sans-serif" }}>
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          )}
        </div>
        {/* Photo */}
        <div className="w-full lg:w-1/2 lg:mt-0 mt-8 h-96 lg:h-auto lg:flex-1 overflow-hidden flex relative z-10">
          <img 
            ref={setsImageRef}
            src="/assets/images/prenup/prenup2.jpg" 
            alt="18 Sets" 
            className="w-full h-full object-cover flex-1 eighteen-image-mobile sets-image"
            style={{ 
              display: 'block',
              minHeight: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      </div>

      {/* Container 4 - SETS Names Grid */}
      <div className="relative z-20 px-8 py-8 eighteen-bg-texture">
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Title */}
          <h3 ref={setsGridTitleRef} className="mb-8 text-center" style={{ color: '#f5f1eb' }}>
            <span className="font-instrument-serif font-semibold" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: "'Instrument Serif', serif" }}>18</span>
            <span className="font-tebranos uppercase" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, fontFamily: "'Tebranos', cursive" }}> {eighteenths.categories[3]?.title || 'SETS'}</span>
          </h3>
          {/* Grid container for SETS names */}
          <div className="grid gap-4 justify-items-center matches-grid">
            {eighteenths.categories[3]?.names && eighteenths.categories[3].names.map((name, nameIndex) => (
              <div 
                key={nameIndex} 
                className="set-card text-center py-6 px-3 w-full"
                style={{
                  backgroundColor: '#fec0ce',
                  border: '0.5px solid #f5f1eb',
                  outline: '0.5px solid #f5f1eb',
                  outlineOffset: '-5px',
                  borderRadius: 0,
                  maxWidth: '200px'
                }}
              >
                <div className="font-poppins" style={{ 
                  color: theme.colors.tertiary, 
                  fontSize: '14px',
                  fontFamily: "'Poppins', sans-serif"
                }}>
                  {name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Container 5 - SLICES */}
      <div className="relative z-20 flex flex-col lg:flex-row items-stretch gap-0 px-8 pt-16 pb-8 eighteen-bg-texture">
        {/* Paragraph with title */}
        <div className="w-full lg:w-1/2 lg:pl-8 lg:pr-8 pb-8 lg:pb-16 lg:flex lg:flex-col text-center lg:text-left relative z-10">
          <h3 ref={slicesHeadingRef} className="mb-4" style={{ color: '#f5f1eb' }}>
            <span className="font-instrument-serif font-semibold" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: "'Instrument Serif', serif" }}>18</span>
            <span className="font-tebranos uppercase" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, fontFamily: "'Tebranos', cursive" }}> {eighteenths.categories[4]?.title || 'SLICES'}</span>
          </h3>
          {eighteenths.categories[4]?.description && (
            <div ref={slicesDescRef} className="font-poppins" style={{ color: '#f5f1eb', fontSize: 'clamp(0.875rem, 1.2vw, 1rem)', lineHeight: '1.6', fontFamily: "'Poppins', sans-serif" }}>
              {eighteenths.categories[4].description.split('\n').map((paragraph, index) => (
                <p key={index} className="font-poppins" style={{ marginBottom: paragraph.trim() ? '1rem' : '0.5rem', fontFamily: "'Poppins', sans-serif" }}>
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          )}
        </div>
        {/* Photo */}
        <div className="w-full lg:w-1/2 lg:mt-0 mt-8 h-96 lg:h-auto lg:flex-1 overflow-hidden flex relative z-10">
          <img 
            ref={slicesImageRef}
            src="/assets/images/prenup/prenup4.jpg" 
            alt="18 Slices" 
            className="w-full h-full object-cover flex-1 eighteen-image-mobile"
            style={{ 
              display: 'block',
              minHeight: '100%',
              objectFit: 'cover',
              objectPosition: '60% center'
            }}
          />
        </div>
      </div>

      {/* Container 6 - SLICES Names Grid */}
      <div className="relative z-20 px-8 py-8 eighteen-bg-texture">
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Title */}
          <h3 ref={slicesGridTitleRef} className="mb-8 text-center" style={{ color: '#f5f1eb' }}>
            <span className="font-instrument-serif font-semibold" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: "'Instrument Serif', serif" }}>18</span>
            <span className="font-tebranos uppercase" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, fontFamily: "'Tebranos', cursive" }}> {eighteenths.categories[4]?.title || 'SLICES'}</span>
          </h3>
          {/* Two groups container - stack on mobile, side by side on tablet+ */}
          <div className="flex flex-col md:flex-row gap-4">
            {eighteenths.categories[4]?.names && (() => {
              const names = eighteenths.categories[4].names;
              const midPoint = Math.ceil(names.length / 2);
              const group1 = names.slice(0, midPoint);
              const group2 = names.slice(midPoint);
              
              return (
                <>
                  {/* Group 1 */}
                  <div className="slice-group flex-1 py-6 px-4" style={{
                    backgroundColor: theme.colors.tertiary,
                    border: '0.5px solid #f5f1eb',
                    outline: '0.5px solid #f5f1eb',
                    outlineOffset: '-5px',
                    borderRadius: 0
                  }}>
                    <div className="flex flex-col items-center">
                      {group1.map((name, nameIndex) => (
                        <div 
                          key={nameIndex} 
                          className="font-poppins text-center"
                          style={{ 
                            color: '#f5f1eb', 
                            fontSize: '14px',
                            fontFamily: "'Poppins', sans-serif"
                          }}
                        >
                          {name}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Group 2 */}
                  <div className="slice-group flex-1 py-6 px-4" style={{
                    backgroundColor: theme.colors.tertiary,
                    border: '0.5px solid #f5f1eb',
                    outline: '0.5px solid #f5f1eb',
                    outlineOffset: '-5px',
                    borderRadius: 0
                  }}>
                    <div className="flex flex-col items-center">
                      {group2.map((name, nameIndex) => (
                        <div 
                          key={nameIndex} 
                          className="font-poppins text-center"
                          style={{ 
                            color: '#f5f1eb', 
                            fontSize: '14px',
                            fontFamily: "'Poppins', sans-serif"
                          }}
                        >
                          {name}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default EighteenList

