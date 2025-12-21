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

    // Timeline line expansion from top to bottom
    tl.fromTo(lineRef.current, 
      { scaleY: 0, transformOrigin: "top" },
      { scaleY: 1, duration: 1.5, ease: "power2.out" },
      "-=0.4"
    )

    // Events animate in with stagger
    if (timelineRef.current) {
      tl.fromTo(timelineRef.current.children, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: "power2.out",
          stagger: 0.2
        },
        "-=1.0"
    )
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
    <section
      ref={sectionRef}
      className="relative pt-20 w-full overflow-hidden"
      style={{ backgroundColor: '#f5f1eb' }}
    >
      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div ref={headerRef} className="text-center mb-12">
            {/* Tennis Ball Icon */}
            <div className="flex justify-center mb-4">
              <img 
                src="/assets/images/graphics/tennis-ball.png" 
                alt="Tennis ball" 
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              />
            </div>
            
            {/* SERVING text - smooth circular arch downward */}
            <div 
              className="text-xs sm:text-sm uppercase mb-2 font-poppins"
              style={{ 
                color: theme.colors.primary, 
                letterSpacing: '0.05em',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {'SERVING'.split('').map((letter, index) => {
                const totalLetters = 7
                const centerIndex = (totalLetters - 1) / 2
                const offset = index - centerIndex
                
                // Circular arch parameters
                const radius = 30 // Radius of the circle (adjust for arch depth)
                const maxAngle = Math.PI / 5 // 36 degrees total arc (adjust for arch width)
                const angle = (offset / centerIndex) * maxAngle
                
                // Calculate position on circle
                const x = radius * Math.sin(angle)
                const y = radius * (1 - Math.cos(angle)) // Downward arch
                const rotation = (angle * 180) / Math.PI // Convert to degrees
                
                return (
                  <span
                    key={index}
                    style={{
                      display: 'inline-block',
                      fontFamily: "'Poppins', sans-serif",
                      position: 'relative',
                      transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
                      transformOrigin: 'center bottom',
                      marginRight: '-0.1em'
                    }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </span>
                )
              })}
            </div>
            
            {/* THE TIMELINE with sparkles */}
            <div className="flex items-center justify-center gap-3 mb-2" style={{ marginTop: '2rem' }}>
              <img 
                src="/assets/images/graphics/sparkle.png" 
                alt="Sparkle" 
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                style={{ alignSelf: 'center' }}
              />
              <h2 
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-tebranos"
                style={{ 
                  color: theme.colors.primary,
                  fontWeight: 900,
                  lineHeight: '1'
                }}
              >
                THE TIMELINE
            </h2>
              <img 
                src="/assets/images/graphics/sparkle.png" 
                alt="Sparkle" 
                className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                style={{ alignSelf: 'center' }}
              />
            </div>
            
            {/* Unfolds in Ballet font */}
            <h3 
              className="text-5xl sm:text-6xl md:text-7xl font-ballet"
              style={{ color: theme.colors.primary, marginTop: '-1rem' }}
            >
              Unfolds
            </h3>
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
                  opacity: 0.3,
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
                      className="relative flex items-center gap-4"
                    >
                      {/* Time on the left - Instrument Serif font */}
                      <div className="flex-1 text-right pr-4 relative">
                        <div 
                          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-instrument-serif font-semibold"
                          style={{ color: theme.colors.primary }}
                        >
                          {timeNumber} <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{timePeriod}</span>
                            </div>
                          </div>
                      
                      {/* Circle - Centered */}
                      <div 
                        className="absolute w-4 h-4 rounded-full border-2 z-10"
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
                          className="font-poppins"
                          style={{ color: theme.colors.primary, opacity: 0.8, fontSize: '1rem' }}
                        >
                              {event.title}
                            </div>
                          </div>
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* Wine Glass and Closing Message Section */}
            <div className="flex items-center justify-between mt-16 sm:mt-20 px-4 sm:px-8">
              {/* Wine Glass Graphic on the left */}
              <div className="flex-shrink-0">
                <img 
                  src="/assets/images/graphics/wine-glass.png" 
                  alt="Wine glass" 
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                  style={{ color: theme.colors.primary }}
                />
              </div>
              
              {/* Closing Message on the right */}
              <div className="flex-1 text-left pl-8">
                <p 
                  className="text-xs sm:text-sm md:text-base font-poppins leading-relaxed"
                  style={{ color: theme.colors.primary, opacity: 0.9 }}
                >
                  We look forward to celebrating this special milestone with you. Your presence will make this day even more meaningful.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Prenup Image - Full Viewport Width */}
        <div 
          className="mt-16 sm:mt-20"
          style={{ 
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            marginRight: 'calc(-50vw + 50%)'
          }}
        >
          <img 
            src="/assets/images/prenup/prenup-1.jpg" 
            alt="Prenup" 
            className="w-full h-auto object-cover"
            style={{ maxHeight: '600px', display: 'block' }}
          />
        </div>
      </div>
    </section>
  )
}

export default Schedule 