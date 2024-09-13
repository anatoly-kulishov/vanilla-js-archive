import { call, put, select } from 'redux-saga/effects'
import { notification } from 'antd'

import api from 'utils/api'

import {
  changeCodeError,
  changeCodeSuccess,
  getB2bClientMinimalInfoError,
  getB2bClientMinimalInfoSuccess,
  getSubscriberPersonalDataError,
  getSubscriberPersonalDataSuccess
} from 'webseller/features/changeCodeWord/reducer'
import { selectPersonalAccount } from 'reducers/personalInfo/selectors'
import { selectIsClientHasPep, selectSigningType } from 'webseller/common/signing/selectors'
import { selectHandlingState } from 'reducers/internal/selectors'
import { SMS_DOCUMENT_NAMES } from 'webseller/constants'
import {
  checkPepCodeSagaDecorator,
  createHandlerSuccessfulPepCodeCheck,
  getPaperDocumentsSagaDecorator,
  getSmsCodeSagaDecorator
} from 'webseller/common/signing/sagas/sagas'

import { createRequestBodyCorrectRfaApplication, createRequestParamsCreateInteraction } from './helpers'
import { selectPersonalData } from 'webseller/features/changeCodeWord/selectors'
import { selectSessionParams } from 'webseller/features/webSellerSearch/reducer/selectors'
import { isSuccessfulResponse } from 'webseller/helpers/api'
import { SigningType } from 'webseller/common/signing/helpers'

export function * sendCodeWordChangesSaga () {
  const { changeCodeWord } = api

  const { SubscriberId: subscriberId, ClientId: clientId, Msisdn: msisdn, BillingBranchId: branchId } = yield select(selectPersonalAccount)
  const { codeWord: codeword } = yield select(selectPersonalData)
  const { Id: handlingId } = yield select(selectHandlingState)
  const sessionParams = yield select(selectSessionParams)
  const signingType = yield select(selectSigningType)

  try {
    const { data: response, status } = yield call(changeCodeWord, {
      params: {
        branchId: branchId || sessionParams?.branchId,
        msisdn: msisdn || sessionParams?.msisdn,
        subscriberId: subscriberId || undefined,
        handlingId,
        codeword,
        isOnline: signingType === SigningType.SMS_CODE
      },
      query: {
        clientId: clientId || sessionParams?.clientId
      }
    })
    if (isSuccessfulResponse(status)) {
      yield put(changeCodeSuccess({ response }))
    } else {
      notification.error({
        message: 'Изменение кодового слова',
        description: response?.message
      })
      yield put(changeCodeError({ response }))
    }
  } catch (exception) {
    notification.error({
      message: 'Изменение кодового слова',
      description: exception.message
    })
    yield put(changeCodeError())
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
  const { Msisdn } = yield select(selectPersonalAccount)
  const isClientHasPep = yield select(selectIsClientHasPep)

  const documentRequestData = yield call(createRequestBodyCorrectRfaApplication, { code })
  const handleSuccessfulCheck = yield call(createHandlerSuccessfulPepCodeCheck, {
    documentRequestData,
    smsDocumentName: SMS_DOCUMENT_NAMES.CHANGING_CODE_WORD
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
  const body = yield call(createRequestBodyCorrectRfaApplication, {})

  return [
    {
      title: SMS_DOCUMENT_NAMES.CHANGING_CODE_WORD,
      request: fetchCreateDocument,
      params: [handlingId, body]
    }
  ]
}

export function * getSubscriberPersonalDataSaga ({ payload }) {
  const { fetchSubscriberPersonalData } = api

  try {
    const { data: response, status } = yield call(fetchSubscriberPersonalData, payload)
    if (isSuccessfulResponse(status)) {
      yield put(getSubscriberPersonalDataSuccess({ response }))
    } else {
      yield put(getSubscriberPersonalDataError({ response }))
    }
  } catch {
    yield put(getSubscriberPersonalDataError())
  }
}

export function * getB2bClientMinimalInfoSaga ({ payload }) {
  const { fetchB2bClientMinimalInfo } = api

  try {
    const { data: response, status } = yield call(fetchB2bClientMinimalInfo, payload)
    if (isSuccessfulResponse(status)) {
      yield put(getB2bClientMinimalInfoSuccess({ response }))
    } else {
      yield put(getB2bClientMinimalInfoError({ response }))
    }
  } catch {
    yield put(getB2bClientMinimalInfoError())
  }
}

export function * createInteractionSaga () {
  const { createInteraction } = api

  const params = yield call(createRequestParamsCreateInteraction)

  yield call(createInteraction, params)
}
