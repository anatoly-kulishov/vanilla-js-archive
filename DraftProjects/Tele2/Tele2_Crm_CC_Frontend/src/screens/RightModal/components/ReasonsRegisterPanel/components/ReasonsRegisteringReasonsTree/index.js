import { connect } from 'react-redux'

import {
  filterReasons,
  setCompanyMark,
  marksChange,
  deleteInteraction
} from 'reducers/reasonsRegisteringReducer'

import { rcSearchSend } from 'reducers/searching/reasonCategorySearchReducer'

import ReasonsRegisteringTree from './ReasonsRegisteringReasonsTree'

const mapStateToProps = state => {
  return {
    companyMarks: state.reasonsRegistering.companyMarks,
    selectedCompanyMarks: state.reasonsRegistering.selectedCompanyMarks,
    reasonSearchName: state.reasonsRegistering.filterFields.reasonName,
    categorySearchId: state.reasonsRegistering.filterFields.categoryId,

    reasons: state.reasonsRegistering.reasons,
    categories: state.reasonsRegistering.categories,
    changedReasonsCategories: state.reasonsRegistering.changedReasonsCategories,
    isReasonsLoading: state.reasonsRegistering.isReasonsLoading,
    isReasonsFirstFetchComplete: state.reasonsRegistering.isReasonsFirstFetchComplete,
    interactions: state.reasonsRegistering.interactions,
    searchData: state.searching.reasonCategorySearching.searchData
  }
}

const mapDispatchToProps = {
  filterReasons,
  setCompanyMark,
  marksChange,
  deleteInteraction,
  rcSearchSend
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReasonsRegisteringTree)
