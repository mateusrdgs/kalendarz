import { months } from "../constants";
import { Day } from "../interfaces";

export const chunk = (arr: any[], chunkSize: number): [][] => {
  const result = arr.reduce((acc, curr, idx) => {
    const chunkIndex = Math.floor(idx / chunkSize);

    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }

    acc[chunkIndex].push(curr);
    return acc;
  }, []);

  return result;
};

export const getCurrentMonthAsString = (date: Date): string =>
  months[date.getMonth()];
export const getCurrentYearAsString = (date: Date): string =>
  date.getFullYear().toString();

export const generatePreviousMonthDays = (
  firstDayOfMonthInWeek: number,
  currentDate: Date
): Day[] => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const lastDateOfPreviousMonth = new Date(year, month, 0);
  const yearOnlyOfPreviousMonth = lastDateOfPreviousMonth.getFullYear();
  const monthOnlyOfPreviousMonth = lastDateOfPreviousMonth.getMonth();
  const dateOnlyOfPreviousMonth = lastDateOfPreviousMonth.getDate();

  const previousMonthDays = Array.from(
    { length: firstDayOfMonthInWeek },
    (_, idx) => {
      const opaque = true;
      const dayOfPreviousMonth = dateOnlyOfPreviousMonth - idx;
      const date = new Date(
        yearOnlyOfPreviousMonth,
        monthOnlyOfPreviousMonth,
        dayOfPreviousMonth
      ).toISOString();
      return {
        day: dayOfPreviousMonth,
        date,
        opaque
      };
    }
  ).reverse();
  return previousMonthDays;
};

export const generateNextMonthDays = (
  lastDayOfMonthInWeek: number,
  currentDate: Date
): Day[] => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const firstDateOfNextMonth = new Date(year, month, 1);
  const yearOnlyOfNextMonth = firstDateOfNextMonth.getFullYear();
  const monthOnlyOfNextMonth = firstDateOfNextMonth.getMonth();

  const nextMonthDays = Array.from(
    { length: 6 - lastDayOfMonthInWeek },
    (_, idx) => {
      const opaque = true;
      const dayOfNextMonth = idx + 1;
      const date = new Date(
        yearOnlyOfNextMonth,
        monthOnlyOfNextMonth,
        dayOfNextMonth
      ).toISOString();
      return {
        day: dayOfNextMonth,
        date,
        opaque
      };
    }
  );
  return nextMonthDays;
};

export const generateCurrentMonthDays = (
  daysInMonth: number,
  currentDate: Date
): Day[] => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDateOfCurrentMonth = new Date(year, month, 1);
  const yearOnlyOfCurrentMonth = firstDateOfCurrentMonth.getFullYear();
  const monthOnlyOfCurrentMonth = firstDateOfCurrentMonth.getMonth();

  const currentMonthDays = Array.from({ length: daysInMonth }, (_, idx) => {
    const opaque = false;
    const dayOfCurrentMonth = idx + 1;
    const date = new Date(
      yearOnlyOfCurrentMonth,
      monthOnlyOfCurrentMonth,
      dayOfCurrentMonth
    ).toISOString();

    return {
      day: dayOfCurrentMonth,
      date,
      opaque
    };
  });
  return currentMonthDays;
};

export const checkIsWeekend = (date: string): boolean => {
  const day = new Date(date).getDay();
  return day === 0 || day === 6;
};

export const checkIsSameMonth = (
  date: string,
  currentDate: string
): boolean => {
  return new Date(date).getMonth() === new Date(currentDate).getMonth();
};

export const checkCanSelectDate = (
  date: string,
  currentDate: string,
  disableWeekendSelection?: boolean
): boolean => {
  const isWeekDay = !checkIsWeekend(date);
  const isSameMonth = checkIsSameMonth(date, currentDate);
  const canSelectDate =
    isSameMonth &&
    (!disableWeekendSelection || (disableWeekendSelection && isWeekDay));

  return canSelectDate;
};
