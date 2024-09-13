import { put, select, call } from 'redux-saga/effects'
import { notification } from 'antd'

import {
  checkIccDuplicateRfaSuccess,
  checkIccDuplicateRfaError,
  getInitialPersonalDataDuplicateRfaSuccess,
  getInitialPersonalDataDuplicateRfaError,
  checkIccDuplicateRfaFailure,
  getMarkerDuplicateRfaSuccess,
  getMarkerDuplicateRfaError,
  executeDuplicateRfaSuccess,
  executeDuplicateRfaError
} from '../reducer'
import api from 'utils/api'
import { getPersonalAccountState } from 'selectors/index'
import { isSuccessfulResponse } from 'webseller/helpers/api'
import { selectAttemptsCountCheckIccDuplicateRfa } from '../selectors'
import { VALID_ATTEMPTS_COUNT_CHECK_ICC } from '../helpers'
import { getInitialClientPersonalData } from 'webseller/helpers/personalData'
import { selectIsClientHasPep } from 'webseller/common/signing/selectors'
import {
  checkPepCodeSagaDecorator,
  createHandlerSuccessfulPepCodeCheck,
  getPaperDocumentsSagaDecorator,
  getSmsCodeSagaDecorator
} from 'webseller/common/signing/sagas/sagas'
import {
  createRequestBodyExecuteOperation,
  createRequestBodyRfaDocument,
  createRequestParamsCreateInteraction,
  preflightGetPaperDocuments
} from './helpers'
import { SMS_DOCUMENT_NAMES } from 'webseller/constants'

export function * getMarkerSaga () {
  const { fetchGetMarketIsNeedDuplicateRfa } = api

  try {
    const { BillingBranchId: branchId, Msisdn: msisdn, ClientId: clientId } = yield select(getPersonalAccountState)
    // TODO после реализации анонимной карточки
    const isAnonymous = false

    const response = yield call(fetchGetMarketIsNeedDuplicateRfa, {
      branchId,
      msisdn,
      clientId,
      isAnonymous
    })

    const isNeedDuplicateRfa = response.data?.isNeedDuplicateRFA
    if (typeof isNeedDuplicateRfa === 'boolean') {
      yield put(getMarkerDuplicateRfaSuccess(isNeedDuplicateRfa))
    } else {
      throw new Error()
    }
  } catch {
    yield put(getMarkerDuplicateRfaError())
    notification.error('Ошибка при проверке необходимости оформления дубликата договора')
  }
}

export function * checkIccSaga ({ payload: iccPart }) {
  const { fetchCheckIcc } = api

  try {
    const { BillingBranchId: branchId, Msisdn: msisdn } = yield select(getPersonalAccountState)

    const { data, status } = yield call(fetchCheckIcc, { msisdn, branchId, iccPart })
    const isCorrectIcc = data?.isCorrect

    if (isSuccessfulResponse(status) && typeof isCorrectIcc === 'boolean') {
      if (isCorrectIcc) {
        yield put(checkIccDuplicateRfaSuccess(iccPart))
      } else {
        const attemptsCount = yield select(selectAttemptsCountCheckIccDuplicateRfa)
        const updatedAttemptsCount = attemptsCount + 1

        yield put(checkIccDuplicateRfaError(updatedAttemptsCount))
        notification.error({
          message: `ICC не совпадает. Использовано ${updatedAttemptsCount} из ${VALID_ATTEMPTS_COUNT_CHECK_ICC} попыток`
        })
      }
    } else {
      throw new Error()
    }
  } catch {
    yield put(checkIccDuplicateRfaFailure())
    notification.error({
      message: 'Ошибка при проверке ICC'
    })
  }
}

export function * getInitialPersonalDataSaga () {
  const initialPersonalData = yield call(getInitialClientPersonalData)

  if (initialPersonalData) {
    yield put(getInitialPersonalDataDuplicateRfaSuccess(initialPersonalData))
  } else {
    yield put(getInitialPersonalDataDuplicateRfaError())
  }
}

export function * getSmsCodeSaga () {
  const { Msisdn: msisdn } = yield select(getPersonalAccountState)
  const isClientHasPep = yield select(selectIsClientHasPep)

  const requestBody = {
    msisdn,
    serviceId: isClientHasPep ? 2 : 3,
    operationId: 4
  }

  yield call(getSmsCodeSagaDecorator, { requestBody })
}

export function * checkPepCodeSaga ({ payload: code }) {
  const { Msisdn: msisdn } = yield select(getPersonalAccountState)
  const isClientHasPep = yield select(selectIsClientHasPep)

  const documentRequestData = yield call(createRequestBodyRfaDocument, { isArchive: true, pepCode: code })
  const handleSuccessfulCheck = yield call(createHandlerSuccessfulPepCodeCheck, {
    documentRequestData,
    smsDocumentName: SMS_DOCUMENT_NAMES.DUPLICATE_RFA
  })

  const requestData = {
    code,
    msisdn,
    serviceId: isClientHasPep ? 2 : 3
  }

  yield call(checkPepCodeSagaDecorator, { requestData, handleSuccessfulCheck })
}

export function * getPaperDocumentsSaga () {
  yield call(getPaperDocumentsSagaDecorator, { preflightGetPaperDocuments })
}

export function * executeOperationSaga () {
  const { fetchExecuteDuplicateRfa } = api

  try {
    const requestBody = yield call(createRequestBodyExecuteOperation)

    const response = yield call(fetchExecuteDuplicateRfa, requestBody)

    if (isSuccessfulResponse(response.status)) {
      yield put(executeDuplicateRfaSuccess())
    } else {
      yield put(executeDuplicateRfaError(response.data?.message))
    }
  } catch {
    yield put(executeDuplicateRfaError())
  }
}

export function * createInteractionSaga () {
  const { createInteraction } = api

  const params = yield call(createRequestParamsCreateInteraction)

  yield call(createInteraction, params)
}
