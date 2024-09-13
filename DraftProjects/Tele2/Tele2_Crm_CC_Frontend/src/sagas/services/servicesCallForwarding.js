import { call, put } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'

import {
  FETCH_HLR,
  FETCH_HLR_SUCCESS,
  FETCH_HLR_ERROR,
  FETCH_HLR_FAILURE,
  RESET_HLR_SUCCESS,
  RESET_HLR_ERROR,
  RESET_HLR_FAILURE,
  CHANGE_HLR_SUCCESS,
  CHANGE_HLR_ERROR,
  CHANGE_HLR_FAILURE
} from 'reducers/services/servicesCallForwarding'

const { fetchHlr, resetHlr, changeHlr } = api

export function * fetchHlrSaga ({ payload }) {
  try {
    const { data } = yield call(fetchHlr, payload)

    if (data.IsSuccess) {
      const { Data } = data
      const hlr = ['CFU', 'CFB', 'CFNRY', 'CFNRC'].map(type => {
        const item = {
          type
        }

        Object.keys(Data).forEach(key => {
          if (key.includes(type)) {
            if (key.includes('timer')) {
              item['timer'] = Data[key]
            } else {
              key.includes('msisdn') && (item['msisdn'] = Data[key])
              key.includes('Status') && (item['status'] = Data[key])
              key.includes('Mailbox') && (item['isMailbox'] = Data[key])
            }
          }
        })

        return item
      })

      yield put({ type: FETCH_HLR_SUCCESS, payload: { hlr } })
    } else {
      yield put({ type: FETCH_HLR_ERROR })

      notification.open({
        message: `Ошибка переадресации `,
        description: data.MessageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_HLR_FAILURE, message: exception.message })
    notification.open({
      message: `Ошибка переадресации `,
      description: exception.message,
      type: 'error'
    })
  }
}

export function * resetHlrSaga ({ payload }) {
  try {
    const { data } = yield call(resetHlr, payload)

    if (data.IsSuccess) {
      yield put({ type: RESET_HLR_SUCCESS })
      yield put({ type: FETCH_HLR, payload })
      notification.success({
        message: 'Переадресация. Настройки сброшены',
        description: data.MessageText
      })
    } else {
      yield put({ type: RESET_HLR_ERROR })

      notification.open({
        message: `Ошибка переадресации `,
        description: data.MessageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: RESET_HLR_FAILURE, message: exception.message })
    notification.open({
      message: `Ошибка переадресации `,
      description: exception.message,
      type: 'error'
    })
  }
}

export function * changeHlrSaga ({ payload }) {
  try {
    const { data } = yield call(changeHlr, payload)

    if (data.IsSuccess) {
      yield put({ type: CHANGE_HLR_SUCCESS })
      yield put({ type: FETCH_HLR, payload: { msisdn: payload.msisdn } })
      notification.success({
        message: 'Переадресация. Настройки изменены',
        description: data.MessageText
      })
    } else {
      yield put({ type: CHANGE_HLR_ERROR })

      notification.open({
        message: `Ошибка переадресации `,
        description: data.MessageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: CHANGE_HLR_FAILURE, message: exception.message })
    notification.open({
      message: `Ошибка переадресации `,
      description: exception.message,
      type: 'error'
    })
  }
}
