import { connect } from 'react-redux'

import {
  toggleOffers,
  fetchOffers,
  fetchRegisteredOffers
} from 'reducers/offersReducer'

import { fetchInteractions } from 'reducers/reasonsRegisteringReducer'

import { withLogger } from 'utils/helpers/logger'

import OffersModal from './OffersModal'

const mapStateToProps = state => {
  return {
    interactions: state.reasonsRegistering.interactions,
    offers: state.offers,
    personalAccountState: state.personalInfo.personalAccountState,
    handlingId: state.internal.handlingState.Id
  }
}

const mapDispatchToProps = {
  toggleOffers,
  fetchOffers,
  fetchRegisteredOffers,
  fetchInteractions
}

export default connect(mapStateToProps, mapDispatchToProps)(withLogger(OffersModal))
