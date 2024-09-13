import { connect } from 'react-redux'

import MnpInfoWidget from './MnpInfoWidget'

import { getMnpOrder, checkMnpHandling, toggleMnpInfoCards, toggleCheckMnpPassed, toggleMnpQuestionary } from 'reducers/mnp/mnpReducer'

const mapStateToProps = state => {
  return {
    user: state.internal.userState.user,
    cardMode: state.internal.cardMode.cardMode,
    handlingId: state.internal.handlingState?.Id,
    clientCategoryId: state.personalInfo.personalAccountState.personalAccount?.BaseFunctionalParams?.ClientCategoryId,
    mnpState: state.mnp.mnpState,
    isMnpOrderVisible: state.mnp.mnpState.isMnpOrderVisible,
    isCheckMnpPressed: state.mnp.mnpState.isCheckMnpPressed,
    isMnpQuestionaryVisible: state.mnp.mnpState.isMnpQuestionaryVisible,
    markerMnp: state.mnp.mnpMarkersState.markerMnp,
    isHandlingOpenPressed: state.internal.handlingState.isHandlingOpenPressed
  }
}

const mapDispatchToProps = {
  toggleMnpInfoCards,
  checkMnpHandling,
  getMnpOrder,
  toggleCheckMnpPassed,
  toggleMnpQuestionary
}

export default connect(mapStateToProps, mapDispatchToProps)(MnpInfoWidget)
