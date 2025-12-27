import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { theme } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Gallery = () => {
  const prenupImages = [
    '/assets/images/prenup/prenup1.jpg',
    '/assets/images/prenup/prenup2.jpg',
    '/assets/images/prenup/prenup3.jpg',
    '/assets/images/prenup/prenup4.jpg',
    '/assets/images/prenup/prenup5.jpg',
    '/assets/images/prenup/prenup6.jpg',
    '/assets/images/prenup/prenup7.jpg'
  ]

  const sectionRef = useRef(null)
  const scrollContainerRef = useRef(null)
  const cameraRef = useRef(null)
  const capturedTextRef = useRef(null)
  const sparkleLeftRef = useRef(null)
  const galleryHeadingRef = useRef(null)
  const sparkleRightRef = useRef(null)
  const momentsRef = useRef(null)
  const galleryImagesRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
    scrollContainerRef.current.style.cursor = 'grabbing'
    scrollContainerRef.current.style.userSelect = 'none'
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab'
      scrollContainerRef.current.style.userSelect = 'auto'
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab'
      scrollContainerRef.current.style.userSelect = 'auto'
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  // Touch events for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

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

    // Animate camera icon - scale up
    if (cameraRef.current) {
      tl.fromTo(cameraRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
      )
    }

    // Animate CAPTURED text - slide up
    if (capturedTextRef.current) {
      tl.fromTo(capturedTextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate left sparkle - scale and rotate
    if (sparkleLeftRef.current) {
      tl.fromTo(sparkleLeftRef.current,
        { opacity: 0, scale: 0, rotation: -180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.2"
      )
    }

    // Animate THE GALLERY heading - slide down
    if (galleryHeadingRef.current) {
      tl.fromTo(galleryHeadingRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      )
    }

    // Animate right sparkle - scale and rotate
    if (sparkleRightRef.current) {
      tl.fromTo(sparkleRightRef.current,
        { opacity: 0, scale: 0, rotation: 180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.6"
      )
    }

    // Animate Moments subtitle - slide up
    if (momentsRef.current) {
      tl.fromTo(momentsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate gallery images container - slide from right
    if (galleryImagesRef.current) {
      tl.fromTo(galleryImagesRef.current,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col"
      style={{ 
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      {/* Pseudo-element Background - Primary Color */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '60%',
          backgroundColor: theme.colors.primary,
          zIndex: 0
        }}
      />

      {/* Content Container */}
      <div 
        className="w-full flex flex-col relative z-10"
        style={{ 
          padding: '2rem 0'
        }}
      >
        {/* Title Section */}
        <div className="text-center mb-8">
          {/* Camera Icon */}
          <div className="flex justify-center mb-4">
            <img 
              ref={cameraRef}
              src="/assets/images/graphics/camera.png" 
              alt="Camera" 
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
          
          {/* CAPTURED text - smooth circular arch downward */}
          <div 
            ref={capturedTextRef}
            className="uppercase mb-2 font-poppins"
            style={{ 
              color: '#f5f1eb', 
              letterSpacing: '0.05em',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(0.75rem, 2vw, 0.875rem)'
            }}
          >
            {'CAPTURED'.split('').map((letter, index) => {
              const totalLetters = 8
              const centerIndex = (totalLetters - 1) / 2
              const offset = index - centerIndex
              
              // Circular arch parameters
              const radius = 30 // Radius of the circle (adjust for arch depth)
              const maxAngle = Math.PI / 5 // 36 degrees total arc (adjust for arch width)
              const angle = (offset / centerIndex) * maxAngle
              
              // Calculate position on circle
              const x = radius * Math.sin(angle)
              const y = radius * (1 - Math.cos(angle)) // Downward arch
              const rotation = (angle * 180) / Math.PI // Convert to degrees
              
              return (
                <span
                  key={index}
                  style={{
                    display: 'inline-block',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                    position: 'relative',
                    transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
                    transformOrigin: 'center bottom',
                    marginRight: '-0.1em'
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              )
            })}
          </div>
          
          {/* THE GALLERY with sparkles */}
          <div className="flex items-center justify-center gap-3 mb-2" style={{ marginTop: '2rem' }}>
            <img 
              ref={sparkleLeftRef}
              src="/assets/images/graphics/sparkle.png" 
              alt="Sparkle" 
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              style={{ alignSelf: 'center', filter: 'brightness(0) saturate(100%) invert(9%) sepia(100%) saturate(7200%) hue-rotate(325deg) brightness(90%) contrast(90%)' }}
            />
            <h2 
              ref={galleryHeadingRef}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-tebranos"
              style={{ 
                color: '#f5f1eb',
                fontWeight: 900,
                lineHeight: '1'
              }}
            >
              THE GALLERY
            </h2>
            <img 
              ref={sparkleRightRef}
              src="/assets/images/graphics/sparkle.png" 
              alt="Sparkle" 
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              style={{ alignSelf: 'center', filter: 'brightness(0) saturate(100%) invert(9%) sepia(100%) saturate(7200%) hue-rotate(325deg) brightness(90%) contrast(90%)' }}
            />
          </div>
          
          {/* Moments in Ballet font */}
          <h3 
            ref={momentsRef}
            className="text-5xl sm:text-6xl md:text-7xl font-ballet"
            style={{ color: '#f5f1eb', marginTop: '-1rem' }}
          >
            Moments
          </h3>
        </div>

        {/* Horizontal Scrollable Images */}
        <div 
          ref={galleryImagesRef}
          className="w-full"
        >
        <div 
          ref={scrollContainerRef}
          className="w-full overflow-x-auto"
          style={{ 
            scrollbarWidth: 'thin',
            scrollbarColor: `${theme.colors.primary} transparent`,
            cursor: 'grab'
          }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex gap-4 px-4" style={{ width: 'max-content' }}>
            {prenupImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Prenup ${index + 1}`}
                className="flex-shrink-0 object-cover"
                draggable="false"
                style={{
                  width: '80vw',
                  maxWidth: '450px',
                  height: 'auto'
                }}
              />
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery 