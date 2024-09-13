import { connect } from 'react-redux'
import { fetchToken, fetchTokenSuccess, updateUserData } from 'reducers/internal/userReducer'
import { passQueryParams } from 'reducers/internal/parameters'
import { getPersonalAccount } from 'reducers/personalInfo/personalInfoReducer'
import { getSubscriberList, fetchSubscriberStatuses } from 'reducers/personalInfo/subscriberListReducer'
import { fetchAllocatedInfo } from 'reducers/internal/allocatedInfoReducer'
import { fetchConfigurations } from 'reducers/internal/configReducer'
import { getLikes } from 'reducers/likes/likesReducer'
// WebSeller
import { getActiveSalesOffice } from 'reducers/salesOffice/salesOfficeReducer'

import AppService from './AppService'

const mapStateToProps = state => {
  return {
    ...state.internal.userState,
    ...state.personalInfo.personalAccountState,
    ...state.internal.processingParametersState,
    queryParamsState: state.internal.queryParamsState,
    handlingId: state.internal.handlingState.Id
  }
}

const mapDispatchToProps = {
  passQueryParams,
  fetchToken,
  fetchTokenSuccess,
  updateUserData,
  getPersonalAccount,
  getSubscriberList,
  fetchSubscriberStatuses,
  fetchAllocatedInfo,
  fetchConfigurations,
  getLikes,

  // WebSeller
  getActiveSalesOffice
}

export default connect(mapStateToProps, mapDispatchToProps)(AppService)
