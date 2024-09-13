import { call, put, select } from 'redux-saga/effects'
import { notification } from 'antd'

import api from 'utils/api'

import { selectPersonalAccount } from 'reducers/personalInfo/selectors'
import { selectIsClientHasPep } from 'webseller/common/signing/selectors'
import { selectHandlingState } from 'reducers/internal/selectors'
import {
  checkPepCodeSagaDecorator,
  createHandlerSuccessfulPepCodeCheck,
  getPaperDocumentsSagaDecorator,
  getSmsCodeSagaDecorator
} from 'webseller/common/signing/sagas/sagas'
import BussinessLogicError, { isBussinessLogicError } from 'webseller/helpers/BussinessLogicError'
import { SMS_DOCUMENT_NAMES } from 'webseller/constants'

import { checkChangeSimHistoryLimit, createRequestBodyCorrectRfaApplication, createRequestParamsCreateInteractionReplaceSim } from './helpers'
import {
  initReplaceSimProcessSuccess,
  initReplaceSimProcessError,
  getReplaceAvailabilityError,
  getReplaceAvailabilitySuccess,
  sendSimChangesSuccess,
  sendSimChangesError
} from '../reducer'
import { selectIsFromMarkersReplaceSim } from '../selectors'

export const DOCUMENT_TYPE_IDS_MAP = {
  10: 'Заявление на замену SIM-карты'
}

const validateStatusDefault = status => status >= 200 && status < 300

export function * initReplaceSimSaga ({ payload }) {
  try {
    const personalAccount = yield select(selectPersonalAccount)

    const operationIsNotAvailable = personalAccount.SubscriberStatus !== 1
    if (operationIsNotAvailable) {
      throw new BussinessLogicError('Операция недоступна для абонента. Статус отличен от Активен.')
    }

    const responseHistoryChangeSim = yield call(api.getHistoryChangeSim, { msisdn: personalAccount.Msisdn })
    const historyChangeSim = responseHistoryChangeSim.data?.Data

    if (!Array.isArray(historyChangeSim)) {
      throw new BussinessLogicError('История замены SIM недоступна')
    }

    const isHistoryLimitExceeded = yield call(checkChangeSimHistoryLimit, historyChangeSim)
    if (isHistoryLimitExceeded) {
      throw new BussinessLogicError(
        'Операция недоступна для абонента. По одному номеру замена доступна не более 2-х раз в сутки'
      )
    }

    yield put(initReplaceSimProcessSuccess(payload))
  } catch (err) {
    yield put(initReplaceSimProcessError())
    notification.error({
      message: 'Замена SIM',
      description: isBussinessLogicError(err) ? err.message : 'Ошибка при инициализации'
    })
  }
}

export function * getSellAvailabilitySaga ({ payload }) {
  const { fetchChangeSimCardAvailability } = api

  try {
    const { data: replaceAvailability, status } = yield call(fetchChangeSimCardAvailability, payload)
    if (validateStatusDefault(status)) {
      yield put(getReplaceAvailabilitySuccess({ replaceAvailability }))
    } else {
      yield put(getReplaceAvailabilityError())
      notification.error({
        message: replaceAvailability?.message
      })
    }
  } catch {
    yield put(getReplaceAvailabilityError())
  }
}

export function * sendSimChangesSaga ({ payload }) {
  const { sendSimChanges } = api

  try {
    const { Id: handlingId } = yield select(selectHandlingState)
    const isFromMarkers = yield select(selectIsFromMarkersReplaceSim)
    const requestBody = {
      ...payload,
      handlingId,
      isFromMarkers
    }

    const { data: response, status } = yield call(sendSimChanges, requestBody)
    if (validateStatusDefault(status)) {
      yield put(sendSimChangesSuccess({ response }))
    } else {
      yield put(sendSimChangesError({ response }))
    }
  } catch {
    yield put(sendSimChangesError())
  }
}

export function * getSmsCodeSaga () {
  const { Msisdn } = yield select(selectPersonalAccount)
  const isClientHasPep = yield select(selectIsClientHasPep)

  const requestBody = {
    msisdn: Msisdn,
    serviceId: isClientHasPep ? 2 : 3,
    operationId: 2
  }

  yield call(getSmsCodeSagaDecorator, { requestBody })
}

export function * checkPepCodeSaga ({ payload: code }) {
  const { Msisdn } = yield select(selectPersonalAccount)
  const isClientHasPep = yield select(selectIsClientHasPep)

  const documentRequestData = yield call(createRequestBodyCorrectRfaApplication, { isArchive: true, code })
  const handleSuccessfulCheck = yield call(createHandlerSuccessfulPepCodeCheck, {
    documentRequestData,
    smsDocumentName: SMS_DOCUMENT_NAMES.REPLACE_SIM
  })

  const requestData = {
    code,
    serviceId: isClientHasPep ? 2 : 3,
    msisdn: Msisdn
  }

  yield call(checkPepCodeSagaDecorator, { requestData, handleSuccessfulCheck })
}

export function * getPaperDocumentsSaga () {
  yield call(getPaperDocumentsSagaDecorator, { preflightGetPaperDocuments })
}

function * preflightGetPaperDocuments () {
  const { fetchCreateDocument } = api

  const { Id: handlingId } = yield select(selectHandlingState)
  const body = yield call(createRequestBodyCorrectRfaApplication, { isArchive: false })

  return [
    {
      title: DOCUMENT_TYPE_IDS_MAP[10],
      request: fetchCreateDocument,
      params: [handlingId, body]
    }
  ]
}

export function * createInteractionSaga () {
  const { createInteraction } = api
  const params = yield call(createRequestParamsCreateInteractionReplaceSim)
  yield call(createInteraction, params)
}
