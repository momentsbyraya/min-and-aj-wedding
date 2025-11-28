import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const LoveStory = () => {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

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

    // Slide-in animation for text from the right with delay
    if (textRef.current) {
      tl.fromTo(textRef.current,
        { 
          opacity: 0, 
          x: 100 
        },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1, 
          ease: "power2.out" 
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 w-full min-h-screen"
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
      
      {/* Butterflies Background on top */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: 'url(/assets/images/graphics/butterflies-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.75
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-20 flex items-end justify-end min-h-screen">
        <div className="px-8 pb-12" style={{ maxWidth: '85%' }}>
          {/* Header Section */}
          <div className="text-right">
            
            <p ref={textRef} className="font-poppins leading-relaxed max-w-lg ml-auto" style={{ color: '#4b2259', fontSize: '16px' }}>
              She blossomed from a sweet young girl into a <span className="font-bestlight" style={{ fontSize: '28px', marginLeft: '10px' }}>confident</span> <span className="font-poppins" style={{ fontSize: '16px' }}>young woman</span>. Now stepping into adulthood, she carries big dreams and a bright future, making everyone proud of the person she's become.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoveStory 