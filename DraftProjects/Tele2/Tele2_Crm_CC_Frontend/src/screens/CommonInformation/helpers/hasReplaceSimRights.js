import { findRightsStartsWith } from 'utils/helpers'

export const checkOperationAvailabilityForUser = (rights, replacePart, conditionLetter = 'C') => {
  return new Set(
    rights
      .map(right => right.replace(replacePart, ''))
      .reduce((acc, currentValue) => {
        acc += currentValue
        return acc
      }, '')
  ).has(conditionLetter)
}

export const checkHasReplaceSimRights = (user) => {
  const startWithRight = 'AS.ChangeSim:'
  const rightsStartsWith = findRightsStartsWith(user, startWithRight)

  return checkOperationAvailabilityForUser(rightsStartsWith, startWithRight)
}
