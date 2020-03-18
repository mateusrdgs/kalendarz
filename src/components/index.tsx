import React, { useState } from 'react'
import classNames from 'classnames'

import Header from './Header'
import WeekDays from './WeekDays'
import Weeks from './Weeks'

import {
  chunk,
  generateNextMonthDays,
  generatePreviousMonthDays,
  generateCurrentMonthDays,
  getCurrentMonthAsString,
  getCurrentYearAsString,
  checkCanSelectDate
} from '../utils'
import { useDate } from '../hooks'
import { weekDays } from '../constants'

import './kalendarz.scss'

interface KalendarzProps {
  disableWeekendSelection?: boolean;
  defaultValue?: string;
  onDatePick?: Function;
}

const Kalendarz = ({ disableWeekendSelection, onDatePick }: KalendarzProps) => {
  const wrapperClassnames = classNames('kalendarz', {
    '--disable-weekend': disableWeekendSelection
  })

  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState('')
  const { firstDateOfMonth, lastDateOfMonth } = useDate(currentDate)

  const firstDayOfMonthInWeek = firstDateOfMonth.getDay()
  const lastDayOfMonthInWeek = lastDateOfMonth.getDay()
  const daysInMonth = lastDateOfMonth.getDate()

  const previousMonthDays = generatePreviousMonthDays(
    firstDayOfMonthInWeek,
    currentDate
  )

  const nextMonthDays = generateNextMonthDays(lastDayOfMonthInWeek, currentDate)

  const currentMonthDays = generateCurrentMonthDays(daysInMonth, currentDate)

  const weeks = chunk(
    [...previousMonthDays, ...currentMonthDays, ...nextMonthDays],
    7
  )

  const currentMonthAsString = getCurrentMonthAsString(currentDate)
  const currentYearAsString = getCurrentYearAsString(currentDate)

  return (
    <div className={wrapperClassnames}>
      <Header
        onPreviousYearClick={() => {
          const year = currentDate.getFullYear() - 1
          const month = currentDate.getMonth()
          const date = currentDate.getDate()
          const newDate = new Date(year, month, date)
          setCurrentDate(newDate)
        }}
        onPreviousMonthClick={() => {
          const year = currentDate.getFullYear()
          const month = currentDate.getMonth() - 1
          const date = currentDate.getDate()
          const newDate = new Date(year, month, date)
          setCurrentDate(newDate)
        }}
        onNextYearClick={() => {
          const year = currentDate.getFullYear() + 1
          const month = currentDate.getMonth()
          const date = currentDate.getDate()
          const newDate = new Date(year, month, date)
          setCurrentDate(newDate)
        }}
        onNextMonthClick={() => {
          const year = currentDate.getFullYear()
          const month = currentDate.getMonth() + 1
          const date = currentDate.getDate()
          const newDate = new Date(year, month, date)
          setCurrentDate(newDate)
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
            const currentDateAsISOString = currentDate.toISOString()
            const canSelectDate = checkCanSelectDate(
              date,
              currentDateAsISOString,
              disableWeekendSelection
            )
            if (canSelectDate) {
              setSelectedDate(date)
            }
            if (onDatePick) {
              onDatePick(date)
            }
          }}
        />
      </table>
    </div>
  )
}

export default Kalendarz
