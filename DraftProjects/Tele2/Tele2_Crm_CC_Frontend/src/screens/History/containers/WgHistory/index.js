import { connect } from 'react-redux'

import { fetchWgHistory } from 'reducers/history/wgHistoryReducer'

import WgHistory from './WgHistory'

const mapStateToProps = state => {
  return {
    msisdn: state.personalInfo.personalAccountState.personalAccount.Msisdn,
    wgHistory: state.wgHistory
  }
}

const mapDispatchToProps = {
  fetchWgHistory
}

export default connect(mapStateToProps, mapDispatchToProps)(WgHistory)
