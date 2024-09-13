import { connect } from 'react-redux'

import CompensationsHistoryModal from './CompensationsHistoryModal'

import autoInteractionData from 'selectors/autoInteractionSelector'

import { changeCompensationsHistoryModalVisibility } from 'reducers/compensations/compensationsReducer'
import { fetchPaymentCompensationHistory } from 'reducers/compensation/compensationReducer'
import { cancelPromocodeCompensation } from 'reducers/compensation/compensationPromoReducer'
import { validatePaydServiceHistory } from 'reducers/compensations/validationCompensationsReducer'
import { fetchPaymentsHistory } from 'reducers/finance/paymentsReducer'
import { activatePromo, notifyPromo } from 'reducers/promo/promoReducer'
import { validatePaydService } from 'reducers/compensation/compensationHisoryModalReducer'

const mapStateToProps = state => {
  return {
    ...state.compensations.compensationsState,
    ...state.compensations.validationCompensationsState,
    ...state.personalInfo.personalAccountState,

    user: state.internal.userState.user,
    paydService: state.compensation.compensationHisoryModal.paydService,
    paymentsHistory: state.finance.payments.paymentsHistory,
    promoHistory: state.compensation.compensationGeneral.paymentsCompenstationHistory?.history,
    isPaymentsHistoryLoading: state.finance.payments.isPaymentsHistoryLoading,
    autoInteractionData: autoInteractionData(state)
  }
}

const mapDispatchToProps = {
  changeCompensationsHistoryModalVisibility,
  validatePaydServiceHistory,
  fetchPaymentsHistory,
  fetchPaymentCompensationHistory,
  activatePromo,
  notifyPromo,
  cancelPromocodeCompensation,
  validatePaydService
}

export default connect(mapStateToProps, mapDispatchToProps)(CompensationsHistoryModal)
