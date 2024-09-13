import { connect } from 'react-redux'

import { fetchHistoryInteraction } from 'reducers/history/historyInteractionsReducer'
import { fetchLinkedInteractions } from 'reducers/internal/handlingReducer'

import Interactions from './Interactions'

const mapStateToProps = state => ({
  ...state.personalInfo.personalAccountState,
  ...state.historyRequestsDates,
  ...state.historyInteractions,
  ...state.internal.handlingState
})

const mapDispatchToProps = {
  fetchHistoryInteraction,
  fetchLinkedInteractions
}

export default connect(mapStateToProps, mapDispatchToProps)(Interactions)
