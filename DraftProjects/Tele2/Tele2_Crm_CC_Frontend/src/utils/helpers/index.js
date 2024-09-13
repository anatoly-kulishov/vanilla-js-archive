/* eslint-disable */
import React, { Fragment } from 'react'
import moment from 'moment'
import { message } from 'antd'

export function stringSorter(a, b) {
  a = a || ''
  b = b || ''

  if (a === b) {
    return 0
  } else if (a > b) {
    return 1
  }
  return -1
}

export function isoDateSorter(a, b) {
  const minDate = new Date(-8640000000000000)
  const aDate = a === null ? minDate : new Date(a)
  const bDate = b === null ? minDate : new Date(b)

  if (aDate === bDate) {
    return 0
  } else if (aDate > bDate) {
    return 1
  }
  return -1
}

export function numSorter(a, b) {
  if (a === b) {
    return 0
  } else if (a === null) {
    return -1
  } else if (b === null) {
    return 1
  } else if (Number(a) > Number(b)) {
    return 1
  }
  return -1
}

export const findReason = (reasons, reasonId) => {
  let reason

  const deepFindReasons = arr =>
    arr.find(item => {
      const isReason = item.ReasonId === reasonId

      if (isReason) {
        reason = item
      } else if (Array.isArray(item.Children)) {
        deepFindReasons(item.Children) // eslint-disable-line no-unused-expressions
      }
    })

  deepFindReasons(reasons)

  return reason
}

export const clearReasonsCategories = reasons =>
  reasons.map(reason => {
    reason.Children = Array.isArray(reason.Children) ? clearReasonsCategories(reason.Children) : null

    const Categories =
      reason.Categories &&
      reason.Categories.map(category => {
        const { active, tooltipSelectValue, tooltipCommentValue, ...item } = category

        return item
      })

    return {
      ...reason,
      Categories
    }
  })

export const filterReasonsByString = (reasons, str) => {
  const filteredArray = []

  const deepFindReasons = reasons =>
    reasons.map((item, __) => {
      const indexOfName = item.ReasonName.toLowerCase().indexOf(str.toLowerCase()) !== -1
      const indexOfId = item.ReasonId.toString().indexOf(str) !== -1

      if (indexOfName || indexOfId) {
        filteredArray.push(item)
      } else if (item.Children && item.Children.length) {
        return deepFindReasons(item.Children)
      }
      return item
    })

  deepFindReasons(reasons)

  return filteredArray
}

export const filterReasonsByCategory = (reasons, categoryName) => {
  const filteredArray = []

  const deepFindReasons = reasons =>
    reasons.map((item, __) => {
      const indexOfCategory = item.Categories.find(
        category => category.CategoryName.toLowerCase().indexOf(categoryName.toLowerCase()) !== -1
      )

      if (indexOfCategory) {
        filteredArray.push(item)
      } else if (item.Children && item.Children.length) {
        return deepFindReasons(item.Children)
      }
      return item
    })

  deepFindReasons(reasons)

  return filteredArray
}

export const findExpandedReasonsIds = reasons => {
  const newReasons = []

  const deepFilter = arr =>
    arr.filter(reason => {
      reason.Children = Array.isArray(reason.Children) ? deepFilter(reason.Children) : null

      if (reason.IsExpanded) {
        newReasons.push(reason.ReasonId)
      }

      return reason
    })

  const noLinkedReasons = reasons.map(item => ({ ...item }))
  deepFilter(noLinkedReasons)

  return newReasons
}

export const findReasonParentIds = (reasons, reasonId) => {
  const reasonsIds = []

  const findReasonParents = (arr, id) => {
    if (id) {
      const parent = findReason(arr, id)

      if (parent && parent.ParentId && parent.ParentId !== 0) {
        reasonsIds.push(parent.ParentId)
        findReasonParents(arr, parent.ParentId)
      }
    }
  }

  findReasonParents(reasons, reasonId)

  return reasonsIds
}

export const validateEmail = email => {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line
  return re.test(String(email).toLowerCase())
}

export const insertArrayInArray = (arr1, arr2, pos) => {
  Array.prototype.splice.apply(arr1, [pos, arr2.length].concat(arr2))
  return arr1
}

