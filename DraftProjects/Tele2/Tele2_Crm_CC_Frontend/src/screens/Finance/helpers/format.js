import moment from 'moment'

export const formatNumber = number => (number || number === 0) && number.toLocaleString(undefined, { minimumFractionDigits: 2 })

export const formatDate = date => date && moment.utc(date).local().format('DD.MM.YYYY HH:mm')

export const formatDateWithSeconds = date => date.format('YYYY-MM-DDTHH:mm:ss')

export const dateWithUtc = date => moment.utc(date).format('YYYY-MM-DDTHH:mm:ss')
