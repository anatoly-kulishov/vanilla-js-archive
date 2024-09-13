import { produce } from 'immer'
import { createAction, handleActions } from 'redux-actions'
import {
  RecreateClientType,
  StepTypeRecreateClient,
  getNextStepTypeRecreateClient,
  getPrevStepTypeRecreateClient
} from 'webseller/features/recreateClient/helpers'
import { OperationStatus } from 'webseller/helpers'

export const CHANGE_RECREATE_CLIENT_STEP = 'recreateClient/CHANGE_RECREATE_CLIENT_STEP'
export const GO_TO_NEXT_RECREATE_CLIENT_STEP = 'recreateClient/GO_TO_NEXT_RECREATE_CLIENT_STEP'
export const GO_TO_PREV_RECREATE_CLIENT_STEP = 'recreateClient/GO_TO_PREV_RECREATE_CLIENT_STEP'

export const CHANGE_RECREATE_CLIENT_TYPE = 'recreateClient/CHANGE_RECREATE_CLIENT_TYPE'

export const INIT_RECREATE_CLIENT = 'recreateClient/INIT_RECREATE_CLIENT'
export const INIT_RECREATE_CLIENT_SUCCESS = 'recreateClient/INIT_RECREATE_CLIENT_SUCCESS'
export const INIT_RECREATE_CLIENT_ERROR = 'recreateClient/INIT_RECREATE_CLIENT_ERROR'

export const SUBMIT_PARTIES_RELATION = 'recreateClient/SUBMIT_PARTIES_RELATION'

export const GET_TRANSMITTING_PARTY_DATA = 'recreateClient/GET_TRANSMITTING_PARTY_DATA'
export const GET_TRANSMITTING_PARTY_DATA_SUCCESS = 'recreateClient/GET_TRANSMITTING_PARTY_DATA_SUCCESS'
export const GET_TRANSMITTING_PARTY_DATA_ERROR = 'recreateClient/GET_TRANSMITTING_PARTY_DATA_ERROR'
export const SUBMIT_TRANSMITTING_PARTY_DATA = 'recreateClient/SUBMIT_TRANSMITTING_PARTY_DATA'

export const SUBMIT_RECEIVING_PARTY_DATA = 'recreateClient/SUBMIT_RECEIVING_PARTY_DATA'

export const SUBMIT_ADDITIONAL_AGREEMENTS = 'recreateClient/SUBMIT_ADDITIONAL_AGREEMENTS'

export const GET_RECREATE_CLIENT_DOCUMENTS = 'recreateClient/GET_RECREATE_CLIENT_DOCUMENTS'

export const REQUEST_SMS_CODE = 'recreateClient/REQUEST_SMS_CODE'
export const REQUEST_SMS_CODE_SUCCESS = 'recreateClient/REQUEST_SMS_CODE_SUCCESS'
export const REQUEST_SMS_CODE_ERROR = 'recreateClient/REQUEST_SMS_CODE_ERROR'
export const REQUEST_SMS_CODE_FAILURE = 'recreateClient/REQUEST_SMS_CODE_FAILURE'

export const UPDATE_WAITING_TIME_REFRESH_CODE = 'recreateClient/UPDATE_WAITING_TIME_REFRESH_CODE'

export const VERIFY_SMS_CODE = 'recreateClient/VERIFY_SMS_CODE'
export const VERIFY_SMS_CODE_SUCCESS = 'recreateClient/VERIFY_SMS_CODE_SUCCESS'
export const VERIFY_SMS_CODE_ERROR = 'recreateClient/VERIFY_SMS_CODE_ERROR'

export const RECREATE_CLIENT = 'recreateClient/RECREATE_CLIENT'
export const RECREATE_CLIENT_PARTIALLY_SUCCESS = 'recreateClient/RECREATE_CLIENT_PARTIALLY_SUCCESS'
export const RECREATE_CLIENT_SUCCESS = 'recreateClient/RECREATE_CLIENT_SUCCESS'
export const RECREATE_CLIENT_ERROR = 'recreateClient/RECREATE_CLIENT_ERROR'

export const ADD_SIGNED_DOCUMENTS = 'recreateClient/ADD_SIGNED_DOCUMENTS'
export const ADD_SIGNED_DOCUMENTS_ERROR = 'recreateClient/ADD_SIGNED_DOCUMENTS_ERROR'

export const CANCEL_RECREATE_CLIENT_ONLINE = 'recreateClient/CANCEL_RECREATE_CLIENT_ONLINE'

export const RESET_PROCESS_RECREATE_CLIENT = 'recreateClient/RESET_PROCESS_RECREATE_CLIENT'

