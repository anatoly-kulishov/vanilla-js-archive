import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from 'webseller/components'
import Steps from 'webseller/common/steps/components/Steps'
import { resetSigning } from 'webseller/common/signing/reducer'

import { NumberRoleManagmentStep, stepsNumberRoleManagment } from '../helpers'
import { initNumberRoleManagment, resetNumberRoleManagment } from '../reducer'
import { selectActiveStepNumberRoleManagment, selectIsLoadingInitNumberRoleManagment } from '../selectors'

export default function ChangeNumberRole ({ className }) {
  const activeStep = useSelector(selectActiveStepNumberRoleManagment)
  const isLoadingInitProcess = useSelector(selectIsLoadingInitNumberRoleManagment)

  const dispatch = useDispatch()

  const isShowStepper = activeStep !== NumberRoleManagmentStep.NONE

  const onClickChangeRoleButton = () => {
    dispatch(initNumberRoleManagment())
  }
  const resetProcess = () => {
    dispatch(resetNumberRoleManagment())
    dispatch(resetSigning())
  }

  return (
    <Fragment>
      {isShowStepper && (
        <Steps
          title='Уровень доступа в ЛК'
          steps={stepsNumberRoleManagment}
          activeStepKey={activeStep}
          resetProcess={resetProcess}
        />
      )}
      <Button
        className={className}
        type='primary'
        size='small'
        loading={isLoadingInitProcess}
        onClick={onClickChangeRoleButton}
      >
        Изменить
      </Button>
    </Fragment>
  )
}
