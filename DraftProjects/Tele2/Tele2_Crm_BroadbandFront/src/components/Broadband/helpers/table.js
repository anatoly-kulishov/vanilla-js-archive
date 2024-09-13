import moment from 'moment'
import React from 'react'
import { Tag } from 'antd'

/** Render */
export const renderDateTime = (rawDateTime, isUtc) => {
  let momentDateTime

  if (isUtc) {
    momentDateTime = moment.utc(rawDateTime).local()
  } else {
    momentDateTime = moment(rawDateTime)
  }

  if (momentDateTime.isValid()) {
    return momentDateTime.format('DD-MM-YYYY HH:mm')
  }
  return '-'
}

export const renderList = (list, keyName) => {
  return list?.map(el => <div>{el?.[keyName]}</div>)
}

export const renderStatusTag = status => {
  let tagColor

  switch (status) {
    case 'Отменено':
      tagColor = null
      break
    case 'Обработка':
      tagColor = 'gold'
      break
    case 'Ошибка':
      tagColor = 'geekblue'
      break
    case 'Отправлено в РТК':
      tagColor = 'green'
      break
    case 'Отправлено обновление заявки':
      tagColor = 'green'
      break
    case 'Завершено':
      tagColor = 'green'
      break
    case 'Ошибка записи изменений':
      tagColor = 'red'
      break
    default:
      tagColor = 'blue'
  }

  return <Tag color={tagColor}>{status}</Tag>
}

/** Sorts */
export const sortByValue = (firstVal, secondVal) => {
  return firstVal - secondVal
}

export const sortByLength = (firstStr, secondStr) => {
  return firstStr?.length - secondStr?.length
}

export const sortByDate = (firstDate, secondDate) => {
  return moment(firstDate).valueOf() - moment(secondDate).valueOf()
}
