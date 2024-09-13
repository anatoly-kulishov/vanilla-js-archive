import { createAction } from 'redux-actions'

const ActionTypes = {
  STORE_FOUND_ADDRESSES: 'webseller/documentIdentity/GET_ADDRESSES_SUCCESS',
  STORE_FOUND_COUNTRIES: 'webseller/documentIdentity/GET_COUNTRIES_SUCCESS',

  RESET_STATE: 'webseller/documentIdentity/RESET_STATE'
}

const actionsDocumentIdentityWebSellerRemote = {
  storeFoundAddresses: createAction(ActionTypes.STORE_FOUND_ADDRESSES),
  storeFoundCountries: createAction(ActionTypes.STORE_FOUND_COUNTRIES),
  resetState: createAction(ActionTypes.RESET_STATE)
}

export default actionsDocumentIdentityWebSellerRemote
