import { notification } from 'antd'
import { call, put } from 'redux-saga/effects'
import api from 'utils/api'
import {
  GET_RECOGNITION_VALUES_ERROR,
  GET_RECOGNITION_VALUES_FAILURE,
  GET_RECOGNITION_VALUES_SUCCESS,
  GET_SCAN_FILES_ERROR,
  GET_SCAN_FILES_FAILURE,
  GET_SCAN_FILES_SUCCESS,
  UPDATE_RECOGNITION_VALUES_ERROR,
  UPDATE_RECOGNITION_VALUES_FAILURE,
  UPDATE_RECOGNITION_VALUES_SUCCESS
} from '../../reducers/mnp/mnpVerifyReducer'

import history from 'utils/createdHistory'

export function * getScanFilesSaga ({ payload }) {
  const { getScanFiles } = api
  try {
    const response = yield call(getScanFiles, payload)
    const { data, status } = response

    switch (status) {
      case 200:
        yield put({ type: GET_SCAN_FILES_SUCCESS, payload: data })
        break
      case 204:
        yield put({ type: GET_SCAN_FILES_ERROR, payload: 'Скан не найден' })
        notification.warning({
          message: 'Форма ручной сверки MNP',
          description: 'Скан не найден'
        })
        break
      default:
        yield put({ type: GET_SCAN_FILES_ERROR, payload: 'Ошибка загрузки скана' })
        notification.warning({
          message: 'Форма ручной сверки MNP',
          description: 'Ошибка загрузки скана'
        })
        break
    }
  } catch ({ message }) {
    yield put({ type: GET_SCAN_FILES_FAILURE, payload: message })
    notification.error({
      message: 'Форма ручной сверки MNP. Ошибка загрузки скана',
      description: message
    })
  }
}

export function * getRecognitionValuesSaga ({ payload }) {
  const { getRecognitionValues } = api
  try {
    const response = yield call(getRecognitionValues, payload)
    const { data, status } = response

    switch (status) {
      case 200:
        yield put({ type: GET_RECOGNITION_VALUES_SUCCESS, payload: data })
        break
      case 204:
      default:
        yield put({ type: GET_RECOGNITION_VALUES_ERROR, payload: 'Ошибка загрузки распознанных значений' })
        notification.warning({
          message: 'Форма валидации распознанных значений',
          description: 'Ошибка загрузки распознанных значений'
        })
        break
    }
  } catch ({ message }) {
    yield put({ type: GET_RECOGNITION_VALUES_FAILURE, payload: message })
    notification.error({
      message: 'Форма валидации распознанных значений. Ошибка загрузки распознанных значений',
      description: message
    })
  }
}

export function * updateRecognitionValuesSaga ({ payload }) {
  const { updateRecognitionValues } = api
  try {
    const response = yield call(updateRecognitionValues, payload)
    const { status } = response

    switch (status) {
      case 200:
        yield put({ type: UPDATE_RECOGNITION_VALUES_SUCCESS })
        notification.success({
          description: 'Распознанные значения обновлены'
        })
        yield call(history.push, `/empty/mnp-order/manual-verification${history.location.search}`)

        break
      case 204:
      default:
        yield put({ type: UPDATE_RECOGNITION_VALUES_ERROR, payload: 'Ошибка обновления распознанных значений' })
        notification.warning({
          message: 'Форма валидации распознанных значений',
          description: 'Ошибка обновления распознанных значений'
        })
        break
    }
  } catch ({ message }) {
    yield put({ type: UPDATE_RECOGNITION_VALUES_FAILURE, payload: message })
    notification.error({
      message: 'Форма ручной сверки MNP. Ошибка обновления распознанных значений',
      description: message
    })
  }
}
