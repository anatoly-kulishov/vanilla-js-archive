import * as moment from 'moment'

export function formatDate (date) {
  return moment(date).format('DD.MM.YYYY')
}

export const isDisabledDatesAfterToday = currentDate => currentDate.isAfter(moment().endOf('day'))
