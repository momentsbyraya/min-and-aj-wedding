import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Navigation } from 'lucide-react'
import { theme } from '../data'
import { venues as venuesData, dresscode } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Venue = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const imageRef = useRef(null)
  const colorSwatchesRef = useRef(null)
  const mapRef = useRef(null)
  const whereToBeRef = useRef(null)
  const venueDetailsRef = useRef(null)
  const dressCodeHeadingRef = useRef(null)
  const dressCodeContentRef = useRef(null)
  const [hoveredColorIndex, setHoveredColorIndex] = useState(null)
  const [clickedColorIndex, setClickedColorIndex] = useState(null)

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

    // Animate header - slide down
    if (headerRef.current) {
      tl.fromTo(headerRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
    }

    // Animate map - slide up
    if (mapRef.current) {
      tl.fromTo(mapRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.3"
      )
    }

    // Animate "WHERE TO BE" - slide from left
    if (whereToBeRef.current) {
      tl.fromTo(whereToBeRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate venue details - slide from right
    if (venueDetailsRef.current) {
      tl.fromTo(venueDetailsRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate dress code heading - slide from left
    if (dressCodeHeadingRef.current) {
      tl.fromTo(dressCodeHeadingRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate dress code content - slide from right
    if (dressCodeContentRef.current) {
      tl.fromTo(dressCodeContentRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate color swatches one after another starting from top
    tl.fromTo(".color-swatch-item",
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        stagger: 0.15
      },
      "-=0.4"
    )

    // Image animation - slide from right (sequential)
    if (imageRef.current) {
      tl.fromTo(imageRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.2"
      )
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
        @media (min-width: 1024px) {
          .venue-image-mobile {
            height: 600px !important;
          }
        }
      `}</style>
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden pl-8 pr-8 lg:pl-0 lg:pr-0 lg:pb-16 venue-bg-texture"
      style={{ 
        backgroundColor: theme.colors.primary
      }}
    >
      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
          {/* Flex Container - Stacked on lg screens */}
          <div className="flex flex-col">
            {/* Text Content */}
            <div className="w-full lg:pl-8 lg:pr-8 pt-16 pb-8 lg:pt-16 lg:pb-8 lg:flex lg:flex-col">
              {/* Header Section */}
              <div ref={headerRef} className="text-center mb-12">
                {/* The in Ballet font */}
                <h1
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-ballet mb-2"
                  style={{ color: '#f5f1eb', fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}
                >
                  The
                </h1>

                {/* GAME PLAN */}
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
                  GAME PLAN
                </h2>

                {/* Embedded Google Map - Hidden on lg screens and above */}
                <div ref={mapRef} className="mb-12 w-full max-w-2xl mx-auto lg:hidden" style={{ aspectRatio: '1 / 1', maxWidth: '400px', maxHeight: '400px' }}>
                  <iframe 
                    src={venueData.googleMapsEmbedUrl} 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Venue Location"
                  ></iframe>
                </div>
              </div>
                
              {/* WHERE TO BE and What to Wear Container - Flex row on lg screens */}
              <div className="flex flex-col lg:flex-row lg:gap-8 lg:items-start">
                {/* Group 1: WHERE TO BE Section with Venue Details */}
                <div className="venue-subsection mb-8 lg:mb-0 text-center lg:flex-1">
                  {/* WHERE TO BE */}
                  <h2
                    ref={whereToBeRef}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-tebranos mb-4"
                    style={{
                      color: '#f5f1eb',
                      fontWeight: 900,
                      lineHeight: '1',
                      fontSize: 'clamp(2.5rem, 7vw, 5rem)'
                    }}
                  >
                    WHERE TO BE
                  </h2>
                  
                  {/* Embedded Google Map - Visible on lg screens and above */}
                  <div className="hidden lg:block mb-8 mx-auto" style={{ width: '250px', height: '250px' }}>
                    <iframe 
                      src={venueData.googleMapsEmbedUrl} 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Venue Location"
                    ></iframe>
                  </div>
                  
                  {/* Venue Details Section */}
                  <div ref={venueDetailsRef} className="text-center">
                <h3
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-tebranos"
                  style={{ color: '#f5f1eb', fontSize: 'clamp(1.875rem, 4vw, 2.625rem)' }}
                >
                  {venueData.name}
                </h3>
                <p
                  className="font-poppins mb-4 max-w-2xl mx-auto"
                  style={{ color: '#f5f1eb', fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}
                >
                  Multi-Purpose Hall
                </p>
                <p
                  className="font-poppins max-w-2xl mx-auto"
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

                {/* Group 2: Dress Code Section */}
                <div className="venue-subsection mb-12 lg:mb-0 text-center mt-12 lg:mt-0 lg:flex-1">
                <h2
                  ref={dressCodeHeadingRef}
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-tebranos mb-4 uppercase"
                  style={{ color: '#f5f1eb', fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
                >
                  What to Wear
                </h2>
                {/* Description - Visible on mobile, hidden on lg screens */}
                <p
                  className="font-poppins mb-6 lg:hidden max-w-2xl mx-auto"
                  style={{ fontSize: '1rem', fontFamily: 'Poppins, sans-serif', color: '#f5f1eb' }}
                >
                  {dresscode.mainDressCode.description.split('Strictly NO Pink and Red').map((part, index, array) => {
                    if (index === 0) {
                      return <span key={index} className="font-poppins" style={{ color: '#f5f1eb', fontFamily: 'Poppins, sans-serif' }}>{part}</span>;
                    }
                    return (
                      <React.Fragment key={index}>
                        <br className="lg:hidden" />
                        <span className="font-poppins block lg:inline" style={{ color: '#f5f1eb', fontFamily: 'Poppins, sans-serif' }}>Strictly NO Pink and Red</span>
                        {part && <span className="font-poppins" style={{ color: '#f5f1eb', fontFamily: 'Poppins, sans-serif' }}>{part}</span>}
                      </React.Fragment>
                    );
                  })}
                </p>
                {/* Color Swatches and Image Side by Side */}
                <div ref={dressCodeContentRef} className="flex items-center justify-center gap-8 max-w-2xl mx-auto">
                  {/* Dresscode Image */}
                  <div className="flex justify-center">
                    <img 
                      src="/assets/images/dresscode/dresscode.png" 
                      alt="Dress Code" 
                      className="max-w-full h-auto object-contain"
                      style={{ maxWidth: '200px' }}
                    />
                  </div>
                  {/* Color Swatches - Vertical with Overlap */}
                  <div ref={colorSwatchesRef} className="flex flex-col overflow-visible">
                    {dresscode.colorPalette.map((color, index) => (
                      <div
                        key={index}
                        className="color-swatch-item relative flex flex-col items-center"
                        style={{
                          marginTop: index === 0 ? 0 : '-0.75rem',
                          zIndex: dresscode.colorPalette.length - index
                        }}
                        onMouseEnter={() => setHoveredColorIndex(index)}
                        onMouseLeave={() => setHoveredColorIndex(null)}
                        onClick={() => setClickedColorIndex(clickedColorIndex === index ? null : index)}
                      >
                        <div
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 cursor-pointer transition-transform duration-200 hover:scale-110"
                          style={{
                            backgroundColor: color.hex,
                            borderColor: theme.colors.tertiary
                          }}
                        ></div>
                        {/* Tooltip */}
                        {(hoveredColorIndex === index || clickedColorIndex === index) && (
                          <div
                            className="absolute right-full mr-2 px-3 py-1 rounded bg-gray-800 text-white text-xs font-poppins whitespace-nowrap z-10 pointer-events-none"
                            style={{
                              backgroundColor: theme.colors.primary,
                              color: '#f5f1eb'
                            }}
                          >
                            {color.label}
                            <div
                              className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent"
                              style={{
                                borderLeftColor: theme.colors.primary
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Description - Hidden on mobile, visible on lg screens and above */}
                <p
                  className="hidden lg:block font-poppins mb-6 mt-6 max-w-2xl mx-auto"
                  style={{ fontSize: '1rem', fontFamily: 'Poppins, sans-serif', color: '#f5f1eb' }}
                >
                  {dresscode.mainDressCode.description.split('Strictly NO Pink and Red').map((part, index, array) => {
                    if (index === 0) {
                      return <span key={index} className="font-poppins" style={{ color: '#f5f1eb', fontFamily: 'Poppins, sans-serif' }}>{part}</span>;
                    }
                    return (
                      <React.Fragment key={index}>
                        <span className="font-poppins" style={{ color: '#f5f1eb', fontFamily: 'Poppins, sans-serif' }}>Strictly NO Pink and Red</span>
                        {part && <span className="font-poppins" style={{ color: '#f5f1eb', fontFamily: 'Poppins, sans-serif' }}>{part}</span>}
                      </React.Fragment>
                    );
                  })}
                </p>
                </div>
              </div>
            </div>

            {/* Image - Block under text on lg screens */}
            <div className="w-full mt-8 lg:mt-0 h-96 overflow-hidden venue-image-mobile">
              <img 
                ref={imageRef}
                src="/assets/images/prenup/prenup4.jpg" 
                alt="Venue" 
                className="w-full h-full object-cover"
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
