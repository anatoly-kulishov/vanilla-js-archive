import { connect } from 'react-redux'

import MnpHistoryStatement from './MnpHistoryStatement'

import { getHistoryOrderIdList, getClosedOrders } from 'reducers/mnp/mnpReducer'
import { getQuestionProtocol } from 'reducers/mnp/protocolReducer'
import { fetchQuestionsHistory } from 'reducers/questionary/questionaryHistoryReducer'

const mapStateToProps = state => ({
  mnpOrder: state.mnp.mnpState.mnpOrder,
  closedOrdersData: state.mnp.mnpState.closedOrdersData,
  historyOrderIdsDataList: state.mnp.mnpState.historyOrderIdsDataList,
  isGetQuestionProtocolLoading: state.mnp.protocolState.isGetQuestionProtocolLoading,
  isQuestionsHistoryLoading: state.questionary.questionaryHistoryState.isQuestionsHistoryLoading,
  questionsHistory: state.questionary.questionaryHistoryState.questionsHistory,
  questionProtocolData: state.mnp.protocolState.questionProtocolData
})

const mapDispatchToProps = {
  getHistoryOrderIdList,
  getClosedOrders,
  getQuestionProtocol,
  fetchQuestionsHistory
}

export default connect(mapStateToProps, mapDispatchToProps)(MnpHistoryStatement)
