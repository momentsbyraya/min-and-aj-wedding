import React from 'react'

const photos = [
  '/images/prenup/DSC01333.jpg', // div1 (center tall)
  '/images/prenup/DSC01254.jpg', // div2 (top left)
  '/images/prenup/DSC01492.jpg', // div3 (bottom left)
  '/images/prenup/DSC01482.jpg', // div4 (top right)
  '/images/prenup/DSC01369.jpg'  // div5 (bottom right)
]

const PhotoMosaicSection = () => {
  return (
    <section className="w-full py-14 px-4 sm:px-6" style={{ background: 'linear-gradient(180deg, #fdf2f7 0%, #f5c4da 100%)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-my-soul text-center mb-8"
          style={{ color: '#80043a', fontSize: 'clamp(2.4rem, 7vw, 5rem)' }}
        >
          Our Photo Moments
        </h2>

        <div
          className="grid grid-cols-3 grid-rows-5 gap-2"
          style={{ height: 'min(85vh, 400px)' }}
        >
          <div className="col-start-2 row-start-1 row-end-6 overflow-hidden">
            <img src={photos[0]} alt="Prenup center" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="col-start-1 row-start-1 row-end-3 overflow-hidden">
            <img src={photos[1]} alt="Prenup left top" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="col-start-1 row-start-3 row-end-6 overflow-hidden">
            <img src={photos[2]} alt="Prenup left bottom" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="col-start-3 row-start-1 row-end-4 overflow-hidden">
            <img src={photos[3]} alt="Prenup right top" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="col-start-3 row-start-4 row-end-6 overflow-hidden">
            <img src={photos[4]} alt="Prenup right bottom" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default PhotoMosaicSection
