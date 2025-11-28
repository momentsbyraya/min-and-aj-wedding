import React, { useRef } from 'react'
import { celebrant } from '../data'
import { weddingConfig } from '../config/weddingConfig'

function OpeningScreen({ onEnvelopeOpen }) {
  const envelopeRef = useRef(null)
  const openingSectionRef = useRef(null)

  const handleEnvelopeClick = () => {
    const envelope = envelopeRef.current
    const openingSection = openingSectionRef.current
    
    if (envelope) {
      envelope.classList.add('active')
      // Letter translation: 0.3s delay + 0.8s duration = 1.1s total
      // Wait 1 second after letter finishes translating
      setTimeout(() => {
        if (openingSection) {
          openingSection.classList.add('zooming-out')
          // After zoom and fadeout animation completes, reveal invitation
          setTimeout(() => {
            if (onEnvelopeOpen) {
              onEnvelopeOpen()
            }
          }, 1500) // Animation duration
        }
      }, 2100) // 1.1s (letter animation) + 1000ms (1 second wait)
    }
  }

  return (
    <div 
      ref={openingSectionRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center opening-section"
    >
      {/* Background matching dress code section */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: 'white'
        }}
      />
      <div 
        className="absolute inset-0 z-10 opening-bg-pulse"
        style={{
          backgroundImage: 'url(/assets/images/graphics/bg-2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <section className="cssletter flex flex-col items-center relative z-10 w-full py-8" style={{ minHeight: 'auto', height: 'auto' }}>
        {/* Click me text */}
        <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 text-center click-me-container">
          <h1 
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-antsvalley leading-tight"
            style={{ color: '#1e3a5f', fontSize: 'clamp(3rem, 8vw, 96px)', marginLeft: '-1rem' }}
          >
            Click me!
          </h1>
        </div>
        <div className="envelope" ref={envelopeRef}>
          <button 
            className="heart stamp-button" 
            id="openEnvelope" 
            aria-label="Open Envelope"
            onClick={handleEnvelopeClick}
          >
            <img 
              src="/assets/images/graphics/stamp.png" 
              alt="Stamp" 
              className="stamp-image"
            />
          </button>
          <div className="envelope-flap"></div>
          <div className="envelope-folds">
            <div className="envelope-left"></div>
            <div className="envelope-right"></div>
            <div className="envelope-bottom"></div>
          </div>
          {/* Letter that slides up when envelope opens */}
          <div className="envelope-letter">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold">You are invited!</p>
            <img 
              src="/assets/images/graphics/cutlery-sketch.png" 
              alt="Cutlery sketch" 
              className="mt-4 w-20 sm:w-24 md:w-28 h-auto mx-auto"
            />
          </div>
        </div>
        {/* Debutant name and date below envelope */}
        <div className="mt-12 sm:mt-16 md:mt-20 text-center couple-name-container">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-script leading-tight"
            style={{ color: '#1e3a5f', fontSize: 'clamp(1.5rem, 4vw, 48px)' }}
          >
            {celebrant.debutant.name.full}
          </h2>
          <p 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-script mt-1"
            style={{ color: '#1e3a5f', fontSize: 'clamp(1rem, 2.5vw, 30px)' }}
          >
            {new Date(weddingConfig.debut.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.')}
          </p>
        </div>
      </section>
    </div>
  )
}

export default OpeningScreen

