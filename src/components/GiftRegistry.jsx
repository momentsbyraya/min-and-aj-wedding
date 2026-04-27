import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Gift } from 'lucide-react'
import { theme } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const GiftRegistry = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const giftsRef = useRef(null)
  const randPct = (min, max) => `${Math.floor(Math.random() * (max - min + 1)) + min}%`

  useEffect(() => {
    // Scroll-triggered slide-up animation
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

    // Animate description
    if (descriptionRef.current) {
      tl.fromTo(descriptionRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      )
    }

    // Animate gift items with stagger
    if (giftsRef.current) {
      tl.fromTo(giftsRef.current.children,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: "power2.out",
          stagger: 0.2
        },
        "-=0.4"
      )
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  const gifts = [
    { name: 'Perfume', image: '/images/graphics/perfume.png' },
    { name: 'Books', image: '/images/graphics/books.png' },
    { name: 'Accessories', image: '/images/graphics/accessory.png' },
    { name: 'Money', image: '/images/graphics/money.png' }
  ]

  return (
    <section ref={sectionRef} className="relative py-20 w-full overflow-hidden">
      <div className="soft-blob soft-blob--alt z-0" style={{ width: '120px', height: '100px', top: randPct(8, 22), left: randPct(66, 84) }} />
      <div className="soft-blob soft-blob--small z-0" style={{ width: '94px', height: '80px', top: randPct(66, 84), left: randPct(6, 20) }} />
      {/* Abstract Background - Same as Counter with rotation/zoom */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: 'url(/images/graphics/abstract-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'rotate(180deg) scale(1.2)',
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center py-12">
        <div className="max-w-md sm:max-w-xl lg:max-w-3xl w-full mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl font-antsvalley mb-6" style={{ color: '#4b2259' }}>
              Gift Suggestions
            </h2>
            <p ref={descriptionRef} className="max-w-3xl mx-auto mb-8 font-poppins" style={{ fontSize: '1rem', color: '#B76E79' }}>
              Your presence is the greatest gift, but if you'd like to give something special, 
              I would appreciate:
            </p>
          </div>

          {/* Gift Preferences Grid - 2x2 */}
          <div ref={giftsRef} className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {gifts.map((gift, index) => (
              <div 
                key={index}
                className="p-4 sm:p-6 text-center"
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mb-4 flex items-center justify-center">
                    <img 
                      src={gift.image} 
                      alt={gift.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-antsvalley" style={{ color: '#4b2259' }}>
                    {gift.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GiftRegistry 