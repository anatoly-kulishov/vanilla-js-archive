import { connect } from 'react-redux'

import MnpHistory from './MnpHistory'

import { fetchMnpHistory } from 'reducers/history/mnpHistoryReducer'
import {
  fetchQuestionsHistory
} from 'reducers/questionary/questionaryHistoryReducer'
import { getQuestionProtocol } from 'reducers/mnp/protocolReducer'
import { getClosedOrders } from 'reducers/mnp/mnpReducer'

const mapStateToProps = state => ({
  mnpHistory: state.mnpHistoryState.mnpHistory,
  isMnpHistoryLoading: state.mnpHistoryState.isMnpHistoryLoading,
  personalAccountState: state.personalInfo.personalAccountState,

  questionsHistory: state.questionary.questionaryHistoryState.questionsHistory,
  isQuestionsHistoryLoading: state.questionary.questionaryHistoryState.isQuestionsHistoryLoading,
  questionProtocolData: state.mnp.protocolState.questionProtocolData,
  isGetQuestionProtocolLoading: state.mnp.protocolState.isGetQuestionProtocolLoading,
  mnpOrder: state.mnp.mnpState.mnpOrder,
  closedOrdersData: state.mnp.mnpState.closedOrdersData
})

const mapDispatchToProps = {
  fetchMnpHistory,
  fetchQuestionsHistory,
  getQuestionProtocol,
  getClosedOrders
}

export default connect(mapStateToProps, mapDispatchToProps)(MnpHistory)
