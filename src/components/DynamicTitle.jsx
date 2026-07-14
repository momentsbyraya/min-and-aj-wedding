import React from 'react'
import { Helmet } from 'react-helmet-async'
import { celebrant } from '../data'

const SOCIAL_THUMB_PATH = '/images/prenup/thumbnail.png'

const DynamicTitle = () => {
  const debutantName = celebrant.debutant.name.full
  const debutDate = new Date(celebrant.debutant.debut.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const thumbUrl =
    typeof window !== 'undefined' && window.location?.origin
      ? `${window.location.origin}${SOCIAL_THUMB_PATH}`
      : SOCIAL_THUMB_PATH

  return (
    <Helmet>
      <title>{`${celebrant.debutant.name.nickname || celebrant.debutant.name.first} Turns 18`}</title>
      <meta name="description" content={`${debutantName}'s 18th Birthday - Beautiful digital debut invitation for ${debutDate}`} />
      <meta property="og:title" content={`${debutantName}'s 18th Birthday`} />
      <meta property="og:description" content={`Join us for ${debutantName}'s special day on ${debutDate}`} />
      <meta property="og:image" content={thumbUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${debutantName}'s 18th Birthday`} />
      <meta name="twitter:description" content={`Beautiful digital debut invitation for ${debutDate}`} />
      <meta name="twitter:image" content={thumbUrl} />
    </Helmet>
  )
}

export default DynamicTitle 