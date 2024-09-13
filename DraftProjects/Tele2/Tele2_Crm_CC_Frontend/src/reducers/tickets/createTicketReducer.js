import { createAction, handleActions, combineActions } from 'redux-actions'

export const CREATE_TICKET_MODAL_VISIBLE = 'ticket/CREATE_TICKET_MODAL_VISIBLE'

export const SAVE_TICKET_FORM_STATE = 'ticket/SAVE_TICKET_FORM_STATE'

export const CREATE_TICKET = 'ticket/CREATE_TICKET'
export const CREATE_TICKET_SUCCESS = 'ticket/CREATE_TICKET_SUCCESS'
export const CREATE_TICKET_ERROR = 'ticket/CREATE_TICKET_ERROR'
export const CREATE_TICKET_FAILURE = 'ticket/CREATE_TICKET_FAILURE'

export const FETCH_CONTACT_LINES = 'ticket/FETCH_CONTACT_LINES'
export const FETCH_CONTACT_LINES_SUCCESS = 'ticket/FETCH_CONTACT_LINES_SUCCESS'
export const FETCH_CONTACT_LINES_ERROR = 'ticket/FETCH_CONTACT_LINES_ERROR'
export const FETCH_CONTACT_LINES_FAILURE = 'ticket/FETCH_CONTACT_LINES_FAILURE'

export const TICKET_ADD_PARAMS = 'ticket/TICKET_ADD_PARAMS'
export const TICKET_ADD_PARAMS_SUCCESS = 'ticket/TICKET_ADD_PARAMS_SUCCESS'
export const TICKET_ADD_PARAMS_ERROR = 'ticket/TICKET_ADD_PARAMS_ERROR'
export const TICKET_ADD_PARAMS_FAILURE = 'ticket/TICKET_ADD_PARAMS_FAILURE'
export const TICKET_CLEAR_ADD_PARAMS = 'ticket/TICKET_CLEAR_ADD_PARAMS'

export const FETCH_REASONS_CATEGORIES = 'ticket/FETCH_REASONS_CATEGORIES'
export const FETCH_REASONS_CATEGORIES_SUCCESS = 'ticket/FETCH_REASONS_CATEGORIES_SUCCESS'
export const FETCH_REASONS_CATEGORIES_ERROR = 'ticket/FETCH_REASONS_CATEGORIES_ERROR'
export const FETCH_REASONS_CATEGORIES_FAILURE = 'ticket/FETCH_REASONS_CATEGORIES_FAILURE'

export const SET_REASONS_CATEGORIES = 'ticket/SET_REASONS_CATEGORIES'
export const RESET_REASONS_CATEGORIES = 'ticket/RESET_REASONS_CATEGORIES'
export const FILTER_REASONS = 'ticket/FILTER_REASONS'
export const SELECT_REASON = 'ticket/SELECT_REASON'
export const SELECT_CATEGORY = 'ticket/SELECT_CATEGORY'

export const CLEAR_ADD_PARAMS = 'ticket/CLEAR_ADD_PARAMS'

export const FETCH_VALIDATED_COORDINATES = 'ticket/FETCH_VALIDATED_COORDINATES'
export const FETCH_VALIDATED_COORDINATES_SUCCESS = 'ticket/FETCH_VALIDATED_COORDINATES_SUCCESS'
export const FETCH_VALIDATED_COORDINATES_ERROR = 'ticket/FETCH_VALIDATED_COORDINATES_ERROR'
export const FETCH_VALIDATED_COORDINATES_FAILURE = 'ticket/FETCH_VALIDATED_COORDINATES_FAILURE'

export const SET_VALIDATE_COORDINATE_SMART_GIS_VALUE = 'ticket/SET_VALIDATE_COORDINATE_SMART_GIS_VALUE'

export const CLEAR_CHECK_COVERAGES = 'ticket/CLEAR_CHECK_COVERAGES'
export const CHECK_COVERAGES = 'ticket/CHECK_COVERAGES'
export const CHECK_COVERAGES_SUCCESS = 'ticket/CHECK_COVERAGES_SUCCESS'
export const CHECK_COVERAGES_ERROR = 'ticket/CHECK_COVERAGES_ERROR'
export const CHECK_COVERAGES_FAILURE = 'ticket/CHECK_COVERAGES_FAILURE'

