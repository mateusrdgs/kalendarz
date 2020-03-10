/// <reference types="react" />
interface HeaderProps {
    onPreviousYearClick: () => void;
    onPreviousMonthClick: () => void;
    onNextYearClick: () => void;
    onNextMonthClick: () => void;
    currentMonth: string;
    currentYear: string;
}
declare const Header: ({ onPreviousYearClick, onPreviousMonthClick, onNextYearClick, onNextMonthClick, currentMonth, currentYear }: HeaderProps) => JSX.Element;
export default Header;
