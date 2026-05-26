import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { theme } from '../data'
import { schedule, celebrant } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Schedule = () => {
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)
  const lineRef = useRef(null)
  const headerRef = useRef(null)

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

    // Cleanup function
    return () => {
      tl.kill()
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
    <section
      ref={sectionRef}
      className="relative w-full pt-32 md:pt-56 pb-32 md:pb-48 overflow-hidden"
      style={{ backgroundColor: '#E1F4F3' }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-right bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/graphics/palace-3.png)',
          opacity: 0.3
        }}
        aria-hidden="true"
      />
      <img
        src="/images/graphics/flower-banner.png"
        alt=""
        aria-hidden="true"
        className="intro-flower-banner absolute top-0 left-1/2 -translate-x-1/2 h-auto pointer-events-none z-10"
        style={{ width: '100vw', maxWidth: 'none' }}
      />
      <img
        src="/images/graphics/flower-banner.png"
        alt=""
        aria-hidden="true"
        className="schedule-flower-banner-bottom absolute bottom-0 left-1/2 -translate-x-1/2 rotate-180 h-auto pointer-events-none z-10"
        style={{ width: '100vw', maxWidth: 'none' }}
      />
      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
          <div className="w-full max-w-3xl mx-auto pt-16 pb-8 lg:pt-16 lg:pb-16 lg:flex lg:flex-col">
              {/* Header Section */}
              <div ref={headerRef} className="mb-12 flex justify-center">
                <h2 className="section-title-graphic section-title-graphic--center mb-4 text-center">
                  <span className="section-title-graphic-inner section-title-graphic-inner--line font-beautyofthebeast capitalize">
                    The schedule
                  </span>
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
                          style={{ color: '#0a3F3D', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                        >
                          {timeNumber} <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl" style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}>{timePeriod}</span>
                            </div>
                          </div>
                      
                      {/* Circle - Centered */}
                      <div
                        className="timeline-dot absolute z-10 h-4 w-4 rounded-full border-2"
                        style={{
                          backgroundColor: theme.colors.primary,
                          borderColor: '#1F8A86',
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                      />
                      
                      {/* Description on the right - Poppins font */}
                      <div className="flex-1 pl-4">
                        <div 
                          className="timeline-description font-poppins"
                          style={{ color: '#0a3F3D', opacity: 0.9, fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}
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
                    style={{ color: '#0a3F3D', opacity: 0.9, fontSize: 'clamp(0.75rem, 1vw, 1rem)' }}
                  >
                    Looking forward to celebrating this special milestone with you. Your presence will make this day even more meaningful.
                  </p>
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