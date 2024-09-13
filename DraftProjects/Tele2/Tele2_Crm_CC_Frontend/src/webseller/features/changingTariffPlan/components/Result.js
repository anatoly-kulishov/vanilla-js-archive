import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { resetSigning } from 'webseller/common/signing/reducer'
import { OperationResult } from 'webseller/components'
import { resetChangingTariffPlan } from '../actions'
import { OperationStatus } from 'webseller/helpers'

export default function Result () {
  const dispatch = useDispatch()

  const { changeTariffStatus: status, changeTariffLoading: isLoading, changeTariffError: isError } = useSelector(state => state.services.tariffModal)

  const isSuccessful = status === OperationStatus.SUCCESSFUL && isLoading === false && isError === false

  const onOk = () => {
    dispatch(resetSigning())
    dispatch(resetChangingTariffPlan())
  }

  const title = isSuccessful ? 'Смена тарифа успешно завершена' : 'Ошибка при смене тарифного плана'

  return (
    <OperationResult
      status={status}
      isLoading={isLoading}
      loadingText='Выполняется смена тарифного плана'
      title={title}
      onOk={onOk}
    />
  )
}
