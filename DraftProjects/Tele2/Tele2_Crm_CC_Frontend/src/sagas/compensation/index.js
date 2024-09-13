import { all, takeEvery } from 'redux-saga/effects'

import {
  SET_PAYD_POST_LIMIT,
  ADD_COMPENSATION,
  FETCH_AVAILABLE_BALANCE,
  VALIDATE_PAYD_HISTORY,
  ON_START_VALIDATE_PAYD_HISTORY,
  GET_PAYD_COMMENT_RELATE
} from 'reducers/compensation/compensationEnrollmentReducer'

import {
  ADD_SERVICE_COMPENSATION,
  VALIDATE_PAYD_SERVICE_ENABLED,
  VALIDATE_PAYD_SERVICE_AVAILABLE,
  VALIDATE_PAYD_SERVICE_HISTORY,
  GET_MARGIN_SERVICE_SIZE_RELATE,
  GET_MARGIN_SERVICE_TYPE_RELATE
} from 'reducers/compensation/compensationPackageReducer'

import {
  FETCH_PAYD_COMMENTS,
  VALIDATE_PAYMENT_HISTORY,
  VALIDATE_COST_HISTORY,
  ON_START_VALIDATE_PAYD_SERVICE_ENABLED,
  ON_START_VALIDATE_PAYD_SERVICE_AVAILABLE,
  VALIDATE_PAYD_POST_LIMIT,
  GET_COMPENSTAION_FORM,
  FETCH_PAYMENTS_COMPENSATION_HISTORY
} from 'reducers/compensation/compensationReducer'

import {
  FETCH_PAYMENTS_LIST,
  ADJUST_PAYMENT,
  FETCH_INVALID_SUBSCRIBER_INFO,
  FETCH_VALID_SUBSCRIBER_INFO,
  FETCH_INVALID_SUBSCRIBER_BALANCE,
  FETCH_VALID_SUBSCRIBER_BALANCE
} from 'reducers/compensation/compensationsAdjustmentReducer'

import {
  fetchPaydCommentsSaga,
  validatePaydServiceHistorySaga,
  validatePaymentHistorySaga,
  validateCostHistorySage,
  onStartValidatePaydServiceEnabledSaga,
  onStartValidatePaydServiceAvailableSaga,
  validatePaydPostLimitSaga,
  getCompensationFormSaga,
  fetchPaymentsCompentationSaga
} from './compensationSaga'

import {
  addServiceCompensationSaga,
  validatePaydServiceAvailableSaga,
  validatePaydServiceEnabledSaga,
  getMarginServiceSizeRelateSaga,
  getMarginServiceTypeRelateSaga
} from './compensationPackagesSaga'

import {
  addCompensationSaga,
  setPaydPostLimitSaga,
  fetchAvailableBalanceSaga,
  validatePaydHistorySaga,
  onStartValidatePaydHistorySaga,
  getPaydCommentRelateSaga
} from './compensationEnrollmentsSaga'

import {
  ADD_PROMOCODE_COMPENSATION,
  CANCEL_PROMOCODE_COMPENSATION,
  GET_PROMOCODE_SERVICE_TYPE,
  GET_PROMOCODE_TYPE,
  GET_MARGIN_SERVICE_SIZE_RELATE_IN_PROMO
} from 'reducers/compensation/compensationPromoReducer'
import {
  addPromocodeCompensationSaga,
  cancelPromocodeCompensationSaga,
  getPromocodeServiceTypeSaga,
  getPromocodeTypeSaga,
  getMarginServiceSizeRelateInPromoSaga
} from './compensationPromoSaga'

import {
  VALIDATE_PAYD_SERVICE
} from 'reducers/compensation/compensationHisoryModalReducer'
import {
  validatePaydServiceSaga
} from './compensationHistoryModalSaga'

