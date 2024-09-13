import { createAction, handleActions } from 'redux-actions'

export const CHOOSE_REGION_MODAL_VISIBLE = 'CHOOSE_REGION_MODAL_VISIBLE'

const initialState = {
  isVisible: false
}

export const changeChooseRegionModalVisibility = createAction(CHOOSE_REGION_MODAL_VISIBLE)

export default handleActions({
  [CHOOSE_REGION_MODAL_VISIBLE]: (state) => ({
    ...state,
    isRegionModalVisible: !state.isRegionModalVisible
  })
}, initialState)
