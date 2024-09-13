import { call, put, select } from 'redux-saga/effects'

import { selectSearchParams } from 'webseller/features/webSellerSearch/reducer/selectors'
import { selectIsClientHasPep } from 'webseller/common/signing/selectors'
import { selectHandlingState } from 'reducers/internal/selectors'
import { isSuccessfulResponse } from 'webseller/helpers/api'
import { getPersonalAccountState } from 'selectors/index'
import { SMS_DOCUMENT_NAMES } from 'webseller/constants'
import {
  checkPepCodeSagaDecorator,
  createHandlerSuccessfulPepCodeCheck,
  getPaperDocumentsSagaDecorator,
  getSmsCodeSagaDecorator
} from 'webseller/common/signing/sagas/sagas'
import api from 'utils/api'

import { createDocumentRequestBodyChangingClientStatus, createRequestParamsCreateInteraction } from './helper'
import {
  getB2bClientMinimalInfoError,
  getB2bClientMinimalInfoSuccess, getSubscriberPersonalDataError,
  getSubscriberPersonalDataSuccess,
  setTariffPlan
} from '../actions'
import { clientCategories } from 'constants/personalAccountStrings'

export function * initChangingTariffPlanSaga ({ payload }) {
  const sessionParams = yield select(selectSearchParams)

  if (sessionParams?.clientCategory === clientCategories.B2B) {
    yield call(getB2bClientMinimalInfoSaga, { branchId: sessionParams?.branchId, clientId: sessionParams?.clientId })
  }

  yield put(setTariffPlan(payload))
}

export function * getSubscriberPersonalDataSaga (payload) {
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

export function * getSmsCodeChangingTariffPlanSaga () {
  const { Msisdn: msisdn } = yield select(getPersonalAccountState)
  const isClientHasPep = yield select(selectIsClientHasPep)

  const requestBody = {
    msisdn,
    serviceId: isClientHasPep ? 2 : 3,
    operationId: 7
  }

  yield call(getSmsCodeSagaDecorator, { requestBody })
}

export function * checkPepCodeChangingTariffPlanSaga ({ payload: code }) {
  const { Msisdn: msisdn } = yield select(getPersonalAccountState)
  const isClientHasPep = yield select(selectIsClientHasPep)

  const documentRequestData = yield call(createDocumentRequestBodyChangingClientStatus, { code, isArchive: true })
  const handleSuccessfulCheck = yield call(createHandlerSuccessfulPepCodeCheck, {
    documentRequestData,
    smsDocumentName: SMS_DOCUMENT_NAMES.CHANGING_TARIFF_PLAN
  })

  const requestData = {
    code,
    msisdn,
    serviceId: isClientHasPep ? 2 : 3
  }

  yield call(checkPepCodeSagaDecorator, { requestData, handleSuccessfulCheck })
}

export function * getPaperDocumentsChangingTariffPlanSaga () {
  function * preflightGetPaperDocuments () {
    const { fetchCreateDocument } = api

    const { Id: handlingId } = yield select(selectHandlingState)
    const body = yield call(createDocumentRequestBodyChangingClientStatus, { isArchive: false })

    return [
      {
        title: SMS_DOCUMENT_NAMES.CHANGING_TARIFF_PLAN,
        request: fetchCreateDocument,
        params: [handlingId, body]
      }
    ]
  }

  yield call(getPaperDocumentsSagaDecorator, { preflightGetPaperDocuments })
}

export function * getB2bClientMinimalInfoSaga (params) {
  const { fetchB2bClientMinimalInfo } = api

  try {
    const { data: response, status } = yield call(fetchB2bClientMinimalInfo, params)
    if (isSuccessfulResponse(status)) {
      yield put(getB2bClientMinimalInfoSuccess({ response }))
    } else {
      yield put(getB2bClientMinimalInfoError({ response }))
    }
  } catch {
    yield put(getB2bClientMinimalInfoError())
  }
}

export function * createInteractionChangingClientStatusSaga () {
  const { createInteraction } = api

  const requestParams = yield call(createRequestParamsCreateInteraction)

  yield call(createInteraction, requestParams)
}
