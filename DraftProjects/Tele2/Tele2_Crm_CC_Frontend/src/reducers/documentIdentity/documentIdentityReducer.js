import { produce } from 'immer'
import { createAction, handleActions } from 'redux-actions'

export const GET_DOCUMENT_IDENTITY_TYPES = 'documentIdentity/GET_DOCUMENT_IDENTITY_TYPES'
export const GET_DOCUMENT_IDENTITY_TYPES_SUCCESS = 'documentIdentity/GET_DOCUMENT_IDENTITY_TYPES_SUCCESS'
export const GET_DOCUMENT_IDENTITY_TYPES_ERROR = 'documentIdentity/GET_DOCUMENT_IDENTITY_TYPES_ERROR'

export const GET_DOCUMENT_IDENTITY_FIELDS = 'documentIdentity/GET_DOCUMENT_IDENTITY_FIELDS'
export const GET_DOCUMENT_IDENTITY_FIELDS_SUCCESS = 'documentIdentity/GET_DOCUMENT_IDENTITY_FIELDS_SUCCESS'
export const GET_DOCUMENT_IDENTITY_FIELDS_ERROR = 'documentIdentity/GET_DOCUMENT_IDENTITY_FIELDS_ERROR'

export const GET_DOCUMENT_IDENTITY_COUNTRIES = 'documentIdentity/GET_DOCUMENT_IDENTITY_COUNTRIES'
export const GET_DOCUMENT_IDENTITY_COUNTRIES_SUCCESS = 'documentIdentity/GET_DOCUMENT_IDENTITY_COUNTRIES_SUCCESS'
export const GET_DOCUMENT_IDENTITY_COUNTRIES_ERROR = 'documentIdentity/GET_DOCUMENT_IDENTITY_COUNTRIES_ERROR'
export const GET_DOCUMENT_IDENTITY_COUNTRIES_CLEAR = 'documentIdentity/GET_DOCUMENT_IDENTITY_COUNTRIES_CLEAR'

export const GET_APPROVED_STAYING_DOCUMENTS = 'documentIdentity/GET_APPROVED_STAYING_DOCUMENTS'
export const GET_APPROVED_STAYING_DOCUMENTS_SUCCESS = 'documentIdentity/GET_APPROVED_STAYING_DOCUMENTS_SUCCESS'
export const GET_APPROVED_STAYING_DOCUMENTS_ERROR = 'documentIdentity/GET_APPROVED_STAYING_DOCUMENTS_ERROR'

export const GET_APPROVED_STAYING_DOCUMENT_FIELD = 'documentIdentity/GET_APPROVED_STAYING_DOCUMENT_FIELD'
export const GET_APPROVED_STAYING_DOCUMENT_FIELD_SUCCESS = 'documentIdentity/GET_APPROVED_STAYING_DOCUMENT_FIELD_SUCCESS'
export const GET_APPROVED_STAYING_DOCUMENT_FIELD_ERROR = 'documentIdentity/GET_APPROVED_STAYING_DOCUMENT_FIELD_ERROR'

export const GET_VALIDITY_IDENTITY_DOCUMENT_PERIOD = 'documentIdentity/GET_VALIDITY_IDENTITY_DOCUMENT_PERIOD'
export const GET_VALIDITY_IDENTITY_DOCUMENT_PERIOD_SUCCESS = 'documentIdentity/GET_VALIDITY_IDENTITY_DOCUMENT_PERIOD_SUCCESS'
export const GET_VALIDITY_IDENTITY_DOCUMENT_PERIOD_ERROR = 'documentIdentity/GET_VALIDITY_IDENTITY_DOCUMENT_PERIOD_ERROR'

export const GET_VALIDITY_STAYING_DOCUMENT_PERIOD = 'documentIdentity/GET_VALIDITY_STAYING_DOCUMENT_PERIOD'
export const GET_VALIDITY_STAYING_DOCUMENT_PERIOD_SUCCESS = 'documentIdentity/GET_VALIDITY_STAYING_DOCUMENT_PERIOD_SUCCESS'
export const GET_VALIDITY_STAYING_DOCUMENT_PERIOD_ERROR = 'documentIdentity/GET_VALIDITY_STAYING_DOCUMENT_PERIOD_ERROR'

export const getDocumentIdentityTypes = createAction(GET_DOCUMENT_IDENTITY_TYPES)
export const getDocumentIdentityTypesSuccess = createAction(GET_DOCUMENT_IDENTITY_TYPES_SUCCESS)
export const getDocumentIdentityTypesError = createAction(GET_DOCUMENT_IDENTITY_TYPES_ERROR)

