import { connect } from 'react-redux'
import { withLogger } from 'utils/helpers/logger'

import ClientRestrictions from './ClientRestrictions'

import {
  changeClientRestriction,
  fetchClientRestrictions,
  removeAllClientRestrictions
} from 'reducers/diagnostics/clientRestrictionsReducer'

const mapStateToProps = state => ({
  personalInfo: {
    handlingId: state.internal.handlingState.Id,
    email: state.personalInfo.personalAccountState.personalAccount.Email,
    msisdn: state.personalInfo.personalAccountState.personalAccount.Msisdn,
    clientId: state.personalInfo.personalAccountState.personalAccount.ClientId,
    subscriberId: state.personalInfo.personalAccountState.personalAccount.SubscriberId,
    subscriberTypeId: state.personalInfo.personalAccountState.personalAccount.SubscriberTypeId,
    subscriberBranchId: state.personalInfo.personalAccountState.personalAccount.BillingBranchId
  },

  clientRestrictions: state.diagnostics.clientRestrictionsState.clientRestrictions,
  isClientRestrictionsLoading: state.diagnostics.clientRestrictionsState.isClientRestrictionsLoading
})

const mapDispatchToProps = {
  fetchClientRestrictions,
  changeClientRestriction,
  removeAllClientRestrictions
}

export default connect(mapStateToProps, mapDispatchToProps)(withLogger(ClientRestrictions))
