import React, { useState, useEffect } from 'react'
import Loader from './Loader'

const Preloader = ({ onComplete }) => {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const maxWaitMs = 12000
    let finished = false
    let forceTimer = 0

    const complete = () => {
      if (finished) return
      finished = true
      window.clearTimeout(forceTimer)
      setLoading(false)
      setTimeout(() => onComplete?.(), 500)
    }

    forceTimer = window.setTimeout(() => complete(), maxWaitMs)

    // List of critical images to preload
    const criticalImages = [
      // Hero background image (most important)
      '/images/prenup/DSC01333.jpg',
      // First few gallery images for better UX
      '/images/prenup/DSC01372.jpg',
      '/images/prenup/DSC01288.jpg',
      '/images/prenup/DSC01381.jpg',
      '/images/prenup/DSC01394.jpg',
    ]

    let loadedCount = 0
    const totalImages = criticalImages.length
    const imagePromises = []

    // Function to preload a single image
    const preloadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        
        img.onload = () => {
          loadedCount++
          const newProgress = Math.round((loadedCount / totalImages) * 100)
          setProgress(newProgress)
          resolve(img)
        }
        
        img.onerror = () => {
          loadedCount++
          const newProgress = Math.round((loadedCount / totalImages) * 100)
          setProgress(newProgress)
          // Still resolve even if image fails to load
          resolve(null)
        }
        
        // Start loading the image
        img.src = src
      })
    }

    // Preload all images
    const loadAllImages = async () => {
      try {
        // Create promises for all images
        criticalImages.forEach(src => {
          imagePromises.push(preloadImage(src))
        })

        // Wait for all images to load (or fail)
        await Promise.all(imagePromises)

        // Ensure hero image is fully loaded and rendered
        // Create a temporary image element to ensure it's in browser cache
        const heroImg = new Image()
        heroImg.src = '/images/prenup/DSC01333.jpg'
        
        await new Promise((resolve) => {
          if (heroImg.complete) {
            // Image already loaded
            resolve()
          } else {
            heroImg.onload = () => resolve()
            heroImg.onerror = () => resolve() // Continue even if it fails
          }
        })

        // Small delay to ensure everything is ready
        await new Promise(resolve => setTimeout(resolve, 300))

        complete()

      } catch (error) {
        console.error('Error preloading images:', error)
        complete()
      }
    }

    loadAllImages()

    return () => {
      window.clearTimeout(forceTimer)
    }
  }, [onComplete])

  if (!loading) {
    return null
  }

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
      style={{
        opacity: loading ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
        pointerEvents: loading ? 'auto' : 'none'
      }}
    >
      <Loader />
    </div>
  )
}

export default Preloader

