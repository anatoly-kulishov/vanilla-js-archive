import { checkRight } from 'utils/helpers'

export const getUserRights = user => {
  return {
    isPerformOrder: checkRight(user, 'CC:PerformBCOrder'),
    isChangeOrderState: checkRight(user, 'CC:ChangeBCOrderState'),
    isTransferOrder: checkRight(user, 'CC:TransferBCOrder'),
    isReadOrder: checkRight(user, 'CC:ReadBCOrder'),
    isNewOrder: checkRight(user, 'CC:NewBCOrder'),
    isModifyOrder: checkRight(user, 'CC:ModifyBCOrder'),
    isPersonalRead: checkRight(user, 'CC:ReadPersonalData'),
    isPersonalModify: checkRight(user, 'CC:ModifyPersonalData'),
    isReserveMsisdn: checkRight(user, 'CC:BCReserveMsisdn'),
    isReadReserveMsisdn: checkRight(user, 'CC:BCReadReserveMsisdn'),
    isUpsaleBcOrder: checkRight(user, 'CC:UpsaleBcOrder'),
    isPerformBCOrder: checkRight(user, 'CC:PerformBCOrder'),
    isModifyBCOrder: checkRight(user, 'CC:ModifyBCOrder'),
    isRtcLimitedBcOrder: checkRight(user, 'CC:RtcLimitedBcOrder'),
    isReadLimitedBCOrder: checkRight(user, 'CC:ReadLimitedBCOrder'),
    isBCOrderSessionAdmin: checkRight(user, 'CC:BCOrderSessionAdmin'),
    isRelocationCheckbox: checkRight(user, 'CC:RelocationCheckBox')
  }
}
