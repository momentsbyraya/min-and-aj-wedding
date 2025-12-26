import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { theme } from '../data'
import RSVPModal from './RSVPModal'
import GiftModal from './GiftModal'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const DetailsSection = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const forYourRef = useRef(null)
  const informationRef = useRef(null)
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false)
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)

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

              {/* TOURNAMENT ENTRY */}
              <h2
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-tebranos mb-4"
                style={{
                  color: theme.colors.primary,
                  fontWeight: 900,
                  lineHeight: '1',
                  marginTop: '-0.4em',
                  fontSize: 'clamp(2.75rem, 7.5vw, 7rem)'
                }}
              >
                TOURNAMENT ENTRY
              </h2>

              {/* Wine glass below title with words on both sides */}
              <div className="flex items-center justify-center gap-3 mb-2">
                <span
                  ref={forYourRef}
                  className="text-2xl sm:text-3xl md:text-4xl font-ballet capitalize"
                  style={{ color: theme.colors.primary }}
                >
                  Get
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
                  Set
                </span>
              </div>
            </div>

            {/* Sections Container - Grid on lg screens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16">
            {/* RSVP Section */}
            <div className="details-subsection mb-12 lg:mb-0 text-center">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-tebranos mb-4 uppercase"
                style={{ color: theme.colors.primary }}
              >
                Game On!
              </h2>
              <p
                className="font-poppins mb-6 max-w-2xl mx-auto"
                style={{ color: theme.colors.primary, fontSize: '1rem' }}
              >
                Please confirm your participation in the upcoming match by <strong className="font-poppins" style={{ fontFamily: "'Poppins', sans-serif" }}>January 8, 2026</strong>. We look forward to seeing you on center court.
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
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </button>
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
                The best part of celebrating this milestone is having you there! If you'd like to give a gift, feel free to choose from my registry or add to my Future Fund instead. I appreciate the support as I "turn pro" and head into adulthood!
              </p>
              {/* Gift Buttons */}
              <div className="flex flex-col gap-4 justify-center items-center">
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
                  <span className="font-poppins" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 'normal' }}>Send Funds</span>
                  <img
                    src="/assets/images/graphics/tennis.png"
                    alt="Tennis"
                    className="w-5 h-5 object-contain transition-all duration-200"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </button>
                <a
                  href="https://www.myregistry.com/giftlist/IraAces18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-poppins underline transition-all duration-200 hover:opacity-80"
                  style={{ 
                    color: theme.colors.tertiary,
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '1rem',
                    textDecoration: 'underline'
                  }}
                >
                  View My Gift Registry
                </a>
              </div>
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

