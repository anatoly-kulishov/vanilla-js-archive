import { call, put } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'

import {
  GET_SERVICE_HISTORY_FETCH_SUCCESS,
  GET_SERVICE_HISTORY_FETCH_ERROR,
  GET_SERVICE_HISTORY_FETCH_FAILURE
} from 'reducers/services/serviceHistoryReducer'

const { fetchServiceHistory } = api

export function * fetchServiceHistorySaga ({
  payload: { msisdn, branchId, startDate, endDate, serviceId, serviceStatus, serviceName, message, isSimReplace }
}) {
  try {
    const { data } = yield call(fetchServiceHistory, {
      msisdn: msisdn,
      branchId: branchId,
      startDate: startDate,
      endDate: endDate + ' 23:59:59',
      serviceId: serviceId,
      serviceStatus: serviceStatus,
      serviceName: serviceName
    })
    if (data.IsSuccess) {
      yield put({ type: GET_SERVICE_HISTORY_FETCH_SUCCESS, payload: data })
      const hasSimReplaceLimit = data?.Data?.filter(service => service.ServiceStatus === 'активна').length >= 2
      if (isSimReplace && hasSimReplaceLimit) {
        notification.open({
          message: `Замена SIM`,
          description: 'Операция недоступна для абонента. По одному номеру замена доступна не более 2-х раз в сутки.',
          type: 'error'
        })
      }
    } else {
      yield put({ type: GET_SERVICE_HISTORY_FETCH_ERROR, payload: data })
      if (!isSimReplace) {
        notification.warn({
          message,
          description: data.MessageText
        })
      }
    }
  } catch (exception) {
    yield put({ type: GET_SERVICE_HISTORY_FETCH_FAILURE, message: exception.message })
    notification.error({
      message,
      description: exception.message
    })
  }
}
