import axios from 'axios'
import { temporaryPayment, balance, finance } from 'constants/ports'
import fromEnv from 'config/fromEnv'

const pathBe = fromEnv('REACT_APP_BE')
const http = fromEnv('REACT_APP_HTTP')

export default {
  // Balance
  fetchBalances: params => axios.get(`${http}${pathBe}:${balance}/balance/getSubscriberClientBalance`, { params }),
  fetchClientBalances: params => axios.get(`${http}${pathBe}:${balance}/balance/clientById`, { params }),
  fetchAvailableBalances: params => axios.get(`${http}${pathBe}:${balance}/balance/GetAvailableBalance`, { params }),
  fetchTrustCreditHistory: params => axios.get(`${http}${pathBe}:${balance}/trustCredit/getHistory`, { params }),
  fetchHistoryChangeReasons: params =>
    axios.get(`${http}${pathBe}:${balance}/trustCredit/getHistoryChangeReasons`, { params }),
  fetchTrustCreditInfo: params => axios.get(`${http}${pathBe}:${balance}/trustCredit/getInfo`, { params }),
  fetchDeactivateTrustCredit: data => axios.post(`${http}${pathBe}:${balance}/trustCredit/deactivate`, data),
  fetchActivateTrustCredit: data => axios.post(`${http}${pathBe}:${balance}/trustCredit/activate`, data),
  fetchAddContentBalance: data => axios.post(`${http}${pathBe}:${balance}/contentBalance/addContentBalance`, data),
  fetchCloseContentBalance: data => axios.post(`${http}${pathBe}:${balance}/contentBalance/closeContentBalance`, data),
  fetchContentBalanceHistory: params =>
    axios.get(`${http}${pathBe}:${balance}/contentBalance/getContentBalanceHistory`, { params }),
  // Remains
  // fetchRemainsDetailsData: params => axios.get(`${http}${pathBe}:${remains}/remains/getDateilsData`, { params }),
  // fetchSubscriberServices: params => axios.get(`${http}${pathBe}:${remains}/remains/getFullSubscriberServices`, { params }),
  // fetchQuantumData: params => axios.get(`${http}${pathBe}:${remains}/remains/getQuantumData`, { params }),
  // fetchUnpaidChargeData: params => axios.get(`${http}${pathBe}:${remains}/ChargeController/GetUnpaidChargeData`, { params }),
  // Temporary Pay
  fetchAvailabelPayment: params =>
    axios.get(`${http}${pathBe}:${temporaryPayment}/temporaryPayment/getAvailablePayment`, { params }),
  fetchAddPayment: data => axios.post(`${http}${pathBe}:${temporaryPayment}/temporaryPayment/addPayment`, data),
  // Payments, Invoices and Resources
  fetchPaymentHistory: params => axios.get(`${http}${pathBe}:${finance}/finance/getPaymentHistory`, { params }),
  fetchPaymentHistoryFilters: params => axios.get(`${http}${pathBe}:${finance}/finance/getDigestData`, { params }),
  adjustPayment: data => axios.post(`${http}${pathBe}:${finance}/finance/adjustmentPayment`, data),
  fetchInvoicesHistory: params => axios.get(`${http}${pathBe}:${finance}/finance/getClientInvoice`, { params }),
  fetchPaymentDocumentsUrl: params =>
    axios.get(`${http}${pathBe}:${finance}/finance/getPersonalAccountLink`, { params }),
  fetchCostsHistory: params => axios.get(`${http}${pathBe}:${finance}/finance/getChargeHistory`, { params }),
  fetchResourcesHistory: params => axios.get(`${http}${pathBe}:${finance}/Finance/GetPayCostSummary`, { params }),
  fetchDigestId: params => axios.get(`${http}${pathBe}:${finance}/finance/getDigestId`, { params })
}
