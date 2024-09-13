import { compensationsMethods } from 'constants/compensations'

export const getCompensationState = state => {
  return {
    ...state.compensation.compensationPromo,
    ...state.compensation.compensationPackage,
    ...state.compensation.compensationEnrollment,
    ...state.compensation.compensationGeneral
  }
}

// Select right state
function getCurrentCompensationFieldType (currentCompensationMethod) {
  switch (currentCompensationMethod) {
    case compensationsMethods.package:
      return 'compensationPackage'
    case compensationsMethods.promocode:
      return 'compensationPromo'
    case compensationsMethods.enrollment:
      return 'compensationEnrollment'
    default: return ''
  }
}

export const getCompensationMessages = (state, currentCompensationMethod) => {
  let compensationState
  if (currentCompensationMethod) {
    const currentCompensationFieldType = state.compensation[getCurrentCompensationFieldType(currentCompensationMethod)]
    compensationState = { ...currentCompensationFieldType, ...state.compensation.compensationGeneral }
  } else {
    compensationState = getCompensationState(state)
  }

  const messagesList = []

  Object.values(compensationState)
    .forEach(item => {
      if (item?.error?.data) {
        if (Array.isArray(item.error.data)) {
          item.error.data.forEach(error => {
            messagesList.push({
              error: {
                ...item.error,
                data: error
              }
            })
          })
          return
        }
        messagesList.push({ error: item.error })
      }
    })

  messagesList.sort((prevItem, nextItem) => prevItem.error.createdOn - nextItem.error.createdOn)

  return messagesList
}
