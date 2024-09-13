import { call, put } from 'redux-saga/effects'
import api from 'utils/api'
import open from 'utils/helpers/windowOpener'

import {
  FETCH_MANUAL_SEARCH_GRID_DATA_SUCCESS,
  FETCH_MANUAL_SEARCH_GRID_DATA_ERROR,
  FETCH_MANUAL_SEARCH_GRID_DATA_FAILURE,
  FETCH_MANUAL_SEARCH_GRID_DATA
} from 'reducers/manualSearchReducer'

import {
  FETCH_TICKET,
  FETCH_TICKET_CHECKLIST,
  FETCH_TICKET_COMMENTS,
  FETCH_TICKET_FILES,
  HANDLE_VISIBLE_TICKET_INFO_MODAL
} from 'reducers/tickets/historyTicketReducer'
import { notification } from 'antd'
import fromEnv from 'config/fromEnv'
import { storeWebsellerSessionId } from 'webseller/helpers/api/sessionAccessKey'

const { fetchManualSearchGridData, fetchCreateSession, fetchDeleteAllSessions } = api

export function * fetchManualSearchGridDataSaga ({ payload }) {
  const { isASSeller } = payload

  const searchCustomer = isASSeller ? searchCustomerWithSession : searchCustomerDefault

  yield call(searchCustomer, payload)
}

function * searchCustomerWithSession (payload) {
  const { gridData, isCreateOrder } = payload
  const { DocumentSeries, DocumentNumber, MSISDN: msisdn, handlingChannel } = gridData
  const documentNumber = DocumentNumber || DocumentSeries

  try {
    const { data: sessionResponseData, status } = yield call(fetchCreateSession, { msisdn, documentNumber })

    switch (status) {
      case 200: {
        storeWebsellerSessionId(sessionResponseData.sessionId)

        const subscriber = {
          Account: sessionResponseData.subscriber.account,
          BillingBranch: sessionResponseData.subscriber.billingBranch,
          BillingBranchId: sessionResponseData.subscriber.billingBranchId,
          ClientId: sessionResponseData.subscriber.clientId,
          ClientName: sessionResponseData.subscriber.clientName,
          ClientStatus: sessionResponseData.subscriber.clientStatus,
          ClientTypeId: sessionResponseData.subscriber.clientTypeId,
          EntityType: sessionResponseData.subscriber.entityType,
          Inn: sessionResponseData.subscriber.inn,
          Msisdn: sessionResponseData.subscriber.msisdn,
          Passport: sessionResponseData.subscriber.passport,
          SubscriberId: sessionResponseData.subscriber.subscriberId,
          SubscriberName: sessionResponseData.subscriber.subscriberName,
          SubscriberStatus: sessionResponseData.subscriber.subscriberStatus
        }

        yield put({ type: FETCH_MANUAL_SEARCH_GRID_DATA_SUCCESS, payload: { Data: [subscriber] } })

        const redirectUrl = isCreateOrder
          ? `/card/rtc-broadband/create-order?msisdn=${msisdn}&serviceChannelId=${handlingChannel}`
          : `/main/balance?msisdn=${msisdn}&serviceChannelId=${handlingChannel}`

        open(redirectUrl, '_self')
        break
      }

      case 404: {
        yield put({ type: FETCH_MANUAL_SEARCH_GRID_DATA_ERROR })
        notification.error({
          message: 'Абонент не найден'
        })
        break
      }

      case 409: {
        yield call(fetchDeleteAllSessions)
        yield put({ type: FETCH_MANUAL_SEARCH_GRID_DATA, payload })
        break
      }

      default: {
        throw new Error()
      }
    }
  } catch (e) {
    yield put({ type: FETCH_MANUAL_SEARCH_GRID_DATA_FAILURE, message: e.message })
    notification.error({
      message: 'Ошибка ручного поиска'
    })
  }
}

function * searchCustomerDefault (payload) {
  const { gridData } = payload
  const { fieldName, isUpdateIdentity, ...filteredPayload } = gridData
  try {
    const { data } = yield call(fetchManualSearchGridData, filteredPayload)
    const { MSISDN, Email } = gridData

    if (data.IsSuccess) {
      yield put({ type: FETCH_MANUAL_SEARCH_GRID_DATA_SUCCESS, payload: data })

      switch (fieldName) {
        case 'TTNumber':
          const requestId = data.Data[0]
          if (!requestId) return
          yield put({ type: HANDLE_VISIBLE_TICKET_INFO_MODAL })
          yield put({ type: FETCH_TICKET, payload: { Id: requestId } })
          yield put({ type: FETCH_TICKET_CHECKLIST, payload: { ServiceRequest: requestId } })
          yield put({ type: FETCH_TICKET_COMMENTS, payload: { Incident: requestId } })
          yield put({ type: FETCH_TICKET_FILES, payload: { ServiceRequest: requestId } })
          break
        case 'MSISDN':
          if (data.Data.length === 1 && !isUpdateIdentity) {
            open(
              `${fromEnv('REACT_APP_SEARCH')}/main/balance?msisdn=${filteredPayload.MSISDN}&serviceChannelId=${
                gridData.handlingChannel
              }`
            )
          }
          break
        case 'Email':
        case 'IccId':
        case 'fio':
        case 'LocalPhoneNumber':
          if (data.Data.length === 1 && !isUpdateIdentity) {
            open(
              `${fromEnv('REACT_APP_SEARCH')}/main/balance?msisdn=${data.Data[0].Msisdn}&serviceChannelId=${
                gridData.handlingChannel
              }`
            )
          }
          break
        case 'PersonalAccountName':
      }
    } else {
      yield put({ type: FETCH_MANUAL_SEARCH_GRID_DATA_ERROR })
      if (!isUpdateIdentity && (MSISDN || Email)) {
        const msisdn = MSISDN ? 'msisdn=' + MSISDN + '&' : ''
        const email = Email ? 'email=' + Email + '&' : ''

        const url = `${fromEnv('REACT_APP_SEARCH')}/card/history/appeals?${email + msisdn}serviceChannelId=${
          gridData.handlingChannel
        }`
        open(url)
      }

      notification.error({
        message: 'Ручной поиск',
        description: data?.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_MANUAL_SEARCH_GRID_DATA_FAILURE, message: exception.message })
    // по хорошему надо доработать бэк, чтоб не было 500, тогда можно будет обработать это условие в Error, а не в Failure
    notification.error({
      message: 'Ручной поиск',
      description: exception.message
    })
    if (fieldName === 'Email') {
      const url = `${fromEnv('REACT_APP_SEARCH')}/card/history/appeals?email=${gridData.Email}&serviceChannelId=${
        gridData.handlingChannel
      }`
      !isUpdateIdentity && open(url)
    }
  }
}
