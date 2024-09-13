import { produce } from 'immer'
import { handleActions } from 'redux-actions'

import * as actionTypes from './actions'
import { ChangingTariffPlanStatusStep } from './helpers'
import {
  GET_SUBSCRIBER_PERSONAL_DATA,
  GET_SUBSCRIBER_PERSONAL_DATA_ERROR,
  GET_SUBSCRIBER_PERSONAL_DATA_SUCCESS
} from './actions'

const initialState = {
  activeStep: ChangingTariffPlanStatusStep.NONE,

  tariffParams: null,

  b2bClientMinimalInfo: null,
  isb2bClientMinimalInfoLoading: false,
  isb2bClientMinimalInfoError: false,

  subscriberPersonalData: null,
  isSubscriberPersonalDataLoading: false,
  isSubscriberPersonalDataError: false
}

export default handleActions(
  {
    [actionTypes.CHANGE_STEP]: produce((state, { payload }) => {
      state.activeStep = payload
    }),

    [actionTypes.INIT_PROCESS]: produce((state) => {
      state.activeStep = ChangingTariffPlanStatusStep.SIGNING
    }),
    [actionTypes.SET_TARIFF_PLAN]: produce((state, { payload }) => {
      state.tariffParams = payload
    }),

    [GET_SUBSCRIBER_PERSONAL_DATA]: produce((state) => {
      state.subscriberPersonalData = null
      state.isSubscriberPersonalDataLoading = true
      state.isSubscriberPersonalDataError = false
    }),
    [GET_SUBSCRIBER_PERSONAL_DATA_SUCCESS]: produce((state, { payload }) => {
      state.subscriberPersonalData = payload?.response
      state.isSubscriberPersonalDataLoading = false
    }),
    [GET_SUBSCRIBER_PERSONAL_DATA_ERROR]: produce((state) => {
      state.isChangeCodeWordLoading = false
      state.isSubscriberPersonalDataError = true
    }),

    [actionTypes.GET_B2B_CLIENT_MINIMAL_INFO]: produce((state) => {
      state.b2bClientMinimalInfo = null
      state.isb2bClientMinimalInfoLoading = true
      state.isb2bClientMinimalInfoError = false
    }),
    [actionTypes.GET_B2B_CLIENT_MINIMAL_INFO_SUCCESS]: produce((state, { payload }) => {
      state.b2bClientMinimalInfo = payload?.response
      state.isb2bClientMinimalInfoLoading = false
    }),
    [actionTypes.GET_B2B_CLIENT_MINIMAL_INFO_ERROR]: produce((state) => {
      state.isb2bClientMinimalInfoLoading = false
      state.isb2bClientMinimalInfoError = true
    }),

    [actionTypes.RESET_PROCESS]: () => initialState
  },
  initialState
)
