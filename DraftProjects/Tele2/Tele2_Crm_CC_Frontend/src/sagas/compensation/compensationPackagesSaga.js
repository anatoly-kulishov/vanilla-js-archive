import { call, put, select, all } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'
import servicesMessageTypes from 'constants/servicesMessageTypes'

import {
  ADD_SERVICE_COMPENSATION_SUCCESS,
  ADD_SERVICE_COMPENSATION_ERROR,
  ADD_SERVICE_COMPENSATION_FAILURE,

  VALIDATE_PAYD_SERVICE_AVAILABLE_SUCCESS,
  VALIDATE_PAYD_SERVICE_AVAILABLE_ERROR,
  VALIDATE_PAYD_SERVICE_AVAILABLE_FAILURE,

  VALIDATE_PAYD_SERVICE_ENABLED_SUCCESS,
  VALIDATE_PAYD_SERVICE_ENABLED_ERROR,
  VALIDATE_PAYD_SERVICE_ENABLED_FAILURE,

  GET_MARGIN_SERVICE_TYPE_RELATE_SUCCESS,
  GET_MARGIN_SERVICE_TYPE_RELATE_ERROR,
  GET_MARGIN_SERVICE_TYPE_RELATE_FAILURE,

  GET_MARGIN_SERVICE_SIZE_RELATE_SUCCESS,
  GET_MARGIN_SERVICE_SIZE_RELATE_ERROR,
  GET_MARGIN_SERVICE_SIZE_RELATE_FAILURE
} from 'reducers/compensation/compensationPackageReducer'

import { getPersonalAccountState, getHandlingState, getQueryParamsState } from 'selectors'

export function * addServiceCompensationSaga ({ payload }) {
  try {
    const { addServiceCompensation } = api
    const [handlingState, personalAccountState, queryParamsState] = yield all([
      select(getHandlingState),
      select(getPersonalAccountState),
      select(getQueryParamsState)
    ])
    const {
      data: { IsSuccess, MessageText }
    } = yield call(
      addServiceCompensation,
      {
        ...payload,
        msisdn: personalAccountState?.Msisdn,
        handlingTechId: queryParamsState?.handlingTechId,
        subscriberId: personalAccountState?.SubscriberId,
        branchId: personalAccountState?.BillingBranchId,
        clientId: personalAccountState?.SubClientId || personalAccountState?.ClientId,
        handlingId: handlingState?.Id,
        subscriberTypeId: personalAccountState?.SubscriberFullInfo.SubscriberInfo.SubscriberTypeId,
        subscriberStatusId: personalAccountState?.SubscriberStatus
      }
    )
    if (IsSuccess) {
      yield put({
        type: ADD_SERVICE_COMPENSATION_SUCCESS,
        payload: {
          error: {
            data: MessageText,
            type: 'success',
            createdOn: Date.now()
          }
        }
      })
      notification.success({
        message: 'Компенсация успешно зачислена'
      })
    } else {
      yield put({
        type: ADD_SERVICE_COMPENSATION_ERROR,
        payload: {
          error: {
            data: MessageText,
            createdOn: Date.now()
          }
        }
      })
    }
  } catch ({ message }) {
    yield put({
      type: ADD_SERVICE_COMPENSATION_FAILURE,
      payload: {
        error: {
          data: message,
          createdOn: Date.now()
        }
      }
    })
    notification.error({
      message: 'Начисление компенсационного пакета',
      description: message
    })
  }
}

export function * validatePaydServiceEnabledSaga ({ payload }) {
  try {
    const { validatePaydServiceEnabled } = api
    const personalAccountState = yield select(getPersonalAccountState)
    const {
      data: { IsSuccess, MessageText, Warnings }
    } = yield call(
      validatePaydServiceEnabled,
      {
        ...payload,
        msisdn: personalAccountState?.Msisdn
      }
    )
    if (IsSuccess) {
      yield put({
        type: VALIDATE_PAYD_SERVICE_ENABLED_SUCCESS,
        payload: {
          error: {
            data: Warnings?.length ? Warnings : MessageText,
            type: Warnings?.length ? 'warning' : 'success',
            createdOn: Date.now()
          }
        }
      })
    } else {
      yield put({
        type: VALIDATE_PAYD_SERVICE_ENABLED_ERROR,
        payload: {
          error: {
            data: MessageText,
            shouldDisable: true,
            type: 'error',
            createdOn: Date.now()
          }
        }
      })
    }
  } catch ({ message }) {
    yield put({
      type: VALIDATE_PAYD_SERVICE_ENABLED_FAILURE,
      payload: {
        error: {
          data: message,
          createdOn: Date.now()
        }
      }
    })
    notification.error({
      message: `Валидация сервиса истории платежей`,
      description: message
    })
  }
}

