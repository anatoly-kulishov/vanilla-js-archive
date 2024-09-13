import { connect } from 'react-redux'

import { fetchLocationHistory } from 'reducers/reasonsCategories/reasonCategoryDiagnosticsReducer'
import {
  redirectToSmartGis
} from 'reducers/diagnostics/diagnosticsReducer'

import SmartGisPanel from './SmartGisPanel'

const mapStateToProps = state => ({
  locationHistory: state.reasonsCategories.reasonCategoryDiagnosticsState.locationHistory,
  isLocationHistoryLoading: state.reasonsCategories.reasonCategoryDiagnosticsState.isLocationHistoryLoading,

  abonentCoordinates: state.diagnostics.diagnosticsState.abonentCoordinates,
  isAbonentCoordinatesLoading: state.diagnostics.diagnosticsState.isAbonentCoordinatesLoading,

  isCoveragesAndOfficesLoading: state.diagnostics.diagnosticsState.isCoveragesAndOfficesLoading
})

const mapDispatchToProps = {
  fetchLocationHistory,
  redirectToSmartGis
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartGisPanel)
