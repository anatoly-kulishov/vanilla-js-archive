import { call, put, select } from 'redux-saga/effects'
import { notification } from 'antd'
import * as moment from 'moment'

import {
  GET_CHARGE_SERVICE_LIST_FETCH_SUCCESS,
  GET_CHARGE_SERVICE_LIST_FETCH_ERROR,
  GET_CHARGE_SERVICE_LIST_FETCH_FAILURE,
  GET_AVAILABLE_SERVICES_FETCH_SUCCESS,
  GET_AVAILABLE_SERVICES_FETCH_ERROR,
  GET_AVAILABLE_SERVICES_FETCH_FAILURE,
  CHANGE_SERVICE_STATUS_FETCH_SUCCESS,
  CHANGE_SERVICE_STATUS_FETCH_ERROR,
  CHANGE_SERVICE_STATUS_FETCH_FAILURE,
  GET_CONNECTED_SERVICES_FETCH_SUCCESS,
  GET_CONNECTED_SERVICES_FETCH_ERROR,
  GET_CONNECTED_SERVICES_FETCH_FAILURE,
  FETCH_SERVICES_PENDING_ORDERS,
  FETCH_SERVICES_PENDING_ORDERS_SUCCESS,
  FETCH_SERVICES_PENDING_ORDERS_ERROR,
  FETCH_SERVICES_PENDING_ORDERS_FAILURE,
  DELETE_SERVICES_PENDING_ORDERS_SUCCESS,
  DELETE_SERVICES_PENDING_ORDERS_ERROR,
  DELETE_SERVICES_PENDING_ORDERS_FAILURE,

  RESEND_SERVICE_ORDER_SUCCESS,
  RESEND_SERVICE_ORDER_ERROR,
  RESEND_SERVICE_ORDER_FAILURE,

  FETCH_MULTISUBSCRIPTION_SERVICE_SUCCESS,
  FETCH_MULTISUBSCRIPTION_SERVICE_ERROR,
  FETCH_MULTISUBSCRIPTION_SERVICE_FAILURE,

  FETCH_CLIENT_OFFERING_PROFILE_SUCCESS,
  FETCH_CLIENT_OFFERING_PROFILE_ERROR,
  FETCH_CLIENT_OFFERING_PROFILE_FAILURE,
  changeMultisubscriptionServiceWebSellerSuccess,
  changeMultisubscriptionServiceWebSellerError
} from 'reducers/services/serviceReducer'

import { FETCH_INTERACTIONS } from 'reducers/reasonsRegisteringReducer'

import { getPersonalAccountState } from 'selectors'

import api from 'utils/api'

const {
  fetchServices,
  fetchServicesPendingOrders,
  deleteServicesPendingOrders,
  fetchChangeServiceStatus,
  resendServiceOrder,
  fetchChargeServiceList,
  getMultisubscriptionService,
  fetchClientProductOfferingProfile,
  сhangeMultisubscriptionService
} = api

export function * changeMultisubscriptionServiceSagaWebSeller ({ payload }) {
  const { isOnDateChanging, changingData } = payload || {}
  const ERROR_MESSAGE_DEFAULT = 'Ошибка при отключении услуги'

  try {
    const requestBody = {
      ...changingData,
      operation: 1,
      chPeriodEndDate: isOnDateChanging ? changingData.chPeriodEndDate : moment().format(),
      disableNow: !isOnDateChanging
    }

    const { data } = yield call(сhangeMultisubscriptionService, requestBody)
    if (data.IsSuccess) {
      notification.success({
        message: isOnDateChanging ? 'Услуга будет отключена на дату следующего АП' : 'Услуга успешно отключена'
      })
      yield put(changeMultisubscriptionServiceWebSellerSuccess())
      return
    }

    notification.error({
      message: data.MessageText || ERROR_MESSAGE_DEFAULT
    })
    yield put(changeMultisubscriptionServiceWebSellerError())
  } catch {
    notification.error({
      message: ERROR_MESSAGE_DEFAULT
    })
    yield put(changeMultisubscriptionServiceWebSellerError())
  }
}

