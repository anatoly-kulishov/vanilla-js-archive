import { arrayOf, number, oneOfType, shape, string } from 'prop-types'

const invoiceValuesItemPropType = shape({ Value: string })
const invoiceValuesPropType = oneOfType([invoiceValuesItemPropType, arrayOf(invoiceValuesItemPropType)])

const orderValuesItemPropType = shape({ Value: string, RejectReasonCode: number })
const orderValuesPropType = oneOfType([orderValuesItemPropType, arrayOf(orderValuesItemPropType)])

const coordinatesItemPropType = shape({
  areaId: number,
  itemId: number,
  imageId: number,
  page: number,
  pageNumber: number, // в одном запросе возвращается pageNumber, в другом - page.
  percent: number,
  xcoordinate: number,
  ycoordinate: number,
  width: number,
  height: number
})
export const coordinatesPropType = arrayOf(coordinatesItemPropType)

const scanValuesItemPropType = shape({
  itemId: number,
  fieldTypeId: number,
  value: string,
  rejectReasonCode: number,
  coordinates: coordinatesPropType
})
const scanValuesPropType = arrayOf(scanValuesItemPropType)

const compareDataItemPropType = shape({
  fieldTypeId: number,
  attributeName: string,
  name: string,
  invoiceValues: invoiceValuesPropType,
  orderValues: orderValuesPropType,
  scanValues: scanValuesPropType
})
const compareDataPropType = arrayOf(compareDataItemPropType)

export default arrayOf(
  shape({
    compareData: compareDataPropType,
    rejectReasonCodes: arrayOf(number)
  })
)
