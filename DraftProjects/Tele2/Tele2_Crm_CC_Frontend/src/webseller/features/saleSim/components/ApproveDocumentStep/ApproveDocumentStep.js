import React from 'react'
import styled from 'styled-components'
import { Button, Loader, Title } from 'webseller/components'
import { AgreementKey } from 'webseller/common/agreements/helpers'
import ApprovePersonalDataCommon from 'webseller/common/personalData/components/ApprovePersonalData'
import SmevPartialSuccess from './components/SmevPartialSuccess'
import features from 'webseller/featureConfig'

const { isUseSmev } = features

export default function ApproveDocumentStep ({
  documentData,
  smevLoading,
  smevDataError,
  checkSmevPartialSuccess,
  checkSmevError,
  onEdit,
  getSmevData,
  checkSimSaleAvailability,
  resetSaleSimProcess
}) {
  const onSubmit = isUseSmev ? getSmevData : checkSimSaleAvailability

  if (smevLoading) {
    return <Loader title='Идет проверка данных абонента. Проверка займет до 2-х минут' />
  }

  if (smevDataError || checkSmevError) {
    return (
      <Container>
        <Title bold fontSize={16}>
          Проверка не пройдена. Документ недействителен. Подключение по данному документу невозможно
        </Title>
        <Footer>
          <Button type='primary' onClick={resetSaleSimProcess}>
            Завершить
          </Button>
        </Footer>
      </Container>
    )
  }

  if (checkSmevPartialSuccess) {
    return <SmevPartialSuccess />
  }

  return (
    <ApprovePersonalDataCommon
      isShowAgreements
      personalData={documentData}
      availableAgreementKeys={[
        AgreementKey.isAgreeUseSubscriberInfo,
        AgreementKey.isPersonalDataDelegation,
        AgreementKey.isRefuseSmsAdvertising,
        AgreementKey.isNotAcceptDs,
        AgreementKey.isNotTariffSms
      ]}
      approveData={onSubmit}
      editData={onEdit}
    />
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Footer = styled.div`
  display: flex;
  justify-content: ${props => (props.justifyContent ? props.justifyContent : 'flex-end')};
  align-items: center;
`
