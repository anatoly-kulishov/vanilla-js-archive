import { call, put } from 'redux-saga/effects'
import moment from 'moment'
import api from 'utils/api'

import {
  FETCH_IRREGULAR_WORDS_SUCCESS,
  FETCH_IRREGULAR_WORDS_ERROR,
  FETCH_IRREGULAR_WORDS_FAILURE
} from 'reducers/searching/smartSearchingReducer'
import { getRuLayoutArray } from 'utils/helpers/replacer'

export function * fetchIrregularWordsSaga () {
  const { fetchWords } = api

  try {
    const { data } = yield call(fetchWords)

    if (data.IsSuccess) {
      const { Data: irregulars } = data
      const ruIrregulars = getRuLayoutArray(irregulars)
      const searchingIrregularsDictionary = { date: moment(), irregulars, ruIrregulars }
      localStorage.setItem('searchingIrregularsDictionary', JSON.stringify(searchingIrregularsDictionary))
      yield put({ type: FETCH_IRREGULAR_WORDS_SUCCESS })
    } else {
      yield put({ type: FETCH_IRREGULAR_WORDS_ERROR, payload: data })
    }
  } catch (exception) {
    yield put({ type: FETCH_IRREGULAR_WORDS_FAILURE, message: exception.message })
  }
}
