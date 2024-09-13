import { createAction, handleActions } from 'redux-actions'

export const NOTES_REASON_CATEGORY_GRID_FETCH = 'manualSearch/NOTES_REASON_CATEGORY_GRID_FETCH'
export const NOTES_REASON_CATEGORY_GRID_FETCH_SUCCESS = 'manualSearch/NOTES_REASON_CATEGORY_GRID_FETCH_SUCCESS'
export const NOTES_REASON_CATEGORY_GRID_FETCH_ERROR = 'manualSearch/NOTES_REASON_CATEGORY_GRID_FETCH_ERROR'
export const NOTES_REASON_CATEGORY_GRID_FETCH_FAILURE = 'manualSearch/NOTES_REASON_CATEGORY_GRID_FETCH_FAILURE'

const initialState = {
  notesReasonCategoryGrid: null,
  notesReasonCategoryGridError: null,
  isManualSearchReasonCategoryGridLoading: false
}

export const fetchReasonCategoryNotesGridData = createAction(NOTES_REASON_CATEGORY_GRID_FETCH)

export default handleActions({
  [NOTES_REASON_CATEGORY_GRID_FETCH]: (state) => ({
    ...state,
    notesReasonCategoryGrid: null,
    notesReasonCategoryGridError: false,
    isNotesReasonCategoryGridLoading: true
  }),
  [NOTES_REASON_CATEGORY_GRID_FETCH_SUCCESS]: (
    state, { payload: {
      Data, IsSuccess
    } }) => ({
    ...state,
    notesReasonCategoryGrid: Data,
    notesReasonCategoryGridError: false,
    isNotesReasonCategoryGridLoading: false
  }),
  [NOTES_REASON_CATEGORY_GRID_FETCH_ERROR]: (state, { payload: { errorCode, errorText, stateCode } }) => ({
    ...state,
    notesReasonCategoryGrid: { ErrorCode: errorCode, ErrorText: errorText, StateCode: stateCode },
    notesReasonCategoryGridError: true,
    isNotesReasonCategoryGridLoading: false
  }),
  [NOTES_REASON_CATEGORY_GRID_FETCH_FAILURE]: (state) => ({
    ...state,
    notesReasonCategoryGrid: {},
    notesReasonCategoryGridError: true,
    isNotesReasonCategoryGridLoading: false
  })
}, initialState)
