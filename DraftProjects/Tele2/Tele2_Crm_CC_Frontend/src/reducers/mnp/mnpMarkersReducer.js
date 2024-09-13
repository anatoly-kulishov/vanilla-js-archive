import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const GET_WEBSELLER_MARKERS = 'mnp/GET_WEBSELLER_MARKERS'
export const GET_WEBSELLER_MARKERS_SUCCESS = 'mnp/GET_WEBSELLER_MARKERS_SUCCESS'
export const GET_WEBSELLER_MARKERS_ERROR = 'mnp/GET_WEBSELLER_MARKERS_ERROR'

export const SET_CORRECTION_DATA_MARKER = 'mnp/SET_CORRECTION_DATA_MARKER'
export const SET_HAS_REQUIRED_MARKERS = 'mnp/SET_HAS_REQUIRED_MARKERS'

export const FETCH_MARKERS = 'mnp/FETCH_MARKERS'
export const FETCH_MARKERS_SUCCESS = 'mnp/FETCH_MARKERS_SUCCESS'
export const FETCH_MARKERS_ERROR = 'mnp/FETCH_MARKERS_ERROR'
export const FETCH_MARKERS_FAILURE = 'mnp/FETCH_MARKERS_FAILURE'

export const GET_MARKER_MNP = 'mnp/GET_MARKER_MNP'
export const GET_MARKER_MNP_SUCCESS = 'mnp/GET_MARKER_MNP_SUCCESS'
export const GET_MARKER_MNP_ERROR = 'mnp/GET_MARKER_MNP_ERROR'
export const GET_MARKER_MNP_FAILURE = 'mnp/GET_MARKER_MNP_FAILURE'

export const GET_MARKER_TARIFF_HOLD = 'mnp/GET_MARKER_TARIFF_HOLD'
export const GET_MARKER_TARIFF_HOLD_SUCCESS = 'mnp/GET_MARKER_TARIFF_HOLD_SUCCESS'
export const GET_MARKER_TARIFF_HOLD_ERROR = 'mnp/GET_MARKER_TARIFF_HOLD_ERROR'
export const GET_MARKER_TARIFF_HOLD_FAILURE = 'mnp/GET_MARKER_TARIFF_HOLD_FAILURE'

export const getWebSellerMarkers = createAction(GET_WEBSELLER_MARKERS)
export const getWebSellerMarkersSuccess = createAction(GET_WEBSELLER_MARKERS_SUCCESS)
export const getWebSellerMarkersError = createAction(GET_WEBSELLER_MARKERS_ERROR)

export const setCorrectionDataMarker = createAction(SET_CORRECTION_DATA_MARKER)
export const setHasRequiredMarkers = createAction(SET_HAS_REQUIRED_MARKERS)
export const fetchMarkers = createAction(FETCH_MARKERS)
export const fetchMarkersSuccess = createAction(FETCH_MARKERS_SUCCESS)
export const fetchMarkersError = createAction(FETCH_MARKERS_ERROR)
export const getMarkerMnp = createAction(GET_MARKER_MNP)
export const getMarkerTariffHold = createAction(GET_MARKER_TARIFF_HOLD)

const initialState = {
  // Маркеры загружаются при старте, но они не первые в очереди запросов
  isLoadedWebSellerMarkers: false,

  hasCorrectionDataMarker: false,
  hasRequiredMarkers: false,

  mnpMarkers: null,
  isMnpMarkersLoading: false,
  mnpMarkersError: '',

  markerMnp: null,
  isMarkerMnpLoading: false,
  markerMnpError: '',

  markerTariff: null,
  isMarkerTariffLoading: false,
  markerTariffError: ''
}

export default handleActions(
  {
    [combineActions(GET_WEBSELLER_MARKERS_SUCCESS, GET_WEBSELLER_MARKERS_ERROR)]: produce((state) => {
      state.isLoadedWebSellerMarkers = true
    }),

    [SET_CORRECTION_DATA_MARKER]: produce((state, { payload }) => {
      if (typeof payload === 'boolean') {
        state.hasCorrectionDataMarker = payload
      }
    }),
    [SET_HAS_REQUIRED_MARKERS]: produce((state, { payload }) => {
      if (typeof payload === 'boolean') {
        state.hasRequiredMarkers = payload
      }
    }),
    [FETCH_MARKERS]: produce((state, action) => {
      state.isMnpMarkersLoading = true
    }),
    [FETCH_MARKERS_SUCCESS]: produce((state, { payload }) => {
      state.mnpMarkers = payload
      state.isMnpMarkersLoading = false
    }),
    [combineActions(FETCH_MARKERS_ERROR, FETCH_MARKERS_FAILURE)]: produce((state, { payload }) => {
      state.mnpMarkersError = payload
      state.isMnpMarkersLoading = false
    }),

    [GET_MARKER_MNP]: produce(state => {
      state.isMarkerMnpLoading = true
    }),
    [GET_MARKER_MNP_SUCCESS]: produce((state, { payload }) => {
      state.isMarkerMnpLoading = false
      state.markerMnp = payload
    }),
    [combineActions(GET_MARKER_MNP_ERROR, GET_MARKER_MNP_FAILURE)]: produce((state, { payload }) => {
      state.isMarkerMnpLoading = false
      state.markerMnpError = payload
    }),

    [GET_MARKER_TARIFF_HOLD]: produce(state => {
      state.isMarkerTariffLoading = true
    }),
    [GET_MARKER_TARIFF_HOLD_SUCCESS]: produce((state, { payload }) => {
      state.isMarkerTariffLoading = false
      state.markerTariff = payload
    }),
    [combineActions(GET_MARKER_TARIFF_HOLD_ERROR, GET_MARKER_TARIFF_HOLD_FAILURE)]: produce((state, { payload }) => {
      state.isMarkerTariffLoading = false
      state.markerTariffError = payload
    })
  },
  initialState
)
