import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calendar, Clock } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'
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
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })


    // Countdown container animation
    tl.fromTo(countdownRef.current, 
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" },
      "-=0.3"
    )

    // Countdown numbers stagger animation
    tl.fromTo(".countdown-number", 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out",
        stagger: 0.2
      },
      "-=0.5"
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
      className="relative min-h-screen md:min-h-0 md:h-fit lg:pt-40 lg:pb-24 overflow-hidden flex items-center justify-center text-center py-20"
    >
      {/* Abstract Background */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: 'url(/assets/images/graphics/abstract-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      {/* Main Content Container */}
      <div className={`relative z-20 ${themeConfig.container.maxWidth} ${themeConfig.container.center} ${themeConfig.container.padding} w-full`}>
        {/* Countdown Timer */}
        <div
          ref={countdownRef}
          className="mb-12 max-w-sm sm:max-w-lg lg:max-w-2xl mx-auto px-8 sm:px-12 "
        >
          <div className="flex justify-center mb-4">
            <h3 className={`flex flex-col scale-75 sm:scale-90 md:scale-75 lg:scale-100 origin-center sm:origin-center md:origin-center lg:origin-center`}>
              <div className={`text-7xl sm:text-8xl md:text-9xl lg:text-8xl font-antsvalley text-left`} style={{ marginLeft: '-5vw', color: '#4b2259' }}>Save</div>
              <div className={`flex items-center justify-center gap-2 text-center`} style={{ marginRight: '-3vw' }}>
                <span className={`text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-antsvalley self-start pt-2 sm:pt-3 md:pt-4 lg:pt-3`} style={{ color: '#4b2259' }}>the</span>
                <span className={`text-7xl sm:text-8xl md:text-9xl lg:text-8xl font-antsvalley`} style={{ color: '#4b2259' }}>Date</span>
              </div>
            </h3>
          </div>
          
          <div className="flex justify-center items-center space-x-2 mb-6 px-4 max-w-md mx-auto">
            <div className="text-center">
              <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-albert font-thin mb-1 countdown-number`} style={{ color: '#4b2259' }}>
                {countdown.days}
              </div>
              <div className="text-xs sm:text-sm font-medium" style={{ color: '#4b2259' }}>Days</div>
            </div>
            
            <div className={`text-2xl sm:text-3xl md:text-4xl font-albert font-thin`} style={{ color: '#4b2259' }}>:</div>
            
            <div className="text-center">
              <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-albert font-thin mb-1 countdown-number`} style={{ color: '#4b2259' }}>
                {countdown.hours}
              </div>
              <div className="text-xs sm:text-sm font-medium" style={{ color: '#4b2259' }}>Hours</div>
            </div>
            
            <div className={`text-2xl sm:text-3xl md:text-4xl font-albert font-thin`} style={{ color: '#4b2259' }}>:</div>
            
            <div className="text-center">
              <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-albert font-thin mb-1 countdown-number`} style={{ color: '#4b2259' }}>
                {countdown.minutes}
              </div>
              <div className="text-xs sm:text-sm font-medium" style={{ color: '#4b2259' }}>Minutes</div>
            </div>
            
            <div className={`text-2xl sm:text-3xl md:text-4xl font-albert font-thin`} style={{ color: '#4b2259' }}>:</div>
            
            <div className="text-center">
              <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-albert font-thin mb-1 countdown-number`} style={{ color: '#4b2259' }}>
                {countdown.seconds}
              </div>
              <div className="text-xs sm:text-sm font-medium" style={{ color: '#4b2259' }}>Seconds</div>
            </div>
          </div>
        </div>
    </div>
    </section>
  )
}

export default Counter 