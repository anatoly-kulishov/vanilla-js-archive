import { call, put, select, all } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'
import isHandlingClosed from 'utils/helpers/isHandlingClosed'
import { getPersonalAccountState, getQueryParamsState, getInteractions, getAvailibleOffers } from 'selectors'

import {
  FETCH_OFFERS,
  FETCH_OFFERS_SUCCESS,
  FETCH_OFFERS_ERROR,
  FETCH_OFFERS_FAILURE,
  FETCH_REGISTERED_OFFERS,
  FETCH_REGISTERED_OFFERS_SUCCESS,
  FETCH_REGISTERED_OFFERS_ERROR,
  FETCH_REGISTERED_OFFERS_FAILURE,
  ADD_OFFER_SUCCESS,
  ADD_OFFER_ERROR,
  ADD_OFFER_FAILURE,
  CHANGE_OFFER_SUCCESS,
  CHANGE_OFFER_ERROR,
  CHANGE_OFFER_FAILURE,
  DELETE_OFFER_SUCCESS,
  DELETE_OFFER_ERROR,
  DELETE_OFFER_FAILURE,
  HANDLE_AUTO_CONNECT_OFFER_SUCCESS,
  HANDLE_AUTO_CONNECT_OFFER_ERROR,
  HANDLE_AUTO_CONNECT_OFFER_FAILURE
} from 'reducers/offersReducer'

import { SET_TP_NEW_VISIBLE } from 'reducers/finance/temporaryPayReducer'

const { fetchOffers, fetchRegisteredOffers, addOffer, changeOffer, deleteOffer, modifyAutoConnectOffer } = api

export function * fetchOffersSaga () {
  try {
    const [personalAccountState, queryParamsState, interactions, offers] = yield all([
      select(getPersonalAccountState),
      select(getQueryParamsState),
      select(getInteractions),
      select(getAvailibleOffers)
    ])

    const interactionsForRequest = interactions.map(interaction => ({
      InteractionId: interaction.InteractionNoteId,
      CreatedOn: interaction.CreatedOn,
      ReasonId: interaction.ReasonId,
      CategoryId: interaction.CategoryId,
      IsRTCMContextual: interaction.IsRTCMContextual
    }))

    const offersForRequest = offers?.Offers.map(offer => ({
      Name: offer.Name,
      OfferId: offer.OfferId
    }))

    const { data } = yield call(fetchOffers, {
      msisdn: personalAccountState.Msisdn || queryParamsState.msisdn,
      ivrHistory: queryParamsState.ivrHistory,
      subscriberId: personalAccountState.SubscriberId,
      branchId: personalAccountState.BillingBranchId,
      loyalityCategoryId: personalAccountState?.SubscriberFullInfo?.SubscriberInfo?.LoyalityCategoryId,
      interactions: interactionsForRequest,
      offers: offersForRequest,
      linkedHandlingId: queryParamsState.linkedHandlingId
    })

    if (data.IsSuccess) {
      yield put({ type: FETCH_OFFERS_SUCCESS, payload: { result: data.Data } })
    } else {
      yield put({ type: FETCH_OFFERS_ERROR, payload: { message: data.MessageText } })
    }
  } catch (error) {
    notification.error({
      message: `Ошибка`,
      description: 'Ошибка загрузки предложений',
      type: 'error'
    })
    yield put({ type: FETCH_OFFERS_FAILURE, payload: { message: error.message } })
  }
}

export function * fetchRegisteredOffersSaga () {
  try {
    const [personalAccountState, queryParamsState] = yield all([
      select(getPersonalAccountState),
      select(getQueryParamsState)
    ])
    const { data } = yield call(fetchRegisteredOffers, {
      msisdn: personalAccountState.Msisdn || queryParamsState.msisdn
    })
    if (data.IsSuccess) {
      yield put({ type: FETCH_REGISTERED_OFFERS_SUCCESS, payload: { result: data.Data } })
    } else {
      yield put({ type: FETCH_REGISTERED_OFFERS_ERROR, payload: { message: data.MessageText } })
    }
  } catch (error) {
    yield put({ type: FETCH_REGISTERED_OFFERS_FAILURE, payload: { message: error.message } })
  }
}

