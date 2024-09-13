import { get, isNil } from 'lodash-es'

import { AddressTypeIds, AddressTypes } from 'constants/address'
import { checkAddressType } from 'helpers/address'
import { OrderLoadingStatus } from '../../constants/form'
import { GET_DOCUMENT_ERROR, GET_DOCUMENT_FAILURE, GET_DOCUMENT_SUCCESS, GET_DOCUMENT_TYPES_ERROR, GET_DOCUMENT_TYPES_FAILURE, GET_DOCUMENT_TYPES_SUCCESS } from '../constants/actionTypes'
import { RegistrationAddressProperties } from '../constants/address'
import { documentInitialState } from '../constants/initialState'

import { parseAddressToSuggestions } from '../helpers/orderAddress'
import { parseAddressData } from '../helpers/address'

const documentProperties = [
  'DocumentTypeId',
  'Series',
  'Number',
  'IssueDate',
  'EndDate',
  'IssueBy',
  'UnitCode'
]

function parseDocumentAddress (orderState, documentData) {
  const addressData = documentData?.RegistrationAddress
  if (isNil(addressData)) {
    return orderState.Address
  }
  const registrationAddress = parseAddressData(addressData, AddressTypeIds.Registration, RegistrationAddressProperties)
  const filteredAddressState = orderState.Address?.filter(address => !checkAddressType(address, AddressTypeIds.Registration))
  return [
    ...filteredAddressState,
    registrationAddress
  ]
}

function parseDocumentToState (state, documentData) {
  const orderState = { ...state.orderState }
  const document = { ...documentInitialState }
  for (const propertyName of documentProperties) {
    document[propertyName] = get(documentData, propertyName, null)
  }
  orderState.Document = document
  orderState.Address = parseDocumentAddress(state.orderState, documentData)
  return orderState
}

function parseDocumenTypes (documentTypesData) {
  return documentTypesData.map((item) => ({ key: item.Id, value: item.Id, label: item.Name }))
}

function changeStatusOnDocumentLoad (state) {
  if (state.orderLoadingStatus !== OrderLoadingStatus.Finished) {
    state.orderLoadingStatus = OrderLoadingStatus.DocumentReady
  }
}

export function getDocumentReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_DOCUMENT_SUCCESS:
      state.documentData = payload
      state.orderState = parseDocumentToState(state, payload)
      state.addressSuggestion[AddressTypes.Registration] = parseAddressToSuggestions(payload?.RegistrationAddress)
      changeStatusOnDocumentLoad(state)
      break
    case GET_DOCUMENT_ERROR:
    case GET_DOCUMENT_FAILURE:
      break
    default:
      break
  }
}

export function getDocumentTypesReducer (state, action) {
  const { type, payload } = action
  switch (type) {
    case GET_DOCUMENT_TYPES_SUCCESS:
      state.documentTypes = parseDocumenTypes(payload)
      break
    case GET_DOCUMENT_TYPES_ERROR:
    case GET_DOCUMENT_TYPES_FAILURE:
      break
    default:
      break
  }
}
