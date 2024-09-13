import { connect } from 'react-redux'

import { handleVisiblePersonModal } from 'reducers/person/personModalReducer'
import { getCustomerScenarioHistory } from 'reducers/person/customerScenarioHistoryReducer'
import { createScenario } from 'reducers/person/scenariosReducer'
import { connectCustomerSegmentsWs, disconnectCustomerSegmentsWs } from 'reducers/person/customerSegmentsReducer'

import { getHandlingId, getPersonalAccountState } from 'selectors/index'

import PersonModal from './PersonModal'

const mapStateToProps = state => ({
  isVisible: state.person.personModalState.isVisiblePersonModal,
  customerScenarioHistory: state.person.customerScenarioHistoryState.customerScenarioHistory,
  isCustomerScenarioHistoryLoading: state.person.customerScenarioHistoryState.isCustomerScenarioHistoryLoading,
  personalAccount: getPersonalAccountState(state),
  personId: state.person.personState.personId,
  customerSegments: state.person.customerSegmentsState.customerSegments,
  customerSegmentsWsStatus: state.person.customerSegmentsState.customerSegmentsWsStatus,
  handlingId: getHandlingId(state),
  customerSegmentsPreview: state.person.customerSegmentsState.customerSegmentsPreview,
  customerSegmentsPreviewWsStatus: state.person.customerSegmentsState.customerSegmentsPreviewWsStatus
})

const mapDispatchToProps = {
  handleVisiblePersonModal,
  getCustomerScenarioHistory,
  createScenario,
  connectCustomerSegmentsWs,
  disconnectCustomerSegmentsWs
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonModal)
