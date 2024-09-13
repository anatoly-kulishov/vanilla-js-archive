import { connect } from 'react-redux'

import {
  fetchQuestionaryHistory,
  fetchQuestionsHistory,
  fetchQuestionaryUseListWithoutCheck
} from 'reducers/questionary/questionaryHistoryReducer'

import QuestionaryHistory from './QuestionaryHistory'

const mapStateToProps = state => {
  return {
    questionaryHistory: state.questionary.questionaryHistoryState.questionaryHistory,
    isQuestionaryHistoryLoading: state.questionary.questionaryHistoryState.isQuestionaryHistoryLoading,

    questionsHistory: state.questionary.questionaryHistoryState.questionsHistory,
    isQuestionsHistoryLoading: state.questionary.questionaryHistoryState.isQuestionsHistoryLoading,

    questionaryUseListWithoutCheck: state.questionary.questionaryHistoryState.questionaryUseListWithoutCheck,
    isQuestionaryUseListWithoutCheckLoading: state.questionary.questionaryHistoryState.isQuestionaryUseListWithoutCheckLoading
  }
}

const mapDispatchToProps = {
  fetchQuestionaryHistory,
  fetchQuestionaryUseListWithoutCheck,
  fetchQuestionsHistory
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionaryHistory)
