import React from 'react'
import { dresscode } from '../data'

const DressCode = () => {
  return (
    <section
      className="relative py-20 w-full overflow-hidden"
      style={{ backgroundColor: '#fdece4' }}
    >
      <img
        src="/images/graphics/flower.png"
        alt=""
        aria-hidden="true"
        className="absolute top-[16%] left-[8%] w-14 opacity-30 blur-[2px] pointer-events-none z-0"
      />
      <img
        src="/images/graphics/flower-2.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-[14%] right-[8%] w-20 opacity-25 blur-[3px] pointer-events-none z-0"
      />
      <div className="relative z-20 w-full max-w-md mx-auto px-4 text-center">
        <h2 className="font-rozha text-5xl lowercase leading-none mb-1" style={{ color: '#c86f78' }}>
          dresscode.
        </h2>
        <p
          className="font-halimun text-xl mb-6 leading-none w-fit"
          style={{ color: '#E28B91', marginLeft: 'calc(70% - 12px)', marginTop: '-10px', marginBottom: '24px' }}
        >
          note
        </p>

        <div className="flex justify-center">
          <div className="w-full max-w-[220px] overflow-hidden">
            <img
              src="/images/dresscode/guests.png"
              alt="Dress code"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span title="Navy Blue" className="inline-block w-8 h-8 rounded-full border border-white/70" style={{ backgroundColor: '#1f3a6e' }} />
          <span title="Black" className="inline-block w-8 h-8 rounded-full border border-white/70" style={{ backgroundColor: '#000000' }} />
          <span title="White" className="inline-block w-8 h-8 rounded-full border border-white/70" style={{ backgroundColor: '#ffffff' }} />
        </div>

        <p className="font-poppins text-sm leading-relaxed mt-6" style={{ color: '#B76E79' }}>
          {dresscode.mainDressCode.description}
        </p>
      </div>
    </section>
  )
}

export default DressCode 