import { call, put, select } from 'redux-saga/effects'
import { isNil } from 'lodash'
import uuid from 'uuid'
import passHandlingTechId from 'utils/helpers/passHandlingTechIdToUrl'
import { getCardMode } from 'utils/helpers/getCardMode'

import history from 'utils/createdHistory'

import {
  PERSONAL_ACCOUNT_FETCH_SUCCESS,
  PERSONAL_ACCOUNT_FETCH_ERROR,
  PERSONAL_ACCOUNT_FETCH_FAILURE,
  PERSONAL_ACCOUNT_FIELDS_CHANGE,
  PERSONAL_ACCOUNT_EMAIL_CHANGE,
  PERSONAL_ACCOUNT_PERSONAL_EMAIL_COPY
} from 'reducers/personalInfo/personalInfoReducer'

import { FETCH_WHO_IS_IT } from 'reducers/personalInfo/numberOperatorBelongingReducer'

import { ADD_NOTIFICATION, REMOVE_ALL_NOTIFICATION } from 'reducers/internal/notifications'
import { PASS_HANDLING_TECH_ID } from 'reducers/internal/parameters'
import { FETCH_MARKERS, GET_MARKER_TARIFF_HOLD } from 'reducers/mnp/mnpMarkersReducer'
import { FETCH_PSYCHOTYPE } from 'reducers/personalInfo/psychotypeReducer'
import { GET_RTK_SEGMENT } from 'reducers/personalInfo/markersReducer'

import { NONE, GLOBAL } from 'constants/redirectTypes'
import { clientCategories } from 'constants/personalAccountStrings'

import { getQueryParamsState, getUserState } from 'selectors'

import api from 'utils/api'
import { routeMatch, checkRight } from 'utils/helpers'
import { SET_CARD_MODE } from 'reducers/internal/cardModesReducer'
import { GET_CHARGE_COUNTER } from 'reducers/charge/chargeReducer'
import { cardModes } from '../../constants/cardModes'

import { selectIsWebSeller } from 'webseller/common/user/selectors'

