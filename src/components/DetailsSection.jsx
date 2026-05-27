import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { theme } from '../data'
import RSVPModal from './RSVPModal'
import GiftModal from './GiftModal'
import './DetailsSection.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const DetailsSection = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const forYourRef = useRef(null)
  const informationRef = useRef(null)
  const wineGlassRef = useRef(null)
  const rsvpHeadingRef = useRef(null)
  const rsvpTextRef = useRef(null)
  const rsvpButtonRef = useRef(null)
  const giftHeadingRef = useRef(null)
  const giftTextRef = useRef(null)
  const giftButtonRef = useRef(null)
  const giftLinkRef = useRef(null)
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

    // Animate header - slide down
    if (headerRef.current) {
      tl.fromTo(headerRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
    }

    // Animate wine glass - scale up
    if (wineGlassRef.current) {
      tl.fromTo(wineGlassRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.3"
      )
    }

    // Animate "Get" from left
    if (forYourRef.current) {
      tl.fromTo(forYourRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate "Set" from right
    if (informationRef.current) {
      tl.fromTo(informationRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.5"
      )
    }

    // Animate RSVP heading - slide from left
    if (rsvpHeadingRef.current) {
      tl.fromTo(rsvpHeadingRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate RSVP text - slide from right
    if (rsvpTextRef.current) {
      tl.fromTo(rsvpTextRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate RSVP button - slide up
    if (rsvpButtonRef.current) {
      tl.fromTo(rsvpButtonRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate Gift Registry heading - slide from right
    if (giftHeadingRef.current) {
      tl.fromTo(giftHeadingRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate Gift Registry text - slide from left
    if (giftTextRef.current) {
      tl.fromTo(giftTextRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate Gift Registry button - slide up
    if (giftButtonRef.current) {
      tl.fromTo(giftButtonRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate Gift Registry link - slide up
    if (giftLinkRef.current) {
      tl.fromTo(giftLinkRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      )
    }

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
        className="details-section relative w-full overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #fdf2f7 0%, #f5c4da 100%)' }}
      >
        {/* Content */}
        <div className="relative z-10">
          <div className="details-content-wrapper max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header Section */}
            <div ref={headerRef} className="details-header-section text-center mb-12">
              {/* The in Ballet font */}
              <h1
                className="details-title text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-my-soul mb-2"
              >
                The
              </h1>

              {/* TOURNAMENT ENTRY */}
              <h2
                className="details-tournament-entry text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-rozha mb-4"
              >
                TOURNAMENT ENTRY
              </h2>

              {/* Wine glass below title with words on both sides */}
              <div className="wine-glass-container flex items-center justify-center gap-3 mb-2">
                <span
                  ref={forYourRef}
                  className="details-text-primary text-2xl sm:text-3xl md:text-4xl font-my-soul capitalize"
                >
                  Get
                </span>
                <img
                  ref={wineGlassRef}
                  src="/images/graphics/wine-glass.png"
                  alt="Wine glass"
                  className="details-wine-glass-image wine-glass-image w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-auto object-contain"
                />
                <span
                  ref={informationRef}
                  className="details-text-primary text-2xl sm:text-3xl md:text-4xl font-my-soul capitalize"
                >
                  Set
                </span>
              </div>
            </div>

            {/* Sections Container - Grid on lg screens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16">
            {/* RSVP Section */}
            <div className="details-subsection mb-12 lg:mb-0 text-center bg-[#fdf2f7]/85 border border-[#c1084f] p-6">
              <h2
                ref={rsvpHeadingRef}
                className="details-rsvp-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-rozha mb-4 uppercase"
              >
                Game On!
              </h2>
              <p
                ref={rsvpTextRef}
                className="details-text-primary font-rozha mb-6 max-w-2xl mx-auto"
              >
                Please confirm your participation in the upcoming match by <strong className="details-strong-text font-poppins">June 10, 2026</strong>. We look forward to seeing you on center court.
              </p>
              <button
                ref={rsvpButtonRef}
                onClick={openRSVPModal}
                className="details-button inline-flex items-center justify-center space-x-3 py-3 px-8 transition-all duration-200 text-base font-medium font-poppins"
                style={{
                  backgroundColor: theme.colors.tertiary,
                  border: `0.5px solid ${theme.colors.primary}`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.colors.tertiary
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme.colors.tertiary
                }}
              >
                <span className="details-button-text font-poppins">RSVP</span>
                <img
                  src="/images/graphics/tennis.png"
                  alt="Tennis"
                  className="details-button-icon w-5 h-5 object-contain transition-all duration-200"
                />
              </button>
            </div>

            {/* Gift Registry Section */}
            <div className="details-subsection text-center bg-[#fdf2f7]/85 border border-[#c1084f] p-6">
              <h2
                ref={giftHeadingRef}
                className="details-gift-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-rozha mb-4 uppercase whitespace-nowrap"
              >
                GIFT REGISTRY
              </h2>
              <p
                ref={giftTextRef}
                className="details-text-primary font-rozha mb-6 max-w-2xl mx-auto"
              >
                The best part of celebrating this milestone is having you there! If you'd like to give a gift, feel free to choose from my registry or add to my Future Fund instead. I appreciate the support as I "turn pro" and head into adulthood!
              </p>
              {/* Gift Buttons */}
              <div className="flex flex-col gap-4 justify-center items-center">
                <button
                  ref={giftButtonRef}
                  onClick={openGiftModal}
                  className="details-button inline-flex items-center justify-center space-x-3 py-3 px-8 transition-all duration-200 text-base font-medium font-poppins"
                  style={{
                    backgroundColor: theme.colors.tertiary,
                    border: `0.5px solid ${theme.colors.primary}`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.colors.tertiary
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = theme.colors.tertiary
                  }}
                >
                  <span className="details-button-text font-poppins">Send Funds</span>
                  <img
                    src="/images/graphics/tennis.png"
                    alt="Tennis"
                    className="details-button-icon w-5 h-5 object-contain transition-all duration-200"
                  />
                </button>
                <a
                  ref={giftLinkRef}
                  href="https://www.myregistry.com/giftlist/IraAces18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="details-button inline-flex items-center justify-center space-x-3 py-3 px-8 transition-all duration-200 text-base font-medium font-poppins"
                  style={{
                    backgroundColor: theme.colors.tertiary,
                    border: `0.5px solid ${theme.colors.primary}`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.colors.tertiary
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = theme.colors.tertiary
                  }}
                >
                  <span className="details-button-text font-poppins">View My Gift Registry</span>
                  <img
                    src="/images/graphics/tennis.png"
                    alt="Tennis"
                    className="details-button-icon w-5 h-5 object-contain transition-all duration-200"
                  />
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

