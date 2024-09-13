import { createAction, handleActions, combineActions } from 'redux-actions'
import produce from 'immer'

export const SET_PAYD_POST_LIMIT = 'compensation/SET_PAYD_POST_LIMIT'
export const SET_PAYD_POST_LIMIT_SUCCESS = 'compensation/SET_PAYD_POST_LIMIT_SUCCESS'
export const SET_PAYD_POST_LIMIT_ERROR = 'compensation/SET_PAYD_POST_LIMIT_ERROR'
export const SET_PAYD_POST_LIMIT_FAILURE = 'compensation/SET_PAYD_POST_LIMIT_FAILURE'

export const FETCH_AVAILABLE_BALANCE = 'compensation/FETCH_AVAILABLE_BALANCE'
export const FETCH_AVAILABLE_BALANCE_SUCCESS = 'compensation/FETCH_AVAILABLE_BALANCE_SUCCESS'
export const FETCH_AVAILABLE_BALANCE_ERROR = 'compensation/FETCH_AVAILABLE_BALANCE_ERROR'
export const FETCH_AVAILABLE_BALANCE_FAILURE = 'compensation/FETCH_AVAILABLE_BALANCE_FAILURE'

export const ADD_COMPENSATION = 'compensation/ADD_COMPENSATION'
export const ADD_COMPENSATION_SUCCESS = 'compensation/ADD_COMPENSATION_SUCCESS'
export const ADD_COMPENSATION_ERROR = 'compensation/ADD_COMPENSATION_ERROR'
export const ADD_COMPENSATION_FAILURE = 'compensation/ADD_COMPENSATION_FAILURE'

export const VALIDATE_PAYD_HISTORY = 'compensation/VALIDATE_PAYD_HISTORY'
export const VALIDATE_PAYD_HISTORY_SUCCESS = 'compensation/VALIDATE_PAYD_HISTORY_SUCCESS'
export const VALIDATE_PAYD_HISTORY_ERROR = 'compensation/VALIDATE_PAYD_HISTORY_ERROR'
export const VALIDATE_PAYD_HISTORY_FAILURE = 'compensation/VALIDATE_PAYD_HISTORY_FAILURE'

export const ON_START_VALIDATE_PAYD_HISTORY = 'compensation/ON_START_VALIDATE_PAYD_HISTORY'
export const ON_START_VALIDATE_PAYD_HISTORY_SUCCESS = 'compensation/ON_START_VALIDATE_PAYD_HISTORY_SUCCESS'
export const ON_START_VALIDATE_PAYD_HISTORY_ERROR = 'compensation/ON_START_VALIDATE_PAYD_HISTORY_ERROR'
export const ON_START_VALIDATE_PAYD_HISTORY_FAILURE = 'compensation/ON_START_VALIDATE_PAYD_HISTORY_FAILURE'

export const GET_PAYD_COMMENT_RELATE = 'compensation/GET_PAYD_COMMENT_RELATE'
export const GET_PAYD_COMMENT_RELATE_SUCCESS = 'compensation/GET_PAYD_COMMENT_RELATE_SUCCESS'
export const GET_PAYD_COMMENT_RELATE_ERROR = 'compensation/GET_PAYD_COMMENT_RELATE_ERROR'
export const GET_PAYD_COMMENT_RELATE_FAILURE = 'compensation/GET_PAYD_COMMENT_RELATE_FAILURE'

export const COMPENSATION_FORM_MONETARY_SUCCESS = 'compensation/COMPENSATION_FORM_MONETARY_SUCCESS'
export const COMPENSATION_FORM_MONETARY_WARNING = 'compensation/COMPENSATION_FORM_MONETARY_WARNING'
export const COMPENSATION_FORM_MONETARY_ERROR = 'compensation/COMPENSATION_FORM_MONETARY_ERROR'
export const COMPENSATION_FORM_MONETARY_FAILURE = 'compensation/COMPENSATION_FORM_MONETARY_FAILURE'

export const fetchAvailableBalance = createAction(FETCH_AVAILABLE_BALANCE)
export const addCompensation = createAction(ADD_COMPENSATION)
export const validatePaydHistory = createAction(VALIDATE_PAYD_HISTORY)
export const onStartValidatePaydHistory = createAction(ON_START_VALIDATE_PAYD_HISTORY)
export const setPaydPostLimit = createAction(SET_PAYD_POST_LIMIT)
export const getPaydCommentRelate = createAction(GET_PAYD_COMMENT_RELATE)

const emptyError = {
  data: '',
  createdOn: null,
  shouldDisable: false
}

const initialState = {
  paydPostLimit: {
    data: {},
    isLoading: false,
    error: emptyError
  },

  balance: {
    data: [],
    isLoading: false,
    error: emptyError
  },

  compensation: {
    data: {},
    isLoading: false,
    error: emptyError
  },

  paydHistory: {
    data: {},
    isLoading: false,
    error: emptyError
  },

  onStartPaydHistory: {
    data: {},
    isLoading: false,
    error: emptyError
  },

  paydCommentRelate: {
    data: [],
    isLoading: false,
    error: emptyError
  },

  compensationFormMonetary: {
    data: [],
    error: emptyError
  }
}

