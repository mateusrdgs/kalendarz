export const useDate = (date: Date) => {
  const selectedYear = date.getFullYear()
  const selectedMonth = date.getMonth()
  const firstDateOfMonth = new Date(selectedYear, selectedMonth, 1)
  const lastDateOfMonth = new Date(selectedYear, selectedMonth + 1, 0)

  return { selectedYear, selectedMonth, firstDateOfMonth, lastDateOfMonth }
}
