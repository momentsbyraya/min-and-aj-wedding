import React, { useEffect, useState } from 'react'
import { getTimeUntilWedding } from '../utils/countdown'
import FallingPetals from './FallingPetals'
import HeroStorybook from './HeroStorybook'
import LoveStory from './LoveStory'
import Counter from './Counter'
import Gallery from './Gallery'
import Venue from './Venue'
import Schedule from './Schedule'
import DressCode from './DressCode'
import RSVP from './RSVP'
import Paragraph from './Paragraph'
import Footer from './Footer'
import './WeddingInvitation.css'

/**
 * Section tree matched to wedding-rosetta:
 * FallingPetals → HeroStorybook → LoveStory → Counter → Gallery →
 * Venue → Schedule → DressCode → RSVP → Paragraph → Footer
 */
const WeddingInvitation = () => {
  const [countdown, setCountdown] = useState(getTimeUntilWedding())

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeUntilWedding())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <FallingPetals />
      <main className="main-container h-full section-container">
        <section className="h-full">
          <HeroStorybook />
        </section>

        <LoveStory />

        <Counter countdown={countdown} />

        <Gallery />

        <Venue />

        <Schedule />

        <DressCode />

        <RSVP />

        <Paragraph />

        <Footer />
      </main>
    </div>
  )
}

export default WeddingInvitation
