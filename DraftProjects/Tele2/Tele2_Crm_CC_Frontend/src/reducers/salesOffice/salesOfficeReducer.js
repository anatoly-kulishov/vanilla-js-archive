import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'

export const GET_ACTIVE_SALES_OFFICE = 'salesOffice/GET_ACTIVE_SALES_OFFICE'
export const GET_ACTIVE_SALES_OFFICE_SUCCESS = 'salesOffice/GET_ACTIVE_SALES_OFFICE_SUCCESS'
export const GET_ACTIVE_SALES_OFFICE_ERROR = 'salesOffice/GET_ACTIVE_SALES_OFFICE_ERROR'

export const SET_STEP_OF_CHANGING_ACTIVE_SALES_OFFICE = 'salesOffice/SET_STEP_OF_CHANGING_ACTIVE_SALES_OFFICE'

export const GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO = 'salesOffice/GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO'
export const GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO_SUCCESS = 'salesOffice/GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO_SUCCESS'
export const GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO_ERROR = 'salesOffice/GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO_ERROR'

export const CHANGE_ACTIVE_SALES_OFFICE = 'salesOffice/CHANGE_ACTIVE_SALES_OFFICE'
export const CHANGE_ACTIVE_SALES_OFFICE_SUCCESS = 'salesOffice/CHANGE_ACTIVE_SALES_OFFICE_SUCCESS'
export const CHANGE_ACTIVE_SALES_OFFICE_ERROR = 'salesOffice/CHANGE_ACTIVE_SALES_OFFICE_ERROR'

export const RESET_STATE_CHANGING_ACTIVE_SALES_OFFICE = 'salesOffice/RESET_STATE_CHANGING_ACTIVE_SALES_OFFICE'

export const StepOfChangingActiveSalesOffice = {
  NONE: 0,
  DATA_INPUT: 1,
  SUBMIT: 2,
  SUCCESS: 3,
  FAILURE: 4
}

const initialState = {
  activeSalesOffice: null,
  isLoadingGetActiveSalesOffice: false,
  isErrorGetActiveSalesOffice: false,

  stepOfChangingActiveSalesOffice: StepOfChangingActiveSalesOffice.NONE,

  potentialActiveSalesOfficeInfo: null,
  isLoadingGetPotentialActiveSalesOffice: false,
  errorGetPotentialActiveSalesOffice: null,

  isLoadingChangeActiveSalesOffice: false,
  errorChangeActiveSalesOffice: null
}

export const getActiveSalesOffice = createAction(GET_ACTIVE_SALES_OFFICE)
export const getActiveSalesOfficeSuccess = createAction(GET_ACTIVE_SALES_OFFICE_SUCCESS)
export const getActiveSalesOfficeError = createAction(GET_ACTIVE_SALES_OFFICE_ERROR)

export const setStepOfChangingActiveSalesOffice = createAction(SET_STEP_OF_CHANGING_ACTIVE_SALES_OFFICE)

export const getPotentialActiveSalesOfficeInfo = createAction(GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO)
export const getPotentialActiveSalesOfficeInfoSuccess = createAction(GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO_SUCCESS)
export const getPotentialActiveSalesOfficeInfoError = createAction(GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO_ERROR)

export const changeActiveSalesOffice = createAction(CHANGE_ACTIVE_SALES_OFFICE)
export const changeActiveSalesOfficeSuccess = createAction(CHANGE_ACTIVE_SALES_OFFICE_SUCCESS)
export const changeActiveSalesOfficeError = createAction(CHANGE_ACTIVE_SALES_OFFICE_ERROR)

export const resetStateChangingActiveSalesOffice = createAction(RESET_STATE_CHANGING_ACTIVE_SALES_OFFICE)

export default handleActions({
  [GET_ACTIVE_SALES_OFFICE]: produce((state) => {
    state.isLoadingGetActiveSalesOffice = true
    state.isErrorGetActiveSalesOffice = false
  }),
  [GET_ACTIVE_SALES_OFFICE_SUCCESS]: produce((state, { payload }) => {
    state.activeSalesOffice = payload
    state.isLoadingGetActiveSalesOffice = false
  }),
  [GET_ACTIVE_SALES_OFFICE_ERROR]: produce((state) => {
    state.isLoadingGetActiveSalesOffice = false
    state.isErrorGetActiveSalesOffice = true
  }),

  [SET_STEP_OF_CHANGING_ACTIVE_SALES_OFFICE]: produce((state, { payload }) => {
    state.stepOfChangingActiveSalesOffice = payload
  }),

  [GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO]: produce((state) => {
    state.isLoadingGetPotentialActiveSalesOffice = true
    state.errorGetPotentialActiveSalesOffice = null
  }),
  [GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO_SUCCESS]: produce((state, { payload }) => {
    state.isLoadingGetPotentialActiveSalesOffice = false
    state.potentialActiveSalesOfficeInfo = payload
    state.stepOfChangingActiveSalesOffice = StepOfChangingActiveSalesOffice.SUBMIT
  }),
  [GET_POTENTIAL_ACTIVE_SALES_OFFICE_INFO_ERROR]: produce((state, { payload }) => {
    state.isLoadingGetPotentialActiveSalesOffice = false
    state.errorGetPotentialActiveSalesOffice = payload
  }),

  [CHANGE_ACTIVE_SALES_OFFICE]: produce((state) => {
    state.isLoadingChangeActiveSalesOffice = true
  }),
  [CHANGE_ACTIVE_SALES_OFFICE_SUCCESS]: produce((state, { payload }) => {
    state.activeSalesOffice = payload
    state.isLoadingChangeActiveSalesOffice = false
    state.stepOfChangingActiveSalesOffice = StepOfChangingActiveSalesOffice.SUCCESS
  }),
  [CHANGE_ACTIVE_SALES_OFFICE_ERROR]: produce((state, { payload }) => {
    state.isLoadingChangeActiveSalesOffice = false
    state.errorChangeActiveSalesOffice = payload
    state.stepOfChangingActiveSalesOffice = StepOfChangingActiveSalesOffice.FAILURE
  }),

  [RESET_STATE_CHANGING_ACTIVE_SALES_OFFICE]: produce((state) => {
    state.potentialActiveSalesOfficeInfo = null
    state.errorGetPotentialActiveSalesOffice = null
    state.errorChangeActiveSalesOffice = null
  })
}, initialState)