const initialState = {
  currentStepType: StepTypeRecreateClient.NONE,
  recreateClientType: RecreateClientType.NONE,

  isBeautifulNumber: false,

  operationStatus: OperationStatus.NONE,

  isLoadingInitRecreateClient: false,

  // Parties relation step
  partiesRelation: null,

  // Transmitting party step
  transmittingPartyData: null,
  isLoadingTransmittingPartyData: false,

  // Receiving party step
  receivingPartyData: null,

  // Online availability step
  isLoadingRequestSmsCode: false,
  isLoadingVerifySmsCode: false,
  waitingTimeRefreshSmsCode: 0,

  // Result step
  isLoadingRecreateClient: false,
  errorRecreateClient: null,

  ticketNumber: null,
  serviceRequestId: null
}

export const changeRecreateClientStep = createAction(CHANGE_RECREATE_CLIENT_STEP)
export const goToNextRecreateClientStep = createAction(GO_TO_NEXT_RECREATE_CLIENT_STEP)
export const goToPrevRecreateClientStep = createAction(GO_TO_PREV_RECREATE_CLIENT_STEP)

export const changeRecreateClientType = createAction(CHANGE_RECREATE_CLIENT_TYPE)

export const initRecreateClient = createAction(INIT_RECREATE_CLIENT)
export const initRecreateClientSuccess = createAction(INIT_RECREATE_CLIENT_SUCCESS)
export const initRecreateClientError = createAction(INIT_RECREATE_CLIENT_ERROR)

export const submitPartiesRelation = createAction(SUBMIT_PARTIES_RELATION)

export const getTransmittingPartyData = createAction(GET_TRANSMITTING_PARTY_DATA)
export const getTransmittingPartyDataSuccess = createAction(GET_TRANSMITTING_PARTY_DATA_SUCCESS)
export const getTransmittingPartyDataError = createAction(GET_TRANSMITTING_PARTY_DATA_ERROR)
export const submitTransmittingPartyData = createAction(SUBMIT_TRANSMITTING_PARTY_DATA)

export const submitReceivingPartyData = createAction(SUBMIT_RECEIVING_PARTY_DATA)

export const submitAdditionalAgreements = createAction(SUBMIT_ADDITIONAL_AGREEMENTS)

export const getRecreateClientDocuments = createAction(GET_RECREATE_CLIENT_DOCUMENTS)

export const requestSmsCode = createAction(REQUEST_SMS_CODE)
export const requestSmsCodeSuccess = createAction(REQUEST_SMS_CODE_SUCCESS)
export const requestSmsCodeError = createAction(REQUEST_SMS_CODE_ERROR)
export const requestSmsCodeFailure = createAction(REQUEST_SMS_CODE_FAILURE)

export const updateWaitingTimeRefreshCode = createAction(UPDATE_WAITING_TIME_REFRESH_CODE)

export const verifySmsCode = createAction(VERIFY_SMS_CODE)
export const verifySmsCodeSuccess = createAction(VERIFY_SMS_CODE_SUCCESS)
export const verifySmsCodeError = createAction(VERIFY_SMS_CODE_ERROR)

export const recreateClient = createAction(RECREATE_CLIENT)
export const recreateClientPartiallySuccess = createAction(RECREATE_CLIENT_PARTIALLY_SUCCESS)
export const recreateClientSuccess = createAction(RECREATE_CLIENT_SUCCESS)
export const recreateClientError = createAction(RECREATE_CLIENT_ERROR)

export const addSignedDocumentsRecreateClient = createAction(ADD_SIGNED_DOCUMENTS)
export const addSignedDocumentsRecreateClientError = createAction(ADD_SIGNED_DOCUMENTS_ERROR)

export const cancelRecreateClientOnline = createAction(CANCEL_RECREATE_CLIENT_ONLINE)

export const resetProcessRecreateClient = createAction(RESET_PROCESS_RECREATE_CLIENT)

