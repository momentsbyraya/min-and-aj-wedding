import { useState, useRef, useEffect, useCallback } from 'react'
import './App.css'
import WeddingInvitation from './components/WeddingInvitation'
import RSVPModal from './components/RSVPModal'
import DynamicTitle from './components/DynamicTitle'
import OpeningScreen from './components/OpeningScreen'
import Preloader from './components/Preloader'
import Watermark from './components/Watermark'
import { audio } from './data'

function App() {
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false)
  const [showOpeningScreen, setShowOpeningScreen] = useState(true)
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    // Initialize audio once - it will persist across component changes
    audioRef.current = new Audio(audio.background)
    audioRef.current.loop = audio.loop
    audioRef.current.volume = audio.volume

    // Listen to audio events to update state
    const handlePlay = () => setIsMusicPlaying(true)
    const handlePause = () => setIsMusicPlaying(false)
    const handleEnded = () => setIsMusicPlaying(false)

    audioRef.current.addEventListener('play', handlePlay)
    audioRef.current.addEventListener('pause', handlePause)
    audioRef.current.addEventListener('ended', handleEnded)

    // Cleanup only on app unmount
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

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.loop = true
      audioRef.current.currentTime = 1 // Start at 1 second
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error)
      })
    }
  }

  const pauseMusic = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause()
    }
  }

  const resumeMusic = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error)
      })
    }
  }

  const handleEnvelopeOpen = () => {
    setShowOpeningScreen(false)
    startMusic()
  }

  const handlePreloaderComplete = useCallback(() => {
    setIsPreloaderComplete(true)
  }, [])

  return (
    <div className="App min-h-screen wedding-gradient relative">
      <DynamicTitle />
      {!isPreloaderComplete ? (
        <Preloader onComplete={handlePreloaderComplete} />
      ) : showOpeningScreen ? (
        <OpeningScreen onEnvelopeOpen={handleEnvelopeOpen} />
      ) : (
        <>
          <WeddingInvitation 
            onOpenRSVP={() => setIsRSVPModalOpen(true)} 
            onPauseMusic={pauseMusic}
            onResumeMusic={resumeMusic}
            onStartMusic={startMusic}
            isMusicPlaying={isMusicPlaying}
          />
          <RSVPModal isOpen={isRSVPModalOpen} onClose={() => setIsRSVPModalOpen(false)} />
        </>
      )}
      {isPreloaderComplete ? <Watermark /> : null}
    </div>
  )
}

export default App 