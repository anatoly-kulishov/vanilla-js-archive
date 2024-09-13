import { connect } from 'react-redux'

import CompensationsMessages from './CompensationsMessages'
import { getCompensationMessages } from 'selectors/compensationSelectors'

const mapStateToProps = (state, ownProps) => ({
  compensationMessages: getCompensationMessages(state, ownProps.currentCompensationMethod)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CompensationsMessages)
