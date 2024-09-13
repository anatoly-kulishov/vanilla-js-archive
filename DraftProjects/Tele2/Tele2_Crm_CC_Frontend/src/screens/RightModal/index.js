import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  toggleRap,
  changeTab
} from 'reducers/internal/rightModalReducer'
import { fetchIrregularWords } from 'reducers/searching/smartSearchingReducer'

import RightModal from './RightModal'

const mapStateToProps = state => {
  return {
    isToggled: state.internal.rightModal.isToggled,
    activeTab: state.internal.rightModal.activeTab,

    personalAccountState: state.personalInfo.personalAccountState,
    user: state.internal.userState.user
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    toggleRap,
    changeTab,
    fetchIrregularWords
  }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RightModal)
