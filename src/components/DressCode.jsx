import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { theme } from '../data'
import { dresscode } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const DressCode = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const femaleSectionRef = useRef(null)
  const maleSectionRef = useRef(null)
  const image1Ref = useRef(null)
  const image2Ref = useRef(null)

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

    // Animate female section
    if (femaleSectionRef.current) {
      tl.fromTo(femaleSectionRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
    }

    // Slide animation for first image from left
    if (image1Ref.current) {
      tl.fromTo(image1Ref.current, 
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      )
    }

    // Animate male section
    if (maleSectionRef.current) {
      tl.fromTo(maleSectionRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      )
    }

    // Slide animation for second image from right
    if (image2Ref.current) {
      tl.fromTo(image2Ref.current, 
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      )
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 w-full overflow-hidden"
      style={{ backgroundColor: 'white' }}
    >
      {/* Rose Gold Purple Background - Flipped Vertically and Zoomed */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: 'url(/assets/images/graphics/rose-gold-pupr-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'scaleY(-1) scale(1.2)',
          opacity: 0.3
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center py-12">
        <div className="max-w-md sm:max-w-xl lg:max-w-3xl xl:max-w-6xl w-full mx-auto px-4">
            {/* Header Section */}
            <div ref={headerRef} className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-antsvalley mb-6" style={{ color: '#4b2259' }}>
                Dress Code
              </h2>
              <p className="font-poppins leading-tight max-w-2xl mx-auto mb-8" style={{ color: '#B76E79', fontSize: '1rem' }}>
                {dresscode.mainDressCode.description}
              </p>
            </div>

            {/* Female Attendees Section */}
            <div ref={femaleSectionRef} className="mb-12 sm:mb-16">
              <h3 className="text-xl sm:text-2xl md:text-2xl caudex-regular mb-1 text-center uppercase" style={{ color: '#4b2259' }}>
                Female Attendees
              </h3>
              <p className="font-poppins leading-relaxed max-w-2xl mx-auto text-center" style={{ color: '#B76E79', fontSize: '1rem' }}>
                Semi-Formal Smashin' Chic Outfit
              </p>
              <div className="flex justify-center">
                <div className="w-full max-w-[280px] aspect-[3/4] overflow-hidden">
                  <img 
                    ref={image1Ref}
                    src="/assets/images/dresscode/girls.png" 
                    alt="Female dress code" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Male Attendees Section */}
            <div ref={maleSectionRef}>
              <h3 className="text-xl sm:text-2xl md:text-2xl caudex-regular mb-1 text-center uppercase" style={{ color: '#4b2259' }}>
                Male Attendees
              </h3>
              <p className="font-poppins leading-relaxed max-w-2xl mx-auto text-center" style={{ color: '#B76E79', fontSize: '1rem' }}>
                Semi-Formal Smashin' Chic Outfit
              </p>
              <div className="flex justify-center">
                <div className="w-full max-w-[280px] aspect-[3/4] overflow-hidden">
                  <img 
                    ref={image2Ref}
                    src="/assets/images/dresscode/boys.png" 
                    alt="Male dress code" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default DressCode 