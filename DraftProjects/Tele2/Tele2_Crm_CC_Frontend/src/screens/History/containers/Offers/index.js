import { connect } from 'react-redux'

import { getOffersHistory } from 'reducers/offersReducer'

import Offers from './Offers'

const mapStateToProps = state => {
  return {
    ...state.personalInfo.personalAccountState,
    ...state.historyRequestsDates,
    ...state.offers
  }
}

const mapDispatchToProps = {
  getOffersHistory
}

export default connect(mapStateToProps, mapDispatchToProps)(Offers)
