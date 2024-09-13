import { call, put, select } from 'redux-saga/effects'
import api from 'utils/api'

import { identificationLevelIds } from 'constants/twinspot'
import {
  FETCH_CURRENT_CONVERSATION,
  FETCH_CURRENT_CONVERSATION_SUCCESS,
  FETCH_CURRENT_CONVERSATION_ERROR,
  FETCH_CURRENT_CONVERSATION_FAILURE,
  FETCH_SENDERS_CONVERSATIONS_SUCCESS,
  FETCH_SENDERS_CONVERSATIONS_ERROR,
  FETCH_SENDERS_CONVERSATIONS_FAILURE,
  SET_WORK_STATUS_SUCCESS,
  SET_WORK_STATUS_ERROR,
  SET_WORK_STATUS_FAILURE,
  SET_DELAY_STATUS_SUCCESS,
  SET_DELAY_STATUS_ERROR,
  SET_DELAY_STATUS_FAILURE,
  FETCH_IDENTIFY_CONVERSATION_SUCCESS,
  FETCH_IDENTIFY_CONVERSATION_ERROR,
  FETCH_IDENTIFY_CONVERSATION_FAILURE,
  FETCH_IDENTIFY_CONVERSATION,
  UDPATE_IDENTIFICATION_LEVEL_SUCCESS,
  UDPATE_IDENTIFICATION_LEVEL_ERROR,
  UDPATE_IDENTIFICATION_LEVEL_FAILURE,
  FETCH_IDENTIFICATION_LEVELS_SUCCESS,
  FETCH_IDENTIFICATION_LEVELS_ERROR,
  FETCH_IDENTIFICATION_LEVELS_FAILURE,
  UDPATE_IDENTIFICATION_LEVEL,
  SET_CLOSE_STATUS_SUCCESS,
  SET_CLOSE_STATUS_ERROR,
  SET_CLOSE_STATUS_FAILURE
} from 'reducers/twinspot/conversationsReducer'

import { getQueryParamsState } from 'selectors'
import { getCurrentConversationId } from 'selectors/twinspotSelectors'
import { conversationStatuses } from 'constants/conversationStatuses'
import { notification } from 'antd'

const {
  fetchConversations,
  setWorkStatus,
  setDelayStatus,
  setCloseStatus,
  identifyConversation,
  fetchIdentificationLevels,
  updateIdentificationLevel
} = api

