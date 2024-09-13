import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_ACTUAL_MTP_JOURNAL_FOR_PERIOD = 'massProblems/FETCH_ACTUAL_MTP_JOURNAL_FOR_PERIOD'
export const FETCH_ACTUAL_MTP_JOURNAL_FOR_PERIOD_SUCCESS = 'massProblems/FETCH_ACTUAL_MTP_JOURNAL_FOR_PERIOD_SUCCESS'
export const FETCH_ACTUAL_MTP_JOURNAL_FOR_PERIOD_ERROR = 'massProblems/FETCH_ACTUAL_MTP_JOURNAL_FOR_PERIOD_ERROR'
export const FETCH_ACTUAL_MTP_JOURNAL_FOR_PERIOD_FAILURE = 'massProblems/FETCH_ACTUAL_MTP_JOURNAL_FOR_PERIOD_FAILURE'

const initialState = {
  mtpJournalForPeriod: [],
  isActualMtpJournalForPeriodLoading: false,
  mtpJournalForPeriodError: ''
}

export const fetchActualMtpJournalForPeriod = createAction(FETCH_ACTUAL_MTP_JOURNAL_FOR_PERIOD)

export default handleActions(
  {
    [FETCH_ACTUAL_MTP_JOURNAL_FOR_PERIOD]: produce((state, action) => {
      state.isActualMtpJournalForPeriodLoading = true
    }),

    [FETCH_ACTUAL_MTP_JOURNAL_FOR_PERIOD_SUCCESS]: produce((state, { payload }) => {
      state.mtpJournalForPeriod = payload
      state.isActualMtpJournalForPeriodLoading = false
    }),

    [combineActions(FETCH_ACTUAL_MTP_JOURNAL_FOR_PERIOD_ERROR, FETCH_ACTUAL_MTP_JOURNAL_FOR_PERIOD_FAILURE)]:
    produce((state, { payload }) => {
      state.mtpJournalForPeriodError = payload
      state.isActualMtpJournalForPeriodLoading = false
    })
  },
  initialState
)
