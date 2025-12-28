import React, { useState, useEffect, useRef } from 'react'
import { Play, Pause } from 'lucide-react'
import { gsap } from 'gsap'
import { theme, celebrant } from '../data'
import './Hero.css'

const Hero = ({ onStartMusic, onPauseMusic, onResumeMusic, isMusicPlaying = false }) => {
  const [isPlaying, setIsPlaying] = useState(isMusicPlaying)
  
  // Sync with parent state when it changes
  useEffect(() => {
    setIsPlaying(isMusicPlaying)
  }, [isMusicPlaying])
  const tennisBallLeftRef = useRef(null)
  const tennisBallRightRef = useRef(null)
  const sparkleLeftRef = useRef(null)
  const sparkleRightRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const dateRef = useRef(null)
  const musicPlayerRef = useRef(null)

  // Main cover photo
  const mainCoverPhoto = '/assets/images/prenup/Main%20Cover%20-%20Amanda%20Ira.jpg'

  // Format date from data file (YYYY-MM-DD to MM.DD.YYYY)
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = date.getFullYear()
    return `${month}.${day}.${year}`
  }

  const celebrationDate = formatDate(celebrant.debutant.debut.date)


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

    // Date slides up and fades in
    if (dateRef.current) {
      tl.fromTo(dateRef.current,
        { opacity: 0, y: 20 },
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
    if (isPlaying) {
      setIsPlaying(false)
      if (onPauseMusic) onPauseMusic()
    } else {
      setIsPlaying(true)
      // Use onStartMusic for first play, onResumeMusic for resume
      // Since we don't have access to audio state, we'll use onStartMusic
      // which will handle both cases in App.jsx
      if (onStartMusic) onStartMusic()
    }
  }
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden hero-section"
      style={{ 
        backgroundColor: theme.colors.primary
      }}
    >
      {/* Main Cover Photo Background */}
      <div 
        className="absolute inset-0 hero-background-image"
        style={{
          backgroundImage: `url(${mainCoverPhoto})`
        }}
      />

      {/* Green soft overlay at bottom */}
      <div className="hero-overlay-bottom"></div>

      {/* Tennis balls at top corners */}
      <div className="absolute top-8 left-8 z-20" ref={tennisBallLeftRef}>
        <img 
          src="/assets/images/graphics/tennis-ball-white.png" 
          alt="Tennis ball" 
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain hero-tennis-ball"
        />
      </div>
      <div className="absolute top-8 right-8 z-20" ref={tennisBallRightRef}>
        <img 
          src="/assets/images/graphics/tennis-ball-white.png" 
          alt="Tennis ball" 
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain hero-tennis-ball"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-end justify-center min-h-screen pb-16">
        <div className="text-center mb-8">
          {/* AMANDA IRA with sparkles */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-3 mb-2 lg:gap-4 hero-title-container">
            <img 
              ref={sparkleLeftRef}
              src="/assets/images/graphics/sparkle.png" 
              alt="Sparkle" 
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain hero-sparkle"
            />
            <h1 
              ref={titleRef}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-tebranos hero-title"
            >
              AMANDA IRA
            </h1>
            {/* @ Eighteen in Ballet font - inline on lg screens */}
            <h2 
              ref={subtitleRef}
              className="text-5xl sm:text-6xl md:text-7xl font-ballet lg:ml-2 hero-subtitle"
            >
              @ Eighteen
            </h2>
            <img 
              ref={sparkleRightRef}
              src="/assets/images/graphics/sparkle.png" 
              alt="Sparkle" 
              className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain hero-sparkle"
            />
          </div>

          {/* Celebration Date */}
          <div 
            ref={dateRef}
            className="text-2xl sm:text-3xl md:text-4xl font-poppins text-center mt-6 mb-8 hero-date"
          >
            {celebrationDate}
          </div>
        </div>

        {/* Music Player at Bottom */}
        <div ref={musicPlayerRef} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <button
            onClick={handleMusicToggle}
            className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 hover:opacity-80 hero-music-button"
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
  )
}

export default Hero


