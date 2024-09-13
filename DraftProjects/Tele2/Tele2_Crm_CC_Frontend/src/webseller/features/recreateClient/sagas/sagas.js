import { call, put, select, take, all } from 'redux-saga/effects'
import React from 'react'
import { notification } from 'antd'

import { getPersonalAccountState } from 'selectors/index'
import api from 'utils/api'
import {
  initRecreateClientSuccess,
  initRecreateClientError,
  getTransmittingPartyDataSuccess,
  getTransmittingPartyDataError,
  recreateClientSuccess,
  recreateClientError,
  requestSmsCodeSuccess,
  requestSmsCodeError,
  requestSmsCodeFailure,
  verifySmsCodeSuccess,
  verifySmsCodeError,
  updateWaitingTimeRefreshCode,
  changeRecreateClientType,
  changeRecreateClientStep,
  addSignedDocumentsRecreateClientError,
  addSignedDocumentsRecreateClient,
  recreateClientPartiallySuccess
} from 'webseller/features/recreateClient/reducer'
import { countdown } from 'utils/helpers/sagaHelper'
import {
  createAgreementTransferResponsibilitiesDocumentRequestData,
  createAdditionalNumberDocumentRequestData,
  createRfaDocumentRequestData,
  createApplicationReissueNumberDocumentRequestData,
  createRecreateClientRequestBody,
  createAgreementBeautifulNumberDocumentRequestData
} from './helpers'
import {
  selectRecreateClientIsBeautifulNumber,
  selectRecreateClientServiceRequestId,
  selectRecreateClientTicketNumber,
  selectRecreateClientType
} from 'webseller/features/recreateClient/selectors'
import { RecreateClientType, StepTypeRecreateClient } from 'webseller/features/recreateClient/helpers'
import { selectHandlingState } from 'reducers/internal/selectors'
import { getPaperDocumentsSagaDecorator } from 'webseller/common/signing/sagas/sagas'
import { addSignedDocumentsToOperationsSagaDecorator } from 'webseller/helpers/operations'
import { getInitialClientPersonalData } from 'webseller/helpers/personalData'
import { resetSigning } from 'webseller/common/signing/reducer'

export function * initRecreateClientSaga () {
  const { fetchRecreateClientAvailability } = api

  try {
    const { Msisdn: msisdn } = yield select(getPersonalAccountState)

    const { data: availability } = yield call(fetchRecreateClientAvailability, msisdn)
    const { isAvailable, isOnline, checklists, isBeautifulNumber } = availability || {}

    if (isAvailable) {
      yield put(initRecreateClientSuccess({ isOnline, isBeautifulNumber }))
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
          message: 'Переоформление недоступно по следующим причинам:',
          description: (
            <>
              {errors.map(message => (
                <div key={message}>{message}</div>
              ))}
            </>
          ),
          duration: 10
        })
        yield put(initRecreateClientError())
      } else {
        throw new Error()
      }
    }
  } catch {
    notification.error({
      message: 'Переоформление номера в настоящий момент недоступно'
    })
    yield put(initRecreateClientError([]))
  }
}

export function * getTransmittingPartyDataSaga () {
  const initialPersonalData = yield call(getInitialClientPersonalData)

  if (initialPersonalData) {
    yield put(getTransmittingPartyDataSuccess(initialPersonalData))
  } else {
    yield put(getTransmittingPartyDataError())
  }
}

export function * getRecreateClientDocumentsSaga () {
  yield call(getPaperDocumentsSagaDecorator, { preflightGetPaperDocuments })
}

function * preflightGetPaperDocuments () {
  const { fetchDataSubscriber, fetchCreateDocument } = api

  const { Msisdn, BillingBranchId: BranchId, ClientId, SubscriberFullInfo } = yield select(getPersonalAccountState)
  const { Id: handlingId } = yield select(selectHandlingState)
  const isBeautifulNumber = yield select(selectRecreateClientIsBeautifulNumber)

  const { data: additionalDataSubscriber } = yield call(fetchDataSubscriber, { Msisdn, BranchId, ClientId })

  const rfaDocument = yield call(createRfaDocumentRequestData)
  const applicationReissueNumberDocument = yield call(createApplicationReissueNumberDocumentRequestData)
  const documentsData = [
    {
      title: 'Договор об оказании услуг связи ',
      request: fetchCreateDocument,
      params: [handlingId, rfaDocument]
    },
    {
      title: 'Заявление на переоформление абонентского номера',
      request: fetchCreateDocument,
      params: [handlingId, applicationReissueNumberDocument]
    }
  ]

  const isTele2FirstOwner = additionalDataSubscriber?.Data?.MainData?.OwnerFirst !== 'Теле2'
  if (isTele2FirstOwner) {
    const agreementTransferResponsibilitiesDocument = yield call(
      createAgreementTransferResponsibilitiesDocumentRequestData
    )
    documentsData.push({
      title: 'Соглашение об уступке прав и обязанностей по договору',
      request: fetchCreateDocument,
      params: [handlingId, agreementTransferResponsibilitiesDocument]
    })
  }

  const hasCityPhone = SubscriberFullInfo?.SubscriberInfo?.CityPhone !== null
  if (hasCityPhone) {
    const additionalNumberDocument = yield call(createAdditionalNumberDocumentRequestData)
    documentsData.push({
      title: 'Заявление на подключение городского номера',
      request: fetchCreateDocument,
      params: [handlingId, additionalNumberDocument]
    })
  }

  if (isBeautifulNumber) {
    const agreementBeautifulNumberDocument = yield call(createAgreementBeautifulNumberDocumentRequestData)
    documentsData.push({
      title: 'Соглашение на оказание услуги "Красивый номер"',
      request: fetchCreateDocument,
      params: [handlingId, agreementBeautifulNumberDocument]
    })
  }

  return documentsData
}