export function * сhangeMultisubscriptionServiceSaga ({ payload }) {
  try {
    const { data } = yield call(сhangeMultisubscriptionService, payload)
    if (data.IsSuccess) {
      notification.open({
        message: `Отправка заявки`,
        description: 'Запрос на изменение статуса услуги принят',
        type: 'success',
        duration: 6
      })
      yield put(changeMultisubscriptionServiceWebSellerSuccess())
    } else {
      notification.open({
        message: `Ошибка`,
        description: data.MessageText,
        type: 'error',
        duration: 6
      })
      yield put(changeMultisubscriptionServiceWebSellerError())
    }
  } catch (exception) {
    notification.open({
      message: `Ошибка`,
      description: exception.message,
      type: 'error'
    })
    yield put(changeMultisubscriptionServiceWebSellerError())
  }
}

export function * fetchClientProductOfferingProfileServiceSaga ({ payload: { msisdn, ServiceId } }) {
  try {
    const { data } = yield call(fetchClientProductOfferingProfile, { msisdn, ServiceId })
    if (data.IsSuccess) {
      const { Data } = data
      yield put({ type: FETCH_CLIENT_OFFERING_PROFILE_SUCCESS, payload: Data })
    } else {
      yield put({ type: FETCH_CLIENT_OFFERING_PROFILE_ERROR })
    }
  } catch (exception) {
    yield put({ type: FETCH_CLIENT_OFFERING_PROFILE_FAILURE, message: exception.message })
    notification.open({
      message: `Ошибка`,
      description: exception.message,
      type: 'error'
    })
  }
}

