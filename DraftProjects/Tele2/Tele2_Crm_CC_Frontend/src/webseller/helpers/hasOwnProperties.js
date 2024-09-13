import { isArray, isObject } from 'lodash'

export const hasOwnProperties = (targetObj, propsDeps) => {
  let isSuccess = true

  if (!isObject(targetObj) || !isArray(propsDeps) || Object.keys(targetObj)?.length !== propsDeps?.length) {
    return false
  }

  for (let objProp in targetObj) {
    if (!propsDeps.some(prop => prop === objProp)) {
      return false
    }
  }

  return isSuccess
}
