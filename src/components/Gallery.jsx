import React from 'react'
import { theme } from '../data'

const Gallery = () => {
  const prenupImages = [
    '/assets/images/prenup/prenup-1.jpg',
    '/assets/images/prenup/prenup-2.jpg',
    '/assets/images/prenup/prenup-3.jpg',
    '/assets/images/prenup/prenup-4.jpg',
    '/assets/images/prenup/prenup-5.jpg',
    '/assets/images/prenup/prenup-6.jpg',
    '/assets/images/prenup/prenup-7.jpg',
    '/assets/images/prenup/prenup-8.jpg',
    '/assets/images/prenup/prenup-9.jpg',
    '/assets/images/prenup/prenup-10.jpg'
  ]

  return (
    <section
      className="relative w-full flex flex-col"
      style={{ 
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      {/* Pseudo-element Background - Primary Color */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '60%',
          backgroundColor: theme.colors.primary,
          zIndex: 0
        }}
      />

      {/* Content Container */}
      <div 
        className="w-full flex flex-col relative z-10"
        style={{ 
          padding: '2rem 0'
        }}
      >
        {/* Title Section */}
        <div className="text-center mb-8">
          {/* Camera Icon */}
          <div className="flex justify-center mb-4">
            <img 
              src="/assets/images/graphics/camera.png" 
              alt="Camera" 
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
          
          {/* CAPTURED text - smooth circular arch downward */}
          <div 
            className="text-xs sm:text-sm uppercase mb-2 font-poppins"
            style={{ 
              color: '#f5f1eb', 
              letterSpacing: '0.05em',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {'CAPTURED'.split('').map((letter, index) => {
              const totalLetters = 8
              const centerIndex = (totalLetters - 1) / 2
              const offset = index - centerIndex
              
              // Circular arch parameters
              const radius = 30 // Radius of the circle (adjust for arch depth)
              const maxAngle = Math.PI / 5 // 36 degrees total arc (adjust for arch width)
              const angle = (offset / centerIndex) * maxAngle
              
              // Calculate position on circle
              const x = radius * Math.sin(angle)
              const y = radius * (1 - Math.cos(angle)) // Downward arch
              const rotation = (angle * 180) / Math.PI // Convert to degrees
              
              return (
                <span
                  key={index}
                  style={{
                    display: 'inline-block',
                    fontFamily: "'Poppins', sans-serif",
                    position: 'relative',
                    transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
                    transformOrigin: 'center bottom',
                    marginRight: '-0.1em'
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              )
            })}
          </div>
          
          {/* THE GALLERY with sparkles */}
          <div className="flex items-center justify-center gap-3 mb-2" style={{ marginTop: '2rem' }}>
            <img 
              src="/assets/images/graphics/sparkle.png" 
              alt="Sparkle" 
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              style={{ alignSelf: 'center', filter: 'brightness(0) invert(1)' }}
            />
            <h2 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-tebranos"
              style={{ 
                color: '#f5f1eb',
                fontWeight: 900,
                lineHeight: '1'
              }}
            >
              THE GALLERY
            </h2>
            <img 
              src="/assets/images/graphics/sparkle.png" 
              alt="Sparkle" 
              className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
              style={{ alignSelf: 'center', filter: 'brightness(0) invert(1)' }}
            />
          </div>
          
          {/* Moments in Ballet font */}
          <h3 
            className="text-5xl sm:text-6xl md:text-7xl font-ballet"
            style={{ color: '#f5f1eb', marginTop: '-1rem' }}
          >
            Moments
          </h3>
        </div>

        {/* Horizontal Scrollable Images */}
        <div 
          className="w-full overflow-x-auto"
          style={{ 
            scrollbarWidth: 'thin',
            scrollbarColor: `${theme.colors.primary} transparent`
          }}
        >
          <div className="flex gap-4 px-4" style={{ width: 'max-content' }}>
            {prenupImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Prenup ${index + 1}`}
                className="flex-shrink-0 object-cover"
                style={{
                  width: '80vw',
                  maxWidth: '450px',
                  height: 'auto'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery 