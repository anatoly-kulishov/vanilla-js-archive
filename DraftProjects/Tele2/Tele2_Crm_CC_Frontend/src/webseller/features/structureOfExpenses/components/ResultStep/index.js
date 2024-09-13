import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { changeStepStructureOfExpenses, createInteractionStructureOfExpenses, resetStructureOfExpenses } from '../../reducer'
import { selectIsLoading, selectStatusStructureOfExpenses } from '../../selectors'

import { OperationStatus } from 'webseller/helpers'
import { StructureOfExpensesStep } from '../../helpers'

import { OperationResult } from 'webseller/components'
import DownloadFile from '../DownloadFile'

export default function Result () {
  const status = useSelector(selectStatusStructureOfExpenses)
  const isLoading = useSelector(selectIsLoading)

  const isSuccess = status === OperationStatus.SUCCESSFUL

  const dispatch = useDispatch()

  const onOk = () => {
    dispatch(createInteractionStructureOfExpenses())
    dispatch(resetStructureOfExpenses())
  }

  const title = isSuccess ? 'Структура расходов успешно сформирована' : 'Ошибка при формировании структуры расходов'

  const goBack = () => dispatch(changeStepStructureOfExpenses(StructureOfExpensesStep.PERIOD_SELECTION))

  const renderAdditional = () => {
    if (isSuccess) {
      return <DownloadFile />
    } else return null
  }

  return (
    <OperationResult
      status={status}
      isLoading={isLoading}
      loadingText='Идет процесс формирования файла'
      title={title}
      onOk={onOk}
      additional={renderAdditional()}
      hasGoBack
      goBack={goBack}
    />
  )
}
