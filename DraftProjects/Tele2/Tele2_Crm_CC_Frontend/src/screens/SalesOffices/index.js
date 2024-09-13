import { connect } from 'react-redux'

import {
  fetchCoveragesAndOffices,
  fetchAbonentCoordinates
} from 'reducers/diagnostics/diagnosticsReducer'

import { withLogger } from 'utils/helpers/logger'

import SalesOffices from './SalesOffices'

const mapStateToProps = state => {
  return {
    flagPoi: state.diagnostics.diagnosticsState.coverageData.flagPoi,
    isCoveragesAndOfficesLoading: state.diagnostics.diagnosticsState.isCoveragesAndOfficesLoading
  }
}

const mapDispatchToProps = {
  fetchCoveragesAndOffices,
  fetchAbonentCoordinates
}

export default connect(mapStateToProps, mapDispatchToProps)(withLogger(SalesOffices))
