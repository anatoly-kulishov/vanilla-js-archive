import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { Title, Button } from 'webseller/components'
import AgreementsCommon from 'webseller/common/agreements/components/Agreements'
import { T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'
import { AgreementKey } from 'webseller/common/agreements/helpers'
import { goToPrevRecreateClientStep, submitAdditionalAgreements } from '../reducer'

export default function Agreements () {
  const dispatch = useDispatch()

  const goForward = () => dispatch(submitAdditionalAgreements())
  const goBack = () => dispatch(goToPrevRecreateClientStep())

  return (
    <Container>
      <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
        Согласия
      </Title>
      <AgreementsCommon
        availableAgreementKeys={[
          AgreementKey.isAgreeUseSubscriberInfo,
          AgreementKey.isPersonalDataDelegation,
          AgreementKey.isRefuseSmsAdvertising,
          AgreementKey.isNotAcceptDs,
          AgreementKey.isNotTariffSms
        ]}
      />
      <Footer>
        <Button onClick={goBack}>Назад</Button>
        <Button type='primary' onClick={goForward}>
          Далее
        </Button>
      </Footer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  width: 60%;
  height: 100%;
  max-width: 600px;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
