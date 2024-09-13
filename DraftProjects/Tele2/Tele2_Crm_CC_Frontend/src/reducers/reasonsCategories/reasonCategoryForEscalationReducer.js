import { createAction, handleActions } from 'redux-actions'

export const RC_FOR_ESCALATION_FETCH = 'handling/RC_FOR_ESCALATION_FETCH'
export const RC_FOR_ESCALATION_FETCH_SUCCESS = 'handling/RC_FOR_ESCALATION_FETCH_SUCCESS'
export const RC_FOR_ESCALATION_FETCH_ERROR = 'handling/RC_FOR_ESCALATION_FETCH_ERROR'
export const RC_FOR_ESCALATION_FETCH_FAILURE = 'handling/RC_FOR_ESCALATION_FETCH_FAILURE'

const initialState = {
  reasonCategoryForEscalation: null,
  isReasonCategoryForEscalationLoading: false,
  reasonCategoryForEscalationError: null,
  isReasonCategoryForEscalationError: false
}

export const getReasonCategoryForEscalation = createAction(RC_FOR_ESCALATION_FETCH)

export default handleActions(
  {
    [RC_FOR_ESCALATION_FETCH]: state => ({
      ...state,
      isReasonCategoryForEscalationLoading: true
    }),

    [RC_FOR_ESCALATION_FETCH_SUCCESS]: (state, { payload: { IsSuccess, Data, MessageText } }) => ({
      ...state,
      reasonCategoryForEscalation: Data,
      isReasonCategoryForEscalationLoading: false,
      isReasonCategoryForEscalationError: IsSuccess
    }),

    [RC_FOR_ESCALATION_FETCH_ERROR]: (state, { payload: { IsSuccess, Data, MessageText } }) => ({
      ...state,
      reasonCategoryForEscalation: Data,
      isReasonCategoryForEscalationLoading: false,
      isReasonCategoryForEscalationError: IsSuccess,
      reasonCategoryForEscalationError: MessageText
    }),

    [RC_FOR_ESCALATION_FETCH_FAILURE]: state => ({
      ...state,
      reasonCategoryForEscalation: null,
      isReasonCategoryForEscalationLoading: false,
      isReasonCategoryForEscalationError: true,
      reasonCategoryForEscalationError: 'Ошибка получения данных о заметки для эскалации'
    })
  },
  initialState
)
