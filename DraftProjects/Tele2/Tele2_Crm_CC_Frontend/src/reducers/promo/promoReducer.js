import { createAction, handleActions } from 'redux-actions'

// History
export const GET_PROMO_HISTORY_FETCH = 'promo/GET_PROMO_HISTORY_FETCH'
export const GET_PROMO_HISTORY_FETCH_SUCCESS = 'promo/GET_PROMO_HISTORY_FETCH_SUCCESS'
export const GET_PROMO_HISTORY_FETCH_ERROR = 'promo/GET_PROMO_HISTORY_FETCH_ERROR'
export const GET_PROMO_HISTORY_FETCH_FAILURE = 'promo/GET_PROMO_HISTORY_FETCH_FAILURE'
// Statuses filter
export const GET_PROMO_HISTORY_FILTERS_FETCH = 'promo/GET_PROMO_HISTORY_FILTERS_FETCH'
export const GET_PROMO_HISTORY_FILTERS_FETCH_SUCCESS = 'promo/GET_PROMO_HISTORY_FILTERS_FETCH_SUCCESS'
export const GET_PROMO_HISTORY_FILTERS_FETCH_ERROR = 'promo/GET_PROMO_HISTORY_FILTERS_FETCH_ERROR'
export const GET_PROMO_HISTORY_FILTERS_FETCH_FAILURE = 'promo/GET_PROMO_HISTORY_FILTERS_FETCH_FAILURE'
// Activate promo
export const ACTIVATE_PROMO_FETCH = 'promo/ACTIVATE_PROMO_FETCH'
export const ACTIVATE_PROMO_FETCH_SUCCESS = 'promo/ACTIVATE_PROMO_FETCH_SUCCESS'
export const ACTIVATE_PROMO_FETCH_ERROR = 'promo/ACTIVATE_PROMO_FETCH_ERROR'
export const ACTIVATE_PROMO_FETCH_FAILURE = 'promo/ACTIVATE_PROMO_FETCH_FAILURE'
// Cancelation promo
export const CANCEL_PROMO_FETCH = 'promo/CANCEL_PROMO_FETCH'
export const CANCEL_PROMO_FETCH_SUCCESS = 'promo/CANCEL_PROMO_FETCH_SUCCESS'
export const CANCEL_PROMO_FETCH_ERROR = 'promo/CANCEL_PROMO_FETCH_ERROR'
export const CANCEL_PROMO_FETCH_FAILURE = 'promo/CANCEL_PROMO_FETCH_FAILURE'
// Notify promo
export const NOTIFY_PROMO_FETCH = 'promo/NOTIFY_PROMO_FETCH'
export const NOTIFY_PROMO_FETCH_SUCCESS = 'promo/NOTIFY_PROMO_FETCH_SUCCESS'
export const NOTIFY_PROMO_FETCH_ERROR = 'promo/NOTIFY_PROMO_FETCH_ERROR'
export const NOTIFY_PROMO_FETCH_FAILURE = 'promo/NOTIFY_PROMO_FETCH_FAILURE'

export const getPromoHistory = createAction(GET_PROMO_HISTORY_FETCH)
export const getPromoHistoryFilters = createAction(GET_PROMO_HISTORY_FILTERS_FETCH)
export const activatePromo = createAction(ACTIVATE_PROMO_FETCH)
export const cancelPromo = createAction(CANCEL_PROMO_FETCH)
export const notifyPromo = createAction(NOTIFY_PROMO_FETCH)

const initialState = {
  promoHistory: null,
  isPromoHistoryLoading: false,
  promoHistoryError: null,

  promoHistoryFilters: null,
  isPromoHistoryFiltersLoading: false,
  promoHistoryFiltersError: null,

  activationResult: null,
  isActivationLoading: false,

  cancelationResult: null,
  isCancelationLoading: false,

  notificationResult: null,
  isNotificationLoading: false
}

