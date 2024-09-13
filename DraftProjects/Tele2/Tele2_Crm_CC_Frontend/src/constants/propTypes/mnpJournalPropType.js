import { arrayOf, number, oneOfType, shape, string, instanceOf } from 'prop-types'
import { mnpOrderType } from 'constants/propTypes/mnpOrderPropType'

export default shape({
  Data: {
    RowsCount: number,
    PageCount: number,
    TransferRequests: arrayOf(mnpOrderType),

    MessageText: oneOfType([instanceOf(null), string])
  }
})
