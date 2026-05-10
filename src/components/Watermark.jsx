import React from 'react'

const DRAFT_MESSAGE = 'THIS IS HALF DONE FOR CLIENT APPROVAL'

const Watermark = () => {
  return (
    <>
      <div className="watermark-approval watermark-1">{DRAFT_MESSAGE}</div>
      <div className="watermark-approval watermark-2">{DRAFT_MESSAGE}</div>
      <div className="watermark-approval watermark-3">{DRAFT_MESSAGE}</div>
    </>
  )
}

export default Watermark
