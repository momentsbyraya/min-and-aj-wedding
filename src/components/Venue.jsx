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
      
      // Large screens: slide from right
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(imageRef.current,
          { opacity: 0, x: 100 },
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

  const venueData = venuesData.venue

  return (
    <>
      <style>{`
        .venue-bg-texture::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url(/assets/images/graphics/bg-textured.png);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.85;
          z-index: 0;
        }
        @media (max-width: 1023px) {
          .venue-image-mobile {
            margin-left: calc(-1rem - 2rem) !important;
            margin-right: calc(-1rem - 2rem) !important;
            width: calc(100% + 6rem) !important;
            min-height: 600px !important;
          }
        }
      `}</style>
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden pl-8 pr-8 lg:pl-0 lg:pr-0 venue-bg-texture"
      style={{ 
        backgroundColor: theme.colors.primary
      }}
    >
      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
          {/* Flex Container - Side by side on lg screens */}
          <div className="flex flex-col lg:flex-row lg:items-stretch lg:gap-8 lg:min-h-full">
            {/* Left Side - Text Content (50% on lg) */}
            <div className="w-full lg:w-1/2 lg:pl-8 lg:pr-8 pt-16 pb-8 lg:pt-16 lg:pb-16 lg:flex lg:flex-col">
              {/* Header Section */}
              <div ref={headerRef} className="text-center mb-12">
                {/* The in Ballet font */}
                <h1
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-ballet mb-2"
                  style={{ color: '#f5f1eb', fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}
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
                    marginTop: '-0.4em',
                    fontSize: 'clamp(3rem, 8vw, 8rem)'
                  }}
                >
                  VENUE
                </h2>

                {/* Location icon below title with words on both sides */}
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span
                    className="text-2xl sm:text-3xl md:text-4xl font-ballet capitalize"
                    style={{ color: '#f5f1eb', fontSize: 'clamp(1.5rem, 3vw, 1.75rem)' }}
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
                    style={{ color: '#f5f1eb', fontSize: 'clamp(1.5rem, 3vw, 1.75rem)' }}
                  >
                    Celebrate
                  </span>
                </div>
              </div>
                
              {/* Venue Details Section */}
              <div className="venue-subsection mb-12 text-center">
                <h3
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-tebranos mb-4"
                  style={{ color: '#f5f1eb', fontSize: 'clamp(1.875rem, 4vw, 2.625rem)' }}
                >
                  {venueData.name}
                </h3>
                <p
                  className="font-poppins mb-4 max-w-2xl mx-auto"
                  style={{ color: '#f5f1eb', fontSize: 'clamp(0.875rem, 1.2vw, 0.75rem)' }}
                >
                  {venueData.address && `${venueData.address}`}
                  {venueData.city && `, ${venueData.city}`}
                  {venueData.zip && `, ${venueData.zip}`}
                  {venueData.state && ` ${venueData.state}`}
                </p>
                {venueData.main && venueData.main.time && (
                  <p
                    className="font-poppins mb-6 max-w-2xl mx-auto"
                    style={{ color: '#f5f1eb', fontSize: 'clamp(0.875rem, 1.2vw, 1rem)', opacity: 0.8 }}
                  >
                    {venueData.main.time}
                  </p>
                )}
                {venueData.main && venueData.main.details && (
                  <p
                    className="font-poppins mb-6 max-w-2xl mx-auto"
                    style={{ color: '#f5f1eb', fontSize: 'clamp(0.8rem, 1vw, 0.65rem)', opacity: 0.7 }}
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

            {/* Right Side - Image (50% on lg) */}
            <div className="w-full lg:w-1/2 lg:mt-0 mt-8 h-96 lg:h-auto lg:flex-1 overflow-hidden flex venue-image-mobile">
              <img 
                ref={imageRef}
                src="/assets/images/prenup/prenup4.jpg" 
                alt="Venue" 
                className="w-full h-full object-cover flex-1"
                style={{ 
                  display: 'block',
                  minHeight: '100%',
                  objectFit: 'cover',
                  objectPosition: 'left center'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Venue
