import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const CREATE_HANDLING_SUCCESS = 'handling/CREATE_HANDLING_SUCCESS'
export const CREATE_HANDLING_FAILURE = 'handling/CREATE_HANDLING_FAILURE'
export const CREATE_HANDLING_ERROR = 'handling/CREATE_HANDLING_ERROR'
export const CREATE_HANDLING = 'handling/CREATE_HANDLING'

export const CLOSE_HANDLING_FETCH = 'handling/CLOSE_HANDLING_FETCH'
export const CLOSE_HANDLING_FETCH_SUCCESS = 'handling/CLOSE_HANDLING_FETCH_SUCCESS'
export const CLOSE_HANDLING_FETCH_ERROR = 'handling/CLOSE_HANDLING_FETCH_ERROR'
export const CLOSE_HANDLING_FETCH_FAILURE = 'handling/CLOSE_HANDLING_FETCH_FAILURE'

export const CHECK_REPEATED_HANDLING = 'handling/CHECK_REPEATED_HANDLING'
export const CHECK_REPEATED_HANDLING_SUCCESS = 'handling/CHECK_REPEATED_HANDLING_SUCCESS'
export const CHECK_REPEATED_HANDLING_ERROR = 'handling/CHECK_REPEATED_HANDLING_ERROR'
export const CHECK_REPEATED_HANDLING_FAILURE = 'handling/CHECK_REPEATED_HANDLING_FAILURE'

export const LAST_HANDLINGS = 'handling/LAST_HANDLINGS'
export const LAST_HANDLINGS_SUCCESS = 'handling/LAST_HANDLINGS_SUCCESS'
export const LAST_HANDLINGS_ERROR = 'handling/LAST_HANDLINGS_ERROR'
export const LAST_HANDLINGS_FAILURE = 'handling/LAST_HANDLINGS_FAILURE'

export const GET_HANDLING_COORDINATES = 'handling/GET_HANDLING_COORDINATES'
export const GET_HANDLING_COORDINATES_SUCCESS = 'handling/GET_HANDLING_COORDINATES_SUCCESS'
export const GET_HANDLING_COORDINATES_ERROR = 'handling/GET_HANDLING_COORDINATES_ERROR'
export const GET_HANDLING_COORDINATES_FAILURE = 'handling/GET_HANDLING_COORDINATES_FAILURE'

export const SET_HANDLING_COORDINATES = 'handling/SET_HANDLING_COORDINATES'
export const SET_HANDLING_COORDINATES_SUCCESS = 'handling/SET_HANDLING_COORDINATES_SUCCESS'
export const SET_HANDLING_COORDINATES_ERROR = 'handling/SET_HANDLING_COORDINATES_ERROR'
export const SET_HANDLING_COORDINATES_FAILURE = 'handling/SET_HANDLING_COORDINATES_FAILURE'

export const GET_INTERACTION_PARAMS_FOR_LINKED_HANDLING = 'handling/GET_INTERACTION_PARAMS_FOR_LINKED_HANDLING'
export const GET_INTERACTION_PARAMS_FOR_LINKED_HANDLING_SUCCESS = 'handling/GET_INTERACTION_PARAMS_FOR_LINKED_HANDLING_SUCCESS'
export const GET_INTERACTION_PARAMS_FOR_LINKED_HANDLING_ERROR = 'handling/GET_INTERACTION_PARAMS_FOR_LINKED_HANDLING_ERROR'
export const GET_INTERACTION_PARAMS_FOR_LINKED_HANDLING_FAILURE = 'handling/GET_INTERACTION_PARAMS_FOR_LINKED_HANDLING_FAILURE'

export const FETCH_HANDLING_STATUS = 'handling/FETCH_HANDLING_STATUS'
export const FETCH_HANDLING_STATUS_SUCCESS = 'handling/FETCH_HANDLING_STATUS_SUCCESS'
export const FETCH_HANDLING_STATUS_ERROR = 'handling/FETCH_HANDLING_STATUS_ERROR'
export const FETCH_HANDLING_STATUS_FAILURE = 'handling/FETCH_HANDLING_STATUS_FAILURE'