export default handleActions(
  {
    [SET_PAYD_POST_LIMIT]: produce((state, action) => {
      state.paydPostLimit.isLoading = true
      state.paydPostLimit.error = emptyError
    }),
    [SET_PAYD_POST_LIMIT_SUCCESS]: produce((state, { payload }) => {
      state.paydPostLimit.data = payload
      state.paydPostLimit.isLoading = false
      if (payload.error) state.paydPostLimit.error = payload.error
    }),
    [combineActions(SET_PAYD_POST_LIMIT_ERROR, SET_PAYD_POST_LIMIT_FAILURE)]: produce((state, { payload }) => {
      state.paydPostLimit.isLoading = false
      if (payload.error) state.paydPostLimit.error = payload.error
    }),

    [FETCH_AVAILABLE_BALANCE]: produce((state, action) => {
      state.balance.isLoading = true
      state.balance.error = emptyError
    }),
    [FETCH_AVAILABLE_BALANCE_SUCCESS]: produce((state, { payload }) => {
      state.balance.data = payload.data
      state.balance.isLoading = false
      if (payload.error) state.balance.error = payload.error
    }),
    [combineActions(FETCH_AVAILABLE_BALANCE_ERROR, FETCH_AVAILABLE_BALANCE_FAILURE)]: produce((state, { payload }) => {
      state.balance.isLoading = false
      if (payload.error) state.balance.error = payload.error
    }),

    [ADD_COMPENSATION]: produce((state, action) => {
      state.compensation.isLoading = true
      state.compensation.error = emptyError
    }),
    [ADD_COMPENSATION_SUCCESS]: produce((state, { payload }) => {
      state.compensation.data = payload.data
      state.compensation.isLoading = false
      if (payload.error) state.compensation.error = payload.error
    }),
    [combineActions(ADD_COMPENSATION_ERROR, ADD_COMPENSATION_FAILURE)]: produce((state, { payload }) => {
      state.compensation.isLoading = false
      if (payload.error) state.compensation.error = payload.error
    }),

    [VALIDATE_PAYD_HISTORY]: produce((state, action) => {
      state.paydHistory.isLoading = true
      state.paydHistory.error = emptyError
    }),
    [VALIDATE_PAYD_HISTORY_SUCCESS]: produce((state, { payload }) => {
      state.paydHistory.data = payload.data
      state.paydHistory.isLoading = false
      if (payload.error) state.paydHistory.error = payload.error
    }),
    [combineActions(VALIDATE_PAYD_HISTORY_ERROR, VALIDATE_PAYD_HISTORY_FAILURE)]: produce((state, { payload }) => {
      state.paydHistory.isLoading = false
      if (payload.error) state.paydHistory.error = payload.error
    }),

    [ON_START_VALIDATE_PAYD_HISTORY]: produce((state, action) => {
      state.onStartPaydHistory.isLoading = true
      state.onStartPaydHistory.error = emptyError
    }),
    [ON_START_VALIDATE_PAYD_HISTORY_SUCCESS]: produce((state, { payload }) => {
      state.onStartPaydHistory.data = payload.data
      state.onStartPaydHistory.isLoading = false
      if (payload.error) state.onStartPaydHistory.error = payload.error
    }),
    [combineActions(ON_START_VALIDATE_PAYD_HISTORY_ERROR, ON_START_VALIDATE_PAYD_HISTORY_FAILURE)]: produce(
      (state, { payload }) => {
        state.onStartPaydHistory.isLoading = false
        if (payload.error) state.onStartPaydHistory.error = payload.error
      }
    ),

    [GET_PAYD_COMMENT_RELATE]: produce(state => {
      state.paydCommentRelate.isLoading = true
      state.paydCommentRelate.error = emptyError
    }),
    [GET_PAYD_COMMENT_RELATE_SUCCESS]: produce((state, { payload }) => {
      state.paydCommentRelate.data = payload.data
      state.paydCommentRelate.isLoading = false
      if (payload.error) state.paydCommentRelate.error = payload.error
    }),
    [combineActions(GET_PAYD_COMMENT_RELATE_ERROR, GET_PAYD_COMMENT_RELATE_FAILURE)]: produce((state, { payload }) => {
      state.paydCommentRelate.isLoading = false
      if (payload.error) state.paydCommentRelate.error = payload.error
    }),

    [COMPENSATION_FORM_MONETARY_SUCCESS]: produce((state, { payload }) => {
      state.compensationFormMonetary.data = payload.data
      if (payload.error) {
        state.compensationFormMonetary.error = payload.error
      } else {
        state.compensationFormMonetary.error = emptyError
      }
    }),
    [combineActions(COMPENSATION_FORM_MONETARY_ERROR, COMPENSATION_FORM_MONETARY_WARNING, COMPENSATION_FORM_MONETARY_FAILURE)]: produce((state, { payload }) => {
      if (payload.error) {
        state.compensationFormMonetary.error = payload.error
      } else {
        state.compensationFormMonetary.error = emptyError
      }
    })
  },
  initialState
)
