import { call, put, select } from 'redux-saga/effects'
import { notification } from 'antd'
import api from 'utils/api'
import isHandlingClosed from 'utils/helpers/isHandlingClosed'

import {
  TICKET_ADD_FILE_SUCCESS,
  TICKET_ADD_FILE_ERROR,
  TICKET_ADD_FILE_FAILURE,
  TICKET_DELETE_FILE_SUCCESS,
  TICKET_DELETE_FILE_ERROR,
  TICKET_DELETE_FILE_FAILURE,
  TICKET_ADD_COMMENT_SUCCESS,
  TICKET_ADD_COMMENT_ERROR,
  TICKET_ADD_COMMENT_FAILURE
} from 'reducers/tickets/ticketReducer'

import { FETCH_TICKET_COMMENTS, FETCH_TICKET_FILES } from 'reducers/tickets/historyTicketReducer'
import {
  CHECK_COVERAGES_ERROR,
  CHECK_COVERAGES_FAILURE,
  CHECK_COVERAGES_SUCCESS,
  CHECK_MTP_BY_SERVICE_ID_ERROR,
  CHECK_MTP_BY_SERVICE_ID_FAILURE,
  CHECK_MTP_BY_SERVICE_ID_SUCCESS
} from '../../reducers/tickets/createTicketReducer'
import { getPersonalAccountState } from 'selectors/index'

const { ticketAddFile, ticketDeleteFile, ticketAddComment, checkCoverages, checkMTPByServiceId } = api

export function * ticketAddFileSaga ({ payload }) {
  const { file, requestId, ttNumber, handlingId } = payload

  const formData = new FormData()
  if (file.originFileObj) {
    formData.append('bpmFile', file.originFileObj)
  } else {
    formData.append('bpmFile', file)
  }
  formData.append('serviceRequestId', requestId)
  formData.append('ttNumber', ttNumber || '')
  formData.append('HandlingId', handlingId)

  try {
    const { data } = yield call(ticketAddFile, formData)

    if (data.isSuccess) {
      yield put({ type: TICKET_ADD_FILE_SUCCESS, payload: data })
      yield put({ type: FETCH_TICKET_FILES, payload: { ServiceRequest: requestId } })

      notification.open({
        message: `Прикрепление файла к заявке `,
        description: data.messageText,
        type: 'info'
      })
    } else {
      yield put({ type: TICKET_ADD_FILE_ERROR, payload: data })

      isHandlingClosed(data.MessageText) &&
        notification.open({
          message: `Прикрепление файла к заявке `,
          description: data.messageText,
          type: 'error'
        })
    }
  } catch (exception) {
    yield put({ type: TICKET_ADD_FILE_FAILURE, message: exception.message })
  }
}

export function * fetchDeleteFileSaga ({ payload }) {
  try {
    const { data } = yield call(ticketDeleteFile, payload)

    if (data.isSuccess) {
      yield put({ type: TICKET_DELETE_FILE_SUCCESS, payload: data })
      yield put({ type: FETCH_TICKET_FILES, payload: { ServiceRequest: payload.requestId } })

      notification.info({
        message: 'Удаление файла',
        description: data.messageText,
        type: 'info'
      })
    } else {
      yield put({ type: TICKET_DELETE_FILE_ERROR, payload: data })

      isHandlingClosed(data.MessageText) &&
        notification.open({
          message: `Удаление файла `,
          description: data.messageText,
          type: 'error'
        })
    }
  } catch (exception) {
    yield put({ type: TICKET_DELETE_FILE_FAILURE, message: exception.message })
  }
}

export function * ticketAddCommentSaga ({ payload }) {
  // History ManualSearch
  try {
    const { data } = yield call(ticketAddComment, payload)

    if (data.isSuccess) {
      yield put({ type: TICKET_ADD_COMMENT_SUCCESS, payload: data })
      yield put({ type: FETCH_TICKET_COMMENTS, payload: { Incident: payload.incidentId } })

      notification.open({
        message: `Добавление комментария к заявке `,
        description: data.messageText,
        type: 'info'
      })
    } else {
      yield put({ type: TICKET_ADD_COMMENT_ERROR, payload: data })

      isHandlingClosed(data.MessageText) &&
        notification.open({
          message: `Добавление комментария к заявке `,
          description: data.messageText,
          type: 'error'
        })
    }
  } catch (exception) {
    yield put({ type: TICKET_ADD_COMMENT_FAILURE, message: exception.message })
  }
}

export function * checkCoveragesSaga ({ payload }) {
  try {
    const { data } = yield call(checkCoverages, payload)

    if (data.isSuccess) {
      yield put({ type: CHECK_COVERAGES_SUCCESS, payload: data?.data })
    } else {
      yield put({ type: CHECK_COVERAGES_ERROR })
    }
  } catch (exception) {
    yield put({ type: CHECK_COVERAGES_FAILURE, message: exception.message })
  }
}

export function * checkMTPByServiceIdSaga ({ payload }) {
  try {
    const { BillingBranchId } = yield select(getPersonalAccountState)

    const requestData = { ...payload, regionId: BillingBranchId }

    const { data } = yield call(checkMTPByServiceId, requestData)

    if (data.isSuccess) {
      yield put({ type: CHECK_MTP_BY_SERVICE_ID_SUCCESS, payload: data?.data })
    } else {
      yield put({ type: CHECK_MTP_BY_SERVICE_ID_ERROR })
    }
  } catch (exception) {
    yield put({ type: CHECK_MTP_BY_SERVICE_ID_FAILURE, message: exception.message })
  }
}
