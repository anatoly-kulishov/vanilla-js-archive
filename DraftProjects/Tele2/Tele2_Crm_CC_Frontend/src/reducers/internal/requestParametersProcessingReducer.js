import { createAction, handleActions, combineActions } from 'redux-actions'

export const PARAMETERS_PROCESSING_FETCH = 'internal/PARAMETERS_PROCESSING_FETCH'
export const PARAMETERS_PROCESSING_FETCH_SUCCESS = 'internal/PARAMETERS_PROCESSING_FETCH_SUCCESS'
export const PARAMETERS_PROCESSING_FETCH_ERROR = 'internal/PARAMETERS_PROCESSING_FETCH_ERROR'
export const PARAMETERS_PROCESSING_FETCH_FAILURE = 'internal/PARAMETERS_PROCESSING_FETCH_FAILURE'

export const requestParametersProcessing = createAction(PARAMETERS_PROCESSING_FETCH)

const initialState = {
  processingParameters: null,
  isProcessingParametersLoading: null,
  isProcessingParametersError: null
}

export default handleActions({
  [PARAMETERS_PROCESSING_FETCH]: (state) => ({
    ...state,
    isProcessingParametersLoading: true
  }),

  [PARAMETERS_PROCESSING_FETCH_SUCCESS]: (state, { payload: { processingParameters } }) => ({
    ...state,
    processingParameters,
    isProcessingParametersLoading: false,
    isProcessingParametersError: false
  }),

  [combineActions(PARAMETERS_PROCESSING_FETCH_ERROR, PARAMETERS_PROCESSING_FETCH_FAILURE)]: (state) => ({
    ...state,
    processingParameters: null,
    isProcessingParametersLoading: false,
    isProcessingParametersError: true
  })
}, initialState)
