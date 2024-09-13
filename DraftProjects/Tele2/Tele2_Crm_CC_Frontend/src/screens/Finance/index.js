import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { changeVisibility, showServiceHistory } from 'reducers/services/serviceHistoryReducer'
import { changeAbonentsModalVisibility } from 'reducers/personalInfo/abonentsModalReducer'
import {
  fetchPaymentsHistory,
  fetchPaymentsHistoryFilters,
  fetchInvoicesHistory,
  fetchCostsHistory,
  fetchResourcesHistory,
  fetchDigestId,
  resetDigestId
} from 'reducers/finance/paymentsReducer'
import { getChargeServiceList } from 'reducers/services/serviceReducer'

import {
  changeCompensationsHistoryModalVisibility,
  cancelCompensation,
  modifyCompensation,
  fetchPaydComments,
  clearCompensationsMessages
} from 'reducers/compensations/compensationsReducer'

import { clearValidationMessages } from 'reducers/compensations/validationCompensationsReducer'

import { withLogger } from 'utils/helpers/logger'

import Finance from './Finance'

const mapStateToProps = state => {
  return {
    ...state.finance,
    ...state.personalInfo.personalAccountState,
    ...state.internal.userState,
    ...state.services,
    paydComments: state.compensations.compensationsState.paydComments,
    handlingId: state.internal.handlingState.Id,
    cardMode: state.internal.cardMode.cardMode
  }
}
const mapDispatchToProps = {
  changeVisibility,
  showServiceHistory,
  changeAbonentsModalVisibility,
  changeCompensationsHistoryModalVisibility,
  fetchPaymentsHistory,
  fetchPaymentsHistoryFilters,
  fetchInvoicesHistory,
  fetchCostsHistory,
  fetchResourcesHistory,
  fetchDigestId,
  resetDigestId,
  getChargeServiceList,
  cancelCompensation,
  modifyCompensation,
  fetchPaydComments,
  clearCompensationsMessages,
  clearValidationMessages
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withLogger(Finance))
)
