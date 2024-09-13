import { call, put, select, cancelled, delay, fork, take } from 'redux-saga/effects' //  setContext, getContext
import { notification } from 'antd'
import api from 'utils/api'
import servicesMessageTypes from 'constants/servicesMessageTypes'

import {
  GET_PROMOCODE_SERVICE_TYPE_SUCCESS,
  GET_PROMOCODE_SERVICE_TYPE_ERROR,
  GET_PROMOCODE_SERVICE_TYPE_FAILURE,

  GET_PROMOCODE_TYPE_SUCCESS,
  GET_PROMOCODE_TYPE_ERROR,
  GET_PROMOCODE_TYPE_FAILURE,

  ADD_PROMOCODE_COMPENSATION_SUCCESS,
  ADD_PROMOCODE_COMPENSATION_ERROR,
  ADD_PROMOCODE_COMPENSATION_FAILURE,

  CANCEL_PROMOCODE_COMPENSATION_CONNECT_SUCCESS,
  CANCEL_PROMOCODE_COMPENSATION_CONNECT_ERROR,
  CANCEL_PROMOCODE_COMPENSATION_CONNECT,

  CANCEL_COMPENSATION_SUCCESS,
  CANCEL_PROMOCODE_SUCCESS,
  CANCEL_COMPENSATION_ERROR,
  CANCEL_COMPENSATION_FAILURE,

  GET_MARGIN_SERVICE_SIZE_RELATE_IN_PROMO_SUCCESS,
  GET_MARGIN_SERVICE_SIZE_RELATE_IN_PROMO_ERROR,
  GET_MARGIN_SERVICE_SIZE_RELATE_IN_PROMO_FAILURE
} from 'reducers/compensation/compensationPromoReducer'

import { FETCH_PAYMENTS_COMPENSATION_HISTORY } from 'reducers/compensation/compensationReducer'

import { getPersonalAccountState } from 'selectors'
import { sseChannel } from 'utils/helpers/sseHelper'

export function * getPromocodeServiceTypeSaga ({ payload }) {
  try {
    const personalAccountState = yield select(getPersonalAccountState)
    const { getPromocodeServiceType } = api

    const { data: { Data, ResultType, MessageText } } = yield call(getPromocodeServiceType, {
      subscriberBranchId: personalAccountState?.BillingBranchId,
      subscriberId: personalAccountState?.SubscriberId,
      msisdn: personalAccountState?.Msisdn
    })

    const warningPayload = {
      error: {
        data: MessageText,
        type: 'warning',
        createdOn: Date.now()
      }
    }

    const errorPayload = {
      error: {
        data: MessageText,
        type: 'error',
        createdOn: Date.now()
      }
    }

    switch (ResultType) {
      case servicesMessageTypes.success:
        yield put({
          type: GET_PROMOCODE_SERVICE_TYPE_SUCCESS,
          payload: {
            data: Data
          }
        })
        break
      case servicesMessageTypes.warning:
        yield put({
          type: GET_PROMOCODE_SERVICE_TYPE_ERROR,
          payload: warningPayload
        })
        break
      case servicesMessageTypes.error:
        yield put({
          type: GET_PROMOCODE_SERVICE_TYPE_ERROR,
          payload: errorPayload
        })
        notification.error({
          message: 'Компенсации',
          description: MessageText
        })
        break
      default:
        yield put({
          type: GET_PROMOCODE_SERVICE_TYPE_ERROR,
          payload: errorPayload
        })
        notification.error({
          message: 'Компенсации',
          description: MessageText
        })
        break
    }
  } catch ({ message }) {
    yield put({
      type: GET_PROMOCODE_SERVICE_TYPE_FAILURE,
      payload: {
        error: {
          data: message,
          type: 'error',
          createdOn: Date.now()
        }
      }
    })
  }
}

export function * getPromocodeTypeSaga ({ payload }) {
  try {
    const { getPromocodeType } = api

    const { data: { Data, IsSuccess, MessageText } } = yield call(getPromocodeType, payload)

    if (IsSuccess) {
      yield put({
        type: GET_PROMOCODE_TYPE_SUCCESS,
        payload: {
          data: Data
        }
      })
    } else {
      yield put({
        type: GET_PROMOCODE_TYPE_ERROR,
        payload: {
          error: {
            data: MessageText,
            type: 'warning',
            createdOn: Date.now()
          }
        }
      })
    }
  } catch ({ message }) {
    yield put({
      type: GET_PROMOCODE_TYPE_FAILURE,
      payload: {
        error: {
          data: message,
          type: 'warning',
          createdOn: Date.now()
        }
      }
    })
  }
}

export function * addPromocodeCompensationSaga ({ payload }) {
  const { addPromocodeCompensation } = api
  try {
    const { data: { Data, MessageText, ResultType } } = yield call(addPromocodeCompensation, payload)

    switch (ResultType) {
      case servicesMessageTypes.success:
        yield put({ type: ADD_PROMOCODE_COMPENSATION_SUCCESS,
          payload: {
            data: Data,
            error: {
              data: MessageText,
              type: 'success',
              createdOn: Date.now()
            }
          }
        })
        notification.success({
          message: 'Компенсации',
          description: MessageText
        })
        break
      case servicesMessageTypes.warning:
        yield put({ type: ADD_PROMOCODE_COMPENSATION_ERROR,
          payload: {
            data: Data,
            error: {
              data: MessageText,
              type: 'warning',
              createdOn: Date.now()
            }
          }
        })
        notification.warn({
          message: 'Компенсации',
          description: MessageText
        })
        break
      case servicesMessageTypes.error:
        yield put({ type: ADD_PROMOCODE_COMPENSATION_ERROR,
          payload: {
            data: Data,
            error: {
              data: MessageText,
              type: 'error',
              createdOn: Date.now()
            }
          }
        })
        notification.error({
          message: 'Компенсации',
          description: MessageText
        })
        break
      default:
        yield put({ type: ADD_PROMOCODE_COMPENSATION_ERROR, payload: MessageText })
        break
    }
  } catch ({ message }) {
    yield put({ type: ADD_PROMOCODE_COMPENSATION_FAILURE, payload: message })
    yield put({ type: ADD_PROMOCODE_COMPENSATION_ERROR,
      payload: {
        data: [],
        error: {
          data: message,
          type: 'error',
          createdOn: Date.now()
        }
      }
    })
    notification.error({
      message: 'Компенсации',
      description: message
    })
  }
}

