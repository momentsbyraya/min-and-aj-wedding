import React, { forwardRef } from 'react'

/**
 * Same visual as GraphicButton but renders an <a> (navigation, external URLs).
 */
const GraphicLink = forwardRef(function GraphicLink(
  {
    imageSrc,
    href,
    children,
    className = '',
    contentClassName = '',
    target,
    rel,
    style,
    ...rest
  },
  ref
) {
  const resolvedRel =
    rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={resolvedRel}
      className={`graphic-button ${className}`.trim()}
      style={{
        ...(style && typeof style === 'object' ? style : {}),
        ['--graphic-button-image']: `url("${imageSrc}")`
      }}
      {...rest}
    >
      <span className={`graphic-button-content ${contentClassName}`.trim()}>{children}</span>
    </a>
  )
})

export default GraphicLink