export const checkRight = (user, right) => {
  return user?.Permissions?.includes(right)
}

export const checkRights = (user, rights) => {
  let isAllOk = true
  for (let i = 0; i < rights.length; i++) {
    isAllOk = isAllOk && user.Permissions.includes(rights[i])
  }
  return isAllOk
}

export const findRightsStartsWith = (user, right) => {
  return user.Permissions?.filter(permission => permission.startsWith(right))
}

export const getParsedTimeNow = date => {
  const copyDate = date.clone()
  copyDate
    .hour(moment().hour())
    .minutes(moment().minutes())
    .seconds(moment().seconds())
    .milliseconds(moment().milliseconds())
  return copyDate
}

export const base64ImageToBlob = str => {
  // extract content type and base64 payload from original string
  const pos = str.indexOf(';base64,')
  const type = str.substring(5, pos)
  const b64 = str.substr(pos + 8)
  // decode base64
  const imageContent = atob(b64)
  // create an ArrayBuffer and a view (as unsigned 8-bit)
  const buffer = new ArrayBuffer(imageContent.length)
  const view = new Uint8Array(buffer)
  // fill the view, using the decoded base64
  for (let n = 0; n < imageContent.length; n++) {
    view[n] = imageContent.charCodeAt(n)
  }
  // convert ArrayBuffer to Blob
  return new Blob([buffer], { type: type })
}

export function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || ''
  sliceSize = sliceSize || 512

  var byteCharacters = atob(b64Data)
  var byteArrays = []

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize)

    var byteNumbers = new Array(slice.length)
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    var byteArray = new Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }

  var blob = new Blob(byteArrays, { type: contentType })
  return blob
}

export const ckeckIsAdministrator = user => {
  const ReadMassTechnicalProblem = 'CC:ReadMassTechnicalProblem'
  const AdmMassTechnicalProblem = 'CC:AdmMassTechnicalProblem'
  const AdmMassTechProblemTemplate = 'CC:AdmMassTechProblemTemplate'
  const MassProblemGeneralAdmin = 'CC:MassProblemGeneralAdmin'
  const isReasonCategoryAdmin = 'CC:ReasonCategoryAdmin'
  const ServiceToInteractionConfigRead = 'CC:ServiceToInteractionConfigRead'
  const ServiceToInteractionConfigure = 'CC:ServiceToInteractionConfigure'

  const isMTP =
    user.Permissions.includes(AdmMassTechnicalProblem) || user.Permissions.includes(ReadMassTechnicalProblem)
  const isTemplate =
    user.Permissions.includes(AdmMassTechnicalProblem) || user.Permissions.includes(AdmMassTechProblemTemplate)
  const isSettings = user.Permissions.includes(MassProblemGeneralAdmin)
  const isReasonCategory = user.Permissions.includes(isReasonCategoryAdmin)
  const isServiceToInteraction =
    user.Permissions.includes(ServiceToInteractionConfigRead) ||
    user.Permissions.includes(ServiceToInteractionConfigure)

  const isAdministrator = isMTP || isTemplate || isSettings || isReasonCategory || isServiceToInteraction
  return isAdministrator
}

export const replaceAngelBrakets = (str, obj) => {
  const objList = Object.keys(obj).map(item => `<${item}>`)
  const regExp = new RegExp(objList.join('|'), 'gim')

  return str.replace(regExp, matched => {
    const key = matched.replace(new RegExp('[<>]', 'g'), '')
    return obj[key]
  })
}

