import { connect } from 'react-redux'
import {
  searchCountries,
  searchAddresses,
  searchCodeUFMS,
  setDocumentData,
  getExistingPersonalData,
  checkAddress,
  setSallingProcessStep,
  clearCodeUFMS,
  setRegistrationAddressManually,
  setRegistrationAddressData
} from 'reducers/saleSim/saleSimReducer'
import { SALLING_PROCESS_STEPS, SallingProcessTypes } from 'webseller/features/saleSim/helpers'
import {
  getApprovedStayingDocumentField,
  getApprovedStayingDocuments,
  getDocumentIdentityCountries,
  getDocumentIdentityFields,
  getDocumentIdentityFieldsClear,
  getDocumentIdentityTypes,
  getValidityIdentityDocumentPeriod,
  getValidityStayingDocumentPeriod
} from 'reducers/documentIdentity/documentIdentityReducer'

import DocumentStep from './DocumentStep'
import { selectExistingPersonalData, selectStatusGetExistingPersonalData } from 'reducers/saleSim/selectors'

const mapStateToProps = state => ({
  permissions: state.internal.userState.user.Permissions,
  sallingProcessType: state.saleSim.sallingProcessType,

  documentData: state.saleSim.documentData,
  registrationAddressData: state.saleSim.registrationAddressData,

  statusGetExistingPersonalData: selectStatusGetExistingPersonalData(state),
  existingPersonalData: selectExistingPersonalData(state),

  countries: state.saleSim.countries,
  foundAddresses: state.saleSim.foundAddresses,
  isManualAddressSearch: state.saleSim.isManualAddressSearch,

  isSearchAddressLoading: state.saleSim.isSearchAddressLoading,
  isSearchAddressError: state.saleSim.isSearchAddressError,
  isLoadingCheckPresencePep: state.saleSim.isLoadingCheckPresencePep,
  isCheckSimSaleAvailabilityLoading: state.saleSim.isCheckSimSaleAvailabilityLoading,
  checkSimSaleAvailabilityError: state.saleSim.checkSimSaleAvailabilityError,

  docIdentityTypes: state.documentIdentity.documentIdentityTypes,
  isDocTypesLoading: state.documentIdentity.isDocumentIdentityTypesLoading,
  isDocTypesError: state.documentIdentity.isDocumentIdentityTypesError,

  docIdentityFields: state.documentIdentity.documentIdentityFields?.fields,
  isDocIdentityFieldsLoading: state.documentIdentity.isDocumentIdentityFieldsLoading,
  isDocIdentityFieldsError: state.documentIdentity.isDocumentIdentityFieldsError,

  docIdentityCountries: state.documentIdentity.documentIdentityCountries,
  isDocIdentityCountriesLoading: state.documentIdentity.isDocumentIdentityCountriesLoading,
  isDocIdentityCountriesError: state.documentIdentity.isDocumentIdentityCountriesError,

  approvedStayingDocs: state.documentIdentity.approvedStayingDocuments?.approvedResidenceDocuments,
  isApprovedStayingDocsLoading: state.documentIdentity.isApprovedStayingDocumentsLoading,
  isApprovedStayingDocsError: state.documentIdentity.isApprovedStayingDocumentsError,

  approvedStayingDocsFields: state.documentIdentity.approvedStayingDocumentField?.fields,
  isApprovedStayingDocsFieldLoading: state.documentIdentity.isApprovedStayingDocumentsLoading,
  isApprovedStayingDocsFieldError: state.documentIdentity.isApprovedStayingDocumentFieldError,

  codeUFMS: state.saleSim.codeUFMS,
  isSearchCodeUFMSLoading: state.saleSim.isSearchCodeUFMSLoading,
  isSearchCodeUFMSError: state.saleSim.isSearchCodeUFMSError,

  isValidPeriod: state.documentIdentity.isValidIdentityDocumentPeriod,
  isValidPeriodLoading: state.documentIdentity.isValidIdentityDocumentPeriodLoading,
  isValidPeriodError: state.documentIdentity.isValidIdentityDocumentPeriodError,

  isValidStayingDoc: state.documentIdentity.isValidStayingDocumentPeriod,
  isValidStayingDocLoading: state.documentIdentity.isValidStayingDocumentPeriodLoading
})

const mapDispatchToProps = dispatch => ({
  searchCodeUFMS: payload => dispatch(searchCodeUFMS(payload)),
  clearCodeUFMS: () => dispatch(clearCodeUFMS()),
  searchCountries: payload => dispatch(searchCountries(payload)),
  searchAddresses: payload => dispatch(searchAddresses(payload)),
  getExistingPersonalData: () => dispatch(getExistingPersonalData()),
  setDocumentData: payload => dispatch(setDocumentData(payload)),
  setRegistrationAddressData: payload => dispatch(setRegistrationAddressData(payload)),
  setRegistrationAddressManually: payload => dispatch(setRegistrationAddressManually(payload)),
  getApprovedStayingDocsField: payload => dispatch(getApprovedStayingDocumentField(payload)),
  getDocIdentityCountries: payload => dispatch(getDocumentIdentityCountries(payload)),
  getDocsIdentityFieldsClear: payload => dispatch(getDocumentIdentityFieldsClear(payload)),
  getApprovedStayingDocs: payload => dispatch(getApprovedStayingDocuments(payload)),
  getDocIdentityFields: payload => dispatch(getDocumentIdentityFields(payload)),
  getDocIdentityTypes: payload => dispatch(getDocumentIdentityTypes(payload)),
  getValidityPeriod: payload => dispatch(getValidityIdentityDocumentPeriod(payload)),
  getValidityStayingDoc: payload => dispatch(getValidityStayingDocumentPeriod(payload)),
  toNextStep: () => {
    dispatch(checkAddress())
    dispatch(setSallingProcessStep(SALLING_PROCESS_STEPS.APPROVE_DOCUMENT_DATA))
  },
  toPrevStep: sallingProcessType => {
    const prevStep =
      sallingProcessType === SallingProcessTypes.ORDER
        ? SALLING_PROCESS_STEPS.SCAN_SIMS_IN_ORDER
        : sallingProcessType === SallingProcessTypes.TRANSFER
          ? SALLING_PROCESS_STEPS.TRANSFER_TIME
          : SALLING_PROCESS_STEPS.SALE
    dispatch(setSallingProcessStep(prevStep))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentStep)