export function * requestSmsCodeSaga () {
  const { fetchRequestSmsCode } = api

  try {
    const { Msisdn: msisdn } = yield select(getPersonalAccountState)

    const { data, status } = yield call(fetchRequestSmsCode, msisdn)
    const { waitingTime } = data || {}

    switch (status) {
      case 200: {
        yield put(requestSmsCodeSuccess(waitingTime))

        const countdownChannel = yield call(countdown, waitingTime)
        while (true) {
          const updatedWaitingTime = yield take(countdownChannel)
          yield put(updateWaitingTimeRefreshCode(updatedWaitingTime))
        }
      }
      case 400: {
        yield put(requestSmsCodeError(waitingTime))
        notification.error({ message: 'Исчерпан лимит запросов' })

        const countdownChannel = yield call(countdown, waitingTime)
        while (true) {
          const updatedWaitingTime = yield take(countdownChannel)
          yield put(updateWaitingTimeRefreshCode(updatedWaitingTime))
        }
      }
      default: {
        throw new Error()
      }
    }
  } catch {
    yield put(requestSmsCodeFailure())
    notification.error({ message: 'Что-то пошло не так' })
  }
}

// TODO TECH DEBT перевести на общую логику с verifySmsCodeSagaDecorator
export function * verifySmsCodeSaga ({ payload: code }) {
  const { fetchVerifySmsCode } = api

  try {
    const { Msisdn: msisdn } = yield select(getPersonalAccountState)

    const { data } = yield call(fetchVerifySmsCode, { msisdn, code })

    const isValidCode = data === true
    if (isValidCode) {
      yield put(verifySmsCodeSuccess())
    } else {
      yield put(verifySmsCodeError())
      notification.error({ message: 'Неверный код' })
    }
  } catch {
    yield put(verifySmsCodeError())
    notification.error({ message: 'Что-то пошло не так' })
  }
}

export function * recreateClientSaga () {
  const recreateClientType = yield select(selectRecreateClientType)
  const saga = recreateClientType === RecreateClientType.ONLINE ? recreateClientOnlineSaga : recreateClientOfflineSaga

  yield call(saga)
}

function * recreateClientOnlineSaga () {
  const { fetchRecreateClient } = api

  try {
    const { Msisdn: msisdn } = yield select(getPersonalAccountState)
    const requestData = yield call(createRecreateClientRequestBody)

    const { status } = yield call(fetchRecreateClient, msisdn, requestData)

    if (status === 200) {
      yield put(recreateClientSuccess())
    } else {
      yield all([
        put(resetSigning()),
        put(changeRecreateClientType(RecreateClientType.OFFLINE)),
        put(changeRecreateClientStep(StepTypeRecreateClient.DOCUMENTS))
      ])

      notification.error({
        message: 'Онлайн переоформление недоступно'
      })
    }
  } catch {
    yield put(recreateClientError())
  }
}

function * recreateClientOfflineSaga () {
  const { fetchRecreateClient } = api

  try {
    const { Msisdn: msisdn } = yield select(getPersonalAccountState)
    const requestData = yield call(createRecreateClientRequestBody)

    const { data, status } = yield call(fetchRecreateClient, msisdn, requestData)

    if (status === 200) {
      const { serviceRequestId, number: ticketNumber } = data || {}

      if (ticketNumber && serviceRequestId) {
        yield all([
          put(recreateClientPartiallySuccess({ ticketNumber, serviceRequestId })),
          put(addSignedDocumentsRecreateClient())
        ])
      } else {
        throw new Error()
      }
    } else {
      yield put(recreateClientError(data?.message))
    }
  } catch {
    yield put(recreateClientError())
  }
}

export function * addSignedDocumentsSaga () {
  try {
    const ticketNumber = yield select(selectRecreateClientTicketNumber)
    const serviceRequestId = yield select(selectRecreateClientServiceRequestId)

    yield call(addSignedDocumentsToOperationsSagaDecorator, { ticketNumber, serviceRequestId })

    yield put(recreateClientSuccess())
  } catch {
    yield put(addSignedDocumentsRecreateClientError())
  }
}
