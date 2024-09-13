import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

const TOGGLE = 'offers/TOGGLE'

export const FETCH_OFFERS = 'offers/FETCH_OFFERS'
export const FETCH_OFFERS_SUCCESS = 'offers/FETCH_OFFERS_SUCCESS'
export const FETCH_OFFERS_ERROR = 'offers/FETCH_OFFERS_ERROR'
export const FETCH_OFFERS_FAILURE = 'offers/FETCH_OFFERS_FAILURE'

export const FETCH_REGISTERED_OFFERS = 'offers/FETCH_REGISTERED_OFFERS'
export const FETCH_REGISTERED_OFFERS_SUCCESS = 'offers/FETCH_REGISTERED_OFFERS_SUCCESS'
export const FETCH_REGISTERED_OFFERS_ERROR = 'offers/FETCH_REGISTERED_OFFERS_ERROR'
export const FETCH_REGISTERED_OFFERS_FAILURE = 'offers/FETCH_REGISTERED_OFFERS_FAILURE'

export const ADD_OFFERS = 'offers/ADD_OFFERS'
export const ADD_OFFER_SUCCESS = 'offers/ADD_OFFER_SUCCESS'
export const ADD_OFFER_ERROR = 'offers/ADD_OFFER_ERROR'
export const ADD_OFFER_FAILURE = 'offers/ADD_OFFER_FAILURE'

export const CHANGE_OFFER = 'offers/CHANGE_OFFER'
export const CHANGE_OFFER_SUCCESS = 'offers/CHANGE_OFFER_SUCCESS'
export const CHANGE_OFFER_ERROR = 'offers/CHANGE_OFFER_ERROR'
export const CHANGE_OFFER_FAILURE = 'offers/CHANGE_OFFER_FAILURE'

export const DELETE_OFFER = 'offers/DELETE_OFFER'
export const DELETE_OFFER_SUCCESS = 'offers/DELETE_OFFER_SUCCESS'
export const DELETE_OFFER_ERROR = 'offers/DELETE_OFFER_ERROR'
export const DELETE_OFFER_FAILURE = 'offers/DELETE_OFFER_FAILURE'

export const HANDLE_AUTO_CONNECT_OFFER = 'offers/HANDLE_AUTO_CONNECT_OFFER'
export const HANDLE_AUTO_CONNECT_OFFER_SUCCESS = 'offers/HANDLE_AUTO_CONNECT_OFFER_SUCCESS'
export const HANDLE_AUTO_CONNECT_OFFER_ERROR = 'offers/HANDLE_AUTO_CONNECT_OFFER_ERROR'
export const HANDLE_AUTO_CONNECT_OFFER_FAILURE = 'offers/HANDLE_AUTO_CONNECT_OFFER_FAILURE'

// History
export const GET_OFFERS_HISTORY_FETCH = 'offers/GET_OFFERS_HISTORY_FETCH'
export const GET_OFFERS_HISTORY_FETCH_SUCCESS = 'offers/GET_OFFERS_HISTORY_FETCH_SUCCESS'
export const GET_OFFERS_HISTORYY_FETCH_ERROR = 'offers/GET_OFFERS_HISTORYY_FETCH_ERROR'
export const GET_OFFERS_HISTORY_FETCH_FAILURE = 'offers/GET_OFFERS_HISTORY_FETCH_FAILURE'
export const DELETE_OFFERS_HISTORY_FETCH = 'offers/DELETE_OFFERS_HISTORY_FETCH'

// CBM History
export const GET_OFFERS_CBM_HISTORY_FETCH = 'offers/GET_OFFERS_CBM_HISTORY_FETCH'
export const GET_OFFERS_CBM_HISTORY_FETCH_SUCCESS = 'offers/GET_OFFERS_CBM_HISTORY_FETCH_SUCCESS'
export const GET_OFFERS_CBM_HISTORYY_FETCH_ERROR = 'offers/GET_OFFERS_CBM_HISTORYY_FETCH_ERROR'
export const GET_OFFERS_CBM_HISTORY_FETCH_FAILURE = 'offers/GET_OFFERS_CBM_HISTORY_FETCH_FAILURE'