export function * fetchCurrentConversationSaga ({ payload }) {
  try {
    const { data } = yield call(fetchConversations, payload)
    if (data.IsSuccess) {
      const currentConversation = data.Data?.Conversations?.[0]
      yield put({ type: FETCH_CURRENT_CONVERSATION_SUCCESS, payload: currentConversation })
      if (currentConversation?.IdentificationLevelId === identificationLevelIds.zero) {
        yield put({ type: FETCH_IDENTIFY_CONVERSATION, payload: { from: currentConversation?.From } })
      }
    } else {
      yield put({ type: FETCH_CURRENT_CONVERSATION_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: FETCH_CURRENT_CONVERSATION_FAILURE, message: exception.message })
  }
}

export function * fetchSendersConversationsSaga ({ payload }) {
  try {
    const { data } = yield call(fetchConversations, payload)
    if (data.IsSuccess) {
      const { Data } = data
      const opened = []
      const closed = []
      Data.Conversations.forEach(conversation => {
        if (conversation?.StatusId === conversationStatuses.closed) {
          closed.push(conversation)
        } else {
          opened.push(conversation)
        }
      })
      yield put({ type: FETCH_SENDERS_CONVERSATIONS_SUCCESS, payload: { opened, closed } })
    } else {
      yield put({ type: FETCH_SENDERS_CONVERSATIONS_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: FETCH_SENDERS_CONVERSATIONS_FAILURE, message: exception.message })
  }
}

export function * setWorkStatusSaga () {
  const { conversationId } = yield select(getQueryParamsState)
  try {
    const { data } = yield call(setWorkStatus, { conversationId: +conversationId })
    if (data.IsSuccess) {
      yield put({ type: SET_WORK_STATUS_SUCCESS })
      yield put({ type: FETCH_CURRENT_CONVERSATION, payload: { conversationId: +conversationId } })
    } else {
      yield put({ type: SET_WORK_STATUS_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: SET_WORK_STATUS_FAILURE, payload: exception.message })
  }
}

export function * setDelayStatusSaga () {
  const { conversationId } = yield select(getQueryParamsState)
  try {
    const { data } = yield call(setDelayStatus, { conversationId: +conversationId })
    if (data.IsSuccess) {
      yield put({ type: SET_DELAY_STATUS_SUCCESS })
      yield put({ type: FETCH_CURRENT_CONVERSATION, payload: { conversationId: +conversationId } })
    } else {
      yield put({ type: SET_DELAY_STATUS_ERROR, payload: data })
      notification.error({
        message: 'Изменение статуса диалога',
        description: data?.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: SET_DELAY_STATUS_FAILURE, payload: exception.message })
  }
}

export function * setCloseStatusSaga ({ payload }) {
  const { conversationId } = yield select(getQueryParamsState)
  try {
    const { data } = yield call(setCloseStatus, { conversationId: +conversationId, ...payload })
    if (data.IsSuccess) {
      yield put({ type: SET_CLOSE_STATUS_SUCCESS })
      yield put({ type: FETCH_CURRENT_CONVERSATION, payload: { conversationId: +conversationId } })
    } else {
      yield put({ type: SET_CLOSE_STATUS_ERROR, payload: data })
      notification.error({
        message: 'Изменение статуса диалога',
        description: data?.MessageText
      })
    }
  } catch (exception) {
    yield put({ type: SET_CLOSE_STATUS_FAILURE, payload: exception.message })
  }
}

export function * fetchIdentifyConversationSaga ({ payload }) {
  try {
    const { data } = yield call(identifyConversation, payload)

    if (data.IsSuccess) {
      let dsText = 'С этого почтового ящика ранее были обработаны обращения от'

      if (data.Data === null) {
        dsText = ''
      }

      if (data.Data?.length === 1) {
        const { IsDs } = data.Data[0]

        if (IsDs) {
          const { From, ClientId, ClientName, BranchId, PersonalAccount } = data.Data[0]
          const ConversationId = yield select(getCurrentConversationId)
          yield put({
            type: UDPATE_IDENTIFICATION_LEVEL,
            payload: {
              ConversationId,
              IdentificationLevelId: identificationLevelIds.three,
              From,
              ClientId,
              ClientName,
              BranchId,
              PersonalAccount
            }
          })
        }
      } else {
        let indentifiers = []
        const atLeastOneIsDS = data.Data?.find(identify => identify.IsDs)
        indentifiers = data.Data
        if (atLeastOneIsDS) {
          dsText = 'Этот почтовый ящик является способом ДО для клиента'
          indentifiers = data.Data?.filter(identify => identify.IsDs)
        }
        yield put({ type: FETCH_IDENTIFY_CONVERSATION_SUCCESS, payload: { indentifiers, dsText } })
      }
    } else {
      yield put({ type: FETCH_IDENTIFY_CONVERSATION_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: FETCH_IDENTIFY_CONVERSATION_FAILURE, message: exception.message })
  }
}

export function * updateIdentificationLevelSaga ({ payload }) {
  try {
    const { data } = yield call(updateIdentificationLevel, payload)
    if (data.IsSuccess) {
      yield put({ type: UDPATE_IDENTIFICATION_LEVEL_SUCCESS })
      yield put({ type: FETCH_CURRENT_CONVERSATION, payload: { conversationId: payload.conversationId } })
    } else {
      yield put({ type: UDPATE_IDENTIFICATION_LEVEL_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: UDPATE_IDENTIFICATION_LEVEL_FAILURE, payload: exception.message })
  }
}

export function * fetchIdentificationLevelsSaga ({ payload }) {
  try {
    const { data } = yield call(fetchIdentificationLevels, payload)
    if (data.IsSuccess) {
      yield put({ type: FETCH_IDENTIFICATION_LEVELS_SUCCESS, payload: data.Data })
    } else {
      yield put({ type: FETCH_IDENTIFICATION_LEVELS_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: FETCH_IDENTIFICATION_LEVELS_FAILURE, payload: exception.message })
  }
}
