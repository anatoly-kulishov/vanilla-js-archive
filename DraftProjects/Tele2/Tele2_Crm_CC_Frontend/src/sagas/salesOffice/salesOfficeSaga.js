import { all, call, put } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'
import {
  changeActiveSalesOfficeError,
  changeActiveSalesOfficeSuccess,
  getActiveSalesOffice,
  getActiveSalesOfficeError,
  getActiveSalesOfficeSuccess,
  getPotentialActiveSalesOfficeInfoError,
  getPotentialActiveSalesOfficeInfoSuccess
} from 'reducers/salesOffice/salesOfficeReducer'
import getFinalPollingData from 'webseller/helpers/api/getFinalPollingData'
import { isSuccessfulResponse } from 'webseller/helpers/api'

export function * getActiveSalesOfficeSaga () {
  const { fetchActiveSalesOffice, fetchSalesOfficeInfo, fetchSalesOfficeBranches } = api

  try {
    const { data: activeSalesOffice } = yield call(fetchActiveSalesOffice)
    const { salesOfficeId } = activeSalesOffice || {}

    if (salesOfficeId) {
      const [
        { data: salesOfficeInfo },
        { data: branchesResponse }
      ] = yield all([
        call(fetchSalesOfficeInfo, salesOfficeId),
        call(fetchSalesOfficeBranches, salesOfficeId)
      ])

      yield put(getActiveSalesOfficeSuccess({
        salesOfficeId,
        fullAddress: salesOfficeInfo?.fullAddress,
        branches: branchesResponse?.branches
      }))
    } else {
      throw new Error()
    }
  } catch {
    yield put(getActiveSalesOfficeError())
  }
}

export function * getPotentialActiveSalesOfficeInfoSaga ({ payload: officeId }) {
  const { fetchSalesOfficeInfo } = api

  try {
    const { data, status } = yield call(fetchSalesOfficeInfo, officeId)

    if (status === 404) {
      yield put(getPotentialActiveSalesOfficeInfoError('Торговая точка не найдена'))
      notification.error({
        message: data?.message
      })
      return
    }
    if (data?.isActiveSettingAvailable !== true) {
      const { activeSettingReason, message } = data || {}

      yield put(getPotentialActiveSalesOfficeInfoError(activeSettingReason || message))
      notification.error({
        message: activeSettingReason || message
      })
      return
    }
    yield put(getPotentialActiveSalesOfficeInfoSuccess({ officeId, ...data }))
  } catch {
    yield put(getPotentialActiveSalesOfficeInfoError('Что-то пошло не так'))
    notification.error({
      message: 'Что-то пошло не так'
    })
  }
}

export function * changeActiveSalesOfficeSaga ({ payload }) {
  const { newOfficeId, refreshTokens } = payload || {}
  const { fetchChangeActiveSalesOffice, fetchActiveSalesOfficeStatus } = api

  try {
    const { data, status } = yield call(fetchChangeActiveSalesOffice, {
      salesOfficeId: newOfficeId
    })

    if (!isSuccessfulResponse(status)) {
      yield put(changeActiveSalesOfficeError(data?.message || 'Изменение торговых точек ограничено'))
      return
    }

    const { officeChangeSessionId } = data || {}
    if (officeChangeSessionId) {
      const changingOfficeStatus = yield call(getFinalPollingData, {
        interval: 7_000,
        threshold: 60_000,
        fetchData: () => fetchActiveSalesOfficeStatus({ officeChangeSessionId }),
        checkOnError: (response) => !isSuccessfulResponse(response?.status),
        checkOnSuccess: (response) => response?.data?.isMigrationResultReceived === true
      })

      const isConfirmedChanging = changingOfficeStatus?.data?.isConfirmed === true
      if (isConfirmedChanging) {
        yield put(
          changeActiveSalesOfficeSuccess({
            salesOfficeId: newOfficeId
          })
        )
        yield put(getActiveSalesOffice())
        refreshTokens()
      } else {
        yield put(changeActiveSalesOfficeError('При изменении торговой точки возникла ошибка. Попробуйте изменить точку повторно'))
      }
    } else {
      throw new Error('Не удалось получить id смены торговой точки')
    }
  } catch {
    yield put(changeActiveSalesOfficeError('Произошел технический сбой. Попробуйте еще раз'))
  }
}
