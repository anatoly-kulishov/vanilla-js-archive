import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const GET_SUBSCRIPTION_COMPENSATION_AMOUNTS = 'subscriptionCompensation/GET_SUBSCRIPTION_COMPENSATION_AMOUNTS'
export const GET_SUBSCRIPTION_COMPENSATION_AMOUNTS_SUCCESS =
  'subscriptionCompensation/GET_SUBSCRIPTION_COMPENSATION_AMOUNTS_SUCCESS'
export const GET_SUBSCRIPTION_COMPENSATION_AMOUNTS_ERROR =
  'subscriptionCompensation/GET_SUBSCRIPTION_COMPENSATION_AMOUNTS_ERROR'
export const GET_SUBSCRIPTION_COMPENSATION_AMOUNTS_FAILURE =
  'subscriptionCompensation/GET_SUBSCRIPTION_COMPENSATION_AMOUNTS_FAILURE'

export const GET_SUBSCRIPTION_COMPENSATION_LIMITS = 'subscriptionCompensation/GET_SUBSCRIPTION_COMPENSATION_LIMITS'
export const GET_SUBSCRIPTION_COMPENSATION_LIMITS_SUCCESS =
  'subscriptionCompensation/GET_SUBSCRIPTION_COMPENSATION_LIMITS_SUCCESS'
export const GET_SUBSCRIPTION_COMPENSATION_LIMITS_ERROR =
  'subscriptionCompensation/GET_SUBSCRIPTION_COMPENSATION_LIMITS_ERROR'
export const GET_SUBSCRIPTION_COMPENSATION_LIMITS_FAILURE =
  'subscriptionCompensation/GET_SUBSCRIPTION_COMPENSATION_LIMITS_FAILURE'

export const ACCRUE_SUBSCRIPTION_COMPENSATION = 'subscriptionCompensation/ACCRUE_SUBSCRIPTION_COMPENSATION'
export const ACCRUE_SUBSCRIPTION_COMPENSATION_SUCCESS =
  'subscriptionCompensation/ACCRUE_SUBSCRIPTION_COMPENSATION_SUCCESS'
export const ACCRUE_SUBSCRIPTION_COMPENSATION_ERROR = 'subscriptionCompensation/ACCRUE_SUBSCRIPTION_COMPENSATION_ERROR'
export const ACCRUE_SUBSCRIPTION_COMPENSATION_FAILURE =
  'subscriptionCompensation/ACCRUE_SUBSCRIPTION_COMPENSATION_FAILURE'

export const getSubscriptionCompensationAmounts = createAction(GET_SUBSCRIPTION_COMPENSATION_AMOUNTS)
export const getSubscriptionCompensationLimits = createAction(GET_SUBSCRIPTION_COMPENSATION_LIMITS)
export const accrueSubscriptionCompensation = createAction(ACCRUE_SUBSCRIPTION_COMPENSATION)

const initialState = {
  subscriptionCompensationAmounts: {
    data: [],
    isLoading: false,
    isError: false
  },

  subscriptionCompensationLimits: {
    data: [],
    isLoading: false,
    isError: false
  },

  accruedSubscriptionCompensations: {}
}

export default handleActions(
  {
    [GET_SUBSCRIPTION_COMPENSATION_AMOUNTS]: produce(state => {
      state.subscriptionCompensationAmounts.isLoading = true
      state.subscriptionCompensationAmounts.isError = false
    }),
    [GET_SUBSCRIPTION_COMPENSATION_AMOUNTS_SUCCESS]: produce((state, { payload }) => {
      state.subscriptionCompensationAmounts.data = payload
      state.subscriptionCompensationAmounts.isLoading = false
      state.subscriptionCompensationAmounts.isError = false
    }),
    [combineActions(GET_SUBSCRIPTION_COMPENSATION_AMOUNTS_ERROR, GET_SUBSCRIPTION_COMPENSATION_AMOUNTS_FAILURE)]:
      produce(state => {
        state.subscriptionCompensationAmounts.isLoading = false
        state.subscriptionCompensationAmounts.isError = true
      }),

    [GET_SUBSCRIPTION_COMPENSATION_LIMITS]: produce(state => {
      state.subscriptionCompensationLimits.isLoading = true
      state.subscriptionCompensationLimits.isError = false
    }),
    [GET_SUBSCRIPTION_COMPENSATION_LIMITS_SUCCESS]: produce((state, { payload }) => {
      state.subscriptionCompensationLimits.data = payload
      state.subscriptionCompensationLimits.isLoading = false
      state.subscriptionCompensationLimits.isError = false
    }),
    [combineActions(GET_SUBSCRIPTION_COMPENSATION_LIMITS_ERROR, GET_SUBSCRIPTION_COMPENSATION_LIMITS_FAILURE)]: produce(
      state => {
        state.subscriptionCompensationLimits.isLoading = false
        state.subscriptionCompensationLimits.isError = true
      }
    ),

    [ACCRUE_SUBSCRIPTION_COMPENSATION]: produce((state, { payload }) => {
      state.accruedSubscriptionCompensations[payload.serviceNumber] = { isLoading: true, isError: false, isSuccess: false }
    }),
    [ACCRUE_SUBSCRIPTION_COMPENSATION_SUCCESS]: produce((state, { payload }) => {
      state.accruedSubscriptionCompensations[payload.serviceNumber].isLoading = false
      state.accruedSubscriptionCompensations[payload.serviceNumber].isError = false
      state.accruedSubscriptionCompensations[payload.serviceNumber].isSuccess = true
    }),
    [combineActions(ACCRUE_SUBSCRIPTION_COMPENSATION_ERROR, ACCRUE_SUBSCRIPTION_COMPENSATION_FAILURE)]: produce(
      (state, { payload }) => {
        state.accruedSubscriptionCompensations[payload.serviceNumber].isLoading = false
        state.accruedSubscriptionCompensations[payload.serviceNumber].isError = true
        state.accruedSubscriptionCompensations[payload.serviceNumber].isSuccess = false
      }
    )
  },
  initialState
)
