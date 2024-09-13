import { createAction } from 'redux-actions'

export const INIT_PROCESS = 'changingTariffPlan/INIT_PROCESS'
export const CHANGE_STEP = 'changingTariffPlan/CHANGE_STEP'
export const SET_TARIFF_PLAN = 'changingTariffPlan/SET_TARIFF_PLAN'

export const GET_SUBSCRIBER_PERSONAL_DATA = 'changingTariffPlan/GET_SUBSCRIBER_PERSONAL_DATA'
export const GET_SUBSCRIBER_PERSONAL_DATA_SUCCESS = 'changingTariffPlan/GET_SUBSCRIBER_PERSONAL_DATA_SUCCESS'
export const GET_SUBSCRIBER_PERSONAL_DATA_ERROR = 'changingTariffPlan/GET_SUBSCRIBER_PERSONAL_DATA_ERROR'

export const GET_SMS_CODE = 'changingTariffPlan/GET_SMS_CODE'
export const CHECK_PEP_CODE = 'changingTariffPlan/CHECK_PEP_CODE'
export const GET_PAPER_DOCUMENTS = 'changingTariffPlan/GET_PAPER_DOCUMENTS'

export const CREATE_INTERACTION = 'changingTariffPlan/CREATE_INTERACTION'

export const GET_B2B_CLIENT_MINIMAL_INFO = 'changeCodeWord/GET_B2B_CLIENT_MINIMAL_INFO'
export const GET_B2B_CLIENT_MINIMAL_INFO_SUCCESS = 'changeCodeWord/GET_B2B_CLIENT_MINIMAL_INFO_SUCCESS'
export const GET_B2B_CLIENT_MINIMAL_INFO_ERROR = 'changeCodeWord/GET_B2B_CLIENT_MINIMAL_INFO_ERROR'

export const RESET_PROCESS = 'changingTariffPlan/RESET_PROCESS'

export const initChangingTariffPlan = createAction(INIT_PROCESS)
export const setTariffPlan = createAction(SET_TARIFF_PLAN)

export const changeStepChangingTariffPlan = createAction(CHANGE_STEP)

export const getSubscriberPersonalData = createAction(GET_SUBSCRIBER_PERSONAL_DATA)
export const getSubscriberPersonalDataSuccess = createAction(GET_SUBSCRIBER_PERSONAL_DATA_SUCCESS)
export const getSubscriberPersonalDataError = createAction(GET_SUBSCRIBER_PERSONAL_DATA_ERROR)

export const getSmsCodeChangingTariffPlan = createAction(GET_SMS_CODE)
export const checkPepCodeCChangingTariffPlan = createAction(CHECK_PEP_CODE)
export const getPaperDocumentsChangingTariffPlan = createAction(GET_PAPER_DOCUMENTS)

export const getB2bClientMinimalInfo = createAction(GET_B2B_CLIENT_MINIMAL_INFO)
export const getB2bClientMinimalInfoSuccess = createAction(GET_B2B_CLIENT_MINIMAL_INFO_SUCCESS)
export const getB2bClientMinimalInfoError = createAction(GET_B2B_CLIENT_MINIMAL_INFO_ERROR)

export const createInteractionChangingTariffPlan = createAction(CREATE_INTERACTION)
export const resetChangingTariffPlan = createAction(RESET_PROCESS)
