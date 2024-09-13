export const formatTimeSlotDate = timeSlotDate => {
  return timeSlotDate?.format('DD.MM.YYYY')
}

export const findTimeSlotByDate = (timeslotsData, date) => {
  return timeslotsData?.find(timeslot => timeslot.TimeSlotDate === formatTimeSlotDate(date))
}

export const findTimeSlotIntervalById = (selectedTimeslot, selectedTimeId) => {
  return selectedTimeslot?.Intervals?.find(interval => interval.Id === selectedTimeId)
}
export const getTimeSlotDateAndInterval = (timeslotsData, date, selectedTimeId) => {
  const timeSlotDate = findTimeSlotByDate(timeslotsData, date)
  const timeSlotInterval = findTimeSlotIntervalById(timeSlotDate, selectedTimeId)
  return { timeSlotDate, timeSlotInterval }
}
