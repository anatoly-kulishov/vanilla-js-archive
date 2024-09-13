import { createAction, handleActions } from 'redux-actions'

export const LINKED_HANDLING_MODAL_VISIBLITY = 'LINKED_HANDLING_MODAL_VISIBLITY'

const initialState = {
  isVisible: false,
  wasOpened: false
}

export const toggleLinkedHandlingModalVisibility = createAction(LINKED_HANDLING_MODAL_VISIBLITY)

export default handleActions({
  [LINKED_HANDLING_MODAL_VISIBLITY]: (state) => {
    window.sessionStorage.setItem('wasLinkedHandlingModalOpened', true)
    return {
      ...state,
      isVisible: !state.isVisible,
      wasOpened: true
    }
  }
}, initialState)
