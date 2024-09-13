
import { connect } from 'react-redux'
import { searchInKmsAndRedirect } from 'reducers/searching/kmsSearchingReducer'

import KmsSearchTooltip from './KmsSearchTooltip'

const mapStateToProps = state => ({
  ...state.personalInfo.personalAccountState,
  handlingId: state.internal.handlingState.Id,
  kmsSearchingResults: state.searching.kmsSearching.kmsSearchingResults
})

const mapDispatchToProps = {
  searchInKmsAndRedirect
}

export default connect(mapStateToProps, mapDispatchToProps)(KmsSearchTooltip)
