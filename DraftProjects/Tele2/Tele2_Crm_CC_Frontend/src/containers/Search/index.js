import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Search from './Search'

import {
  fetchManualSearchGridData,
  cleanManualSearchGridData
} from 'reducers/manualSearchReducer'
import { getSubscriberList, fetchSubscriberStatuses } from 'reducers/personalInfo/subscriberListReducer'
import { changeAbonentsModalVisibility } from 'reducers/personalInfo/abonentsModalReducer'
import { redirectPaymentsUrl } from 'reducers/finance/paymentsReducer'

const mapStateToProps = state => ({
  manualSearchState: state.manualSearch,
  personalAccountState: state.personalInfo.personalAccountState,
  queryParamsState: state.internal.queryParamsState,
  channels: state.reasonsCategories.reasonsListState.channels,
  processingParameters: state.internal.processingParametersState.processingParameters,
  user: state.internal.userState.user,
  payments: state.finance.payments,
  isVisible: state.personalInfo.abonentModalState.isVisible
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchManualSearchGridData,
  cleanManualSearchGridData,
  getSubscriberList,
  changeAbonentsModalVisibility,
  fetchSubscriberStatuses,
  redirectPaymentsUrl
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Search)