export function * fetchMultisubscriptionServiceSaga ({ payload: { msisdn, ismixxcustomer } }) {
  try {
    const { data } = yield call(getMultisubscriptionService, { msisdn, ismixxcustomer })
    if (data.IsSuccess) {
      const { Data } = data
      yield put({ type: FETCH_MULTISUBSCRIPTION_SERVICE_SUCCESS, payload: Data })
    } else {
      yield put({ type: FETCH_MULTISUBSCRIPTION_SERVICE_ERROR, payload: data })
      notification.open({
        message: `Ошибка`,
        description: data.MessageText,
        type: 'error',
        duration: 6
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_MULTISUBSCRIPTION_SERVICE_FAILURE, message: exception.message })
    notification.open({
      message: `Ошибка`,
      description: exception.message,
      type: 'error'
    })
  }
}

export function * fetchAvailableServicesSaga ({ payload: { msisdn } }) {
  try {
    const { data } = yield call(fetchServices, { msisdn: msisdn, ServiceType: '1' })
    if (data.IsSuccess) {
      const { Data: { MultisubscriptionService, Services } } = data
      yield put({ type: GET_AVAILABLE_SERVICES_FETCH_SUCCESS, payload: [...MultisubscriptionService, ...Services] })
    } else {
      yield put({ type: GET_AVAILABLE_SERVICES_FETCH_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: GET_AVAILABLE_SERVICES_FETCH_FAILURE, message: exception.message })
  }
}

export function * fetchChargeServiceListSaga ({ payload }) {
  try {
    const { data } = yield call(fetchChargeServiceList, payload)
    if (data.IsSuccess) {
      const { Data: { ChargeServices } } = data
      const chargeServiceList = ChargeServices
      yield put({ type: GET_CHARGE_SERVICE_LIST_FETCH_SUCCESS, payload: chargeServiceList })
    } else {
      yield put({ type: GET_CHARGE_SERVICE_LIST_FETCH_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: GET_CHARGE_SERVICE_LIST_FETCH_FAILURE, message: exception.message })
  }
}

export function * fetchServicesPendingOrdersSaga ({ payload }) {
  try {
    const { data } = yield call(fetchServicesPendingOrders, payload)

    if (data.IsSuccess) {
      yield put({ type: FETCH_SERVICES_PENDING_ORDERS_SUCCESS, payload: data.Data.Results })
    } else {
      yield put({ type: FETCH_SERVICES_PENDING_ORDERS_ERROR, payload: data })
      notification.open({
        message: `Ошибка`,
        description: data.MessageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_SERVICES_PENDING_ORDERS_FAILURE, message: exception.message })
  }
}

export function * deleteServicesPendingOrdersSaga ({ payload }) {
  try {
    const { data } = yield call(deleteServicesPendingOrders, payload)

    if (data.IsSuccess) {
      const personalAccount = yield select(getPersonalAccountState)

      yield put({ type: DELETE_SERVICES_PENDING_ORDERS_SUCCESS, payload: data })
      notification.open({
        message: `Удаление`,
        description: 'Удаление заказа прошло успешно',
        type: 'info'
      })
      yield put({
        type: FETCH_SERVICES_PENDING_ORDERS,
        payload: { msisdn: personalAccount.Msisdn, branchId: payload.branchId }
      })
    } else {
      yield put({ type: DELETE_SERVICES_PENDING_ORDERS_ERROR, payload: data })
      notification.open({
        message: `Ошибка`,
        description: data.MessageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: DELETE_SERVICES_PENDING_ORDERS_FAILURE, message: exception.message })
  }
}

export function * fetchChangeServiceStatusSaga ({ payload }) {
  try {
    const { data } = yield call(fetchChangeServiceStatus, payload)
    if (data.IsSuccess) {
      yield put({ type: CHANGE_SERVICE_STATUS_FETCH_SUCCESS, payload: data })
      yield put({
        type: FETCH_INTERACTIONS,
        payload: {
          handlingId: payload.handlingId,
          msisdn: payload.msisdn,
          email: payload.email,
          includeRepeatingEntries: true
        }
      })
      notification.open({
        message: `Изменение статуса услуги `,
        description: data.Data.ResultMessage,
        type: 'info'
      })
    } else {
      yield put({ type: CHANGE_SERVICE_STATUS_FETCH_ERROR, payload: data })
      notification.open({
        message: `Изменение статуса услуги `,
        description: data.MessageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: CHANGE_SERVICE_STATUS_FETCH_FAILURE, message: exception.message })
  }
}

export function * fetchConnectedServicesSaga ({ payload: { msisdn } }) {
  try {
    const {
      data: {
        Data: { MessageText, Services, VirtualNumbers, IsActiveVirtualNumber, MultisubscriptionService },
        IsSuccess
      }
    } = yield call(fetchServices, { msisdn: msisdn, ServiceType: '2' })
    if (IsSuccess) {
      yield put({ type: GET_CONNECTED_SERVICES_FETCH_SUCCESS, payload: { Services, VirtualNumbers, IsActiveVirtualNumber, MultisubscriptionService } })
    } else {
      yield put({ type: GET_CONNECTED_SERVICES_FETCH_ERROR, payload: MessageText })
    }
  } catch (exception) {
    yield put({ type: GET_CONNECTED_SERVICES_FETCH_FAILURE, message: exception.message })
  }
}

export function * resendServiceOrderSaga ({ payload }) {
  try {
    const { data } = yield call(resendServiceOrder, payload)

    if (data.IsSuccess) {
      const { Data: { IsAutoInteractionCreated, AutoInteractionMessage } } = data
      const { branchId, msisdn } = payload

      yield put({ type: RESEND_SERVICE_ORDER_SUCCESS })

      notification.open({
        message: `Повторная отправка заявки`,
        description: 'Запрос отправлен успешно',
        type: 'success'
      })

      if (!IsAutoInteractionCreated) {
        notification.open({
          message: 'Неудачная попытка создания автозаметки',
          description: AutoInteractionMessage,
          type: 'error'
        })
      }

      yield put({ type: FETCH_SERVICES_PENDING_ORDERS, payload: { msisdn, branchId } })
    } else {
      yield put({ type: RESEND_SERVICE_ORDER_ERROR, message: data.MessageText })
      notification.open({
        message: `Повторная отправка заявки`,
        description: data.MessageText,
        type: 'error'
      })
    }
  } catch (exception) {
    yield put({ type: RESEND_SERVICE_ORDER_FAILURE, message: exception.message })
    notification.open({
      message: `Повторная отправка заявки`,
      description: exception.message,
      type: 'error'
    })
  }
}
