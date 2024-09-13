import { connect } from 'react-redux'

import { fetchDiagnosticScenarios } from 'reducers/diagnosticManager/diagnosticScenarioReducer'
import { startDiagnostic, changeDiagnosticScenario } from 'reducers/diagnosticManager/diagnosticManagerReducer'
import { fetchAbonentCoordinates } from 'reducers/diagnostics/diagnosticsReducer'

import { withLogger } from 'utils/helpers/logger'

import DiagnosticManager from './DiagnosticManager'

const mapStateToProps = state => ({
  ...state.diagnosticManager.diagnosticManager
})

const mapDispatchToProps = {
  fetchDiagnosticScenarios,
  startDiagnostic,
  changeDiagnosticScenario,
  fetchAbonentCoordinates
}

export default connect(mapStateToProps, mapDispatchToProps)(withLogger(DiagnosticManager))