export function * validatePaydServiceAvailableSaga ({ payload }) {
  try {
    const personalAccountState = yield select(getPersonalAccountState)
    const { validatePaydServiceAvailable } = api
    const isPrivilegue = payload.isPrivilegue === false ? false : undefined
    const {
      data: { Data, IsSuccess, MessageText, Warnings }
    } = yield call(
      validatePaydServiceAvailable,
      {
        isActive: true,
        isPrivilegue,
        serviceTypeId: payload?.serviceTypeId,
        serviceSizeId: payload?.serviceSizeId,
        msisdn: personalAccountState.Msisdn
      }
    )

    if (IsSuccess) {
      yield put({
        type: VALIDATE_PAYD_SERVICE_AVAILABLE_SUCCESS,
        payload: {
          data: Data,
          error: {
            data: Warnings?.length ? Warnings : null,
            createdOn: Warnings?.length ? Date.now() : null,
            type: 'warning'
          }
        }
      })
    } else {
      yield put({
        type: VALIDATE_PAYD_SERVICE_AVAILABLE_ERROR,
        payload: {
          error: {
            data: MessageText,
            type: 'error',
            createdOn: Date.now(),
            shouldDisable: true
          }
        }
      })
    }
  } catch ({ message }) {
    yield put({
      type: VALIDATE_PAYD_SERVICE_AVAILABLE_FAILURE,
      payload: {
        error: {
          data: message,
          createdOn: Date.now()
        }
      }
    })
    notification.error({
      message: `Получение пакетов`,
      description: message
    })
  }
}

export function * getMarginServiceTypeRelateSaga () {
  try {
    const { getMarginServiceTypeRelate } = api
    const personalAccountState = yield select(getPersonalAccountState)
    const { data: { Data, IsSuccess, MessageText, ResultType } } = yield call(getMarginServiceTypeRelate, {
      branchId: personalAccountState?.BillingBranchId,
      subscriberId: personalAccountState?.SubscriberId
    })

    if (IsSuccess) {
      yield put({
        type: GET_MARGIN_SERVICE_TYPE_RELATE_SUCCESS,
        payload: {
          data: Data,
          error: {
            type: ResultType === servicesMessageTypes.success ? 'success' : 'warning'
          }
        }
      })
    } else {
      yield put({
        type: GET_MARGIN_SERVICE_TYPE_RELATE_ERROR,
        payload: {
          error: {
            data: MessageText,
            createdOn: Date.now()
          }
        }
      })
      notification.error({
        message: `Получение типов пакетов`,
        description: MessageText
      })
    }
  } catch ({ message }) {
    yield put({
      type: GET_MARGIN_SERVICE_TYPE_RELATE_FAILURE,
      payload: {
        error: {
          data: message,
          createdOn: Date.now()
        }
      }
    })
    notification.error({
      message: `Получение типов пакетов`,
      description: message
    })
  }
}

export function * getMarginServiceSizeRelateSaga () {
  try {
    const { getMarginServiceSizeRelate } = api
    const personalAccountState = yield select(getPersonalAccountState)
    const { data: { Data, IsSuccess, MessageText, ResultType } } = yield call(getMarginServiceSizeRelate, {
      branchId: personalAccountState?.BillingBranchId,
      subscriberId: personalAccountState?.SubscriberId
    })

    if (IsSuccess) {
      yield put({
        type: GET_MARGIN_SERVICE_SIZE_RELATE_SUCCESS,
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
        type: GET_MARGIN_SERVICE_SIZE_RELATE_ERROR,
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
      type: GET_MARGIN_SERVICE_SIZE_RELATE_FAILURE,
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
