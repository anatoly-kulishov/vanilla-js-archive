import { connect } from 'react-redux'

import { getOffersCbmHistory } from 'reducers/offersReducer'

import OffersCbm from './OffersCbm'

const mapStateToProps = state => {
  return {
    globalMsisdn: state.personalInfo.personalAccountState.personalAccount.Msisdn,
    ...state.historyRequestsDates,
    ...state.offers
  }
}

const mapDispatchToProps = {
  getOffersCbmHistory
}

export default connect(mapStateToProps, mapDispatchToProps)(OffersCbm)
