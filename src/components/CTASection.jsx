import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Users } from 'lucide-react'
import RSVPModal from './RSVPModal'
import EntourageModal from './EntourageModal'
import { theme } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const CTASection = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const buttonRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEntourageModalOpen, setIsEntourageModalOpen] = useState(false)

  useEffect(() => {
    // Check if refs are available before animating
    if (!sectionRef.current) return

    // Scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Animate title
    if (titleRef.current) {
      tl.fromTo(titleRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
    }

    // Animate text
    if (textRef.current) {
      tl.fromTo(textRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
    }

    // Animate button
    if (buttonRef.current) {
      tl.fromTo(buttonRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const openRSVPModal = () => {
    setIsModalOpen(true)
  }

  const openEntourageModal = () => {
    setIsEntourageModalOpen(true)
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="relative py-20 w-full min-h-screen overflow-hidden"
        style={{ backgroundColor: 'white' }}
      >
        {/* Background - bg-2 */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: 'url(/assets/images/graphics/bg-2.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        {/* Butterflies Background on top - flipped */}
        <div 
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: 'url(/assets/images/graphics/butterflies-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.75,
            transform: 'scaleX(-1)'
          }}
        ></div>
        
        {/* Content */}
        <div className="relative z-20 flex items-end justify-start min-h-screen">
          <div className="px-8 pb-12" style={{ maxWidth: '85%' }}>
            {/* Header Section */}
            <div className="text-left">
              <h2 ref={titleRef} className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-antsvalley mb-6" style={{ color: '#4b2259' }}>
                respond
              </h2>
              <p ref={textRef} className="font-poppins max-w-lg mr-auto mb-6" style={{ color: '#B76E79', fontSize: '1rem' }}>
                Please let us know if you'll <br /> be joining us.
              </p>

              {/* RSVP Button */}
              <div ref={buttonRef} className="text-left">
                <button
                  onClick={openRSVPModal}
                  className="inline-flex items-center justify-center space-x-3 py-3 sm:py-5 lg:py-2 transition-all duration-200 text-sm sm:text-2xl lg:text-base font-medium rsvp-button"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.3)', 
                    borderRadius: '25px', 
                    color: '#1e3a5f',
                    border: '1px solid #4b2259',
                    paddingLeft: '2rem',
                    paddingRight: '2rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#8b5cf6'
                    e.currentTarget.style.color = 'white'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                    e.currentTarget.style.color = '#1e3a5f'
                  }}
                >
                  <span>RSVP</span>
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Modal */}
      <RSVPModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Entourage Modal */}
      <EntourageModal 
        isOpen={isEntourageModalOpen} 
        onClose={() => setIsEntourageModalOpen(false)} 
      />
    </>
  )
}

export default CTASection 