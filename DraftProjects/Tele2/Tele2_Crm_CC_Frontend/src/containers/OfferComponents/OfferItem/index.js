import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { checkRight } from 'utils/helpers'

import OfferItem from './OfferItem'

import {
  addOffers,
  deleteOffer
} from 'reducers/offersReducer'

const mapStateToProps = state => {
  return {
    isLoadingAddOffer: state.offers.isLoadingAddOffer,
    personalAccountState: state.personalInfo.personalAccountState,
    user: state.internal.userState.user,
    isMnpOutReact: checkRight(state.internal.userState.user, 'CC:MNPOutReact'),
    isMnpSupport: checkRight(state.internal.userState.user, 'CC:MNPSupport'),
    isAbOfferPilot: checkRight(state.internal.userState.user, 'CC:ABOfferPilot')
  }
}

const mapDispatchToProps = {
  addOffers,
  deleteOffer
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfferItem))
