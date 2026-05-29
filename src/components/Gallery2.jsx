import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Gallery2.css'

gsap.registerPlugin(ScrollTrigger)

const Gallery2 = ({ onImageClick }) => {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const images = [
    '/images/prenup/DSC06785.jpg',
    '/images/prenup/DSC06812.jpg',
    '/images/prenup/DSC06982.jpg',
    '/images/prenup/DSC07027.jpg',
    '/images/prenup/DSC07129.jpg',
    '/images/prenup/DSC07234.jpg'
  ]

  useEffect(() => {
    const galleryItems = gridRef.current?.querySelectorAll('.gallery2-item') || []

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 72%',
        end: 'bottom 35%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.fromTo(
      galleryItems,
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        duration: 0.62,
        ease: 'power2.out',
        stagger: 0.12
      }
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="gallery2-section">
      <div ref={gridRef} className="gallery2-parent">
        {images.map((image, index) => (
          <div key={image} className="gallery2-item gallery2-soft-edges">
            <img src={image} alt={`Prenup ${index + 1}`} onClick={() => onImageClick?.(image)} className="cursor-pointer" />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Gallery2

