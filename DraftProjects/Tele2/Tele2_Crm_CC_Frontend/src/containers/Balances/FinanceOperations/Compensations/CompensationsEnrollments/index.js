import { connect } from 'react-redux'

import {
  setPaydPostLimit,
  validatePaydHistory,
  onStartValidatePaydHistory,
  fetchAvailableBalance,
  getPaydCommentRelate,
  addCompensation
} from 'reducers/compensation/compensationEnrollmentReducer'

import CompensationsEnrollments from './CompensationsEnrollments'

import autoInteractionData from 'selectors/autoInteractionSelector'

const mapStateToProps = state => {
  return {
    ...state.compensation.compensationGeneral,
    ...state.compensation.compensationEnrollment,
    autoInteractionData: autoInteractionData(state)
  }
}

const mapDispatchToProps = {
  fetchAvailableBalance,
  validatePaydHistory,
  onStartValidatePaydHistory,
  setPaydPostLimit,
  getPaydCommentRelate,
  addCompensation
}

export default connect(mapStateToProps, mapDispatchToProps)(CompensationsEnrollments)
