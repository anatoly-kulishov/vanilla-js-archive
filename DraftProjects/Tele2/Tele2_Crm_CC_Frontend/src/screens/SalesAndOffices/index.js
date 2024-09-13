import { connect } from 'react-redux'

import SalesAndOffices from './SalesAndOffices'

const mapStateToProps = state => {
  return {
    flagPoi: state.diagnostics.diagnosticsState.coveragesAndOffices.flagPoi
  }
}

export default connect(mapStateToProps, null)(SalesAndOffices)
