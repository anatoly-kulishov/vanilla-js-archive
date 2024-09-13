import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { resetSigning } from 'webseller/common/signing/reducer'
import { OperationResult } from 'webseller/components'
import { OperationStatus } from 'webseller/helpers'
import {
  executeOperationChangingClientStatus,
  resetChangingClientStatus
} from '../actions'
import {
  selectErrorExecuteOperationChangingClientStatus,
  selectIsLoadingExecuteOperationChangingClientStatus,
  selectStatusChangingClientStatus
} from '../selectors'

export default function Result () {
  const status = useSelector(selectStatusChangingClientStatus)
  const isSuccessful = status === OperationStatus.SUCCESSFUL
  const isLoading = useSelector(selectIsLoadingExecuteOperationChangingClientStatus)
  const error = useSelector(selectErrorExecuteOperationChangingClientStatus)

  const dispatch = useDispatch()

  const executeOperation = () => dispatch(executeOperationChangingClientStatus())
  const onOk = () => {
    dispatch(resetSigning())
    dispatch(resetChangingClientStatus())
  }

  const title = isSuccessful ? 'Операция смены статуса прошла успешно' : 'Ошибка при смене статуса'
  const message = !isSuccessful ? error : undefined

  return (
    <OperationResult
      status={status}
      isLoading={isLoading}
      loadingText='Выполняется смена статуса'
      title={title}
      message={message}
      executeOperation={executeOperation}
      onOk={onOk}
    />
  )
}
