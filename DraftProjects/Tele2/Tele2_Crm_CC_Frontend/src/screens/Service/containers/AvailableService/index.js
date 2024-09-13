import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  changeServiceStatus,
  getAvailableServices,
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
import AvailableServiceTable from './AvailableServiceTable'

const mapStateToProps = state => {
  return {
    ...state.personalInfo.personalAccountState,
    ...state.internal.userState,
    ...state.services.serviceHistory,
    isLoadingInteractions: state.reasonsRegistering.isLoadingInteractions,
    handlingId: state.internal.handlingState.Id,
    kmsSearchingResults: state.searching.kmsSearching.kmsSearchingResults,
    isAvailableServicesLoading: state.services.servicesState.isAvailableServicesLoading,
    isChangeServiceStatusLoading: state.services.servicesState.isChangeServiceStatusLoading,
    servicesState: state.services.servicesState
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changeServiceStatus,
      changeVisibility,
      showServiceHistory,
      getServiceHistory,
      searchInKmsAndRedirect,
      resetKmsSearchingResults,
      getAvailableServices,
      openMultisubscriptionModal
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvailableServiceTable)
