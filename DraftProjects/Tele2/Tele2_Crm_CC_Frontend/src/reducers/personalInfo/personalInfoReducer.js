import { createAction, handleActions } from 'redux-actions'

export const PERSONAL_ACCOUNT_FETCH = 'personalAccount/PERSONAL_ACCOUNT_FETCH'
export const PERSONAL_ACCOUNT_FETCH_SUCCESS = 'personalAccount/PERSONAL_ACCOUNT_FETCH_SUCCESS'
export const PERSONAL_ACCOUNT_FETCH_ERROR = 'personalAccount/PERSONAL_ACCOUNT_FETCH_ERROR'
export const PERSONAL_ACCOUNT_FETCH_FAILURE = 'personalAccount/PERSONAL_ACCOUNT_FETCH_FAILURE'

export const PERSONAL_ACCOUNT_FIELDS_CHANGE = 'personalAccount/PERSONAL_ACCOUNT_FIELDS_CHANGE'
export const PERSONAL_ACCOUNT_BRANCH_CHANGE = 'personalAccount/PERSONAL_ACCOUNT_BRANCH_CHANGE'
export const PERSONAL_ACCOUNT_EMAIL_CHANGE = 'personalAccount/PERSONAL_ACCOUNT_EMAIL_CHANGE'
export const PERSONAL_ACCOUNT_PERSONAL_EMAIL_COPY = 'personalAccount/PERSONAL_ACCOUNT_PERSONAL_EMAIL_COPY'

const initalState = {
  personalAccount: null,
  personalAccountError: null,
  isPersonalAccountLoading: false
}

export const getPersonalAccount = createAction(PERSONAL_ACCOUNT_FETCH)
export const changePersonalInfoFields = createAction(PERSONAL_ACCOUNT_FIELDS_CHANGE)
export const changePersonalBranchFields = createAction(PERSONAL_ACCOUNT_BRANCH_CHANGE)
export const changePersonalEmailFields = createAction(PERSONAL_ACCOUNT_EMAIL_CHANGE)

export default handleActions({
  [PERSONAL_ACCOUNT_FETCH]: (state) => ({
    ...state,
    personalAccount: null,
    personalAccountError: null,
    isPersonalAccountLoading: true
  }),

  [PERSONAL_ACCOUNT_FETCH_SUCCESS]: (state, { payload: { IsSuccess, Data, MessageText } }) => {
    return {
      ...state,
      personalAccount: Data,
      personalAccountError: false,
      isPersonalAccountLoading: false
    }
  },

  [PERSONAL_ACCOUNT_FETCH_ERROR]: (state, { payload: { IsSuccess, Data, MessageText } }) => {
    const { personalAccount } = state
    if (Data.IsAnonymous) {
      return {
        ...state,
        personalAccount: Data,
        personalAccountError: true,
        isPersonalAccountLoading: false
      }
    }
    return {
      ...state,
      personalAccount: { ...personalAccount, ...Data },
      personalAccountError: true,
      isPersonalAccountLoading: false
    }
  },

  [PERSONAL_ACCOUNT_FETCH_FAILURE]: (state) => ({
    ...state,
    personalAccount: {
      Msisdn: null,
      BillingBranchId: null,
      Email: null
    },
    personalAccountError: true,
    isPersonalAccountLoading: false
  }),

  [PERSONAL_ACCOUNT_FIELDS_CHANGE]: (state, { payload: { Msisdn, BillingBranchId, Email } }) => {
    const { personalAccount } = state
    return {
      ...state,
      personalAccount: {
        ...personalAccount,
        Msisdn: Msisdn,
        BillingBranchId: BillingBranchId,
        Email: Email
      },
      personalAccountError: true,
      isPersonalAccountLoading: false
    }
  },
  [PERSONAL_ACCOUNT_BRANCH_CHANGE]: (state, { payload: { BillingBranchId } }) => {
    const { personalAccount } = state
    return {
      ...state,
      personalAccount: {
        ...personalAccount,
        BillingBranchId: BillingBranchId
      },
      personalAccountError: false,
      isPersonalAccountLoading: false
    }
  },

  [PERSONAL_ACCOUNT_PERSONAL_EMAIL_COPY]: (state) => {
    const { personalAccount } = state
    return {
      ...state,
      personalAccount: {
        ...personalAccount,
        PersonalEmail: personalAccount.Email
      },
      personalAccountError: false,
      isPersonalAccountLoading: false
    }
  },

  [PERSONAL_ACCOUNT_EMAIL_CHANGE]: (state, { payload: { Email } }) => {
    const { personalAccount } = state
    return {
      ...state,
      personalAccount: {
        ...personalAccount,
        Email: Email
      },
      personalAccountError: false,
      isPersonalAccountLoading: false
    }
  }
}, initalState)