import {
  fetchPaymentsListSaga,
  adjustmentPaymentSaga,
  fetchInvalidSubscriberInfoSaga,
  fetchValidSubscriberInfoSaga,
  fetchInvalidSubscriberBalanceSaga,
  fetchValidSubscriberBalanceSaga
} from './compensationsAdjustmentSaga'

export default function * () {
  yield all([
    takeEvery(SET_PAYD_POST_LIMIT, setPaydPostLimitSaga),
    takeEvery(VALIDATE_PAYD_SERVICE_AVAILABLE, validatePaydServiceAvailableSaga),
    takeEvery(ON_START_VALIDATE_PAYD_SERVICE_AVAILABLE, onStartValidatePaydServiceAvailableSaga),
    takeEvery(FETCH_PAYD_COMMENTS, fetchPaydCommentsSaga),
    takeEvery(FETCH_AVAILABLE_BALANCE, fetchAvailableBalanceSaga),
    takeEvery(VALIDATE_PAYD_HISTORY, validatePaydHistorySaga),
    takeEvery(ON_START_VALIDATE_PAYD_HISTORY, onStartValidatePaydHistorySaga),
    takeEvery(VALIDATE_PAYD_SERVICE_HISTORY, validatePaydServiceHistorySaga),
    takeEvery(VALIDATE_PAYD_SERVICE_ENABLED, validatePaydServiceEnabledSaga),
    takeEvery(ON_START_VALIDATE_PAYD_SERVICE_ENABLED, onStartValidatePaydServiceEnabledSaga),
    takeEvery(ADD_SERVICE_COMPENSATION, addServiceCompensationSaga),
    takeEvery(ADD_COMPENSATION, addCompensationSaga),
    takeEvery(VALIDATE_PAYD_SERVICE, validatePaydServiceSaga),
    takeEvery(VALIDATE_PAYMENT_HISTORY, validatePaymentHistorySaga),
    takeEvery(VALIDATE_COST_HISTORY, validateCostHistorySage),
    takeEvery(GET_PAYD_COMMENT_RELATE, getPaydCommentRelateSaga),
    takeEvery(VALIDATE_PAYD_POST_LIMIT, validatePaydPostLimitSaga),
    takeEvery(GET_COMPENSTAION_FORM, getCompensationFormSaga),
    takeEvery(GET_MARGIN_SERVICE_TYPE_RELATE, getMarginServiceTypeRelateSaga),
    takeEvery(GET_MARGIN_SERVICE_SIZE_RELATE, getMarginServiceSizeRelateSaga),
    takeEvery(GET_MARGIN_SERVICE_SIZE_RELATE_IN_PROMO, getMarginServiceSizeRelateInPromoSaga),
    takeEvery(GET_PROMOCODE_SERVICE_TYPE, getPromocodeServiceTypeSaga),
    takeEvery(GET_PROMOCODE_TYPE, getPromocodeTypeSaga),
    takeEvery(FETCH_PAYMENTS_COMPENSATION_HISTORY, fetchPaymentsCompentationSaga),
    takeEvery(ADD_PROMOCODE_COMPENSATION, addPromocodeCompensationSaga),
    takeEvery(CANCEL_PROMOCODE_COMPENSATION, cancelPromocodeCompensationSaga),
    // Payments Correction
    takeEvery(FETCH_INVALID_SUBSCRIBER_INFO, fetchInvalidSubscriberInfoSaga),
    takeEvery(FETCH_VALID_SUBSCRIBER_INFO, fetchValidSubscriberInfoSaga),
    takeEvery(FETCH_INVALID_SUBSCRIBER_BALANCE, fetchInvalidSubscriberBalanceSaga),
    takeEvery(FETCH_VALID_SUBSCRIBER_BALANCE, fetchValidSubscriberBalanceSaga),
    takeEvery(FETCH_PAYMENTS_LIST, fetchPaymentsListSaga),
    takeEvery(ADJUST_PAYMENT, adjustmentPaymentSaga)
  ])
}