// Take message from channel and pass them to redux
function * promocodeListening ({ sseConnection, reduxChannel }) {
  while (true) {
    const data = yield take(reduxChannel)
    const promocodeId = yield select((state) => state.compensation.compensationPromo.cancelCompensation?.data?.promocodeId)
    let parsedMessage = {}
    try {
      parsedMessage = JSON.parse(data)
    } catch (error) {
      parsedMessage = {}
      break
    }
    if (parsedMessage?.PromocodeId === promocodeId) {
      yield put({ type: CANCEL_PROMOCODE_SUCCESS,
        payload: {
          data: null,
          error: {
            data: parsedMessage?.Message,
            type: 'success',
            createdOn: Date.now()
          }
        }
      })
      reduxChannel.close()
      sseConnection.close()
      notification.success({
        message: 'Компенсации',
        description: parsedMessage?.Message
      })
    }
    break
  }
}

export function * cancelPromocodeSaga ({ payload, sseConnection, reduxChannel }) {
  const { cancelPromocodeCompensation } = api

  try {
    const { historyRerequestData, ...requestData } = payload
    const { data: { Data, MessageText, ResultType } } = yield call(cancelPromocodeCompensation, requestData)

    switch (ResultType) {
      case servicesMessageTypes.success:
        yield put({ type: CANCEL_COMPENSATION_SUCCESS,
          payload: {
            data: {
              promocodeId: requestData?.promocodeId, ...Data
            },
            error: {
              data: MessageText,
              type: 'success',
              createdOn: Date.now()
            }
          }
        })
        yield put({ type: FETCH_PAYMENTS_COMPENSATION_HISTORY, payload: historyRerequestData })
        notification.success({
          message: 'Компенсации',
          description: MessageText
        })
        break
      case servicesMessageTypes.error:
        sseConnection.close()
        reduxChannel.close()

        yield put({ type: CANCEL_COMPENSATION_ERROR,
          payload: {
            data: Data,
            error: {
              data: MessageText,
              type: 'error',
              createdOn: Date.now()
            }
          }
        })

        notification.error({
          message: 'Компенсации',
          description: MessageText
        })
        break
      default:
        yield put({ type: CANCEL_COMPENSATION_ERROR, payload: MessageText })
        break
    }
  } catch ({ message }) {
    yield put({ type: CANCEL_COMPENSATION_FAILURE, payload: message })
    notification.error({
      message: 'Компенсации',
      description: message
    })
  }
}

export function * cancelPromocodeCompensationSaga ({ payload }) {
  const { compensationSse } = api
  let sseConnection
  let reduxChannel

  try {
    sseConnection = yield call(compensationSse)
    reduxChannel = yield call(sseChannel, sseConnection)
    yield put({ type: CANCEL_PROMOCODE_COMPENSATION_CONNECT_SUCCESS })
    // compensation cancel
    yield fork(cancelPromocodeSaga, { payload, sseConnection, reduxChannel })
    // promocode cancel
    yield fork(promocodeListening, { sseConnection, reduxChannel })
  } catch (error) {
    yield put({ type: CANCEL_PROMOCODE_COMPENSATION_CONNECT_ERROR })
    // Try to reconnect
    yield delay(10000)
    yield put({ type: CANCEL_PROMOCODE_COMPENSATION_CONNECT })
  } finally {
    if (yield cancelled()) {
      sseConnection.close()
      reduxChannel.close()
    }
  }
}

export function * getMarginServiceSizeRelateInPromoSaga () {
  try {
    const { getMarginServiceSizeRelate } = api
    const personalAccountState = yield select(getPersonalAccountState)
    const { data: { Data, IsSuccess, MessageText, ResultType } } = yield call(getMarginServiceSizeRelate, {
      branchId: personalAccountState?.BillingBranchId,
      subscriberId: personalAccountState?.SubscriberId
    })

    if (IsSuccess) {
      yield put({
        type: GET_MARGIN_SERVICE_SIZE_RELATE_IN_PROMO_SUCCESS,
        payload: {
          data: Data,
          error: {
            data: MessageText,
            createdOn: MessageText?.length ? Date.now() : null,
            type: ResultType === 1 ? 'success' : 'warning'
          }
        }
      })
    } else {
      yield put({
        type: GET_MARGIN_SERVICE_SIZE_RELATE_IN_PROMO_ERROR,
        payload: {
          error: {
            data: MessageText,
            createdOn: Date.now()
          }
        }
      })
      notification.error({
        message: `Получение размеров пакетов`,
        description: MessageText
      })
    }
  } catch ({ message }) {
    yield put({
      type: GET_MARGIN_SERVICE_SIZE_RELATE_IN_PROMO_FAILURE,
      payload: {
        error: {
          data: message,
          createdOn: Date.now()
        }
      }
    })
    notification.error({
      message: `Получение размеров пакетов`,
      description: message
    })
  }
}
