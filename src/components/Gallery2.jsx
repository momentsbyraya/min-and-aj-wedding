import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Gallery2.css'

gsap.registerPlugin(ScrollTrigger)

const Gallery2 = ({ onImageClick }) => {
  const randSize = (min, max) => `${Math.floor(Math.random() * (max - min + 1)) + min}px`
  const randPct = (min, max) => `${Math.floor(Math.random() * (max - min + 1)) + min}%`
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const images = [
    '/images/prenup/DSC01538.jpg',
    '/images/prenup/DSC01459.jpg',
    '/images/prenup/DSC01254.jpg',
    '/images/prenup/DSC01234.jpg',
    '/images/prenup/DSC01492.jpg',
    '/images/prenup/DSC01381.jpg'
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
      <div className="soft-blob soft-blob--alt" style={{ width: randSize(86, 136), height: randSize(74, 116), top: randPct(8, 22), left: randPct(6, 18) }} />
      <div className="soft-blob soft-blob--small" style={{ width: randSize(72, 112), height: randSize(60, 96), top: randPct(68, 84), left: randPct(68, 84) }} />
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

