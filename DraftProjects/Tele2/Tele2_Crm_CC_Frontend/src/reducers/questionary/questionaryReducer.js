import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_QUESTIONARY_USE_LIST = 'questionary/FETCH_QUESTIONARY_USE_LIST'
export const FETCH_QUESTIONARY_USE_LIST_SUCCESS = 'questionary/FETCH_QUESTIONARY_USE_LIST_SUCCESS'
export const FETCH_QUESTIONARY_USE_LIST_ERROR = 'questionary/FETCH_QUESTIONARY_USE_LIST_ERROR'
export const FETCH_QUESTIONARY_USE_LIST_FAILURE = 'questionary/FETCH_QUESTIONARY_USE_LIST_FAILURE'

export const FETCH_QUESTIONS_LIST = 'questionary/FETCH_QUESTIONS_LIST'
export const FETCH_QUESTIONS_LIST_SUCCESS = 'questionary/FETCH_QUESTIONS_LIST_SUCCESS'
export const FETCH_QUESTIONS_LIST_ERROR = 'questionary/FETCH_QUESTIONS_LIST_ERROR'
export const FETCH_QUESTIONS_LIST_FAILURE = 'questionary/FETCH_QUESTIONS_LIST_FAILURE'

export const FETCH_MNP_QUESTIONS_LIST = 'questionary/FETCH_MNP_QUESTIONS_LIST'
export const FETCH_MNP_QUESTIONS_LIST_SUCCESS = 'questionary/FETCH_MNP_QUESTIONS_LIST_SUCCESS'
export const FETCH_MNP_QUESTIONS_LIST_ERROR = 'questionary/FETCH_MNP_QUESTIONS_LIST_ERROR'
export const FETCH_MNP_QUESTIONS_LIST_FAILURE = 'questionary/FETCH_MNP_QUESTIONS_LIST_FAILURE'

export const WRITE_NEW_QUESTIONARY = 'questionary/WRITE_NEW_QUESTIONARY'
export const WRITE_NEW_QUESTIONARY_SUCCESS = 'questionary/WRITE_NEW_QUESTIONARY_SUCCESS'
export const WRITE_NEW_QUESTIONARY_ERROR = 'questionary/WRITE_NEW_QUESTIONARY_ERROR'
export const WRITE_NEW_QUESTIONARY_FAILURE = 'questionary/WRITE_NEW_QUESTIONARY_FAILURE'

export const FETCH_QUESTIONARY_FOR_REDIRECTED_ABONENT = 'questionary/FETCH_QUESTIONARY_FOR_REDIRECTED_ABONENT'
export const FETCH_QUESTIONARY_FOR_REDIRECTED_ABONENT_SUCCESS = 'questionary/FETCH_QUESTIONARY_FOR_REDIRECTED_ABONENT_SUCCESS'
export const FETCH_QUESTIONARY_FOR_REDIRECTED_ABONENT_ERROR = 'questionary/FETCH_QUESTIONARY_FOR_REDIRECTED_ABONENT_ERROR'
export const FETCH_QUESTIONARY_FOR_REDIRECTED_ABONENT_FAILURE = 'questionary/FETCH_QUESTIONARY_FOR_REDIRECTED_ABONENT_FAILURE'

export const SAVE_QUESTIONARY = 'questionary/SAVE_QUESTIONARY'
export const CLEAR_SAVED_QUESTIONARY = 'questionary/CLEAR_SAVED_QUESTIONARY'
export const SAVE_MNP_QUESTIONARY = 'questionary/SAVE_MNP_QUESTIONARY'

const initialState = {
  questionaryUseList: [],
  isQuestionaryUseListLoading: false,
  questionaryUseListError: '',

  questionsList: null,
  isQuestionsListLoading: false,

  mnpQuestionsList: null,
  isMnpQuestionsListLoading: false,

  isWriteNewQuestionaryLoading: false,

  isQuestionaryForRedirectedAbonentLoading: false,

  answeredQuestions: [],
  savedMnpQuestions: null
}

