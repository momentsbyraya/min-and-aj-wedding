import React, { useMemo } from 'react'

/**
 * Layered textured background for invitation sections.
 * Always fills with blush pink first so rotated textures never leave white gaps.
 * variant: "book" (default) | "calligraphy" | "plain"
 */
const StorybookSectionBg = ({
  variant = 'book',
  calligraphyOpacity = 0.15,
  baseColor = '#F0C9CE',
  fadeColor = '#F7E0E3'
}) => {
  const bookBase = useMemo(() => {
    const posX = Math.random() * 100
    const posY = Math.random() * 100
    return {
      backgroundImage: 'url(/images/graphics/old-book-2.png)',
      backgroundSize: 'cover',
      backgroundPosition: `${posX}% ${posY}%`,
      opacity: 0.55
    }
  }, [])

  const bookTop = useMemo(() => {
    const posX = Math.random() * 100
    const posY = Math.random() * 100
    return {
      backgroundImage: 'url(/images/graphics/old-book-bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: `${posX}% ${posY}%`,
      opacity: 0.35
    }
  }, [])

  return (
    <>
      {/* Solid blush fill — prevents white wedges behind textures */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: baseColor }}
        aria-hidden
      />

      {variant === 'book' && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
            style={bookBase}
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
            style={bookTop}
            aria-hidden
          />
        </>
      )}
      {variant === 'calligraphy' && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: 'url(/images/graphics/calligraphy-bg.png)',
            opacity: calligraphyOpacity
          }}
          aria-hidden
        />
      )}
      <div
        className="absolute top-0 left-0 right-0 h-28 pointer-events-none z-10"
        style={{
          background: `linear-gradient(to bottom, ${fadeColor} 0%, transparent 100%)`
        }}
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-10"
        style={{
          background: `linear-gradient(to top, ${fadeColor} 0%, transparent 100%)`
        }}
        aria-hidden
      />
    </>
  )
}

export default StorybookSectionBg
