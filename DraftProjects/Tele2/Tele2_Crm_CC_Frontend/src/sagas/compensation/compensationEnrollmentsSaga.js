import { call, put, select, all } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'

import {
  SET_PAYD_POST_LIMIT_SUCCESS,
  SET_PAYD_POST_LIMIT_ERROR,
  SET_PAYD_POST_LIMIT_FAILURE,

  ADD_COMPENSATION_FAILURE,
  ADD_COMPENSATION_ERROR,
  ADD_COMPENSATION_SUCCESS,

  FETCH_AVAILABLE_BALANCE_SUCCESS,
  FETCH_AVAILABLE_BALANCE_ERROR,
  FETCH_AVAILABLE_BALANCE_FAILURE,

  VALIDATE_PAYD_HISTORY_SUCCESS,
  VALIDATE_PAYD_HISTORY_ERROR,
  VALIDATE_PAYD_HISTORY_FAILURE,

  ON_START_VALIDATE_PAYD_HISTORY_SUCCESS,
  ON_START_VALIDATE_PAYD_HISTORY_ERROR,
  ON_START_VALIDATE_PAYD_HISTORY_FAILURE,

  GET_PAYD_COMMENT_RELATE_SUCCESS,
  GET_PAYD_COMMENT_RELATE_ERROR,
  GET_PAYD_COMMENT_RELATE_FAILURE
} from 'reducers/compensation/compensationEnrollmentReducer'

import { getPersonalAccountState, getHandlingState, getQueryParamsState } from 'selectors'

export function * addCompensationSaga ({ payload }) {
  try {
    const { addCompensation } = api
    const [handlingState, personalAccountState, queryParamsState] = yield all([
      select(getHandlingState),
      select(getPersonalAccountState),
      select(getQueryParamsState)
    ])
    const {
      data: { IsSuccess, MessageText }
    } = yield call(
      addCompensation,
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
        type: ADD_COMPENSATION_SUCCESS,
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
        type: ADD_COMPENSATION_ERROR,
        payload: {
          error: {
            data: MessageText,
            type: 'error',
            createdOn: Date.now()
          }
        }
      })
    }
  } catch ({ message }) {
    yield put({
      type: ADD_COMPENSATION_FAILURE,
      payload: {
        error: {
          data: message,
          createdOn: Date.now()
        }
      }
    })
    notification.error({
      message: 'Начисление компенсационного платежа',
      description: message
    })
  }
}

export function * setPaydPostLimitSaga ({ payload }) {
  try {
    const { setPaydPostLimit } = api
    const { data: { Data, IsSuccess, MessageText } } = yield call(setPaydPostLimit, { ...payload, postLimit: payload?.postLimit || 1 })

    if (IsSuccess) {
      yield put({ type: SET_PAYD_POST_LIMIT_SUCCESS,
        payload: {
          isPrivilegue: Data.IsPrivilegue,
          postLimit: Data.PostLimit
        }
      })
    } else {
      yield put({
        type: SET_PAYD_POST_LIMIT_ERROR,
        payload: {
          error: {
            createdOn: Date.now(),
            shouldDisable: true,
            type: 'error',
            data: MessageText
          }
        }
      })
    }
  } catch ({ message }) {
    yield put({
      type: SET_PAYD_POST_LIMIT_FAILURE,
      payload: {
        error: {
          createdOn: Date.now(),
          data: message
        }
      }
    })
    notification.open({
      message: `Проверка лимита пользователя`,
      description: message,
      type: 'error'
    })
  }
}

export function * validatePaydHistorySaga ({ payload }) {
  try {
    const { validatePaydHistory } = api
    const personalAccountState = yield select(getPersonalAccountState)
    const {
      data: { IsSuccess, MessageText }
    } = yield call(
      validatePaydHistory,
      {
        ...payload,
        branchId: personalAccountState?.BillingBranchId,
        subscriberId: personalAccountState?.SubscriberId,
        clientId: personalAccountState?.ClientId
      }
    )
    if (IsSuccess) {
      yield put({
        type: VALIDATE_PAYD_HISTORY_SUCCESS,
        payload: {
          error: {
            data: MessageText,
            type: 'success',
            createdOn: Date.now()
          }
        }
      })
    } else {
      yield put({
        type: VALIDATE_PAYD_HISTORY_ERROR,
        payload: {
          error: {
            data: MessageText,
            shouldDisable: true,
            type: 'warning',
            createdOn: Date.now()
          }
        }
      })
    }
  } catch ({ message }) {
    yield put({
      type: VALIDATE_PAYD_HISTORY_FAILURE,
      payload: {
        error: {
          data: message,
          createdOn: Date.now()
        }
      }
    })
    notification.error({
      message: `Валидация истории платежей`,
      description: message
    })
  }
}

export function * onStartValidatePaydHistorySaga ({ payload }) {
  try {
    const { validatePaydHistory } = api
    const personalAccountState = yield select(getPersonalAccountState)
    const {
      data: { IsSuccess, MessageText }
    } = yield call(
      validatePaydHistory,
      {
        ...payload,
        branchId: personalAccountState?.BillingBranchId,
        subscriberId: personalAccountState?.SubscriberId,
        clientId: personalAccountState?.ClientId
      }
    )
    if (IsSuccess) {
      yield put({
        type: ON_START_VALIDATE_PAYD_HISTORY_SUCCESS,
        payload: {
          error: {
            data: MessageText,
            type: 'success',
            createdOn: Date.now()
          }
        }
      })
    } else {
      yield put({
        type: ON_START_VALIDATE_PAYD_HISTORY_ERROR,
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
      type: ON_START_VALIDATE_PAYD_HISTORY_FAILURE,
      payload: {
        error: {
          data: message,
          createdOn: Date.now()
        }
      }
    })
    notification.error({
      message: `Валидация истории платежей`,
      description: message
    })
  }
}

export function * fetchAvailableBalanceSaga () {
  try {
    const personalAccountState = yield select(getPersonalAccountState)
    const { fetchAvailableBalances } = api
    const {
      data: { data, isSuccess, messageText }
    } = yield call(
      fetchAvailableBalances,
      {
        branchId: personalAccountState?.BillingBranchId,
        clientId: +personalAccountState.SubClientId || +personalAccountState.ClientId,
        subscriberId: personalAccountState?.SubscriberId
      }
    )

    if (isSuccess) {
      yield put({
        type: FETCH_AVAILABLE_BALANCE_SUCCESS,
        payload: {
          data: data.availableBalances
        }
      })
    } else {
      yield put({
        type: FETCH_AVAILABLE_BALANCE_ERROR,
        payload: {
          error: {
            data: messageText,
            createdOn: Date.now()
          }
        }
      })
      notification.error({
        message: `Получение типов баланса`,
        description: messageText
      })
    }
  } catch ({ message }) {
    yield put({
      type: FETCH_AVAILABLE_BALANCE_FAILURE,
      payload: {
        error: {
          data: message,
          createdOn: Date.now()
        }
      }
    })
    notification.error({
      message: `Получение типов баланса`,
      description: message
    })
  }
}

export function * getPaydCommentRelateSaga ({ payload }) {
  try {
    const { getPaydCommentRelate } = api
    const {
      data: { Data, IsSuccess, MessageText }
    } = yield call(getPaydCommentRelate, payload)

    if (IsSuccess) {
      yield put({
        type: GET_PAYD_COMMENT_RELATE_SUCCESS,
        payload: {
          data: Data
        }
      })
    } else {
      yield put({
        type: GET_PAYD_COMMENT_RELATE_ERROR,
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
      type: GET_PAYD_COMMENT_RELATE_FAILURE,
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
