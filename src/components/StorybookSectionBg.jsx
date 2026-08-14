import React, { useMemo } from 'react'

/**
 * Wedding-rosetta style layered old-book background + soft white edge fades.
 * variant: "book" (default) | "calligraphy" | "plain"
 */
const StorybookSectionBg = ({ variant = 'book', calligraphyOpacity = 0.15 }) => {
  const bookBase = useMemo(() => {
    const posX = Math.random() * 100
    const posY = Math.random() * 100
    const rotation = Math.random() * 360 - 180
    const flipX = Math.random() > 0.5 ? -1 : 1
    const flipY = Math.random() > 0.5 ? -1 : 1
    return {
      backgroundImage: 'url(/images/graphics/old-book-2.png)',
      backgroundSize: 'cover',
      backgroundPosition: `${posX}% ${posY}%`,
      transform: `rotate(${rotation}deg) scaleX(${flipX}) scaleY(${flipY})`,
      opacity: 0.75
    }
  }, [])

  const bookTop = useMemo(() => {
    const posX = Math.random() * 100
    const posY = Math.random() * 100
    const rotation = Math.random() * 360 - 180
    const flipX = Math.random() > 0.5 ? -1 : 1
    const flipY = Math.random() > 0.5 ? -1 : 1
    return {
      backgroundImage: 'url(/images/graphics/old-book-bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: `${posX}% ${posY}%`,
      transform: `rotate(${rotation}deg) scaleX(${flipX}) scaleY(${flipY})`,
      opacity: 0.5
    }
  }, [])

  return (
    <>
      {variant === 'book' && (
        <>
          <div
            className="absolute bg-no-repeat pointer-events-none"
            style={{
              ...bookBase,
              width: '200%',
              height: '200%',
              left: '-50%',
              top: '-50%'
            }}
            aria-hidden
          />
          <div
            className="absolute bg-no-repeat pointer-events-none"
            style={{
              ...bookTop,
              width: '200%',
              height: '200%',
              left: '-50%',
              top: '-50%'
            }}
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
        className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#FFF9F5]/70 to-transparent pointer-events-none z-10"
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FFF9F5]/70 to-transparent pointer-events-none z-10"
        aria-hidden
      />
    </>
  )
}

export default StorybookSectionBg
