// compensation modal
export const minSum = 0.00
export const separator = '/'
export const compensationsModalWidth = 950

// sagas
export const successMessageType = 'Success'
export const errorMessageType = 'Error'
export const warningMessageType = 'Warning'

// history modal
export const ContractName = 1
export const historyModalWidth = '90%'
export const datePickerMonthLimit = 1
export const datePickerYearLimit = 12
export const isActiveStatus = 'Активна'

export const compensationsMethods = {
  promocode: 'PROMOCODE',
  package: 'PACKAGE',
  enrollment: 'ENROLLMENT',
  empty: 'EMPTY',
  adjustment: 'ADJUSTMENT'
}

export const commonComponentsWidth = 235
export const maxCommentLength = 300
export const smallWindowWidth = 1368

export const disabledCompensationsEnrollment = [
  'compensationFormMonetary'
]

export const disabledCompensationsPackage = [
  'startPaydServiceAvailable',
  'startPaydServiceEnabled',
  'compensationFormPackage',
  'marginServiceTypeRelate',
  'marginServiceSizeRelate'
]

export const compenstationsForms = {
  monetary: 1,
  package: 2,
  promocode: 3
}
