import React, { useState, useEffect } from "react";
import classNames from "classnames";

import Header from "./Header";
import WeekDays from "./WeekDays";
import Weeks from "./Weeks";

import {
  checkCanSelectDate,
  chunk,
  generateNextMonthDays,
  generatePreviousMonthDays,
  generateCurrentMonthDays,
  getCurrentMonthAsString,
  getCurrentYearAsString,
} from "../utils";
import { useDate, usePrevious } from "../hooks";
import { weekDays, ArrowsKeyCode } from "../constants";

import "./kalendarz.scss";

interface KalendarzProps {
  disableWeekendSelection?: boolean;
  defaultValue?: string;
  onDatePick?: Function,
}

const Kalendarz = ({ disableWeekendSelection, onDatePick }: KalendarzProps) => {

  const wrapperClassnames = classNames("kalendarz", {
    "--disable-weekend": disableWeekendSelection
  });

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const { firstDateOfMonth, lastDateOfMonth } = useDate(currentDate);
  const previousDate = usePrevious<Date>(currentDate);

  useEffect(() => {

    // move them to a useEffect hook which runs only once and set them as state
    const kalendarz = document.getElementById('kalendarz');
    const prevMonthHandler = document.querySelector('.header__handler#prev__month') as HTMLButtonElement;
    const nextMonthHandler = document.querySelector('.header__handler#next__month') as HTMLButtonElement;

    const buttons = Array.from(document.querySelectorAll('.table__body__cell:not(.--hidden) button')) as HTMLButtonElement[];

    const onKeyUp = (e: KeyboardEvent) => {

      const { activeElement } = document;

      const [isFocused] = buttons.filter(button => button === activeElement);

      if (isFocused) {

        const currentCell = isFocused.parentElement as HTMLTableDataCellElement;

        switch (e.keyCode) {
          case ArrowsKeyCode.Right: {
            const parentNextSibling = currentCell.nextElementSibling as HTMLTableDataCellElement;

            if (parentNextSibling) {
              const button = parentNextSibling.firstChild as HTMLButtonElement;
              if (button) {
                return button.focus();
              } else {
                return nextMonthHandler.click()
              }
            } else {
              const currentRow = currentCell.parentElement;
              const nextRow = currentRow.nextElementSibling;
              if (nextRow) {
                const firstRowChild = nextRow.firstElementChild;
                const button = firstRowChild.firstChild as HTMLButtonElement;
                if (button) {
                  return button.focus()
                } else {
                  return nextMonthHandler.click()
                }
              } else {
                return nextMonthHandler.click()
              }
            }
          }
          case ArrowsKeyCode.Left: {
            const parentPrevSibling = currentCell.previousElementSibling as HTMLTableDataCellElement;

            if (parentPrevSibling) {
              const button = parentPrevSibling.firstChild as HTMLButtonElement;
              if (button) {
                return button.focus()
              } else {
                return prevMonthHandler.click()
              }
            } else {
              const currentRow = currentCell.parentElement;
              const prevRow = currentRow.previousElementSibling;
              if (prevRow) {
                const firstRowChild = prevRow.lastElementChild;
                const button = firstRowChild.firstChild as HTMLButtonElement;
                if (button) {
                  return button.focus()
                } else {
                  return prevMonthHandler.click()
                }
              } else {
                return prevMonthHandler.click()
              }
            }
          }
        }
      }
    }

    kalendarz.addEventListener('keyup', onKeyUp);

    if (previousDate) {
      const idx = previousDate < currentDate ? 0 : buttons.length - 1;
      const button = buttons[idx];
      button.focus();
    }

    return () => {
      return kalendarz.removeEventListener('keyup', onKeyUp)
    }

  }, [currentDate.getMonth()])

  const firstDayOfMonthInWeek = firstDateOfMonth.getDay();
  const lastDayOfMonthInWeek = lastDateOfMonth.getDay();
  const daysInMonth = lastDateOfMonth.getDate();

  const previousMonthDays = generatePreviousMonthDays(
    firstDayOfMonthInWeek,
    currentDate
  );

  const nextMonthDays = generateNextMonthDays(
    lastDayOfMonthInWeek,
    currentDate
  );

  const currentMonthDays = generateCurrentMonthDays(daysInMonth, currentDate);

  const weeks = chunk(
    [...previousMonthDays, ...currentMonthDays, ...nextMonthDays],
    7
  );

  const currentMonthAsString = getCurrentMonthAsString(currentDate);
  const currentYearAsString = getCurrentYearAsString(currentDate);

  return (
    <div id="kalendarz" className={wrapperClassnames}>
      <Header
        onPreviousYearClick={() => {
          const year = currentDate.getFullYear() - 1;
          const month = currentDate.getMonth();
          const date = currentDate.getDate();
          const newDate = new Date(year, month, date);
          setCurrentDate(newDate);
        }}
        onPreviousMonthClick={() => {
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth() - 1;
          const date = currentDate.getDate();
          const newDate = new Date(year, month, date);
          setCurrentDate(newDate);
        }}
        onNextYearClick={() => {
          const year = currentDate.getFullYear() + 1;
          const month = currentDate.getMonth();
          const date = currentDate.getDate();
          const newDate = new Date(year, month, date);
          setCurrentDate(newDate);
        }}
        onNextMonthClick={() => {
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth() + 1;
          const date = currentDate.getDate();
          const newDate = new Date(year, month, date);
          setCurrentDate(newDate);
        }}
        currentMonth={currentMonthAsString}
        currentYear={currentYearAsString}
      />
      <table className="table">
        <WeekDays weekDays={weekDays} />
        <Weeks
          weeks={weeks}
          selectedDate={selectedDate}
          onDatePick={(date: string) => () => {
            const currentDateAsISOString = currentDate.toISOString();
            const canSelectDate = checkCanSelectDate(
              date,
              currentDateAsISOString,
              disableWeekendSelection
            );
            if (canSelectDate) {
              setSelectedDate(date);
            }
            if (onDatePick) {
              onDatePick(date);
            }
          }}
        />
      </table>
    </div>
  );
};

export default Kalendarz;
