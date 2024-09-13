import { connect } from 'react-redux'
import MnpQuestionnaire from './MnpQuestionnaire'

import {
  fetchQuestionsHistory
} from 'reducers/questionary/questionaryHistoryReducer'

import { fetchProtocolStatusContext, createDraftProtocol, changeDraftProtocol, protocol } from 'reducers/mnp/protocolReducer'
import { checkMnpHandling, toggleMnpQuestionary } from 'reducers/mnp/mnpReducer'

import { fetchMnpQuestionsList, saveMnpQuestionary } from 'reducers/questionary/questionaryReducer'

const mapStateToProps = state => {
  return {
    queryParams: state.internal.queryParamsState.queryParams,
    cardMode: state.internal.cardMode.cardMode,
    handlingId: state.internal.handlingState?.Id,
    protocolList: state.mnp.protocolState.protocolStatusContextData,
    protocolListFull: state.mnp.protocolState.protocolStatusContextFullData,
    mnpQuestionsList: state.questionary.questionaryState.mnpQuestionsList,
    mnpQuestionsHistory: state.questionary.questionaryHistoryState.mnpQuestionsHistory,
    handlingData: state.mnp.mnpState.handlingData,
    mnpHandlingData: state.mnp.mnpState.mnpHandlingData,
    isCheckMNPHandlingError: state.mnp.mnpState.isCheckMNPHandlingError,
    isCheckMNPHandlingLoading: state.mnp.mnpState.isCheckMNPHandlingLoading,
    isChangeProtocolLoading: state.mnp.protocolState.isChangeProtocolLoading,
    isCreateProtocolLoading: state.mnp.protocolState.isCreateProtocolLoading,
    isProtocolStatusContextLoading: state.mnp.protocolState.isProtocolStatusContextLoading,
    checkMNPHandlingError: state.mnp.mnpState.checkMNPHandlingError,
    user: state.internal.userState.user,
    isMnpQuestionaryVisible: state.mnp.mnpState.isMnpQuestionaryVisible,
    isCheckMnpPressed: state.mnp.mnpState.isCheckMnpPressed,
    savedMnpQuestions: state.questionary.questionaryState.savedMnpQuestions,
    msisdn: state.personalInfo.personalAccountState.personalAccount?.Msisdn,
    mnpOrder: state.mnp.mnpState.mnpOrder,
    isHandlingOpenPressed: state.internal.handlingState.isHandlingOpenPressed,
    createProtocolResult: state.mnp.protocolState.createProtocolResult,
    changeProtocolResult: state.mnp.protocolState.changeProtocolResult,
    protocolResult: state.mnp.protocolState.protocolResult,
    isProtocolLoading: state.mnp.protocolState.isProtocolLoading
  }
}

const mapDispatchToProps = {
  fetchProtocolStatusContext,
  fetchQuestionsHistory,
  fetchMnpQuestionsList,
  checkMnpHandling,
  saveMnpQuestionary,
  toggleMnpQuestionary,
  createDraftProtocol,
  changeDraftProtocol,
  protocol
}

export default connect(mapStateToProps, mapDispatchToProps)(MnpQuestionnaire)
