import React, { Suspense } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'

import store from 'utils/createdStore'
import {
  clearCodeUFMS,
  searchAddresses,
  searchCodeUFMS,
  setRegistrationAddressData,
  setRegistrationAddressManually
} from 'reducers/saleSim/saleSimReducer'
import {
  getDocumentIdentityCountries,
  getDocumentIdentityFields,
  getDocumentIdentityFieldsClear,
  getDocumentIdentityTypes,
  getValidityIdentityDocumentPeriod,
  getApprovedStayingDocuments,
  getApprovedStayingDocumentField
} from 'reducers/documentIdentity/documentIdentityReducer'
import {
  setCorrectionDataProcessStep,
  setDocumentData,
  storeRegistrationAddress as storeRegistrationAddressAction,
  storeDocumentType as storeDocumentTypeAction
} from 'webseller/features/correctionData/reducer'
import featureConfig from 'webseller/featureConfig'

import DocumentStep from './DocumentStep'
import { CORRECTION_PROCESS_STEPS } from '../../helpers'
import { selectPersonalDataCorrectionData } from '../../selectors'
import { selectIsWebSeller } from 'webseller/common/user/selectors'
import { getTypeCard } from 'webseller/helpers'

const DocumentIdentity = React.lazy(() => import('websellerRemote/DocumentIdentity'))

const DEPRECATEDdocumentIdentityCorrectionData = (function () {
  const mapStateToProps = state => ({
    documentData: state.correctionData.documentData,
    registrationAddressData: state.saleSim.registrationAddressData,

    foundAddresses: state.saleSim.foundAddresses,
    isSearchAddressLoading: state.saleSim.isSearchAddressLoading,
    isSearchAddressError: state.saleSim.isSearchAddressError,
    isManualAddressSearch: state.saleSim.isManualAddressSearch,

    isValidPeriod: state.documentIdentity.isValidIdentityDocumentPeriod,

    docIdentityTypes: state.documentIdentity.documentIdentityTypes,
    isDocTypesLoading: state.documentIdentity.isDocumentIdentityTypesLoading,
    isDocTypesError: state.documentIdentity.isDocumentIdentityTypesError,

    docIdentityFields: state.documentIdentity.documentIdentityFields?.fields,
    isDocIdentityFieldsLoading: state.documentIdentity.isDocumentIdentityFieldsLoading,
    isDocIdentityFieldsError: state.documentIdentity.isDocumentIdentityFieldsError,

    docIdentityCountries: state.documentIdentity.documentIdentityCountries,
    isDocIdentityCountriesLoading: state.documentIdentity.isDocumentIdentityCountriesLoading,
    isDocIdentityCountriesError: state.documentIdentity.isDocumentIdentityCountriesError,

    codeUFMS: state.saleSim.codeUFMS,
    isSearchCodeUFMSLoading: state.saleSim.isSearchCodeUFMSLoading,
    isSearchCodeUFMSError: state.saleSim.isSearchCodeUFMSError,

    approvedStayingDocs: state.documentIdentity.approvedStayingDocuments?.approvedResidenceDocuments,
    approvedStayingDocsFields: state.documentIdentity.approvedStayingDocumentField?.fields,
    isApprovedStayingDocsFieldLoading: state.documentIdentity.isApprovedStayingDocumentsLoading,

    user: state.internal.userState.user
  })

  const mapDispatchToProps = dispatch => ({
    searchCodeUFMS: payload => dispatch(searchCodeUFMS(payload)),
    searchAddresses: payload => dispatch(searchAddresses(payload)),
    setDocumentData: payload => dispatch(setDocumentData(payload)),
    setRegistrationAddressData: payload => dispatch(setRegistrationAddressData(payload)),
    setRegistrationAddressManually: payload => dispatch(setRegistrationAddressManually(payload)),
    getDocIdentityCountries: payload => dispatch(getDocumentIdentityCountries(payload)),
    getDocsIdentityFieldsClear: payload => dispatch(getDocumentIdentityFieldsClear(payload)),
    getDocIdentityFields: payload => dispatch(getDocumentIdentityFields(payload)),
    getDocIdentityTypes: payload => dispatch(getDocumentIdentityTypes(payload)),
    getValidityPeriod: payload => dispatch(getValidityIdentityDocumentPeriod(payload)),
    getApprovedStayingDocs: payload => dispatch(getApprovedStayingDocuments(payload)),
    getApprovedStayingDocsField: payload => dispatch(getApprovedStayingDocumentField(payload)),
    clearCodeUFMS: () => dispatch(clearCodeUFMS()),
    toNextStep: () => dispatch(setCorrectionDataProcessStep(CORRECTION_PROCESS_STEPS.APPROVE_DOCUMENT_DATA))
  })

  return connect(mapStateToProps, mapDispatchToProps)(DocumentStep)
})()

const REMOTEdocumentIdentityCorrectionData = () => {
  const isWebSeller = useSelector(selectIsWebSeller)
  const initialValues = useSelector(selectPersonalDataCorrectionData)

  const { isAnonymousCard } = getTypeCard(isWebSeller)

  const dispatch = useDispatch()

  const storeRegistrationAddress = address => {
    dispatch(storeRegistrationAddressAction(address))
  }

  const storeDocumentType = documentType => {
    dispatch(storeDocumentTypeAction(documentType))
  }

  const submitDocumentIdentityStep = valuesDocumentIdentity => {
    dispatch(setDocumentData(valuesDocumentIdentity))
  }

  return (
    <Suspense fallback={null}>
      <DocumentIdentity
        store={store}
        isNeedToUseMigrationCardForm
        initialValues={!isAnonymousCard ? initialValues : undefined}
        storeRegistrationAddress={storeRegistrationAddress}
        storeDocumentType={storeDocumentType}
        onFinish={submitDocumentIdentityStep}
      />
    </Suspense>
  )
}

const DocumentIdentityCorrectionData = featureConfig.isUseRemoteDocumentIdentity
  ? REMOTEdocumentIdentityCorrectionData
  : DEPRECATEDdocumentIdentityCorrectionData

export default DocumentIdentityCorrectionData
