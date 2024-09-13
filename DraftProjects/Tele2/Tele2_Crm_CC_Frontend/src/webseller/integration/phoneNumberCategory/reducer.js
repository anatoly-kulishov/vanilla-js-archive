import { produce } from 'immer'
import { createAction, handleActions } from 'redux-actions'

export const SET_PERSONAL_DATA_PHONE_NUMBER_CATEGORY = 'personalAccount/SET_PHONE_NUMBER_CATEGORY'
export const GET_PHONE_NUMBER_CATEGORY = 'personalAccount/GET_PHONE_NUMBER_CATEGORY'

const initialState = {
  phoneNumberCategory: null,
  phoneNumberCode: null,
  discountPrice: null
}

export const fetchPhoneNumberCategory = createAction(GET_PHONE_NUMBER_CATEGORY)
export const setPhoneNumberCategory = createAction(SET_PERSONAL_DATA_PHONE_NUMBER_CATEGORY)

export default handleActions(
  {
    [SET_PERSONAL_DATA_PHONE_NUMBER_CATEGORY]: produce((state, { payload }) => {
      state.phoneNumberCategory = payload.Name
      state.phoneNumberCode = payload.Code
      state.discountPrice = payload.DiscountPrice
    })
  },
  initialState
)