export const CLEAR_CHECK_MTP_BY_SERVICE_ID = 'ticket/CLEAR_CHECK_MTP_BY_SERVICE_ID'
export const CHECK_MTP_BY_SERVICE_ID = 'ticket/CHECK_MTP_BY_SERVICE_ID'
export const CHECK_MTP_BY_SERVICE_ID_SUCCESS = 'ticket/CHECK_MTP_BY_SERVICE_ID_SUCCESS'
export const CHECK_MTP_BY_SERVICE_ID_ERROR = 'ticket/CHECK_MTP_BY_SERVICE_ID_ERROR'
export const CHECK_MTP_BY_SERVICE_ID_FAILURE = 'ticket/CHECK_MTP_BY_SERVICE_ID_FAILURE'

const initialState = {
  isVisible: false,
  ticketFormState: null,

  createTicket: null,
  createTicketError: null,
  isCreateTicketLoading: false,

  contactLines: null,

  addParamsList: null,
  addParamsListError: null,
  isAddParamsListLoading: false,

  initialReasons: [],
  reasons: null,
  categories: null,
  reasonsCategoriesParameters: null,
  isReasonsCategoriesLoading: false,
  isReasonsCategoriesError: false,

  reasonsCategoriesFilterFields: {
    isEscalationAllowed: true
  },
  selectedReason: null,
  selectedCategory: null,

  isValidatedCoordinateSmartGis: false,
  isCanUseCoordinate: true,
  isValidateLoading: false,
  validateAddress: null,

  checkCoveragesResult: null,
  isCheckCoveragesError: false,

  checkMTPByServiceIdResult: null,
  isCheckMTPByServiceIdError: false
}

export const changeModalVisibility = createAction(CREATE_TICKET_MODAL_VISIBLE)
export const saveTicketFormState = createAction(SAVE_TICKET_FORM_STATE)
export const fetchContactLines = createAction(FETCH_CONTACT_LINES)
export const ticketAddParams = createAction(TICKET_ADD_PARAMS)
export const createTicket = createAction(CREATE_TICKET)
export const fetchReasonsCategories = createAction(FETCH_REASONS_CATEGORIES)
export const filterReasons = createAction(FILTER_REASONS)
export const selectReason = createAction(SELECT_REASON)
export const selectCategory = createAction(SELECT_CATEGORY)
export const clearAddParams = createAction(CLEAR_ADD_PARAMS)
export const clearCheckCoverages = createAction(CLEAR_CHECK_COVERAGES)
export const checkCoverages = createAction(CHECK_COVERAGES)
export const clearCheckMTPByServiceId = createAction(CLEAR_CHECK_MTP_BY_SERVICE_ID)
export const checkMTPByServiceId = createAction(CHECK_MTP_BY_SERVICE_ID)

export const fetchValidatedCoordinates = createAction(FETCH_VALIDATED_COORDINATES)
export const setValidateCoordinateSmartGis = createAction(SET_VALIDATE_COORDINATE_SMART_GIS_VALUE)

