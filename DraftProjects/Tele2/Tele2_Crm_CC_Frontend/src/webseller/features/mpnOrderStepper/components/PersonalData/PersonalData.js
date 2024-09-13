import React, { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PersonalDataForm from 'webseller/common/personalData/components/PersonalDataForm'
import { Loader } from 'webseller/components'

import { getInitialPersonalDataMnp, setMnpOrderProcessStep, submitPersonalDataDuplicateRfa } from '../../actions'
import { selectIsLoadingGetInitialPersonalDataMnp, selectPersonalDataMnp } from '../../selectors'
import { MNP_ORDER_PROCESS_STEPS } from '../../constants'

export default function PersonalData () {
  const dispatch = useDispatch()

  const personalData = useSelector(selectPersonalDataMnp)
  const isLoading = useSelector(selectIsLoadingGetInitialPersonalDataMnp)

  const getInitialPersonalData = () => dispatch(getInitialPersonalDataMnp())
  const submitPersonalData = (payload) => dispatch(submitPersonalDataDuplicateRfa(payload))

  useLayoutEffect(() => {
    if (personalData === null) {
      getInitialPersonalData()
    }
  }, [])

  const handleGoPrevStep = () => {
    dispatch(setMnpOrderProcessStep(MNP_ORDER_PROCESS_STEPS.TRANSFER_TIME))
  }

  if (isLoading) {
    return <Loader title='Загрузка персональных данных абонента' />
  }

  return (
    <PersonalDataForm
      initialPersonalData={personalData}
      handleSubmit={submitPersonalData}
      isPrefill={personalData}
      goBack={handleGoPrevStep}
    />
  )
}
