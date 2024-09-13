import { createAction, handleActions } from 'redux-actions'

export const PAYMENTS_HISTORY_FETCH = 'finance/PAYMENTS_HISTORY_FETCH'
export const PAYMENTS_HISTORY_FETCH_SUCCESS = 'finance/PAYMENTS_HISTORY_FETCH_SUCCESS'
export const PAYMENTS_HISTORY_FETCH_ERROR = 'finance/PAYMENTS_HISTORY_FETCH_ERROR'
export const PAYMENTS_HISTORY_FETCH_FAILURE = 'finance/PAYMENTS_HISTORY_FETCH_FAILURE'

export const PAYMENTS_HISTORY_FILTERS_FETCH = 'finance/PAYMENTS_HISTORY_FILTERS_FETCH'
export const PAYMENTS_HISTORY_FILTERS_FETCH_SUCCESS =
  'finance/PAYMENTS_HISTORY_FILTERS_FETCH_SUCCESS'
export const PAYMENTS_HISTORY_FILTERS_FETCH_ERROR = 'finance/PAYMENTS_HISTORY_FILTERS_FETCH_ERROR'
export const PAYMENTS_HISTORY_FILTERS_FETCH_FAILURE =
  'finance/PAYMENTS_HISTORY_FILTERS_FETCH_FAILURE'

export const PAYMENTS_URL_FETCH = 'finance/PAYMENTS_URL_FETCH'
export const PAYMENTS_URL_FETCH_SUCCESS = 'finance/PAYMENTS_URL_FETCH_SUCCESS'
export const PAYMENTS_URL_FETCH_ERROR = 'finance/PAYMENTS_URL_FETCH_ERROR'
export const PAYMENTS_URL_FETCH_FAILURE = 'finance/PAYMENTS_URL_FETCH_FAILURE'

export const REDIRECT_PAYMENTS_URL = 'finance/REDIRECT_PAYMENTS_URL'
export const REDIRECT_PAYMENTS_URL_SUCCESS = 'finance/REDIRECT_PAYMENTS_URL_SUCCESS'
export const REDIRECT_PAYMENTS_URL_ERROR = 'finance/REDIRECT_PAYMENTS_URL_ERROR'
export const REDIRECT_PAYMENTS_URL_FAILURE = 'finance/REDIRECT_PAYMENTS_URL_FAILURE'

export const INVOICES_HISTORY_FETCH = 'finance/INVOICES_HISTORY_FETCH'
export const INVOICES_HISTORY_FETCH_SUCCESS = 'finance/INVOICES_HISTORY_FETCH_SUCCESS'
export const INVOICES_HISTORY_FETCH_ERROR = 'finance/INVOICES_HISTORY_FETCH_ERROR'
export const INVOICES_HISTORY_FETCH_FAILURE = 'finance/INVOICES_HISTORY_FETCH_FAILURE'

export const COSTS_HISTORY_FETCH = 'finance/COSTS_HISTORY_FETCH'
export const COSTS_HISTORY_FETCH_SUCCESS = 'finance/COSTS_HISTORY_FETCH_SUCCESS'
export const COSTS_HISTORY_FETCH_ERROR = 'finance/COSTS_HISTORY_FETCH_ERROR'
export const COSTS_HISTORY_FETCH_FAILURE = 'finance/COSTS_HISTORY_FETCH_FAILURE'

export const RESOURCES_HISTORY_FETCH = 'finance/RESOURCES_HISTORY_FETCH'
export const RESOURCES_HISTORY_FETCH_SUCCESS = 'finance/RESOURCES_HISTORY_FETCH_SUCCESS'
export const RESOURCES_HISTORY_FETCH_ERROR = 'finance/RESOURCES_HISTORY_FETCH_ERROR'
export const RESOURCES_HISTORY_FETCH_FAILURE = 'finance/RESOURCES_HISTORY_FETCH_FAILURE'

export const DIGEST_ID_FETCH = 'finance/DIGEST_ID_FETCH'
export const DIGEST_ID_FETCH_SUCCESS = 'finance/DIGEST_ID_FETCH_SUCCESS'
export const DIGEST_ID_FETCH_ERROR = 'finance/DIGEST_ID_FETCH_ERROR'
export const DIGEST_ID_FETCH_FAILURE = 'finance/DIGEST_ID_FETCH_FAILURE'
export const RESET_DIGEST_ID = 'finance/RESET_DIGEST_ID'

