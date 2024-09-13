import { call, put, select } from 'redux-saga/effects'
import api from 'utils/api'

import {
  FETCH_LOCATION_HISTORY_SUCCESS,
  FETCH_LOCATION_HISTORY_ERROR,
  FETCH_LOCATION_HISTORY_FAILURE
} from 'reducers/reasonsCategories/reasonCategoryDiagnosticsReducer'
import { getPersonalAccountState } from 'selectors'

import { notification } from 'antd'

export function * fetchLocationHistorySaga () {
  const { Msisdn } = yield select(getPersonalAccountState)
  const { fetchLocationHistory } = api
  const errorMessage = 'Получение истории коррдинат абонента'
  try {
    const {
      data: { Data, IsSuccess, MessageText }
    } = yield call(fetchLocationHistory, { Msisdn, isGetByLBS: 0 })
    if (IsSuccess) {
      const { Coordinates } = Data
      const locationHistory = Coordinates.map(item => {
        return {
          address: item.Address,
          locationDate: item.LocationDate,
          deltaSearchTime: item.Delta,
          get coordinates () {
            return {
              latitude: item.Latitude,
              longitude: item.Longitude,
              string: `${item.Latitude} ${item.Longitude}`
            }
          }
        }
      })

      yield put({ type: FETCH_LOCATION_HISTORY_SUCCESS, payload: locationHistory })
    } else {
      yield put({ type: FETCH_LOCATION_HISTORY_ERROR, payload: MessageText })
      notification.open({
        message: errorMessage,
        description: MessageText,
        type: 'error'
      })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_LOCATION_HISTORY_FAILURE, payload: message })
    notification.open({
      message: errorMessage,
      description: message,
      type: 'error'
    })
  }
}
