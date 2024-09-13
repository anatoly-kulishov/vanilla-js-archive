import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchECommerceTypes } from 'reducers/mnpJournal/eCommerceTypesReducer'

import { withLogger } from 'utils/helpers/logger'
import MnpJournalFilters from './MnpJournalFilters'

const mapStateToProps = state => ({
  eCommerceTypesState: state.mnpJournal.eCommerceTypesState
})

const mapDispatchToProps = dispatch => bindActionCreators({ fetchECommerceTypes }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withLogger(MnpJournalFilters))
