import { shape, string, number, bool, arrayOf, oneOfType, array, object } from 'prop-types'
import { coordinatesPropType } from './mnpVerificationPropType'

const recognizedItemPropType = shape({
  recognizedItemId: number,
  value: oneOfType([string, object]),
  images: oneOfType([array, arrayOf(coordinatesPropType)]),
  id: string // изначально нет в ответе метода, он добавляется позже вручную
})

const fieldTypeGroupPropType = shape({
  fieldTypeId: number,
  attributeName: string,
  name: string,
  recognizedItems: arrayOf(recognizedItemPropType)
})

export default shape({ applicationForm: bool, fieldTypeGroups: arrayOf(fieldTypeGroupPropType) })
