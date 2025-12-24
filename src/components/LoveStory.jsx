import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { celebrant } from '../data'
import PhotoSection from './PhotoSection'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const LoveStory = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const imageContainerRef = useRef(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [
    '/assets/images/prenup/prenup1.jpg',
    '/assets/images/prenup/prenup3.jpg',
    '/assets/images/prenup/prenup5.jpg'
  ]

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

    // Image container animation - responsive
    if (imageContainerRef.current) {
      const mm = gsap.matchMedia()
      
      // Mobile: fade in
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(imageContainerRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })
      
      // Large screens: slide from right
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(imageContainerRef.current,
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Image carousel with fade transition
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 5000) // Change image every 5 seconds (matching Hero section)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <>
      <style>{`
        @media (max-width: 1023px) {
          .lovestory-image-mobile {
            margin-left: calc(-1rem - 2rem) !important;
            margin-right: calc(-1rem - 2rem) !important;
            width: calc(100% + 6rem) !important;
            min-height: 600px !important;
          }
        }
      `}</style>
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden pl-8 pr-8 lg:pl-0 lg:pr-0"
      style={{ 
        backgroundColor: '#065143'
      }}
    >
      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
          {/* Flex Container - Side by side on lg screens */}
          <div className="flex flex-col lg:flex-row lg:items-stretch lg:gap-8 lg:min-h-full">
            {/* Left Side - Text Content (50% on lg) */}
            <div ref={contentRef} className="w-full lg:w-1/2 lg:pl-8 lg:pr-8 pt-16 pb-8 lg:pt-16 lg:pb-16 lg:flex lg:flex-col text-center">
              {/* Welcome */}
              <h1 
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-ballet mb-2"
                style={{ color: '#f5f1eb', fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}
              >
                The Story
              </h1>
              
              {/* AND */}
              <p 
                className="text-4xl sm:text-base uppercase mb-2 font-tebranos"
                style={{ color: '#f5f1eb', letterSpacing: '0.1em', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}
              >
                OF OUR 
              </p>
              
              {/* Thank you */}
              <h2 
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-ballet mb-8"
                style={{ color: '#f5f1eb', fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}
              >
                Celebrant
              </h2>
              
              {/* Paragraphs */}
              <div className="space-y-6 mb-8">
                <p 
                  className="text-base sm:text-lg md:text-xl font-poppins leading-relaxed max-w-2xl mx-auto"
                  style={{ color: '#f5f1eb', fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}
                >
                  Amanda Ira is a well-rounded individual who excels both academically, in music, and in sports. She plays the violin and has been part of the San Beda Junior Symphony Orchestra since she was 8 years old. A born leader, she has been part of the student council, and she loves tennis, wishing she could play every day if she could.
                </p>
                
                <p 
                  className="text-base sm:text-lg md:text-xl font-poppins leading-relaxed max-w-2xl mx-auto"
                  style={{ color: '#f5f1eb', fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}
                >
                  She is also a Philippine team mathlete and loves math as it helps her de-stress. In all that she does, she is focused and puts so much passion into everything. She is a perfectionist and was consistently top 1 during her high school years.
                </p>
                
                <p 
                  className="text-base sm:text-lg md:text-xl font-poppins leading-relaxed max-w-2xl mx-auto"
                  style={{ color: '#f5f1eb', fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}
                >
                  As a daughter, she is loving, very responsible, and thoughtful. We are incredibly proud of the person she has become and excited to celebrate this milestone with all of you.
                </p>
              </div>
              
              {/* WITH LOVE */}
              <p 
                className="text-2xl sm:text-sm uppercase tracking-widest mb-4 font-tebranos"
                style={{ color: '#f5f1eb', letterSpacing: '0.1em', fontSize: 'clamp(0.75rem, 1.5vw, 1rem)' }}
              >
                AGAIN,
              </p>
              
              {/* Name */}
              <p 
                className="text-4xl sm:text-5xl md:text-6xl -mt-4 font-ballet"
                style={{ color: '#f5f1eb', fontSize: 'clamp(2rem, 5vw, 3rem)' }}
              >
                Amanda Iris
              </p>
            </div>

            {/* Right Side - Image Carousel (50% on lg) */}
            <div ref={imageContainerRef} className="w-full lg:w-1/2 lg:mt-0 mt-8 h-96 lg:h-auto lg:flex-1 overflow-hidden flex relative lovestory-image-mobile">
              {/* Image Carousel with fade transition */}
              <div 
                className="absolute inset-0"
                style={{
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center center',
                      backgroundRepeat: 'no-repeat',
                      opacity: index === currentImageIndex ? 1 : 0,
                      transition: 'opacity 1.5s ease-in-out',
                      zIndex: 0
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default LoveStory
