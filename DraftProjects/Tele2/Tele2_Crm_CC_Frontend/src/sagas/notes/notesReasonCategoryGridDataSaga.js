import { call, put } from 'redux-saga/effects'

import {
  NOTES_REASON_CATEGORY_GRID_FETCH_SUCCESS,
  NOTES_REASON_CATEGORY_GRID_FETCH_ERROR,
  NOTES_REASON_CATEGORY_GRID_FETCH_FAILURE
} from '../../reducers/notes/notesReasonCategoryGridDataReducer'

import { TOGGLE } from '../../reducers/notificationsBlockReducer'

import { fetchManualSearchGridData } from '../../utils/api'

export function * notesReasonCategoryDataSaga ({ payload }) {
  try {
    const { ...filteredPayload } = payload
    const { data } = yield call(fetchManualSearchGridData, filteredPayload)

    if (data.IsSuccess && data.Data.length) {
      yield put({ type: NOTES_REASON_CATEGORY_GRID_FETCH_SUCCESS, payload: data })
    } else {
      yield put({ type: NOTES_REASON_CATEGORY_GRID_FETCH_ERROR, payload: data })
      // const reasons = [{ title: "Ошибка поиска", content: "Клиент с заданным e-mail не найдена" }]
      // yield put({ type: TOGGLE, payload: { isToggled: true, type: 'error', reasons }});
    }
  } catch (exception) {
    yield put({ type: NOTES_REASON_CATEGORY_GRID_FETCH_FAILURE, message: exception.message })
    const reasons = [{ title: 'Ошибка системы', content: 'Что-то пошло не так' }]
    yield put({ type: TOGGLE, payload: { isToggled: true, type: 'error', reasons } })
  }
}
