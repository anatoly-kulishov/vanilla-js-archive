import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const VALIDATE_PAYD_SERVICE_AVAILABLE = 'compensation/VALIDATE_PAYD_SERVICE_AVAILABLE'
export const VALIDATE_PAYD_SERVICE_AVAILABLE_SUCCESS = 'compensation/VALIDATE_PAYD_SERVICE_AVAILABLE_SUCCESS'
export const VALIDATE_PAYD_SERVICE_AVAILABLE_ERROR = 'compensation/VALIDATE_PAYD_SERVICE_AVAILABLE_ERROR'
export const VALIDATE_PAYD_SERVICE_AVAILABLE_FAILURE = 'compensation/VALIDATE_PAYD_SERVICE_AVAILABLE_FAILURE'

export const VALIDATE_PAYD_SERVICE_HISTORY = 'compensation/VALIDATE_PAYD_SERVICE_HISTORY'
export const VALIDATE_PAYD_SERVICE_HISTORY_SUCCESS = 'compensation/VALIDATE_PAYD_SERVICE_HISTORY_SUCCESS'
export const VALIDATE_PAYD_SERVICE_HISTORY_ERROR = 'compensation/VALIDATE_PAYD_SERVICE_HISTORY_ERROR'
export const VALIDATE_PAYD_SERVICE_HISTORY_FAILURE = 'compensation/VALIDATE_PAYD_SERVICE_HISTORY_FAILURE'

export const VALIDATE_PAYD_SERVICE_ENABLED = 'compensation/VALIDATE_PAYD_SERVICE_ENABLED'
export const VALIDATE_PAYD_SERVICE_ENABLED_SUCCESS = 'compensation/VALIDATE_PAYD_SERVICE_ENABLED_SUCCESS'
export const VALIDATE_PAYD_SERVICE_ENABLED_ERROR = 'compensation/VALIDATE_PAYD_SERVICE_ENABLED_ERROR'
export const VALIDATE_PAYD_SERVICE_ENABLED_FAILURE = 'compensation/VALIDATE_PAYD_SERVICE_ENABLED_FAILURE'

export const ADD_SERVICE_COMPENSATION = 'compensation/ADD_SERVICE_COMPENSATION'
export const ADD_SERVICE_COMPENSATION_SUCCESS = 'compensation/ADD_SERVICE_COMPENSATION_SUCCESS'
export const ADD_SERVICE_COMPENSATION_ERROR = 'compensation/ADD_SERVICE_COMPENSATION_ERROR'
export const ADD_SERVICE_COMPENSATION_FAILURE = 'compensation/ADD_SERVICE_COMPENSATION_FAILURE'

export const GET_MARGIN_SERVICE_TYPE_RELATE = 'compensations/GET_MARGIN_SERVICE_TYPE_RELATE'
export const GET_MARGIN_SERVICE_TYPE_RELATE_SUCCESS = 'compensations/GET_MARGIN_SERVICE_TYPE_RELATE_SUCCESS'
export const GET_MARGIN_SERVICE_TYPE_RELATE_ERROR = 'compensations/GET_MARGIN_SERVICE_TYPE_RELATE_ERROR'
export const GET_MARGIN_SERVICE_TYPE_RELATE_FAILURE = 'compensations/GET_MARGIN_SERVICE_TYPE_RELATE_FAILURE'

export const GET_MARGIN_SERVICE_SIZE_RELATE = 'compensations/GET_MARGIN_SERVICE_SIZE_RELATE'
export const GET_MARGIN_SERVICE_SIZE_RELATE_SUCCESS = 'compensations/GET_MARGIN_SERVICE_SIZE_RELATE_SUCCESS'
export const GET_MARGIN_SERVICE_SIZE_RELATE_ERROR = 'compensations/GET_MARGIN_SERVICE_SIZE_RELATE_ERROR'
export const GET_MARGIN_SERVICE_SIZE_RELATE_FAILURE = 'compensations/GET_MARGIN_SERVICE_SIZE_RELATE_FAILURE'

