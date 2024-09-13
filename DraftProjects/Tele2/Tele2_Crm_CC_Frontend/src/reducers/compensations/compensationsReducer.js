import { createAction, handleActions, combineActions } from 'redux-actions'

export const CHANGE_COMPENSATIONS_HISTORY_MODAL_VISIBLE = 'compensations/CHANGE_COMPENSATIONS_HISTORY_MODAL_VISIBLE'

export const FETCH_PAYD_COMMENTS = 'compensations/FETCH_PAYD_COMMENTS'
export const FETCH_PAYD_COMMENTS_SUCCESS = 'compensations/FETCH_PAYD_COMMENTS_SUCCESS'
export const FETCH_PAYD_COMMENTS_ERROR = 'compensations/FETCH_PAYD_COMMENTS_ERROR'
export const FETCH_PAYD_COMMENTS_FAILURE = 'compensations/FETCH_PAYD_COMMENTS_FAILURE'

export const FETCH_PAYD_SERVICE_TYPES = 'compensations/FETCH_PAYD_SERVICE_TYPES'
export const FETCH_PAYD_SERVICE_TYPES_SUCCESS = 'compensations/FETCH_PAYD_SERVICE_TYPES_SUCCESS'
export const FETCH_PAYD_SERVICE_TYPES_ERROR = 'compensations/FETCH_PAYD_SERVICE_TYPES_ERROR'
export const FETCH_PAYD_SERVICE_TYPES_FAILURE = 'compensations/FETCH_PAYD_SERVICE_TYPES_FAILURE'

export const FETCH_PAYD_SERVICE_SIZES = 'compensations/FETCH_PAYD_SERVICE_SIZES'
export const FETCH_PAYD_SERVICE_SIZES_SUCCESS = 'compensations/FETCH_PAYD_SERVICE_SIZES_SUCCESS'
export const FETCH_PAYD_SERVICE_SIZES_ERROR = 'compensations/FETCH_PAYD_SERVICE_SIZES_ERROR'
export const FETCH_PAYD_SERVICE_SIZES_FAILURE = 'compensations/FETCH_PAYD_SERVICE_SIZES_FAILURE'

export const SET_PAYD_POST_LIMIT = 'compensations/SET_PAYD_POST_LIMIT'
export const SET_PAYD_POST_LIMIT_SUCCESS = 'compensations/SET_PAYD_POST_LIMIT_SUCCESS'
export const SET_PAYD_POST_LIMIT_ERROR = 'compensations/SET_PAYD_POST_LIMIT_ERROR'
export const SET_PAYD_POST_LIMIT_FAILURE = 'compensations/SET_PAYD_POST_LIMIT_FAILURE'

export const CANCEL_COMPENSATION = 'compensations/CANCEL_COMPENSATION'
export const CANCEL_COMPENSATION_SUCCESS = 'compensations/CANCEL_COMPENSATION_SUCCESS'
export const CANCEL_COMPENSATION_ERROR = 'compensations/CANCEL_COMPENSATION_ERROR'
export const CANCEL_COMPENSATION_FAILURE = 'compensations/CANCEL_COMPENSATION_FAILURE'

export const MODIFY_COMPENSATION = 'compensations/MODIFY_COMPENSATION'
export const MODIFY_COMPENSATION_SUCCESS = 'compensations/MODIFY_COMPENSATION_SUCCESS'
export const MODIFY_COMPENSATION_ERROR = 'compensations/MODIFY_COMPENSATION_ERROR'
export const MODIFY_COMPENSATION_FAILURE = 'compensations/MODIFY_COMPENSATION_FAILURE'

export const ADD_COMPENSATION = 'compensations/ADD_COMPENSATION'
export const ADD_COMPENSATION_SUCCESS = 'compensations/ADD_COMPENSATION_SUCCESS'
export const ADD_COMPENSATION_ERROR = 'compensations/ADD_COMPENSATION_ERROR'
export const ADD_COMPENSATION_FAILURE = 'compensations/ADD_COMPENSATION_FAILURE'

export const ADD_SERVICE_COMPENSATION = 'compensations/ADD_SERVICE_COMPENSATION'
export const ADD_SERVICE_COMPENSATION_SUCCESS = 'compensations/ADD_SERVICE_COMPENSATION_SUCCESS'
export const ADD_SERVICE_COMPENSATION_ERROR = 'compensations/ADD_SERVICE_COMPENSATION_ERROR'
export const ADD_SERVICE_COMPENSATION_FAILURE = 'compensations/ADD_SERVICE_COMPENSATION_FAILURE'

export const FETCH_PAYD_REASON_ADVICE_DESCRIPTION = 'compensations/FETCH_PAYD_REASON_ADVICE_DESCRIPTION'
export const FETCH_PAYD_REASON_ADVICE_DESCRIPTION_SUCCESS = 'compensations/FETCH_PAYD_REASON_ADVICE_DESCRIPTION_SUCCESS'
export const FETCH_PAYD_REASON_ADVICE_DESCRIPTION_ERROR = 'compensations/FETCH_PAYD_REASON_ADVICE_DESCRIPTION_ERROR'
export const FETCH_PAYD_REASON_ADVICE_DESCRIPTION_FAILURE = 'compensations/FETCH_PAYD_REASON_ADVICE_DESCRIPTION_FAILURE'

