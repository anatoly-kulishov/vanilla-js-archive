import { call, put } from 'redux-saga/effects'
import api from 'utils/api'

import { handleDownloadFile } from 'webseller/helpers/handleDownloadFile'
import {
  createShowErrorNotification,
  getErrorFromBlobResponse,
  getFileNameFromResponse,
  isSuccessfulResponse
} from 'webseller/helpers/api'

import {
  generateRfaReportError,
  generateRfaReportSuccess,
  getAllDealerSalePointsError,
  getAllDealerSalePointsSuccess,
  getDealerIdBySalePointIdError,
  getDealerIdBySalePointIdSuccess,
  getDealerInfoError,
  getDealerInfoSuccess
} from '../actions'

/**
 * GENERATE_RFA_REPORT
 */
export function * generateRfaReportSaga ({ payload }) {
  const { getErfReportFile } = api

  const showError = createShowErrorNotification('Ошибка при формировании отчета')

  try {
    const response = yield call(getErfReportFile, payload)
    const { data, status } = response

    if (isSuccessfulResponse(status)) {
      const fileName = getFileNameFromResponse({ response, defaultFileName: 'Реестр ЭРФ.xlsx' })
      handleDownloadFile(data, fileName)
      yield put(generateRfaReportSuccess({ response: data }))
    } else {
      const errorResponse = yield call(getErrorFromBlobResponse, data)
      yield put(generateRfaReportError({ response: errorResponse }))
      showError(errorResponse)
    }
  } catch {
    yield put(generateRfaReportError())
    showError()
  }
}
/**
 * GET_DEALER_INFO
 */
export function * getDealerInfoSaga ({ payload }) {
  const { getDealerInfo } = api

  const showError = createShowErrorNotification('Ошибка при получении информации о дилере')

  try {
    const { data: response, status } = yield call(getDealerInfo, payload)
    if (isSuccessfulResponse(status)) {
      yield put(getDealerInfoSuccess({ response, dealerId: payload.dealerId }))
    } else {
      yield put(getDealerInfoError())
      showError(response)
    }
  } catch {
    yield put(getDealerInfoError())
    showError()
  }
}
/**
 * GET_ALL_DEALER_SALE_POINTS
 */
export function * getAllDealerSalePointsSaga ({ payload }) {
  const { getAllDealerSalePoints } = api

  const showError = createShowErrorNotification('Ошибка при получении всех торговых точек дилера')

  try {
    const { data: response, status } = yield call(getAllDealerSalePoints, payload)
    if (isSuccessfulResponse(status)) {
      yield put(getAllDealerSalePointsSuccess({ response }))
    } else {
      yield put(getAllDealerSalePointsError())
      showError(response)
    }
  } catch {
    yield put(getAllDealerSalePointsError())
    showError()
  }
}
/**
 * GET_DEALER_ID_BY_SALE_POINT_ID
 */
export function * getDealerIdBySalePointIdSaga ({ payload }) {
  const { getDealerIdBySalePointId } = api

  const showError = createShowErrorNotification(
    'Ошибка при получении идентификатора диллера по идентификатору торговой точки'
  )

  try {
    const { data: response, status } = yield call(getDealerIdBySalePointId, payload)
    if (isSuccessfulResponse(status)) {
      yield put(getDealerIdBySalePointIdSuccess({ response }))
    } else {
      yield put(getDealerIdBySalePointIdError())
      showError(response)
    }
  } catch {
    yield put(getDealerIdBySalePointIdError())
    showError()
  }
}
