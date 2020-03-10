import React from "react";
import classNames from "classnames";

import { Day } from "../../interfaces";
import { checkIsWeekend } from "../../utils";

interface WeeksProps {
  onDatePick: Function;
  selectedDate: string;
  weeks: Day[][];
}

const Weeks = ({ weeks, selectedDate, onDatePick }: WeeksProps) => {
  return (
    <tbody className="table__body">
      {weeks.map((week: Day[], weekIdx: number) => {
        return (
          <tr className="table__row table__body_row" key={`week-${weekIdx}`}>
            {week.map((day: Day, dayIdx: number) => {
              const isWeekend = checkIsWeekend(day.date);
              const cellClassname = classNames(
                "table__cell table__body__cell",
                {
                  "--opaque": day.opaque,
                  "--selected": day.date === selectedDate,
                  "--weekend": isWeekend
                }
              );
              return (
                <td key={`day-${weekIdx}-${dayIdx}`} className={cellClassname}>
                  <button onClick={onDatePick(day.date)}>{day.day}</button>
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default Weeks;