export const COMPENSATION_FORM_PACKAGE_SUCCESS = 'compensation/COMPENSATION_FORM_PACKAGE_SUCCESS'
export const COMPENSATION_FORM_PACKAGE_WARNING = 'compensation/COMPENSATION_FORM_PACKAGE_WARNING'
export const COMPENSATION_FORM_PACKAGE_ERROR = 'compensation/COMPENSATION_FORM_PACKAGE_ERROR'
export const COMPENSATION_FORM_PACKAGE_FAILURE = 'compensation/COMPENSATION_FORM_PACKAGE_FAILURE'

export const validatePaydServiceAvailable = createAction(VALIDATE_PAYD_SERVICE_AVAILABLE)
export const validatePaydServiceHistory = createAction(VALIDATE_PAYD_SERVICE_HISTORY)
export const validatePaydServiceEnabled = createAction(VALIDATE_PAYD_SERVICE_ENABLED)

export const addServiceCompensation = createAction(ADD_SERVICE_COMPENSATION)

export const getMarginServiceTypeRelate = createAction(GET_MARGIN_SERVICE_TYPE_RELATE)
export const getMarginServiceSizeRelate = createAction(GET_MARGIN_SERVICE_SIZE_RELATE)

const emptyError = {
  data: '',
  createdOn: null,
  shouldDisable: false
}

const initialState = {
  packages: {
    data: [],
    isLoading: false,
    error: emptyError
  },

  paydServiceHistory: {
    data: {},
    isLoading: false,
    error: emptyError
  },

  paydServiceEnabled: {
    data: {},
    isLoading: false,
    error: emptyError
  },

  serviceCompensation: {
    data: {},
    isLoading: false,
    error: emptyError
  },

  marginServiceTypeRelate: {
    data: [],
    isLoading: false,
    error: emptyError
  },

  marginServiceSizeRelate: {
    data: [],
    isLoading: false,
    error: emptyError
  },

  compensationFormPackage: {
    data: [],
    error: emptyError
  }
}

