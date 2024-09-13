import { takeEvery, all } from 'redux-saga/effects'

import {
  FETCH_QUESTIONARY_HISTORY,
  FETCH_QUESTIONS_HISTORY,
  FETCH_QUESTIONARY_USE_LIST_WITHOUT_CHECK
} from 'reducers/questionary/questionaryHistoryReducer'
import {
  fetchQuestionaryHistorySaga,
  fetchQuestionsHistorySaga,
  fetchQuestionaryUseListWithoutCheckSaga
} from './questionaryHistorySaga'

import {
  FETCH_QUESTIONARY_USE_LIST,
  FETCH_QUESTIONS_LIST,
  FETCH_MNP_QUESTIONS_LIST,
  WRITE_NEW_QUESTIONARY,
  FETCH_QUESTIONARY_FOR_REDIRECTED_ABONENT
} from 'reducers/questionary/questionaryReducer'
import {
  fetchQuestionaryUseListSaga,
  fetchQuestionsListSaga,
  fetchMnpQuestionsListSaga,
  writeNewQuestionarySaga,
  fetchQuestionaryForRedirectedAbonentSaga
} from './questionarySaga'

export default function * () {
  yield all([
    takeEvery(FETCH_QUESTIONARY_USE_LIST, fetchQuestionaryUseListSaga),
    takeEvery(FETCH_QUESTIONARY_USE_LIST_WITHOUT_CHECK, fetchQuestionaryUseListWithoutCheckSaga),
    takeEvery(FETCH_QUESTIONS_LIST, fetchQuestionsListSaga),
    takeEvery(FETCH_MNP_QUESTIONS_LIST, fetchMnpQuestionsListSaga),
    takeEvery(FETCH_QUESTIONARY_HISTORY, fetchQuestionaryHistorySaga),
    takeEvery(FETCH_QUESTIONS_HISTORY, fetchQuestionsHistorySaga),
    takeEvery(WRITE_NEW_QUESTIONARY, writeNewQuestionarySaga),
    takeEvery(FETCH_QUESTIONARY_FOR_REDIRECTED_ABONENT, fetchQuestionaryForRedirectedAbonentSaga)
  ])
}
