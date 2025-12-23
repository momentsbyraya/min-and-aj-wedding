import React from 'react'
import { theme } from '../data'

const Hero = () => {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      style={{ 
        backgroundColor: theme.colors.primary,
        backgroundImage: 'url(/assets/images/prenup/Main%20Cover%20-%20Amanda%20Ira.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
    </section>
  )
}

export default Hero


