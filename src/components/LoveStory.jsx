import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { celebrant } from '../data'
import PhotoSection from './PhotoSection'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const LoveStory = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

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

    // Fade in animation for content
    if (contentRef.current) {
      tl.fromTo(contentRef.current,
        { 
          opacity: 0, 
          y: 30 
        },
        { 
          opacity: 1, 
          y: 0, 
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
      className="relative pt-20 w-full min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: '#065143', paddingTop: '4rem', paddingLeft: '2rem', paddingRight: '2rem' }}
    >
      {/* Content Group */}
      <div ref={contentRef} className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Welcome */}
        <h1 
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-ballet mb-2"
          style={{ color: '#f5f1eb' }}
        >
          The Story
        </h1>
        
        {/* AND */}
        <p 
          className="text-4xl sm:text-base uppercase mb-2 font-tebranos"
          style={{ color: '#f5f1eb', letterSpacing: '0.1em' }}
        >
          OF OUR 
        </p>
        
        {/* Thank you */}
        <h2 
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-ballet mb-8"
          style={{ color: '#f5f1eb' }}
        >
          Celebrant
        </h2>
        
        {/* Paragraphs */}
        <div className="space-y-6 mb-8">
          <p 
            className="text-base sm:text-lg md:text-xl font-poppins leading-relaxed"
            style={{ color: '#f5f1eb' }}
          >
            Amanda Ira is a well-rounded individual who excels both academically, in music, and in sports. She plays the violin and has been part of the San Beda Junior Symphony Orchestra since she was 8 years old. A born leader, she has been part of the student council, and she loves tennis, wishing she could play every day if she could.
          </p>
          
          <p 
            className="text-base sm:text-lg md:text-xl font-poppins leading-relaxed"
            style={{ color: '#f5f1eb' }}
          >
            She is also a Philippine team mathlete and loves math as it helps her de-stress. In all that she does, she is focused and puts so much passion into everything. She is a perfectionist and was consistently top 1 during her high school years.
          </p>
          
          <p 
            className="text-base sm:text-lg md:text-xl font-poppins leading-relaxed"
            style={{ color: '#f5f1eb' }}
          >
            As a daughter, she is loving, very responsible, and thoughtful. We are incredibly proud of the person she has become and excited to celebrate this milestone with all of you.
          </p>
        </div>
        
        {/* WITH LOVE */}
        <p 
          className="text-2xl sm:text-sm uppercase tracking-widest mb-4 font-tebranos"
          style={{ color: '#f5f1eb', letterSpacing: '0.1em' }}
        >
          AGAIN,
        </p>
        
        {/* Name */}
        <p 
          className="text-4xl sm:text-5xl md:text-6xl -mt-4 font-ballet"
          style={{ color: '#f5f1eb' }}
        >
          Amanda Iris
        </p>
      </div>

      {/* Prenup Image - Full Viewport Width */}
      <div 
        className="mt-16 sm:mt-20"
        style={{ 
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)'
        }}
      >
        <PhotoSection 
          imagePath="/assets/images/prenup/prenup2.jpg"
          title=""
          subtitle=""
          inline={true}
        />
      </div>
    </section>
  )
}

export default LoveStory
