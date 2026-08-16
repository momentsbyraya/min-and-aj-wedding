import React from 'react'
import { Helmet } from 'react-helmet-async'
import { celebrant } from '../data'

const SOCIAL_THUMB_PATH = '/images/prenup/NZ6_7683.jpeg'

const DynamicTitle = () => {
  const coupleName = celebrant?.couple?.displayName || celebrant?.debutant?.name?.preferred || 'AJ & Min'
  const fullNames = celebrant?.debutant?.name?.full || 'Ana Josephine Hernando & Muhaymin Adjula'
  const weddingDate = new Date(celebrant.debutant.debut.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Manila'
  })
  const thumbUrl =
    typeof window !== 'undefined' && window.location?.origin
      ? `${window.location.origin}${SOCIAL_THUMB_PATH}`
      : SOCIAL_THUMB_PATH

  return (
    <Helmet>
      <title>{`${coupleName} Wedding`}</title>
      <meta name="description" content={`You're invited to the wedding of ${fullNames} on ${weddingDate}.`} />
      <meta property="og:title" content={`${coupleName} Wedding`} />
      <meta property="og:description" content={`Join us as ${coupleName} say I do on ${weddingDate}.`} />
      <meta property="og:image" content={thumbUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${coupleName} Wedding`} />
      <meta name="twitter:description" content={`Join us as ${coupleName} say I do on ${weddingDate}.`} />
      <meta name="twitter:image" content={thumbUrl} />
    </Helmet>
  )
}

export default DynamicTitle
