import React from 'react'
import { entourage } from '../data'

const removeMiddleInitial = (name = '') =>
  String(name).replace(/\s+[A-Z]\.\s+/g, ' ').replace(/\s+/g, ' ').trim()

const CEREMONIAL_CATEGORIES = [
  'Candle',
  'Veil',
  'Cord',
  'To Light our Path',
  'To Cloth us as One',
  'To Bind us Together'
]

/** Men (left) → women (right) partner categories */
const PARTNER_PAIRS = {
  'Best Man': 'Maid of Honour',
  Groomsmen: 'Bridesmaids',
  'Ring Bearer': 'Flower Girl'
}

const expandStackedNames = (names = []) =>
  names.flatMap((name) =>
    String(name)
      .split(/\s+-\s+/)
      .map((part) => part.trim())
      .filter(Boolean)
  )

const alignItemsClass = {
  left: 'items-start text-left',
  right: 'items-end text-right',
  center: 'items-center text-center'
}

const CategoryColumn = ({
  block,
  accentColor,
  labelClass,
  nameClassName,
  descriptionClass,
  align = 'center'
}) => {
  if (!block?.names?.length) return null

  const alignClass = alignItemsClass[align] || alignItemsClass.center
  const growClass = align === 'left' || align === 'right' ? 'flex-1' : ''

  return (
    <div className={`flex min-w-0 flex-col px-1 ${growClass} ${alignClass}`}>
      <p className={labelClass} style={{ color: accentColor }}>
        {block.category}
      </p>
      {block.description ? <p className={descriptionClass}>{block.description}</p> : null}
      {block.secondaryCategory ? (
        <p className={`${labelClass} mt-2`} style={{ color: accentColor }}>
          {block.secondaryCategory}
        </p>
      ) : null}
      <div className={`flex flex-col gap-0.5 ${alignClass}`}>
        {expandStackedNames(block.names).map((name, i) => (
          <p key={i} className={nameClassName}>
            {name}
          </p>
        ))}
      </div>
    </div>
  )
}

/**
 * Entourage layout — based on patric-and-mae.
 * Men left (right-aligned) · women right (left-aligned).
 */
