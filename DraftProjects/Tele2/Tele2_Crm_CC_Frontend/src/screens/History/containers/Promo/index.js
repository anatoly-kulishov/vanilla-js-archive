import { connect } from 'react-redux'

import { getPromoHistory, getPromoHistoryFilters, activatePromo, cancelPromo, notifyPromo } from 'reducers/promo/promoReducer'
import autoInteractionData from 'selectors/autoInteractionSelector'
import Promo from './Promo'

const mapStateToProps = state => {
  return {
    ...state.personalInfo.personalAccountState,
    ...state.promo.promoHistory,
    user: state.internal.userState.user,
    autoInteractionData: autoInteractionData(state)
  }
}

const mapDispatchToProps = {
  getPromoHistory,
  getPromoHistoryFilters,
  activatePromo,
  cancelPromo,
  notifyPromo
}

export default connect(mapStateToProps, mapDispatchToProps)(Promo)
