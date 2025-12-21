import React, { useEffect, useRef, useState, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { theme } from '../data'
import LazyImage from './LazyImage'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Gallery = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const gridRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [galleryIndex, setGalleryIndex] = useState(0)

  const images = [
    "/assets/images/prenup/WYN08076.JPG",
    "/assets/images/prenup/WYN08086.JPG",
    "/assets/images/prenup/WYN08091.JPG",
    "/assets/images/prenup/WYN08093.JPG",
    "/assets/images/prenup/WYN08109.JPG",
    "/assets/images/prenup/WYN08112.JPG",
    "/assets/images/prenup/WYN08127.JPG",
    "/assets/images/prenup/WYN08161.JPG",
    "/assets/images/prenup/WYN08170.JPG",
    "/assets/images/prenup/WYN08181.JPG",
    "/assets/images/prenup/WYN08185.JPG",
    "/assets/images/prenup/WYN08214.JPG"
  ]

  useEffect(() => {
    // Use Intersection Observer for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Only animate when section is in view
            const tl = gsap.timeline()

            // Animate title first
            if (titleRef.current) {
              tl.fromTo(titleRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
              )
            }

              // Animate grid items with stagger - batch animation for performance
              if (gridRef.current) {
                const children = Array.from(gridRef.current.children)
                // Animate in smaller batches to reduce load - use requestAnimationFrame for smoother performance
                const animateBatch = (startIndex, batchSize = 3) => {
                  const endIndex = Math.min(startIndex + batchSize, children.length)
                  for (let i = startIndex; i < endIndex; i++) {
                    gsap.fromTo(children[i],
                      { opacity: 0, y: 50 },
                      { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.5, 
                        ease: "power2.out",
                        delay: 0.3 + ((i - startIndex) * 0.08)
                      }
                    )
                  }
                  if (endIndex < children.length) {
                    requestAnimationFrame(() => {
                      setTimeout(() => animateBatch(endIndex, batchSize), 50)
                    })
                  }
                }
                animateBatch(0, 3) // Animate 3 at a time
              }

            observer.disconnect()
          }
        })
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    // Cleanup function
    return () => {
      observer.disconnect()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const openModal = (index) => {
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

  // Bento grid layout - define sizes for each image (optimized to fill grid)
  const bentoLayout = [
    { colSpan: 2, rowSpan: 2 }, // Large top-left
    { colSpan: 1, rowSpan: 1 }, // Small top-right
    { colSpan: 1, rowSpan: 1 }, // Small top-right
    { colSpan: 1, rowSpan: 2 }, // Tall right
    { colSpan: 2, rowSpan: 1 }, // Wide middle-left
    { colSpan: 1, rowSpan: 1 }, // Small middle
    { colSpan: 1, rowSpan: 1 }, // Small middle
    { colSpan: 1, rowSpan: 1 }, // Small bottom-left
    { colSpan: 1, rowSpan: 1 }, // Small bottom-left
    { colSpan: 1, rowSpan: 1 }, // Small bottom
    { colSpan: 1, rowSpan: 1 }, // Small bottom
    { colSpan: 4, rowSpan: 1 }, // Full row
  ]

  return (
    <>
      <section
        ref={sectionRef}
        className="relative py-20 w-full"
        style={{ minHeight: '100vh' }}
      >
        {/* Hero Background */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/assets/images/graphics/hero-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        {/* Crumpled Paper Background on top */}
        <div 
          className="absolute inset-0 opacity-30 z-10"
          style={{
            backgroundImage: 'url(/assets/images/crumpled-paper.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        <div className={`relative z-20 flex flex-col items-center justify-center`} style={{ minHeight: '100vh', padding: '2rem 0' }}>
          {/* Title */}
          <div ref={titleRef} className="text-center mb-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-antsvalley" style={{ color: '#4b2259' }}>
              The Celebrant
            </h2>
          </div>

          {/* Bento Grid Gallery */}
          <div className={`w-full max-w-7xl mx-auto px-4 ${theme.container.padding}`}>
            <div 
              ref={gridRef}
              className="grid grid-cols-4 gap-4"
              style={{
                gridAutoRows: 'minmax(150px, auto)',
                gridAutoFlow: 'dense',
                contain: 'layout style',
                contentVisibility: 'auto'
              }}
            >
              {images.map((image, index) => {
                const layout = bentoLayout[index] || { colSpan: 1, rowSpan: 1 }
                return (
                  <div
                    key={index}
                    className="group cursor-pointer relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] gallery-grid-item"
                    style={{
                      gridColumn: index === 0 ? '1 / span 2' : `span ${layout.colSpan}`,
                      gridRow: `span ${layout.rowSpan}`,
                      willChange: 'transform, opacity',
                      contain: 'layout style paint',
                      transform: 'translateZ(0)'
                    }}
                    onClick={() => openModal(index)}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                    <LazyImage
                      src={image}
                      alt={`Prenup photo ${index + 1}`}
                      className="w-full h-full object-cover"
                      priority={index < 4 ? "high" : "low"}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <p className="text-sm font-medium">Photo {index + 1}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Black Overlay */}
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={closeModal}
            style={{ backdropFilter: 'blur(2px)' }}
          />
          
          {/* Modal Content */}
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            <div className="relative">
              <img
                src={images[currentImageIndex]}
                alt={`Prenup photo ${currentImageIndex + 1}`}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                loading="eager"
                decoding="async"
                fetchpriority="high"
              />
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default Gallery 