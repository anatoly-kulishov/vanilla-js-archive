import moment from 'moment'

export const tagColor = status => {
  switch (status) {
    case 0:
      return 'green'
    case 2:
      return 'red'
    default:
      return 'lightgray'
  }
}

export const formatIsoDate = value => value ? moment(value).format('DD.MM.YYYY HH:mm') : ''

export const disabledDate = current => current && current < moment().endOf('day')
