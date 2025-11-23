import React from 'react'
import { Helmet } from 'react-helmet-async'
import { couples } from '../data'

const DynamicTitle = () => {
  const debutantName = couples.debutant.name.full
  const debutDate = new Date(couples.debutant.debut.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Helmet>
      <title>{`${debutantName}'s 18th Birthday - ${debutDate}`}</title>
      <meta name="description" content={`${debutantName}'s 18th Birthday - Beautiful digital debut invitation for ${debutDate}`} />
      <meta property="og:title" content={`${debutantName}'s 18th Birthday`} />
      <meta property="og:description" content={`Join us for ${debutantName}'s special day on ${debutDate}`} />
      <meta name="twitter:title" content={`${debutantName}'s 18th Birthday`} />
      <meta name="twitter:description" content={`Beautiful digital debut invitation for ${debutDate}`} />
    </Helmet>
  )
}

export default DynamicTitle 