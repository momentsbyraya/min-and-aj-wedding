import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calendar, Clock } from 'lucide-react'
import { theme } from '../data'
import { celebrant } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Counter = ({ countdown }) => {
  const sectionRef = useRef(null)
  const countdownRef = useRef(null)
  const dateTimeRef = useRef(null)

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


    // Countdown title animation
    tl.fromTo(".save-date-title", 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )

    // Countdown numbers stagger animation with delay
    tl.fromTo(".countdown-number", 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out",
        stagger: 0.15
      },
      "-=0.3"
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="details"
      className="relative overflow-hidden flex items-stretch justify-center text-center"
      style={{
        background: `repeating-linear-gradient(90deg, ${theme.colors.primary} 0px, ${theme.colors.primary} 20px, #f0ede6 20px, #f0ede6 40px, ${theme.colors.tertiary} 40px, ${theme.colors.tertiary} 60px, #f0ede6 60px, #f0ede6 80px, ${theme.colors.primary} 80px, ${theme.colors.primary} 100px, #f0ede6 100px, #f0ede6 120px, ${theme.colors.tertiary} 120px, ${theme.colors.tertiary} 140px, #f0ede6 140px, #f0ede6 160px)`,
        minHeight: '100vh',
        paddingTop: '5rem',
        paddingBottom: '5rem',
        paddingLeft: '1rem',
        paddingRight: '1rem'
      }}
    >
      
       {/* Main Content Container */}
       <div className={`relative z-20 w-full ${theme.container.padding} flex items-stretch`} style={{ minHeight: 'calc(100vh - 10rem)' }}>
         {/* Countdown Timer */}
         <div
           ref={countdownRef}
           className="w-full max-w-4xl mx-auto px-8 sm:px-12 py-8 flex flex-col justify-center"
           style={{
             backgroundColor: '#f0ede6',
             border: `0.5px solid ${theme.colors.primary}`,
             outline: `0.5px solid ${theme.colors.primary}`,
             outlineOffset: '-10px',
             borderRadius: 0,
             minHeight: '100%'
           }}
         >
          {/* Title Section */}
          <div className="flex justify-center">
            <h3 className="save-date-title flex flex-col items-center" style={{ lineHeight: '1', gap: 0 }}>
              <div className={`text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-tebranos`} style={{ color: theme.colors.primary, marginBottom: '-0.4em' }}>
                SAVE
              </div>
              <div className={`text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] font-ballet`} style={{ color: theme.colors.primary, marginTop: 0, marginBottom: 0 }}>
                the
              </div>
              <div className={`text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-tebranos`} style={{ color: theme.colors.primary, marginTop: '-0.4em' }}>
                DATE
              </div>
            </h3>
          </div>

          {/* Timer Graphics Section */}
          <div className="flex justify-center items-center mb-6 mt-6">
            {/* Month on the left */}
            <div className="text-lg sm:text-xl md:text-2xl font-poppins" style={{ color: theme.colors.primary }}>
              {new Date(celebrant.debutant.debut.date).getMonth() + 1 < 10 ? `0${new Date(celebrant.debutant.debut.date).getMonth() + 1}` : new Date(celebrant.debutant.debut.date).getMonth() + 1}
            </div>
            
            {/* Timer Graphics in the center */}
            <div className="mx-8">
              <img 
                src="/assets/images/graphics/timer.png" 
                alt="Timer" 
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain"
              />
            </div>
            
            {/* Year on the right */}
            <div className="text-lg sm:text-xl md:text-2xl font-poppins" style={{ color: theme.colors.primary }}>
              {'\'' + celebrant.debutant.debut.year.slice(-2)}
            </div>
          </div>

          {/* Little sentence in Poppins */}
          <p className="text-sm sm:text-base md:text-lg font-poppins text-center mb-6 uppercase" style={{ color: theme.colors.primary }}>
            Join us as we celebrate this special milestone
          </p>
          
          {/* Counter */}
          <div className="flex justify-center items-center space-x-2 px-4 max-w-md mx-auto">
            <div className="text-center">
              <div className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-instrument-serif font-semibold mb-1 countdown-number`} style={{ color: theme.colors.primary }}>
                {countdown.days}
              </div>
              <div className="text-xs sm:text-sm font-medium font-poppins" style={{ color: theme.colors.primary }}>Days</div>
            </div>
            
            <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-instrument-serif font-semibold`} style={{ color: theme.colors.primary }}>:</div>
            
            <div className="text-center">
              <div className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-instrument-serif font-semibold mb-1 countdown-number`} style={{ color: theme.colors.primary }}>
                {countdown.hours}
              </div>
              <div className="text-xs sm:text-sm font-medium font-poppins" style={{ color: theme.colors.primary }}>Hours</div>
            </div>
            
            <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-instrument-serif font-semibold`} style={{ color: theme.colors.primary }}>:</div>
            
            <div className="text-center">
              <div className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-instrument-serif font-semibold mb-1 countdown-number`} style={{ color: theme.colors.primary }}>
                {countdown.minutes}
              </div>
              <div className="text-xs sm:text-sm font-medium font-poppins" style={{ color: theme.colors.primary }}>Minutes</div>
            </div>
            
            <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-instrument-serif font-semibold`} style={{ color: theme.colors.primary }}>:</div>
            
            <div className="text-center">
              <div className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-instrument-serif font-semibold mb-1 countdown-number`} style={{ color: theme.colors.primary }}>
                {countdown.seconds}
              </div>
              <div className="text-xs sm:text-sm font-medium font-poppins" style={{ color: theme.colors.primary }}>Seconds</div>
            </div>
          </div>
        </div>
    </div>
    </section>
  )
}

export default Counter 