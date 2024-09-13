import { call, put, all, select } from 'redux-saga/effects'
import { notification } from 'antd'
import moment from 'moment'

import api from 'utils/api'
import { ADD_NOTIFICATION } from 'reducers/internal/notifications'
import { NONE, GLOBAL } from 'constants/redirectTypes'

import {
  FETCH_MARKERS_SUCCESS,
  FETCH_MARKERS_ERROR,
  FETCH_MARKERS_FAILURE,
  GET_MARKER_MNP_SUCCESS,
  GET_MARKER_MNP_ERROR,
  GET_MARKER_MNP_FAILURE,
  GET_MARKER_TARIFF_HOLD_SUCCESS,
  GET_MARKER_TARIFF_HOLD_ERROR,
  GET_MARKER_TARIFF_HOLD_FAILURE
} from 'reducers/mnp/mnpMarkersReducer'
import { SET_MNP_INFO } from 'reducers/mnp/mnpReducer'

import { getQueryParamsState, getPersonalAccountState } from 'selectors'

export function * fetchMarkersSaga ({ payload }) {
  const { fetchMarkers } = api
  const errorMessage = 'Ошибка получения информации по маркерам абонента'

  const queryParams = yield select(getQueryParamsState)
  const { ivrHistory } = queryParams

  try {
    const {
      data: { IsSuccess, MessageText, Data }
    } = yield call(fetchMarkers, { IvrNodeName: ivrHistory, ...payload })

    if (IsSuccess) {
      yield put({ type: FETCH_MARKERS_SUCCESS, payload: Data })
      if (MessageText) {
        yield put({
          type: ADD_NOTIFICATION,
          payload: {
            description: MessageText,
            type: 'info',
            redirectType: NONE
          }
        })
      }
      const DiagnosticParams = Data?.DiagnosticParams
      if (Array.isArray(DiagnosticParams)) {
        yield all(
          DiagnosticParams.filter(item => !item.Type?.toLowerCase().startsWith('birthday')).map(param =>
            param.Url
              ? put({
                type: ADD_NOTIFICATION,
                payload: {
                  message: null,
                  description: param.Value,
                  pathName: param.Url,
                  type: param.ColorType?.toLowerCase() ?? 'info',
                  redirectType: GLOBAL
                }
              })
              : put({
                type: ADD_NOTIFICATION,
                payload: {
                  message: null,
                  description: param.Value,
                  type: 'info',
                  redirectType: NONE
                }
              })
          )
        )
      }
      if (Array.isArray(Data?.MnpParams)) {
        yield all(
          Data?.MnpParams.map(param =>
            put({
              type: ADD_NOTIFICATION,
              payload: {
                message: param.Title,
                description: param.Message,
                type: param.ColorType?.toLowerCase() ?? 'info',
                redirectType: NONE
              }
            })
          )
        )
      }
    } else {
      yield put({ type: FETCH_MARKERS_ERROR, payload: MessageText })
      notification.error({
        message: errorMessage,
        description: MessageText
      })
    }
  } catch ({ message }) {
    yield put({ type: FETCH_MARKERS_FAILURE, payload: message })
    notification.error({
      message: errorMessage,
      description: message
    })
  }
}

export function * getMarkerMnpSaga () {
  const { getMarkerMnp } = api
  const personalAccount = yield select(getPersonalAccountState)

  try {
    const { Msisdn: msisdn } = personalAccount
    const { data, status } = yield call(getMarkerMnp, { msisdn })
    const isMarkerSetted = yield select(state => state.mnp.mnpState.markerData.isSetted)

    switch (status) {
      case 200:
        yield put({ type: GET_MARKER_MNP_SUCCESS, payload: data.Data })
        if (!isMarkerSetted) {
          const markerData = data.Data?.reduce((actions, marker) => {
            const {
              DonorOperatorName: donorOperatorName,
              RecipientOperatorName: recipientOperatorName,
              PortingDate,
              TransferStatus: transferStatus,
              Title: title,
              Message: message,
              ColorType: colorType
            } = marker
            const portingDate = moment(PortingDate).format('HH:mm DD.MM.YYYY')

            actions.push(
              put({
                type: SET_MNP_INFO,
                payload: {
                  abonentData: {
                    donorOperatorName,
                    recipientOperatorName,
                    portingDate,
                    transferStatus
                  },
                  markerData: {
                    isSetted: true,
                    title,
                    message,
                    colorType
                  }
                }
              }),
              put({
                type: ADD_NOTIFICATION,
                payload: {
                  message: title,
                  description: message,
                  type: colorType.toLowerCase(),
                  redirectType: NONE
                }
              })
            )
            return actions
          }, [])

          yield all(markerData)
        }
        break
      default:
        yield put({ type: GET_MARKER_MNP_ERROR, payload: data.MessageText })
    }
  } catch ({ message }) {
    yield put({ type: GET_MARKER_MNP_FAILURE, payload: message })
  }
}

export function * getMarkerTariffHoldSaga () {
  const { getMarkerTariffHold } = api
  const personalAccount = yield select(getPersonalAccountState)
  const errorMessage = 'Ошибка получения информации по маркерам абонента'
  try {
    const { Msisdn, ClientTypeId, BillingBranchId } = personalAccount
    const {
      data: { MessageText, Data, IsSuccess }
    } = yield call(getMarkerTariffHold, { Msisdn, SubscriberBranchId: BillingBranchId, ClientTypeId })

    if (IsSuccess) {
      yield put({ type: GET_MARKER_TARIFF_HOLD_SUCCESS, payload: Data })
      Data?.Url
        ? yield put({
          type: ADD_NOTIFICATION,
          payload: {
            message: null,
            description: Data.Value,
            pathName: Data.Url,
            type: Data.ColorType?.toLowerCase() ?? 'info',
            redirectType: GLOBAL
          }
        })
        : yield put({
          type: ADD_NOTIFICATION,
          payload: {
            message: null,
            description: Data.Value,
            type: Data.ColorType?.toLowerCase() ?? 'info',
            redirectType: NONE
          }
        })
    } else {
      yield put({ type: GET_MARKER_TARIFF_HOLD_ERROR, payload: MessageText })
    }
  } catch ({ message }) {
    yield put({ type: GET_MARKER_TARIFF_HOLD_FAILURE, payload: message })
    notification.error({
      message: errorMessage
    })
  }
}
