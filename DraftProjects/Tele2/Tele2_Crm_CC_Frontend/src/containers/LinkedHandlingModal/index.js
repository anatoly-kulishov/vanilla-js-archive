import { connect } from 'react-redux'

import LinkedHandlingModal from './LinkedHandlingModal'
import { fetchInteractionParamsForLinkedHandling } from 'reducers/internal/handlingReducer'

const mapStateToProps = state => ({
  personalAccount: state.personalInfo.personalAccountState.personalAccount
})
const mapDispatchToProps = {
  fetchInteractionParamsForLinkedHandling
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedHandlingModal)
