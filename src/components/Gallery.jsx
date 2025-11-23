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
    "/assets/images/couple-1.jpg",
    "/assets/images/couple-2.jpg", 
    "/assets/images/couple-3.jpg",
    "/assets/images/couple-4.jpg"
  ]

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
        className={`py-20 w-full ${themeConfig.calendar.background}`}
      >
        <div className={`${themeConfig.container.maxWidth} ${themeConfig.container.center} ${themeConfig.container.padding}`}>
          {/* Gallery Grid */}
          <div ref={galleryRef} className="max-w-7xl mx-auto">
            {/* Bento Grid Layout */}
            <div className="grid grid-cols-4 gap-2">
              {/* Large featured image - top left */}
              <div 
                className="col-span-2 row-span-2 h-80 md:h-96 overflow-hidden rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => openModal(0)}
              >
                <LazyImage 
                  src={images[0]} 
                  alt="Wedding couple photo 1"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Medium image - top right */}
              <div 
                className="col-span-2 h-full overflow-hidden rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => openModal(1)}
              >
                <LazyImage 
                  src={images[1]} 
                  alt="Wedding couple photo 2"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

               {/* Small image - bottom left */}
               <div 
                 className="h-full overflow-hidden rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                 onClick={() => openModal(2)}
               >
                 <LazyImage 
                   src={images[2]} 
                   alt="Wedding couple photo 3"
                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                 />
               </div>
 
               {/* Small image - bottom right */}
               <div 
                 className="h-full overflow-hidden rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                 onClick={() => openModal(3)}
               >
                 <LazyImage 
                   src={images[3]} 
                   alt="Wedding couple photo 4"
                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                 />
               </div>
            </div>
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
                alt={`Wedding couple photo ${currentImageIndex + 1}`}
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