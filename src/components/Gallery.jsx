import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Gallery.css'

gsap.registerPlugin(ScrollTrigger)

const Gallery = () => {
  const randSize = (min, max) => `${Math.floor(Math.random() * (max - min + 1)) + min}px`
  const randPct = (min, max) => `${Math.floor(Math.random() * (max - min + 1)) + min}%`
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const bannerRef = useRef(null)
  const prenupImages = [
    '/images/prenup/DSC01333.jpg',
    '/images/prenup/DSC01372.jpg',
    '/images/prenup/DSC01288.jpg',
    '/images/prenup/DSC01381.jpg',
    '/images/prenup/DSC01394.jpg'
  ]

  useEffect(() => {
    const galleryItems = gridRef.current?.querySelectorAll('.div1, .div2, .div3, .div4, .div5') || []

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
        duration: 0.65,
        ease: 'power2.out',
        stagger: 0.12
      }
    ).fromTo(
      bannerRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
      '-=0.2'
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="gallery-section">
      <div className="soft-blob soft-blob--small" style={{ width: randSize(78, 122), height: randSize(66, 110), top: randPct(8, 20), left: randPct(6, 18) }} />
      <div className="soft-blob soft-blob--alt" style={{ width: randSize(95, 145), height: randSize(80, 122), top: randPct(66, 82), left: randPct(66, 84) }} />
      <img
        src="/images/graphics/flower.png"
        alt=""
        aria-hidden="true"
        className="gallery-flower gallery-flower-top"
      />
      <img
        src="/images/graphics/flower-1.png"
        alt=""
        aria-hidden="true"
        className="gallery-flower gallery-flower-bottom"
      />
      <div ref={gridRef} className="parent">
        <div className="div1 soft-edges"><img src={prenupImages[0]} alt="Prenup 1" /></div>
        <div className="div2 soft-edges"><img src={prenupImages[1]} alt="Prenup 2" /></div>
        <div className="div3 soft-edges"><img src={prenupImages[2]} alt="Prenup 3" /></div>
        <div className="div4 soft-edges"><img src={prenupImages[3]} alt="Prenup 4" /></div>
        <div className="div5 soft-edges"><img src={prenupImages[4]} alt="Prenup 5" /></div>
      </div>
      <img
        ref={bannerRef}
        src="/images/graphics/flower-banner.png"
        alt=""
        aria-hidden="true"
        className="gallery-flower-banner"
      />
    </section>
  )
}

export default Gallery 