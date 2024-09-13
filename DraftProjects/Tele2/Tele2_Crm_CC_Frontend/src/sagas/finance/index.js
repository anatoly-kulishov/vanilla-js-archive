import { all, takeEvery } from 'redux-saga/effects'

// Balance
import {
  BALANCE_FETCH,
  CLIENT_BALANCE_FETCH,
  TRUST_CREDIT_HISTORY_FETCH,
  TRUST_CREDIT_REASONS_HISTORY_FETCH,
  TRUST_CREDIT_INFO_FETCH,
  DEACIVATE_TRUST_CREDIT_FETCH,
  ACIVATE_TRUST_CREDIT_FETCH,
  ADD_CONTENT_BALANCE_FETCH,
  CLOSE_CONTENT_BALANCE_FETCH,
  CONTENT_BALANCE_HISTORY_FETCH
} from 'reducers/finance/balanceReducer'
import {
  fetchBalancesSaga,
  fetchTrustCreditHistorySaga,
  fetchTrustCreditReasonsHistorySaga,
  fetchTrustCreditInfoSaga,
  fetchDeactivateTrustCreditSaga,
  fetchActivateTrustCreditSaga,
  fetchAddContentBalanceSaga,
  fetchCloseContentBalanceSaga,
  fetchContentBalanceHistorySaga
} from './balanceSaga'

// Remains
import {
  REMAINS_DETAILS_DATA_FETCH,
  REMAINS_SUBSCRIBER_SERVICES_FETCH,
  REMAINS_QUANTUM_DATA_FETCH,
  UNPAID_CHARGE_DATA_FETCH,
  REMAINS_MIXX_BALANCE_FETCH
} from 'reducers/finance/remainsReducer'

import {
  fetchRemainsDetailsDataSaga,
  fetchSubscriberServicesDataSaga,
  fetchQuantumDataSaga,
  fetchUnpaidChargeDataSaga,
  fetchMixxBalanceSaga
} from './remainsSaga'

// TemporaryPay
import { GET_TEMPORARY_PAY_NEW_FETCH, ADD_PAYMENT_FETCH } from 'reducers/finance/temporaryPayReducer'
import { fetchTemporaryPayNewSaga, fetchAddPaymentSaga } from './temporaryPaySaga'

// Payments, Invoices and Costs
import {
  PAYMENTS_HISTORY_FETCH,
  PAYMENTS_HISTORY_FILTERS_FETCH,
  PAYMENTS_URL_FETCH,
  REDIRECT_PAYMENTS_URL,
  INVOICES_HISTORY_FETCH,
  COSTS_HISTORY_FETCH,
  RESOURCES_HISTORY_FETCH,
  DIGEST_ID_FETCH
} from 'reducers/finance/paymentsReducer'
import {
  fetchPaymentsSaga,
  fetchPaymentsFiltersSaga,
  fetchPaymentsUrl,
  fetchPaymentsUrlAndRedirect,
  fetchInvoicesSaga,
  fetchCostsSaga,
  fetchResourcesSaga,
  fetchDigestIdSaga
} from './paymentsSaga'

// payment information
import { GET_LAST_PAYMENT, DELETE_T2PAY_CARD } from 'reducers/finance/paymentInformationReducer'
import { getLastPaymentSaga, deleteT2PayCardSaga } from './paymentInformationSaga'

export default function * () {
  yield all([
    // Balance
    takeEvery(BALANCE_FETCH, fetchBalancesSaga),
    takeEvery(CLIENT_BALANCE_FETCH, fetchBalancesSaga),
    takeEvery(TRUST_CREDIT_HISTORY_FETCH, fetchTrustCreditHistorySaga),
    takeEvery(TRUST_CREDIT_REASONS_HISTORY_FETCH, fetchTrustCreditReasonsHistorySaga),
    takeEvery(TRUST_CREDIT_INFO_FETCH, fetchTrustCreditInfoSaga),
    takeEvery(DEACIVATE_TRUST_CREDIT_FETCH, fetchDeactivateTrustCreditSaga),
    takeEvery(ACIVATE_TRUST_CREDIT_FETCH, fetchActivateTrustCreditSaga),
    takeEvery(ADD_CONTENT_BALANCE_FETCH, fetchAddContentBalanceSaga),
    takeEvery(CLOSE_CONTENT_BALANCE_FETCH, fetchCloseContentBalanceSaga),
    takeEvery(CONTENT_BALANCE_HISTORY_FETCH, fetchContentBalanceHistorySaga),
    // Remains
    takeEvery(REMAINS_DETAILS_DATA_FETCH, fetchRemainsDetailsDataSaga),
    takeEvery(REMAINS_SUBSCRIBER_SERVICES_FETCH, fetchSubscriberServicesDataSaga),
    takeEvery(REMAINS_QUANTUM_DATA_FETCH, fetchQuantumDataSaga),
    takeEvery(UNPAID_CHARGE_DATA_FETCH, fetchUnpaidChargeDataSaga),
    takeEvery(REMAINS_MIXX_BALANCE_FETCH, fetchMixxBalanceSaga),
    // Temporary Pay
    takeEvery(GET_TEMPORARY_PAY_NEW_FETCH, fetchTemporaryPayNewSaga),
    takeEvery(ADD_PAYMENT_FETCH, fetchAddPaymentSaga),
    // Payments, Invoices and Costs
    takeEvery(PAYMENTS_HISTORY_FETCH, fetchPaymentsSaga),
    takeEvery(PAYMENTS_HISTORY_FILTERS_FETCH, fetchPaymentsFiltersSaga),
    takeEvery(PAYMENTS_URL_FETCH, fetchPaymentsUrl),
    takeEvery(REDIRECT_PAYMENTS_URL, fetchPaymentsUrlAndRedirect),
    takeEvery(INVOICES_HISTORY_FETCH, fetchInvoicesSaga),
    takeEvery(COSTS_HISTORY_FETCH, fetchCostsSaga),
    takeEvery(RESOURCES_HISTORY_FETCH, fetchResourcesSaga),
    takeEvery(DIGEST_ID_FETCH, fetchDigestIdSaga),
    // Payment Information
    takeEvery(GET_LAST_PAYMENT, getLastPaymentSaga),
    takeEvery(DELETE_T2PAY_CARD, deleteT2PayCardSaga)
  ])
}
