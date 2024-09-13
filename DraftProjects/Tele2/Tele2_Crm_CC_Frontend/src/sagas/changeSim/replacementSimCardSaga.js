import { call, put, select, all, take, race } from 'redux-saga/effects'

import {
  HANDLE_VISIBLE_REPLACEMENT_SIM_CARD_MODAL,
  HANDLE_VISIBLE_DUPLICATE_SEARCH_MODAL,

  SEND_SMS_REPLACEMENT_SIM_SUCCESS,
  SEND_SMS_REPLACEMENT_SIM_ERROR,
  SEND_SMS_REPLACEMENT_SIM_FAILURE,

  VALIDATE_SIM_PROFILE_SUCCESS,
  VALIDATE_SIM_PROFILE_ERROR,
  VALIDATE_SIM_PROFILE_FAILURE,

  CHANGE_SIM_SUCCESS,
  CHANGE_SIM_ERROR,
  CHANGE_SIM_FAILURE,

  GET_HISTORY_CHANGE_SIM_SUCCESS,
  GET_HISTORY_CHANGE_SIM_ERROR,
  GET_HISTORY_CHANGE_SIM_FAILURE,

  GET_REASONS_CHANGE_SIM_SUCCESS,
  GET_REASONS_CHANGE_SIM_ERROR,
  GET_REASONS_CHANGE_SIM_FAILURE
} from 'reducers/changeSim/replacementSimCardReducer'

import { getPersonalAccountState, getChangeSimState, getQueryParamsState } from 'selectors'

import api from 'utils/api'

import { notification } from 'antd'
import { FETCH_HANDLING_STATUS, FETCH_HANDLING_STATUS_SUCCESS, FETCH_HANDLING_STATUS_ERROR, FETCH_HANDLING_STATUS_FAILURE } from 'reducers/internal/handlingReducer'

const { sendSms, validateSimProfile, changeSim, getHistoryChangeSim, getReasonsChangeSim } = api

const message = 'Замена SIM'

export function * sendSmsReplacementSimSaga ({ payload }) {
  try {
    const { data } = yield call(sendSms, payload)

    const { IsSuccess } = data
    if (IsSuccess) {
      yield put({ type: SEND_SMS_REPLACEMENT_SIM_SUCCESS, payload: data })
      notification.success({
        message: message,
        description: 'SMS успешно отправлено'
      })
    } else {
      yield put({ type: SEND_SMS_REPLACEMENT_SIM_ERROR, payload: data })
      notification.error({
        message: message,
        description: data?.MessageText
      })
    }
  } catch ({ exception }) {
    yield put({ type: SEND_SMS_REPLACEMENT_SIM_FAILURE, message: exception })
    notification.error({
      message: message,
      description: 'Ошибка отправки SMS'
    })
  }
}

export function * validateSimProfileSaga ({ payload }) {
  const { dataRequest } = payload
  try {
    const { data } = yield call(validateSimProfile, dataRequest)
    if (data.IsSuccess) {
      yield put({ type: VALIDATE_SIM_PROFILE_SUCCESS, payload: data })
      yield put({ type: HANDLE_VISIBLE_REPLACEMENT_SIM_CARD_MODAL })
      yield put({ type: HANDLE_VISIBLE_DUPLICATE_SEARCH_MODAL })
    } else {
      yield put({ type: VALIDATE_SIM_PROFILE_ERROR, payload: data })
      notification.error({
        message: message,
        description: data.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: VALIDATE_SIM_PROFILE_FAILURE, message: exception.message })
  }
}

export function * changeSimSaga ({ payload }) {
  try {
    yield put({ type: FETCH_HANDLING_STATUS })

    const { handlingStatusSuccess } = yield race({
      handlingStatusSuccess: take(FETCH_HANDLING_STATUS_SUCCESS),
      handlingStatusSuccessError: take(FETCH_HANDLING_STATUS_ERROR),
      handlingStatusSuccessFailure: take(FETCH_HANDLING_STATUS_FAILURE)
    })

    const isHandlingStatusOpened = handlingStatusSuccess?.payload ?? false

    if (isHandlingStatusOpened) {
      const [personalAccountState, changeSimState, queryParamsState] = yield all([
        select(getPersonalAccountState),
        select(getChangeSimState),
        select(getQueryParamsState)
      ])

      const changeSimPayload = {
        msisdn: personalAccountState?.Msisdn,
        branchId: personalAccountState?.BillingBranchId,
        subscriberId: personalAccountState?.SubscriberId,
        newIcc: payload.newIcc,
        icc: personalAccountState?.SubscriberFullInfo?.USIProfile?.Iccid,
        salesPointId: changeSimState?.dataForm?.SalesPointId,
        linkedHandlingTechId: queryParamsState?.linkedHandlingTechId,
        linkedMsisdn: queryParamsState?.linkedMsisdn,
        linkedHandlingId: queryParamsState?.linkedHandlingId,
        operationId: changeSimState?.dataForm?.OperationId,
        reasonName: changeSimState?.dataForm?.ReasonName
      }

      const { data } = yield call(changeSim, changeSimPayload)

      const { IsSuccess } = data
      if (IsSuccess) {
        const {
          Data: { IsInteractionSuccess, Message }
        } = data
        yield all([
          put({ type: CHANGE_SIM_SUCCESS }),
          put({ type: HANDLE_VISIBLE_DUPLICATE_SEARCH_MODAL })
        ])
        notification.success({
          message: message,
          description: 'Замена SIM успешно завершена'
        })
        if (!IsInteractionSuccess) {
          notification.warning({
            message: message,
            description: Message
          })
        }
      } else {
        yield put({ type: CHANGE_SIM_ERROR, payload: data })
        notification.error({
          message: message,
          description: data?.MessageText
        })
      }
    } else {
      yield put({ type: CHANGE_SIM_ERROR, payload: { MessageText: 'Ошибка Замены SIM' } })
      notification.error({
        message: 'Ошибка замены SIM'
      })
    }
  } catch (exception) {
    yield put({ type: CHANGE_SIM_FAILURE, message: exception.message })
    notification.error({
      message: message,
      description: exception.message
    })
  }
}

export function * getHistoryChangeSimSaga ({ payload }) {
  try {
    const { data } = yield call(getHistoryChangeSim, payload)

    const { IsSuccess } = data
    if (IsSuccess) {
      yield put({ type: GET_HISTORY_CHANGE_SIM_SUCCESS, payload: data })
    } else {
      yield put({ type: GET_HISTORY_CHANGE_SIM_ERROR })
      notification.error({
        message: message,
        description: data?.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: GET_HISTORY_CHANGE_SIM_FAILURE })
    notification.error({
      message: message,
      description: 'Ошибка получения истории замены SIM'
    })
  }
}

export function * getReasonsChangeSimSaga ({ payload }) {
  try {
    const { data } = yield call(getReasonsChangeSim, payload)

    const { Data, IsSuccess } = data
    if (IsSuccess) {
      yield put({ type: GET_REASONS_CHANGE_SIM_SUCCESS, payload: Data })
    } else {
      yield put({ type: GET_REASONS_CHANGE_SIM_ERROR })
      notification.error({
        message: 'Получение списка причин замены SIM',
        description: data?.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: GET_REASONS_CHANGE_SIM_FAILURE })
    notification.error({
      message: 'Получение списка причин замены SIM',
      description: 'Ошибка получения списка причин замены SIM'
    })
  }
}
