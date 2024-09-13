import { connect } from 'react-redux'
import {
  fetchSubscriberStatusHistory,
  fetchSubscriberStatusUpdate,
  fetchRecommendationChangeStatus,
  fetchSubscriberStatusList
} from '../../reducers/personalInfo/subscriberStatusReducer'
import SubscriberStatus from './SubscriberStatus'
import { selectIsWebSeller } from 'webseller/common/user/selectors'
import { submitChangingClientStatusParams } from 'webseller/features/changingClientStatus/actions'

const mapStateToProps = state => ({
  ...state.personalInfo.personalAccountState,
  ...state.personalInfo.subscriberStatus,
  ...state.internal.handlingState,
  ...state.mnp.mnpMarkersState.mnpMarkers,
  isWebSeller: selectIsWebSeller(state)
})

const mapDispatchToProps = {
  fetchSubscriberStatusUpdate,
  fetchSubscriberStatusHistory,
  fetchRecommendationChangeStatus,
  fetchSubscriberStatusList,
  submitChangingClientStatusParams: submitChangingClientStatusParams
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscriberStatus)
