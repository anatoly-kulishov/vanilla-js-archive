import * as moment from 'moment'

export const getDisabledStartDate = (activationDate) => current => {
  const activationDateObj = moment(activationDate, 'DD.MM.YYYY').startOf('day')
  const threeYearsAgo = moment().subtract(3, 'years').startOf('day')
  const disabledStartDate = activationDateObj.isAfter(threeYearsAgo) ? activationDateObj : threeYearsAgo
  if (current.isBefore(disabledStartDate)) {
    return true
  }
  if (current.isAfter(moment().endOf('day'))) {
    return true
  }
}

export const getDisabledEndDate = (startDate) => current => {
  if (current.isAfter(moment().endOf('day'))) {
    return true
  }
  if (current.isAfter(startDate.clone().add(3, 'months'))) {
    return true
  }
  if (current.isBefore(startDate)) {
    return true
  }
}

export const formatDatesRange = dateRange => {
  const [startDate, endDate] = dateRange
  const formattedStartDate = startDate.clone().format()
  const formattedEndDate = endDate.clone().format()
  return {
    formattedStartDate,
    formattedEndDate
  }
}
