import React, { useEffect, useState } from 'react'
import { getTimeUntilWedding } from '../utils/countdown'
import FallingPetals from './FallingPetals'
import HeroStorybook from './HeroStorybook'
import Venue from './Venue'
import Schedule from './Schedule'
import Entourage from './Entourage'
import RSVP from './RSVP'
import Gifts from './Gifts'
import DressCode from './DressCode'
import LoveStory from './LoveStory'
import Gallery from './Gallery'
import FAQ from './FAQ'
import Counter from './Counter'
import Footer from './Footer'
import './WeddingInvitation.css'

/**
 * Section order:
 * Hero → Where to go → Wedding program → Entourage → RSVP → Gift →
 * Dress code → Love story → Gallery → FAQs → Save the date → Footer
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

        <Venue />

        <Schedule />

        <Entourage />

        <RSVP />

        <Gifts />

        <DressCode />

        <LoveStory />

        <Gallery />

        <FAQ />

        <Counter countdown={countdown} />

        <Footer />
      </main>
    </div>
  )
}

export default WeddingInvitation
