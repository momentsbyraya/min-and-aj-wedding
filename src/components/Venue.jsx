import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Navigation, ExternalLink } from 'lucide-react'
import { theme } from '../data'
import { venues as venuesData, dresscode } from '../data'
import './Venue.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Venue = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const imageRef = useRef(null)
  const colorSwatchesRef = useRef(null)
  const mapRef = useRef(null)
  const whereToBeRef = useRef(null)
  const venueDetailsRef = useRef(null)
  const dressCodeHeadingRef = useRef(null)
  const dressCodeContentRef = useRef(null)
  const [hoveredColorIndex, setHoveredColorIndex] = useState(null)
  const [clickedColorIndex, setClickedColorIndex] = useState(null)
  const [currentDresscodeIndex, setCurrentDresscodeIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [carouselWidth, setCarouselWidth] = useState(400)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const carouselRef = useRef(null)
  const carouselMobileRef = useRef(null)
  const sliderRef = useRef(null)
  const sliderMobileRef = useRef(null)
  
  const dresscodeImages = [1, 2, 3, 4]
  
  // Update carousel width on resize
  useEffect(() => {
    const updateWidth = () => {
      const ref = window.innerWidth >= 1024 ? carouselRef.current : carouselMobileRef.current
      if (ref) {
        setCarouselWidth(ref.offsetWidth)
      }
    }
    
    updateWidth()
    window.addEventListener('resize', updateWidth)
    
    return () => window.removeEventListener('resize', updateWidth)
  }, [])
  
  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && currentDresscodeIndex < dresscodeImages.length - 1) {
      setCurrentDresscodeIndex(currentDresscodeIndex + 1)
    }
    if (isRightSwipe && currentDresscodeIndex > 0) {
      setCurrentDresscodeIndex(currentDresscodeIndex - 1)
    }
  }

  // Mouse drag handlers
  const onMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
    setDragStart(e.clientX)
    setDragOffset(0)
    const slider = window.innerWidth >= 1024 ? sliderRef.current : sliderMobileRef.current
    if (slider) {
      slider.style.transition = 'none'
    }
  }

  // Global mouse event listeners for dragging
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return
      
      const currentX = e.clientX
      const diff = dragStart - currentX
      
      // Constrain drag offset to prevent dragging too far
      const maxOffset = carouselWidth * 0.5
      const constrainedDiff = Math.max(-maxOffset, Math.min(maxOffset, diff))
      setDragOffset(constrainedDiff)
    }

    const handleMouseUp = () => {
      if (!isDragging) return
      
      setIsDragging(false)
      
      // Calculate which image to snap to
      const threshold = carouselWidth * 0.3 // 30% of image width
      let newIndex = currentDresscodeIndex
      
      if (dragOffset > threshold && currentDresscodeIndex < dresscodeImages.length - 1) {
        newIndex = currentDresscodeIndex + 1
      } else if (dragOffset < -threshold && currentDresscodeIndex > 0) {
        newIndex = currentDresscodeIndex - 1
      }
      
      setCurrentDresscodeIndex(newIndex)
      setDragOffset(0)
      
      const slider = window.innerWidth >= 1024 ? sliderRef.current : sliderMobileRef.current
      if (slider) {
        slider.style.transition = 'transform 0.3s ease-in-out'
      }
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragStart, dragOffset, currentDresscodeIndex, carouselWidth, dresscodeImages.length])

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

    // Animate header - slide down
    if (headerRef.current) {
      tl.fromTo(headerRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
    }

    // Animate map - slide up
    if (mapRef.current) {
      tl.fromTo(mapRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.3"
      )
    }

    // Animate "WHERE TO BE" - slide from left
    if (whereToBeRef.current) {
      tl.fromTo(whereToBeRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate venue details - slide from right
    if (venueDetailsRef.current) {
      tl.fromTo(venueDetailsRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate dress code heading - slide from left
    if (dressCodeHeadingRef.current) {
      tl.fromTo(dressCodeHeadingRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate dress code content - slide from right
    if (dressCodeContentRef.current) {
      tl.fromTo(dressCodeContentRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Animate color swatches one after another starting from top
    tl.fromTo(".color-swatch-item",
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        stagger: 0.15
      },
      "-=0.4"
    )

    // Image animation - slide from right (sequential)
    if (imageRef.current) {
      tl.fromTo(imageRef.current,
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

  const venueData = venuesData.venue

  return (
    <>
    <section
      ref={sectionRef}
      className="venue-section relative w-full overflow-hidden pl-8 pr-8 lg:pl-0 lg:pr-0 lg:pb-16 venue-bg-texture"
    >
      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
          {/* Flex Container - Stacked on lg screens */}
          <div className="flex flex-col">
            {/* Text Content */}
            <div className="w-full lg:pl-8 lg:pr-8 pt-16 pb-8 lg:pt-16 lg:pb-8 lg:flex lg:flex-col">
              {/* Header Section */}
              <div ref={headerRef} className="text-center mb-12">
                {/* The in Ballet font */}
                <h1
                  className="venue-title text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-ballet mb-2"
                >
                  The
                </h1>

                {/* GAME PLAN */}
                <h2
                  className="venue-game-plan text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-tebranos mb-4"
                >
                  GAME PLAN
                </h2>

                {/* Embedded Google Map - Hidden on lg screens and above */}
                <div ref={mapRef} className="venue-map-mobile mb-12 w-full max-w-2xl mx-auto lg:hidden">
                  <iframe 
                    src={venueData.googleMapsEmbedUrl} 
                    width="100%" 
                    height="100%" 
                    className="venue-map-iframe"
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Venue Location"
                  ></iframe>
                </div>
              </div>
                
              {/* WHERE TO BE and What to Wear Container - Flex row on lg screens */}
              <div className="flex flex-col lg:flex-row lg:gap-8 lg:items-start">
                {/* Group 1: WHERE TO BE Section with Venue Details */}
                <div className="venue-subsection mb-8 lg:mb-0 text-center lg:flex-1">
                  {/* WHERE TO BE */}
                  <h2
                    ref={whereToBeRef}
                    className="venue-where-to-be text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-tebranos mb-4"
                  >
                    WHERE TO BE
                  </h2>
                  
                  {/* Embedded Google Map - Visible on lg screens and above */}
                  <div className="venue-map-desktop hidden lg:block mb-8 mx-auto">
                    <iframe 
                      src={venueData.googleMapsEmbedUrl} 
                      width="100%" 
                      height="100%" 
                      className="venue-map-iframe"
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Venue Location"
                    ></iframe>
                  </div>
                  
                  {/* Venue Details Section */}
                  <div ref={venueDetailsRef} className="text-center">
                <h3
                  className="venue-venue-name text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-tebranos"
                >
                  {venueData.name}
                </h3>
                <p
                  className="venue-text-medium font-poppins mb-4 max-w-2xl mx-auto"
                >
                  Multi-Purpose Hall
                </p>
                <p
                  className="venue-text-small font-poppins max-w-2xl mx-auto"
                >
                  {venueData.address && `${venueData.address}`}
                  {venueData.city && `, ${venueData.city}`}
                  {venueData.zip && `, ${venueData.zip}`}
                  {venueData.state && ` ${venueData.state}`}
                </p>
                {venueData.main && venueData.main.time && (
                  <p
                    className="venue-text-time font-poppins mb-6 max-w-2xl mx-auto"
                  >
                    {venueData.main.time}
                  </p>
                )}
                
                {/* Directions Button */}
                <a
                  href={venueData.googleMapsUrl || venueData.directionsUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="venue-button venue-button-tertiary inline-flex items-center justify-center space-x-3 py-3 px-8 transition-all duration-200 text-base font-medium font-poppins"
                >
                  <span className="venue-button-text font-poppins">Get Directions</span>
                  <Navigation className="venue-button-icon w-5 h-5 object-contain transition-all duration-200" />
                </a>
                  </div>
                </div>

                {/* Group 2: Dress Code Section */}
                <div className="venue-subsection mb-12 lg:mb-0 text-center mt-12 lg:mt-0 lg:flex-1">
                  {/* What to Wear */}
                  <h2
                    ref={dressCodeHeadingRef}
                    className="venue-dresscode-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-tebranos mb-4 uppercase"
                  >
                    What to Wear
                  </h2>
                  
                  {/* Color Swatches and Image Side by Side - Desktop */}
                  <div className="hidden lg:flex items-center justify-center gap-8 max-w-2xl mx-auto mb-8">
                    {/* Dresscode Image Carousel */}
                    <div className="flex flex-col items-center justify-center">
                      <div 
                        ref={carouselRef}
                        className="venue-dresscode-carousel relative overflow-hidden"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                        onMouseDown={onMouseDown}
                      >
                        <div 
                          ref={sliderRef}
                          className="venue-dresscode-slider flex transition-transform duration-300 ease-in-out"
                        style={{ 
                          transform: `translateX(calc(-${currentDresscodeIndex * 25}% + ${dragOffset / (carouselWidth || 400) * 100}%))`
                        }}
                        >
                          {dresscodeImages.map((num) => (
                            <img 
                              key={num}
                              src={`/assets/images/dresscode/dresscode-${num}.jpg`}
                              alt={`Dress Code ${num}`}
                              className="venue-dresscode-image flex-shrink-0 object-contain"
                              onError={(e) => {
                                if (e.target.src !== '/assets/images/dresscode/dresscode.png') {
                                  e.target.src = '/assets/images/dresscode/dresscode.png'
                                }
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      {/* Navigation Dots */}
                      <div className="flex gap-2 mt-4">
                        {dresscodeImages.map((num, index) => (
                          <button
                            key={num}
                            onClick={() => setCurrentDresscodeIndex(index)}
                            className={`venue-dresscode-dot w-2 h-2 rounded-full transition-all duration-200 ${
                              currentDresscodeIndex === index 
                                ? 'venue-dresscode-dot-active' 
                                : 'venue-dresscode-dot-inactive'
                            }`}
                            aria-label={`Go to dresscode ${num}`}
                          />
                        ))}
                      </div>
                    </div>
                    {/* Color Swatches - Vertical with Overlap */}
                    <div ref={colorSwatchesRef} className="flex flex-col overflow-visible">
                      {dresscode.colorPalette.map((color, index) => (
                        <div
                          key={index}
                          className={`color-swatch-item venue-color-swatch relative flex flex-col items-center ${index === 0 ? '' : 'venue-color-swatch-overlap'}`}
                          style={{
                            zIndex: dresscode.colorPalette.length - index
                          }}
                          onMouseEnter={() => setHoveredColorIndex(index)}
                          onMouseLeave={() => setHoveredColorIndex(null)}
                          onClick={() => setClickedColorIndex(clickedColorIndex === index ? null : index)}
                        >
                          <div
                            className="venue-color-swatch-circle w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 cursor-pointer transition-transform duration-200 hover:scale-110"
                            style={{
                              backgroundColor: color.hex,
                              borderColor: theme.colors.tertiary
                            }}
                          ></div>
                          {/* Tooltip */}
                          {(hoveredColorIndex === index || clickedColorIndex === index) && (
                            <div className="venue-color-swatch-tooltip">
                              {color.label}
                              <div className="venue-color-swatch-tooltip-arrow"></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Color Swatches and Image Side by Side - Mobile */}
                  <div className="lg:hidden flex items-center justify-center gap-8 max-w-2xl mx-auto mb-6">
                    {/* Dresscode Image Carousel */}
                    <div className="flex flex-col items-center justify-center">
                      <div 
                        ref={carouselMobileRef}
                        className="venue-dresscode-carousel relative overflow-hidden"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                        onMouseDown={onMouseDown}
                      >
                        <div 
                          ref={sliderMobileRef}
                          className="venue-dresscode-slider flex transition-transform duration-300 ease-in-out"
                        style={{ 
                          transform: `translateX(calc(-${currentDresscodeIndex * 25}% + ${dragOffset / (carouselWidth || 400) * 100}%))`
                        }}
                        >
                          {dresscodeImages.map((num) => (
                            <img 
                              key={num}
                              src={`/assets/images/dresscode/dresscode-${num}.jpg`}
                              alt={`Dress Code ${num}`}
                              className="venue-dresscode-image flex-shrink-0 object-contain"
                              onError={(e) => {
                                if (e.target.src !== '/assets/images/dresscode/dresscode.png') {
                                  e.target.src = '/assets/images/dresscode/dresscode.png'
                                }
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      {/* Navigation Dots */}
                      <div className="flex gap-2 mt-4">
                        {dresscodeImages.map((num, index) => (
                          <button
                            key={num}
                            onClick={() => setCurrentDresscodeIndex(index)}
                            className={`venue-dresscode-dot w-2 h-2 rounded-full transition-all duration-200 ${
                              currentDresscodeIndex === index 
                                ? 'venue-dresscode-dot-active' 
                                : 'venue-dresscode-dot-inactive'
                            }`}
                            aria-label={`Go to dresscode ${num}`}
                          />
                        ))}
                      </div>
                    </div>
                    {/* Color Swatches - Vertical with Overlap */}
                    <div ref={colorSwatchesRef} className="flex flex-col overflow-visible">
                      {dresscode.colorPalette.map((color, index) => (
                        <div
                          key={index}
                          className={`color-swatch-item venue-color-swatch relative flex flex-col items-center ${index === 0 ? '' : 'venue-color-swatch-overlap'}`}
                          style={{
                            zIndex: dresscode.colorPalette.length - index
                          }}
                          onMouseEnter={() => setHoveredColorIndex(index)}
                          onMouseLeave={() => setHoveredColorIndex(null)}
                          onClick={() => setClickedColorIndex(clickedColorIndex === index ? null : index)}
                        >
                          <div
                            className="venue-color-swatch-circle w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 cursor-pointer transition-transform duration-200 hover:scale-110"
                            style={{
                              backgroundColor: color.hex,
                              borderColor: theme.colors.tertiary
                            }}
                          ></div>
                          {/* Tooltip */}
                          {(hoveredColorIndex === index || clickedColorIndex === index) && (
                            <div className="venue-color-swatch-tooltip">
                              {color.label}
                              <div className="venue-color-swatch-tooltip-arrow"></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Dresscode Details Section */}
                  <div ref={dressCodeContentRef} className="text-center">
                    <h3
                      className="venue-venue-name text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-tebranos mb-4"
                    >
                      Semi Form Chic Outfit
                    </h3>
                    <p
                      className="venue-text-medium font-poppins max-w-2xl mx-auto"
                    >
                      {dresscode.mainDressCode.description.split('Strictly NO Pink and Red')[0]}
                    </p>
                    <p
                      className="venue-text-medium font-poppins mb-6 max-w-2xl mx-auto"
                    >
                      Strictly NO Pink and Red
                    </p>
                  </div>
                  
                  {/* View Inspo Button */}
                  {dresscode.mainDressCode.inspoUrl && (
                    <div className="text-center">
                      <a
                        href={dresscode.mainDressCode.inspoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="venue-button venue-button-tertiary inline-flex items-center justify-center space-x-3 py-3 px-8 transition-all duration-200 text-base font-medium font-poppins"
                      >
                        <span className="venue-button-text font-poppins">View Inspo</span>
                        <ExternalLink className="venue-button-icon w-5 h-5 object-contain transition-all duration-200" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Image - Block under text on lg screens */}
            <div className="w-full mt-8 lg:mt-0 h-96 overflow-hidden venue-image-mobile">
              <img 
                ref={imageRef}
                src="/assets/images/prenup/prenup7.jpg" 
                alt="Venue" 
                className="venue-image w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Venue
