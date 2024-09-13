import { call, put } from 'redux-saga/effects'

import { notification } from 'antd'

import feedback from 'utils/api'

import {
  SEND_FEEDBACK_SUCCESS,
  SEND_FEEDBACK_ERROR,
  SEND_FEEDBACK_FAILURE,
  CANCEL_FEEDBACK_SUCCESS,
  CANCEL_FEEDBACK_ERROR,
  CANCEL_FEEDBACK_FAILURE,
  FEEDBACK_MODAL_CLOSE,
  GET_FEEDBACK_COMPONENTS_FAILURE,
  GET_FEEDBACK_COMPONENTS_SUCCESS,
  GET_FEEDBACK_COMPONENTS_ERROR,
  GET_FEEDBACK_TYPES_SUCCESS,
  GET_FEEDBACK_TYPES_ERROR,
  GET_FEEDBACK_TYPES_FAILURE,
  GET_FEEDBACK_TEMPLATES_SUCCESS,
  GET_FEEDBACK_TEMPLATES_FAILURE
} from 'reducers/feedbackReducer'
import { DELETE_FILE_SUCCESS } from 'reducers/internal/fileReducer'

export function * getFeedbackTypesSaga () {
  const { getFeedbackType } = feedback
  try {
    const { data, status } = yield call(getFeedbackType)

    status === 200
      ? yield put({ type: GET_FEEDBACK_TYPES_SUCCESS, payload: data })
      : yield put({ type: GET_FEEDBACK_TYPES_ERROR, payload: data.Message })
  } catch ({ message }) {
    yield put({ type: GET_FEEDBACK_TYPES_FAILURE, payload: message })
  }
}

export function * getFeedbackComponentsSaga () {
  const { getFeedbackComponents } = feedback
  try {
    const { data, status } = yield call(getFeedbackComponents)

    status === 200
      ? yield put({ type: GET_FEEDBACK_COMPONENTS_SUCCESS, payload: data })
      : yield put({ type: GET_FEEDBACK_COMPONENTS_ERROR, paload: data.Message })
  } catch ({ message }) {
    yield put({ type: GET_FEEDBACK_COMPONENTS_FAILURE, payload: message })
  }
}

export function * getFeedbackTemplatesSaga ({ payload }) {
  const { getFeedbackTemplates } = feedback
  try {
    const { data, status } = yield call(getFeedbackTemplates, { ...payload })

    status === 200
      ? yield put({ type: GET_FEEDBACK_TEMPLATES_SUCCESS, payload: data })
      : yield put({ type: GET_FEEDBACK_TYPES_ERROR, paload: data.Message })
  } catch ({ message }) {
    yield put({ type: GET_FEEDBACK_TEMPLATES_FAILURE, payload: message })
  }
}

export function * sendFeedbackSaga ({ payload }) {
  const { sendFeedback } = feedback
  try {
    const { data, status } = yield call(sendFeedback, { ...payload })

    if (status === 200) {
      yield put({ type: SEND_FEEDBACK_SUCCESS, payload: data })
      yield put({ type: DELETE_FILE_SUCCESS, payload: [] })
      yield put({ type: FEEDBACK_MODAL_CLOSE, payload })
      notification.open({
        message: `Обратная связь `,
        description: data.Message,
        type: 'success'
      })
    } else {
      yield put({ type: SEND_FEEDBACK_ERROR, payload: data.Message })
      notification.open({
        message: `Обратная связь `,
        description: data.Message,
        type: 'error'
      })
    }
  } catch ({ message }) {
    yield put({ type: SEND_FEEDBACK_FAILURE, message })
    notification.open({
      message: `Обратная связь `,
      description: message,
      type: 'error'
    })
  }
}

export function * cancelFeedbackSaga ({ payload }) {
  const { cancelFeedback } = feedback
  const { FeedbackSessionId } = payload

  try {
    const { data, status } = yield call(cancelFeedback, { FeedbackSessionId })

    if (status === 200) {
      yield put({ type: CANCEL_FEEDBACK_SUCCESS, payload: data })
      yield put({ type: DELETE_FILE_SUCCESS, payload: [] })
      yield put({ type: FEEDBACK_MODAL_CLOSE, payload })
      notification.open({
        message: `Обратная связь `,
        description: data.Message,
        type: 'success'
      })
    } else {
      yield put({ type: CANCEL_FEEDBACK_ERROR, payload: data.Message })
      notification.open({
        message: `Обратная связь `,
        description: data.Message,
        type: 'error'
      })
    }
  } catch ({ message }) {
    yield put({ type: CANCEL_FEEDBACK_FAILURE, message })
    notification.open({
      message: `Обратная связь `,
      description: message,
      type: 'error'
    })
  }
}
