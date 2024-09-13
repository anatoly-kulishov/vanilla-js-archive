import { connect } from 'react-redux'

import {
  fetchTechnologySubtechnologyLink,
  fetchCoveragesAndOffices
} from 'reducers/diagnostics/diagnosticsReducer'

import CoverageFilters from './CoverageFilters'

const mapStateToProps = state => ({
  technologiesGroups: state.diagnostics.diagnosticsState.technologiesGroups,
  handlingId: state.internal.handlingState.Id
})

const mapDispatchToProps = {
  fetchTechnologySubtechnologyLink,
  fetchCoveragesAndOffices
}

export default connect(mapStateToProps, mapDispatchToProps)(CoverageFilters)
