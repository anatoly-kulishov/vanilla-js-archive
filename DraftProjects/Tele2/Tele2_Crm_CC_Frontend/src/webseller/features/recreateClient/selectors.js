export const selectRecreateClientCurrentStepType = state => state.recreateClient.currentStepType
export const selectRecreateClientType = state => state.recreateClient.recreateClientType
export const selectRecreateClientTransmittingParty = state => state.recreateClient.transmittingPartyData
export const selectRecreateClientIsLoadingTransmittingPartyData = state =>
  state.recreateClient.isLoadingTransmittingPartyData
export const selectRecreateClientReceivingParty = state => state.recreateClient.receivingPartyData
export const selectRecreateClientAdditionalAgreements = state => state.recreateClient.additionalAgreements
export const selectRecreateClientDocuments = state => state.recreateClient.documents
export const selectRecreateClientIsLoading = state => state.recreateClient.isLoadingRecreateClient
export const selectRecreateClientError = state => state.recreateClient.errorRecreateClient
export const selectRecreateClientOperationStatus = state => state.recreateClient.operationStatus
export const selectRecreateClientTicketNumber = state => state.recreateClient.ticketNumber
export const selectRecreateClientServiceRequestId = state => state.recreateClient.serviceRequestId
export const selectRecreateClientIsBeautifulNumber = state => state.recreateClient.isBeautifulNumber
