import React from "react";

interface HeaderProps {
  onPreviousYearClick: () => void;
  onPreviousMonthClick: () => void;
  onNextYearClick: () => void;
  onNextMonthClick: () => void;
  currentMonth: string;
  currentYear: string;
}

const Header = ({
  onPreviousYearClick,
  onPreviousMonthClick,
  onNextYearClick,
  onNextMonthClick,
  currentMonth,
  currentYear
}: HeaderProps) => {
  const currentMonthAndYear = `${currentMonth} ${currentYear}`;

  return (
    <div className="header">
      <div className="header__handlers">
        <button className="header__handler" id="prev__year" onClick={onPreviousYearClick}>
          {"<<"}
        </button>
        <button className="header__handler" id="prev__month" onClick={onPreviousMonthClick}>
          {"<"}
        </button>
      </div>
      <p className="header__title">{currentMonthAndYear}</p>
      <div className="header__handlers">
        <button className="header__handler" id="next__month" onClick={onNextMonthClick}>
          {">"}
        </button>
        <button className="header__handler" id="next__year" onClick={onNextYearClick}>
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default Header;
