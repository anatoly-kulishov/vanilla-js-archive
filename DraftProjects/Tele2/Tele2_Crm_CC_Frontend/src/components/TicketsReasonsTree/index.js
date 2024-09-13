import { connect } from 'react-redux'

import {
  filterReasons,
  selectTemplate,
  selectReasonCategory
} from 'reducers/reasonsCategories/reasonCategoryReducer'

import SmsSendingTree from './TicketsReasonsTree'

const mapStateToProps = state => ({})

const mapDispatchToProps = {
  filterReasons,
  selectTemplate,
  selectReasonCategory
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SmsSendingTree)
