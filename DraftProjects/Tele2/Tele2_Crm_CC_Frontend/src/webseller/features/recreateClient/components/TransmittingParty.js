import React, { useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import PersonalDataForm from 'webseller/common/personalData/components/PersonalDataForm'
import { Loader } from 'webseller/components'
import { selectRecreateClientIsLoadingTransmittingPartyData, selectRecreateClientTransmittingParty } from '../selectors'
import { getTransmittingPartyData, submitTransmittingPartyData } from '../reducer'
import { clearFoundAddresses as clearFoundAddressesAction } from 'reducers/saleSim/saleSimReducer'

export default function TransmittingParty () {
  const personalData = useSelector(selectRecreateClientTransmittingParty)
  const isLoadingPersonalData = useSelector(selectRecreateClientIsLoadingTransmittingPartyData)

  const dispatch = useDispatch()

  const getInitialPersonalData = () => dispatch(getTransmittingPartyData())
  const submitPersonalData = payload => dispatch(submitTransmittingPartyData(payload))
  const clearFoundAddresses = () => dispatch(clearFoundAddressesAction())

  useLayoutEffect(() => {
    getInitialPersonalData()

    return clearFoundAddresses
  }, [])

  if (isLoadingPersonalData) {
    return <Loader title='Загрузка персональных данных передающей стороны' />
  }

  return (
    <PersonalDataForm
      isPrefill
      initialPersonalData={personalData}
      handleSubmit={submitPersonalData}
      isSkipMigrationCardStep
    />
  )
}