const initalState = {
  paymentsHistory: null,
  paymentsHistoryError: null,
  isPaymentsHistoryLoading: false,
  isPaymentsHistoryError: false,

  paymentsHistoryFilters: null,
  paymentsHistoryFiltersError: null,
  isPaymentsHistoryFiltersLoading: false,
  isPaymentsHistoryFiltersError: false,

  paymentsUrl: null,
  paymentsUrlError: null,
  isPaymentsUrlLoading: false,
  isPaymentsUrlError: false,

  isRedirectUrlLoading: false,
  redirectUrlError: null,
  isRedirectUrlError: false,

  invoicesHistory: null,
  invoicesHistoryError: null,
  isInvoicesHistoryLoading: false,
  isInvoicesHistoryError: false,

  costsHistory: null,
  costsHistoryError: null,
  isCostsHistoryLoading: false,
  isCostsHistoryError: false,

  resourcesHistory: null,
  resourcesHistoryError: null,
  isResourcesHistoryLoading: false,
  isResourcesHistoryError: false,

  digestId: null,
  digestIdError: null,
  isDigestIdLoading: false,
  isDigestIdError: false
}

export const fetchPaymentsHistory = createAction(PAYMENTS_HISTORY_FETCH)
export const fetchPaymentsHistoryFilters = createAction(PAYMENTS_HISTORY_FILTERS_FETCH)
export const fetchPaymentsUrl = createAction(PAYMENTS_URL_FETCH)
export const redirectPaymentsUrl = createAction(REDIRECT_PAYMENTS_URL)
export const fetchInvoicesHistory = createAction(INVOICES_HISTORY_FETCH)
export const fetchCostsHistory = createAction(COSTS_HISTORY_FETCH)
export const fetchResourcesHistory = createAction(RESOURCES_HISTORY_FETCH)
export const fetchDigestId = createAction(DIGEST_ID_FETCH)
export const resetDigestId = createAction(RESET_DIGEST_ID)

