import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'
import { theme } from '../data'
import { faq } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const sectionRef = useRef(null)
  const accordionRef = useRef(null)

  const { faqData } = faq

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

    // Section title animation - slide up
    tl.fromTo(".faq-title", 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )

    // Accordion items animation with stagger - slide up with delays
    tl.fromTo(accordionRef.current.children, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out",
        stagger: 0.15
      },
      "-=0.4"
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#f0ede6', paddingTop: '4rem' }}
    >
      
      {/* Content */}
      <div className={`relative z-20 ${theme.container.maxWidth} ${theme.container.center}`}>
        {/* Section Title */}
        <div className="text-center mb-16 faq-title" style={{ padding: '0 2rem' }}>
          {/* FREQUENTLY */}
          <h2 
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-tebranos mb-2"
            style={{ 
              color: theme.colors.primary,
              fontWeight: 900,
              lineHeight: '1'
            }}
          >
            FREQUENTLY
          </h2>
          
          {/* ASKED in Ballet font with sparkles */}
          <div className="flex items-center justify-center gap-3 mb-2" style={{ marginTop: '-1rem' }}>
            <img 
              src="/assets/images/graphics/sparkle.png" 
              alt="Sparkle" 
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              style={{ alignSelf: 'center' }}
            />
            <h3 
              className="text-5xl sm:text-6xl md:text-7xl font-ballet"
              style={{ 
                color: theme.colors.primary, 
                lineHeight: '1'
              }}
            >
              Asked
            </h3>
            <img 
              src="/assets/images/graphics/sparkle.png" 
              alt="Sparkle" 
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              style={{ alignSelf: 'center' }}
            />
          </div>
          
          {/* QUESTIONS in Tebranos font */}
          <h3 
            className="text-5xl sm:text-6xl md:text-7xl font-tebranos"
            style={{ 
              color: theme.colors.primary, 
              marginTop: '-1rem',
              fontWeight: 900,
              lineHeight: '1'
            }}
          >
            QUESTIONS
          </h3>
        </div>
        
        {/* FAQ Accordion */}
        <div ref={accordionRef} className="w-full lg:max-w-4xl lg:mx-auto space-y-0">
          {faqData.map((faq, index) => {
            // Pattern: primary, secondary, tertiary, secondary, primary, secondary, tertiary, secondary, repeat
            const patternIndex = index % 4
            let bgColor, textColor
            if (patternIndex === 0) {
              // primary
              bgColor = theme.colors.primary
              textColor = '#f5f1eb'
            } else if (patternIndex === 1) {
              // secondary
              bgColor = '#f0ede6'
              textColor = theme.colors.primary
            } else if (patternIndex === 2) {
              // tertiary
              bgColor = theme.colors.tertiary
              textColor = '#f5f1eb'
            } else {
              // secondary (patternIndex === 3)
              bgColor = '#f0ede6'
              textColor = theme.colors.primary
            }
            
            return (
              <div
                key={index}
                className="overflow-hidden transition-all duration-300 w-full"
                style={{ backgroundColor: bgColor }}
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between transition-colors duration-200"
                  style={{ 
                    backgroundColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (openIndex !== index) {
                      if (patternIndex === 0 || patternIndex === 2) {
                        // primary or tertiary - use light overlay
                        e.currentTarget.style.backgroundColor = 'rgba(245, 241, 235, 0.1)'
                      } else {
                        // secondary - use primary overlay
                        e.currentTarget.style.backgroundColor = 'rgba(6, 81, 67, 0.1)'
                      }
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (openIndex !== index) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  <h3 className={`font-poppins pr-4`} style={{ color: textColor, fontSize: '1rem' }}>
                    {faq.question}
                  </h3>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-300`}
                    style={{
                      transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      color: textColor
                    }}
                  />
                </button>
                
                {/* Answer Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pt-4 pb-4">
                    <p 
                      className="font-poppins leading-relaxed" 
                      style={{ color: textColor, fontSize: '1rem' }}
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
    </>
  )
}

export default FAQ 