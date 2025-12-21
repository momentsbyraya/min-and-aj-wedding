import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { X, Building, CreditCard, Smartphone } from 'lucide-react'
import { paymentMethods as paymentMethodsData } from '../data'
import { theme } from '../data'

const GiftModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  const { paymentMethods } = paymentMethodsData

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
                    <div className="flex items-center justify-center mb-4">
                      {method.image ? (
                        <img 
                          src={method.image} 
                          alt={method.name} 
                          className="w-12 h-12 object-contain"
                          style={{ borderRadius: '50%' }}
                        />
                      ) : (
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center`} style={{ backgroundColor: theme.colors.primary, opacity: 0.1 }}>
                          {method.icon === 'Building' && <Building className="w-6 h-6" style={{ color: theme.colors.primary }} />}
                          {method.icon === 'CreditCard' && <CreditCard className="w-6 h-6" style={{ color: theme.colors.primary }} />}
                          {method.icon === 'Smartphone' && <Smartphone className="w-6 h-6" style={{ color: theme.colors.primary }} />}
                        </div>
                      )}
                    </div>
                    
                    <h4 className="text-lg sm:text-xl font-poppins uppercase mb-2" style={{ color: theme.colors.primary, fontWeight: 700 }}>{method.name}</h4>
                    
                    {/* QR Code - Only show if qrCode is provided */}
                    {method.accountInfo.qrCode && (
                      <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                        <img 
                          src={method.accountInfo.qrCode} 
                          alt="QR Code" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    
                    <div className="my-3">
                      <div className="w-full h-px bg-gray-300 mb-2"></div>
                      <p className="font-poppins text-center" style={{ color: theme.colors.primary, fontWeight: 600, fontSize: '1.5rem' }}>{method.accountInfo.accountNumber}</p>
                      <div className="w-full h-px bg-gray-300 mt-2"></div>
                      <p className="font-poppins text-center mt-2" style={{ color: theme.colors.primary, fontWeight: 500, fontSize: '1rem', opacity: 0.8 }}>{method.accountInfo.accountName}</p>
                    </div>
                    
                    {/* Account Information */}
                    {method.accountInfo.bank && (
                      <div className="text-left space-y-2 font-poppins" style={{ color: theme.colors.primary, fontWeight: 500, fontSize: '1rem' }}>
                        <p><span style={{ fontWeight: 600 }}>Bank:</span> {method.accountInfo.bank}</p>
                      </div>
                    )}
                  </div>
                )
              })()}
            </div>
          )}
          
          {paymentMethods.length > 0 && paymentMethods[0].accountInfo.qrCode && (
            <div className="mt-8 text-center">
              <p className="text-sm sm:text-base font-poppins" style={{ color: theme.colors.primary, fontWeight: 500 }}>
                Scan the QR code with your banking app or use the account details above for manual transfer.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default GiftModal