export const FETCH_LINKED_INTERACTIONS = 'handling/FETCH_LINKED_INTERACTIONS'
export const FETCH_LINKED_INTERACTIONS_SUCCESS = 'handling/FETCH_LINKED_INTERACTIONS_SUCCESS'
export const FETCH_LINKED_INTERACTIONS_ERROR = 'handling/FETCH_LINKED_INTERACTIONS_ERROR'
export const FETCH_LINKED_INTERACTIONS_FAILURE = 'handling/FETCH_LINKED_INTERACTIONS_FAILURE'

export const HANDLING_OPEN_PRESSED = 'handling/HANDLING_OPEN_PRESSED'

export const PASS_HANDLING_ID = 'handling/PASS_HANDLING_ID'

const initialState = {
  repeatedHandling: null,
  checkRepeatedHandlingLoading: false,
  repeatedHandlingError: false,
  isRepeatedHandlingChecked: false,
  closedHandling: null,
  closedHandlingLoading: false,
  closedHandlingError: null,
  linkedInteractions: [],
  isLinkedInteractionsLoading: false,
  isLinkedInteractionsError: null,

  lastHandlings: null,
  isLastHandlingsLoading: false,
  isLastHandlingsSuccess: false,
  lastHandlingsMessage: '',

  coordinates: [],
  isGetHandlingCoordinatesError: false,
  isSetHandlingCoordinatesError: false,

  interactionParamsForLinkedHandling: [],
  isInteractionParamsForLinkedHandlingLoading: false,
  isInteractionParamsForLinkedHandlingError: false,

  handlingStatus: true,
  isHandlingStatusLoading: false,

  isHandlingOpenPressed: false
}

export const createHandling = createAction(CREATE_HANDLING)
export const closeHandling = createAction(CLOSE_HANDLING_FETCH)
export const checkRepeatedHandling = createAction(CHECK_REPEATED_HANDLING)
export const fetchLastHandlings = createAction(LAST_HANDLINGS)
export const fetchHandlingCoordinates = createAction(GET_HANDLING_COORDINATES)
export const setHandlingCoordinates = createAction(SET_HANDLING_COORDINATES)
export const fetchInteractionParamsForLinkedHandling = createAction(GET_INTERACTION_PARAMS_FOR_LINKED_HANDLING)
export const fetchHandlingStatus = createAction(FETCH_HANDLING_STATUS)
export const fetchLinkedInteractions = createAction(FETCH_LINKED_INTERACTIONS)
export const onHandlingOpenPressed = createAction(HANDLING_OPEN_PRESSED)

