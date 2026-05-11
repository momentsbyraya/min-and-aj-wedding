import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
                (child) => child.tagName === 'DIV'
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
      <div ref={faqRef} className="relative z-10 w-full px-8 sm:px-12 md:px-8 lg:px-16 py-12">
        <div className="mb-12 flex w-full justify-center px-6">
          <h2 ref={faqTitleRef} className="section-title-graphic section-title-graphic--center text-center">
            <span className="section-title-graphic-inner section-title-graphic-inner--line font-beautyofthebeast uppercase tracking-[0.12em]">
              FAQ
            </span>
          </h2>
        </div>
        {faqItems && faqItems.faqData && (
          <div className="faq-items-stack space-y-6 max-w-[600px] mx-auto">
            {faqItems.faqData.map((item, index) => {
              const { text } = getFaqIconAndText(item.question)
              return (
                <div key={index}>
                  <div className="mb-2">
                    <p className="faq-question mb-2 text-base font-poppins font-semibold text-[#6F2D36] sm:text-lg">
                      Q: {text}
                    </p>
                    <div className="faq-answer-body text-sm font-poppins font-normal sm:text-base">
                      <span className="font-semibold">A: </span>
                      <span dangerouslySetInnerHTML={{ __html: item.answer }} />
                    </div>
                  </div>
                  {index < faqItems.faqData.length - 1 && (
                    <div className="mt-6 h-px bg-[#6f2d36]/20" aria-hidden />
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