export function * addOfferSaga ({ payload }) {
  const { ClientCategory, ClientTypeId, PersonalAccountId } = yield select(getPersonalAccountState)
  const { serviceChannelId, serviceId } = yield select(getQueryParamsState)

  try {
    const { data } = yield call(addOffer, {
      ...payload,
      ClientCategory,
      PersonalAccountNumber: PersonalAccountId,
      ClientType: ClientTypeId,
      serviceChannelId: serviceChannelId,
      ServiceLineId: serviceId
    })

    if (data.IsSuccess) {
      yield put({ type: ADD_OFFER_SUCCESS })
      yield put({ type: FETCH_OFFERS })
      yield put({ type: FETCH_REGISTERED_OFFERS })
    } else {
      yield put({ type: ADD_OFFER_ERROR, payload: { error: data } })
      notification.open({
        message: `Ошибка`,
        description: data.MessageText,
        type: 'error'
      })
    }
  } catch (error) {
    yield put({ type: ADD_OFFER_FAILURE, payload: { error: error.message } })
  }
}

export function * changeOfferSaga ({ payload }) {
  try {
    const { data } = yield call(changeOffer, payload)
    if (data.IsSuccess) {
      yield put({ type: CHANGE_OFFER_SUCCESS })
      yield put({ type: FETCH_OFFERS })
      yield put({ type: FETCH_REGISTERED_OFFERS })

      const { ResponseTypeId, Sms } = payload

      if (ResponseTypeId === undefined) {
        if (Sms) {
          notification.open({
            message: `Изменение отправки сообщения `,
            description: 'Будет отправлено SMS',
            type: 'info'
          })
        } else {
          notification.open({
            message: `Изменение отправки сообщения `,
            description: 'SMS не будет отправлено',
            type: 'info'
          })
        }
      }
    } else {
      yield put({ type: CHANGE_OFFER_ERROR, payload: { error: data } })
      isHandlingClosed(data.MessageText) &&
        notification.open({
          message: `Ошибка`,
          description: data.MessageText,
          type: 'error'
        })
    }
  } catch (error) {
    yield put({ type: CHANGE_OFFER_FAILURE, payload: { error: error.message } })
  }
}

export function * deleteOfferSaga ({ payload }) {
  try {
    const { data } = yield call(deleteOffer, payload)
    if (data.IsSuccess) {
      yield put({ type: DELETE_OFFER_SUCCESS })
      yield put({ type: FETCH_OFFERS })
      yield put({ type: FETCH_REGISTERED_OFFERS })
    } else {
      yield put({ type: DELETE_OFFER_ERROR, payload: { error: data } })
      isHandlingClosed(data.MessageText) &&
        notification.open({
          message: `Ошибка`,
          description: data.MessageText,
          type: 'error'
        })
    }
  } catch (error) {
    yield put({ type: DELETE_OFFER_FAILURE, payload: { error: error.message } })
  }
}

export function * handleAutoConnectOfferSaga ({ payload }) {
  try {
    const { data } = yield call(modifyAutoConnectOffer, payload)
    if (data.IsSuccess) {
      yield put({ type: HANDLE_AUTO_CONNECT_OFFER_SUCCESS })
      yield put({ type: FETCH_OFFERS })
      yield put({ type: FETCH_REGISTERED_OFFERS })
      notification.success({
        message: `Успешно выполнено`,
        description: 'Автоподключение прошло успешно. Изменить отклик или удалить предложение невозможно'
      })

      if (!data.Data.IsAutoInteractionSuccess) {
        notification.open({
          message: `Ошибка`,
          description: 'Автоматическая регистрация причины обращения невозможна. Обратитесь к администратору',
          type: 'error'
        })
      }
    } else {
      yield put({ type: HANDLE_AUTO_CONNECT_OFFER_ERROR, payload: { error: data } })
      const personalAccount = yield select(getPersonalAccountState)
      if (data.ErrorCode === 103 && personalAccount.ClientCategory === 'B2C') {
        yield put({ type: SET_TP_NEW_VISIBLE })
      }
      notification.open({
        message: `Ошибка`,
        description: data.MessageText,
        type: 'error'
      })
    }
  } catch (error) {
    yield put({ type: HANDLE_AUTO_CONNECT_OFFER_FAILURE, payload: { error: error.message } })
    notification.open({
      message: `Ошибка`,
      description: error.message,
      type: 'error'
    })
  }
}
