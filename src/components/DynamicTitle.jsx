import React from 'react'
import { Helmet } from 'react-helmet-async'
import { celebrant } from '../data'

const DynamicTitle = () => {
  const debutantName = celebrant.debutant.name.full
  const debutDate = new Date(celebrant.debutant.debut.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Helmet>
      <title>Amanda Ira Turns 18</title>
      <meta name="description" content={`${debutantName}'s 18th Birthday - Beautiful digital debut invitation for ${debutDate}`} />
      <meta property="og:title" content={`${debutantName}'s 18th Birthday`} />
      <meta property="og:description" content={`Join us for ${debutantName}'s special day on ${debutDate}`} />
      <meta name="twitter:title" content={`${debutantName}'s 18th Birthday`} />
      <meta name="twitter:description" content={`Beautiful digital debut invitation for ${debutDate}`} />
    </Helmet>
  )
}

export default DynamicTitle 