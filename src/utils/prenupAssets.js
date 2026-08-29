const NEW_FOLDER = 'New folder'

/** Build a URL for files under assets/images/prenup/New folder */
export function prenupAsset(file) {
  return `/images/prenup/${encodeURIComponent(NEW_FOLDER)}/${encodeURIComponent(file)}`
}

export const FEATURE_PHOTOS = {
  hero: '1. First Photo - Our greatest Chapter begins on.jpg',
  afterProgram: '2. Second Photo - After wedding program page.jpg',
  afterEntourage: '3. Third Photo - After entourage page.jpg',
  afterRsvp: '4. Fourth Photo - After RSVP.jpg',
  afterGifts: '5. Fifth Photo - After Gifts.jpg',
  afterDressCode: '6. Sixth Photo - after dresscode page.jpg',
  afterLoveStory: '7. Seventh Photo - after our story page.jpg',
  afterGallery: '8. 8th Photo after our moments.jpg',
  afterFaq: '9.Last Photo.jpg'
}

export function prenupAssetFromPath(relativePath) {
  const parts = String(relativePath).split('/').filter(Boolean)
  if (parts.length === 1) {
    return `/images/prenup/${encodeURIComponent(parts[0])}`
  }
  return `/images/prenup/${parts.map(encodeURIComponent).join('/')}`
}
