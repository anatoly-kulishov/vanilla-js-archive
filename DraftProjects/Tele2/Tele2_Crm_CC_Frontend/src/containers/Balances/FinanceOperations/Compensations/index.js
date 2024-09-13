import { connect } from 'react-redux'

import { getCompensationMessages } from 'selectors/compensationSelectors'

import Compensations from './Compensations'

const mapStateToProps = (state, ownProps) => {
  return {
    compensationMessages: getCompensationMessages(state, ownProps.currentCompensationMethod),
    ...state.compensation.compensationPackage,
    ...state.compensation.compensationEnrollment,
    ...state.compensation.compensationPromo,
    ...state.compensation.compensationGeneral
  }
}

export default connect(mapStateToProps)(Compensations)
