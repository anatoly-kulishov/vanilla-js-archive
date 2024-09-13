import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from 'antd'
import styled from 'styled-components'

import { selectPermissions } from 'webseller/common/user/selectors'
import { selectPersonalAccount } from 'webseller/features/mpnOrderStepper/selectors'
import { selectActiveStepStructureOfExpenses, selectIsLoading } from '../selectors'
import {
  checkIsAvailableStructureOfExpenses,
  createInteractionStructureOfExpenses,
  resetStructureOfExpenses
} from '../reducer'

import { checkRightWithOperations, getTypeCard } from 'webseller/helpers'
import { StructureOfExpensesStep, stepsStructureOfExpensesStep } from 'webseller/features/structureOfExpenses/helpers'
import LoadingSpinner from 'components/LoadingSpinner'
import Steps from 'webseller/common/steps/components/Steps'

const StructureOfExpenses = () => {
  const dispatch = useDispatch()

  const activeStep = useSelector(selectActiveStepStructureOfExpenses)
  const permissions = useSelector(selectPermissions)
  const personalAccount = useSelector(selectPersonalAccount)
  const isLoading = useSelector(selectIsLoading)

  const isShowStepper = activeStep !== StructureOfExpensesStep.NONE
  const { Msisdn } = personalAccount || {}
  const { isb2b, isSubscriberFirstLevelCard } = getTypeCard(true)
  const isb2bSubscriberFirstLevelCard = isb2b && isSubscriberFirstLevelCard

  const isHasRight = checkRightWithOperations({
    permissions,
    permissionName: 'AS.Detalization',
    operationName: 'S'
  })
  const resetProcess = () => {
    dispatch(createInteractionStructureOfExpenses())
    dispatch(resetStructureOfExpenses())
  }
  const handleButtonClick = () => {
    dispatch(checkIsAvailableStructureOfExpenses())
  }

  return (
    <>
      <OpenStepsButton
        onClick={handleButtonClick}
        disabled={!isHasRight || isb2bSubscriberFirstLevelCard || !Msisdn}
      >
        {isLoading ? <LoadingSpinner /> : 'Структура расходов'}
      </OpenStepsButton>
      {isShowStepper && (
        <Steps
          title='Структура расходов'
          activeStepKey={activeStep}
          steps={stepsStructureOfExpensesStep}
          resetProcess={resetProcess}
        />
      )}
    </>
  )
}

export default StructureOfExpenses

const OpenStepsButton = styled(Button)`
  width: 80px;
  margin-left: 20px;
  white-space: normal;
  font-size: 12px;
  line-height: 12px;
  padding: 2px;
`
