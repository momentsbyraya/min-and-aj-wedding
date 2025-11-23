import React from 'react'
import { useLazyLoading } from '../hooks/useLazyLoading'

const LazySection = ({ children, className = '', threshold = 0.5, placeholder = null }) => {
  const { elementRef, isVisible, isLoaded } = useLazyLoading(threshold)

  return (
    <section 
      ref={elementRef} 
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {isVisible ? (
        <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {children}
        </div>
      ) : (
        placeholder || (
          <div className="min-h-[200px] flex items-center justify-center">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-48 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
        )
      )}
    </section>
  )
}

export default LazySection 