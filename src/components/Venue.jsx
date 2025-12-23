import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Navigation } from 'lucide-react'
import { theme } from '../data'
import { venues as venuesData } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Venue = () => {
  const sectionRef = useRef(null)
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
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
    }

    // Animate sections with stagger
    tl.fromTo(".venue-subsection",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.2
      },
      "-=0.4"
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const venueData = venuesData.venue

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden pb-0 sm:pb-8"
      style={{ backgroundColor: theme.colors.primary, paddingTop: '4rem', paddingLeft: '2rem', paddingRight: '2rem' }}
    >
      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div ref={headerRef} className="text-center mb-12">
            {/* The in Ballet font */}
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-ballet mb-2"
              style={{ color: '#f5f1eb' }}
            >
              The
            </h1>

            {/* VENUE */}
            <h2
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-tebranos mb-4"
              style={{
                color: '#f5f1eb',
                fontWeight: 900,
                lineHeight: '1',
                marginTop: '-0.4em'
              }}
            >
              VENUE
            </h2>

            {/* Location icon below title with words on both sides */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <span
                className="text-2xl sm:text-3xl md:text-4xl font-ballet capitalize"
                style={{ color: '#f5f1eb' }}
              >
                Where We
              </span>
              <img
                src="/assets/images/graphics/location.png"
                alt="Location"
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <span
                className="text-2xl sm:text-3xl md:text-4xl font-ballet capitalize"
                style={{ color: '#f5f1eb' }}
              >
                Celebrate
              </span>
            </div>
          </div>

          {/* Venue Details Section */}
          <div className="venue-subsection mb-12 text-center">
            <h3
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-tebranos mb-4"
              style={{ color: '#f5f1eb' }}
            >
              {venueData.name}
            </h3>
            <p
              className="font-poppins mb-4 max-w-2xl mx-auto"
              style={{ color: '#f5f1eb', fontSize: '1rem' }}
            >
              {venueData.address && `${venueData.address}`}
              {venueData.city && `, ${venueData.city}`}
              {venueData.zip && `, ${venueData.zip}`}
              {venueData.state && ` ${venueData.state}`}
            </p>
            {venueData.main && venueData.main.time && (
              <p
                className="font-poppins mb-6 max-w-2xl mx-auto"
                style={{ color: '#f5f1eb', fontSize: '1rem', opacity: 0.8 }}
              >
                {venueData.main.time}
              </p>
            )}
            {venueData.main && venueData.main.details && (
              <p
                className="font-poppins mb-6 max-w-2xl mx-auto"
                style={{ color: '#f5f1eb', fontSize: '0.9rem', opacity: 0.7 }}
              >
                {venueData.main.details}
              </p>
            )}
            
            {/* Directions Button */}
            <a
              href={venueData.googleMapsUrl || venueData.directionsUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-3 py-3 px-8 transition-all duration-200 text-base font-medium font-poppins"
              style={{
                backgroundColor: theme.colors.tertiary,
                borderRadius: 0,
                color: '#f5f1eb',
                border: `0.5px solid #f5f1eb`,
                outline: `0.5px solid #f5f1eb`,
                outlineOffset: '-5px',
                fontFamily: "'Poppins', sans-serif",
                font: "normal normal 400 1rem 'Poppins', sans-serif",
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.tertiary
                e.currentTarget.style.opacity = '0.9'
                e.currentTarget.style.color = '#f5f1eb'
                const icon = e.currentTarget.querySelector('svg')
                if (icon) {
                  icon.style.color = '#f5f1eb'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.tertiary
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.color = '#f5f1eb'
                const icon = e.currentTarget.querySelector('svg')
                if (icon) {
                  icon.style.color = '#f5f1eb'
                }
              }}
            >
              <span className="font-poppins" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 'normal' }}>Get Directions</span>
              <Navigation className="w-5 h-5 object-contain transition-all duration-200" style={{ color: '#f5f1eb' }} />
            </a>
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
          src="/assets/images/prenup/prenup1.jpg" 
          alt="Prenup" 
          className="w-full h-auto object-cover"
          style={{ maxHeight: '600px', display: 'block' }}
        />
      </div>
    </section>
  )
}

export default Venue
