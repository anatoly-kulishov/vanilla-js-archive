import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_QUESTIONARY_HISTORY = 'questionary/FETCH_QUESTIONARY_HISTORY'
export const FETCH_QUESTIONARY_HISTORY_SUCCESS = 'questionary/FETCH_QUESTIONARY_HISTORY_SUCCESS'
export const FETCH_QUESTIONARY_HISTORY_ERROR = 'questionary/FETCH_QUESTIONARY_HISTORY_ERROR'
export const FETCH_QUESTIONARY_HISTORY_FAILURE = 'questionary/FETCH_QUESTIONARY_HISTORY_FAILURE'

export const FETCH_QUESTIONS_HISTORY = 'questionary/FETCH_QUESTIONS_HISTORY'
export const FETCH_QUESTIONS_HISTORY_SUCCESS = 'questionary/FETCH_QUESTIONS_HISTORY_SUCCESS'
export const FETCH_QUESTIONS_HISTORY_ERROR = 'questionary/FETCH_QUESTIONS_HISTORY_ERROR'
export const FETCH_QUESTIONS_HISTORY_FAILURE = 'questionary/FETCH_QUESTIONS_HISTORY_FAILURE'

export const FETCH_QUESTIONARY_USE_LIST_WITHOUT_CHECK = 'questionary/FETCH_QUESTIONARY_USE_LIST_WITHOUT_CHECK'
export const FETCH_QUESTIONARY_USE_LIST_WITHOUT_CHECK_SUCCESS = 'questionary/FETCH_QUESTIONARY_USE_LIST_WITHOUT_CHECK_SUCCESS'
export const FETCH_QUESTIONARY_USE_LIST_WITHOUT_CHECK_ERROR = 'questionary/FETCH_QUESTIONARY_USE_LIST_WITHOUT_CHECK_ERROR'
export const FETCH_QUESTIONARY_USE_LIST_WITHOUT_CHECK_FAILURE = 'questionary/FETCH_QUESTIONARY_USE_LIST_WITHOUT_CHECK_FAILURE'

const initialState = {
  questionaryHistory: [],
  isQuestionaryHistoryLoading: false,

  questionsHistory: [],
  markerQuestionsHistory: null,
  mnpQuestionsHistory: null,
  isQuestionsHistoryLoading: false,

  questionaryUseListWithoutCheck: [],
  isQuestionaryUseListWithoutCheckLoading: false
}

export const fetchQuestionaryHistory = createAction(FETCH_QUESTIONARY_HISTORY)
export const fetchQuestionsHistory = createAction(FETCH_QUESTIONS_HISTORY)
export const fetchQuestionaryUseListWithoutCheck = createAction(FETCH_QUESTIONARY_USE_LIST_WITHOUT_CHECK)

export default handleActions({
  [FETCH_QUESTIONARY_HISTORY]: produce((state, action) => {
    state.isQuestionaryHistoryLoading = true
  }),
  [FETCH_QUESTIONARY_HISTORY_SUCCESS]: produce((state, { payload }) => {
    state.questionaryHistory = payload
    state.isQuestionaryHistoryLoading = false
  }),
  [combineActions(FETCH_QUESTIONARY_HISTORY_ERROR, FETCH_QUESTIONARY_HISTORY_FAILURE)]:
    produce((state, action) => {
      state.isQuestionaryHistoryLoading = false
    }),

  [FETCH_QUESTIONARY_USE_LIST_WITHOUT_CHECK]: produce((state, action) => {
    state.isQuestionaryUseListWithoutCheckLoading = true
  }),
  [FETCH_QUESTIONARY_USE_LIST_WITHOUT_CHECK_SUCCESS]: produce((state, { payload }) => {
    state.questionaryUseListWithoutCheck = payload
    state.isQuestionaryUseListWithoutCheckLoading = false
  }),
  [combineActions(FETCH_QUESTIONARY_USE_LIST_WITHOUT_CHECK_ERROR, FETCH_QUESTIONARY_USE_LIST_WITHOUT_CHECK_FAILURE)]:
    produce((state, action) => {
      state.isQuestionaryUseListWithoutCheckLoading = false
    }),

  [FETCH_QUESTIONS_HISTORY]: produce((state, action) => {
    state.isQuestionsHistoryLoading = true
  }),
  [FETCH_QUESTIONS_HISTORY_SUCCESS]: produce((state, { payload }) => {
    const { questionsHistory, isMarker, isMnp } = payload
    if (isMarker) {
      state.markerQuestionsHistory = questionsHistory
    } else if (isMnp) {
      state.mnpQuestionsHistory = questionsHistory
    } else {
      state.questionsHistory = questionsHistory
    }
    state.isQuestionsHistoryLoading = false
  }),
  [combineActions(FETCH_QUESTIONS_HISTORY_ERROR, FETCH_QUESTIONS_HISTORY_FAILURE)]:
    produce((state, action) => {
      state.isQuestionsHistoryLoading = false
    })
}, initialState)