const initalState = {
  isToggled: false,

  isLoadingOffers: false,
  errorOffers: false,
  availableOffers: null,
  errorOffersMessage: null,

  isLoadingRegisteredOffers: false,
  errorRegisteredOffers: false,
  registeredOffers: null,
  errorRegisteredOffersMessage: null,

  isLoadingAddOffer: false,
  errorAddOffer: null,
  isLoadingChangeOffer: false,
  errorChangeOffer: null,
  isLoadingDeleteOffer: false,
  errorDeleteOffer: null,
  isLoadingHandleAutoConnectOffer: false,
  errorHandleAutoConnectOffer: null,

  // History
  offersHistory: null,
  isOffersHistoryLoading: false,
  offersHistoryError: false,

  // History CBM
  offersCbmHistory: null,
  isOffersCbmHistoryLoading: false,
  offersCbmHistoryError: false
}

export const toggleOffers = createAction(TOGGLE)
export const fetchOffers = createAction(FETCH_OFFERS)
export const fetchRegisteredOffers = createAction(FETCH_REGISTERED_OFFERS)
export const addOffers = createAction(ADD_OFFERS)
export const changeOffer = createAction(CHANGE_OFFER)
export const deleteOffer = createAction(DELETE_OFFER)
export const handleAutoConnectOffer = createAction(HANDLE_AUTO_CONNECT_OFFER)
export const getOffersHistory = createAction(GET_OFFERS_HISTORY_FETCH)
export const deleteOffersHistory = createAction(DELETE_OFFERS_HISTORY_FETCH)
export const getOffersCbmHistory = createAction(GET_OFFERS_CBM_HISTORY_FETCH)

