import React, { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play } from 'lucide-react'
import { theme } from '../data'
import { celebrant } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const VideoSection = ({ onPauseMusic, onResumeMusic }) => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const gridRef = useRef(null)
  const videoRefs = useRef({})

  const videos = [
    {
      src: "/videos/VID-20251127-WA0000.mp4",
      thumbnail: null, // Can add thumbnail later
      title: "Video 1"
    }
    // Add more videos here as needed
  ]

  // Generate random transforms and animation directions for each video
  const videoTransforms = useMemo(() => {
    return videos.map(() => {
      // Random animation direction: 0=top, 1=bottom, 2=left, 3=right
      const direction = Math.floor(Math.random() * 4)
      let animX = 0
      let animY = 0
      
      if (direction === 0) animY = -50 // From top
      else if (direction === 1) animY = 50 // From bottom
      else if (direction === 2) animX = -50 // From left
      else animX = 50 // From right
      
      return {
        rotation: (Math.random() - 0.5) * 8, // Random rotation between -4 and 4 degrees
        translateX: (Math.random() - 0.5) * 20, // Random translate X between -10 and 10px
        animX, // Animation start X
        animY // Animation start Y
      }
    })
  }, [])

  useEffect(() => {
    // Animate title on scroll
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 50%",
            toggleActions: "play none none none"
          }
        }
      )
    }

    // Optimized animations for video containers
    if (gridRef.current) {
      const children = Array.from(gridRef.current.children)
      let animationQueue = []
      let isAnimating = false
      
      // Set initial states using CSS directly
      children.forEach((child, i) => {
        const index = parseInt(child.getAttribute('data-index') || i)
        const transform = videoTransforms[index]
        
        child.style.opacity = '0'
        child.style.transform = `translate3d(${transform.animX}px, ${transform.animY}px, 0)`
        child.style.willChange = 'transform, opacity'
      })
      
      // Batch animations
      const processQueue = () => {
        if (animationQueue.length === 0 || isAnimating) return
        
        isAnimating = true
        const batch = animationQueue.splice(0, 3)
        
        batch.forEach(({ child, transform }) => {
          gsap.to(child, {
            opacity: 1,
            x: transform.translateX,
            y: 0,
            rotation: transform.rotation,
            duration: 0.4,
            ease: "power1.out",
            force3D: true,
            overwrite: true,
            onComplete: () => {
              child.style.willChange = 'auto'
            }
          })
        })
        
        setTimeout(() => {
          isAnimating = false
          if (animationQueue.length > 0) {
            requestAnimationFrame(processQueue)
          }
        }, 50)
      }
      
      // Check if video is loaded
      const isVideoLoaded = (container) => {
        const video = container.querySelector('video')
        if (!video) return false
        return video.readyState >= 2 // HAVE_CURRENT_DATA
      }
      
      const waitForVideoAndAnimate = (child, transform) => {
        const video = child.querySelector('video')
        
        if (!video) {
          animationQueue.push({ child, transform })
          requestAnimationFrame(processQueue)
          return
        }
        
        if (isVideoLoaded(child)) {
          animationQueue.push({ child, transform })
          requestAnimationFrame(processQueue)
        } else {
          const onVideoCanPlay = () => {
            animationQueue.push({ child, transform })
            requestAnimationFrame(processQueue)
            video.removeEventListener('canplay', onVideoCanPlay)
            video.removeEventListener('error', onVideoCanPlay)
          }
          
          video.addEventListener('canplay', onVideoCanPlay)
          video.addEventListener('error', onVideoCanPlay)
          
          if (video.readyState >= 2) {
            onVideoCanPlay()
          } else {
            setTimeout(() => {
              if (isVideoLoaded(child)) {
                onVideoCanPlay()
              }
            }, 100)
          }
        }
      }
      
      // Intersection Observer
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const child = entry.target
              const index = parseInt(child.getAttribute('data-index') || 0)
              const transform = videoTransforms[index]
              
              observer.unobserve(child)
              waitForVideoAndAnimate(child, transform)
            }
          })
        },
        { 
          threshold: 0.2,
          rootMargin: '50px'
        }
      )
      
      children.forEach(child => observer.observe(child))
      
      return () => {
        observer.disconnect()
        animationQueue = []
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    } else {
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    }
  }, [videoTransforms])

  const handleVideoClick = (index) => {
    const video = videoRefs.current[index]
    if (video) {
      if (video.paused) {
        video.play()
        // Pause background music when video starts playing
        if (onPauseMusic) onPauseMusic()
      } else {
        video.pause()
        // Resume background music when video is paused
        if (onResumeMusic) onResumeMusic()
      }
    }
  }

  // Hide/show play overlay based on video state and control background music
  useEffect(() => {
    const handleVideoPlay = (index) => {
      const video = videoRefs.current[index]
      const container = video?.closest('.video-grid-item')
      const overlay = container?.querySelector('.video-play-overlay')
      if (overlay) {
        overlay.style.opacity = '0'
        overlay.style.pointerEvents = 'none'
      }
      // Pause background music when video starts playing
      if (onPauseMusic) onPauseMusic()
    }
    
    const handleVideoPause = (index) => {
      const video = videoRefs.current[index]
      const container = video?.closest('.video-grid-item')
      const overlay = container?.querySelector('.video-play-overlay')
      if (overlay) {
        overlay.style.opacity = '1'
      }
      // Resume background music when video is paused
      if (onResumeMusic) onResumeMusic()
    }

    const handleVideoEnded = (index) => {
      // Resume background music when video ends
      if (onResumeMusic) onResumeMusic()
    }
    
    // Add event listeners to all videos
    const cleanupFunctions = []
    Object.keys(videoRefs.current).forEach((indexStr) => {
      const index = parseInt(indexStr)
      const video = videoRefs.current[index]
      if (video) {
        const playHandler = () => handleVideoPlay(index)
        const pauseHandler = () => handleVideoPause(index)
        const endedHandler = () => handleVideoEnded(index)
        video.addEventListener('play', playHandler)
        video.addEventListener('pause', pauseHandler)
        video.addEventListener('ended', endedHandler)
        cleanupFunctions.push(() => {
          video.removeEventListener('play', playHandler)
          video.removeEventListener('pause', pauseHandler)
          video.removeEventListener('ended', endedHandler)
        })
      }
    })
    
    return () => {
      cleanupFunctions.forEach(cleanup => cleanup())
    }
  }, [videos, onPauseMusic, onResumeMusic])

  return (
    <>
      <section
        ref={sectionRef}
        className="relative pt-20 pb-20 w-full"
      >
        {/* Rose Gold Purple Background */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/graphics/rose-gold-pupr-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        {/* Crumpled Paper Background on top */}
        <div 
          className="absolute inset-0 opacity-30 z-10"
          style={{
            backgroundImage: 'url(/images/crumpled-paper.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        <div className={`relative z-20 flex flex-col items-center`} style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
          {/* Title */}
          <div ref={titleRef} className="text-center mb-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-antsvalley" style={{ color: '#4b2259' }}>
              Introducing
            </h2>
          </div>

          {/* Video Grid - Polaroid Style */}
          <div className={`w-full max-w-7xl mx-auto px-4 ${theme.container.padding}`}>
            <div 
              ref={gridRef}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              style={{ overflow: 'visible' }}
            >
              {videos.map((video, index) => {
                const transform = videoTransforms[index]
                return (
                  <div
                    key={index}
                    className="group cursor-pointer video-grid-item"
                    data-index={index}
                    style={{
                      willChange: 'transform, opacity',
                      width: '100%',
                      overflow: 'visible'
                    }}
                    onClick={() => handleVideoClick(index)}
                  >
                    <div className="w-full bg-white shadow-2xl transition-transform duration-300 p-0 flex flex-col relative" style={{ overflow: 'visible' }}>
                      {/* Butterfly at top right of video container */}
                      <img 
                        src="/images/graphics/butterfly-half-left.png" 
                        alt="Butterfly" 
                        className="absolute top-0 right-0 z-10"
                        style={{ 
                          width: 'min(22vw, 350px)',
                          height: 'auto',
                          transform: 'translate(40%, -40%)'
                        }}
                      />
                      <div 
                        className="border-l-8 border-r-8 border-t-8 border-white overflow-hidden relative" 
                        style={{ 
                          boxSizing: 'border-box',
                          width: '100%'
                        }}
                      >
                        <video
                          ref={(el) => { videoRefs.current[index] = el }}
                          src={video.src}
                          className="w-full h-auto object-contain"
                          playsInline
                          preload="metadata"
                          loop
                          style={{
                            display: 'block',
                            maxWidth: '100%',
                            height: 'auto'
                          }}
                        />
                        {/* Play Button Overlay - Only show when paused */}
                        <div 
                          className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-300 pointer-events-none video-play-overlay"
                          style={{
                            opacity: 1
                          }}
                        >
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-8 h-8 text-gray-800 ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </div>
                      <div className="bg-white" style={{ height: '0.75rem' }}></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default VideoSection

