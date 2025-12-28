import React, { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { theme } from '../data'
import './Gallery.css'

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
  const sparkleLeftRef = useRef(null)
  const galleryHeadingRef = useRef(null)
  const sparkleRightRef = useRef(null)
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
      className="gallery-section relative w-full flex flex-col"
    >
      {/* Pseudo-element Background - Primary Color */}
      <div className="gallery-background" />

      {/* Content Container */}
      <div className="gallery-content w-full flex flex-col relative z-10">
        {/* Title Section */}
        <div className="text-center mb-8">
          {/* Camera Icon */}
          <div className="flex justify-center mb-4">
            <img 
              ref={cameraRef}
              src="/assets/images/graphics/camera.png" 
              alt="Camera" 
              className="gallery-camera-icon w-6 h-6 sm:w-8 sm:h-8 object-contain"
            />
          </div>
          
          {/* THE GALLERY with sparkles */}
          <div className="gallery-title-container flex items-center justify-center gap-3 mb-2">
            <img 
              ref={sparkleLeftRef}
              src="/assets/images/graphics/sparkle.png" 
              alt="Sparkle" 
              className="gallery-sparkle w-6 h-6 sm:w-8 sm:h-8 object-contain"
            />
            <h2 
              ref={galleryHeadingRef}
              className="gallery-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-tebranos"
            >
              THE GALLERY
            </h2>
            <img 
              ref={sparkleRightRef}
              src="/assets/images/graphics/sparkle.png" 
              alt="Sparkle" 
              className="gallery-sparkle w-6 h-6 sm:w-8 sm:h-8 object-contain"
            />
          </div>
          
          {/* Photos by Elisha Cacnio */}
          <p className="gallery-photos-by mt-2 font-poppins">
            Photos by Elisha Cacnio
          </p>
        </div>

        {/* Horizontal Scrollable Images */}
        <div 
          ref={galleryImagesRef}
          className="w-full"
        >
        <div 
          ref={scrollContainerRef}
          className="gallery-scroll-container w-full overflow-x-auto"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="gallery-images-wrapper flex gap-4 px-4">
            {prenupImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Prenup ${index + 1}`}
                className="gallery-image flex-shrink-0 object-cover"
                draggable="false"
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