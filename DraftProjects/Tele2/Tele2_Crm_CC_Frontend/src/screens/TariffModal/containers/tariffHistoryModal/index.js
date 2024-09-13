import { connect } from 'react-redux'

import { fetchSubscriberTariffHistory } from 'reducers/services/tariffHistoryReducer'

import TariffHistoryModal from './TariffHistoryModal'

const mapStateToProps = state => {
  return {
    tariffHistory: state.services.tariffHistoryState.tariffHistory,
    isTariffHistoryLoading: state.services.tariffHistoryState.isTariffHistoryLoading,

    currentSubscriberMsisdn: state.personalInfo.personalAccountState.personalAccount.Msisdn
  }
}

const mapDispatchToProps = {
  fetchSubscriberTariffHistory
}

export default connect(mapStateToProps, mapDispatchToProps)(TariffHistoryModal)
