import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DataClientSubscriber from './DataClientSubscriber'

import {
  fetchDataSubscriber,
  fetchDataClient,
  updateSubscriberData,
  updateClientData,
  revoke,
  deleteFromSpace,
  postSendAgree
} from 'reducers/personalInfo/dataClientSubscriberReducer'
import {
  fetchSubscriberNotifications,
  modifySubscriberNotification,
  deleteSubscriberNotification
} from 'reducers/personalInfo/subscriberNotificationsReducer'

import { withLogger } from 'utils/helpers/logger'
import { selectIsWebSeller } from 'webseller/common/user/selectors'

const mapStateToProps = state => ({
  dataClientSubscriber: state.personalInfo.dataClientSubscriber,
  personalAccountState: state.personalInfo.personalAccountState,
  mnpAbonentData: state.mnp.mnpState.abonentData,
  user: state.internal.userState.user,
  cardMode: state.internal.cardMode.cardMode,
  handlingId: state.internal.handlingState.Id,
  subscriberNotifications: state.personalInfo.subscriberNotifications,
  isWebSeller: selectIsWebSeller(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchDataSubscriber,
      fetchDataClient,
      updateSubscriberData,
      updateClientData,
      revoke,
      deleteFromSpace,
      postSendAgree,
      fetchSubscriberNotifications,
      modifySubscriberNotification,
      deleteSubscriberNotification
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(withLogger(DataClientSubscriber))
