import { notification } from 'antd'
import {
  FETCH_MNP_JOURNAL_ERROR,
  FETCH_MNP_JOURNAL_FAILURE,
  FETCH_MNP_JOURNAL_SUCCESS
} from 'reducers/mnpJournal/mnpJournalReducer'
import { call, put } from 'redux-saga/effects'
import api from 'utils/api'

export function * fetchMnpJournalSaga ({ payload }) {
  const { fetchMnpJournal } = api

  try {
    const result = yield call(fetchMnpJournal, payload)
    const { data, status } = result

    switch (status) {
      case 200:
        yield put({ type: FETCH_MNP_JOURNAL_SUCCESS, payload: data })
        break
      case 204:
        yield put({ type: FETCH_MNP_JOURNAL_ERROR, payload: 'Заявок не найдено' })
        notification.warning({
          message: 'Журнал заявок MNP',
          description: 'Заявок не найдено'
        })
        break
      default:
        yield put({ type: FETCH_MNP_JOURNAL_ERROR, payload: 'Ошибка загрузки заявок' })
        notification.warning({
          message: 'Журнал заявок MNP',
          description: 'Ошибка загрузки заявок'
        })
        break
    }
  } catch ({ message }) {
    yield put({ type: FETCH_MNP_JOURNAL_FAILURE, payload: message })
    notification.error({
      message: 'Журнал заявок MNP. Ошибка загрузки заявок',
      description: message
    })
  }
}
