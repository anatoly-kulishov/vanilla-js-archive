import { connect } from 'react-redux'

import SalesAndOfficesFilters from './SalesAndOfficesFilters'
import { fetchParameters, fetchCoveragesAndOffices } from 'reducers/diagnostics/diagnosticsReducer'

const mapStateToProps = state => ({
  handlingId: state.internal.handlingState.Id,
  parameters: state.diagnostics.diagnosticsState.parameters
})

const mapDispatchToProps = {
  fetchParameters,
  fetchCoveragesAndOffices
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesAndOfficesFilters)
