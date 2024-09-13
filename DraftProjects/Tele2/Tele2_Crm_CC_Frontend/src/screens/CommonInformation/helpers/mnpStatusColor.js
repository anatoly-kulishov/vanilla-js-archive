export function getMnpStatusColor (statusCode) {
  switch (statusCode) {
    case 'donorApproved':
      return 'green'
    case 'donorCancelled':
    case 'donorRejected':
    case 'donorRejectedRecreated':
    case 'recipientCancelled':
    case 'serverCancelled':
      return 'red'
    case 'reverseCreatedRecipient':
    case 'returnCreatedRecipient':
    case 'readyTransferRecipient':
    case 'pendingDonorApprove':
      return 'blue'
    case 'suspend':
    case 'suspendCompl':
    case 'pendingDonor':
    case 'pendingDonorSRF':
    case 'pendingRecipient':
    case 'readyPendingDonor':
      return 'purple'
    case 'waitingDebtBlock':
    case 'waitingDebtOutBlock':
    case 'waitingDebtOutCheck':
    case 'waitingNPReturn':
    case 'waitingReverse':
    case 'waitManualCheck':
    case 'donorApprovedPendingDebt2':
    case 'donorApprovedPendingDebt3':
      return 'gold'
    case 'reverse':
    case 'returned':
    case 'transfered':
    case 'precreatedRequest':
    case 'donorInfo':
      return 'default'
    default:
      return 'default'
  }
}
