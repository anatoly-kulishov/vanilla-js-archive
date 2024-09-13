import { cardModes } from 'constants/cardModes'
import { handleActions } from 'redux-actions'

export const SET_CARD_MODE = 'internal/SET_CARD_MODE'

const initalState = {
  cardMode: cardModes.unknown
}

export default handleActions({
  [SET_CARD_MODE]: (state, { payload }) => ({
    ...state,
    cardMode: payload
  })
}, initalState)