export default handleActions({
  [TOGGLE]: (state) => ({
    ...state,
    isToggled: !state.isToggled
  }),

  [FETCH_OFFERS]: (state) => ({
    ...state,
    isLoadingOffers: true,
    errorOffers: false
  }),

  [FETCH_OFFERS_SUCCESS]: (state, { payload: { result } }) => ({
    ...state,
    isLoadingOffers: false,
    availableOffers: result,
    errorOffers: false
  }),

  [combineActions(FETCH_OFFERS_ERROR, FETCH_OFFERS_FAILURE)]:
  (state, { payload }) => ({
    ...state,
    availableOffers: null,
    isLoadingOffers: false,
    errorOffers: true,
    errorOffersMessage: payload?.message
  }),

  [FETCH_REGISTERED_OFFERS]: (state) => ({
    ...state,
    isLoadingRegisteredOffers: true,
    errorRegisteredOffers: false
  }),

  [FETCH_REGISTERED_OFFERS_SUCCESS]: (state, { payload: { result } }) => ({
    ...state,
    registeredOffers: result,
    errorRegisteredOffers: false,
    isLoadingRegisteredOffers: false
  }),

  [combineActions(FETCH_REGISTERED_OFFERS_ERROR, FETCH_REGISTERED_OFFERS_FAILURE)]:
  (state, { payload: { message } }) => ({
    ...state,
    isLoadingRegisteredOffers: false,
    errorRegisteredOffers: true,
    errorRegisteredOffersMessage: message
  }),

  [ADD_OFFERS]: produce((state) => {
    state.isLoadingAddOffer = true
  }),

  [ADD_OFFER_SUCCESS]: produce((state) => {
    state.isLoadingAddOffer = false
    state.errorAddOffer = null
  }),

  [combineActions(ADD_OFFER_ERROR, ADD_OFFER_FAILURE)]: produce((state, { payload: { error } }) => {
    state.isLoadingAddOffer = false
    state.errorAddOffer = error
  }),

  [CHANGE_OFFER]: produce((state) => {
    state.isLoadingChangeOffer = true
    state.errorChangeOffer = null
  }),

  [CHANGE_OFFER_SUCCESS]: produce((state) => {
    state.isLoadingChangeOffer = false
    state.errorChangeOffer = null
  }),

  [combineActions(CHANGE_OFFER_ERROR, CHANGE_OFFER_FAILURE)]: produce((state, { payload: { error } }) => {
    state.isLoadingChangeOffer = false
    state.errorChangeOffer = error
  }),

  [DELETE_OFFER]: produce((state) => {
    state.isLoadingDeleteOffer = true
  }),

  [DELETE_OFFER_SUCCESS]: produce((state) => {
    state.isLoadingDeleteOffer = false
    state.errorDeleteOffer = null
  }),

  [combineActions(DELETE_OFFER_ERROR, DELETE_OFFER_FAILURE)]: produce((state, { payload: { error } }) => {
    state.isLoadingDeleteOffer = false
    state.errorDeleteOffer = error
  }),

  [HANDLE_AUTO_CONNECT_OFFER]: (state) => ({
    ...state,
    isLoadingHandleAutoConnectOffer: true,
    errorHandleAutoConnectOffer: null
  }),

  [HANDLE_AUTO_CONNECT_OFFER]: produce((state) => {
    state.isLoadingHandleAutoConnectOffer = true
    state.errorHandleAutoConnectOffer = null
  }),

  [HANDLE_AUTO_CONNECT_OFFER_SUCCESS]: produce((state) => {
    state.isLoadingHandleAutoConnectOffer = false
    state.errorHandleAutoConnectOffer = null
  }),

  [combineActions(HANDLE_AUTO_CONNECT_OFFER_ERROR, HANDLE_AUTO_CONNECT_OFFER_FAILURE)]: produce((state, { payload: { error } }) => {
    state.isLoadingHandleAutoConnectOffer = false
    state.errorHandleAutoConnectOffer = error
  }),

  // History

  [GET_OFFERS_HISTORY_FETCH]: (state) => ({
    ...state,
    isOffersHistoryLoading: true
  }),
  [GET_OFFERS_HISTORY_FETCH_SUCCESS]: (state, { payload: { IsSuccess, Data, MessageText } }) => ({
    ...state,
    offersHistory: Data,
    isOffersHistoryLoading: false,
    offersHistoryError: null
  }),
  [GET_OFFERS_HISTORYY_FETCH_ERROR]: (state, { payload: { IsSuccess, Data, MessageText } }) => ({
    ...state,
    offersHistory: null,
    isOffersHistoryLoading: false,
    offersHistoryError: MessageText
  }),
  [GET_OFFERS_HISTORY_FETCH_FAILURE]: (state) => ({
    ...state,
    offersHistory: null,
    isOffersHistoryLoading: false,
    offersHistoryError: 'При получении данных об истории предложений произошла ошибка'
  }),
  [DELETE_OFFERS_HISTORY_FETCH]: (state) => ({
    ...state,
    offersHistory: null
  }),

  // History CBM
  [GET_OFFERS_CBM_HISTORY_FETCH]: (state) => ({
    ...state,
    isOffersCbmHistoryLoading: true
  }),
  [GET_OFFERS_CBM_HISTORY_FETCH_SUCCESS]: (state, { payload: { Data } }) => ({
    ...state,
    offersCbmHistory: Data,
    isOffersCbmHistoryLoading: false,
    offersCbmHistoryError: null
  }),
  [GET_OFFERS_CBM_HISTORYY_FETCH_ERROR]: (state, { payload: { MessageText } }) => ({
    ...state,
    offersCbmHistory: null,
    isOffersCbmHistoryLoading: false,
    offersCbmHistoryError: MessageText
  }),
  [GET_OFFERS_CBM_HISTORY_FETCH_FAILURE]: (state) => ({
    ...state,
    offersCbmHistory: null,
    isOffersCbmHistoryLoading: false,
    offersCbmHistoryError: 'При получении данных об истории предложений произошла ошибка'
  })
}, initalState)
