import { ORDER_SERVICE } from 'constants/serviceLocations'

const PATH_BE = process.env.REACT_APP_BE
const HTTP = process.env.REACT_APP_HTTP

export const URL = `${HTTP}${PATH_BE}${ORDER_SERVICE}/broadbandConnectionOrder/getOrdersFile`