export default handleActions({
  [CREATE_TICKET_MODAL_VISIBLE]: (state) => ({
    ...state,
    isVisible: !state.isVisible
  }),
  [SAVE_TICKET_FORM_STATE]: (state, { payload }) => ({
    ...state,
    ticketFormState: payload
  }),

  [CREATE_TICKET]: (state) => ({
    ...state,
    createTicket: null,
    createTicketError: false,
    isCreateTicketLoading: true
  }),

  [CREATE_TICKET_SUCCESS]: (state, { payload: { data } }) => ({
    ...state,
    createTicket: data,
    createTicketError: false,
    isCreateTicketLoading: false
  }),

  [combineActions(CREATE_TICKET_ERROR, CREATE_TICKET_FAILURE)]:
  (state) => ({
    ...state,
    createTicket: null,
    createTicketError: true,
    isCreateTicketLoading: false
  }),

  [FETCH_CONTACT_LINES]: (state) => ({
    ...state,
    contactLines: null
  }),
  [FETCH_CONTACT_LINES_SUCCESS]: (state, { payload: { data } }) => ({
    ...state,
    contactLines: data
  }),
  [FETCH_CONTACT_LINES_ERROR]: (state) => ({
    ...state,
    contactLines: null
  }),
  [FETCH_CONTACT_LINES_FAILURE]: (state) => ({
    ...state,
    contactLines: null
  }),

  [TICKET_ADD_PARAMS]: (state) => ({
    ...state,
    addParamsList: null,
    addParamsListError: false,
    isAddParamsListLoading: true
  }),

  [TICKET_ADD_PARAMS_SUCCESS]: (state, { payload: { data } }) => ({
    ...state,
    addParamsList: data,
    addParamsListError: false,
    isAddParamsListLoading: false
  }),

  [combineActions(TICKET_ADD_PARAMS_ERROR, TICKET_ADD_PARAMS_FAILURE)]:
  (state) => ({
    ...state,
    addParamsList: null,
    addParamsListError: true,
    isAddParamsListLoading: false
  }),

  [TICKET_CLEAR_ADD_PARAMS]: (state) => ({
    ...state,
    addParamsList: {},
    addParamsListError: false,
    isAddParamsListLoading: false
  }),

  [FETCH_REASONS_CATEGORIES]: (state) => ({
    ...state,
    reasons: [],
    isReasonsCategoriesLoading: true,
    isReasonsCategoriesError: false
  }),

  [FETCH_REASONS_CATEGORIES_SUCCESS]: (state, { payload: { initialReasons, Reasons, Categories, GlobalParameters } }) => ({
    ...state,
    initialReasons,
    reasons: Reasons,
    categories: Categories,
    reasonsCategoriesParameters: GlobalParameters,
    isReasonsCategoriesLoading: false,
    isReasonsCategoriesError: false
  }),

  [combineActions(FETCH_REASONS_CATEGORIES_ERROR, FETCH_REASONS_CATEGORIES_FAILURE)]:
  (state) => ({
    ...state,
    reasons: [],
    isReasonsCategoriesLoading: false,
    isReasonsCategoriesError: true
  }),

  [SET_REASONS_CATEGORIES]: state => ({
    ...state,
    reasons: state.initialReasons
  }),

  [RESET_REASONS_CATEGORIES]: state => ({
    ...state,
    initialReasons: [],
    reasons: [],
    categories: []
  }),

  [FILTER_REASONS]: (state, { payload: { field, value } }) => ({
    ...state,
    reasons: [],
    isReasonsCategoriesLoading: true,
    reasonsCategoriesFilterFields: {
      ...state.reasonsCategoriesFilterFields,
      [field]: value
    }
  }),

  [SELECT_REASON]: (state, { payload: { reason } }) => ({
    ...state,
    selectedReason: reason
  }),

  [SELECT_CATEGORY]: (state, { payload: { category } }) => ({
    ...state,
    selectedCategory: category
  }),

  [CLEAR_ADD_PARAMS]: state => ({
    ...state,
    addParamsList: null
  }),

  [FETCH_VALIDATED_COORDINATES]: (state) => ({
    ...state,
    validateAddress: null,
    isValidateLoading: true
  }),
  [FETCH_VALIDATED_COORDINATES_SUCCESS]: (state, { payload: { Address } }) => ({
    ...state,
    isValidatedCoordinateSmartGis: true,
    validateAddress: Address,
    isValidateLoading: false,
    isCanUseCoordinate: true
  }),
  [FETCH_VALIDATED_COORDINATES_ERROR]: state => ({
    ...state,
    isValidatedCoordinateSmartGis: false,
    validateAddress: null,
    isValidateLoading: false,
    isCanUseCoordinate: false
  }),
  [FETCH_VALIDATED_COORDINATES_FAILURE]: state => ({
    ...state,
    isValidatedCoordinateSmartGis: false,
    validateAddress: null,
    isValidateLoading: false,
    isCanUseCoordinate: true
  }),
  [SET_VALIDATE_COORDINATE_SMART_GIS_VALUE]: (state, { payload }) => ({
    ...state,
    isValidatedCoordinateSmartGis: payload
  }),
  [CLEAR_CHECK_COVERAGES]: (state) => ({
    ...state,
    isCheckCoveragesError: false,
    checkCoveragesResult: null
  }),
  [CHECK_COVERAGES]: (state) => ({
    ...state,
    isCheckCoveragesError: false,
    checkCoveragesResult: null
  }),
  [CHECK_COVERAGES_SUCCESS]: (state, { payload }) => ({
    ...state,
    checkCoveragesResult: payload
  }),
  [combineActions(CHECK_COVERAGES_FAILURE, CHECK_COVERAGES_ERROR)]: (state) => ({
    ...state,
    isCheckCoveragesError: true
  }),

  [combineActions(CHECK_MTP_BY_SERVICE_ID, CLEAR_CHECK_MTP_BY_SERVICE_ID)]: (state) => ({
    ...state,
    checkMTPByServiceIdResult: null,
    isCheckMTPByServiceIdError: false
  }),
  [CHECK_MTP_BY_SERVICE_ID_SUCCESS]: (state, { payload }) => ({
    ...state,
    checkMTPByServiceIdResult: payload
  }),
  [combineActions(CHECK_MTP_BY_SERVICE_ID_FAILURE, CHECK_MTP_BY_SERVICE_ID_ERROR)]: (state) => ({
    ...state,
    isCheckMTPByServiceIdError: true
  })
}, initialState)
