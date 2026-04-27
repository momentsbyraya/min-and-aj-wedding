import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Gallery2.css'

gsap.registerPlugin(ScrollTrigger)

const Gallery2 = () => {
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
    '/images/prenup/DSC01482.jpg'
  ]

  useEffect(() => {
    const galleryItems = gridRef.current?.querySelectorAll(
      '.gallery2-div1, .gallery2-div2, .gallery2-div3, .gallery2-div4, .gallery2-div5, .gallery2-div6'
    ) || []

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
        <div className="gallery2-div1"><img src={images[0]} alt="Prenup 1" /></div>
        <div className="gallery2-div2"><img src={images[1]} alt="Prenup 2" /></div>
        <div className="gallery2-div3"><img src={images[2]} alt="Prenup 3" /></div>
        <div className="gallery2-div4"><img src={images[3]} alt="Prenup 4" /></div>
        <div className="gallery2-div5"><img src={images[4]} alt="Prenup 5" /></div>
        <div className="gallery2-div6"><img src={images[5]} alt="Prenup 6" /></div>
      </div>
    </section>
  )
}

export default Gallery2

