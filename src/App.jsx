import { useState, useRef, useEffect, useCallback } from 'react'
import './App.css'
import WeddingInvitation from './components/WeddingInvitation'
import DynamicTitle from './components/DynamicTitle'
import OpeningScreen from './components/OpeningScreen'
import Preloader from './components/Preloader'
import { audio } from './data'

function App() {
  const [showOpeningScreen, setShowOpeningScreen] = useState(true)
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    // Initialize audio once - it will persist across component changes
    const el = new Audio(audio.background)
    el.loop = false // custom loop from loopStart (native loop always restarts at 0)
    el.volume = audio.volume
    audioRef.current = el

    const loopStart = Number(audio.loopStart) || 0

    const handleEnded = () => {
      if (!audio.loop || !audioRef.current) return
      audioRef.current.currentTime = loopStart
      audioRef.current.play().catch(() => {})
    }

    el.addEventListener('ended', handleEnded)

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded)
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const startMusic = () => {
    if (!audioRef.current) return

    const loopStart = Number(audio.loopStart) || 0
    audioRef.current.currentTime = loopStart
    audioRef.current.play().catch(() => {})
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
        <WeddingInvitation />
      )}
    </div>
  )
}

export default App 