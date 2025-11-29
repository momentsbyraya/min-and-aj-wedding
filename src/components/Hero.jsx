import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'
import { celebrant, audio } from '../data'
import { weddingConfig } from '../config/weddingConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio(audio.background)
    audioRef.current.loop = audio.loop // Loop the music
    audioRef.current.volume = audio.volume // Set volume from config

    // Add event listeners for progress tracking
    const updateTime = () => setCurrentTime(audioRef.current.currentTime)
    const updateDuration = () => setDuration(audioRef.current.duration)
    
    audioRef.current.addEventListener('timeupdate', updateTime)
    audioRef.current.addEventListener('loadedmetadata', updateDuration)

    // Cleanup audio on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateTime)
        audioRef.current.removeEventListener('loadedmetadata', updateDuration)
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    // Animate content on load - hide initially, then slide in
    if (contentRef.current) {
      // First show the container
      gsap.to(contentRef.current, {
        opacity: 1,
        duration: 0.3,
        delay: 0.3
      })
      
      // Then animate children sliding up
      if (contentRef.current.children) {
        gsap.fromTo(contentRef.current.children, 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.5, 
            ease: "linear", 
            stagger: 0.3,
            delay: 0.6 // Start after container fades in
          }
        )
      }
    }
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleProgressClick = (e) => {
    if (!audioRef.current || !duration) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const newTime = (clickX / width) * duration
    
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0

  const skipBackward = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = Math.max(0, currentTime - 10) // Skip back 10 seconds
  }

  const skipForward = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = Math.min(duration, currentTime + 10) // Skip forward 10 seconds
  }

  // Format date for display
  const formatWeddingDate = () => {
    const date = new Date(weddingConfig.debut.date)
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()
    const day = date.getDate()
    const month = date.toLocaleDateString('en-US', { month: 'long' }).toUpperCase()
    
    // Add ordinal suffix
    const getOrdinal = (n) => {
      const s = ["TH", "ST", "ND", "RD"]
      const v = n % 100
      return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`
    }
    
    return `${dayOfWeek} ${getOrdinal(day)} ${month}`
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center m-0 p-0"
    >
      {/* Hero Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/assets/images/graphics/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      {/* Crumpled Paper Background on top */}
      <div 
        className="absolute inset-0 opacity-30 z-10"
        style={{
          backgroundImage: 'url(/assets/images/crumpled-paper.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      {/* Content */}
      <div ref={contentRef} className="relative z-40" style={{ transform: 'scale(1.02)', opacity: 0 }}>
        {/* Celebrant's Text */}
        <div 
          className="font-bestlight"
          style={{ 
            color: '#4b2259', 
            transform: 'rotate(-5deg)',
            fontSize: 'min(14vw, 200px)',
            marginBottom: '-0.5rem',
            position: 'relative'
          }}
        >
          {celebrant.debutant.name.nickname}'s
          <img 
            src="/assets/images/graphics/butterfly-half-left.png" 
            alt="Butterfly" 
            style={{ 
              position: 'absolute',
              top: '-15px',
              right: '10px',
              width: 'min(14vw, 240px)',
              height: 'auto',
              transform: 'translate(50%, -50%)'
            }}
          />
        </div>
        
        {/* 18th Birthday Text */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <div 
            className="font-bestlight"
            style={{ 
              color: '#4b2259', 
              transform: 'rotate(-5deg)',
              fontSize: 'min(14vw, 200px)',
              width: 'fit-content',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            18th
          </div>
          <div 
            className="caudex-regular"
            style={{ 
              color: '#4b2259', 
              transform: 'rotate(-5deg)',
              fontSize: 'min(5vw, 80px)',
              width: 'fit-content',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            BIRTHDAY
          </div>
        </div>
        
        {/* Join Us Container */}
        <div style={{ display: 'flex', width: '100%', marginTop: '2rem' }}>
          <div style={{ width: '60%' }}>
            <div className="font-poppins" style={{ color: '#4b2259', textTransform: 'uppercase', textAlign: 'center', lineHeight: '1.2', fontSize: 'clamp(0.875rem, 2vw, 1.5rem)' }}>
              JOIN US FOR {celebrant.debutant.name.nickname.toUpperCase()}'S<br />
              SWEET 18TH PARTY!
            </div>
            <div className="font-poppins" style={{ color: '#B76E79', marginTop: '0.5rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: 'clamp(0.75rem, 1.5vw, 1rem)' }}>
              <div className="font-poppins" style={{ borderRight: '2px solid #B76E79', paddingRight: '0.75rem', fontSize: 'clamp(0.6rem, 1.2vw, 0.8rem)' }}>
                {weddingConfig.debut.month.toUpperCase()}
              </div>
              <div className="font-poppins" style={{ fontSize: 'clamp(1rem, 2.25vw, 1.5rem)', fontWeight: 'bold' }}>
                {weddingConfig.debut.day}
              </div>
              <div className="font-poppins" style={{ borderLeft: '2px solid #B76E79', paddingLeft: '0.75rem', fontSize: 'clamp(0.6rem, 1.2vw, 0.8rem)' }}>
                {weddingConfig.debut.year}
              </div>
            </div>
            <div className="font-poppins" style={{ color: '#B76E79', marginTop: '0.125rem', textTransform: 'uppercase', fontSize: 'clamp(0.875rem, 1.5vw, 0.9rem)', textAlign: 'center', fontWeight: 600 }}>
              AT {weddingConfig.debut.time.toUpperCase()}
            </div>
            <div className="font-poppins" style={{ color: '#4b2259', marginTop: '0.25rem', textTransform: 'uppercase', fontSize: 'clamp(0.875rem, 1.5vw, 0.9rem)', textAlign: 'center', fontWeight: 600 }}>
              {weddingConfig.venue.main.name.toUpperCase()}
            </div>
          </div>
          <div style={{ width: '40%' }}>
          </div>
        </div>
      </div>
      
      {/* Bottom Design */}
      <img 
        src="/assets/images/graphics/bottom-design.png" 
        alt="Bottom design" 
        className="absolute bottom-0 left-0 z-30"
        style={{ width: '100%' }}
      />
      
      {/* Hero Portrait - Bottom Right */}
      <img 
        src="/assets/images/graphics/hero-portrait.png" 
        alt="Hero portrait" 
        className="absolute bottom-0 z-30"
        style={{ maxHeight: '50vh', height: 'auto', width: 'auto', right: '-5%' }}
      />
    </section>
  )
}

export default Hero


