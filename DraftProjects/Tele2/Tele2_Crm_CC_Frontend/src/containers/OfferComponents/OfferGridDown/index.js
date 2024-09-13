import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import OfferGridDown from './OfferGridDown'

import {
  deleteOffer,
  changeOffer,
  handleAutoConnectOffer
} from 'reducers/offersReducer'

const mapStateToProps = state => {
  return {
    personalAccountState: state.personalInfo.personalAccountState,
    user: state.internal.userState.user,
    offers: state.offers,
    interactions: state.reasonsRegistering.interactions,
    handlingId: state.internal.handlingState.Id
  }
}

const mapDispatchToProps = {
  deleteOffer,
  changeOffer,
  handleAutoConnectOffer
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfferGridDown))
