import { connect } from 'react-redux'

import { initCorrectionDataProcess } from 'webseller/features/correctionData/reducer'
import { initRecreateClient } from 'webseller/features/recreateClient/reducer'
import { initReplaceSimProcess } from 'webseller/features/replaceSim/reducer'
import { selectIsLoadingInitReplaceSim } from 'webseller/features/replaceSim/selectors'

import Operations from './Operations'

const mapStateToProps = state => ({
  ...state.internal.userState,
  ...state.personalInfo.personalAccountState,
  isLoadingInitRecreateClient: state.recreateClient.isLoadingInitRecreateClient,
  isLoadingInitReplaceSim: selectIsLoadingInitReplaceSim(state)
})

const mapDispatchToProps = {
  initRecreateClient,
  initCorrectionDataProcess,
  initReplaceSimProcess
}

export default connect(mapStateToProps, mapDispatchToProps)(Operations)
