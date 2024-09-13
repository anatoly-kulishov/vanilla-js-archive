import { call, put } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'

import {
  FETCH_TARIFF_INFO_SUCCESS,
  FETCH_TARIFF_INFO_ERROR,
  FETCH_TARIFF_INFO_FAILURE,
  FETCH_AVAILABLE_TARIFFS_SUCCESS,
  FETCH_AVAILABLE_TARIFFS_ERROR,
  FETCH_AVAILABLE_TARIFFS_FAILURE,
  CHANGE_TARIFF_SUCCESS,
  CHANGE_TARIFF_ERROR,
  CHANGE_TARIFF_FAILURE,
  FETCH_AVAILABLE_TARIFF_DETAILS_SUCCESS,
  FETCH_AVAILABLE_TARIFF_DETAILS_ERROR,
  FETCH_AVAILABLE_TARIFF_DETAILS_FAILURE,
  CHANGE_SERVICES_SUCCESS,
  CHANGE_SERVICES_ERROR,
  CHANGE_SERVICES_FAILURE
} from 'reducers/services/tariffModalReducer'
import { getErrorDescription } from 'utils/helpers'

const {
  fetchTariffInfo,
  fetchAvailableTariffs,
  changeTariff,
  changeServices,
  fetchAvailableTariffDetails,
  fetchEnabledTariffDetails
} = api

function getSettingsAvailableSliders (data) {
  const availableSliders = data.AvailableSliders

  const marksSliders = {} // объект точек слайдера
  const sliderSettings = {} // объект длины и дефолтных точек для слайдера
  const priceSlider = {} // дефолтная цена каждого слайдера
  for (const key in availableSliders) {
    marksSliders[key] = {}
    sliderSettings[key] = {}
    const len = availableSliders[key].length
    sliderSettings[key]['len'] = len - 1 // длина для каждого слайдера
    let price = 0
    for (let index = 0; index < len; index++) {
      if (availableSliders[key][index].EnabledSliders) {
        sliderSettings[key]['defaultMarks'] = index // дефолтные точки слайдеров
        if (index !== 0) {
          price += availableSliders[key][index].CostMonthSliders + availableSliders[key][index].CostOnSliders
        }
      }
      marksSliders[key][index] = availableSliders[key][index].PackVolumeSliders // значения для точек слайдера
    }
    priceSlider[key] = price // дефолтная цена для каждого слайдера
  }
  return {
    marksSliders,
    sliderSettings,
    priceSlider
  }
}

export function * fetchTariffInfoSaga ({ payload }) {
  try {
    const { msisdn } = payload
    const { data, status } = yield call(fetchTariffInfo, msisdn, {})

    if (status === 200) {
      yield put({ type: FETCH_TARIFF_INFO_SUCCESS, payload: data })
    } else {
      yield put({ type: FETCH_TARIFF_INFO_ERROR })

      const description = getErrorDescription(data)
      notification.open({
        message: `Ошибка`,
        description,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_TARIFF_INFO_FAILURE, message: exception.message })
  }
}

export function * fetchAvailableTariffsSaga ({ payload }) {
  try {
    const { msisdn } = payload
    const { status, data } = yield call(fetchAvailableTariffs, msisdn, {})

    if (status === 200) {
      yield put({ type: FETCH_AVAILABLE_TARIFFS_SUCCESS, payload: data })
    } else {
      yield put({ type: FETCH_AVAILABLE_TARIFFS_ERROR })

      const description = getErrorDescription(data)
      notification.open({
        message: `Ошибка`,
        description,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_AVAILABLE_TARIFFS_FAILURE, message: exception.message })
  }
}

export function * changeTariffSaga ({ payload }) {
  try {
    const { msisdn, ...params } = payload

    const { status, data } = yield call(changeTariff, msisdn, params)

    if (status === 200) {
      yield put({ type: CHANGE_TARIFF_SUCCESS, payload: data })
      notification.open({
        message: 'Внимание',
        description:
          payload?.targetDate !== null
            ? 'Заказ на смену тарифа успешно зарегистрирован'
            : 'Изменения вступят в силу в течение 30 секунд',
        type: 'info'
      })
    } else {
      yield put({ type: CHANGE_TARIFF_ERROR })

      const description = getErrorDescription(data)
      notification.open({
        message: `Ошибка`,
        description,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: CHANGE_TARIFF_FAILURE, message: exception.message })
  }
}

export function * fetchAvailableTariffDetailsSaga ({ payload }) {
  try {
    const { msisdn, trplId, ...params } = payload
    const { status, data } = yield call(fetchAvailableTariffDetails, msisdn, trplId, params)

    if (status === 200) {
      const { marksSliders, sliderSettings, priceSlider } = getSettingsAvailableSliders(data)

      yield put({
        type: FETCH_AVAILABLE_TARIFF_DETAILS_SUCCESS,
        payload: { settings: data, marksSliders, sliderSettings, priceSlider }
      })
    } else {
      yield put({ type: FETCH_AVAILABLE_TARIFF_DETAILS_ERROR })

      const description = getErrorDescription(data)
      notification.open({
        message: `Ошибка`,
        description,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_AVAILABLE_TARIFF_DETAILS_FAILURE, message: exception.message })
  }
}

export function * changeServicesSaga ({ payload }) {
  try {
    const { msisdn, ...params } = payload
    const { data, status } = yield call(changeServices, msisdn, params)

    if (status === 200) {
      yield put({ type: CHANGE_SERVICES_SUCCESS, payload: data })

      notification.open({
        message: 'Внимание',
        description:
          payload?.targetDate !== null
            ? 'Заказ на переконфигурацию тарифа успешно зарегистрирован'
            : 'Изменения вступят в силу в течение 30 секунд',
        type: 'info'
      })
    } else {
      yield put({ type: CHANGE_SERVICES_ERROR })

      const description = getErrorDescription(data)
      notification.open({
        message: `Ошибка`,
        description,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: CHANGE_SERVICES_FAILURE, message: exception.message })
  }
}

export function * fetchEnabledTariffDetailsSaga ({ payload }) {
  try {
    const { msisdn } = payload
    const { data, status } = yield call(fetchEnabledTariffDetails, msisdn, {})

    if (status === 200) {
      const { marksSliders, sliderSettings, priceSlider } = getSettingsAvailableSliders(data)

      yield put({
        type: FETCH_AVAILABLE_TARIFF_DETAILS_SUCCESS,
        payload: { settings: data, marksSliders, sliderSettings, priceSlider }
      })
    } else {
      yield put({ type: FETCH_AVAILABLE_TARIFF_DETAILS_ERROR })

      const description = getErrorDescription(data)
      notification.open({
        message: `Ошибка`,
        description,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_AVAILABLE_TARIFF_DETAILS_FAILURE, message: exception.message })
  }
}
