import React from 'react'

function OpeningScreen({ onEnvelopeOpen }) {
  const handleOpen = () => {
    if (onEnvelopeOpen) onEnvelopeOpen()
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-white">
      <img
        src="/images/graphics/opening.png"
        alt="Opening"
        style={{ width: '100vw', height: 'auto', display: 'block' }}
      />

      <div className="opening-flower-wind-layer absolute inset-0 z-[5] overflow-hidden pointer-events-none">
          <img src="/images/graphics/flower.png" alt="" aria-hidden="true" className="opening-flower-petal" style={{ top: '60%', animationDelay: '0s', animationDuration: '11s' }} />
          <img src="/images/graphics/flower.png" alt="" aria-hidden="true" className="opening-flower-petal" style={{ top: '67%', animationDelay: '2.8s', animationDuration: '12.5s' }} />
          <img src="/images/graphics/flower.png" alt="" aria-hidden="true" className="opening-flower-petal" style={{ top: '73%', animationDelay: '5.2s', animationDuration: '11.8s' }} />
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center justify-center px-4 text-center pointer-events-none z-10">
        <div className="mb-4 sm:mb-6 md:mb-8">
          <p className="font-foglihten tracking-[0.2em] text-sm sm:text-base md:text-lg uppercase" style={{ color: '#E28B91' }}>
            YOU ARE CORDIALLY
          </p>
          <p className="font-pinyon text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight" style={{ color: '#E28B91' }}>
            Invited
          </p>
        </div>
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Open invitation"
          className="focus:outline-none p-0 m-0 border-0 bg-transparent leading-none pointer-events-auto"
        >
          <img
            src="/images/graphics/envelope.png"
            alt="Envelope"
            style={{ width: '80vw', height: 'auto' }}
          />
        </button>
        <p className="font-foglihten tracking-[0.3em] text-xs sm:text-sm md:text-base uppercase mt-3" style={{ color: '#E28B91' }}>
          CLICK TO OPEN.
        </p>
      </div>
    </div>
  )
}

export default OpeningScreen

