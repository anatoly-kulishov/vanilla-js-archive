import { isNil } from 'lodash-es'

/**
 * Checks if string is null/undefined or just empty
 * @param {string} str string to check
 * @returns {boolean}
 */
export const isStringFalsy = str => isNil(str) || typeof str !== 'string' || str.length < 1

export const getBranchIdByMode = formInitData => {
  const { isLeon, isAnonymous, billingBranchId, billingBranchIdReserve } = formInitData

  return isLeon || isAnonymous ? billingBranchIdReserve : billingBranchId
}
