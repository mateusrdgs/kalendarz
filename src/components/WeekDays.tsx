import React from "react";
import { WeekDay } from "../interfaces";

interface WeekDaysProps {
  weekDays: WeekDay[];
}

const WeekDays = ({ weekDays }: WeekDaysProps) => {
  return (
    <thead className="table__head">
      <tr className="table__row table__head_row">
        {weekDays.map((weekDay, idx) => {
          return (
            <th
              className="table__cell table__head__cell"
              aria-label={weekDay.value}
              key={`week-day-${idx}`}
            >
              <abbr>{weekDay.label}</abbr>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default WeekDays;
