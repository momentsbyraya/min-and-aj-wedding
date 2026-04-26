import React from 'react'
import { celebrant } from '../data'

const IntroSection = () => {
  return (
    <section className="w-full px-4 sm:px-6 py-10" style={{ background: '#fff5f3' }}>
      <div className="max-w-sm mx-auto">
        <div className="bg-[#fffaf6] overflow-hidden">
          <div className="relative h-40 bg-[#fffaf6]">
            <div
              className="absolute"
              style={{
                width: '170%',
                height: '170%',
                left: '-35%',
                top: '-128%',
                border: '14px solid #f7aab3',
                borderRadius: '50%'
              }}
            />
          </div>

          <div className="h-[1px] bg-[#efc5c8]" />

          <div className="px-5 py-5 text-center">
            <h2 className="font-my-soul text-5xl leading-none mb-3" style={{ color: '#E28B91' }}>
              hello friends,
            </h2>
            <p className="font-my-soul text-3xl leading-snug" style={{ color: '#d7878e' }}>
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
