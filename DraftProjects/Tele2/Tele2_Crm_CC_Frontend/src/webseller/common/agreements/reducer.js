import { produce } from 'immer'
import { createAction, handleActions } from 'redux-actions'

import { AgreementKey } from './helpers'

const CHANGE_AGREEMENT = 'agreements/CHANGE_AGREEMENT'
const RESET_AGREEMENTS = 'agreements/RESET_AGREEMENTS'

const initialState = Object.keys(AgreementKey).reduce((agreements, agreementKey) => {
  return {
    ...agreements,
    [agreementKey]: false
  }
}, {})

export const changeAgreement = createAction(CHANGE_AGREEMENT)
export const resetAgreements = createAction(RESET_AGREEMENTS)

export default handleActions(
  {
    [CHANGE_AGREEMENT]: produce((state, { payload }) => {
      state[payload] = !state[payload]
    }),

    [RESET_AGREEMENTS]: () => initialState
  },
  initialState
)
