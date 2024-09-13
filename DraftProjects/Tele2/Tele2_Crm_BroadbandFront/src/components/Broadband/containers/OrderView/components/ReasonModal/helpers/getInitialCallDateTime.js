import moment from 'moment'
import { timeSlots } from '../constants/timeSlots'

const today = moment()
const hour = today.hour()

export const checkIsOver21Hours = () => {
  return hour >= 21
}

export const getInitialCallDateTime = () => {
  const reasonCallDate = getCallDateDayByCurrentHour()
  const reasonCallTime = checkIsOver21Hours() ? timeSlots[0].value : buildTimeSlot()

  return { reasonCallDate, reasonCallTime }
}

const buildTimeSlot = () => {
  const timeSlotFrom = moment(today).add(3, 'hour').format('HH:mm')
  const timeSlotTo = moment(today).add(6, 'hour').format('HH:mm')
  return `${timeSlotFrom}-${timeSlotTo}`
}

export const getCallDateDayByCurrentHour = () => {
  const reasonCallDate = checkIsOver21Hours() ? moment(today).add(1, 'day') : moment(today)
  return reasonCallDate
}
