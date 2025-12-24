import React, { useState, useEffect, useRef } from 'react'
import { Play, Pause } from 'lucide-react'
import { gsap } from 'gsap'
import { theme, audio } from '../data'

const Hero = ({ onStartMusic, onPauseMusic, onResumeMusic }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const audioRef = useRef(null)
  const tennisBallLeftRef = useRef(null)
  const tennisBallRightRef = useRef(null)
  const tennisImageRef = useRef(null)
  const presentingRef = useRef(null)
  const sparkleLeftRef = useRef(null)
  const sparkleRightRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const musicPlayerRef = useRef(null)

  // Array of prenup images - starting with main cover
  const heroImages = [
    '/assets/images/prenup/Main%20Cover%20-%20Amanda%20Ira.jpg',
    '/assets/images/prenup/prenup1.jpg',
    '/assets/images/prenup/prenup2.jpg',
    '/assets/images/prenup/prenup3.jpg',
    '/assets/images/prenup/prenup4.jpg',
    '/assets/images/prenup/prenup5.jpg',
    '/assets/images/prenup/prenup6.jpg',
    '/assets/images/prenup/prenup7.jpg'
  ]

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio(audio.background)
    audioRef.current.loop = audio.loop
    audioRef.current.volume = audio.volume

    // Listen to audio events to update state
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)

    audioRef.current.addEventListener('play', handlePlay)
    audioRef.current.addEventListener('pause', handlePause)
    audioRef.current.addEventListener('ended', handleEnded)

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('play', handlePlay)
        audioRef.current.removeEventListener('pause', handlePause)
        audioRef.current.removeEventListener('ended', handleEnded)
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Auto-slide images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [heroImages.length])

  // On-load animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    // Tennis balls slide in from corners
    if (tennisBallLeftRef.current) {
      tl.fromTo(tennisBallLeftRef.current,
        { opacity: 0, x: -30, y: -30 },
        { opacity: 0.75, x: 0, y: 0, duration: 0.8, ease: "power2.out" }
      )
    }
    
    if (tennisBallRightRef.current) {
      tl.fromTo(tennisBallRightRef.current,
        { opacity: 0, x: 30, y: -30 },
        { opacity: 0.75, x: 0, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6" // Start slightly after left ball
      )
    }

    // Tennis image scales up and fades in
    if (tennisImageRef.current) {
      tl.fromTo(tennisImageRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.4"
      )
    }

    // PRESENTING text fade in and slide up
    if (presentingRef.current) {
      tl.fromTo(presentingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      )
    }

    // Sparkles scale up and fade in
    if (sparkleLeftRef.current) {
      tl.fromTo(sparkleLeftRef.current,
        { opacity: 0, scale: 0, rotation: -180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.3"
      )
    }

    if (sparkleRightRef.current) {
      tl.fromTo(sparkleRightRef.current,
        { opacity: 0, scale: 0, rotation: 180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.6"
      )
    }

    // Main title slides up and fades in
    if (titleRef.current) {
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
    }

    // Subtitle slides up and fades in
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
    }

    // Music player fades in from bottom
    if (musicPlayerRef.current) {
      tl.fromTo(musicPlayerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      )
    }
  }, [])

  const handleMusicToggle = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      if (onPauseMusic) onPauseMusic()
    } else {
      // Start or resume music
      if (audioRef.current.paused) {
        audioRef.current.currentTime = 41.15 // Start at specific time
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error)
        })
        setIsPlaying(true)
        if (onStartMusic) onStartMusic()
      } else {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error)
        })
        setIsPlaying(true)
        if (onResumeMusic) onResumeMusic()
      }
    }
  }
  return (
    <>
      <style>{`
        .tennis-court-lines::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          background-image: 
            /* Outer border */
            linear-gradient(to right, rgba(245, 241, 235, 0.25) 0%, rgba(245, 241, 235, 0.25) 100%),
            linear-gradient(to right, rgba(245, 241, 235, 0.25) 0%, rgba(245, 241, 235, 0.25) 100%),
            linear-gradient(to bottom, rgba(245, 241, 235, 0.25) 0%, rgba(245, 241, 235, 0.25) 100%),
            linear-gradient(to bottom, rgba(245, 241, 235, 0.25) 0%, rgba(245, 241, 235, 0.25) 100%),
            /* Center net line (horizontal) */
            linear-gradient(to right, rgba(245, 241, 235, 0.3) 0%, rgba(245, 241, 235, 0.3) 100%),
            /* Service lines (horizontal) */
            linear-gradient(to right, rgba(245, 241, 235, 0.2) 0%, rgba(245, 241, 235, 0.2) 100%),
            linear-gradient(to right, rgba(245, 241, 235, 0.2) 0%, rgba(245, 241, 235, 0.2) 100%);
          background-size: 
            100% 2px,
            100% 2px,
            2px 100%,
            2px 100%,
            100% 1px,
            100% 1px,
            100% 1px;
          background-position: 
            0 0,
            0 100%,
            0 0,
            100% 0,
            center 50%,
            center 10%,
            center 85%;
          background-repeat: no-repeat;
          pointer-events: none;
        }
        .tennis-court-lines::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          background-image: 
            /* Center vertical line (from net to service line) */
            linear-gradient(to bottom, rgba(245, 241, 235, 0.2) 0%, rgba(245, 241, 235, 0.2) 100%),
            /* Doubles alley lines (vertical) */
            linear-gradient(to bottom, rgba(245, 241, 235, 0.15) 0%, rgba(245, 241, 235, 0.15) 100%),
            linear-gradient(to bottom, rgba(245, 241, 235, 0.15) 0%, rgba(245, 241, 235, 0.15) 100%);
          background-size: 
            1px 50%,
            1px 100%,
            1px 100%;
          background-position: 
            center 10%,
            12.5% 0,
            87.5% 0;
          background-repeat: no-repeat;
          pointer-events: none;
        }
      `}</style>
    <section
      className="relative min-h-screen w-full overflow-hidden tennis-court-lines"
      style={{ 
        backgroundColor: theme.colors.primary,
        position: 'relative'
      }}
    >
      {/* Image Carousel Background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transition: 'opacity 1s ease-in-out'
        }}
      >
        {heroImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: index === currentImageIndex ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              zIndex: 0
            }}
          />
        ))}
      </div>
      {/* Primary Color Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: theme.colors.primary,
          opacity: 0.6,
          zIndex: 1
        }}
      ></div>

      {/* Tennis balls at top corners */}
      <div className="absolute top-8 left-8 z-20" ref={tennisBallLeftRef}>
        <img 
          src="/assets/images/graphics/tennis-ball-white.png" 
          alt="Tennis ball" 
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain"
          style={{ opacity: 0.75 }}
        />
      </div>
      <div className="absolute top-8 right-8 z-20" ref={tennisBallRightRef}>
        <img 
          src="/assets/images/graphics/tennis-ball-white.png" 
          alt="Tennis ball" 
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain"
          style={{ opacity: 0.75 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center mb-8">
          {/* Tennis Image on Top */}
          <div className="flex justify-center mb-4">
            <img 
              ref={tennisImageRef}
              src="/assets/images/graphics/tennis.png" 
              alt="Tennis" 
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
          
          {/* PRESENTING text - plain text */}
          <div 
            ref={presentingRef}
            className="text-xs sm:text-sm uppercase mb-2 font-poppins text-center"
            style={{ 
              color: '#f5f1eb', 
              letterSpacing: '0.05em',
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            PRESENTING
          </div>
          
          {/* AMANDA IRA with sparkles */}
          <div className="flex items-center justify-center gap-3 mb-2" style={{ marginTop: '2rem' }}>
            <img 
              ref={sparkleLeftRef}
              src="/assets/images/graphics/sparkle.png" 
              alt="Sparkle" 
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain"
              style={{ alignSelf: 'center', filter: 'brightness(0) saturate(100%) invert(9%) sepia(100%) saturate(7200%) hue-rotate(325deg) brightness(90%) contrast(90%)' }}
            />
            <h1 
              ref={titleRef}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-tebranos"
              style={{ 
                color: '#f5f1eb',
                fontWeight: 900,
                lineHeight: '1',
                fontSize: 'clamp(4.5rem, 11vw, 8rem)'
              }}
            >
              AMANDA IRA
            </h1>
            <img 
              ref={sparkleRightRef}
              src="/assets/images/graphics/sparkle.png" 
              alt="Sparkle" 
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain"
              style={{ alignSelf: 'center', filter: 'brightness(0) saturate(100%) invert(9%) sepia(100%) saturate(7200%) hue-rotate(325deg) brightness(90%) contrast(90%)' }}
            />
          </div>
          
          {/* @ Eighteen in Ballet font */}
          <h2 
            ref={subtitleRef}
            className="text-5xl sm:text-6xl md:text-7xl font-ballet"
            style={{ color: '#f5f1eb', marginTop: '-1rem', fontSize: 'clamp(3rem, 7.5vw, 5.5rem)' }}
          >
            @ Eighteen
          </h2>
        </div>

        {/* Music Player at Bottom */}
        <div ref={musicPlayerRef} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <button
            onClick={handleMusicToggle}
            className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 hover:opacity-80"
            style={{ 
              backgroundColor: 'rgba(245, 241, 235, 0.2)',
              backdropFilter: 'blur(10px)',
              color: '#f5f1eb'
            }}
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5" />
                <span className="text-sm font-poppins uppercase tracking-wider">Pause Music</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span className="text-sm font-poppins uppercase tracking-wider">Play Music</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
    </>
  )
}

export default Hero


