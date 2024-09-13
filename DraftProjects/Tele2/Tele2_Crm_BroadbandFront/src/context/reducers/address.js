import { AddressTypeIds } from '../../constants/address'
import { checkAddressType } from 'helpers/address'
import {
  CHANGE_CHECK_ADDRESS_STATUS,
  CHECK_ADDRESS,
  CHECK_ADDRESS_ERROR,
  CHECK_ADDRESS_FAILURE,
  CHECK_ADDRESS_SUCCESS,
  CLEAN_CHECK_ADDRESS,
  GET_ADDRESS_SUGGESTION_ERROR,
  GET_ADDRESS_SUGGESTION_FAILURE,
  GET_ADDRESS_SUGGESTION_SUCCESS,
  RECHECK_ADDRESS_ERROR,
  RECHECK_ADDRESS_FAILURE,
  RECHECK_ADDRESS_SUCCESS
} from '../constants/actionTypes'
import { AddressMainFields } from '../constants/address'
import { initialState, StateStatus } from '../constants/initialState'
import { parseRecheckAddressToState, parseRecheckAddressToSuggestion } from '../helpers/address'

// Save new suggestion and clear previous if prior address part has changed
function processAddressSuggestion (state, data) {
  const { DaData: SuggestionData, SearchType } = data
  switch (SearchType) {
    case AddressMainFields.Region:
      return { [AddressMainFields.Region]: SuggestionData }
    case AddressMainFields.City:
      return {
        [AddressMainFields.Region]: state?.Region,
        [AddressMainFields.City]: SuggestionData
      }
    case AddressMainFields.Street:
      return {
        [AddressMainFields.Region]: state?.Region,
        [AddressMainFields.City]: state?.City,
        [AddressMainFields.Street]: SuggestionData
      }
    case AddressMainFields.House:
      return {
        [AddressMainFields.Region]: state?.Region,
        [AddressMainFields.City]: state?.City,
        [AddressMainFields.Street]: state?.Street,
        [AddressMainFields.House]: SuggestionData
      }
    case AddressMainFields.Address:
      return {
        [AddressMainFields.Region]: state?.Region,
        [AddressMainFields.Address]: SuggestionData
      }
    case null: // null in SearchType only for recheck request
      return {
        [AddressMainFields.Region]: parseRecheckAddressToSuggestion(SuggestionData, 'Region'),
        [AddressMainFields.City]: parseRecheckAddressToSuggestion(SuggestionData, 'City'),
        [AddressMainFields.Street]: parseRecheckAddressToSuggestion(SuggestionData, 'Street'),
        [AddressMainFields.House]: parseRecheckAddressToSuggestion(SuggestionData, 'House'),
        [AddressMainFields.Address]: parseRecheckAddressToSuggestion(SuggestionData, 'Address')
      }
    default:
      return {}
  }
}

export function recheckAddressReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case RECHECK_ADDRESS_SUCCESS:
      const { data, addressType } = payload
      state.addressSuggestion[addressType] = processAddressSuggestion(state.addressSuggestion[addressType], data)
      state.orderState = parseRecheckAddressToState(state, data, addressType)
      state.autoActions.recheckAddress[addressType] = StateStatus.NeedAction
      break
    case RECHECK_ADDRESS_ERROR:
    case RECHECK_ADDRESS_FAILURE:
      break
    default:
      break
  }
}

export function getAddressSuggestionReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_ADDRESS_SUGGESTION_SUCCESS:
      const { data, addressType } = payload
      state.addressSuggestion[addressType] = processAddressSuggestion(state.addressSuggestion[addressType], data)
      break
    case GET_ADDRESS_SUGGESTION_ERROR:
    case GET_ADDRESS_SUGGESTION_FAILURE:
      break
    default:
      break
  }
}

function parseCheckAddressToState (state, data) {
  if (!data) {
    return state.orderState
  }
  const orderState = {
    ...state.orderState,
    RtcOrderId: data?.RtcOrderId,
    IsOnlime: data?.IsOnlime,
    AvailableSpeedValue: data?.MaxSpeed,
    AvailableTechnology: data?.Technology,
    KladrRegion: data?.KladrRegion
  }
  const installationAddress = orderState.Address?.find(address =>
    checkAddressType(address, AddressTypeIds.Installation)
  )
  if (installationAddress) {
    installationAddress.OrponId = data?.OrponId
  }
  return orderState
}

export function checkAddressReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case CHECK_ADDRESS:
      state.checkAddressState = { ...initialState.checkAddressState, isLoading: true }
      break
    case CHECK_ADDRESS_SUCCESS:
      const { data } = payload
      state.checkAddressState = {
        ...state.checkAddressState,
        data: payload?.data,
        message: payload?.message,
        isLoading: false
      }
      state.autoActions.checkAddress = StateStatus.NeedAction
      state.orderState = parseCheckAddressToState(state, data)
      break
    case CHECK_ADDRESS_ERROR:
    case CHECK_ADDRESS_FAILURE:
      state.checkAddressState = {
        ...state.checkAddressState,
        data: payload?.data,
        message: payload?.message,
        isLoading: false,
        isError: true
      }
      state.orderState = parseCheckAddressToState(state, data)
      break
    case CLEAN_CHECK_ADDRESS:
      break
    default:
      break
  }
}

export function changeCheckAddressStatusReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case CHANGE_CHECK_ADDRESS_STATUS:
      state.autoActions.checkAddress = payload
      break
    default:
      break
  }
}
