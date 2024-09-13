import { notification } from 'antd'
import { all, call, cancel, cancelled, fork, put, select, take } from 'redux-saga/effects'

import api from 'utils/api'
import {
  getPepNumbersSuccess,
  getPepNumbersError,
  getSmsCodeSuccess,
  getSmsCodeError,
  getPaperDocuments,
  getPaperDocumentsSuccess,
  getPaperDocumentsError,
  getDocumentCode,
  getDocumentCodeSuccess,
  getDocumentCodeError,
  CANCEL_GET_PAPER_DOCUMENTS,
  CANCEL_GET_DOCUMENT_CODE,
  getPepNumbers,
  getSmsCode,
  checkPepCodeError,
  checkPepCode,
  checkPepCodeSuccess,
  checkIsClientHasPepSuccess,
  checkIsClientHasPepError
} from 'webseller/common/signing/reducer'
import { FORM_FIELDS } from 'webseller/constants/form'
import { downloadFile } from 'webseller/helpers'
import { getDocumentByWs } from 'webseller/helpers/api/getDocumentByWs'
import { selectActivePepNumber, selectIsClientHasPep } from '../selectors'
import { isSuccessfulResponse } from 'webseller/helpers/api'
import { getPersonalAccountState } from 'selectors/index'
import { selectPersonalAccount } from 'reducers/personalInfo/selectors'
import { selectHandlingState } from 'reducers/internal/selectors'

export function * checkIsClientHasPepSaga () {
  const { fetchDataSubscriber } = api

  try {
    const { Msisdn, BillingBranchId: BranchId, ClientId } = yield select(getPersonalAccountState)

    const { data: additionalDataSubscriber } = yield call(fetchDataSubscriber, { Msisdn, BranchId, ClientId })

    const isClientHasPep = Boolean(additionalDataSubscriber?.Data?.Pep?.SignAgree)
    yield put(checkIsClientHasPepSuccess({ subscriberData: additionalDataSubscriber, isClientHasPep }))
  } catch {
    yield put(checkIsClientHasPepError())
  }
}

export function * getPepNumbersSagaDecorator ({ personalData } = {}) {
  const { fetchClientPep } = api

  try {
    yield put(getPepNumbers())

    const requestBody = {
      name: personalData[FORM_FIELDS.FIRST_NAME],
      surname: personalData[FORM_FIELDS.LAST_NAME],
      patronymic: personalData[FORM_FIELDS.MIDDLE_NAME],
      documentSeries: personalData[FORM_FIELDS.DOCUMENT_SERIES],
      documentNumber: personalData[FORM_FIELDS.DOCUMENT_NUMBER]
    }

    const { data } = yield call(fetchClientPep, requestBody)
    const { msisdns } = data || {}

    if (msisdns) {
      yield put(getPepNumbersSuccess(msisdns))
    } else {
      throw new Error()
    }
  } catch {
    yield put(getPepNumbersError())
  }
}

export function * getSmsCodeSagaDecorator ({ requestBody }) {
  const { fetchPepCode } = api

  try {
    yield put(getSmsCode())

    const { status } = yield call(fetchPepCode, requestBody)

    if (isSuccessfulResponse(status)) {
      yield put(getSmsCodeSuccess())
    } else {
      throw new Error()
    }
  } catch {
    yield put(getSmsCodeError())
    notification.error({
      message: 'Не удалось отправить SMS код'
    })
  }
}

export function * getDocumentCodeSagaDecorator ({ preflightGetDocumentCode } = {}) {
  yield fork(function * () {
    yield put(getDocumentCode())
    const sockets = []

    try {
      const { request, params, title } = yield call(preflightGetDocumentCode)

      const document = yield call(function * () {
        const { data: requestId } = yield call(request, ...params)

        return yield call(getDocumentByWs, {
          title,
          requestId,
          sockets
        })
      })

      const documentUrl = document?.url
      if (documentUrl) {
        yield put(getDocumentCodeSuccess())
        downloadFile(documentUrl)
      } else {
        throw new Error()
      }
    } catch {
      yield put(getDocumentCodeError())
      notification.error({
        message: 'Ошибка при формировании документа'
      })
    } finally {
      if (yield cancelled()) {
        yield put(getDocumentCodeError())
        sockets.forEach(socket => {
          socket.close()
        })
      }
    }
  })

  yield take(CANCEL_GET_DOCUMENT_CODE)
  yield cancel()
}

