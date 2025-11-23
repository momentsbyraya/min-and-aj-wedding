import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Entourage = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

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

    // Section title animation
    tl.fromTo(".entourage-title", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    )

    // Content animation with stagger
    tl.fromTo(contentRef.current.children, 
      { opacity: 0, y: 50 },
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

  const entourageImages = [
    "/assets/images/entourage/1.png",
    "/assets/images/entourage/2.png", 
    "/assets/images/entourage/3.png",
    "/assets/images/entourage/4.png",
    "/assets/images/entourage/5.png",
    "/assets/images/entourage/6.png"
  ]

  return (
    <section
      ref={sectionRef}
      className={`py-20 ${themeConfig.backgrounds.primary}`}
    >
        <div className="max-w-md sm:max-w-xl lg:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div ref={contentRef} className="text-center mb-20">
          <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-script ${themeConfig.text.theme} mb-6 entourage-title`}>
            Entourage
          </h2>
          <p className={`text-xl sm:text-2xl ${themeConfig.text.secondary} max-w-3xl mx-auto`}>
            Honoring those who will stand with us on our special day
          </p>
        </div>

        {/* Entourage Images Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {entourageImages.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={image} 
                  alt={`Entourage member ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Entourage 