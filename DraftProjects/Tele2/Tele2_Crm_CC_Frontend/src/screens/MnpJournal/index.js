import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MnpJournal from './MnpJournal'
import { fetchMnpJournal, clearMnpJournal } from 'reducers/mnpJournal/mnpJournalReducer'

import { withLogger } from 'utils/helpers/logger'

const mapStateToProps = state => ({
  mnpJournalState: state.mnpJournal.mnpJournalState,
  user: state.internal.userState.user
})

const mapDispatchToProps = dispatch => bindActionCreators({ fetchMnpJournal, clearMnpJournal }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(withLogger(MnpJournal))
