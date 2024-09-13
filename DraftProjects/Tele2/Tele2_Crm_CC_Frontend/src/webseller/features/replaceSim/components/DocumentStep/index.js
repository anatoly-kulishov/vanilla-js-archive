import { connect } from 'react-redux'

import {
  getDocumentIdentityFields,
  getDocumentIdentityFieldsClear,
  getDocumentIdentityTypes
} from 'reducers/documentIdentity/documentIdentityReducer'

import { setReplacingProcessStep, setDocumentData } from '../../reducer'
import { REPLACE_PROCESS_STEPS } from '../../constants'
import DocumentStep from './DocumentStep'

const mapStateToProps = state => ({
  documentData: state.recreateClient.transmittingPartyData,
  isLoadingInitialDocumentData: state.recreateClient.isLoadingTransmittingPartyData,
  docIdentityFields: state.documentIdentity.documentIdentityFields?.fields,
  isDocIdentityFieldsLoading: state.documentIdentity.isDocumentIdentityFieldsLoading,
  isDocIdentityFieldsError: state.documentIdentity.isDocumentIdentityFieldsError,
  docIdentityTypes: state.documentIdentity.documentIdentityTypes,
  isDocTypesLoading: state.documentIdentity.isDocumentIdentityTypesLoading,
  isDocTypesError: state.documentIdentity.isDocumentIdentityTypesError
})

const mapDispatchToProps = dispatch => ({
  getDocsIdentityFieldsClear: payload => dispatch(getDocumentIdentityFieldsClear(payload)),
  getDocIdentityFields: payload => dispatch(getDocumentIdentityFields(payload)),
  getDocIdentityTypes: payload => dispatch(getDocumentIdentityTypes(payload)),
  setDocumentData: payload => dispatch(setDocumentData(payload)),
  toPrevStep: () => dispatch(setReplacingProcessStep(REPLACE_PROCESS_STEPS.SEARCH_VERIFICATION)),
  toNextStep: () => dispatch(setReplacingProcessStep(REPLACE_PROCESS_STEPS.SIGNING))
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentStep)
