import produce from 'immer'
import { combineActions, createAction, handleActions } from 'redux-actions'

export const GET_SCAN_FILES = 'mnp/GET_SCAN_FILES'
export const GET_SCAN_FILES_SUCCESS = 'mnp/GET_SCAN_FILES_SUCCESS'
export const GET_SCAN_FILES_ERROR = 'mnp/GET_SCAN_FILES_ERROR'
export const GET_SCAN_FILES_FAILURE = 'mnp/GET_SCAN_FILES_FAILURE'

export const GET_RECOGNITION_VALUES = 'mnp/GET_RECOGNITION_VALUES'
export const GET_RECOGNITION_VALUES_SUCCESS = 'mnp/GET_RECOGNITION_VALUES_SUCCESS'
export const GET_RECOGNITION_VALUES_ERROR = 'mnp/GET_RECOGNITION_VALUES_ERROR'
export const GET_RECOGNITION_VALUES_FAILURE = 'mnp/GET_RECOGNITION_VALUES_FAILURE'

export const UPDATE_RECOGNITION_VALUES = 'mnp/UPDATE_RECOGNITION_VALUES'
export const UPDATE_RECOGNITION_VALUES_SUCCESS = 'mnp/UPDATE_RECOGNITION_VALUES_SUCCESS'
export const UPDATE_RECOGNITION_VALUES_ERROR = 'mnp/UPDATE_RECOGNITION_VALUES_ERROR'
export const UPDATE_RECOGNITION_VALUES_FAILURE = 'mnp/UPDATE_RECOGNITION_VALUES_FAILURE'

const initialState = {
  mnpScanFiles: [],
  isMnpScanFilesLoading: false,
  mnpScanFilesError: '',
  isMnpScanFilesError: false,

  recognitionValues: [],
  isRecognitionValuesLoading: false,
  recognitionValuesError: '',
  isRecognitionValuesError: false,

  isUpdateRecognitionValuesLoading: false,
  updateRecognitionValuesError: '',
  isUpdateRecognitionValuesError: false
}

export const getScanFiles = createAction(GET_SCAN_FILES)
export const getRecognitionValues = createAction(GET_RECOGNITION_VALUES)
export const updateRecognitionValues = createAction(UPDATE_RECOGNITION_VALUES)

export default handleActions({
  [GET_SCAN_FILES]: produce(state => {
    state.isMnpScanFilesLoading = true
  }),
  [GET_SCAN_FILES_SUCCESS]: produce((state, { payload }) => {
    state.mnpScanFiles = payload
    state.isMnpScanFilesLoading = false
  }),
  [combineActions(GET_SCAN_FILES_ERROR, GET_SCAN_FILES_FAILURE)]: produce((state, { payload }) => {
    state.isMnpScanFilesError = true
    state.mnpScanFilesError = payload
    state.isMnpScanFilesLoading = false
  }),

  [GET_RECOGNITION_VALUES]: produce(state => {
    state.isRecognitionValuesLoading = true
  }),
  [GET_RECOGNITION_VALUES_SUCCESS]: produce((state, { payload }) => {
    state.recognitionValues = payload
    state.isRecognitionValuesLoading = false
  }),
  [combineActions(GET_RECOGNITION_VALUES_ERROR, GET_RECOGNITION_VALUES_FAILURE)]: produce((state, { payload }) => {
    state.isRecognitionValuesError = true
    state.recognitionValuesError = payload
    state.isRecognitionValuesLoading = false
  }),

  [UPDATE_RECOGNITION_VALUES]: produce(state => {
    state.isUpdateRecognitionValuesLoading = true
  }),
  [UPDATE_RECOGNITION_VALUES_SUCCESS]: produce((state) => {
    state.isUpdateRecognitionValuesLoading = false
  }),
  [combineActions(UPDATE_RECOGNITION_VALUES_ERROR, UPDATE_RECOGNITION_VALUES_FAILURE)]: produce((state, { payload }) => {
    state.isUpdateRecognitionValuesError = true
    state.updateRecognitionValuesError = payload
    state.isUpdateRecognitionValuesLoading = false
  })
}, initialState)
