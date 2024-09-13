import { checkRight } from '.'

export const getMnpRights = (user) => ({
  isMnpOutReact: checkRight(user, 'CC:MNPOutReact'),
  isMnpSupport: checkRight(user, 'CC:MNPSupport'),
  isReadMnpOrder: checkRight(user, 'CC:ReadMNPOrder'),
  isGetCanceledMnpOrder: checkRight(user, 'CC:GetCanceledMNPOrder'),
  isCancelMnpOrder: checkRight(user, 'CC:CancelMNPOrder')
})
