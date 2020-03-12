import React, { useState, useEffect, ButtonHTMLAttributes } from "react";
import classNames from "classnames";

import Header from "./Header";
import WeekDays from "./WeekDays";
import Weeks from "./Weeks";

import {
  chunk,
  generateNextMonthDays,
  generatePreviousMonthDays,
  generateCurrentMonthDays,
  getCurrentMonthAsString,
  getCurrentYearAsString,
  checkCanSelectDate,
  noop,
  focusOnElement
} from "../utils";
import { useDate } from "../hooks";
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

  useEffect(() => {
    const kalendarz = document.getElementById('kalendarz');
    const buttons = Array.from(document.querySelectorAll('.table__body__cell:not(.--opaque) button')) as HTMLButtonElement[];

    kalendarz.addEventListener('keyup', (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      const [isFocused] = buttons.filter(button => button === activeElement);

      if (isFocused) {
        const currentCell = isFocused.parentElement as HTMLTableDataCellElement;

        switch (e.keyCode) {
          case ArrowsKeyCode.Right: {
            const parentNextSibling = currentCell.nextElementSibling as HTMLTableDataCellElement;
            if (parentNextSibling) {
              const toBeFocused = parentNextSibling.firstChild as HTMLButtonElement;
              focusOnElement(toBeFocused);
            } else {
              const currentRow = currentCell.parentElement;
              const nextRow = currentRow.nextElementSibling;
              const firstRowChild = nextRow.firstElementChild;
              const toBeFocused = firstRowChild.firstChild as HTMLButtonElement;
              focusOnElement(toBeFocused);
            }
            break;
          }
          case ArrowsKeyCode.Left: {
            const parentPrevSibling = currentCell.previousElementSibling as HTMLTableDataCellElement;

            if (parentPrevSibling) {
              const toBeFocused = parentPrevSibling.firstChild as HTMLButtonElement;
              focusOnElement(toBeFocused);
            } else {
              const currentRow = currentCell.parentElement;
              const prevRow = currentRow.previousElementSibling;
              if (prevRow) {
                const firstRowChild = prevRow.lastElementChild;
                const toBeFocused = firstRowChild.firstChild as HTMLButtonElement;
                focusOnElement(toBeFocused);
              }
            }
            break;
          }
        }
      }
    });

    () => {
      return document.removeEventListener('keyup', noop)
    }
  }, [])

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