export const getDocumentIdentityFields = createAction(GET_DOCUMENT_IDENTITY_FIELDS)
export const getDocumentIdentityFieldsSuccess = createAction(GET_DOCUMENT_IDENTITY_FIELDS_SUCCESS)
export const getDocumentIdentityFieldsError = createAction(GET_DOCUMENT_IDENTITY_FIELDS_ERROR)
export const getDocumentIdentityFieldsClear = createAction(GET_DOCUMENT_IDENTITY_COUNTRIES_CLEAR)

export const getDocumentIdentityCountries = createAction(GET_DOCUMENT_IDENTITY_COUNTRIES)
export const getDocumentIdentityCountriesSuccess = createAction(GET_DOCUMENT_IDENTITY_COUNTRIES_SUCCESS)
export const getDocumentIdentityCountriesError = createAction(GET_DOCUMENT_IDENTITY_COUNTRIES_ERROR)

export const getApprovedStayingDocuments = createAction(GET_APPROVED_STAYING_DOCUMENTS)
export const getApprovedStayingDocumentsSuccess = createAction(GET_APPROVED_STAYING_DOCUMENTS_SUCCESS)
export const getApprovedStayingDocumentsError = createAction(GET_APPROVED_STAYING_DOCUMENTS_ERROR)

export const getApprovedStayingDocumentField = createAction(GET_APPROVED_STAYING_DOCUMENT_FIELD)
export const getApprovedStayingDocumentFieldSuccess = createAction(GET_APPROVED_STAYING_DOCUMENT_FIELD_SUCCESS)
export const getApprovedStayingDocumentFieldError = createAction(GET_APPROVED_STAYING_DOCUMENT_FIELD_ERROR)

export const getValidityIdentityDocumentPeriod = createAction(GET_VALIDITY_IDENTITY_DOCUMENT_PERIOD)
export const getValidityIdentityDocumentPeriodSuccess = createAction(GET_VALIDITY_IDENTITY_DOCUMENT_PERIOD_SUCCESS)
export const getValidityIdentityDocumentPeriodError = createAction(GET_VALIDITY_IDENTITY_DOCUMENT_PERIOD_ERROR)

export const getValidityStayingDocumentPeriod = createAction(GET_VALIDITY_STAYING_DOCUMENT_PERIOD)
export const getValidityStayingDocumentPeriodSuccess = createAction(GET_VALIDITY_STAYING_DOCUMENT_PERIOD_SUCCESS)
export const getValidityStayingDocumentPeriodError = createAction(GET_VALIDITY_STAYING_DOCUMENT_PERIOD_ERROR)

const initialState = {
  documentIdentityTypes: null,
  isDocumentIdentityTypesLoading: false,
  isDocumentIdentityTypesError: false,

  documentIdentityFields: null,
  isDocumentIdentityFieldsLoading: false,
  isDocumentIdentityFieldsError: false,

  documentIdentityCountries: null,
  isDocumentIdentityCountriesLoading: false,
  isDocumentIdentityCountriesError: false,

  approvedStayingDocuments: null,
  isApprovedStayingDocumentsLoading: false,
  isApprovedStayingDocumentsError: false,

  approvedStayingDocumentField: null,
  isApprovedStayingDocumentFieldLoading: false,
  isApprovedStayingDocumentFieldError: false,

  isValidIdentityDocumentPeriod: null,
  isValidIdentityDocumentPeriodLoading: false,
  isValidIdentityDocumentPeriodError: false,

  isValidStayingDocumentPeriod: null,
  isValidStayingDocumentPeriodLoading: false,
  isValidStayingDocumentPeriodError: false
}

