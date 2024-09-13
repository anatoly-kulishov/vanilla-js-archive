
import { connect } from 'react-redux'

import KmsSearchLine from './KmsSearchLine'
import { searchInKms, resetKmsSearchingResults } from 'reducers/searching/kmsSearchingReducer'

const mapStateToProps = state => {
  return {
    personalAccount: state.personalInfo.personalAccountState.personalAccount,
    handlingId: state.internal.handlingState.Id,
    isKmsSearchingLoading: state.searching.kmsSearching.isKmsSearchingLoading,
    kmsSearchingResults: state.searching.kmsSearching.kmsSearchingResults
  }
}

const mapDispatchToProps = {
  searchInKms,
  resetKmsSearchingResults
}

export default connect(mapStateToProps, mapDispatchToProps)(KmsSearchLine)
