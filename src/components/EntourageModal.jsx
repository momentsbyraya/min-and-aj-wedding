import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { FiX } from 'react-icons/fi'
import { entourage } from '../data'

const EntourageModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return undefined
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const list = entourage?.entourageList || []

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#6F4A52]/55 backdrop-blur-sm" onClick={onClose} aria-hidden />

      <div className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl bg-[#FFF9F5] border border-[#D8A7B1]/40 shadow-xl">
        <div
          className="pointer-events-none absolute inset-0 opacity-25 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/graphics/blush-wash-bg.png')" }}
          aria-hidden
        />

        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-[#D8A7B1]/35 bg-[#FFF9F5]/92 backdrop-blur-sm rounded-t-2xl">
          <h3 className="text-2xl sm:text-3xl font-leckerli text-[#6F4A52]">Entourage</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-[#9B737C] hover:text-[#6F4A52] transition-colors duration-200"
            aria-label="Close entourage"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="relative z-10 p-6 sm:p-8 space-y-8">
          {list.map((group) => (
            <div key={group.category} className="text-center">
              <h4 className="text-lg sm:text-xl alice-regular text-[#9B737C] mb-3 tracking-wide">
                {group.category}
              </h4>
              <div className="w-16 h-px bg-[#D8A7B1] mx-auto mb-4" />
              <ul className="space-y-1.5">
                {(group.names || []).map((name) => (
                  <li key={name} className="font-lavishly text-lg sm:text-xl text-[#6F4A52]">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default EntourageModal
