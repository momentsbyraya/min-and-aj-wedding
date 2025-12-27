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
    <>
      <style>{`
        .counter-stripes {
          --stripe-unit: clamp(15px, 2.5vw, 40px);
          background: repeating-linear-gradient(
            90deg,
            ${theme.colors.primary} 0,
            ${theme.colors.primary} var(--stripe-unit),
            #f0ede6 var(--stripe-unit),
            #f0ede6 calc(var(--stripe-unit) * 2),
            ${theme.colors.tertiary} calc(var(--stripe-unit) * 2),
            ${theme.colors.tertiary} calc(var(--stripe-unit) * 3),
            #f0ede6 calc(var(--stripe-unit) * 3),
            #f0ede6 calc(var(--stripe-unit) * 4),
            ${theme.colors.primary} calc(var(--stripe-unit) * 4),
            ${theme.colors.primary} calc(var(--stripe-unit) * 5),
            #f0ede6 calc(var(--stripe-unit) * 5),
            #f0ede6 calc(var(--stripe-unit) * 6),
            ${theme.colors.tertiary} calc(var(--stripe-unit) * 6),
            ${theme.colors.tertiary} calc(var(--stripe-unit) * 7),
            #f0ede6 calc(var(--stripe-unit) * 7),
            #f0ede6 calc(var(--stripe-unit) * 8)
          );
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .timer-graphics-section {
            margin-top: -1.5rem !important;
          }
        }
        @media (min-width: 1024px) {
          .timer-graphics-section {
            margin-top: -2rem !important;
          }
        }
        .timer-image {
          object-position: center 0% !important;
          margin-top: -2rem !important;
        }
        @media (min-width: 768px) {
          .timer-image {
            margin-top: -3rem !important;
          }
        }
        @media (min-width: 1024px) {
          .timer-image {
            margin-top: -5rem !important;
            object-position: center top !important;
          }
          .counter-section {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          .counter-inner-container {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
            max-width: 400px !important;
          }
        }
      `}</style>
    <section
      ref={sectionRef}
      id="details"
      className="relative overflow-hidden flex items-stretch justify-center text-center counter-stripes counter-section"
      style={{
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
           className="w-full max-w-4xl mx-auto px-8 sm:px-12 py-8 flex flex-col justify-center counter-inner-container"
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
              <div className="font-tebranos" style={{ color: theme.colors.primary, marginBottom: '-0.4em', fontSize: 'clamp(4rem, 10vw, 10rem)' }}>
                SAVE
              </div>
              <div className="font-ballet" style={{ color: theme.colors.primary, marginTop: 0, marginBottom: 0, fontSize: 'clamp(4rem, 10vw, 10rem)' }}>
                the
              </div>
              <div className="font-tebranos" style={{ color: theme.colors.primary, marginTop: '-0.4em', fontSize: 'clamp(4rem, 10vw, 10rem)' }}>
                DATE
              </div>
            </h3>
          </div>

          {/* Timer Graphics Section */}
          <div className="timer-graphics-section flex justify-center items-center mb-6 mt-6">
            {/* Month on the left */}
            <div className="font-poppins" style={{ color: theme.colors.primary, fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}>
              {new Date(celebrant.debutant.debut.date).getMonth() + 1 < 10 ? `0${new Date(celebrant.debutant.debut.date).getMonth() + 1}` : new Date(celebrant.debutant.debut.date).getMonth() + 1}
            </div>
            
            {/* Timer Graphics in the center */}
            <div className="mx-8" style={{ display: 'flex', alignItems: 'flex-start' }}>
              <img 
                src="/assets/images/graphics/timer.png" 
                alt="Timer" 
                className="timer-image w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain"
              />
            </div>
            
            {/* Year on the right */}
            <div className="font-poppins" style={{ color: theme.colors.primary, fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}>
              {'\'' + celebrant.debutant.debut.year.slice(-2)}
            </div>
          </div>

          {/* Little sentence in Poppins */}
          <p className="font-poppins text-center mb-6 uppercase" style={{ color: theme.colors.primary, fontSize: 'clamp(0.75rem, 1vw, 1rem)' }}>
            Join us as we celebrate this special milestone
          </p>
          
          {/* Counter */}
          <div className="flex justify-center items-center space-x-2 px-4 max-w-md mx-auto">
            <div className="text-center">
              <div className="font-instrument-serif font-semibold mb-1 countdown-number" style={{ color: theme.colors.primary, fontSize: 'clamp(3rem, 7vw, 5rem)' }}>
                {countdown.days}
              </div>
              <div className="font-medium font-poppins" style={{ color: theme.colors.primary, fontSize: 'clamp(0.75rem, 1vw, 0.875rem)' }}>Days</div>
            </div>
            
            <div className="font-instrument-serif font-semibold" style={{ color: theme.colors.primary, fontSize: 'clamp(2rem, 5vw, 4rem)' }}>:</div>
            
            <div className="text-center">
              <div className="font-instrument-serif font-semibold mb-1 countdown-number" style={{ color: theme.colors.primary, fontSize: 'clamp(3rem, 7vw, 5rem)' }}>
                {countdown.hours}
              </div>
              <div className="font-medium font-poppins" style={{ color: theme.colors.primary, fontSize: 'clamp(0.75rem, 1vw, 0.875rem)' }}>Hours</div>
            </div>
            
            <div className="font-instrument-serif font-semibold" style={{ color: theme.colors.primary, fontSize: 'clamp(2rem, 5vw, 4rem)' }}>:</div>
            
            <div className="text-center">
              <div className="font-instrument-serif font-semibold mb-1 countdown-number" style={{ color: theme.colors.primary, fontSize: 'clamp(3rem, 7vw, 5rem)' }}>
                {countdown.minutes}
              </div>
              <div className="font-medium font-poppins" style={{ color: theme.colors.primary, fontSize: 'clamp(0.75rem, 1vw, 0.875rem)' }}>Minutes</div>
            </div>
            
            <div className="font-instrument-serif font-semibold" style={{ color: theme.colors.primary, fontSize: 'clamp(2rem, 5vw, 4rem)' }}>:</div>
            
            <div className="text-center">
              <div className="font-instrument-serif font-semibold mb-1 countdown-number" style={{ color: theme.colors.primary, fontSize: 'clamp(3rem, 7vw, 5rem)' }}>
                {countdown.seconds}
              </div>
              <div className="font-medium font-poppins" style={{ color: theme.colors.primary, fontSize: 'clamp(0.75rem, 1vw, 0.875rem)' }}>Seconds</div>
            </div>
          </div>
        </div>
    </div>
    </section>
    </>
  )
}

export default Counter 