export default handleActions({
  [VALIDATE_PAYD_SERVICE_AVAILABLE]: produce((state, action) => {
    state.packages.isLoading = true
    state.packages.error = emptyError
  }),
  [VALIDATE_PAYD_SERVICE_AVAILABLE_SUCCESS]: produce((state, { payload }) => {
    state.packages.data = payload.data
    state.packages.isLoading = false
    if (payload.error) state.packages.error = payload.error
  }),
  [combineActions(VALIDATE_PAYD_SERVICE_AVAILABLE_ERROR, VALIDATE_PAYD_SERVICE_AVAILABLE_FAILURE)]:
  produce((state, { payload }) => {
    state.packages.data = []
    state.packages.isLoading = false
    if (payload.error) state.packages.error = payload.error
  }),

  [VALIDATE_PAYD_SERVICE_HISTORY]: produce((state, action) => {
    state.paydServiceHistory.isLoading = true
    state.paydServiceHistory.error = emptyError
  }),
  [VALIDATE_PAYD_SERVICE_HISTORY_SUCCESS]: produce((state, { payload }) => {
    state.paydServiceHistory.data = payload.data
    state.paydServiceHistory.isLoading = false
    if (payload.error) state.paydServiceHistory.error = payload.error
  }),
  [combineActions(VALIDATE_PAYD_SERVICE_HISTORY_ERROR, VALIDATE_PAYD_SERVICE_HISTORY_FAILURE)]:
  produce((state, { payload }) => {
    state.paydServiceHistory.isLoading = false
    if (payload.error) state.paydServiceHistory.error = payload.error
  }),

  [VALIDATE_PAYD_SERVICE_ENABLED]: produce((state, action) => {
    state.paydServiceEnabled.isLoading = true
    state.paydServiceEnabled.error = emptyError
  }),
  [VALIDATE_PAYD_SERVICE_ENABLED_SUCCESS]: produce((state, { payload }) => {
    state.paydServiceEnabled.data = payload.data
    state.paydServiceEnabled.isLoading = false
    if (payload.error) state.paydServiceEnabled.error = payload.error
  }),
  [combineActions(VALIDATE_PAYD_SERVICE_ENABLED_ERROR, VALIDATE_PAYD_SERVICE_ENABLED_FAILURE)]:
  produce((state, { payload }) => {
    state.paydServiceEnabled.isLoading = false
    if (payload.error) state.paydServiceEnabled.error = payload.error
  }),

  [ADD_SERVICE_COMPENSATION]: produce((state, action) => {
    state.serviceCompensation.isLoading = true
    state.serviceCompensation.error = emptyError
  }),
  [ADD_SERVICE_COMPENSATION_SUCCESS]: produce((state, { payload }) => {
    state.serviceCompensation.data = payload.data
    state.serviceCompensation.isLoading = false
    if (payload.error) state.serviceCompensation.error = payload.error
  }),
  [combineActions(ADD_SERVICE_COMPENSATION_ERROR, ADD_SERVICE_COMPENSATION_FAILURE)]:
  produce((state, { payload }) => {
    state.serviceCompensation.isLoading = false
    if (payload.error) state.serviceCompensation.error = payload.error
  }),

  [COMPENSATION_FORM_PACKAGE_SUCCESS]: produce((state, { payload }) => {
    state.compensationFormPackage.data = payload.data
    if (payload.error) {
      state.compensationFormPackage.error = payload.error
    } else {
      state.compensationFormPackage.error = emptyError
    }
  }),
  [combineActions(COMPENSATION_FORM_PACKAGE_ERROR, COMPENSATION_FORM_PACKAGE_WARNING, COMPENSATION_FORM_PACKAGE_FAILURE)]:
  produce((state, { payload }) => {
    if (payload.error) {
      state.compensationFormPackage.error = payload.error
    } else {
      state.compensationFormPackage.error = emptyError
    }
  }),

  [GET_MARGIN_SERVICE_TYPE_RELATE]: produce(state => {
    state.marginServiceTypeRelate.isLoading = true
    state.marginServiceTypeRelate.error = emptyError
  }),
  [GET_MARGIN_SERVICE_TYPE_RELATE_SUCCESS]: produce((state, { payload }) => {
    state.marginServiceTypeRelate.isLoading = false
    state.marginServiceTypeRelate.data = payload.data
    if (payload.error) state.marginServiceTypeRelate.error = payload.error
  }),
  [combineActions(GET_MARGIN_SERVICE_TYPE_RELATE_ERROR, GET_MARGIN_SERVICE_TYPE_RELATE_FAILURE)]:
  produce((state, { payload }) => {
    state.marginServiceTypeRelate.isLoading = false
    if (payload.error) state.marginServiceTypeRelate.error = payload.error
  }),

  [GET_MARGIN_SERVICE_SIZE_RELATE]: produce(state => {
    state.marginServiceSizeRelate.isLoading = true
    state.marginServiceSizeRelate.error = emptyError
  }),
  [GET_MARGIN_SERVICE_SIZE_RELATE_SUCCESS]: produce((state, { payload }) => {
    state.marginServiceSizeRelate.isLoading = false
    state.marginServiceSizeRelate.data = payload.data
    if (payload.error) state.marginServiceSizeRelate.error = payload.error
  }),
  [combineActions(GET_MARGIN_SERVICE_SIZE_RELATE_ERROR, GET_MARGIN_SERVICE_SIZE_RELATE_FAILURE)]:
  produce((state, { payload }) => {
    state.marginServiceSizeRelate.isLoading = false
    if (payload.error) state.marginServiceSizeRelate.error = payload.error
  })
}, initialState)