export function * checkPepCodeSagaDecorator ({ requestData, handleSuccessfulCheck } = {}) {
  const { fetchCheckPepCode } = api

  try {
    yield put(checkPepCode())

    const activePepNumber = yield select(selectActivePepNumber)

    const { data, status } = yield call(fetchCheckPepCode, activePepNumber || requestData.msisdn, requestData)

    if (isSuccessfulResponse(status)) {
      if (handleSuccessfulCheck) {
        yield call(handleSuccessfulCheck)
      }

      yield put(checkPepCodeSuccess(requestData.code))
    } else if (status === 400) {
      throw new Error('Введен неверный код, повтори попытку')
    } else {
      throw new Error(data?.message || 'Ошибка при проверке кода ПЭП')
    }
  } catch (err) {
    yield put(checkPepCodeError())
    notification.error({
      message: err?.message
    })
  }
}

export function * createHandlerSuccessfulPepCodeCheck ({ documentRequestData, smsDocumentName }) {
  return function * () {
    const { fetchCreateDocument, postSendAgree, fetchSendSms } = api

    /**
     * Если у абонента не было ПЭП, фоново отправляем согласие на ПЭП
     */
    const isClientHasPep = yield select(selectIsClientHasPep)
    if (!isClientHasPep) {
      const { Msisdn, SubscriberId, BillingBranchId, ClientId } = yield select(selectPersonalAccount)
      const { Id: handlingId } = yield select(selectHandlingState)
      const requestData = {
        msisdn: Msisdn,
        subscriberId: SubscriberId,
        branchId: BillingBranchId,
        clientId: ClientId,
        handlingId
      }
      postSendAgree(requestData)
    }

    try {
      const { Id: handlingId } = yield select(selectHandlingState)
      const PersonalAccount = yield select(selectPersonalAccount)
      const { data: requestId } = yield call(fetchCreateDocument, handlingId, documentRequestData)
      const { url } = yield call(getDocumentByWs, { requestId })

      const { SubscriberId, BillingBranchId } = PersonalAccount

      if (url) {
        const { Msisdn } = yield select(selectPersonalAccount)

        yield call(fetchSendSms, {
          Msisdn,
          SenderSms: 'Tele2',
          ScriptInforming: '100000004',
          BillingBranch: BillingBranchId,
          CreateInteractionParams: {
            SubscriberId: SubscriberId,
            HandlingId: handlingId
          },
          Text: `Документ "${smsDocumentName}" доступен по ссылке: ${url}`,
          IgnoreAdvertisingAgreement: true,
          IgnorePeriodOfSilence: true
        })
      } else {
        throw new Error()
      }
    } catch {
      throw new Error('Ошибка формирования документа')
    }
  }
}

export function * getPaperDocumentsSagaDecorator ({ preflightGetPaperDocuments } = {}) {
  yield fork(function * () {
    yield put(getPaperDocuments())
    const sockets = []

    try {
      const preflightRequests = yield call(preflightGetPaperDocuments)

      const documents = yield all(
        preflightRequests.map(({ request, params, title }) =>
          call(function * () {
            const { data: requestId, status } = yield call(request, ...params)

            if (isSuccessfulResponse(status)) {
              return yield call(getDocumentByWs, {
                title,
                requestId,
                sockets
              })
            }
          })
        )
      )

      const isAllDocumentsHaveUrl = documents?.every(document => Boolean(document?.url))
      if (isAllDocumentsHaveUrl) {
        yield put(getPaperDocumentsSuccess(documents))
      } else {
        throw new Error()
      }
    } catch {
      yield put(getPaperDocumentsError())
      notification.error({
        message: 'Ошибка при формировании документов на подпись'
      })
    } finally {
      if (yield cancelled()) {
        yield put(getPaperDocumentsError())
        sockets.forEach(socket => {
          socket.close()
        })
      }
    }
  })

  yield take(CANCEL_GET_PAPER_DOCUMENTS)
  yield cancel()
}
