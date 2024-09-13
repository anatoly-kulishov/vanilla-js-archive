import { connect } from 'react-redux'

import TariffModal from './TariffModal'
import {
  changeServices,
  changeTariff,
  fetchAvailableTariffDetails,
  fetchAvailableTariffs,
  fetchEnabledTariffDetails,
  fetchTariffInfo,
  handleVisibleModal
} from 'reducers/services/tariffModalReducer'

import { getPermissions } from 'selectors/permissionsSelector'
import { initChangingTariffPlan } from 'webseller/features/changingTariffPlan/actions'

const mapStateToProps = state => {
  const { CCSubscriberTariffHistory, CCReadTariffGuaranteedPrice } = getPermissions(state, [
    'CC:SubscriberTariffHistory',
    'CC:ReadTariffGuaranteedPrice'
  ])
  return {
    personalAccountState: state.personalInfo.personalAccountState,
    HandlingId: state.internal.handlingState.Id,
    tariffState: state.services.tariffModal,
    user: state.internal.userState.user,
    CCSubscriberTariffHistory,
    CCReadTariffGuaranteedPrice
  }
}

const mapDispatchToProps = {
  fetchTariffInfo,
  handleVisibleModal,
  fetchAvailableTariffs,
  changeTariff,
  fetchAvailableTariffDetails,
  changeServices,
  fetchEnabledTariffDetails,
  initChangingTariffPlan
}

export default connect(mapStateToProps, mapDispatchToProps)(TariffModal)
