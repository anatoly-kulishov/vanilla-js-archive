import { select } from 'redux-saga/effects'
import { selectHandlingState } from 'reducers/internal/selectors'
import { getPersonalAccountState } from 'selectors/index'
import { selectStatusStructureOfExpenses } from '../selectors'
import { OperationStatus } from 'webseller/helpers'

export function * createRequestParamsCreateInteraction () {
  const status = yield select(selectStatusStructureOfExpenses)
  const isSuccess = status === OperationStatus.SUCCESSFUL

  const { Id: handlingId } = yield select(selectHandlingState)
  const {
    BillingBranchId: clientBranchId,
    Msisdn: msisdn,
    ClientId: clientId,
    SubscriberId: subscriberId,
    SubscriberFullInfo
  } = yield select(getPersonalAccountState)

  return {
    categoryId: isSuccess ? 4 : 0,
    clientBranchId,
    clientId,
    subscriberBranchId: SubscriberFullInfo?.SubscriberClientInfo?.BillingBranchId,
    subscriberId,
    handlingId,
    msisdn,
    reasonId: 2283,
    registeringCaseId: 7
  }
}
