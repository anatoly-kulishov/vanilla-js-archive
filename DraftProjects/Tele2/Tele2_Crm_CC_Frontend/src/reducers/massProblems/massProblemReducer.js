import { createAction, handleActions } from 'redux-actions'

export const PROBLEMS_USING_REGION = 'massProblems/PROBLEMS_USING_REGION'

const initalState = {
  billingBranchId: null
}

export const changeProblemRegion = createAction(PROBLEMS_USING_REGION)

export default handleActions({
  [PROBLEMS_USING_REGION]: (state, { payload }) => ({
    ...state,
    billingBranchId: payload
  })
}, initalState)
