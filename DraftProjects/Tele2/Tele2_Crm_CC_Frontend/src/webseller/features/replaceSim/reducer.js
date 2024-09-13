import { produce } from 'immer'
import { createAction, handleActions } from 'redux-actions'

import { REPLACE_PROCESS_STEPS } from './constants'
import { OperationStatus } from 'webseller/helpers'

export const INIT_REPLACE_SIM_PROCESS = 'replaceSim/INIT_REPLACE_SIM_PROCESS'
export const INIT_REPLACE_SIM_PROCESS_SUCCESS = 'replaceSim/INIT_REPLACE_SIM_PROCESS_SUCCESS'
export const INIT_REPLACE_SIM_PROCESS_ERROR = 'replaceSim/INIT_REPLACE_SIM_PROCESS_ERROR'

export const SET_REPLACING_PROCESS_STEP = 'replaceSim/SET_REPLACING_PROCESS_STEP'
export const SET_DOCUMENT_DATA = 'replaceSim/SET_DOCUMENT_DATA'
export const RESET_REPLACE_SIM_PROCESS = 'replaceSim/RESET_REPLACE_SIM_PROCESS'

export const GET_REPLACE_AVAILABILITY = 'replaceSim/GET_SELL_AVAILABILITY'
export const GET_REPLACE_AVAILABILITY_SUCCESS = 'replaceSim/GET_REPLACE_AVAILABILITY_SUCCESS'
export const GET_REPLACE_AVAILABILITY_ERROR = 'replaceSim/GET_REPLACE_AVAILABILITY_ERROR'

export const SEND_SIM_CHANGES = 'replaceSim/SEND_SIM_CHANGES'
export const SEND_SIM_CHANGES_SUCCESS = 'replaceSim/SEND_SIM_CHANGES_SUCCESS'
export const SEND_SIM_CHANGES_ERROR = 'replaceSim/SEND_SIM_CHANGES_ERROR'

export const GET_SMS_CODE = 'replaceSim/GET_SMS_CODE'
export const CHECK_PEP_CODE = 'replaceSim/CHECK_PEP_CODE'
export const GET_PAPER_DOCUMENTS = 'replaceSim/GET_PAPER_DOCUMENTS'

export const CREATE_INTERACTION = 'replaceSim/CREATE_INTERACTION'

export const initReplaceSimProcess = createAction(INIT_REPLACE_SIM_PROCESS)
export const initReplaceSimProcessSuccess = createAction(INIT_REPLACE_SIM_PROCESS_SUCCESS)
export const initReplaceSimProcessError = createAction(INIT_REPLACE_SIM_PROCESS_ERROR)

export const setReplacingProcessStep = createAction(SET_REPLACING_PROCESS_STEP)
export const resetReplaceSimProcess = createAction(RESET_REPLACE_SIM_PROCESS)
export const setDocumentData = createAction(SET_DOCUMENT_DATA)

export const getReplaceAvailability = createAction(GET_REPLACE_AVAILABILITY)
export const getReplaceAvailabilitySuccess = createAction(GET_REPLACE_AVAILABILITY_SUCCESS)
export const getReplaceAvailabilityError = createAction(GET_REPLACE_AVAILABILITY_ERROR)

export const sendSimChanges = createAction(SEND_SIM_CHANGES)
export const sendSimChangesSuccess = createAction(SEND_SIM_CHANGES_SUCCESS)
export const sendSimChangesError = createAction(SEND_SIM_CHANGES_ERROR)

export const getSmsCode = createAction(GET_SMS_CODE)
export const checkPepCode = createAction(CHECK_PEP_CODE)
export const getPaperDocuments = createAction(GET_PAPER_DOCUMENTS)

export const createInteractionReplaceSim = createAction(CREATE_INTERACTION)

const initialState = {
  isFromMarkers: false,

  replacingProcessStep: REPLACE_PROCESS_STEPS.NONE,
  operationStatus: OperationStatus.NONE,

  isLoadingInitReplaceSim: false,

  documentData: null,

  replaceAvailability: null,
  isReplaceAvailabilityLoading: false,
  isReplaceAvailabilityError: false,

  isSuccessReplaceSim: null,
  isReplaceSimLoading: false,
  isReplaceSimError: false,
  replaceSimErrorMessage: null
}

export default handleActions(
  {
    [INIT_REPLACE_SIM_PROCESS]: produce((state) => {
      state.isLoadingInitReplaceSim = true
    }),
    [INIT_REPLACE_SIM_PROCESS_SUCCESS]: produce((state, { payload }) => {
      const { isFromMarkers } = payload || {}
      if (typeof isFromMarkers === 'boolean') {
        state.isFromMarkers = isFromMarkers
      }
      state.replacingProcessStep = REPLACE_PROCESS_STEPS.SEARCH_VERIFICATION
      state.isLoadingInitReplaceSim = false
    }),
    [INIT_REPLACE_SIM_PROCESS_ERROR]: produce((state) => {
      state.isLoadingInitReplaceSim = false
    }),
    [SET_REPLACING_PROCESS_STEP]: produce((state, { payload }) => {
      state.replacingProcessStep = payload
    }),
    [SET_DOCUMENT_DATA]: produce((state, { payload }) => {
      state.documentData = {
        ...state.documentData,
        ...payload
      }
    }),

    [GET_REPLACE_AVAILABILITY]: produce(state => {
      state.replaceAvailability = null
      state.isReplaceAvailabilityLoading = true
    }),
    [GET_REPLACE_AVAILABILITY_SUCCESS]: produce((state, { payload }) => {
      state.replaceAvailability = payload?.replaceAvailability
      state.isReplaceAvailabilityLoading = false
    }),
    [GET_REPLACE_AVAILABILITY_ERROR]: produce(state => {
      state.isReplaceAvailabilityError = true
      state.isReplaceAvailabilityLoading = false
    }),

    [SEND_SIM_CHANGES]: produce(state => {
      state.operationStatus = OperationStatus.NONE
      state.isSuccessReplaceSim = null
      state.isReplaceSimLoading = true
      state.isReplaceSimError = false
    }),
    [SEND_SIM_CHANGES_SUCCESS]: produce(state => {
      state.operationStatus = OperationStatus.SUCCESSFUL
      state.isSuccessReplaceSim = true
      state.isReplaceSimLoading = false
    }),
    [SEND_SIM_CHANGES_ERROR]: produce((state, { payload }) => {
      state.operationStatus = OperationStatus.FAILURE
      state.replaceSimErrorMessage = payload?.response?.message
      state.isReplaceSimLoading = false
      state.isReplaceSimError = true
    }),

    [RESET_REPLACE_SIM_PROCESS]: produce(state => {
      state.replacingProcessStep = REPLACE_PROCESS_STEPS.NONE
      state.operationStatus = OperationStatus.NONE

      state.replaceAvailability = null
      state.isReplaceAvailabilityLoading = false
      state.isReplaceAvailabilityError = false

      state.isSuccessReplaceSim = false
      state.isReplaceSimLoading = false
      state.isReplaceSimError = false

      state.transmittingPartyData = null
      state.isLoadingTransmittingPartyData = false
    })
  },
  initialState
)
