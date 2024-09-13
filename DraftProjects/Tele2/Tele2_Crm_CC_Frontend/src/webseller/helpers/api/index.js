import { notification } from 'antd'
import { select } from 'redux-saga/effects'

import { SigningType } from 'webseller/common/signing/helpers'
import { selectSigningType } from 'webseller/common/signing/selectors'
import { joinToString } from 'webseller/helpers'

export const isSuccessfulResponse = status => status >= 200 && status < 300

export const delay = ms => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(null)
    }, ms)
  })
}

export function * mapAgreementsRequest (agreements) {
  if ('isNotAcceptDs' in agreements) {
    const signingType = yield select(selectSigningType)

    const isNotAcceptDs = signingType === SigningType.PAPER_DOCUMENTS && agreements.isNotAcceptDs === true

    return {
      ...agreements,
      isNotAcceptDs
    }
  }

  return agreements
}

export const createShowErrorNotification = defaultMessage => responseData => {
  notification.error({
    message: responseData?.message || defaultMessage
  })
}

export const getErrorFromBlobResponse = async responseData => {
  const errorJson = await responseData.text()

  return JSON.parse(errorJson)
}

export const getFileNameFromResponse = ({ response, defaultFileName }) => {
  try {
    const contentDisposition = response.headers['content-disposition']
    const fileNamePart = contentDisposition.split(';').find(part => part.startsWith('filename='))

    const [, encodedFileName] = fileNamePart.split('filename=')

    return encodedFileName ? decodeURI(encodedFileName) : defaultFileName
  } catch {
    return defaultFileName
  }
}

export const createCommentForInteraction = ({ isFromMarkers, isPep }) => {
  const comment = joinToString([
    isFromMarkers ? 'Витрина' : null,
    isPep ? 'ПЭП' : null
  ], ', ')

  return comment || undefined
}
