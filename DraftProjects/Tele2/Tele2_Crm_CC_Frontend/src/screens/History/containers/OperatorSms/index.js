import { connect } from 'react-redux'

import { getSmsHistory } from 'reducers/sms/getSmsHistoryReducer'
import { fetchLteNumber, cancelSms } from 'reducers/smsSendingReducer'

import OperatorSms from './OperatorSms'

const mapStateToProps = state => {
  return {
    ...state.internal.queryParamsState,
    ...state.historyRequestsDates,
    personalAccountState: state.personalInfo.personalAccountState,
    smsHistoryState: state.smsHistoryState,
    handlingId: state.internal.handlingState.Id,
    queryParamsState: state.internal.queryParamsState,
    mnpMarkers: state.mnp.mnpMarkersState.mnpMarkers,
    smsSending: state.smsSending
  }
}

const mapDispatchToProps = {
  getSmsHistory,
  fetchLteNumber,
  cancelSms
}

export default connect(mapStateToProps, mapDispatchToProps)(OperatorSms)