export default handleActions(
  {
    [combineActions(CREATE_HANDLING_SUCCESS, CREATE_HANDLING_FAILURE)]: (state, { payload: { handling } }) => {
      return {
        ...state,
        ...handling
      }
    },

    [CREATE_HANDLING_ERROR]: (state, { payload: { data } }) => {
      return {
        ...state,
        error: data
      }
    },

    [CLOSE_HANDLING_FETCH]: state => ({
      ...state,
      closedHandlingLoading: true
    }),

    [CLOSE_HANDLING_FETCH_SUCCESS]: (state, { payload: { IsSuccess, Data, MessageText } }) => ({
      ...state,
      closedHandling: Data,
      closedHandlingLoading: false,
      closedHandlingError: null
    }),

    [CLOSE_HANDLING_FETCH_ERROR]: (state, { payload: { IsSuccess, MessageText, ErrorCode } }) => ({
      ...state,
      closedHandling: null,
      closedHandlingLoading: false,
      closedHandlingError: MessageText
    }),

    [CLOSE_HANDLING_FETCH_FAILURE]: state => ({
      ...state,
      closedHandling: null,
      closedHandlingLoading: false,
      closedHandlingError: 'При удалении заметки произошла ошибка'
    }),

    [CHECK_REPEATED_HANDLING]: state => ({
      ...state,
      checkRepeatedHandlingLoading: true
    }),

    [CHECK_REPEATED_HANDLING_SUCCESS]: (state, { payload: { IsSuccess, Data, MessageText } }) => ({
      ...state,
      repeatedHandling: Data,
      checkRepeatedHandlingLoading: false,
      repeatedHandlingError: null,
      isRepeatedHandlingChecked: true
    }),

    [CHECK_REPEATED_HANDLING_ERROR]: (state, { payload: { IsSuccess, Data, MessageText } }) => ({
      ...state,
      repeatedHandling: null,
      checkRepeatedHandlingLoading: false,
      repeatedHandlingError: MessageText
    }),

    [CHECK_REPEATED_HANDLING_FAILURE]: state => ({
      ...state,
      repeatedHandling: null,
      checkRepeatedHandlingLoading: false,
      repeatedHandlingError: 'При получении данных о повторном обращении произошла ошибка'
    }),

    // Last handlings
    [LAST_HANDLINGS]: (state) => ({
      ...state,
      lastHandlings: null,
      isLastHandlingsLoading: true,
      isLastHandlingsSuccess: false,
      lastHandlingsMessage: ''
    }),
    [combineActions(LAST_HANDLINGS_SUCCESS, LAST_HANDLINGS_ERROR)]:
    (state, { payload: { IsSuccess, Data, MessageText } }) => ({
      ...state,
      lastHandlings: Data,
      isLastHandlingsLoading: false,
      isLastHandlingsSuccess: IsSuccess,
      lastHandlingsMessage: MessageText
    }),
    [LAST_HANDLINGS_FAILURE]: state => ({
      ...state,
      lastHandlings: null,
      isLastHandlingsLoading: false,
      isLastHandlingsSuccess: false,
      lastHandlingsMessage: 'При получении данных о скидках произошла ошибка'
    }),

    // Get handling coordinates
    [GET_HANDLING_COORDINATES_SUCCESS]: (state, { payload: { Coordinates: coordinates } }) => ({
      ...state,
      coordinates,
      isGetHandlingCoordinatesError: false
    }),

    [combineActions(GET_HANDLING_COORDINATES_ERROR, GET_HANDLING_COORDINATES_FAILURE)]: state => ({
      ...state,
      isGetHandlingCoordinatesError: true
    }),

    [SET_HANDLING_COORDINATES_SUCCESS]: state => ({
      ...state,
      isSetHandlingCoordinatesError: false
    }),

    [combineActions(SET_HANDLING_COORDINATES_ERROR, SET_HANDLING_COORDINATES_FAILURE)]: state => ({
      ...state,
      isSetHandlingCoordinatesError: true
    }),

    [GET_INTERACTION_PARAMS_FOR_LINKED_HANDLING]: state => ({
      ...state,
      isInteractionParamsForLinkedHandlingLoading: true
    }),
    [GET_INTERACTION_PARAMS_FOR_LINKED_HANDLING_SUCCESS]: (state, { payload }) => ({
      ...state,
      interactionParamsForLinkedHandling: payload,
      isInteractionParamsForLinkedHandlingLoading: false
    }),
    [combineActions(GET_INTERACTION_PARAMS_FOR_LINKED_HANDLING_ERROR, GET_INTERACTION_PARAMS_FOR_LINKED_HANDLING_FAILURE)]: state => ({
      ...state,
      isInteractionParamsForLinkedHandlingLoading: false,
      isInteractionParamsForLinkedHandlingError: true
    }),

    [FETCH_HANDLING_STATUS]: produce((state, action) => {
      state.isHandlingStatusLoading = true
    }),

    [FETCH_HANDLING_STATUS_SUCCESS]: produce((state, { payload }) => {
      state.handlingStatus = payload
      state.isHandlingStatusLoading = false
    }),

    [combineActions(FETCH_HANDLING_STATUS_ERROR, FETCH_HANDLING_STATUS_FAILURE)]:
    produce((state, { payload }) => {
      state.handlingStatus = payload
      state.isHandlingStatusLoading = false
    }),

    [FETCH_LINKED_INTERACTIONS]: produce(state => {
      state.isLinkedInteractionsLoading = true
      state.isLinkedInteractionsError = false
    }),

    [FETCH_LINKED_INTERACTIONS_SUCCESS]: produce((state, { payload }) => {
      state.linkedInteractions = payload
      state.isLinkedInteractionsLoading = false
      state.isLinkedInteractionsError = false
    }),

    [combineActions(FETCH_LINKED_INTERACTIONS_ERROR, FETCH_LINKED_INTERACTIONS_FAILURE)]:
    produce((state, { payload }) => {
      state.isLinkedInteractionsLoading = false
      state.isLinkedInteractionsError = payload
    }),

    [HANDLING_OPEN_PRESSED]: produce(state => {
      state.isHandlingOpenPressed = true
    }),

    [PASS_HANDLING_ID]: produce((state, { payload }) => {
      state.Id = payload
    })
  },
  initialState
)
