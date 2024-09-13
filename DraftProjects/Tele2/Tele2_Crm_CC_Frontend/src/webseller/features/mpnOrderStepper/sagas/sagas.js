import { call, put, select } from 'redux-saga/effects'
import { notification } from 'antd'

import { getInitialClientPersonalData } from 'webseller/helpers/personalData'
import { SMS_DOCUMENT_NAMES } from 'webseller/constants'
import api from 'utils/api'

import { createRequestBodyCorrectRfaApplication, createRequestParamsCreateInteraction } from './helpers'
import { selectIsClientHasPep, selectSignedDocuments } from 'webseller/common/signing/selectors'
import { selectPersonalAccount } from 'reducers/personalInfo/selectors'
import { selectHandlingState } from 'reducers/internal/selectors'
import { isSuccessfulResponse } from 'webseller/helpers/api'
import { getHandlingState, getPersonalAccountState } from 'selectors/index'

import {
  checkPepCodeSagaDecorator,
  createHandlerSuccessfulPepCodeCheck,
  getPaperDocumentsSagaDecorator,
  getSmsCodeSagaDecorator
} from 'webseller/common/signing/sagas/sagas'

import {
  checkSimMnpError,
  checkSimMnpSuccess,
  createMnpRequestError,
  createMnpRequestSuccess,
  getInitialPersonalDataMnpError,
  getInitialPersonalDataMnpSuccess,
  getMnpAvailableStatusError,
  getMnpAvailableStatusSuccess,
  initMnpOrderProcess,
  setMnpOrderProcessStep
} from '../actions'
import { MNP_ORDER_PROCESS_STEPS } from '../constants'
import {
  selectMpnOrderDocumentData,
  selectMpnOrderTransferNumber,
  selectMpnOrderTransferNumberOld
} from 'webseller/features/mpnOrderStepper/selectors'
import { selectSubmittedTransferTimeSlot } from 'webseller/common/transferTimeStep/selectors'

export function * getMnpAvailableStatusSaga ({ payload }) {
  const errorMessage = 'Ошибка с получением статуса по MNP'
  const { fetchMnpSimCardAvailability } = api

  try {
    const { data: response, status } = yield call(fetchMnpSimCardAvailability, payload)
    switch (status) {
      case 200: {
        yield put(getMnpAvailableStatusSuccess({ response }))
        if (response?.isAvailable) {
          yield put(initMnpOrderProcess())
        } else {
          yield put(getMnpAvailableStatusError())
          notification.error({
            message: 'Данный номер не доступен для оформление MNP заявки',
            description: response?.message
          })
        }
        break
      }
      default: {
        yield put(getMnpAvailableStatusError())
        notification.error({
          message: 'Оформление MNP заявки',
          description: response?.message
        })
      }
    }
  } catch (exception) {
    yield put(getMnpAvailableStatusError())
    notification.error({
      message: errorMessage,
      description: exception.message
    })
  }
}

export function * checkSimMnpSaga ({ payload }) {
  const operationName = 'Оформление MNP заявки'
  const { checkMnpSimAvailability } = api

  try {
    const { data: response, status } = yield call(checkMnpSimAvailability, payload)
    if (isSuccessfulResponse(status)) {
      yield put(checkSimMnpSuccess(payload))
      yield put(setMnpOrderProcessStep(MNP_ORDER_PROCESS_STEPS.TRANSFER_TIME))
    } else {
      yield put(checkSimMnpError())
      notification.error({
        message: operationName,
        description: response?.message
      })
    }
  } catch {
    yield put(checkSimMnpError())
    notification.error({
      message: operationName,
      description: 'Номер недоступен для переноса'
    })
  }
}

export function * getSmsCodeSaga () {
  const { Msisdn } = yield select(selectPersonalAccount)
  const isClientHasPep = yield select(selectIsClientHasPep)

  const requestBody = {
    msisdn: Msisdn,
    serviceId: isClientHasPep ? 2 : 3,
    operationId: 6
  }

  yield call(getSmsCodeSagaDecorator, { requestBody })
}

export function * checkPepCodeSaga ({ payload: code }) {
  const { Msisdn } = yield select(getPersonalAccountState)
  const isClientHasPep = yield select(selectIsClientHasPep)

  const documentRequestData = yield call(createRequestBodyCorrectRfaApplication, { isArchive: true, isClientHasPep })
  const handleSuccessfulCheck = yield call(createHandlerSuccessfulPepCodeCheck, {
    documentRequestData,
    smsDocumentName: SMS_DOCUMENT_NAMES.CHANGING_CODE_WORD
  })

  const requestData = {
    operationId: 6,
    serviceId: isClientHasPep ? 2 : 3,
    msisdn: Msisdn,
    code
  }

  yield call(checkPepCodeSagaDecorator, { requestData, handleSuccessfulCheck })
}

export function * getPaperDocumentsSaga () {
  yield call(getPaperDocumentsSagaDecorator, { preflightGetPaperDocuments })
}

function * preflightGetPaperDocuments () {
  const { fetchCreateDocument } = api
  const isClientHasPep = yield select(selectIsClientHasPep)

  const { Id: handlingId } = yield select(selectHandlingState)
  const body = yield call(createRequestBodyCorrectRfaApplication, { isClientHasPep })

  return [
    {
      title: SMS_DOCUMENT_NAMES.CHANGING_CODE_WORD,
      request: fetchCreateDocument,
      params: [handlingId, body]
    }
  ]
}

export function * getInitialPersonalDataSaga () {
  const initialPersonalData = yield call(getInitialClientPersonalData)

  if (initialPersonalData) {
    yield put(getInitialPersonalDataMnpSuccess(initialPersonalData))
  } else {
    yield put(getInitialPersonalDataMnpError())
  }
}

export function * createMnpRequestSaga () {
  const operationName = 'Создания MNP заявки'
  const { createMnpReplaceNumberRequest } = api

  const signedDocuments = yield select(selectSignedDocuments)
  const transferNumber = yield select(selectMpnOrderTransferNumber)
  const transferNumberOld = yield select(selectMpnOrderTransferNumberOld)
  const transferTimeSlot = yield select(selectSubmittedTransferTimeSlot)
  const documentData = yield select(selectMpnOrderDocumentData)
  const handling = yield select(getHandlingState)

  try {
    const { data: response, status } = yield call(createMnpReplaceNumberRequest, {
      HandlingId: handling?.id,
      Msisdn: transferNumber,
      MnpMsisdn: transferNumberOld,
      PortingDate: transferTimeSlot,
      IsArchive: true,
      file: signedDocuments,
      ...documentData
    })
    if (isSuccessfulResponse(status)) {
      yield put(createMnpRequestSuccess(response))
      yield put(setMnpOrderProcessStep(MNP_ORDER_PROCESS_STEPS.RESULT))
    } else {
      yield put(createMnpRequestError())
      notification.error({
        message: operationName,
        description: response?.message
      })
    }
  } catch (exception) {
    yield put(createMnpRequestError())
    notification.error({
      message: operationName,
      description: exception?.message
    })
  }
}

export function * createInteractionMnpOrderSaga () {
  const { createInteraction } = api

  const requestParams = yield call(createRequestParamsCreateInteraction)

  yield call(createInteraction, requestParams)
}
