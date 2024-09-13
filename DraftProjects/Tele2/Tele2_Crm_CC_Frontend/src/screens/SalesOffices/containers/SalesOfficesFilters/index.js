import { connect } from 'react-redux'

import {
  fetchCoveragesAndOffices,
  fetchParameters
} from 'reducers/diagnostics/diagnosticsReducer'

import SalesOfficesFilters from './SalesOfficesFilters'

const mapStateToProps = state => {
  return {
    parameters: state.diagnostics.diagnosticsState.parameters,
    isParametersLoading: state.diagnostics.diagnosticsState.isParametersLoading,

    handlingId: state.internal.handlingState.Id
  }
}

const mapDispatchToProps = {
  fetchCoveragesAndOffices,
  fetchParameters
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesOfficesFilters)
