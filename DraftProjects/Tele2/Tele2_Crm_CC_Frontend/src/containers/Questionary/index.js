import { connect } from 'react-redux'

import Questionary from './Questionary'
import { fetchQuestionsList, writeNewQuestionary, saveQuestionary } from 'reducers/questionary/questionaryReducer'

const mapStateToProps = state => ({
  questionaryUseList: state.questionary.questionaryState.questionaryUseList,
  isQuestionaryUseListLoading: state.questionary.questionaryState.isQuestionaryUseListLoading,
  questionsList: state.questionary.questionaryState.questionsList,
  isQuestionsListLoading: state.questionary.questionaryState.isQuestionsListLoading,
  answeredQuestions: state.questionary.questionaryState.answeredQuestions,
  ...state.personalInfo.personalAccountState
})

const mapDispatchToProps = {
  fetchQuestionsList,
  writeNewQuestionary,
  saveQuestionary
}

export default connect(mapStateToProps, mapDispatchToProps)(Questionary)