export const FETCH_AVAILABLE_BALANCES = 'compensations/FETCH_AVAILABLE_BALANCES'
export const FETCH_AVAILABLE_BALANCES_SUCCESS = 'compensations/FETCH_AVAILABLE_BALANCES_SUCCESS'
export const FETCH_AVAILABLE_BALANCES_ERROR = 'compensations/FETCH_AVAILABLE_BALANCES_ERROR'
export const FETCH_AVAILABLE_BALANCES_FAILURE = 'compensations/FETCH_AVAILABLE_BALANCES_FAILURE'

export const CLEAR_COMPENSATION_MESSAGES = 'compensations/CLEAR_COMPENSATION_MESSAGES'

const initialState = {
  isCompensationsHistoryModalVisible: false,

  compensationsMessages: [],
  paydServiceTypes: [],
  isPaydServiceTypesLoading: false,
  isFetchPaydServiceTypesError: false,

  paydPostLimitData: [],
  isSetPaydPostLimitError: false,
  isSetPaydPostLimitLoading: null,

  paydServiceSizes: [],
  isFetchPaydServiceSizesError: false,

  paydComments: [],
  isFetchPaydCommentsError: false,
  isFetchPaydCommentsLoading: false,

  isAddCompensationError: false,
  isAddServiceCompensationError: false,

  availableBalances: [],
  isFetchAvailableBalanceError: false,
  isFetchAvailableBalanceLoading: false,

  isFetchPaydReasonAdviceDescriptionError: false,

  isAddCompensationLoading: false,
  isAddServiceCompensationLoading: false,

  isCancelCompensationError: false,
  isModifyCompensationError: false
}

export const fetchPaydComments = createAction(FETCH_PAYD_COMMENTS)
export const fetchPaydServiceTypes = createAction(FETCH_PAYD_SERVICE_TYPES)
export const fetchPaydServiceSizes = createAction(FETCH_PAYD_SERVICE_SIZES)
export const fetchPaydReasonAdviceDescription = createAction(FETCH_PAYD_REASON_ADVICE_DESCRIPTION)
export const fetchAvailableBalances = createAction(FETCH_AVAILABLE_BALANCES)

export const cancelCompensation = createAction(CANCEL_COMPENSATION)
export const modifyCompensation = createAction(MODIFY_COMPENSATION)
export const addCompensation = createAction(ADD_COMPENSATION)
export const addServiceCompensation = createAction(ADD_SERVICE_COMPENSATION)

export const setPaydPostLimit = createAction(SET_PAYD_POST_LIMIT)
export const changeCompensationsHistoryModalVisibility = createAction(CHANGE_COMPENSATIONS_HISTORY_MODAL_VISIBLE)
export const clearCompensationsMessages = createAction(CLEAR_COMPENSATION_MESSAGES)

