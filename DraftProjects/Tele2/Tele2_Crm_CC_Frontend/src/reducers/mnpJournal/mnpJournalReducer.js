import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_MNP_JOURNAL = 'mnpJournal/FETCH_MNP_JOURNAL'
export const FETCH_MNP_JOURNAL_SUCCESS = 'mnpJournal/FETCH_MNP_JOURNAL_SUCCESS'
export const FETCH_MNP_JOURNAL_ERROR = 'mnpJournal/FETCH_MNP_JOURNAL_ERROR'
export const FETCH_MNP_JOURNAL_FAILURE = 'mnpJournal/FETCH_MNP_JOURNAL_FAILURE'

const CLEAR_MNP_JOURNAL = 'mnpJournal/CLEAR_MNP_JOURNAL'

export const fetchMnpJournal = createAction(FETCH_MNP_JOURNAL)
export const clearMnpJournal = createAction(CLEAR_MNP_JOURNAL)

const initialState = {
  mnpJournal: null,
  isMnpJournalLoading: false,
  mnpJournalError: ''
}

export default handleActions(
  {
    [FETCH_MNP_JOURNAL]: produce((state) => {
      state.isMnpJournalLoading = true
    }),

    [FETCH_MNP_JOURNAL_SUCCESS]: produce((state, { payload }) => {
      state.mnpJournal = payload
      state.isMnpJournalLoading = false
    }),

    [combineActions(FETCH_MNP_JOURNAL_ERROR, FETCH_MNP_JOURNAL_FAILURE)]: produce((state, { payload }) => {
      state.mnpJournalError = payload
      state.isMnpJournalLoading = false
    }),

    [CLEAR_MNP_JOURNAL]: produce((state) => {
      state.mnpJournal = null
    })
  },
  initialState
)
