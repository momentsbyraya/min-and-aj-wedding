import React, { forwardRef } from 'react'

/**
 * Clickable block with background image and text inside (no native button bg quirks).
 * role="button" + Enter/Space for accessibility.
 */
const GraphicButton = forwardRef(function GraphicButton(
  {
    imageSrc,
    children,
    onClick,
    className = '',
    contentClassName = '',
    disabled = false,
    'aria-label': ariaLabel,
    style,
    ...rest
  },
  ref
) {
  const handleKeyDown = (e) => {
    if (disabled) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.(e)
    }
  }

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
      className={`graphic-button ${className}`.trim()}
      style={{
        ...(style && typeof style === 'object' ? style : {}),
        ['--graphic-button-image']: `url("${imageSrc}")`
      }}
      {...rest}
    >
      <span className={`graphic-button-content ${contentClassName}`.trim()}>{children}</span>
    </div>
  )
})

export default GraphicButton