export default handleActions(
  {
    [CHANGE_RECREATE_CLIENT_STEP]: produce((state, { payload }) => {
      state.currentStepType = payload
    }),
    [GO_TO_NEXT_RECREATE_CLIENT_STEP]: produce(state => {
      state.currentStepType = getNextStepTypeRecreateClient(state)
    }),
    [GO_TO_PREV_RECREATE_CLIENT_STEP]: produce(state => {
      state.currentStepType = getPrevStepTypeRecreateClient(state)
    }),

    [CHANGE_RECREATE_CLIENT_TYPE]: produce((state, { payload }) => {
      state.recreateClientType = payload
    }),

    [INIT_RECREATE_CLIENT]: produce(state => {
      state.isLoadingInitRecreateClient = true
    }),
    [INIT_RECREATE_CLIENT_SUCCESS]: produce((state, { payload }) => {
      state.isLoadingInitRecreateClient = false
      state.recreateClientType = payload.isOnline ? RecreateClientType.ONLINE : RecreateClientType.OFFLINE
      state.isBeautifulNumber = payload.isBeautifulNumber
      state.currentStepType = getNextStepTypeRecreateClient(state)
    }),
    [INIT_RECREATE_CLIENT_ERROR]: produce(state => {
      state.isLoadingInitRecreateClient = false
    }),

    [SUBMIT_PARTIES_RELATION]: produce((state, { payload }) => {
      state.partiesRelation = payload
      state.currentStepType = getNextStepTypeRecreateClient(state)
    }),

    [GET_TRANSMITTING_PARTY_DATA]: produce(state => {
      state.isLoadingTransmittingPartyData = true
    }),
    [GET_TRANSMITTING_PARTY_DATA_SUCCESS]: produce((state, { payload }) => {
      state.isLoadingTransmittingPartyData = false
      state.transmittingPartyData = payload
    }),
    [GET_TRANSMITTING_PARTY_DATA_ERROR]: produce(state => {
      state.isLoadingTransmittingPartyData = false
    }),
    [SUBMIT_TRANSMITTING_PARTY_DATA]: produce((state, { payload }) => {
      if (payload !== null) {
        state.transmittingPartyData = payload
      }
      state.currentStepType = getNextStepTypeRecreateClient(state)
    }),

    [SUBMIT_RECEIVING_PARTY_DATA]: produce((state, { payload }) => {
      state.receivingPartyData = payload
      state.currentStepType = getNextStepTypeRecreateClient(state)
    }),

    [SUBMIT_ADDITIONAL_AGREEMENTS]: produce(state => {
      state.currentStepType = getNextStepTypeRecreateClient(state)
    }),

    [REQUEST_SMS_CODE]: produce(state => {
      state.isLoadingRequestSmsCode = true
    }),
    [REQUEST_SMS_CODE_SUCCESS]: produce((state, { payload }) => {
      state.isLoadingRequestSmsCode = false
      state.waitingTimeRefreshSmsCode = payload || 0
    }),
    [REQUEST_SMS_CODE_ERROR]: produce((state, { payload }) => {
      state.isLoadingRequestSmsCode = false
      state.waitingTimeRefreshSmsCode = payload || 0
    }),
    [REQUEST_SMS_CODE_FAILURE]: produce(state => {
      state.isLoadingRequestSmsCode = false
    }),

    [UPDATE_WAITING_TIME_REFRESH_CODE]: produce((state, { payload }) => {
      state.waitingTimeRefreshSmsCode = payload
    }),

    [VERIFY_SMS_CODE]: produce(state => {
      state.isLoadingVerifySmsCode = true
    }),
    [VERIFY_SMS_CODE_SUCCESS]: produce(state => {
      state.isLoadingVerifySmsCode = false
      state.currentStepType = getNextStepTypeRecreateClient(state)
    }),
    [VERIFY_SMS_CODE_ERROR]: produce(state => {
      state.isLoadingVerifySmsCode = false
    }),

    [RECREATE_CLIENT]: produce(state => {
      state.isLoadingRecreateClient = true
    }),
    [RECREATE_CLIENT_PARTIALLY_SUCCESS]: produce((state, { payload }) => {
      state.isLoadingRecreateClient = false
      state.operationStatus = OperationStatus.PARTIALLY_SUCCESSFUL
      state.ticketNumber = payload.ticketNumber
      state.serviceRequestId = payload.serviceRequestId
    }),
    [RECREATE_CLIENT_SUCCESS]: produce(state => {
      state.isLoadingRecreateClient = false
      state.operationStatus = OperationStatus.SUCCESSFUL
    }),
    [RECREATE_CLIENT_ERROR]: produce((state, { payload }) => {
      state.isLoadingRecreateClient = false
      state.operationStatus = OperationStatus.FAILURE
      state.errorRecreateClient = payload
    }),

    [ADD_SIGNED_DOCUMENTS]: produce(state => {
      state.isLoadingRecreateClient = true
    }),
    [ADD_SIGNED_DOCUMENTS_ERROR]: produce(state => {
      state.isLoadingRecreateClient = false
      state.operationStatus = OperationStatus.PARTIALLY_SUCCESSFUL
    }),

    [CANCEL_RECREATE_CLIENT_ONLINE]: produce(state => {
      state.recreateClientType = RecreateClientType.OFFLINE
      state.currentStepType = StepTypeRecreateClient.DOCUMENTS
    }),

    [RESET_PROCESS_RECREATE_CLIENT]: () => initialState
  },
  initialState
)
