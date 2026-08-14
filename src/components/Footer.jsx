import React from 'react'
import { FiHeart } from 'react-icons/fi'

const Footer = () => {
  const handleFooterClick = () => {
    window.open(
      'https://www.facebook.com/profile.php?id=61571540978411',
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <footer
      className="w-full pb-4 transition-colors duration-300 hover:bg-[#6F4A52] active:bg-[#6F4A52] cursor-pointer bg-[#FFF9F5]"
      onClick={handleFooterClick}
    >
      <div className="w-full h-px bg-[#6F4A52] opacity-40 mb-4" />
      <div className="text-center">
        <p className="text-sm sm:text-base text-[#6F4A52] font-albert font-thin transition-colors duration-300 hover:text-white active:text-white inline-flex items-center justify-center gap-1.5">
          <span>Made with</span>
          <FiHeart className="h-4 w-4 shrink-0 fill-current" aria-hidden />
          <span>by Moments by Raya</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
