import React from 'react'
import { call, put, select, all } from 'redux-saga/effects'
import { notification } from 'antd'

import { getPersonalAccountState } from 'selectors/index'
import api from 'utils/api'
import {
  addSignedDocumentsTerminationClient,
  addSignedDocumentsTerminationClientError,
  changeStepTerminationClient,
  changeTypeTerminationClient,
  executeTerminationClientError,
  executeTerminationClientPartiallySuccess,
  executeTerminationClientSuccess,
  initTerminationClientError,
  initTerminationClientSuccess,
  verifySmsCodeTerminationClientSuccess
} from '../reducer'
import { getPaperDocumentsSagaDecorator } from 'webseller/common/signing/sagas/sagas'
import { selectHandlingState } from 'reducers/internal/selectors'
import { createExecuteTerminationClientRequestBody, createRequestBodyTerminationClientDocument } from './helpers'
import { verifySmsCodeSagaDecorator } from 'webseller/common/verification/sagas'
import {
  selectServiceRequestIdTerminationClient,
  selectTicketNumberTerminationClient,
  selectTypeTerminationClient
} from '../selectors'
import { TerminationClientStep, TerminationClientType } from '../helpers'
import { addSignedDocumentsToOperationsSagaDecorator } from 'webseller/helpers/operations'
import { getInitialClientPersonalData } from 'webseller/helpers/personalData'
import { resetSigning } from 'webseller/common/signing/reducer'
import { getDocumentIdentityTypes } from 'reducers/documentIdentity/documentIdentityReducer'

export function * initTerminationClientSaga () {
  const { fetchTerminationClientAvailability } = api

  try {
    const { Msisdn: msisdn } = yield select(getPersonalAccountState)

    const personalData = yield call(getInitialClientPersonalData)
    const { data: availability } = yield call(fetchTerminationClientAvailability, msisdn)
    const { isAvailable, isOnline, checklists } = availability || {}

    if (isAvailable) {
      yield put(initTerminationClientSuccess({ isOnline, personalData }))
      yield put(getDocumentIdentityTypes())
    } else {
      const errors = checklists?.reduce((accErrors, currError) => {
        const { message } = currError || {}
        if (message) {
          accErrors.push(message)
        }
        return accErrors
      }, [])

      if (errors?.length > 0) {
        notification.error({
          message: 'Для выполнения расторжения договора необходимо:',
          description: (
            <>
              {errors.map(message => (
                <div key={message}>{message}</div>
              ))}
            </>
          ),
          duration: 10
        })
        yield put(initTerminationClientError())
      } else {
        throw new Error()
      }
    }
  } catch {
    notification.error({
      message: 'Расторжение номера в настоящий момент недоступно'
    })
    yield put(initTerminationClientError([]))
  }
}

export function * getPaperDocumentsTerminationClientSaga () {
  yield call(getPaperDocumentsSagaDecorator, { preflightGetPaperDocuments })
}

function * preflightGetPaperDocuments () {
  const { fetchCreateDocument } = api

  const { Id: handlingId } = yield select(selectHandlingState)

  const terminationDocument = yield call(createRequestBodyTerminationClientDocument)

  return [
    {
      title: 'Заявление на расторжение договора',
      request: fetchCreateDocument,
      params: [handlingId, terminationDocument]
    }
  ]
}

export function * verifySmsCodeTerminationClientSaga ({ payload: code }) {
  const handleSuccess = function * () {
    yield put(verifySmsCodeTerminationClientSuccess())
  }

  yield call(verifySmsCodeSagaDecorator, { code, handleSuccess })
}

export function * executeTerminationClientSaga () {
  const terminationClientType = yield select(selectTypeTerminationClient)
  const saga =
    terminationClientType === TerminationClientType.ONLINE
      ? executeTerminationClientOnlineSaga
      : executeTerminationClientOfflineSaga

  yield call(saga)
}

function * executeTerminationClientOnlineSaga () {
  const { fetchExecuteTerminationClient } = api

  try {
    const { Msisdn: msisdn } = yield select(getPersonalAccountState)
    const params = { msisdn }
    const body = yield call(createExecuteTerminationClientRequestBody)

    const { data, status } = yield call(fetchExecuteTerminationClient, { params, body })

    const { isOnline } = data || {}

    if (status === 200) {
      if (isOnline) {
        yield put(executeTerminationClientSuccess({ isOnline }))
      } else {
        const { serviceRequestId, number: ticketNumber } = data || {}

        if (ticketNumber && serviceRequestId) {
          yield all([
            put(executeTerminationClientPartiallySuccess({ ticketNumber, serviceRequestId })),
            put(addSignedDocumentsTerminationClient())
          ])
        } else {
          throw new Error()
        }
      }
    } else {
      yield all([
        put(resetSigning()),
        put(changeTypeTerminationClient(TerminationClientType.OFFLINE)),
        put(changeStepTerminationClient(TerminationClientStep.SIGNING))
      ])

      notification.error({
        message: 'Онлайн расторжение недоступно'
      })
    }
  } catch {
    yield put(executeTerminationClientError())
  }
}

function * executeTerminationClientOfflineSaga () {
  const { fetchExecuteTerminationClient } = api

  try {
    const { Msisdn: msisdn } = yield select(getPersonalAccountState)
    const params = { msisdn }
    const body = yield call(createExecuteTerminationClientRequestBody)

    const { data, status } = yield call(fetchExecuteTerminationClient, { params, body })

    if (status === 200) {
      const { serviceRequestId, number: ticketNumber } = data || {}

      if (ticketNumber && serviceRequestId) {
        yield all([
          put(executeTerminationClientPartiallySuccess({ ticketNumber, serviceRequestId })),
          put(addSignedDocumentsTerminationClient())
        ])
      } else {
        throw new Error()
      }
    }
  } catch {
    yield put(executeTerminationClientError())
  }
}

export function * addSignedDocumentsSaga () {
  try {
    const ticketNumber = yield select(selectTicketNumberTerminationClient)
    const serviceRequestId = yield select(selectServiceRequestIdTerminationClient)

    yield call(addSignedDocumentsToOperationsSagaDecorator, { ticketNumber, serviceRequestId })

    yield put(executeTerminationClientSuccess())
  } catch {
    yield put(addSignedDocumentsTerminationClientError())
  }
}