export default handleActions(
  {
    // Payments History
    [PAYMENTS_HISTORY_FETCH]: state => ({
      ...state,
      isPaymentsHistoryLoading: true
    }),
    [PAYMENTS_HISTORY_FETCH_SUCCESS]: (state, { payload: { Data: data } }) => ({
      ...state,
      paymentsHistory: data,
      isPaymentsHistoryError: false,
      isPaymentsHistoryLoading: false
    }),
    [PAYMENTS_HISTORY_FETCH_ERROR]: (state, { payload: { ErrorStackTrace, MessageText } }) => ({
      ...state,
      paymentsHistory: null,
      paymentsHistoryError: MessageText + ErrorStackTrace,
      isPaymentsHistoryError: true,
      isPaymentsHistoryLoading: false
    }),
    [PAYMENTS_HISTORY_FETCH_FAILURE]: (state, message) => ({
      ...state,
      paymentsHistory: null,
      paymentsHistoryError: message,
      isPaymentsHistoryError: true,
      isPaymentsHistoryLoading: false
    }),

    // Founds Flow Filters
    [PAYMENTS_HISTORY_FILTERS_FETCH]: state => ({
      ...state,
      isPaymentsHistoryFiltersLoading: true
    }),
    [PAYMENTS_HISTORY_FILTERS_FETCH_SUCCESS]: (state, { payload: { digestCode, Data: data } }) => ({
      ...state,
      paymentsHistoryFilters: {
        ...state.paymentsHistoryFilters,
        [digestCode]: data
      },
      isPaymentsHistoryFiltersError: false,
      isPaymentsHistoryFiltersLoading: false
    }),
    [PAYMENTS_HISTORY_FILTERS_FETCH_ERROR]: (
      state,
      { payload: { ErrorStackTrace, MessageText } }
    ) => ({
      ...state,
      paymentsHistoryFiltersError: MessageText + ErrorStackTrace,
      isPaymentsHistoryFiltersError: true,
      isPaymentsHistoryFiltersLoading: false
    }),
    [PAYMENTS_HISTORY_FILTERS_FETCH_FAILURE]: (state, message) => ({
      ...state,
      paymentsHistoryFiltersError: message,
      isPaymentsHistoryFiltersError: true,
      isPaymentsHistoryFiltersLoading: false
    }),

    // Payments documents
    [PAYMENTS_URL_FETCH]: state => ({
      ...state,
      isPaymentsUrlLoading: true
    }),
    [PAYMENTS_URL_FETCH_SUCCESS]: (state, { payload: { Data } }) => ({
      ...state,
      paymentsUrl: Data,
      isPaymentsUrlError: false,
      isPaymentsUrlLoading: false
    }),
    [PAYMENTS_URL_FETCH_ERROR]: (state, { payload: { MessageText } }) => ({
      ...state,
      paymentsUrl: null,
      paymentsUrlError: MessageText,
      isPaymentsUrlError: true,
      isPaymentsUrlLoading: false
    }),
    [PAYMENTS_URL_FETCH_FAILURE]: (state, message) => ({
      ...state,
      paymentsUrl: null,
      paymentsUrlError: message,
      isPaymentsUrlError: true,
      isPaymentsUrlLoading: false
    }),

    // Redirect
    [REDIRECT_PAYMENTS_URL]: state => ({
      ...state,
      isRedirectUrlLoading: true
    }),
    [REDIRECT_PAYMENTS_URL_SUCCESS]: (state, { payload: { Data } }) => ({
      ...state,
      paymentsUrl: Data,
      isRedirectUrlLoading: false,
      isRedirectUrlError: false
    }),
    [REDIRECT_PAYMENTS_URL_ERROR]: (state, { payload: { MessageText } }) => ({
      ...state,
      paymentsUrl: null,
      isRedirectUrlLoading: false,
      isRedirectUrlError: true,
      redirectUrlError: MessageText
    }),
    [REDIRECT_PAYMENTS_URL_FAILURE]: (state, message) => ({
      ...state,
      paymentsUrl: null,
      isRedirectUrlLoading: false,
      isRedirectUrlError: true,
      redirectUrlError: message
    }),

    // Invoices History
    [INVOICES_HISTORY_FETCH]: state => ({
      ...state,
      isInvoicesHistoryLoading: true
    }),
    [INVOICES_HISTORY_FETCH_SUCCESS]: (state, { payload: { Data: data } }) => ({
      ...state,
      invoicesHistory: data,
      isInvoicesHistoryError: false,
      isInvoicesHistoryLoading: false
    }),
    [INVOICES_HISTORY_FETCH_ERROR]: (state, { payload: { ErrorStackTrace, MessageText } }) => ({
      ...state,
      invoicesHistory: null,
      invoicesHistoryError: MessageText + ErrorStackTrace,
      isInvoicesHistoryError: true,
      isInvoicesHistoryLoading: false
    }),
    [INVOICES_HISTORY_FETCH_FAILURE]: (state, message) => ({
      ...state,
      invoicesHistory: null,
      invoicesHistoryError: message,
      isInvoicesHistoryError: true,
      isInvoicesHistoryLoading: false
    }),

    // Costs History
    [COSTS_HISTORY_FETCH]: state => ({
      ...state,
      isCostsHistoryLoading: true
    }),
    [COSTS_HISTORY_FETCH_SUCCESS]: (state, { payload: { Data: data } }) => ({
      ...state,
      costsHistory: data,
      isCostsHistoryError: false,
      isCostsHistoryLoading: false
    }),
    [COSTS_HISTORY_FETCH_ERROR]: (state, { payload: { ErrorStackTrace, MessageText } }) => ({
      ...state,
      costsHistory: null,
      costsHistoryError: MessageText + ErrorStackTrace,
      isCostsHistoryError: true,
      isCostsHistoryLoading: false
    }),
    [COSTS_HISTORY_FETCH_FAILURE]: (state, message) => ({
      ...state,
      costsHistory: null,
      costsHistoryError: message,
      isCostsHistoryError: true,
      isCostsHistoryLoading: false
    }),

    // Resources History
    [RESOURCES_HISTORY_FETCH]: state => ({
      ...state,
      isResourcesHistoryLoading: true
    }),
    [RESOURCES_HISTORY_FETCH_SUCCESS]: (state, { payload: { Data: data } }) => ({
      ...state,
      resourcesHistory: data,
      isResourcesHistoryError: false,
      isResourcesHistoryLoading: false
    }),
    [RESOURCES_HISTORY_FETCH_ERROR]: (state, { payload: { ErrorStackTrace, MessageText } }) => ({
      ...state,
      resourcesHistory: null,
      resourcesHistoryError: MessageText + ErrorStackTrace,
      isResourcesHistoryError: true,
      isResourcesHistoryLoading: false
    }),
    [RESOURCES_HISTORY_FETCH_FAILURE]: (state, message) => ({
      ...state,
      resourcesHistory: null,
      resourcesHistoryError: message,
      isResourcesHistoryError: true,
      isResourcesHistoryLoading: false
    }),

    // Digest Id
    [DIGEST_ID_FETCH]: state => ({
      ...state,
      isDigestIdLoading: true
    }),
    [DIGEST_ID_FETCH_SUCCESS]: (state, { payload: { Data: data } }) => ({
      ...state,
      digestId: data,
      isDigestIdError: false,
      isDigestIdLoading: false
    }),
    [DIGEST_ID_FETCH_ERROR]: (state, { payload: { ErrorStackTrace, MessageText } }) => ({
      ...state,
      digestId: null,
      digestIdError: MessageText + ErrorStackTrace,
      isDigestIdError: true,
      isDigestIdLoading: false
    }),
    [DIGEST_ID_FETCH_FAILURE]: (state, message) => ({
      ...state,
      digestId: null,
      digestIdError: message,
      isDigestIdError: true,
      isDigestIdLoading: false
    }),
    [RESET_DIGEST_ID]: (state, message) => ({
      ...state,
      digestId: null,
      digestIdError: null,
      isDigestIdLoading: false,
      isDigestIdError: false
    })
  },
  initalState
)
