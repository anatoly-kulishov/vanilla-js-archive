import { call, select, put } from 'redux-saga/effects'
import { notification } from 'antd'

import api from 'utils/api'
import { getPersonalAccountState, getSubscriberHistory } from 'selectors/index'
import {
  checkPepCodeSagaDecorator,
  createHandlerSuccessfulPepCodeCheck,
  getPaperDocumentsSagaDecorator,
  getSmsCodeSagaDecorator
} from 'webseller/common/signing/sagas/sagas'
import { selectIsClientHasPep, selectSigningType } from 'webseller/common/signing/selectors'
import { createDocumentRequestBodyChangingClientStatus } from './helper'
import { SMS_DOCUMENT_NAMES } from 'webseller/constants'
import { selectHandlingState } from 'reducers/internal/selectors'
import { SigningType } from 'webseller/common/signing/helpers'
import {
  executeOperationChangingClientStatusError,
  executeOperationChangingClientStatusSuccess,
  initChangingClientStatusError,
  initChangingClientStatusSuccess
} from '../actions'
import { selectNewStatusChangingClientStatus, selectSubscriberCscIdChangingClientStatus } from '../selectors'
import { getInitialClientPersonalData } from 'webseller/helpers/personalData'
import { getDocumentIdentityTypes } from 'reducers/documentIdentity/documentIdentityReducer'

export function * initChangingClientStatusSaga () {
  try {
    const personalData = yield call(getInitialClientPersonalData)
    if (personalData) {
      yield put(initChangingClientStatusSuccess(personalData))
      yield put(getDocumentIdentityTypes())
    } else {
      throw new Error()
    }
  } catch {
    yield put(initChangingClientStatusError())
    notification.error({
      message: 'Изменение статуса абонента недоступно'
    })
  }
}

export function * getSmsCodeChangingClientStatusSaga () {
  const { Msisdn: msisdn } = yield select(getPersonalAccountState)
  const isClientHasPep = yield select(selectIsClientHasPep)

  const requestBody = {
    msisdn,
    serviceId: isClientHasPep ? 2 : 3,
    operationId: 5
  }

  yield call(getSmsCodeSagaDecorator, { requestBody })
}

export function * checkPepCodeChangingClientStatusSaga ({ payload: code }) {
  const { Msisdn: msisdn } = yield select(getPersonalAccountState)
  const isClientHasPep = yield select(selectIsClientHasPep)

  const documentRequestData = yield call(createDocumentRequestBodyChangingClientStatus, { code, isArchive: true })
  const handleSuccessfulCheck = yield call(createHandlerSuccessfulPepCodeCheck, {
    documentRequestData,
    smsDocumentName: SMS_DOCUMENT_NAMES.CHANGING_CLIENT_STATUS
  })

  const requestData = {
    code,
    msisdn,
    serviceId: isClientHasPep ? 2 : 3
  }

  yield call(checkPepCodeSagaDecorator, { requestData, handleSuccessfulCheck })
}

export function * getPaperDocumentsChangingClientStatusSaga () {
  function * preflightGetPaperDocuments () {
    const { fetchCreateDocument } = api

    const { Id: handlingId } = yield select(selectHandlingState)
    const body = yield call(createDocumentRequestBodyChangingClientStatus, { isArchive: false })

    return [
      {
        title: SMS_DOCUMENT_NAMES.CHANGING_CLIENT_STATUS,
        request: fetchCreateDocument,
        params: [handlingId, body]
      }
    ]
  }

  yield call(getPaperDocumentsSagaDecorator, { preflightGetPaperDocuments })
}

export function * executeOperationChangingClientStatusSaga () {
  const { fetchSubscriberServiceStatusUpdate } = api

  try {
    const newStatus = yield select(selectNewStatusChangingClientStatus)
    const subscriberCscId = yield select(selectSubscriberCscIdChangingClientStatus)
    const { Id: handlingId } = yield select(selectHandlingState)
    const {
      SubscriberFullInfo,
      Msisdn: msisdn,
      BillingBranchId: branchId,
      SubscriberId: subscriberId,
      ClientId: clientId,
      Email: email,
      SubscriberStatus: subscriberStatus
    } = yield select(getPersonalAccountState)
    const { CurrentStatusReason: currentStatusReason } = yield select(getSubscriberHistory)

    const { SubscriberTypeId: subscriberTypeId } = SubscriberFullInfo?.SubscriberInfo ?? {}

    const requestBody = {
      branchId,
      subscriberId,
      statId: newStatus,
      subscriberCscId,
      currentSubscriberStatus: subscriberStatus,
      handlingId,
      clientId,
      email: !msisdn ? email : msisdn,
      msisdn,
      subscriberTypeId,
      currentStatusReason
    }

    const { data } = yield call(fetchSubscriberServiceStatusUpdate, requestBody)

    if (data?.IsSuccess) {
      yield put(executeOperationChangingClientStatusSuccess())
    } else {
      yield put(executeOperationChangingClientStatusError(data?.MessageText))
    }
  } catch {
    yield put(executeOperationChangingClientStatusError())
  }
}

export function * createInteractionChangingClientStatusSaga ({ payload }) {
  const { createInteraction } = api

  const { isError } = payload || {}

  const { Id: HandlingId } = yield select(selectHandlingState)
  const {
    BillingBranchId: ClientBranchId,
    Msisdn,
    ClientId,
    SubscriberId,
    SubscriberFullInfo
  } = yield select(getPersonalAccountState)
  const signingType = yield select(selectSigningType)
  const newStatusId = yield select(selectNewStatusChangingClientStatus)

  let reasonId
  switch (newStatusId) {
    case 2: {
      reasonId = 166
      break
    }
    case 4: {
      reasonId = 167
      break
    }
    case 1: {
      reasonId = 168
      break
    }
  }

  const requestParams = {
    CategoryId: isError ? 0 : 4,
    ClientBranchId,
    ClientId,
    CommentText: signingType === SigningType.SMS_CODE ? ':ПЭП' : undefined,
    HandlingId,
    Msisdn,
    ReasonId: reasonId,
    RegisteringCaseId: 7,
    SubscriberId,
    SubscriberBranchId: SubscriberFullInfo?.SubscriberClientInfo?.BillingBranchId
  }

  yield call(createInteraction, requestParams)
}
