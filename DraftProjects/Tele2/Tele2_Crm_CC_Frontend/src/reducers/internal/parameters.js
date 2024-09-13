import { createAction, handleActions } from 'redux-actions'

export const PASS_QUERY_PARAMS = 'internal/PARAMS_TO_STORE'
export const PASS_HANDLING_TECH_ID = 'internal/PASS_HANDLING_TECH_ID'
export const PASS_QUERY_PARAM = 'internal/PASS_QUERY_PARAM'

const initialState = {
  queryParams: {
    msisdn: '',
    email: '',
    clientId: '',
    branchId: '',
    conversationId: ''
  }
}

export const passQueryParams = createAction(PASS_QUERY_PARAMS)
export const passQueryParam = createAction(PASS_QUERY_PARAM)

export default handleActions({
  [PASS_QUERY_PARAMS]: (state, payload) => ({
    ...state,
    queryParams: payload.payload
  }),
  [PASS_HANDLING_TECH_ID]: (state, { payload }) => ({
    ...state,
    queryParams: { ...state.queryParams, handlingTechId: payload }
  }),
  [PASS_QUERY_PARAM]: (state, { payload }) => ({
    ...state,
    queryParams: { ...state.queryParams, ...payload }
  })
}, initialState)
