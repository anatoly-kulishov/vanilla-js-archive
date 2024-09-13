import { all, call, select } from 'redux-saga/effects'

import api from 'utils/api'
import { selectHandlingState } from 'reducers/internal/selectors'
import { selectSignedDocuments } from 'webseller/common/signing/selectors'
import { selectorsSigningRemote } from 'websellerRemote/Signing'

export function * addSignedDocumentsToOperationsSagaDecorator ({ ticketNumber, serviceRequestId, isRemoteSigning = false }) {
  const { ticketAddFile } = api

  const { Id: handlingId } = yield select(selectHandlingState)
  const documents = yield select(isRemoteSigning
    ? selectorsSigningRemote.selectSignedDocuments
    : selectSignedDocuments
  )

  const results = yield all(
    documents.map(document =>
      call(function * () {
        try {
          const formData = new FormData()
          formData.append('bpmFile', document)
          formData.append('serviceRequestId', serviceRequestId)
          formData.append('number', ticketNumber)
          formData.append('HandlingId', handlingId)

          const { data } = yield call(ticketAddFile, formData)

          return Boolean(data.isSuccess)
        } catch (err) {
          return false
        }
      })
    )
  )
  const isAllDocumentsAdded = results.every(Boolean)
  if (!isAllDocumentsAdded) {
    throw new Error()
  }
}

export const GenderValueDocumentOperations = {
  0: 'муж.',
  1: 'жен.'
}

export const mapBpmParamsToRequest = (params) => {
  if (params) {
    return params.map(param => {
      const value = param.value !== null && param.value !== undefined ? String(param.value) : ''

      return {
        ...param,
        value
      }
    })
  }

  return params
}
