import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchHlr, resetHlr, changeHlr } from 'reducers/services/servicesCallForwarding'
import Forwarding from './Forwarding'

const mapStateToProps = state => {
  return {
    ...state.personalInfo.personalAccountState,
    ...state.internal.userState,
    ...state.services.servicesCallForwarding,
    handlingId: state.internal.handlingState.Id
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchHlr,
      resetHlr,
      changeHlr
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forwarding)
