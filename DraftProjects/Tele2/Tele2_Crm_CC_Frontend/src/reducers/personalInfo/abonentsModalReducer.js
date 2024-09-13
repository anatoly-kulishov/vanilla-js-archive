import { createAction, handleActions } from 'redux-actions'

export const ABONENTS_MODAL_VISIBLE = 'ABONENTS_MODAL_VISIBLE'

const initialState = {
  isVisible: false
}

export const changeAbonentsModalVisibility = createAction(ABONENTS_MODAL_VISIBLE)

export default handleActions({
  [ABONENTS_MODAL_VISIBLE]: (state) => ({
    ...state,
    isVisible: !state.isVisible
  })
}, initialState)
