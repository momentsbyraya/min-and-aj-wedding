import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'
import LazyImage from './LazyImage'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Gallery = () => {
  const sectionRef = useRef(null)
  const galleryRef = useRef(null)
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

  // Polaroid layout - all 12 images scattered organically
  const getImageLayout = (index) => {
    const layouts = [
      // Top row
      { top: '8%', left: '5%', width: '200px', height: '200px', rotation: -8 },
      { top: '10%', left: '25%', width: '190px', height: '190px', rotation: 10 },
      { top: '12%', left: '50%', width: '210px', height: '210px', rotation: -5 },
      { top: '10%', left: '70%', width: '200px', height: '200px', rotation: 12 },
      
      // Middle row
      { top: '35%', left: '10%', width: '220px', height: '200px', rotation: -7 },
      { top: '38%', left: '35%', width: '190px', height: '190px', rotation: 9 },
      { top: '40%', left: '58%', width: '200px', height: '200px', rotation: -6 },
      { top: '42%', left: '78%', width: '180px', height: '180px', rotation: 11 },
      
      // Bottom row
      { top: '65%', left: '8%', width: '200px', height: '200px', rotation: -9 },
      { top: '68%', left: '30%', width: '210px', height: '210px', rotation: 8 },
      { top: '70%', left: '55%', width: '190px', height: '190px', rotation: -7 },
      { top: '72%', left: '75%', width: '200px', height: '200px', rotation: 10 }
    ]
    return layouts[index]
  }

  useEffect(() => {
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const openModal = (index) => {
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="relative py-20 w-full"
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
        
        <div className={`relative z-20 ${themeConfig.container.maxWidth} ${themeConfig.container.center} ${themeConfig.container.padding}`}>
          {/* Gallery Container with polaroid layout */}
          <div ref={galleryRef} className="relative w-full min-h-[1000px] max-w-6xl mx-auto">
            {images.map((image, index) => {
              const layout = getImageLayout(index)
              return (
                <div 
                  key={index}
                  className="absolute cursor-pointer"
                  style={{ 
                    top: layout.top,
                    left: layout.left,
                    width: layout.width,
                    height: layout.height,
                    transform: `rotate(${layout.rotation}deg)`,
                    transition: 'transform 0.3s ease, z-index 0.3s ease',
                    zIndex: 10
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = `rotate(${layout.rotation}deg) scale(1.05)`
                    e.currentTarget.style.zIndex = '20'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `rotate(${layout.rotation}deg)`
                    e.currentTarget.style.zIndex = '10'
                  }}
                  onClick={() => openModal(index)}
                >
                  {/* Polaroid frame with white border */}
                  <div className="bg-white p-2 w-full h-full shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="w-full h-full overflow-hidden">
                      <LazyImage 
                        src={image} 
                        alt={`Prenup photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Black Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
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