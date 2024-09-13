import { OrderStatuses } from 'constants/orderStatuses'
import { isNumber } from 'lodash-es'
import moment from 'moment'

export const getStatusColor = id => {
  // TODO: После Ф1 сделать справочник, загружаемый с BE
  switch (id) {
    case OrderStatuses.Draft:
      return 'pink'
    case OrderStatuses.Closed:
      return 'green'
    case OrderStatuses.New:
      return 'blue'
    case OrderStatuses.Cancelled:
      return 'gray'
    case OrderStatuses.TransferredToRtc:
      return 'green'
    case OrderStatuses.Waiting:
      return 'orange'
    default:
      return 'blue'
  }
}

export function renderCreatedTime (dateText, timezone, showRegionTimezone) {
  const createdDate = dateText && moment.utc(dateText)
  if (!createdDate?.isValid()) return ''
  if (showRegionTimezone && isNumber(timezone)) {
    createdDate.utcOffset(timezone)
  } else {
    createdDate.utcOffset(3)
  }
  return createdDate.format('DD.MM.YYYY HH:mm')
}

export function renderCallDateTime (callDateStart, callDateEnd, timezone, showRegionTimezone) {
  let start = callDateStart ? moment.utc(callDateStart) : null
  let end = callDateEnd ? moment.utc(callDateEnd) : null
  if (start?.isValid()) {
    start = showRegionTimezone && isNumber(timezone) ? start.utcOffset(timezone) : start.utcOffset(3)
  }
  if (end?.isValid()) {
    end = showRegionTimezone && isNumber(timezone) ? end.utcOffset(timezone) : end.utcOffset(3)
  }

  if (!start) {
    return null
  }
  if (start && !end) {
    end = start.clone().endOf('day')
    end = showRegionTimezone ? end.utcOffset(timezone) : end
  }
  return `${start?.format('DD.MM.YYYY HH:mm')} - ${end?.format('HH:mm')}`
}

export const formatDate = date => date && moment.utc(date).local().format('DD.MM.YYYY HH:mm')
