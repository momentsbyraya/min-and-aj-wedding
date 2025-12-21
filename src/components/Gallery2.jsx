import React, { useEffect, useRef, useState, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { theme } from '../data'
import LazyImage from './LazyImage'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Gallery2 = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const gridRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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

  // Generate random transforms and animation directions for each image
  const imageTransforms = useMemo(() => {
    return images.map(() => {
      // Random animation direction: 0=top, 1=bottom, 2=left, 3=right
      const direction = Math.floor(Math.random() * 4)
      let animX = 0
      let animY = 0
      
      if (direction === 0) animY = -50 // From top
      else if (direction === 1) animY = 50 // From bottom
      else if (direction === 2) animX = -50 // From left
      else animX = 50 // From right
      
      return {
        rotation: (Math.random() - 0.5) * 8, // Random rotation between -4 and 4 degrees
        translateX: (Math.random() - 0.5) * 20, // Random translate X between -10 and 10px
        animX, // Animation start X
        animY // Animation start Y
      }
    })
  }, [])

  useEffect(() => {
    // Animate title on scroll
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 50%",
            toggleActions: "play none none none"
          }
        }
      )
    }

    // Highly optimized: Use CSS for initial states, Intersection Observer with batching
    if (gridRef.current) {
      const children = Array.from(gridRef.current.children)
      let animationQueue = []
      let isAnimating = false
      
      // Set initial states using CSS directly (faster than GSAP)
      children.forEach((child, i) => {
        const index = parseInt(child.getAttribute('data-index') || i)
        const transform = imageTransforms[index]
        
        // Use CSS directly for initial state - much faster
        child.style.opacity = '0'
        child.style.transform = `translate3d(${transform.animX}px, ${transform.animY}px, 0)`
        child.style.willChange = 'transform, opacity'
      })
      
      // Batch animations to avoid too many simultaneous animations
      const processQueue = () => {
        if (animationQueue.length === 0 || isAnimating) return
        
        isAnimating = true
        const batch = animationQueue.splice(0, 3) // Process 3 at a time
        
        batch.forEach(({ child, transform }) => {
          gsap.to(child, {
            opacity: 1,
            x: transform.translateX,
            y: 0,
            rotation: transform.rotation,
            duration: 0.4,
            ease: "power1.out",
            force3D: true,
            overwrite: true,
            onComplete: () => {
              child.style.willChange = 'auto' // Remove will-change after animation
            }
          })
        })
        
        // Process next batch
        setTimeout(() => {
          isAnimating = false
          if (animationQueue.length > 0) {
            requestAnimationFrame(processQueue)
          }
        }, 50)
      }
      
      // Check if image is loaded inside container
      const isImageLoaded = (container) => {
        const img = container.querySelector('img')
        if (!img) return false
        // Check if image is complete (loaded) or has naturalWidth (loaded)
        return img.complete && img.naturalWidth > 0
      }
      
      // Wait for image to load, then add to queue
      const waitForImageAndAnimate = (child, transform) => {
        const img = child.querySelector('img')
        
        if (!img) {
          // No image found, animate anyway
          animationQueue.push({ child, transform })
          requestAnimationFrame(processQueue)
          return
        }
        
        if (isImageLoaded(child)) {
          // Image already loaded, add to queue
          animationQueue.push({ child, transform })
          requestAnimationFrame(processQueue)
        } else {
          // Wait for image to load
          const onImageLoad = () => {
            animationQueue.push({ child, transform })
            requestAnimationFrame(processQueue)
            img.removeEventListener('load', onImageLoad)
            img.removeEventListener('error', onImageLoad) // Also handle error case
          }
          
          img.addEventListener('load', onImageLoad)
          img.addEventListener('error', onImageLoad) // Handle broken images
          
          // If image is already loading but not complete, wait a bit
          if (img.src && !img.complete) {
            // Image is loading, wait for it
          } else {
            // Image might be cached or already loaded, check again
            setTimeout(() => {
              if (isImageLoaded(child)) {
                onImageLoad()
              }
            }, 100)
          }
        }
      }
      
      // Use Intersection Observer with debouncing
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const child = entry.target
              const index = parseInt(child.getAttribute('data-index') || 0)
              const transform = imageTransforms[index]
              
              // Unobserve immediately to prevent re-triggering
              observer.unobserve(child)
              
              // Wait for image to load before animating
              waitForImageAndAnimate(child, transform)
            }
          })
        },
        { 
          threshold: 0.2,
          rootMargin: '50px'
        }
      )
      
      // Observe all children
      children.forEach(child => observer.observe(child))
      
      // Cleanup
      return () => {
        observer.disconnect()
        animationQueue = []
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    } else {
      // Cleanup function
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    }
  }, [imageTransforms])

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

  return (
    <>
      <section
        ref={sectionRef}
        className="relative pt-20 pb-4 w-full"
      >
        {/* Rose Gold Background */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/assets/images/graphics/rose-gold-bg.png)',
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
        
        <div className={`relative z-20 flex flex-col items-center`} style={{ paddingTop: '2rem', paddingBottom: '0.5rem' }}>
          {/* Title */}
          <div ref={titleRef} className="text-center mb-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-antsvalley" style={{ color: '#4b2259' }}>
              The Celebrant
            </h2>
          </div>

          {/* Square Grid Gallery - Photography Style */}
          <div className={`w-full max-w-7xl mx-auto px-4 ${theme.container.padding}`}>
            <div 
              ref={gridRef}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            >
              {images.map((image, index) => {
                const transform = imageTransforms[index]
                // Third to last photo (index 9 for 12 images) - adjust background position
                const isThirdToLast = index === images.length - 3
                // Calculate which row (0-indexed) - assuming 4 columns on medium+ screens
                const row = Math.floor(index / 4)
                const isEvenRow = row % 2 === 1 // Even rows (2nd, 4th, etc. - 1-indexed)
                return (
                  <div
                    key={index}
                    className="group cursor-pointer gallery-grid-item aspect-square"
                    data-index={index}
                    style={{
                      willChange: 'transform, opacity',
                      contain: 'layout style paint',
                      marginLeft: isEvenRow ? '-0.5rem' : '0',
                      marginRight: isEvenRow ? '-0.5rem' : '0'
                    }}
                    onClick={() => openModal(index)}
                  >
                    <div className="w-full h-full bg-white shadow-2xl hover:scale-105 transition-transform duration-300 p-0 flex flex-col">
                      <div 
                        className="flex-1 border-l-8 border-r-8 border-t-8 border-white overflow-hidden" 
                        style={{ 
                          boxSizing: 'border-box',
                          paddingBottom: '0.75rem'
                        }}
                      >
                        <LazyImage
                          src={image}
                          alt={`Prenup photo ${index + 1}`}
                          className="w-full h-full object-cover"
                          style={{ 
                            maxWidth: '100%',
                            maxHeight: '100%',
                            display: 'block',
                            objectPosition: isThirdToLast ? 'center bottom' : 'center center'
                          }}
                          priority={index < 4 ? "high" : "low"}
                        />
                      </div>
                      <div className="bg-white" style={{ height: '0.75rem' }}></div>
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

export default Gallery2