export const fetchQuestionaryUseList = createAction(FETCH_QUESTIONARY_USE_LIST)
export const fetchQuestionsList = createAction(FETCH_QUESTIONS_LIST)
export const fetchMnpQuestionsList = createAction(FETCH_MNP_QUESTIONS_LIST)
export const writeNewQuestionary = createAction(WRITE_NEW_QUESTIONARY)
export const fetchQuestionaryForRedirectedAbonent = createAction(FETCH_QUESTIONARY_FOR_REDIRECTED_ABONENT)
export const saveQuestionary = createAction(SAVE_QUESTIONARY)
export const saveMnpQuestionary = createAction(SAVE_MNP_QUESTIONARY)
export const clearSaveQuestionary = createAction(CLEAR_SAVED_QUESTIONARY)

export default handleActions({
  [FETCH_QUESTIONARY_USE_LIST]: produce((state, action) => {
    state.isQuestionaryUseListLoading = true
    state.questionaryUseListError = ''
  }),
  [FETCH_QUESTIONARY_USE_LIST_SUCCESS]: produce((state, { payload }) => {
    state.questionaryUseList = payload
    state.isQuestionaryUseListLoading = false
  }),
  [combineActions(FETCH_QUESTIONARY_USE_LIST_ERROR, FETCH_QUESTIONARY_USE_LIST_FAILURE)]:
    produce((state, { payload }) => {
      state.isQuestionaryUseListLoading = false
      state.questionaryUseListError = payload
    }),

  [FETCH_QUESTIONS_LIST]: produce((state, action) => {
    state.isQuestionsListLoading = true
  }),
  [FETCH_QUESTIONS_LIST_SUCCESS]: produce((state, { payload }) => {
    state.questionsList = payload
    state.isQuestionsListLoading = false
  }),
  [combineActions(FETCH_QUESTIONS_LIST_ERROR, FETCH_QUESTIONS_LIST_FAILURE)]:
    produce((state, action) => {
      state.isQuestionsListLoading = false
    }),

  [FETCH_MNP_QUESTIONS_LIST]: produce((state, action) => {
    state.isMnpQuestionsListLoading = true
  }),
  [FETCH_MNP_QUESTIONS_LIST_SUCCESS]: produce((state, { payload }) => {
    state.mnpQuestionsList = payload
    state.isMnpQuestionsListLoading = false
  }),
  [combineActions(FETCH_MNP_QUESTIONS_LIST_ERROR, FETCH_MNP_QUESTIONS_LIST_FAILURE)]:
    produce((state, action) => {
      state.isMnpQuestionsListLoading = false
    }),

  [WRITE_NEW_QUESTIONARY]: produce((state, action) => {
    state.isWriteNewQuestionaryLoading = true
  }),
  [WRITE_NEW_QUESTIONARY_SUCCESS]: produce((state, action) => {
    state.questionaryUseList = []
    state.isWriteNewQuestionaryLoading = false
  }),
  [combineActions(WRITE_NEW_QUESTIONARY_ERROR, WRITE_NEW_QUESTIONARY_FAILURE)]:
    produce((state, action) => {
      state.isWriteNewQuestionaryLoading = false
    }),

  [FETCH_QUESTIONARY_FOR_REDIRECTED_ABONENT]: produce((state, action) => {
    state.isQuestionaryForRedirectedAbonentLoading = true
  }),
  [FETCH_QUESTIONARY_FOR_REDIRECTED_ABONENT_SUCCESS]: produce((state, { payload }) => {
    state.isQuestionaryForRedirectedAbonentLoading = false
  }),
  [combineActions(FETCH_QUESTIONARY_FOR_REDIRECTED_ABONENT_ERROR, FETCH_QUESTIONARY_FOR_REDIRECTED_ABONENT_FAILURE)]:
    produce((state, action) => {
      state.isQuestionaryForRedirectedAbonentLoading = false
    }),
  [SAVE_QUESTIONARY]: produce((state, { payload }) => {
    state.answeredQuestions = [...state.answeredQuestions, ...payload]
  }),
  [SAVE_MNP_QUESTIONARY]: produce((state, { payload }) => {
    state.savedMnpQuestions = payload
  }),
  [CLEAR_SAVED_QUESTIONARY]: produce((state) => {
    state.answeredQuestions = []
  })
}, initialState)
