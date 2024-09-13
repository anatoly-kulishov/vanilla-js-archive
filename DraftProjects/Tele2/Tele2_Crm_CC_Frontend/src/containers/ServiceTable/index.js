import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  changeServiceStatus,
  getConnectedServices,
  openMultisubscriptionModal
} from 'reducers/services/serviceReducer'
import {
  changeVisibility,
  showServiceHistory,
  getServiceHistory
} from 'reducers/services/serviceHistoryReducer'
import {
  searchInKmsAndRedirect,
  resetKmsSearchingResults
} from 'reducers/searching/kmsSearchingReducer'
import ServiceTable from './ServiceTable'

const mapStateToProps = state => {
  return {
    ...state.personalInfo.personalAccountState,
    ...state.services.serviceHistory,
    handlingId: state.internal.handlingState.Id,
    kmsSearchingResults: state.searching.kmsSearching.kmsSearchingResults,
    isConnectedServicesLoading: state.services.servicesState.isConnectedServicesLoading,
    isLoadingInteractions: state.reasonsRegistering.isLoadingInteractions,
    isChangeServiceStatusLoading: state.services.servicesState.isChangeServiceStatusLoading
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeServiceStatus,
      changeVisibility,
      showServiceHistory,
      getServiceHistory,
      resetKmsSearchingResults,
      searchInKmsAndRedirect,
      getConnectedServices,
      openMultisubscriptionModal
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceTable)
