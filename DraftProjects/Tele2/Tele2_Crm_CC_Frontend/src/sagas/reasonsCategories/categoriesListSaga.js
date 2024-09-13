import { call, put } from 'redux-saga/effects'
import { fetchCategoriesList } from 'utils/api'
import {
  CATEGORIES_LIST_FETCH_SUCCESS,
  CATEGORIES_LIST_FETCH_ERROR,
  CATEGORIES_LIST_FETCH_FAILURE
} from 'reducers/reasonsCategories/categoriesListReducer'

export function * fetchCategoriesListSaga ({ payload = {} }) {
  const params = payload
  try {
    const { data } = yield call(fetchCategoriesList, params)
    if (data.IsSuccess) {
      yield put({ type: CATEGORIES_LIST_FETCH_SUCCESS, payload: { categories: data.Data.Categories } })
    } else {
      yield put({ type: CATEGORIES_LIST_FETCH_ERROR, payload: { error: data } })
    }
  } catch (error) {
    yield put({ type: CATEGORIES_LIST_FETCH_FAILURE, payload: { error: error.message } })
  }
}
