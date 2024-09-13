import { notification } from 'antd'
import {
  FETCH_REJECTION_COMMENTS_FAILURE,
  FETCH_REJECTION_COMMENTS_SUCCESS,
  FETCH_REJECTION_REASONS_ERROR,
  FETCH_REJECTION_REASONS_FAILURE,
  FETCH_REJECTION_REASONS_SUCCESS
} from 'reducers/mnpOrder/rejectionInfoReducer'
import { call, put } from 'redux-saga/effects'
import api from 'utils/api'

export function * fetchRejectionReasonsSaga ({ payload }) {
  const { fetchRejectionReasons } = api

  try {
    const result = yield call(fetchRejectionReasons, payload)
    const { data, status } = result

    switch (status) {
      case 200:
        yield put({ type: FETCH_REJECTION_REASONS_SUCCESS, payload: data.Reasons })
        break
      case 204:
        yield put({ type: FETCH_REJECTION_REASONS_ERROR, payload: 'Причины отклонения не найдены' })
        notification.warning({
          message: 'Форма ручной сверки MNP',
          description: 'Причины отклонения не найдены'
        })
        break
      default:
        yield put({ type: FETCH_REJECTION_REASONS_ERROR, payload: 'Ошибка загрузки причин отклонения' })
        notification.warning({
          message: 'Форма ручной сверки MNP',
          description: 'Ошибка загрузки причин отклонения'
        })
        break
    }
  } catch ({ message }) {
    yield put({ type: FETCH_REJECTION_REASONS_FAILURE, payload: message })
    notification.warning({
      message: 'Форма ручной сверки MNP. Ошибка загрузки причин отклонения',
      description: message
    })
  }
}

export function * fetchRejectionCommentsSaga ({ payload }) {
  const { fetchRejectionComments } = api

  try {
    const result = yield call(fetchRejectionComments, payload)
    const { data, status } = result

    switch (status) {
      case 200:
        yield put({ type: FETCH_REJECTION_COMMENTS_SUCCESS, payload: data.Comments })
        break
      default:
        // yield put({ type: FETCH_REJECTION_COMMENTS_ERROR, payload: data?.MessageText })
        yield put({ type: FETCH_REJECTION_COMMENTS_SUCCESS })

        break
    }
  } catch ({ message }) {
    yield put({ type: FETCH_REJECTION_COMMENTS_FAILURE, payload: message })
  }
}
