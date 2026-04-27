import React from 'react'
import { celebrant } from '../data'

const IntroSection = () => {
  return (
    <section className="relative w-full px-4 sm:px-6 py-10 overflow-hidden" style={{ background: '#fdece4' }}>
      <img
        src="/images/graphics/side-divider.png"
        alt="Decorative divider"
        className="absolute top-0 left-0 h-auto pointer-events-none z-10"
        style={{ width: 'clamp(90px, 20vw, 180px)' }}
      />
      <div className="max-w-sm mx-auto">
        <div className="bg-[#fffaf6] overflow-hidden border border-[#efc5c8]">
          <div className="px-5 py-5 text-center">
            <h2 className="leading-none mb-3">
              <span className="block font-halimun text-5xl" style={{ color: '#E28B91' }}>
                hello
              </span>
              <span className="block font-rozha text-5xl lowercase mt-1" style={{ color: '#E28B91' }}>
                friends.
              </span>
            </h2>
            <p className="font-senja-santuy text-3xl leading-snug" style={{ color: '#d7878e' }}>
              I am so excited to celebrate my special day with you.
              Thank you for being part of my journey.
            </p>
            <p className="font-rozha text-sm uppercase tracking-[0.2em] mt-4" style={{ color: '#E28B91' }}>
              {celebrant.debutant.name.full}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntroSection
