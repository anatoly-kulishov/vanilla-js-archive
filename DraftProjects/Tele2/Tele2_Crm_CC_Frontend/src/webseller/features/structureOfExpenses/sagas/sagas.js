import { call, put, select } from 'redux-saga/effects'
import { notification } from 'antd'

import api from 'utils/api'
import { selectHandlingState } from 'reducers/internal/selectors'
import { selectPersonalAccount } from 'reducers/personalInfo/selectors'
import { isSuccessfulResponse } from 'webseller/helpers/api'
import getFinalPollingData from 'webseller/helpers/api/getFinalPollingData'
import {
  checkIsAvailableStructureOfExpensesSuccess,
  checkIsAvailableStructureOfExpensesError,
  getUrlStructureOfExpensesSuccess,
  getUrlStructureOfExpensesError
} from '../reducer'
import { selectDataStructureOfExpenses, selectIsDateRangeChanged, selectStatusStructureOfExpenses } from '../selectors'
import { createRequestParamsCreateInteraction } from './helpers'
import { OperationStatus } from 'webseller/helpers'

export function * createInteractionSaga () {
  const { createInteraction } = api
  const params = yield call(createRequestParamsCreateInteraction)
  yield call(createInteraction, params)
}

export function * checkIsAvailableStructureOfExpensesSaga () {
  const { fetchIsAvailableStructureOfExpenses } = api

  try {
    const { Msisdn, BillingBranchId: branchId } = yield select(selectPersonalAccount)
    const { data: response } = yield call(fetchIsAvailableStructureOfExpenses, { Msisdn, branchId })
    const { isStructureAvailable, message } = response
    if (isStructureAvailable) {
      yield put(checkIsAvailableStructureOfExpensesSuccess())
    } else {
      yield put(checkIsAvailableStructureOfExpensesError())
      notification.info({
        message: 'Предоставление Структуры расходов недоступно',
        description: message
      })
    }
  } catch (error) {
    yield put(checkIsAvailableStructureOfExpensesError())
    notification.info({
      message: 'Не удалось проверить доступность Структуры расходов, повторите попытку'
    })
  }
}

export function * getPoolingDetalizationStructureOfExpensesSaga () {
  const { fetchPoolingDetalization } = api

  try {
    const { Msisdn, BillingBranchId } = yield select(selectPersonalAccount)
    const { Id: handlingId } = yield select(selectHandlingState)
    const { startDate, endDate, typeId } = yield select(selectDataStructureOfExpenses)

    const requestPayload = {
      msisdns: [Msisdn],
      branchId: BillingBranchId,
      startDate,
      endDate,
      typeId
    }
    const { data } = yield call(fetchPoolingDetalization, handlingId, requestPayload)
    return data
  } catch {
    yield put(getUrlStructureOfExpensesError())
  }
}

export function * getUrlStructureOfExpensesSaga () {
  const { fetchUrlOnFile } = api

  try {
    const isDateWasChanged = yield select(selectIsDateRangeChanged)
    const status = yield select(selectStatusStructureOfExpenses)
    const isSuccess = status === OperationStatus.SUCCESSFUL
    if (!isDateWasChanged && isSuccess) return
    const { requestId, pollingTime, timeOut } = yield call(getPoolingDetalizationStructureOfExpensesSaga)
    const response = yield call(getFinalPollingData, {
      interval: timeOut * 1000,
      threshold: pollingTime * 1000,
      fetchData: () => fetchUrlOnFile(requestId),
      checkOnError: response => {
        if (!isSuccessfulResponse(response?.status)) {
          return true
        }
        return false
      },
      checkOnSuccess: response => {
        if (response?.data?.url) {
          return true
        }
        return false
      }
    })

    if (isSuccessfulResponse(response?.status)) {
      yield put(getUrlStructureOfExpensesSuccess(response?.data.url))
    }
  } catch (error) {
    yield put(getUrlStructureOfExpensesError())
    notification.error({
      message: 'Ошибка',
      description:
        'Запрос не был обработан из-за истечения времени ожидания. Пожалуйста, попробуйте отправить запрос еще раз.'
    })
  }
}
