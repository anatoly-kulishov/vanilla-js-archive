import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OperationResult } from 'webseller/components'
import { OperationStatus } from 'webseller/helpers'
import { executeNumberRoleManagment, resetNumberRoleManagment } from '../reducer'
import { resetSigning } from 'webseller/common/signing/reducer'
import { selectIsLoadingExecuteNumberRoleManagment, selectOperationStatusNumberRoleManagment } from '../selectors'

export default function Result () {
  const status = useSelector(selectOperationStatusNumberRoleManagment)
  const isLoading = useSelector(selectIsLoadingExecuteNumberRoleManagment)

  const isSuccess = status === OperationStatus.SUCCESSFUL

  const dispatch = useDispatch()

  const executeOperation = () => dispatch(executeNumberRoleManagment())
  const onOk = () => {
    if (isSuccess) {
      window.location.reload()
    } else {
      dispatch(resetSigning())
      dispatch(resetNumberRoleManagment())
    }
  }

  const title =
        isSuccess ? 'Операция смены доступа к ЛК прошла успешно' : 'Ошибка при смене доступа к ЛК'

  return (
    <OperationResult
      status={status}
      isLoading={isLoading}
      loadingText='Выполняется операция по смене доступа к ЛК'
      title={title}
      executeOperation={executeOperation}
      onOk={onOk}
    />
  )
}
