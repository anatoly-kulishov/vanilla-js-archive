import { Operation, OperationIds, OperationTitle } from 'constants/operations'

export function preparePerformParams (operation, orderState, orderStatusState) {
  const performParams = {
    ...orderState
  }
  if (operation === Operation.Process) {
    performParams.IsDraft = false
  } else if (orderStatusState.statusId === 0) {
    performParams.IsDraft = true
  }
  return performParams
}

function prepareTransferParams (orderState) {
  const transferParams = {
    OrderId: orderState.OrderId,
    Series: orderState.Document?.Series,
    Number: orderState.Document?.Number,
    IssuedBy: orderState.Document?.IssueBy,
    DocumentTypeId: orderState.Document?.DocumentTypeId
  }
  return transferParams
}

function prepareCommonParams (operation, orderState, orderStatusState, reasonsState, operationId, reasonId) {
  const { OrderId, RtcOrderId, Msisdn, SubscriberId, SubscriberBranchId, ContactPoint, ChannelId } = orderState
  const { ReasonId: stateReasonId, ReasonComment } = reasonsState
  const { statusId } = orderStatusState
  const commonParams = {
    OrderId,
    Msisdn,
    SubscriberId,
    SubscriberBranchId,
    ContactPoint,
    SystemId: 5,
    ChannelId,
    ReasonId: stateReasonId || reasonId,
    ReasonComment
  }
  if (operation === Operation.Cancel || operation === Operation.Status) {
    commonParams.RtcOrderId = RtcOrderId
  }
  if (operation === Operation.Wait || operation === Operation.Return) {
    commonParams.isForWaitState = statusId === 10 || statusId === 35
  }
  if (operation === Operation.Wait) {
    commonParams.CallDateStart = reasonsState?.CallDateStart
    commonParams.CallDateEnd = reasonsState?.CallDateEnd
    commonParams.SR = reasonsState?.SR
  }
  if (operation === Operation.Status) {
    commonParams.OperationId = operationId
  }
  return commonParams
}

export function prepareParams (operation, orderState, orderStatusState, reasonsState, operationId, reasonId) {
  if (operation === Operation.Save || operation === Operation.Process) {
    return preparePerformParams(operation, orderState, orderStatusState)
  }
  if (operation === Operation.Transfer) {
    return prepareTransferParams(orderState)
  }
  return prepareCommonParams(operation, orderState, orderStatusState, reasonsState, operationId, reasonId)
}

export function getOperationId (operation) {
  const operationId = OperationIds[operation] ?? null
  if (!operationId) {
    throw new Error(`Can't find operationId for ${operation}`)
  }
  return operationId
}

export function getOperationTitle (operation) {
  const operationTitle = OperationTitle[operation] ?? null
  if (!operationTitle) {
    throw new Error(`Can't find operationTitle for ${operation}`)
  }
  return operationTitle
}

export function checkStatus (condition, statusId) {
  return condition?.statuses?.some(id => id === statusId) ?? true
}

export function checkRights (condition, userRights) {
  return (
    condition?.rights?.every(right => {
      switch (right) {
        case 'new':
          return userRights.isNewOrder
        case 'modify':
          return userRights.isModifyOrder
        case 'perform':
          return userRights.isPerformOrder
        case 'change':
          return userRights.isChangeOrderState
        case 'transfer':
          return userRights.isTransferOrder
        case 'limited':
          return userRights.isRtcLimitedBcOrder
        default:
          return false
      }
    }) ?? true
  )
}

export function checkHistory (condition, historyItem) {
  return (
    condition?.history?.some(
      item => item.reasonId === historyItem?.ReasonId && item.operationId === historyItem?.OperationId
    ) ?? true
  )
}
