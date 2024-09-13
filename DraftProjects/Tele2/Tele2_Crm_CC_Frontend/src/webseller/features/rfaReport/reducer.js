import { produce } from 'immer'
import { handleActions } from 'redux-actions'

import {
  GENERATE_RFA_REPORT,
  GENERATE_RFA_REPORT_ERROR,
  GENERATE_RFA_REPORT_SUCCESS,
  GET_ALL_DEALER_SALE_POINTS,
  GET_ALL_DEALER_SALE_POINTS_ERROR,
  GET_ALL_DEALER_SALE_POINTS_SUCCESS,
  GET_DEALER_ID_BY_SALE_POINT_ID,
  GET_DEALER_ID_BY_SALE_POINT_ID_ERROR,
  GET_DEALER_ID_BY_SALE_POINT_ID_SUCCESS,
  GET_DEALER_INFO,
  GET_DEALER_INFO_ERROR,
  GET_DEALER_INFO_SUCCESS,
  RESET_DEALER_SALE_POINTS,
  RESET_RFA_REPORT_PROCESS
} from './actions'

const initialState = {
  rfaReport: null,
  isRfaReportLoading: false,
  isRfaReportError: false,

  dealerCodes: null,
  isDealerCodesLoading: false,
  isDealerCodesError: false,

  dealerSalePoints: null,
  isDealerSalePointsLoading: false,
  isDealerSalePointsError: false,

  dealerId: null,
  isDealerIdLoading: false,
  isDealerIdError: false
}

export default handleActions({
  /** GENERATE_RFA_REPORT */
  [GENERATE_RFA_REPORT]: produce((state) => {
    state.rfaReport = null
    state.isRfaReportLoading = true
    state.isRfaReportError = false
  }),
  [GENERATE_RFA_REPORT_SUCCESS]: produce((state, { payload }) => {
    state.rfaReport = payload?.response
    state.isRfaReportLoading = false
    state.isRfaReportError = false
  }),
  [GENERATE_RFA_REPORT_ERROR]: produce((state) => {
    state.isRfaReportLoading = false
    state.isRfaReportError = true
  }),
  /** GET_DEALER_INFO */
  [GET_DEALER_INFO]: produce((state) => {
    state.dealerCodes = null
    state.isDealerCodesLoading = true
    state.isDealerCodesError = false
  }),
  [GET_DEALER_INFO_SUCCESS]: produce((state, { payload }) => {
    state.dealerId = payload?.dealerId
    state.dealerCodes = payload?.response
    state.isDealerCodesLoading = false
    state.isDealerCodesError = false
  }),
  [GET_DEALER_INFO_ERROR]: produce((state) => {
    state.isDealerCodesLoading = false
    state.isDealerCodesError = true
  }),
  /** GET_ALL_DEALER_SALE_POINTS */
  [GET_ALL_DEALER_SALE_POINTS]: produce((state) => {
    state.dealerSalePoints = null
    state.isDealerSalePointsLoading = true
    state.isDealerSalePointsError = false
  }),
  [GET_ALL_DEALER_SALE_POINTS_SUCCESS]: produce((state, { payload }) => {
    state.dealerSalePoints = payload?.response
    state.isDealerSalePointsLoading = false
    state.isDealerSalePointsError = false
  }),
  [GET_ALL_DEALER_SALE_POINTS_ERROR]: produce((state) => {
    state.isDealerSalePointsLoading = false
    state.isDealerSalePointsError = true
  }),
  /** GET_DEALER_ID_BY_SALE_POINT_ID */
  [GET_DEALER_ID_BY_SALE_POINT_ID]: produce((state) => {
    state.dealerId = null
    state.isDealerIdLoading = true
    state.isDealerInfoError = false
  }),
  [GET_DEALER_ID_BY_SALE_POINT_ID_SUCCESS]: produce((state, { payload }) => {
    state.dealerId = payload?.response
    state.isDealerIdLoading = false
    state.isDealerIdError = false
  }),
  [GET_DEALER_ID_BY_SALE_POINT_ID_ERROR]: produce((state) => {
    state.isDealerIdLoading = false
    state.isDealerIdError = true
  }),
  [RESET_DEALER_SALE_POINTS]: produce((state) => {
    state.dealerSalePoints = null
  }),
  /** RESET_RFA_REPORT_PROCESS */
  [RESET_RFA_REPORT_PROCESS]: produce(() => initialState)
}, initialState)
