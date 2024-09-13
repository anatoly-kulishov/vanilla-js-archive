const MarkerIdsOperationMap = {
  DUPLICATE_RFA: [1],
  CORRECTION_DATA: [2],
  REPLACE_SIM: [38]
}

export const isDuplicateRfaMarker = markerId => MarkerIdsOperationMap.DUPLICATE_RFA.includes(markerId)
export const isCorrectionDataMarker = markerId => MarkerIdsOperationMap.CORRECTION_DATA.includes(markerId)
export const isReplaceSimMarker = markerId => MarkerIdsOperationMap.REPLACE_SIM.includes(markerId)

export const isOperationMarker = (markerId) => {
  if (!markerId) {
    return false
  }

  return isDuplicateRfaMarker(markerId) || isCorrectionDataMarker(markerId) || isReplaceSimMarker(markerId)
}
