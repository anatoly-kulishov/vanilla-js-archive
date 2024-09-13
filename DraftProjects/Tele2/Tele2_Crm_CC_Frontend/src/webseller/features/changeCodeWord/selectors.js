/** changeCodeWord **/
export const selectChangeCodeWordErrorMessage = state => state.changeCodeWord.changeCodeWordErrorMessage
export const selectIsSuccessChangeCodeWord = state => state.changeCodeWord.isSuccessChangeCodeWord
export const selectIsChangeCodeWordLoading = state => state.changeCodeWord.isChangeCodeWordLoading
export const selectOperationChangeCodeWordStatus = state => state.changeCodeWord.operationStatus
export const selectIsChangeCodeWordError = state => state.changeCodeWord.isChangeCodeWordError
export const selectChangeCodeWordStep = state => state.changeCodeWord.changeCodeWordStep
export const selectPersonalData = (state) => state.changeCodeWord.documentData

export const selectSubscriberPersonalData = (state) => state.changeCodeWord.subscriberPersonalData
export const selectB2bClientMinimalInfo = (state) => state.changeCodeWord.b2bClientMinimalInfo

/** personalInfo **/
export const selectPersonalAccount = (state) => state.personalInfo.personalAccountState.personalAccount
export const selectAccountClientCodeword = state => state.personalInfo.personalAccountState.personalAccount.SubscriberFullInfo?.SubscriberInfo?.Password
export const selectAccountPassword = state => state.personalInfo.personalAccountState.personalAccount?.ParentClientInfo?.ClientCodeword
