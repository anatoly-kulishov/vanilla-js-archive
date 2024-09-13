import { NumberModalTypes } from 'constants/number'
import { CHECK_MSISDN, CHECK_MSISDN_ERROR, CHECK_MSISDN_FAILURE, CHECK_MSISDN_SUCCESS, GET_MSISDN, GET_MSISDN_ERROR, GET_MSISDN_FAILURE, GET_MSISDN_SUCCESS, RESERVE_MSISDN, RESERVE_MSISDN_ERROR, RESERVE_MSISDN_FAILURE, RESERVE_MSISDN_SUCCESS } from '../constants/actionTypes'

export function getMsisdnReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_MSISDN:
      state.msisdnState.isLoading = true
      break
    case GET_MSISDN_SUCCESS:
      state.msisdnState.isLoading = false
      state.msisdnState.data = payload
      break
    case GET_MSISDN_ERROR:
    case GET_MSISDN_FAILURE:
      state.msisdnState.isLoading = false
      break
    default:
      break
  }
}

export function reserveMsisdnReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case RESERVE_MSISDN:
      state.reserveMsisdnState.isLoading = true
      break
    case RESERVE_MSISDN_SUCCESS:
      state.reserveMsisdnState.isLoading = false
      state.reserveMsisdnState.isSuccess = true
      state.isNumberModalVisible = true
      state.numberModalType = NumberModalTypes.NewNumber
      state.orderState.ReservedMsisdn = payload.msisdn
      break
    case RESERVE_MSISDN_ERROR:
    case RESERVE_MSISDN_FAILURE:
      state.reserveMsisdnState.isLoading = false
      break
    default:
      break
  }
}

export function checkMsisdnReducer (state, action) {
  const { type } = action
  switch (type) {
    case CHECK_MSISDN:
      state.checkMsisdnState.isLoading = true
      break
    case CHECK_MSISDN_SUCCESS:
      state.checkMsisdnState.isLoading = false
      state.isNumberModalVisible = true
      state.numberModalType = NumberModalTypes.MnpNumber
      break
    case CHECK_MSISDN_ERROR:
    case CHECK_MSISDN_FAILURE:
      state.checkMsisdnState.isLoading = false
      break
    default:
      break
  }
}
