import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'
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
    <section
      ref={sectionRef}
      className="relative py-20 w-full overflow-hidden"
      style={{ backgroundColor: 'white' }}
    >
      {/* Rose Gold Purple Background - Flipped Vertically */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: 'url(/assets/images/graphics/rose-gold-pupr-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'scaleY(-1)',
          opacity: 0.3
        }}
      ></div>
      
      {/* Content */}
      <div className={`relative z-20 ${themeConfig.container.maxWidth} ${themeConfig.container.center} ${themeConfig.container.padding}`}>
        {/* Section Title */}
        <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-antsvalley mb-16 text-center faq-title`} style={{ color: '#4b2259' }}>
          Frequently Asked Questions
        </h2>
        
        {/* FAQ Accordion */}
        <div ref={accordionRef} className="max-w-md sm:max-w-xl lg:max-w-3xl mx-auto space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-300"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <h3 className={`font-poppins pr-4`} style={{ color: '#4b2259', fontSize: '1rem' }}>
                  {faq.question}
                </h3>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform duration-300`}
                  style={{
                    transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                    color: '#4b2259'
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
                  <p className="font-poppins leading-relaxed" style={{ color: '#B76E79', fontSize: '1rem' }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ 