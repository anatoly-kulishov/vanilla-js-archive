import { connect } from 'react-redux'

import { clearFoundAddresses, connectBroadbandSaleSim, resetSaleSimProcess } from 'reducers/saleSim/saleSimReducer'
import { resetCheckSmev } from 'reducers/checkSmev/checkSmevReducer'
import { resetAgreements } from 'webseller/common/agreements/reducer'
import { resetSigning } from 'webseller/common/signing/reducer'
import { selectIsAvailableBroadbandConnectSaleSim, selectMessageBroadbandConnectSaleSim } from 'reducers/saleSim/selectors'

import { SallingProcessTypes, isSuccessRegistrationSimStatus } from '../../helpers'
import ResultStep from './ResultStep'

const mapStateToProps = state => ({
  isTransferToTele2: state.saleSim.sallingProcessType === SallingProcessTypes?.TRANSFER,
  isSuccessSale: state.saleSim.addedSims.every(sim => isSuccessRegistrationSimStatus(sim.registration.statusId)),
  isAvailableBroadbandConnect: selectIsAvailableBroadbandConnectSaleSim(state),
  messageBroadbandConnect: selectMessageBroadbandConnectSaleSim(state)
})

const mapDispatchToProps = dispatch => ({
  connectBroadband: () => dispatch(connectBroadbandSaleSim()),
  onSubmit: payload => {
    dispatch(clearFoundAddresses())
    dispatch(resetSaleSimProcess(payload))
    dispatch(resetCheckSmev())
    dispatch(resetAgreements())
    dispatch(resetSigning())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ResultStep)
