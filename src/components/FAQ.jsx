import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiChevronDown } from 'react-icons/fi'
import { faq as faqData } from '../data'
import './FAQ.css'

gsap.registerPlugin(ScrollTrigger)

const getFaqIconAndText = (question) => {
  const emojiPattern = /^[📍🥂⏰🎨👥✉️👶🚗📸🎁❤️]\s*/
  const cleanText = question.replace(emojiPattern, '').trim()
  return { text: cleanText }
}

const FAQ = ({ id = 'faq' }) => {
  const faqRef = useRef(null)
  const faqTitleRef = useRef(null)
  const faqItems = faqData
  const scrollTriggerInstance = useRef(null)
  const [openIndex, setOpenIndex] = useState(null)

  const toggleAccordion = (index) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  useEffect(() => {
    if (!faqRef.current || !faqTitleRef.current) return

    gsap.set(faqTitleRef.current, { opacity: 0, y: 30 })

    scrollTriggerInstance.current = ScrollTrigger.create({
      trigger: faqRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(faqTitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => {
            const faqItemsContainer = faqRef.current.querySelector('.faq-items-stack')
            if (faqItemsContainer) {
              const items = Array.from(faqItemsContainer.children).filter(
                (child) => child.classList.contains('faq-item')
              )
              if (items.length > 0) {
                gsap.set(items, { opacity: 0, y: 30 })
                gsap.to(items, {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  ease: 'power2.out',
                  stagger: 0.2
                })
              }
            }
          }
        })
      }
    })

    return () => {
      scrollTriggerInstance.current?.kill()
      scrollTriggerInstance.current = null
    }
  }, [])

  return (
    <div id={id} data-section="faq" className="relative z-20 faq-section">
      <img
        src="/images/graphics/fan%20flower%20-%201.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--fan absolute top-0 left-0 h-auto pointer-events-none z-[5]"
      />
      <img
        src="/images/graphics/lantern-1.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--lantern absolute top-0 right-0 h-auto pointer-events-none z-[5]"
      />
      <img
        src="/images/graphics/flower-left.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--flower-left absolute bottom-0 left-0 h-auto pointer-events-none z-[5]"
      />
      <img
        src="/images/graphics/flower-right.png"
        alt=""
        aria-hidden="true"
        className="intro-corner-accent intro-corner-accent--flower-right absolute bottom-0 right-0 h-auto pointer-events-none z-[5]"
      />
      <div ref={faqRef} className="relative z-10 w-full px-8 sm:px-12 md:px-8 lg:px-16 py-24 sm:py-32 md:py-40">
        <div className="mb-12 flex w-full justify-center px-6">
          <h2 ref={faqTitleRef} className="section-title-graphic section-title-graphic--center text-center">
            <span className="section-title-graphic-inner section-title-graphic-inner--line font-beautyofthebeast uppercase tracking-[0.12em]">
              FAQ
            </span>
          </h2>
        </div>
        {faqItems && faqItems.faqData && (
          <div className="faq-items-stack max-w-[600px] mx-auto">
            {faqItems.faqData.map((item, index) => {
              const { text } = getFaqIconAndText(item.question)
              const isOpen = openIndex === index
              const panelId = `faq-panel-${index}`
              const buttonId = `faq-trigger-${index}`
              return (
                <div key={index} className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
                  <h3 className="faq-question faq-item-heading font-poppins text-base font-semibold sm:text-lg">
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleAccordion(index)}
                      className="faq-question-button"
                    >
                      <span className="faq-question-label font-poppins">Q: {text}</span>
                      <FiChevronDown
                        className={`faq-question-chevron ${isOpen ? 'faq-question-chevron--open' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!isOpen}
                    className={`faq-answer-wrap ${isOpen ? 'faq-answer-wrap--open' : ''}`}
                  >
                    <div className="faq-answer-body text-sm sm:text-base pb-1">
                      <span className="font-semibold">A: </span>
                      <span dangerouslySetInnerHTML={{ __html: item.answer }} />
                    </div>
                  </div>
                  {index < faqItems.faqData.length - 1 && (
                    <div className="faq-item-divider" aria-hidden />
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default FAQ