export default handleActions({
  // History
  [GET_PROMO_HISTORY_FETCH]: (state) => ({
    ...state,
    promoHistory: null,
    isPromoHistoryLoading: true,
    promoHistoryError: null
  }),
  [GET_PROMO_HISTORY_FETCH_SUCCESS]: (state, { payload }) => ({
    ...state,
    promoHistory: payload?.Data,
    isPromoHistoryLoading: false,
    promoHistoryError: null
  }),
  [GET_PROMO_HISTORY_FETCH_ERROR]: (state, { payload }) => ({
    ...state,
    promoHistory: null,
    isPromoHistoryLoading: false,
    promoHistoryError: payload?.MessageText
  }),
  [GET_PROMO_HISTORY_FETCH_FAILURE]: (state) => ({
    ...state,
    promoHistory: null,
    isPromoHistoryLoading: false,
    promoHistoryError: 'При получении истории услуг произошла ошибка'
  }),
  // Get statuses filter
  [GET_PROMO_HISTORY_FILTERS_FETCH]: (state) => ({
    ...state,
    promoHistoryFilters: null,
    isPromoHistoryFiltersLoading: true,
    promoHistoryFiltersError: null
  }),
  [GET_PROMO_HISTORY_FILTERS_FETCH_SUCCESS]: (state, { payload }) => ({
    ...state,
    promoHistoryFilters: payload?.Data,
    isPromoHistoryFiltersLoading: false,
    promoHistoryFiltersError: null
  }),
  [GET_PROMO_HISTORY_FILTERS_FETCH_ERROR]: (state, { payload }) => ({
    ...state,
    promoHistoryFilters: null,
    isPromoHistoryFiltersLoading: false,
    promoHistoryFiltersError: payload?.MessageText
  }),
  [GET_PROMO_HISTORY_FILTERS_FETCH_FAILURE]: (state) => ({
    ...state,
    promoHistoryFilters: null,
    isPromoHistoryFiltersLoading: false,
    promoHistoryFiltersError: 'При получении истории услуг произошла ошибка'
  }),
  // Activate promo
  [ACTIVATE_PROMO_FETCH]: (state) => ({
    ...state,
    activationResult: null,
    isActivationLoading: true
  }),
  [ACTIVATE_PROMO_FETCH_SUCCESS]: (state, { payload }) => ({
    ...state,
    activationResult: payload,
    isActivationLoading: false
  }),
  [ACTIVATE_PROMO_FETCH_ERROR]: (state, { payload }) => ({
    ...state,
    activationResult: payload,
    isActivationLoading: false
  }),
  [ACTIVATE_PROMO_FETCH_FAILURE]: (state) => ({
    ...state,
    activationResult: 'При активации промокода произошла ошибка',
    isActivationLoading: false
  }),
  // Cancel promo
  [CANCEL_PROMO_FETCH]: (state) => ({
    ...state,
    cancelationResult: null,
    isCancelationLoading: true
  }),
  [CANCEL_PROMO_FETCH_SUCCESS]: (state, { payload }) => ({
    ...state,
    cancelationResult: payload,
    isCancelationLoading: false
  }),
  [CANCEL_PROMO_FETCH_ERROR]: (state, { payload }) => ({
    ...state,
    cancelationResult: payload,
    isCancelationLoading: false
  }),
  [CANCEL_PROMO_FETCH_FAILURE]: (state) => ({
    ...state,
    cancelationResult: 'При отмене промокода произошла ошибка',
    isCancelationLoading: false
  }),
  // Send promo notification
  [NOTIFY_PROMO_FETCH]: (state) => ({
    ...state,
    notificationResult: null,
    isNotificationLoading: true
  }),
  [NOTIFY_PROMO_FETCH_SUCCESS]: (state, { payload }) => ({
    ...state,
    notificationResult: payload,
    isNotificationLoading: false
  }),
  [NOTIFY_PROMO_FETCH_ERROR]: (state, { payload }) => ({
    ...state,
    notificationResult: payload,
    isNotificationLoading: false
  }),
  [NOTIFY_PROMO_FETCH_FAILURE]: (state) => ({
    ...state,
    notificationResult: 'При нотификации о промокоде произошла ошибка',
    isNotificationLoading: false
  })
}, initialState)