export default handleActions({
  [GET_DOCUMENT_IDENTITY_TYPES]: produce((state) => {
    state.isDocumentIdentityTypesLoading = true
  }),
  [GET_DOCUMENT_IDENTITY_TYPES_SUCCESS]: produce((state, { payload }) => {
    state.documentIdentityTypes = payload.data
    state.isDocumentIdentityTypesLoading = false
    state.isDocumentIdentityTypesError = false
  }),
  [GET_DOCUMENT_IDENTITY_TYPES_ERROR]: produce((state) => {
    state.isDocumentIdentityTypesLoading = false
    state.isDocumentIdentityTypesError = true
  }),

  [GET_DOCUMENT_IDENTITY_FIELDS]: produce((state) => {
    state.isDocumentIdentityFieldsLoading = true
  }),
  [GET_DOCUMENT_IDENTITY_FIELDS_SUCCESS]: produce((state, { payload }) => {
    state.documentIdentityFields = payload.data
    state.isDocumentIdentityFieldsLoading = false
    state.isDocumentIdentityFieldsError = false
  }),
  [GET_DOCUMENT_IDENTITY_FIELDS_ERROR]: produce((state) => {
    state.isDocumentIdentityFieldsLoading = false
    state.isDocumentIdentityFieldsError = true
  }),

  [GET_DOCUMENT_IDENTITY_COUNTRIES]: produce((state) => {
    state.isDocumentIdentityCountriesLoading = true
  }),
  [GET_DOCUMENT_IDENTITY_COUNTRIES_SUCCESS]: produce((state, { payload }) => {
    state.documentIdentityCountries = payload.data
    state.isDocumentIdentityCountriesLoading = false
    state.isDocumentIdentityCountriesError = false
  }),
  [GET_DOCUMENT_IDENTITY_COUNTRIES_ERROR]: produce((state) => {
    state.isDocumentIdentityCountriesLoading = false
    state.isDocumentIdentityCountriesError = true
  }),
  [GET_DOCUMENT_IDENTITY_COUNTRIES_CLEAR]: produce((state) => {
    state.documentIdentityCountries = null
  }),

  [GET_APPROVED_STAYING_DOCUMENTS]: produce((state) => {
    state.isApprovedStayingDocumentsLoading = true
  }),
  [GET_APPROVED_STAYING_DOCUMENTS_SUCCESS]: produce((state, { payload }) => {
    state.approvedStayingDocuments = payload.data
    state.isApprovedStayingDocumentsLoading = false
    state.isApprovedStayingDocumentsError = false
  }),
  [GET_APPROVED_STAYING_DOCUMENTS_ERROR]: produce((state) => {
    state.isApprovedStayingDocumentsLoading = false
    state.isApprovedStayingDocumentsError = true
  }),

  [GET_APPROVED_STAYING_DOCUMENT_FIELD]: produce((state) => {
    state.isApprovedStayingDocumentsLoading = true
  }),
  [GET_APPROVED_STAYING_DOCUMENT_FIELD_SUCCESS]: produce((state, { payload }) => {
    state.approvedStayingDocumentField = payload.data
    state.isApprovedStayingDocumentsLoading = false
    state.isApprovedStayingDocumentFieldError = false
  }),
  [GET_APPROVED_STAYING_DOCUMENT_FIELD_ERROR]: produce((state) => {
    state.isApprovedStayingDocumentsLoading = false
    state.isApprovedStayingDocumentFieldError = true
  }),

  [GET_VALIDITY_IDENTITY_DOCUMENT_PERIOD]: produce((state) => {
    state.isValidIdentityDocumentPeriodLoading = true
  }),
  [GET_VALIDITY_IDENTITY_DOCUMENT_PERIOD_SUCCESS]: produce((state, { payload }) => {
    state.isValidIdentityDocumentPeriod = payload.data?.result && payload.data?.isDocumentValid
    state.isValidIdentityDocumentPeriodLoading = false
    state.isValidIdentityDocumentPeriodError = false
  }),
  [GET_VALIDITY_IDENTITY_DOCUMENT_PERIOD_ERROR]: produce((state) => {
    state.isValidIdentityDocumentPeriod = null
    state.isValidIdentityDocumentPeriodLoading = false
    state.isValidIdentityDocumentPeriodError = true
  }),

  [GET_VALIDITY_STAYING_DOCUMENT_PERIOD]: produce((state) => {
    state.isValidStayingDocumentPeriodLoading = true
  }),
  [GET_VALIDITY_STAYING_DOCUMENT_PERIOD_SUCCESS]: produce((state, { payload }) => {
    state.isValidStayingDocumentPeriod = payload.data?.result && payload.data?.isDocumentValid
    state.isValidStayingDocumentPeriodLoading = false
    state.isValidStayingDocumentPeriodError = false
  }),
  [GET_VALIDITY_STAYING_DOCUMENT_PERIOD_ERROR]: produce((state) => {
    state.isValidStayingDocumentPeriod = null
    state.isValidStayingDocumentPeriodLoading = false
    state.isValidStayingDocumentPeriodError = true
  })
}, initialState)
