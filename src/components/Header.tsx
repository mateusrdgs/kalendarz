import React from 'react'

interface HeaderProps {
  onPreviousYearClick: () => void
  onPreviousMonthClick: () => void
  onNextYearClick: () => void
  onNextMonthClick: () => void
  currentMonth: string
  currentYear: string
}

const Header = ({
  onPreviousYearClick,
  onPreviousMonthClick,
  onNextYearClick,
  onNextMonthClick,
  currentMonth,
  currentYear
}: HeaderProps) => {
  const currentMonthAndYear = `${currentMonth} ${currentYear}`

  return (
    <div className="header">
      <div className="header__handlers">
        <button className="header__handler" onClick={onPreviousYearClick}>
          {'<<'}
        </button>
        <button className="header__handler" onClick={onPreviousMonthClick}>
          {'<'}
        </button>
      </div>
      <p className="header__title">{currentMonthAndYear}</p>
      <div className="header__handlers">
        <button className="header__handler" onClick={onNextMonthClick}>
          {'>'}
        </button>
        <button className="header__handler" onClick={onNextYearClick}>
          {'>>'}
        </button>
      </div>
    </div>
  )
}

export default Header
