export default (state) => {
  const personalAccount = state.personalInfo.personalAccountState.personalAccount

  return ({
    handlingId: state.internal.handlingState?.Id,
    clientId: personalAccount?.ClientId,
    clientBranchId: personalAccount?.SubscriberFullInfo?.SubscriberClientInfo?.BillingBranch,
    email: personalAccount?.Email,
    subscriberId: personalAccount?.SubscriberId,
    subscriberBranchId: personalAccount?.BillingBranchId,
    subscriberTypeId: personalAccount?.SubscriberFullInfo?.SubscriberInfo?.SubscriberTypeId,
    subscriberStatusId: personalAccount?.SubscriberFullInfo?.SubscriberInfo?.SubscriberStatusId
  })
}
