import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import PersonalDataForm from 'webseller/common/personalData/components/PersonalDataForm'
import { selectRecreateClientReceivingParty } from '../selectors'
import { changeRecreateClientStep, submitReceivingPartyData } from '../reducer'
import { StepTypeRecreateClient } from '../helpers'

export default function ReceivingParty () {
  const personalData = useSelector(selectRecreateClientReceivingParty)

  const dispatch = useDispatch()

  const submitPersonalData = payload => dispatch(submitReceivingPartyData(payload))
  const goBack = () => dispatch(changeRecreateClientStep(StepTypeRecreateClient.TRANSMITTING_PARTY))

  return <PersonalDataForm initialPersonalData={personalData} handleSubmit={submitPersonalData} goBack={goBack} />
}
