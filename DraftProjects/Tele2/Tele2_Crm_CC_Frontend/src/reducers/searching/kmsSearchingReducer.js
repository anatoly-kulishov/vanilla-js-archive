import { createAction, handleActions, combineActions } from 'redux-actions'

export const KMS_SEARCHING_FETCH = 'kmsSearching/KMS_SEARCHING_FETCH'
export const KMS_SEARCHING_FETCH_SUCCESS = 'kmsSearching/KMS_SEARCHING_FETCH_SUCCESS'
export const KMS_SEARCHING_FETCH_ERROR = 'kmsSearching/KMS_SEARCHING_FETCH_ERROR'
export const KMS_SEARCHING_FETCH_FAILURE = 'kmsSearching/KMS_SEARCHING_FETCH_FAILURE'
export const RESET_KMS_SEARCHING_RESULTS = 'kmsSearching/RESET_KMS_SEARCHING_RESULTS'
export const KMS_SEARCHING_AND_REDIRECT_FETCH = 'kmsSearching/KMS_SEARCHING_AND_REDIRECT_FETCH'
export const KMS_SEARCHING_AND_REDIRECT_FETCH_SUCCESS = 'kmsSearching/KMS_SEARCHING_AND_REDIRECT_FETCH_SUCCESS'
export const KMS_SEARCHING_AND_REDIRECT_FETCH_ERROR = 'kmsSearching/KMS_SEARCHING_AND_REDIRECT_FETCH_ERROR'
export const KMS_SEARCHING_AND_REDIRECT_FETCH_FAILURE = 'kmsSearching/KMS_SEARCHING_AND_REDIRECT_FETCH_FAILURE'

const initialState = {
  kmsSearchingResults: [],
  isKmsSearchingLoading: false,
  isKmsSearchingError: false,
  errorMessage: ''
}

export const searchInKms = createAction(KMS_SEARCHING_FETCH)
export const searchInKmsAndRedirect = createAction(KMS_SEARCHING_AND_REDIRECT_FETCH)
export const resetKmsSearchingResults = createAction(RESET_KMS_SEARCHING_RESULTS)

export default handleActions(
  {
    // search In Kms
    [KMS_SEARCHING_FETCH]: state => ({
      ...state,
      kmsSearchingResults: [],
      isKmsSearchingLoading: true,
      isKmsSearchingError: false,
      errorMessage: ''
    }),
    [combineActions(KMS_SEARCHING_FETCH_SUCCESS, KMS_SEARCHING_AND_REDIRECT_FETCH_SUCCESS)]:
    (state, { payload }) => ({
      ...state,
      kmsSearchingResults: payload,
      isKmsSearchingLoading: false
    }),
    [combineActions(KMS_SEARCHING_FETCH_ERROR, KMS_SEARCHING_AND_REDIRECT_FETCH_ERROR)]:
    (state, { payload }) => ({
      ...state,
      isKmsSearchingLoading: false,
      isKmsSearchingError: true,
      errorMessage: payload
    }),
    [combineActions(KMS_SEARCHING_FETCH_FAILURE, KMS_SEARCHING_AND_REDIRECT_FETCH_FAILURE)]:
    (state, message) => ({
      ...state,
      isKmsSearchingLoading: false,
      isKmsSearchingError: true,
      errorMessage: message
    }),
    [KMS_SEARCHING_AND_REDIRECT_FETCH]: state => ({
      kmsSearchingResults: [],
      isKmsSearchingLoading: true,
      isKmsSearchingError: false,
      errorMessage: ''
    }),
    [RESET_KMS_SEARCHING_RESULTS]: () => initialState
  },
  initialState
)