// Personal account fetching
export function * fetchPersonalInfoSaga ({ payload: { msisdn, email, interactionType, clientId, branchId } }) {
  const { fetchPersonalInfo } = api
  const queryParams = yield select(getQueryParamsState)
  const isWebSeller = yield select(selectIsWebSeller)

  const { handlingTechId, email: queryEmail, interactionId, dialogNickname, orderId } = queryParams

  const message = 'Анонимная карточка'
  const description = 'Этот абонент не принадлежит Tele2'

  // Check HandlingTechId from URL
  let handlingTechIdToRequest = handlingTechId
  // Check InteractionId from URL and set it as HandlingTechId
  if (interactionId) {
    handlingTechIdToRequest = interactionId
  }
  // If HandlingTechId and InteractionId isn't in URL generate new one
  if (isNil(handlingTechIdToRequest)) {
    handlingTechIdToRequest = uuid.v4()
  }
  // If handlingTechId isn't in URL pass generated in state in URL
  if (isNil(handlingTechId)) {
    passHandlingTechId(handlingTechIdToRequest, false)
    yield put({ type: PASS_HANDLING_TECH_ID, payload: handlingTechIdToRequest })
  }

  try {
    yield put({ type: REMOVE_ALL_NOTIFICATION })
    const { data } = yield call(fetchPersonalInfo, {
      msisdn: msisdn,
      interactionTypeId: interactionType,
      handlingTechId: handlingTechIdToRequest,
      clientId,
      branchId
    })

    if (data.IsSuccess) {
      yield put({ type: PERSONAL_ACCOUNT_FETCH_SUCCESS, payload: data })
      const cardMode = getCardMode(
        data.Data?.BaseFunctionalParams?.ClientCategory,
        data.Data?.Msisdn,
        data.Data?.BaseFunctionalParams?.AppMode
      )
      yield put({
        type: SET_CARD_MODE,
        payload: cardMode
      })
      yield put({
        type: GET_CHARGE_COUNTER,
        payload: { branchId: data.Data?.BillingBranchId, subsId: data.Data?.SubscriberId }
      })

      if (cardMode === cardModes.leon) {
        yield put({ type: FETCH_WHO_IS_IT, payload: { msisdn } })
      }

      if (queryEmail) {
        yield put({ type: PERSONAL_ACCOUNT_PERSONAL_EMAIL_COPY })
        yield put({ type: PERSONAL_ACCOUNT_EMAIL_CHANGE, payload: { Email: queryEmail } })
      }

      if (data.Data?.BaseFunctionalParams?.AppMode === 'anonymous') {
        yield put({
          type: PERSONAL_ACCOUNT_FIELDS_CHANGE,
          payload: { Msisdn: msisdn, BillingBranchId: null, Email: email }
        })
        yield put({
          type: ADD_NOTIFICATION,
          payload: {
            message: message,
            description: description,
            type: 'warning',
            redirectType: NONE
          }
        })
        const checkDialogNickname = !msisdn && !email && dialogNickname ? 'history/applications' : 'history/appeals'
        const url = yield call(routeMatch, location.pathname, `${checkDialogNickname}`)

        if (!orderId) {
          yield call(
            history.push,
            email && !queryParams.email ? `${url}${location.search}&email=${email}` : `${url}${location.search}`
          )
        }
      }

      const { ClientCategory, Msisdn, ClientId, BillingBranchId, SubscriberStatus } = data.Data

      if (ClientCategory.toUpperCase() !== clientCategories.anonimous) {
        yield put({ type: GET_RTK_SEGMENT, payload: { clientId: ClientId, branchId: BillingBranchId } })
        let markersPayload
        if (Msisdn) {
          markersPayload = { Msisdn, SubscriberStatus }
        } else {
          markersPayload = { clientId: ClientId, branchId: BillingBranchId }
        }
        if (cardMode === cardModes.leon) {
          markersPayload.isMixxCustomer = true
        }
        // Маркеры для WebSeller вызываются своим action и ТОЛЬКО после createHandling
        if (!isWebSeller) {
          yield put({
            type: FETCH_MARKERS,
            payload: markersPayload
          })
        }

        const user = yield select(getUserState)
        const isTargetTariffHoldMarkerRead = checkRight(user, 'CC:TargetTariffHoldMarkerRead')

        if (isTargetTariffHoldMarkerRead) {
          yield put({ type: GET_MARKER_TARIFF_HOLD })
        }
        if (ClientCategory.toUpperCase() !== clientCategories.B2B) {
          yield put({
            type: FETCH_PSYCHOTYPE,
            payload: { msisdn: Msisdn }
          })
        }
      } else {
        // TODO: добавлено в рамках 212641. Не забыть удалить в рамках 212658
        yield put({
          type: ADD_NOTIFICATION,
          payload: {
            message: null,
            description: 'Оформи заказ в интернет-магазине',
            pathName: 'https://tele2.ru/shop/number?pageParams=type%3Dchoose%26price%3D0',
            type: 'info',
            redirectType: GLOBAL
          }
        })
      }
    } else {
      yield put({ type: PERSONAL_ACCOUNT_FETCH_ERROR, payload: data })
      yield put({
        type: PERSONAL_ACCOUNT_FIELDS_CHANGE,
        payload: { Msisdn: msisdn, BillingBranchId: null, Email: email }
      })

      yield put({
        type: ADD_NOTIFICATION,
        payload: {
          message: message,
          description: description,
          type: 'warning',
          redirectType: NONE
        }
      })

      const url = yield call(routeMatch, location.pathname, 'history/appeals')
      yield call(
        history.push,
        email && !queryParams.email ? `${url}${location.search}&email=${email}` : `${url}${location.search}`
      )
    }
  } catch (exception) {
    yield put({ type: PERSONAL_ACCOUNT_FETCH_FAILURE, message: exception.message })
    yield put({
      type: ADD_NOTIFICATION,
      payload: {
        message: message,
        description: description,
        type: 'warning'
      }
    })

    const url = yield call(routeMatch, location.pathname, 'history/appeals')
    yield call(
      history.push,
      email && !queryParams.email ? `${url}${location.search}&email=${email}` : `${url}${location.search}`
    )
  } finally {
    // TODO: добавлено в рамках 212641. Не забыть удалить в рамках 212658
    if (queryParams?.ivrHistory === 'CM распродажи') {
      yield put({
        type: ADD_NOTIFICATION,
        payload: {
          message: null,
          description: 'Предложи тариф со скидкой из окна CM',
          type: 'info',
          redirectType: NONE
        }
      })
    }
    // TODO: добавлено в рамках 212641. Не забыть удалить в рамках 212658
    if (queryParams?.ivrHistory === 'Заказ новой SIM карты') {
      yield put({
        type: ADD_NOTIFICATION,
        payload: {
          message: null,
          description: 'Оформи заказ в интернет-магазине',
          type: 'info',
          pathName: 'https://tele2.ru/shop/number?pageParams=type%3Dchoose%26price%3D0',
          redirectType: GLOBAL
        }
      })
    }
    // TODO: добавлено в рамках 233152. Не забыть удалить в рамках 212658
    if (queryParams?.ivrHistory === 'IVR_CM_Ошибка_подключения_ТП') {
      yield put({
        type: ADD_NOTIFICATION,
        payload: {
          message: null,
          description: 'Ошибка подключения оффера CM на IVR. Подключи нужный абоненту оффер через CM.',
          type: 'info',
          redirectType: NONE
        }
      })
    }
    // TODO: добавлено в рамках 254161. Надо ли удалять в рамках 212658?
    if (queryParams?.ivrHistory === 'Склонный к оттоку') {
      yield put({
        type: ADD_NOTIFICATION,
        payload: {
          message: null,
          description: 'Склонный к оттоку \nПроконсультируй согласно стандарту: «Развитие клиентов склонных к оттоку»',
          type: 'info',
          pathName:
            'https://kms.tele2.ru/kms/CM/INTERNAL/LAYOUT?item_id=305836&homePage=/CM/SCENARIO/VIEW?item_id%3D1205696&homePageEncoded=true',
          redirectType: GLOBAL
        }
      })
    }
  }
}
