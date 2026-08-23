import React from 'react'
import { Helmet } from 'react-helmet-async'
import { celebrant } from '../data'

const SOCIAL_THUMB_URL = 'https://min-and-aj-wedding.vercel.app/images/graphics/thumbnail.png'
const SITE_URL = 'https://min-and-aj-wedding.vercel.app/'

const DynamicTitle = () => {
  const coupleName = celebrant?.couple?.displayName || celebrant?.debutant?.name?.preferred || 'AJ & Min'
  const fullNames = celebrant?.debutant?.name?.full || 'Ana Josephine Hernando & Muhaymin Adjula'
  const weddingDate = new Date(celebrant.debutant.debut.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Manila'
  })

  return (
    <Helmet>
      <title>{`${coupleName} Wedding`}</title>
      <meta name="description" content={`You're invited to the wedding of ${fullNames} on ${weddingDate}.`} />
      <meta property="og:title" content={`${coupleName} Wedding`} />
      <meta property="og:description" content={`Join us as ${coupleName} say I do on ${weddingDate}.`} />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:image" content={SOCIAL_THUMB_URL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${coupleName} Wedding`} />
      <meta name="twitter:description" content={`Join us as ${coupleName} say I do on ${weddingDate}.`} />
      <meta name="twitter:image" content={SOCIAL_THUMB_URL} />
    </Helmet>
  )
}

export default DynamicTitle
