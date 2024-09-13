import { select, call, put, take, cancel, cancelled, fork } from 'redux-saga/effects'
import { END, eventChannel } from 'redux-saga'
import { notification } from 'antd'
import api from 'utils/api'

import { JSEncrypt } from 'jsencrypt'
import pbkdf2 from 'pbkdf2'
import AES from 'crypto-js/aes'
import sha256 from 'sha256'
import CryptoJS from 'crypto-js'

import {
  checkSmevPartialSuccess,
  checkSmevError,
  uploadDocumentError,
  finishCheckSmevPolling,
  FINISH_CHECK_SMEV_POLLING,
  uploadDocumentSuccess
} from 'reducers/checkSmev/checkSmevReducer'

import { cancelGetExistingPersonalData, checkSimSaleAvailability } from 'reducers/saleSim/saleSimReducer'

import { selectPersonalDataSaleSim, selectSaleSim } from 'reducers/saleSim/selectors'
import { selectSalesOffice } from 'reducers/salesOffice/selectors'
import { selectCheckSmev } from 'reducers/checkSmev/selectors'
import { FORM_FIELDS, RUSSIAN_PASSPORT_ID } from 'webseller/constants/form'
import { createRequestBodyCheckSmev } from './helpers'
import { blobToBase64 } from 'webseller/helpers'
import features from 'webseller/featureConfig'

const needScanUploadSmevAction = features.isAvailableScanUploadSmev ? checkSmevPartialSuccess : checkSmevError

const validateStatusDefault = status => status >= 200 && status < 300

export function * getSmevDataWrapperSaga () {
  const personalData = yield select(selectPersonalDataSaleSim)

  const identityDocId = personalData[FORM_FIELDS.DOCUMENT_TYPE]
  const isRussianPassport = identityDocId === RUSSIAN_PASSPORT_ID
  if (isRussianPassport) {
    yield fork(getSmevDataSaga)
    yield take(FINISH_CHECK_SMEV_POLLING)
    yield cancel()
    return
  }

  yield put(needScanUploadSmevAction())
}

function * getSmevDataSaga () {
  const { checkSmev: checkSmevApi } = api
  let checkSmevPollingChannel
  let checkSmevIntervalId
  let timerId
  let isLastRequest = false

  try {
    const body = yield call(createRequestBodyCheckSmev)
    const { data } = yield call(checkSmevApi, body)
    const { id, pollingTime, responseWaitingTime } = data

    if (!id || !pollingTime || !responseWaitingTime) {
      throw new Error()
    }

    const createCheckSmevPollingChannel = () =>
      eventChannel(emit => {
        checkSmevIntervalId = setInterval(() => {
          emit({ statusId: id })
        }, pollingTime * 1000)

        timerId = setTimeout(() => {
          isLastRequest = true
          emit(END)
        }, responseWaitingTime * 1000)

        return () => {
          clearInterval(checkSmevIntervalId)
          clearTimeout(timerId)
        }
      })

    checkSmevPollingChannel = yield call(createCheckSmevPollingChannel)

    let checkSmevLoading = true
    while (checkSmevLoading) {
      if (isLastRequest) {
        throw new Error()
      }

      const checkSmevBody = yield take(checkSmevPollingChannel)
      const checkSmevStatus = yield call(checkSmevSaga, checkSmevBody)

      checkSmevLoading = !checkSmevStatus.data?.smevId
    }
  } catch {
    yield put(needScanUploadSmevAction())
  } finally {
    if (yield cancelled()) {
      clearInterval(checkSmevIntervalId)
      clearTimeout(timerId)
      checkSmevPollingChannel.close()
    }
  }
}

function * checkSmevSaga (payload) {
  const { getCheckSmevStatus } = api
  const { statusId, lastRequest } = payload
  const { smevLoading } = yield select(selectCheckSmev)

  if (lastRequest && !smevLoading) {
    return
  }

  try {
    const { data } = yield call(getCheckSmevStatus, statusId)

    if (lastRequest && !data?.smevId) {
      throw new Error()
    }

    switch (data?.smevId) {
      case 300:
        yield put(checkSimSaleAvailability())
        notification.success({
          message: 'Данные достоверны',
          description: 'Заверши оформление договора',
          duration: 5
        })
        yield put(finishCheckSmevPolling(statusId))
        yield put(cancelGetExistingPersonalData())
        return
      case 301:
        yield put(checkSmevError())
        yield put(finishCheckSmevPolling(statusId))
        yield put(cancelGetExistingPersonalData())
        return
      case 302:
        yield put(needScanUploadSmevAction())
        yield put(finishCheckSmevPolling(statusId))
        return
    }

    return data
  } catch {
    yield put(needScanUploadSmevAction())
    yield put(cancelGetExistingPersonalData())
    yield put(finishCheckSmevPolling(statusId))
  }
}

export function * uploadDocumentSaga ({ payload: file }) {
  const { fetchRsaKey } = api

  try {
    const { data } = yield call(fetchRsaKey)
    const { id, key: backendKey } = data

    let aesKey = pbkdf2.pbkdf2Sync('WebSeller', 'salt', 5000, 256, 'sha256')
    aesKey = sha256(aesKey) // return hex
    aesKey = aesKey.slice(0, aesKey.length / 2) // return 32 bytes

    const encryptRSA = new JSEncrypt()
    encryptRSA.setPublicKey(backendKey)
    const encryptedPublicKey = encryptRSA.encrypt(aesKey) // accept hex, return base64

    const blob = new Blob([file?.originFileObj], { type: file?.originFileObj?.type })
    const fileInBase64 = yield call(blobToBase64, blob)

    const iv = CryptoJS.lib.WordArray.random(8).toString()

    const encryptedFile = AES.encrypt(fileInBase64, CryptoJS.enc.Utf8.parse(aesKey), {
      iv: CryptoJS.enc.Utf8.parse(iv),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    })

    const encryption = {
      id,
      iv,
      publicKey: encryptedPublicKey,
      file: encryptedFile.toString()
    }

    yield put(checkSimSaleAvailability())
    yield put(uploadDocumentSuccess(encryption))
  } catch {
    yield put(uploadDocumentError())
  }
}

export function * sendDocumentSmevSaga () {
  const { uploadDocumentsImage } = api

  try {
    const { encryption } = yield select(state => state.checkSmev)
    const { documentData, soldSims } = yield select(selectSaleSim)
    const { activeSalesOffice } = yield select(selectSalesOffice)
    const { msisdn } = soldSims[0]

    if (encryption) {
      const body = {
        Msisdn: msisdn,
        OfficeId: activeSalesOffice.salesOfficeId,
        IdentityDocumentTypeId: documentData[FORM_FIELDS.DOCUMENT_TYPE],
        EncryptionId: encryption.id,
        EncryptionIv: encryption.iv,
        EncryptionKey: encryption.publicKey,
        File: encryption.file
      }

      const { status } = yield call(uploadDocumentsImage, body)

      if (validateStatusDefault(status)) {
        notification.success({
          message: 'Скан документа успешно загружен'
        })
      }
    }
  } catch {
    // не отображаем в интерфейсе
  }
}
