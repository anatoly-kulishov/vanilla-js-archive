import { connect } from 'react-redux'

import { changeChooseRegionModalVisibility } from 'reducers/chooseRegionModalReducer'
import { fetchRegions } from 'reducers/massProblems/massProblemServiceReducer'
import {
  closeHandling,
  createHandling,
  fetchLastHandlings,
  onHandlingOpenPressed
} from 'reducers/internal/handlingReducer'
import { resetKmsSearchingResults, searchInKms } from 'reducers/searching/kmsSearchingReducer'
import { fetchQuestionaryUseList } from 'reducers/questionary/questionaryReducer'
import { feedbackModalOpen } from 'reducers/feedbackReducer'
import { fetchSuzToken } from 'reducers/internal/suzTokenReducer'

import CardHeader from './CardHeader'

// webseller
import { deleteCurrentSession } from 'webseller/features/webSellerSearch/reducer/customersCheckReducer'

const mapStateToProps = state => {
  return {
    state: state,
    cardMode: state.internal.cardMode.cardMode,
    isRegionModalVisible: state.chooseRegionModalState.isRegionModalVisible,
    userState: state.internal.userState,
    queryParams: state.internal.queryParamsState.queryParams,
    personalAccountState: state.personalInfo.personalAccountState,
    msisdn: state.internal.queryParamsState.queryParams.msisdn,
    massProblemRegionState: state.massProblems.massProblemServiceState.regions,
    closeHandlingState: state.internal.handlingState,
    handlingId: state.internal.handlingState.Id,
    isKmsSearchingLoading: state.searching.kmsSearching.isKmsSearchingLoading,
    kmsSearchingResults: state.searching.kmsSearching.kmsSearchingResults,
    isCommentaryImportant: state.comments.commentsState.isPopupComment,
    ...state.internal.suz,
    ...state.questionary.questionaryState
  }
}

const mapDispatchToProps = {
  changeChooseRegionModalVisibility,
  fetchRegions,
  closeHandling,
  createHandling,
  fetchLastHandlings,
  feedbackModalOpen,

  searchInKms,
  resetKmsSearchingResults,

  fetchQuestionaryUseList,
  fetchSuzToken,
  onHandlingOpenPressed,
  deleteCurrentSession
}

export default connect(mapStateToProps, mapDispatchToProps)(CardHeader)
