import React from 'react'
import './Gallery.css'

const Gallery = () => {
  const prenupImages = [
    '/images/prenup/DSC01333.jpg',
    '/images/prenup/DSC01372.jpg',
    '/images/prenup/DSC01288.jpg',
    '/images/prenup/DSC01381.jpg',
    '/images/prenup/DSC01394.jpg'
  ]

  return (
    <section className="gallery-section">
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
      <div className="parent">
        <div className="div1"><img src={prenupImages[0]} alt="Prenup 1" /></div>
        <div className="div2"><img src={prenupImages[1]} alt="Prenup 2" /></div>
        <div className="div3"><img src={prenupImages[2]} alt="Prenup 3" /></div>
        <div className="div4"><img src={prenupImages[3]} alt="Prenup 4" /></div>
        <div className="div5"><img src={prenupImages[4]} alt="Prenup 5" /></div>
      </div>
    </section>
  )
}

export default Gallery 