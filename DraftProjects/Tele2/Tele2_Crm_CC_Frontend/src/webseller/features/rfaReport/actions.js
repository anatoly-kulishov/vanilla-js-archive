import { createAction } from 'redux-actions'

/**
 * GENERATE_RFA_REPORT
 */
export const GENERATE_RFA_REPORT = 'rfaReport/GENERATE_RFA_REPORT'
export const GENERATE_RFA_REPORT_SUCCESS = 'rfaReport/GENERATE_RFA_REPORT_SUCCESS'
export const GENERATE_RFA_REPORT_ERROR = 'rfaReport/GENERATE_RFA_REPORT_ERROR'

export const generateRfaReport = createAction(GENERATE_RFA_REPORT)
export const generateRfaReportSuccess = createAction(GENERATE_RFA_REPORT_SUCCESS)
export const generateRfaReportError = createAction(GENERATE_RFA_REPORT_ERROR)
/**
 * GET_DEALER_INFO
 */
export const GET_DEALER_INFO = 'rfaReport/GET_DEALER_INFO'
export const GET_DEALER_INFO_SUCCESS = 'rfaReport/GET_DEALER_INFO_SUCCESS'
export const GET_DEALER_INFO_ERROR = 'rfaReport/GET_DEALER_INFO_ERROR'

export const getDealerInfo = createAction(GET_DEALER_INFO)
export const getDealerInfoSuccess = createAction(GET_DEALER_INFO_SUCCESS)
export const getDealerInfoError = createAction(GET_DEALER_INFO_ERROR)
/**
 * GET_ALL_DEALER_SALE_POINTS
 */
export const GET_ALL_DEALER_SALE_POINTS = 'rfaReport/GET_ALL_DEALER_SALE_POINTS'
export const GET_ALL_DEALER_SALE_POINTS_SUCCESS = 'rfaReport/GET_ALL_DEALER_SALE_POINTS_SUCCESS'
export const GET_ALL_DEALER_SALE_POINTS_ERROR = 'rfaReport/GET_ALL_DEALER_SALE_POINTS_ERROR'

export const getAllDealerSalePoints = createAction(GET_ALL_DEALER_SALE_POINTS)
export const getAllDealerSalePointsSuccess = createAction(GET_ALL_DEALER_SALE_POINTS_SUCCESS)
export const getAllDealerSalePointsError = createAction(GET_ALL_DEALER_SALE_POINTS_ERROR)
/**
 * GET_DEALER_ID_BY_SALE_POINT_ID
 */
export const GET_DEALER_ID_BY_SALE_POINT_ID = 'rfaReport/GET_DEALER_ID_BY_SALE_POINT_ID'
export const GET_DEALER_ID_BY_SALE_POINT_ID_SUCCESS = 'rfaReport/GET_DEALER_ID_BY_SALE_POINT_ID_SUCCESS'
export const GET_DEALER_ID_BY_SALE_POINT_ID_ERROR = 'rfaReport/GET_DEALER_ID_BY_SALE_POINT_ID_ERROR'

export const getDealerIdBySalePointId = createAction(GET_DEALER_ID_BY_SALE_POINT_ID)
export const getDealerIdBySalePointIdSuccess = createAction(GET_DEALER_ID_BY_SALE_POINT_ID_SUCCESS)
export const getDealerIdBySalePointIdError = createAction(GET_DEALER_ID_BY_SALE_POINT_ID_ERROR)

export const RESET_DEALER_SALE_POINTS = 'rfaReport/RESET_DEALER_SALE_POINTS'
export const resetDealerSalePoints = createAction(RESET_DEALER_SALE_POINTS)

/**
 * RESET_RFA_REPORT_PROCESS
 */
export const RESET_RFA_REPORT_PROCESS = 'rfaReport/RESET_RFA_REPORT_PROCESS'
export const resetRfaReportProcess = createAction(RESET_RFA_REPORT_PROCESS)
