import { createAction, handleActions } from 'redux-actions'
import produce from 'immer'

export const HANDLE_VISIBLE_PERSON_MODAL = 'person/HANDLE_VISIBLE_PERSON_MODAL'

export const handleVisiblePersonModal = createAction(HANDLE_VISIBLE_PERSON_MODAL)

const initialState = {
  isVisiblePersonModal: false
}

export default handleActions({
  [HANDLE_VISIBLE_PERSON_MODAL]: produce((state) => {
    state.isVisiblePersonModal = !state.isVisiblePersonModal
  })
}, initialState)
