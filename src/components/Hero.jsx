import React from 'react'

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <img
        src="/images/graphics/bg-2.png"
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <img
        src="/images/graphics/opening-2.png"
        alt="Hero overlay"
        className="absolute inset-0 w-full h-full object-cover z-[6]"
      />
      <img
        src="/images/graphics/flower-1.png"
        alt="Flower decoration"
        className="absolute top-0 left-0 h-auto z-20 pointer-events-none -scale-x-100"
        style={{ width: '60vw' }}
      />
      <img
        src="/images/graphics/flower-2.png"
        alt="Flower decoration"
        className="absolute bottom-0 right-0 h-auto z-20 pointer-events-none -scale-x-100"
        style={{ width: '100vw' }}
      />
      <div className="absolute bottom-0 left-0 z-10 pointer-events-none" style={{ width: '80vw' }}>
        <div className="flex flex-col items-center justify-center w-full">
          <p
            className="font-rozha uppercase tracking-[0.15em] text-center mb-[-0.35em] leading-none"
            style={{
              color: '#E28B91',
              fontSize: 'clamp(1.2rem, 3vw, 2.4rem)',
              lineHeight: 1
            }}
          >
            YOU ARE INVITED TO
          </p>
          <img
            src="/images/graphics/18.png"
            alt="18"
            className="w-full h-auto block"
          />
          <p
            className="font-rozha uppercase tracking-[0.2em] text-center mt-[-0.35em] leading-none"
            style={{
              color: '#E28B91',
              fontSize: 'clamp(1.6rem, 4.4vw, 3.8rem)',
              lineHeight: 1
            }}
          >
            BIRTHDAY
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero


