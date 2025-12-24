import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { theme } from '../data'
import { dresscode } from '../data'
import RSVPModal from './RSVPModal'
import GiftModal from './GiftModal'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const DetailsSection = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const forYourRef = useRef(null)
  const informationRef = useRef(null)
  const colorSwatchesRef = useRef(null)
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false)
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)
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

    // Animate header
    if (headerRef.current) {
      tl.fromTo(headerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
    }

    // Animate "For Your" from left
    if (forYourRef.current) {
      tl.fromTo(forYourRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
    }

    // Animate "Information" from right
    if (informationRef.current) {
      tl.fromTo(informationRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
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

    // Animate sections with stagger
    tl.fromTo(".details-subsection",
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

  const openRSVPModal = () => {
    setIsRSVPModalOpen(true)
  }

  const openGiftModal = () => {
    setIsGiftModalOpen(true)
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: '#f5f1eb', padding: '4rem 2rem' }}
      >
        {/* Content */}
        <div className="relative z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div ref={headerRef} className="text-center mb-12">
              {/* The in Ballet font */}
              <h1
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-ballet mb-2"
                style={{ color: theme.colors.primary }}
              >
                The
              </h1>

              {/* DETAILS */}
              <h2
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-tebranos mb-4"
                style={{
                  color: theme.colors.primary,
                  fontWeight: 900,
                  lineHeight: '1',
                  marginTop: '-0.4em'
                }}
              >
                DETAILS
              </h2>

              {/* Wine glass below title with words on both sides */}
              <div className="flex items-center justify-center gap-3 mb-2">
                <span
                  ref={forYourRef}
                  className="text-2xl sm:text-3xl md:text-4xl font-ballet capitalize"
                  style={{ color: theme.colors.primary }}
                >
                  For Your
                </span>
                <img
                  src="/assets/images/graphics/wine-glass.png"
                  alt="Wine glass"
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain"
                />
                <span
                  ref={informationRef}
                  className="text-2xl sm:text-3xl md:text-4xl font-ballet capitalize"
                  style={{ color: theme.colors.primary }}
                >
                  Information
                </span>
              </div>
            </div>

            {/* Sections Container - Grid on lg screens */}
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-16">
            {/* RSVP Section */}
            <div className="details-subsection mb-12 lg:mb-0 text-center">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-tebranos mb-4 uppercase"
                style={{ color: theme.colors.primary }}
              >
                RSVP
              </h2>
              <p
                className="font-poppins mb-6 max-w-2xl mx-auto"
                style={{ color: theme.colors.primary, fontSize: '1rem' }}
              >
                Please let us know if you'll be joining us. Your presence means the world to us.
              </p>
              <button
                onClick={openRSVPModal}
                className="inline-flex items-center justify-center space-x-3 py-3 px-8 transition-all duration-200 text-base font-medium font-poppins"
                style={{
                  backgroundColor: theme.colors.tertiary,
                  borderRadius: 0,
                  color: '#f5f1eb',
                  border: `0.5px solid ${theme.colors.primary}`,
                  outline: `0.5px solid #f5f1eb`,
                  outlineOffset: '-5px',
                  fontFamily: "'Poppins', sans-serif",
                  font: "normal normal 400 1rem 'Poppins', sans-serif"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.colors.tertiary
                  e.currentTarget.style.opacity = '0.9'
                  e.currentTarget.style.color = '#f5f1eb'
                  const img = e.currentTarget.querySelector('img')
                  if (img) {
                    img.style.filter = 'brightness(0) invert(1)'
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme.colors.tertiary
                  e.currentTarget.style.opacity = '1'
                  e.currentTarget.style.color = '#f5f1eb'
                  const img = e.currentTarget.querySelector('img')
                  if (img) {
                    img.style.filter = 'brightness(0) invert(1)'
                  }
                }}
              >
                <span className="font-poppins" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 'normal' }}>RSVP</span>
                <img
                  src="/assets/images/graphics/tennis.png"
                  alt="Tennis"
                  className="w-5 h-5 object-contain transition-all duration-200"
                />
              </button>
            </div>

            {/* Dress Code Section */}
            <div className="details-subsection mb-12 lg:mb-0 text-center">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-tebranos mb-4 uppercase"
                style={{ color: theme.colors.primary }}
              >
                DRESSCODE
              </h2>
              <p
                className="font-poppins mb-6 max-w-2xl mx-auto"
                style={{ fontSize: '1rem', fontFamily: 'Poppins, sans-serif' }}
              >
                {dresscode.mainDressCode.description.split('Strictly NO Pink and Red').map((part, index, array) => {
                  if (index === 0) {
                    return <span key={index} className="font-poppins" style={{ color: theme.colors.primary, fontFamily: 'Poppins, sans-serif' }}>{part}</span>;
                  }
                  return (
                    <React.Fragment key={index}>
                      <br className="lg:hidden" />
                      <span className="font-poppins block lg:inline" style={{ color: 'red', fontFamily: 'Poppins, sans-serif' }}>Strictly NO Pink and Red</span>
                      {part && <span className="font-poppins" style={{ color: theme.colors.primary, fontFamily: 'Poppins, sans-serif' }}>{part}</span>}
                    </React.Fragment>
                  );
                })}
              </p>
              {/* Color Swatches and Image Side by Side */}
              <div className="flex items-center justify-center gap-8 max-w-2xl mx-auto">
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
                          borderColor: theme.colors.primary
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
            </div>

            {/* Gift Registry Section */}
            <div className="details-subsection text-center">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-tebranos mb-4 uppercase whitespace-nowrap"
                style={{ color: theme.colors.primary }}
              >
                GIFT REGISTRY
              </h2>
              <p
                className="font-poppins mb-6 max-w-2xl mx-auto"
                style={{ color: theme.colors.primary, fontSize: '1rem' }}
              >
                Your presence is our present, but we would appreciate monetary gift.
              </p>
              {/* Gift Button */}
              <button
                onClick={openGiftModal}
                className="inline-flex items-center justify-center space-x-3 py-3 px-8 transition-all duration-200 text-base font-medium font-poppins"
                style={{
                  backgroundColor: theme.colors.tertiary,
                  borderRadius: 0,
                  color: '#f5f1eb',
                  border: `0.5px solid ${theme.colors.primary}`,
                  outline: `0.5px solid #f5f1eb`,
                  outlineOffset: '-5px',
                  fontFamily: "'Poppins', sans-serif",
                  font: "normal normal 400 1rem 'Poppins', sans-serif"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.colors.tertiary
                  e.currentTarget.style.opacity = '0.9'
                  e.currentTarget.style.color = '#f5f1eb'
                  const img = e.currentTarget.querySelector('img')
                  if (img) {
                    img.style.filter = 'brightness(0) invert(1)'
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme.colors.tertiary
                  e.currentTarget.style.opacity = '1'
                  e.currentTarget.style.color = '#f5f1eb'
                  const img = e.currentTarget.querySelector('img')
                  if (img) {
                    img.style.filter = 'brightness(0) invert(1)'
                  }
                }}
              >
                <span className="font-poppins" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 'normal' }}>Send Gift</span>
                <img
                  src="/assets/images/graphics/tennis.png"
                  alt="Tennis"
                  className="w-5 h-5 object-contain transition-all duration-200"
                />
              </button>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Modal */}
      <RSVPModal
        isOpen={isRSVPModalOpen}
        onClose={() => setIsRSVPModalOpen(false)}
      />

      {/* Gift Modal */}
      <GiftModal
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
      />
    </>
  )
}

export default DetailsSection

