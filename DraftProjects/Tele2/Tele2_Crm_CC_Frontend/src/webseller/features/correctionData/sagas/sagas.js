import { notification } from 'antd'
import { call, put, select } from 'redux-saga/effects'

import api from 'utils/api'
import { selectPersonalAccount } from 'reducers/personalInfo/selectors'
import { selectHandlingState } from 'reducers/internal/selectors'
import {
  initCorrectionDataProcessSuccess,
  initCorrectionDataProcessError,
  editPersonalDataSuccess,
  editPersonalDataError,
  editPersonalDataPartiallySuccess,
  addSignedDocumentsToRequest,
  addSignedDocumentsToRequestError,
  setCorrectionDataProcessStep,
  getVerificationSmsCodeSuccess,
  getVerificationSmsCodeError,
  checkVerificationPepCodeSuccess,
  checkVerificationPepCodeError
} from 'webseller/features/correctionData/reducer'
import {
  checkPersonalDataWithBillingData,
  createRequestBodyCorrectRfaApplication,
  createRequestBodyCorrectionData,
  createRequestParamsCreateInteraction
} from './helpers'
import {
  checkPepCodeSagaDecorator,
  createHandlerSuccessfulPepCodeCheck,
  getPaperDocumentsSagaDecorator,
  getSmsCodeSagaDecorator
} from 'webseller/common/signing/sagas/sagas'
import { selectIsClientHasPep, selectSigningType } from 'webseller/common/signing/selectors'
import { isSuccessfulResponse } from 'webseller/helpers/api'
import { SigningType } from 'webseller/common/signing/helpers'
import {
  selectIsOnlyPaperDocumentsScenarioCorrectionData,
  selectProcessTypeCorrectionData,
  selectServiceRequestIdCorrectionData,
  selectTicketNumberCorrectionData
} from '../selectors'
import { getInitialClientPersonalData } from 'webseller/helpers/personalData'
import { addSignedDocumentsToOperationsSagaDecorator } from 'webseller/helpers/operations'
import { SMS_DOCUMENT_NAMES } from 'webseller/constants'
import { CORRECTION_PROCESS_STEPS, CORRECTION_PROCESS_TYPES } from '../helpers'
import actionsWebSellerRemote from 'webseller/remote/actions'
import featureConfig from 'webseller/featureConfig'
import { helpersSigningRemote, selectorsSigningRemote } from 'websellerRemote/Signing'

export const DOCUMENT_TYPE_IDS_MAP = {
  3: 'Заявление на присоединение к оферте и выдаче ключа ПЭП',
  9: 'Заявление на актуализацию регистрационных данных абонента'
}

export function * initCorrectionDataSaga () {
  const initialPersonalData = yield call(getInitialClientPersonalData, {
    storeRegistrationAddresses: featureConfig.isUseRemoteDocumentIdentity
      ? actionsWebSellerRemote.documentIdentity.storeFoundAddresses
      : undefined,
    storeCountries: featureConfig.isUseRemoteDocumentIdentity
      ? actionsWebSellerRemote.documentIdentity.storeFoundCountries
      : undefined
  })

  if (initialPersonalData) {
    yield put(initCorrectionDataProcessSuccess(initialPersonalData))
  } else {
    yield put(initCorrectionDataProcessError())
  }
}

export function * getSmsCodeSaga () {
  const { Msisdn } = yield select(selectPersonalAccount)
  const isClientHasPep = yield select(
    featureConfig.isUseRemoteSigning ? selectorsSigningRemote.selectIsClientHasPep : selectIsClientHasPep
  )

  const requestBody = {
    msisdn: Msisdn,
    serviceId: isClientHasPep ? 2 : 3,
    operationId: 3
  }

  const decorator = featureConfig.isUseRemoteSigning
    ? helpersSigningRemote.getSmsCodeSagaDecorator
    : getSmsCodeSagaDecorator

  yield call(decorator, { requestBody })
}

export function * getVerificationSmsCodeSaga () {
  const { fetchPepCode } = api

  try {
    const { Msisdn } = yield select(selectPersonalAccount)

    const requestBody = {
      msisdn: Msisdn,
      serviceId: 2,
      operationId: 3
    }

    const { status } = yield call(fetchPepCode, requestBody)

    if (isSuccessfulResponse(status)) {
      yield put(getVerificationSmsCodeSuccess())
    } else {
      throw new Error()
    }
  } catch {
    yield put(getVerificationSmsCodeError())
    notification.error({
      message: 'Не удалось отправить SMS код'
    })
  }
}