export default handleActions({
  [CHANGE_COMPENSATIONS_HISTORY_MODAL_VISIBLE]: state => ({
    ...state,
    isCompensationsHistoryModalVisible: !state.isCompensationsHistoryModalVisible
  }),

  [SET_PAYD_POST_LIMIT]: state => ({
    ...state,
    isSetPaydPostLimitLoading: true
  }),

  [SET_PAYD_POST_LIMIT_SUCCESS]: (state, { payload: { paydPostLimitData } }) => ({
    ...state,
    paydPostLimitData,
    isSetPaydPostLimitError: false,
    isSetPaydPostLimitLoading: false
  }),

  [SET_PAYD_POST_LIMIT_ERROR]: (state, { payload: { newCompensationsMessagesArray } }) => ({
    ...state,
    compensationsMessages: newCompensationsMessagesArray,
    isSetPaydPostLimitLoading: false,
    isSetPaydPostLimitError: true
  }),

  [SET_PAYD_POST_LIMIT_FAILURE]: (state) => ({
    ...state,
    paydPostLimitData: [],
    isSetPaydPostLimitLoading: false,
    isSetPaydPostLimitError: true
  }),

  [FETCH_PAYD_SERVICE_TYPES]: (state, action) => ({
    ...state,
    isPaydServiceTypesLoading: true
  }),
  [FETCH_PAYD_SERVICE_TYPES_SUCCESS]: (state, { payload: { paydServiceTypes } }) => ({
    ...state,
    isFetchPaydServiceTypesError: false,
    isPaydServiceTypesLoading: false,
    paydServiceTypes
  }),
  [combineActions(FETCH_PAYD_SERVICE_TYPES_ERROR, FETCH_PAYD_SERVICE_TYPES_FAILURE)]: (state) => ({
    ...state,
    isFetchPaydServiceTypesError: true,
    paydServiceTypes: []
  }),

  [FETCH_PAYD_SERVICE_SIZES_SUCCESS]: (state, { payload: { paydServiceSizes } }) => ({
    ...state,
    isFetchPaydServiceSizesError: false,
    paydServiceSizes
  }),
  [combineActions(FETCH_PAYD_SERVICE_SIZES_ERROR, FETCH_PAYD_SERVICE_SIZES_FAILURE)]: (state) => ({
    ...state,
    isFetchPaydServiceSizesError: true,
    paydServiceSizes: []
  }),

  [FETCH_PAYD_COMMENTS]: state => ({
    ...state,
    isFetchPaydCommentsLoading: true
  }),

  [FETCH_PAYD_COMMENTS_SUCCESS]: (state, { payload: { paydComments } }) => ({
    ...state,
    isFetchPaydCommentsError: false,
    isFetchPaydCommentsLoading: false,
    paydComments
  }),
  [combineActions(FETCH_PAYD_COMMENTS_ERROR, FETCH_PAYD_COMMENTS_FAILURE)]: (state) => ({
    ...state,
    isFetchPaydCommentsError: true,
    isFetchPaydCommentsLoading: false,
    paydComments: []
  }),

  [CANCEL_COMPENSATION_SUCCESS]: state => ({
    ...state,
    isCancelCompensationError: false
  }),
  [combineActions(CANCEL_COMPENSATION_ERROR, CANCEL_COMPENSATION_FAILURE)]: (state) => ({
    ...state,
    isCancelCompensationError: true
  }),

  [MODIFY_COMPENSATION_SUCCESS]: state => ({
    ...state,
    isModifyCompensationError: false
  }),
  [combineActions(MODIFY_COMPENSATION_ERROR, MODIFY_COMPENSATION_FAILURE)]: (state) => ({
    ...state,
    isModifyCompensationError: true
  }),

  [ADD_SERVICE_COMPENSATION]: state => ({
    ...state,
    isAddServiceCompensationLoading: true
  }),

  [ADD_SERVICE_COMPENSATION_SUCCESS]: state => ({
    ...state,
    isAddServiceCompensationLoading: false,
    isAddServiceCompensationError: false
  }),

  [ADD_SERVICE_COMPENSATION_ERROR]: (state, { payload: { newCompensationsMessagesArray } }) => ({
    ...state,
    isAddServiceCompensationLoading: false,
    isAddServiceCompensationError: true,
    compensationsMessages: newCompensationsMessagesArray
  }),

  [ADD_SERVICE_COMPENSATION_FAILURE]: (state) => ({
    ...state,
    isAddServiceCompensationLoading: false,
    isAddServiceCompensationError: true
  }),

  [ADD_COMPENSATION]: state => ({
    ...state,
    isAddCompensationLoading: true
  }),

  [ADD_COMPENSATION_SUCCESS]: state => ({
    ...state,
    isAddCompensationError: false,
    isAddCompensationLoading: false
  }),

  [ADD_COMPENSATION_ERROR]: (state, { payload: { newCompensationsMessagesArray } }) => ({
    ...state,
    isAddCompensationLoading: false,
    isAddCompensationError: true,
    compensationsMessages: newCompensationsMessagesArray
  }),

  [ADD_COMPENSATION_FAILURE]: (state) => ({
    isAddCompensationLoading: false,
    ...state,
    isAddCompensationError: true
  }),

  [FETCH_PAYD_REASON_ADVICE_DESCRIPTION_SUCCESS]: (state, { payload: { newCompensationsMessagesArray } }) => ({
    ...state,
    isFetchPaydReasonAdviceDescriptionError: false,
    compensationsMessages: newCompensationsMessagesArray
  }),

  [combineActions(FETCH_PAYD_REASON_ADVICE_DESCRIPTION_ERROR, FETCH_PAYD_REASON_ADVICE_DESCRIPTION_FAILURE)]: (state) => ({
    ...state,
    isFetchPaydReasonAdviceDescriptionError: true
  }),

  [FETCH_AVAILABLE_BALANCES]: state => ({
    ...state,
    isFetchAvailableBalanceLoading: true
  }),

  [FETCH_AVAILABLE_BALANCES_SUCCESS]: (state, { payload: { availableBalances } }) => ({
    ...state,
    availableBalances,
    isFetchAvailableBalanceError: false,
    isFetchAvailableBalanceLoading: false
  }),

  [FETCH_AVAILABLE_BALANCES_ERROR]: (state, { payload: { newCompensationsMessagesArray } }) => ({
    ...state,
    isFetchAvailableBalanceError: true,
    isFetchAvailableBalanceLoading: false,
    compensationsMessages: newCompensationsMessagesArray
  }),

  [FETCH_AVAILABLE_BALANCES_FAILURE]: (state) => ({
    ...state,
    availableBalances: [],
    isFetchAvailableBalanceError: true,
    isFetchAvailableBalanceLoading: false
  }),

  [CLEAR_COMPENSATION_MESSAGES]: state => ({
    ...state,
    compensationsMessages: []
  })
}, initialState)
