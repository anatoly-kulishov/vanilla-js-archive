import produce from 'immer'
import { createAction, handleActions, combineActions } from 'redux-actions'

export const FETCH_TARIFF_INFO_PREVIEW = 'tariffInfo/FETCH_TARIFF_INFO_PREVIEW'
export const FETCH_TARIFF_INFO_PREVIEW_SUCCESS = 'tariffInfo/FETCH_TARIFF_INFO_PREVIEW_SUCCESS'
export const FETCH_TARIFF_INFO_PREVIEW_ERROR = 'tariffInfo/FETCH_TARIFF_INFO_PREVIEW_ERROR'
export const FETCH_TARIFF_INFO_PREVIEW_FAILURE = 'tariffInfo/FETCH_TARIFF_INFO_PREVIEW_FAILURE'

const initialState = {

  tariffInfoPreview: null,
  tariffInfoPreviewError: false,
  tariffInfoPreviewLoading: false

}

export const fetchTariffInfoPreview = createAction(FETCH_TARIFF_INFO_PREVIEW)

export default handleActions({
  [FETCH_TARIFF_INFO_PREVIEW]: produce((state) => {
    state.tariffInfoPreview = null
    state.tariffInfoPreviewError = false
    state.tariffInfoPreviewLoading = true
  }),

  [FETCH_TARIFF_INFO_PREVIEW_SUCCESS]: produce((state, { payload }) => {
    state.tariffInfoPreview = payload
    state.tariffInfoPreviewError = false
    state.tariffInfoPreviewLoading = false
  }),

  [combineActions(FETCH_TARIFF_INFO_PREVIEW_ERROR, FETCH_TARIFF_INFO_PREVIEW_FAILURE)]: produce((state) => {
    state.tariffInfoPreview = null
    state.tariffInfoPreviewError = true
    state.tariffInfoPreviewLoading = false
  })
}, initialState)
