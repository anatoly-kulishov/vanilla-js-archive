import { connect } from 'react-redux'

import { getReplaceAvailability, resetReplaceSimProcess, setDocumentData, setReplacingProcessStep } from '../../reducer'
import { getTransmittingPartyData } from 'webseller/features/recreateClient/reducer'

import { REPLACE_PROCESS_STEPS } from '../../constants'

import SearchSimStep from './SearchSimStep'

const mapStateToProps = state => ({
  handlingId: state.internal.handlingState.Id,
  branchId: state.personalInfo.personalAccountState.personalAccount.BillingBranchId,
  msisdn: state.personalInfo.personalAccountState.personalAccount.Msisdn,
  replaceAvailability: state.replaceSim.replaceAvailability,
  isAvailabilityLoading: state.replaceSim.isReplaceAvailabilityLoading,
  isAvailabilityError: state.replaceSim.isReplaceAvailabilityError
})

const mapDispatchToProps = dispatch => ({
  onSubmit: payload => dispatch(getReplaceAvailability(payload)),
  onNextStep: () => dispatch(setReplacingProcessStep(REPLACE_PROCESS_STEPS.CUSTOMER_DATA)),
  setDocumentData: payload => dispatch(setDocumentData(payload)),
  resetReplaceSimProcess: payload => dispatch(resetReplaceSimProcess(payload)),
  getTransmittingPartyData: payload => dispatch(getTransmittingPartyData(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchSimStep)
