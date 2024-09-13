import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_REJECTION_REASONS = 'rejectionInfo/FETCH_REJECTION_REASONS'
export const FETCH_REJECTION_REASONS_SUCCESS = 'rejectionInfo/FETCH_REJECTION_REASONS_SUCCESS'
export const FETCH_REJECTION_REASONS_ERROR = 'rejectionInfo/FETCH_REJECTION_REASONS_ERROR'
export const FETCH_REJECTION_REASONS_FAILURE = 'rejectionInfo/FETCH_REJECTION_REASONS_FAILURE'

export const FETCH_REJECTION_COMMENTS = 'rejectionInfo/FETCH_REJECTION_COMMENTS'
export const FETCH_REJECTION_COMMENTS_SUCCESS = 'rejectionInfo/FETCH_REJECTION_COMMENTS_SUCCESS'
export const FETCH_REJECTION_COMMENTS_ERROR = 'rejectionInfo/FETCH_REJECTION_COMMENTS_ERROR'
export const FETCH_REJECTION_COMMENTS_FAILURE = 'rejectionInfo/FETCH_REJECTION_COMMENTS_FAILURE'

export const fetchRejectionReasons = createAction(FETCH_REJECTION_REASONS)
export const fetchRejectionComments = createAction(FETCH_REJECTION_COMMENTS)

const initialState = {
  rejectionReasons: null,
  isRejectionReasonsLoading: false,
  rejectionReasonsError: '',

  rejectionComments: null,
  isRejectionCommentsLoading: false,
  rejectionCommentsError: ''
}

export default handleActions(
  {
    [FETCH_REJECTION_REASONS]: produce((state) => {
      state.isRejectionReasonsLoading = true
    }),

    [FETCH_REJECTION_REASONS_SUCCESS]: produce((state, { payload }) => {
      state.rejectionReasons = payload
      state.isRejectionReasonsLoading = false
    }),

    [combineActions(FETCH_REJECTION_REASONS_ERROR, FETCH_REJECTION_REASONS_FAILURE)]: produce((state, { payload }) => {
      state.rejectionReasonsError = payload
      state.isRejectionReasonsLoading = false
    }),

    [FETCH_REJECTION_COMMENTS]: produce((state) => {
      state.isRejectionCommentsLoading = true
    }),

    [FETCH_REJECTION_COMMENTS_SUCCESS]: produce((state, { payload }) => {
      state.rejectionComments = payload
      state.isRejectionCommentsLoading = false
    }),

    [combineActions(FETCH_REJECTION_COMMENTS_ERROR, FETCH_REJECTION_COMMENTS_FAILURE)]: produce((state, { payload }) => {
      state.rejectionCommentsError = payload
      state.isRejectionCommentsLoading = false
    })
  },
  initialState
)
