import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const FETCH_COVERAGES_AND_OFFICES = 'diagnostics/FETCH_COVERAGES_AND_OFFICES'
export const FETCH_COVERAGES_AND_OFFICES_SUCCESS = 'diagnostics/FETCH_COVERAGES_AND_OFFICES_SUCCESS'
export const FETCH_COVERAGES_AND_OFFICES_ERROR = 'diagnostics/FETCH_COVERAGES_AND_OFFICES_ERROR'
export const FETCH_COVERAGES_AND_OFFICES_FAILURE = 'diagnostics/FETCH_COVERAGES_AND_OFFICES_FAILURE'

export const FETCH_ABONENT_COORDINATES = 'diagnostics/FETCH_ABONENT_COORDINATES'
export const FETCH_ABONENT_COORDINATES_SUCCESS = 'diagnostics/FETCH_ABONENT_COORDINATES_SUCCESS'
export const FETCH_ABONENT_COORDINATES_ERROR = 'diagnostics/FETCH_ABONENT_COORDINATES_ERROR'
export const FETCH_ABONENT_COORDINATES_FAILURE = 'diagnostics/FETCH_ABONENT_COORDINATES_FAILURE'

export const FETCH_TECHNOLOGY_SUBTECHNOLOGY_LINK = 'diagnostics/FETCH_TECHNOLOGY_SUBTECHNOLOGY_LINK'
export const FETCH_TECHNOLOGY_SUBTECHNOLOGY_LINK_SUCCESS = 'diagnostics/FETCH_TECHNOLOGY_SUBTECHNOLOGY_LINK_SUCCESS'
export const FETCH_TECHNOLOGY_SUBTECHNOLOGY_LINK_ERROR = 'diagnostics/FETCH_TECHNOLOGY_SUBTECHNOLOGY_LINK_ERROR'
export const FETCH_TECHNOLOGY_SUBTECHNOLOGY_LINK_FAILURE = 'diagnostics/FETCH_TECHNOLOGY_SUBTECHNOLOGY_LINK_FAILURE'

export const FETCH_PARAMETERS = 'diagnostics/FETCH_PARAMETERS'
export const FETCH_PARAMETERS_SUCCESS = 'diagnostics/FETCH_PARAMETERS_SUCCESS'
export const FETCH_PARAMETERS_ERROR = 'diagnostics/FETCH_PARAMETERS_ERROR'
export const FETCH_PARAMETERS_FAILURE = 'diagnostics/FETCH_PARAMETERS_FAILURE'

export const FETCH_DEVIATION_LEVEL = 'diagnostics/FETCH_DEVIATION_LEVEL'
export const FETCH_DEVIATION_LEVEL_SUCCESS = 'diagnostics/FETCH_DEVIATION_LEVEL_SUCCESS'
export const FETCH_DEVIATION_LEVEL_ERROR = 'diagnostics/FETCH_DEVIATION_LEVEL_ERROR'
export const FETCH_DEVIATION_LEVEL_FAILURE = 'diagnostics/FETCH_DEVIATION_LEVEL_FAILURE'

export const REDIRECT_TO_SMART_GIS = 'diagnostics/REDIRECT_TO_SMART_GIS'

const initialState = {
  coverageInfo: [],
  coverageData: {
    flagMp: [],
    flagFaults: [],
    flagPw: [],
    flagSpa: [],
    flagPoi: []
  },

  coveragesAndOffices: {
    flagMp: [],
    flagFaults: [],
    flagPw: [],
    flagCoverage: [],
    flagSpa: [],
    flagPoi: [],
    flagCrm: []
  },

  technologiesGroups: null,
  parameters: null,

  abonentCoordinates: {
    latitude: null,
    longitude: null,
    address: null
  },
  deviationData: {
    deviation: null,
    deviationLevel: null
  },

  isAbonentCoordinatesLoading: false,
  isCoveragesAndOfficesLoading: false,
  isTechnologiesGroupsLoading: false,
  isParametersLoading: false,
  isDeviationDataLoading: false,

  diagnosticsError: ''
}