export function * checkPepCodeSaga ({ payload: code }) {
  const { Msisdn } = yield select(selectPersonalAccount)
  const isClientHasPep = yield select(
    featureConfig.isUseRemoteSigning ? selectorsSigningRemote.selectIsClientHasPep : selectIsClientHasPep
  )

  const documentRequestData = yield call(createRequestBodyCorrectRfaApplication, { code, isArchive: true })

  const createHandler = featureConfig.isUseRemoteSigning
    ? helpersSigningRemote.createHandlerSuccessfulPepCodeCheck
    : createHandlerSuccessfulPepCodeCheck

  const handleSuccessfulCheck = yield call(createHandler, {
    documentRequestData,
    smsDocumentName: SMS_DOCUMENT_NAMES.CORRECTION_DATA
  })

  const requestData = {
    code,
    serviceId: isClientHasPep ? 2 : 3,
    msisdn: Msisdn
  }
  const decorator = featureConfig.isUseRemoteSigning
    ? helpersSigningRemote.checkPepCodeSagaDecorator
    : checkPepCodeSagaDecorator

  yield call(decorator, { requestData, handleSuccessfulCheck })
}

export function * checkVerificationPepCodeSaga ({ payload: code }) {
  const { fetchCheckPepCode } = api

  try {
    const { Msisdn } = yield select(selectPersonalAccount)
    const requestData = {
      code,
      serviceId: 2,
      msisdn: Msisdn
    }

    const { data, status } = yield call(fetchCheckPepCode, Msisdn, requestData)

    if (isSuccessfulResponse(status)) {
      yield put(setCorrectionDataProcessStep(CORRECTION_PROCESS_STEPS.DOCUMENT_DATA))
      yield put(checkVerificationPepCodeSuccess())
    } else if (status === 400) {
      throw new Error('Введен неверный код, повтори попытку')
    } else {
      throw new Error(data?.message || 'Ошибка при проверке кода ПЭП')
    }
  } catch (err) {
    yield put(checkVerificationPepCodeError())

    notification.error({
      message: err?.message
    })
  }
}

export function * getPaperDocumentsSaga () {
  const decorator = featureConfig.isUseRemoteSigning
    ? helpersSigningRemote.getPaperDocumentsSagaDecorator
    : getPaperDocumentsSagaDecorator

  yield call(decorator, { preflightGetPaperDocuments })
}

function * preflightGetPaperDocuments () {
  const { fetchCreateDocument } = api

  const { Id: handlingId } = yield select(selectHandlingState)

  const body = yield call(createRequestBodyCorrectRfaApplication, { isArchive: false })

  return [
    {
      title: DOCUMENT_TYPE_IDS_MAP[9],
      request: fetchCreateDocument,
      params: [handlingId, body]
    }
  ]
}

export function * addSignedDocumentsToRequestSaga () {
  try {
    const ticketNumber = yield select(selectTicketNumberCorrectionData)
    const serviceRequestId = yield select(selectServiceRequestIdCorrectionData)
    const isRemoteSigning = featureConfig.isUseRemoteSigning

    yield call(addSignedDocumentsToOperationsSagaDecorator, { ticketNumber, serviceRequestId, isRemoteSigning })

    yield put(editPersonalDataSuccess())
  } catch {
    yield put(addSignedDocumentsToRequestError())
  }
}

export function * editPersonalDataSaga () {
  const { fetchEditPersonalData } = api

  try {
    const { BillingBranchId: branchId, ClientId: clientId } = yield select(selectPersonalAccount)
    const signingType = yield select(
      featureConfig.isUseRemoteSigning ? selectorsSigningRemote.selectSigningType : selectSigningType
    )
    const isOnlineSigning = signingType === SigningType.SMS_CODE
    const body = yield call(createRequestBodyCorrectionData, { isOnline: isOnlineSigning })

    const { data: correctionDataResponse, status } = yield call(fetchEditPersonalData, branchId, clientId, body)

    if (isSuccessfulResponse(status)) {
      if (isOnlineSigning) {
        yield put(editPersonalDataSuccess())
      } else {
        const { bpmTicketNumber: ticketNumber, bpmIncidentId: serviceRequestId } = correctionDataResponse || {}

        if (ticketNumber && serviceRequestId) {
          yield put(
            editPersonalDataPartiallySuccess({
              ticketNumber,
              serviceRequestId
            })
          )

          yield put(addSignedDocumentsToRequest())
        } else {
          throw new Error()
        }
      }
    } else {
      yield put(editPersonalDataError(correctionDataResponse?.message))
    }
  } catch {
    yield put(editPersonalDataError())
  }
}

export function * createInteractionCorrectionDataSaga () {
  const { createInteraction } = api

  const params = yield call(createRequestParamsCreateInteraction)

  yield call(createInteraction, params)
}

export function * approvePersonalDataSaga () {
  const isOnlyPaperDocumentsScenario = yield select(selectIsOnlyPaperDocumentsScenarioCorrectionData)
  const processType = yield select(selectProcessTypeCorrectionData)

  if (!isOnlyPaperDocumentsScenario && processType === CORRECTION_PROCESS_TYPES.ANONYMOUS) {
    yield checkPersonalDataWithBillingData()
  }
}
