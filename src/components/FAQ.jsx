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

  const toggleItem = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index))
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
        src="/images/graphics/flower-banner.png"
        alt=""
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 h-auto pointer-events-none z-[5]"
        style={{ width: '100vw', maxWidth: 'none' }}
      />
      <img
        src="/images/graphics/flower-banner.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 h-auto pointer-events-none z-[5]"
        style={{ width: '100vw', maxWidth: 'none', transform: 'translateX(-50%) rotate(180deg)' }}
      />
      <div ref={faqRef} className="relative z-10 w-full px-8 sm:px-12 md:px-8 lg:px-16 py-12">
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
              const headingId = `faq-heading-${index}`
              const panelId = `faq-panel-${index}`
              return (
                <div key={index} className="faq-item">
                  <h3 className="faq-item-heading">
                    <button
                      type="button"
                      id={headingId}
                      className="faq-question-trigger faq-question font-poppins text-base text-left font-semibold sm:text-lg"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleItem(index)}
                    >
                      <span className="faq-question-label font-poppins">Q: {text}</span>
                      <FiChevronDown className={`faq-chevron shrink-0 ${isOpen ? 'faq-chevron--open' : ''}`} aria-hidden />
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headingId}
                    className={`faq-answer-panel ${isOpen ? 'faq-answer-panel--open' : ''}`}
                  >
                    <div className="faq-answer-panel-inner">
                      <div className="faq-answer-body text-sm sm:text-base pb-1">
                        <span className="font-semibold">A: </span>
                        <span dangerouslySetInnerHTML={{ __html: item.answer }} />
                      </div>
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