export const fetchCoveragesAndOffices = createAction(FETCH_COVERAGES_AND_OFFICES)
export const fetchAbonentCoordinates = createAction(FETCH_ABONENT_COORDINATES)
export const fetchParameters = createAction(FETCH_PARAMETERS)
export const redirectToSmartGis = createAction(REDIRECT_TO_SMART_GIS)
export const fetchTechnologySubtechnologyLink = createAction(FETCH_TECHNOLOGY_SUBTECHNOLOGY_LINK)
export const fetchDeviationLevel = createAction(FETCH_DEVIATION_LEVEL)

export default handleActions(
  {
    [FETCH_COVERAGES_AND_OFFICES]: produce((state, action) => {
      state.isCoveragesAndOfficesLoading = true
      state.coverageInfo = []
    }),
    [FETCH_COVERAGES_AND_OFFICES_SUCCESS]: produce((state, { payload }) => {
      state.coveragesAndOffices = { ...state.coveragesAndOffices, ...payload }
      state.isCoveragesAndOfficesLoading = false
    }),

    [FETCH_ABONENT_COORDINATES]: produce((state, action) => {
      state.abonentCoordinates = {}
      state.deviationData = {}
      state.isAbonentCoordinatesLoading = true
      state.isDeviationDataLoading = true
    }),
    [FETCH_ABONENT_COORDINATES_SUCCESS]: produce((state, { payload: { locationData, deviationData } }) => {
      state.abonentCoordinates = locationData
      state.deviationData = deviationData
      state.isAbonentCoordinatesLoading = false
      state.isDeviationDataLoading = false
    }),

    [FETCH_TECHNOLOGY_SUBTECHNOLOGY_LINK]: produce((state, action) => {
      state.isTechnologiesGroupsLoading = true
    }),
    [FETCH_TECHNOLOGY_SUBTECHNOLOGY_LINK_SUCCESS]: produce((state, { payload }) => {
      state.technologiesGroups = payload
      state.isTechnologiesGroupsLoading = false
    }),

    [FETCH_PARAMETERS]: produce((state, action) => {
      state.isParametersLoading = true
    }),
    [FETCH_PARAMETERS_SUCCESS]: produce((state, { payload }) => {
      state.parameters = payload
      state.isParametersLoading = false
    }),

    [FETCH_DEVIATION_LEVEL_SUCCESS]: produce((state, action) => {
      state.isDeviationDataLoading = true
    }),

    [FETCH_DEVIATION_LEVEL_SUCCESS]: produce((state, { payload }) => {
      state.deviationData = payload
      state.isDeviationDataLoading = false
    }),

    [REDIRECT_TO_SMART_GIS]: produce((state, action) => {}),

    // eslint-disable-next-line standard/computed-property-even-spacing
    [combineActions(
      FETCH_COVERAGES_AND_OFFICES_ERROR,
      FETCH_COVERAGES_AND_OFFICES_FAILURE,
      FETCH_ABONENT_COORDINATES_ERROR,
      FETCH_ABONENT_COORDINATES_FAILURE,
      FETCH_TECHNOLOGY_SUBTECHNOLOGY_LINK_ERROR,
      FETCH_TECHNOLOGY_SUBTECHNOLOGY_LINK_FAILURE,
      FETCH_PARAMETERS_ERROR,
      FETCH_PARAMETERS_FAILURE,
      FETCH_DEVIATION_LEVEL_ERROR,
      FETCH_DEVIATION_LEVEL_FAILURE
    )]: produce((state, { payload }) => {
      state.diagnosticsError = payload
      state.isCoveragesAndOfficesLoading = false
      state.isAbonentCoordinatesLoading = false
      state.isTechnologiesGroupsLoading = false
      state.isDeviationDataLoading = false
    })
  },
  initialState
)