export const formatCoordinates = selectedCoordinates => {
  const arr = selectedCoordinates.match(/\d{1,}/g)

  const minusItem = ['_', '_']
  {
    const index = selectedCoordinates.indexOf('-')
    if (index !== -1) {
      if (index < 3) {
        minusItem[0] = '-'
        if (selectedCoordinates.indexOf('-', index + 1) !== -1) {
          minusItem[1] = '-'
        }
      } else {
        minusItem[1] = '-'
      }
    }
  }

  let result = ''
  if (arr && arr.length === 4) {
    for (let index = 0; index < 4; index++) {
      const str = arr[index]
      if (index % 2 === 0) {
        let newArr = ['_', '_', '_']
        const arrNumb = str.split('').reverse()
        newArr = insertArrayInArray(newArr, arrNumb, 0)
        newArr.reverse()
        result += minusItem[index * 0.5] + ' ' + newArr.join('') + '.'
      } else {
        let newArr = ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_', '_']
        newArr = insertArrayInArray(newArr, str, 0)
        result += newArr.join('')
        if (index === 1) {
          result += ', '
        }
      }
    }
  } else {
    const str = selectedCoordinates.replace(/\D/g, '')
    result = minusItem[0] + ' ' + str.substring(0, 17) + ' ' + minusItem[1] + str.substring(17)
  }
  return result
}
/**
 * Formats location coordinates
 * @param {String} lat - latitude.
 * @param {String} lng - longitude.
 * @return {String} latitude
 * @return {String} longitude
 */
export const editCoordinatesFormat = (lat, lng) => {
  const latitude = +lat
  const longitude = +lng
  return {
    latitude: latitude.toFixed(6).toString(),
    longitude: longitude.toFixed(6).toString()
  }
}

export const insertNodeAfter = (referenceNode, newNode) => {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

export const listenToMultipleEvents = (element, eventsList, handler) => {
  eventsList.map(event => element.addEventListener(event, handler, false))
}

export const copyElementTextToClipboard = (elementTarget, successMessage) => {
  const selection = window.getSelection()
  if (selection.type !== 'Range') {
    selection.selectAllChildren(elementTarget)
    document.execCommand('copy')
    selection.removeAllRanges()
    message.success(successMessage, [1])
  }
}

// TODO
// call colors something meaningful
export const colors = {
  success: '#ddfade',
  warning: '#fffbe6',
  info: '#f0fdff',
  error: '#fff2f0'
}

export const formatWarnings = warnings => {
  const isNeedOrder = warnings?.length > 1

  if (isNeedOrder) {
    return warnings?.map((item, index) => {
      const order = index + 1 + '. '

      return (
        <Fragment key={index}>
          {order + item}
          <br />
        </Fragment>
      )
    })
  } else {
    return warnings
  }
}

export function routeMatch(pathname, directUrl) {
  const urlMatch = pathname.substring(pathname.indexOf('/', 0), pathname.indexOf('/', 1))
  return urlMatch !== '/card' ? `${urlMatch}/card/${directUrl}` : `/card/${directUrl}`
}

export const formatNumber = number =>
  number || number === 0
    ? number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '0.00'
export const formatNumberWithSeparator = number => number?.toLocaleString('ru')
export const formatDateWithMskZone = date => date && moment.utc(date).utcOffset(3).format('DD.MM.YYYY HH:mm')
export const formatDateWithoutTime = date => date && moment.utc(date).local().format('DD.MM.YYYY')
export const formatDateWithSeconds = date => date.format('YYYY-MM-DDTHH:mm:ss')
export const formatDateWithFullTimeUtc= date => moment.utc(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
export const dateWithUtc = date => moment.utc(date).format('YYYY-MM-DDTHH:mm:ss')
export const formatMsisdn = msisdn => {
  if (msisdn) {
    let result = msisdn
    const isCorrect = result.length === 11
    if (isCorrect) {
      result = result.slice(1)
    }

    const isWithoutPrefix = result.length === 10
    if (isWithoutPrefix) {
      return result.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '+7 ($1) $2-$3-$4')
    }
  }
}

export const getErrorDescription = data => {
  const { message, errors, title, warnings } = data

  let errorsList = []

  if (errors) {
    errorsList = Object.values(errors).reduce((acc, item) => {
      acc.push(...item)
      return acc
    }, [])
  } else if (warnings) {
    errorsList = formatWarnings(warnings)
  }

  let description

  if (message) {
    description = message
  }
  if (message && errorsList.length) {
    description = (
      <>
        {message}
        <br />
        {errorsList}
      </>
    )
  } else if (title) {
    description = title
  } else {
    description = 'Произошла внутренняя ошибка. Обратитесь к администратору'
  }

  return description
}

export const getRandomIntInRange = (min, max) => Math.floor(Math.random() * (max - min)) + min
