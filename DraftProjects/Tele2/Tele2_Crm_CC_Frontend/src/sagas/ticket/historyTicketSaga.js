import { call, put } from 'redux-saga/effects'
import api from '../../utils/api'

import {
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_ERROR,
  FETCH_TICKETS_FAILURE,
  FETCH_TICKET,
  FETCH_TICKET_SUCCESS,
  FETCH_TICKET_ERROR,
  FETCH_TICKET_FAILURE,
  FETCH_TICKET_CHECKLIST,
  FETCH_TICKET_CHECKLIST_SUCCESS,
  FETCH_TICKET_CHECKLIST_ERROR,
  FETCH_TICKET_CHECKLIST_FAILURE,
  FETCH_TICKET_COMMENTS,
  FETCH_TICKET_COMMENTS_SUCCESS,
  FETCH_TICKET_COMMENTS_ERROR,
  FETCH_TICKET_COMMENTS_FAILURE,
  FETCH_TICKET_STATUSES_SUCCESS,
  FETCH_TICKET_STATUSES_ERROR,
  FETCH_TICKET_STATUSES_FAILURE,
  FETCH_TICKETS_REASONS_CATEGORIES_SUCCESS,
  FETCH_TICKETS_REASONS_CATEGORIES_ERROR,
  FETCH_TICKETS_REASONS_CATEGORIES_FAILURE,
  FETCH_TICKET_FILES,
  FETCH_TICKET_FILES_SUCCESS,
  FETCH_TICKET_FILES_ERROR,
  FETCH_TICKET_FILES_FAILURE
} from '../../reducers/tickets/historyTicketReducer'

import { HANDLE_VISIBLE_TICKET_INFO_MODAL } from 'reducers/tickets/historyTicketReducer'
import { notification } from 'antd'

const {
  fetchTickets,
  fetchReasonCategoryTickets,
  fetchTicketCheckList,
  fetchTicketComments,
  fetchTicketStatuses,
  fetchTicketFiles
} = api

export function * fetchTicketsSaga ({ payload }) {
  try {
    const { data } = yield call(fetchTickets, payload)

    if (data.isSuccess) {
      yield put({ type: FETCH_TICKETS_SUCCESS, payload: data })
    } else {
      yield put({ type: FETCH_TICKETS_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: FETCH_TICKETS_FAILURE, message: exception.message })
  }
}

export function * fetchTicketSaga ({ payload }) {
  try {
    const { data } = yield call(fetchTickets, payload)

    data.isSuccess
      ? yield put({ type: FETCH_TICKET_SUCCESS, payload: data })
      : yield put({ type: FETCH_TICKET_ERROR, payload: data })
  } catch (exception) {
    yield put({ type: FETCH_TICKET_FAILURE, message: exception.message })
  }
}

export function * fetchTicketGridDataByTicketSaga ({ payload }) {
  try {
    const { data } = yield call(fetchTickets, payload)

    if (data.isSuccess) {
      yield put({ type: FETCH_TICKETS_SUCCESS, payload: data })

      if (data.data.incidents.length > 0) {
        const requestId = data.data.incidents[0].requestId

        yield put({ type: HANDLE_VISIBLE_TICKET_INFO_MODAL })
        yield put({ type: FETCH_TICKET, payload: { Id: requestId } })
        yield put({ type: FETCH_TICKET_CHECKLIST, payload: { ServiceRequest: requestId } })
        yield put({ type: FETCH_TICKET_COMMENTS, payload: { Incident: requestId } })
        yield put({ type: FETCH_TICKET_FILES, payload: { ServiceRequest: requestId } })
      }
    } else {
      yield put({ type: FETCH_TICKETS_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: FETCH_TICKETS_FAILURE, message: exception.message })
  }
}

export function * fetchTicketGridDataByFiltersSaga ({ payload }) {
  const message = 'История заявок'

  try {
    const { data } = yield call(fetchTickets, payload)

    if (data.isSuccess) {
      yield put({ type: FETCH_TICKETS_SUCCESS, payload: data })
    } else {
      yield put({ type: FETCH_TICKETS_ERROR, payload: data })
      notification.warn({
        message,
        description: data.messageText
      })
    }
  } catch (exception) {
    yield put({ type: FETCH_TICKETS_FAILURE, message: exception.message })
    notification.error({
      message,
      description: exception.message
    })
  }
}

export function * fetchTicketsReasonsCategoriesSaga (payload) {
  try {
    const { data } = yield call(fetchReasonCategoryTickets, payload)

    if (data.isSuccess) {
      yield put({ type: FETCH_TICKETS_REASONS_CATEGORIES_SUCCESS, payload: data })
    } else {
      yield put({ type: FETCH_TICKETS_REASONS_CATEGORIES_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: FETCH_TICKETS_REASONS_CATEGORIES_FAILURE, message: exception.message })
  }
}

export function * fetchTicketCheckListSaga ({ payload }) {
  try {
    const { data } = yield call(fetchTicketCheckList, payload)

    data.isSuccess
      ? yield put({ type: FETCH_TICKET_CHECKLIST_SUCCESS, payload: data })
      : yield put({ type: FETCH_TICKET_CHECKLIST_ERROR, payload: data })
  } catch (exception) {
    yield put({ type: FETCH_TICKET_CHECKLIST_FAILURE, message: exception.message })
  }
}

export function * fetchTicketCommentsSaga ({ payload }) {
  try {
    const { data } = yield call(fetchTicketComments, payload)

    data.isSuccess
      ? yield put({ type: FETCH_TICKET_COMMENTS_SUCCESS, payload: data })
      : yield put({ type: FETCH_TICKET_COMMENTS_ERROR, payload: data })
  } catch (exception) {
    yield put({ type: FETCH_TICKET_COMMENTS_FAILURE, message: exception.message })
  }
}

export function * fetchTicketStatusesSaga (payload) {
  try {
    const { data } = yield call(fetchTicketStatuses, payload)
    if (data.success) {
      yield put({ type: FETCH_TICKET_STATUSES_SUCCESS, payload: data })
    } else {
      yield put({ type: FETCH_TICKET_STATUSES_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: FETCH_TICKET_STATUSES_FAILURE, message: exception.message })
  }
}

export function * fetchTicketFilesSaga ({ payload }) {
  try {
    const { data } = yield call(fetchTicketFiles, payload)

    data.isSuccess
      ? yield put({ type: FETCH_TICKET_FILES_SUCCESS, payload: data })
      : yield put({ type: FETCH_TICKET_FILES_ERROR, payload: data })
  } catch (exception) {
    yield put({ type: FETCH_TICKET_FILES_FAILURE, message: exception.message })
  }
}
