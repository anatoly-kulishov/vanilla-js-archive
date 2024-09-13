import { call, put } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'

import { getErrorDescription } from 'utils/helpers'
import {
  FETCH_TARIFF_INFO_PREVIEW_ERROR,
  FETCH_TARIFF_INFO_PREVIEW_FAILURE,
  FETCH_TARIFF_INFO_PREVIEW_SUCCESS
} from 'reducers/services/tariffInfoReducer'

const { fetchTariffInfoPreview } = api

export function * fetchTariffInfoPreviewSaga ({ payload }) {
  try {
    const { msisdn } = payload
    const { data, status } = yield call(fetchTariffInfoPreview, msisdn)

    if (status === 200) {
      yield put({ type: FETCH_TARIFF_INFO_PREVIEW_SUCCESS, payload: data })
    } else {
      yield put({ type: FETCH_TARIFF_INFO_PREVIEW_ERROR })

      const description = getErrorDescription(data)
      notification.error({
        message: `Ошибка`,
        description
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_TARIFF_INFO_PREVIEW_FAILURE, message: exception.message })
  }
}
