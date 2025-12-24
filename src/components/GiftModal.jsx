import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { X, Building, CreditCard, Smartphone, Copy, Check } from 'lucide-react'
import { paymentMethods as paymentMethodsData } from '../data'
import { theme } from '../data'

const GiftModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const [copied, setCopied] = useState(false)

  const { paymentMethods } = paymentMethodsData

  const handleCopyAccountNumber = async () => {
    if (paymentMethods.length > 0) {
      const accountNumber = paymentMethods[0].accountInfo.accountNumber
      try {
        await navigator.clipboard.writeText(accountNumber)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
  }

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
      
      // Modal entrance animation
      gsap.set([overlayRef.current, contentRef.current], { opacity: 0 })
      gsap.set(contentRef.current, { scale: 0.8, y: 50 })
      
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" })
      gsap.to(contentRef.current, { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: 0.4, 
        ease: "back.out(1.7)" 
      })
    } else {
      // Re-enable body scroll when modal is closed
      document.body.style.overflow = 'unset'
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    // Modal exit animation
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: "power2.out" })
    gsap.to(contentRef.current, { 
      opacity: 0, 
      scale: 0.8, 
      y: 50, 
      duration: 0.3, 
      ease: "power2.out" 
    }).then(() => {
      onClose()
    })
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose()
    }
  }

  if (!isOpen) return null

  return createPortal(
    <div
      ref={modalRef}
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 9999 }}
    >
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleOverlayClick}
      />
      
      {/* Modal Content */}
      <div
        ref={contentRef}
        className="relative bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        style={{
          border: `0.5px solid ${theme.colors.primary}`,
          outline: `0.5px solid ${theme.colors.primary}`,
          outlineOffset: '-5px',
          borderRadius: 0
        }}
      >
        {/* Header - Sticky */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-200" style={{ borderRadius: 0 }}>
          <h3 className="text-2xl sm:text-3xl font-poppins uppercase" style={{ color: theme.colors.primary, fontWeight: 700 }}>Methods:</h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {paymentMethods.length > 0 && (
            <div className="max-w-md mx-auto">
              {(() => {
                const method = paymentMethods[0]
                return (
                  <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
                    {/* QR Code - Only show if qrCode is provided */}
                    {method.accountInfo.qrCode && (
                      <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto mb-4 flex items-center justify-center bg-white p-4 rounded-lg border border-gray-200">
                        <img 
                          src={method.accountInfo.qrCode} 
                          alt="QR Code" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    
                    <div className="my-3">
                      <div className="w-full h-px bg-gray-300 mb-2"></div>
                      <div className="flex items-center justify-center gap-2 relative">
                        <p className="font-poppins text-center" style={{ color: theme.colors.primary, fontWeight: 600, fontSize: '1rem' }}>{method.accountInfo.accountNumber}</p>
                        <div className="relative">
                          <button
                            onClick={handleCopyAccountNumber}
                            className="flex items-center justify-center p-1 hover:opacity-70 transition-opacity"
                            style={{ color: theme.colors.primary }}
                            title="Copy account number"
                          >
                            {copied ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                          {copied && (
                            <div 
                              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 rounded bg-gray-800 text-white text-xs font-poppins whitespace-nowrap z-10"
                              style={{ pointerEvents: 'none' }}
                            >
                              Copied
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="w-full h-px bg-gray-300 mt-2"></div>
                      <p className="font-poppins text-center mt-2" style={{ color: theme.colors.primary, fontWeight: 500, fontSize: '1rem', opacity: 0.8 }}>{method.accountInfo.accountName}</p>
                    </div>
                  </div>
                )
              })()}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default GiftModal

