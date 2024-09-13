import { reformatToOptions } from './utils'

/** GET_DEALER_INFO */
export const selectDealerCodes = (state) => state?.rfaReport?.dealerCodes
export const selectIsDealerCodesLoading = (state) => state?.rfaReport?.isDealerCodesLoading
/** GET_ALL_DEALER_SALE_POINTS */
export const selectDealerSalePoints = (state) => state?.rfaReport?.dealerSalePoints?.salesOffices
export const selectDealerSalePointsOptions = (state) => reformatToOptions(state?.rfaReport?.dealerSalePoints?.salesOffices, { label: 'address', value: 'id' }, true)
export const selectIsDealerSalePointsLoading = (state) => state?.rfaReport?.isDealerSalePointsLoading
/** GET_DEALER_ID_BY_SALE_POINT_ID */
export const selectDealerId = (state) => state?.rfaReport?.dealerId
export const selectIsDealerIdLoading = (state) => state?.rfaReport?.isDealerIdLoading
/** SALES_OFFICE */
export const selectSalesOfficeId = (state) => state?.salesOffice?.activeSalesOffice?.salesOfficeId
