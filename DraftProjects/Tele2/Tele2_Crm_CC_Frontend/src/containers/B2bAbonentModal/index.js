import { connect } from 'react-redux'

import { changeAbonentsModalVisibility } from 'reducers/personalInfo/abonentsModalReducer'
import { getConnectedServices } from 'reducers/services/serviceReducer'
import { getPersonalAccount } from 'reducers/personalInfo/personalInfoReducer'
import { getSubscriberList } from 'reducers/personalInfo/subscriberListReducer'

import B2BAbonentsModal from './B2BAbonentModal'

const mapStateToProps = state => ({
  isVisible: state.personalInfo.abonentModalState.isVisible,
  subscriberListState: state.personalInfo.subscriberListState,
  personalAccount: state.personalInfo.personalAccountState.personalAccount
})

const mapDispatchToProps = {
  changeAbonentsModalVisibility,
  getConnectedServices,
  getPersonalAccount,
  getSubscriberList
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(B2BAbonentsModal)