const EntourageTextContent = ({
  accentColor: accentColorProp,
  className = ''
}) => {
  const accentColor = accentColorProp ?? '#8B5560'
  /** Same size for every person name (Principal Sponsors as reference) */
  const nameClassName =
    'entourage-name font-albert font-thin text-[10px] sm:text-xs md:text-sm text-[#6B3F48] uppercase leading-snug whitespace-nowrap'
  const labelClass =
    'entourage-title alice-regular text-sm sm:text-base md:text-lg lg:text-xl mb-2 uppercase tracking-wide'
  const sectionTitleClass =
    'entourage-display-title font-lavishly text-2xl sm:text-4xl md:text-5xl lg:text-6xl mb-5 sm:mb-6 text-center'
  const descriptionClass =
    'entourage-blurb font-albert font-thin text-[8px] sm:text-[11px] md:text-[13px] italic text-[#6B3F48] max-w-xl mb-2 leading-relaxed'

  const { couple, parents, entourageList = [] } = entourage
  const hasParents =
    parents?.groom?.father ||
    parents?.groom?.mother ||
    parents?.bride?.father ||
    parents?.bride?.mother

  const partnerRightCategories = new Set(Object.values(PARTNER_PAIRS))

  return (
    <div
      className={`entourage-text-content mx-auto min-w-0 w-full max-w-md pb-12 sm:max-w-xl sm:pb-20 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl ${className}`}
    >
      {/* Couple — groom right-aligned · bride left-aligned */}
      <div className="mb-8 flex flex-row items-start justify-center gap-3 sm:mb-10 sm:gap-10">
        <div className="flex min-w-0 flex-1 flex-col items-end">
          <p className={`${labelClass} text-right`} style={{ color: accentColor }}>
            Name of groom
          </p>
          <p className={`${nameClassName} text-right`}>
            {removeMiddleInitial(couple?.groom?.name)}
          </p>
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-start">
          <p className={`${labelClass} text-left`} style={{ color: accentColor }}>
            Name of bride
          </p>
          <p className={`${nameClassName} text-left`}>
            {removeMiddleInitial(couple?.bride?.name)}
          </p>
        </div>
      </div>

      {/* Parents */}
      {hasParents ? (
        <div className="mb-8 sm:mb-10">
          <div className="mb-2 flex flex-row items-start justify-center gap-3 sm:gap-10">
            <div className="min-w-0 flex-1 text-right">
              <p className={labelClass} style={{ color: accentColor }}>
                Parents of the groom
              </p>
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className={labelClass} style={{ color: accentColor }}>
                Parents of the bride
              </p>
            </div>
          </div>
          {parents.groom.father || parents.bride.father ? (
            <div className="flex flex-row items-start justify-center gap-3 sm:gap-10">
              <div className="flex min-w-0 flex-1 flex-col items-end text-right">
                {parents.groom.father ? (
                  <p className={nameClassName}>{parents.groom.father}</p>
                ) : null}
              </div>
              <div className="flex min-w-0 flex-1 flex-col items-start text-left">
                {parents.bride.father ? (
                  <p className={nameClassName}>{parents.bride.father}</p>
                ) : null}
              </div>
            </div>
          ) : null}
          {parents.groom.mother || parents.bride.mother ? (
            <div className="flex flex-row items-start justify-center gap-3 sm:gap-10">
              <div className="flex min-w-0 flex-1 flex-col items-end text-right">
                {parents.groom.mother ? (
                  <p className={nameClassName}>{parents.groom.mother}</p>
                ) : null}
              </div>
              <div className="flex min-w-0 flex-1 flex-col items-start text-left">
                {parents.bride.mother ? (
                  <p className={nameClassName}>{parents.bride.mother}</p>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {entourageList.map((block, index) => {
        if (block.ninong && block.ninang) {
          const pairCount = Math.max(block.ninong.length, block.ninang.length)

          return (
            <div key={`principal-${index}`} className="mb-8 sm:mb-10">
              <h3 className={sectionTitleClass} style={{ color: accentColor }}>
                Principal Sponsors
              </h3>
              <div className="mb-1 grid grid-cols-2 items-start gap-3 sm:gap-10">
                <div className="flex flex-col items-end text-right">
                  <p className={`${labelClass} mb-2 sm:mb-3`} style={{ color: accentColor }}>
                    Ninong
                  </p>
                  {Array.from({ length: pairCount }, (_, i) =>
                    block.ninong[i] ? (
                      <p key={`ninong-${i}`} className={`${nameClassName} ninong-item`}>
                        {block.ninong[i]}
                      </p>
                    ) : null
                  )}
                </div>
                <div className="flex flex-col items-start text-left">
                  <p className={`${labelClass} mb-2 sm:mb-3`} style={{ color: accentColor }}>
                    Ninang
                  </p>
                  {Array.from({ length: pairCount }, (_, i) =>
                    block.ninang[i] ? (
                      <p key={`ninang-${i}`} className={`${nameClassName} ninang-item`}>
                        {block.ninang[i]}
                      </p>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          )
        }

        if (
          block.category &&
          CEREMONIAL_CATEGORIES.includes(block.category) &&
          block.names?.length
        ) {
          const prev = entourageList[index - 1]
          const next = entourageList[index + 1]
          const isCeremonialGroup =
            (index === 0 || !CEREMONIAL_CATEGORIES.includes(prev?.category)) &&
            CEREMONIAL_CATEGORIES.includes(next?.category)

          if (!isCeremonialGroup && prev?.category && CEREMONIAL_CATEGORIES.includes(prev.category)) {
            return null
          }

          const ceremonialBlocks = isCeremonialGroup
            ? entourageList
                .slice(index, index + 3)
                .filter((item) => CEREMONIAL_CATEGORIES.includes(item.category))
            : [block]

          return (
            <div
              key={`ceremonial-${index}`}
              className="mb-8 flex flex-col items-center gap-8 text-center sm:mb-10 sm:gap-10"
            >
              {ceremonialBlocks.map((ceremonialBlock, ceremonialIndex) => (
                <CategoryColumn
                  key={`${ceremonialBlock.category}-${ceremonialIndex}`}
                  block={ceremonialBlock}
                  accentColor={accentColor}
                  labelClass={`${labelClass} text-center`}
                  nameClassName={`${nameClassName} text-center`}
                  descriptionClass={`${descriptionClass} text-center`}
                  align="center"
                />
              ))}
            </div>
          )
        }

        if (block.names?.length) {
          const partnerRightName = PARTNER_PAIRS[block.category]
          if (partnerRightName) {
            const partnerBlock = entourageList.find(
              (item, i) => i > index && item.category === partnerRightName && item.names?.length
            )

            return (
              <div
                key={`pair-${index}`}
                className="mb-8 flex flex-row items-start justify-center gap-3 sm:mb-10 sm:gap-10"
              >
                <CategoryColumn
                  block={block}
                  accentColor={accentColor}
                  labelClass={labelClass}
                  nameClassName={nameClassName}
                  descriptionClass={descriptionClass}
                  align="right"
                />
                {partnerBlock ? (
                  <CategoryColumn
                    block={partnerBlock}
                    accentColor={accentColor}
                    labelClass={labelClass}
                    nameClassName={nameClassName}
                    descriptionClass={descriptionClass}
                    align="left"
                  />
                ) : null}
              </div>
            )
          }

          if (partnerRightCategories.has(block.category)) {
            const hasLeftPartner = entourageList.some(
              (item, i) =>
                i < index &&
                PARTNER_PAIRS[item.category] === block.category &&
                item.names?.length
            )
            if (hasLeftPartner) return null
          }

          return (
            <div key={`names-${index}`} className="mb-8 sm:mb-10">
              <CategoryColumn
                block={block}
                accentColor={accentColor}
                labelClass={`${labelClass} text-center`}
                nameClassName={`${nameClassName} text-center`}
                descriptionClass={`${descriptionClass} text-center`}
                align="center"
              />
            </div>
          )
        }

        return null
      })}
    </div>
  )
}

export default EntourageTextContent
