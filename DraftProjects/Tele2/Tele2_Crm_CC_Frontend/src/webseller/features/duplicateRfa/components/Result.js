import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { OperationResult } from 'webseller/components'
import { OperationStatus } from 'webseller/helpers'
import { executeDuplicateRfa, getMarkerDuplicateRfa, resetDuplicateRfa } from '../reducer'
import { resetSigning } from 'webseller/common/signing/reducer'
import { resetAgreements } from 'webseller/common/agreements/reducer'
import {
  selectErrorExecuteDuplicateRfa,
  selectIsLoadingExecuteDuplicateRfa,
  selectStatusDuplicateRfa
} from '../selectors'
import { clearFoundAddresses } from 'reducers/saleSim/saleSimReducer'

export default function Result () {
  const status = useSelector(selectStatusDuplicateRfa)
  const isLoading = useSelector(selectIsLoadingExecuteDuplicateRfa)
  const errorMessage = useSelector(selectErrorExecuteDuplicateRfa)

  const dispatch = useDispatch()

  const title =
    status === OperationStatus.SUCCESSFUL ? 'Дубликат договора оформлен' : 'Ошибка при оформлении дубликата договора'
  const message = status === OperationStatus.FAILURE ? errorMessage : undefined

  const executeOperation = () => dispatch(executeDuplicateRfa())
  const onOk = () => {
    dispatch(getMarkerDuplicateRfa())

    dispatch(clearFoundAddresses())
    dispatch(resetSigning())
    dispatch(resetAgreements())
    dispatch(resetDuplicateRfa())
    window.location.reload()
  }

  return (
    <OperationResult
      status={status}
      isLoading={isLoading}
      loadingText='Выполняется оформление дубликата договора'
      title={title}
      message={message}
      executeOperation={executeOperation}
      onOk={onOk}
    />
  )
}
