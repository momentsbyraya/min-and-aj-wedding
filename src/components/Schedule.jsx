import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { theme } from '../data'
import { schedule, celebrant, venues } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Schedule = () => {
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)
  const lineRef = useRef(null)
  const headerRef = useRef(null)
  const imageRef = useRef(null)

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

    // Animate header
    if (headerRef.current) {
      tl.fromTo(headerRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
    }

    // Timeline unfolds - line draws progressively, items appear sequentially
    // Line draws from top to bottom
    tl.fromTo(lineRef.current, 
      { scaleY: 0, transformOrigin: "top" },
      { scaleY: 1, duration: 1.5, ease: "power2.out" },
      "-=0.4"
    )

    // Each timeline item appears sequentially as line progresses
    schedule.events.forEach((_, index) => {
      const itemSelector = `.timeline-item-${index}`
      
      // Dot appears first
      tl.fromTo(`${itemSelector} .timeline-dot`,
        { opacity: 0, scale: 0 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.4, 
          ease: "back.out(1.7)"
        },
        index === 0 ? "-=1.1" : "+=0.2"
      )

      // Time and description appear together after dot
      tl.fromTo(`${itemSelector} .timeline-time, ${itemSelector} .timeline-description`,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: "power2.out"
        },
        "-=0.2"
      )
    })

    // Image animation - responsive
    if (imageRef.current) {
      const mm = gsap.matchMedia()
      
      // Mobile: fade in
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(imageRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })
      
      // Large screens: slide from left
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(imageRef.current,
          { opacity: 0, x: -100 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
    const year = date.getFullYear()
    return { day, month, year }
  }

  const dateInfo = formatDate(celebrant.debutant.debut.date)

  return (
    <>
      <style>{`
        @media (max-width: 1023px) {
          .schedule-image-mobile {
            margin-left: calc(-1rem - 2rem) !important;
            margin-right: calc(-1rem - 2rem) !important;
            width: calc(100% + 6rem) !important;
            min-height: 600px !important;
          }
        }
      `}</style>
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden pl-8 pr-8 lg:pl-0 lg:pr-0"
      style={{ backgroundColor: '#f5f1eb' }}
    >
      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
          {/* Flex Container - Side by side on lg screens */}
          <div className="flex flex-col lg:flex-row lg:items-stretch lg:gap-8 lg:min-h-full">
            {/* Left Side - Image (50% on lg) */}
            <div className="w-full lg:w-1/2 lg:mt-0 mt-8 h-96 lg:h-auto lg:flex-1 overflow-hidden flex order-2 lg:order-1 schedule-image-mobile">
              <img 
                ref={imageRef}
                src="/images/prenup/prenup6.jpg" 
                alt="Prenup" 
                className="w-full h-full object-cover flex-1"
                style={{ 
                  display: 'block',
                  minHeight: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center center'
                }}
              />
            </div>

            {/* Right Side - Text Content (50% on lg) */}
            <div className="w-full lg:w-1/2 lg:pl-8 lg:pr-8 pt-16 pb-8 lg:pt-16 lg:pb-16 lg:flex lg:flex-col order-1 lg:order-2">
              {/* Header Section */}
              <div ref={headerRef} className="text-center mb-12">
                {/* Order in Ballet font */}
                <h1
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-ballet mb-2"
                  style={{ color: theme.colors.primary, fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}
                >
                  Order
                </h1>

                {/* OF PLAY */}
                <h2
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-tebranos mb-4 uppercase"
                  style={{
                    color: theme.colors.primary,
                    fontWeight: 900,
                    lineHeight: '1',
                    marginTop: '-0.4em',
                    fontSize: 'clamp(3rem, 8vw, 8rem)'
                  }}
                >
                  OF PLAY
                </h2>
              </div>

          {/* Main Content with Timeline */}
          <div className="relative" style={{ paddingTop: '1rem' }}>
            {/* Vertical Timeline */}
            <div ref={timelineRef} className="relative max-w-2xl mx-auto">
              {/* Continuous Vertical Line - Centered */}
              <div 
                ref={lineRef}
                className="absolute w-0.5"
                style={{ 
                  backgroundColor: theme.colors.primary, 
                  left: '50%',
                  transform: 'translateX(-50%)',
                  top: 0,
                  bottom: 0
                }}
              ></div>

              {/* Timeline Events */}
              <div className="space-y-12 sm:space-y-16">
                {schedule.events.map((event, index) => {
                  // Parse time
                  const timeMatch = event.time.match(/^(.+?)\s*(AM|PM)/i)
                  const timeNumber = timeMatch ? timeMatch[1] : event.time.split(' ')[0]
                  const timePeriod = timeMatch ? timeMatch[2] : (event.time.includes('AM') ? 'AM' : event.time.includes('PM') ? 'PM' : '')
                  
                  return (
                    <div 
                      key={event.id} 
                      className={`timeline-item-${index} relative flex items-center gap-4`}
                    >
                      {/* Time on the left - Instrument Serif font */}
                      <div className="flex-1 text-right pr-4 relative">
                        <div 
                          className="timeline-time text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-instrument-serif font-semibold"
                          style={{ color: theme.colors.tertiary, fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                        >
                          {timeNumber} <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl" style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}>{timePeriod}</span>
                            </div>
                          </div>
                      
                      {/* Circle - Centered */}
                      <div 
                        className="timeline-dot absolute w-4 h-4 rounded-full border-2 z-10"
                          style={{ 
                            backgroundColor: theme.colors.primary,
                            borderColor: theme.colors.primary,
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                      ></div>
                      
                      {/* Description on the right - Poppins font */}
                      <div className="flex-1 pl-4">
                        <div 
                          className="timeline-description font-poppins"
                          style={{ color: theme.colors.primary, opacity: 0.8, fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}
                        >
                              {event.title}
                            </div>
                          </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
            
          {/* Closing Message Section */}
          <div className="flex items-center justify-center mt-16 sm:mt-20 px-4 sm:px-8">
            <div className="text-center">
                  <p 
                    className="text-xs sm:text-sm md:text-base font-poppins leading-relaxed"
                    style={{ color: theme.colors.primary, opacity: 0.9, fontSize: 'clamp(0.75rem, 1vw, 1rem)' }}
                  >
                    We look forward to celebrating this special milestone with you. Your presence will make this day even more meaningful.
                  </p>
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

export default Schedule 