import React from 'react'
import { useSelector } from 'react-redux'
import { Divider } from 'antd'
import styled from 'styled-components'

import { Button, Title } from 'webseller/components'
import { T2_HALVAR_BREIT_EXTRABOLD } from 'webseller/helpers/styles'
import { FORM_FIELDS } from 'webseller/constants/form'
import { joinToString } from 'webseller/helpers'
import { formatDate } from 'webseller/helpers/formatDate'
import Agreements from 'webseller/common/agreements/components/Agreements'
import selectorsWebSellerRemote from 'webseller/remote/selectors'
import featureConfig from 'webseller/featureConfig'

export default function ApprovePersonalData ({
  isShowAgreements = false,
  personalData,
  availableAgreementKeys,
  approveData,
  editData
}) {
  const documentTypes = useSelector(
    featureConfig.isUseRemoteDocumentIdentity
      ? selectorsWebSellerRemote.documentIdentity.selectDocumentTypes
      : state => state.documentIdentity.documentIdentityTypes.identityDocumentTypes
  )

  const activedDocumentType = documentTypes?.find(({ id }) => id === personalData[FORM_FIELDS.DOCUMENT_TYPE])

  const documentFields = [
    {
      label: 'ФИО',
      value: joinToString([
        personalData[FORM_FIELDS.LAST_NAME],
        personalData[FORM_FIELDS.FIRST_NAME],
        personalData[FORM_FIELDS.MIDDLE_NAME]
      ])
    },
    {
      label: 'Дата рождения',
      value: formatDate(personalData[FORM_FIELDS.BIRTH_DATE])
    },
    {
      label: activedDocumentType?.name,
      value: joinToString([personalData[FORM_FIELDS.DOCUMENT_SERIES], personalData[FORM_FIELDS.DOCUMENT_NUMBER]])
    },
    {
      label: 'Дата выдачи',
      value: formatDate(personalData[FORM_FIELDS.DOCUMENT_DATE])
    },
    {
      label: 'Код подразделения',
      value: personalData[FORM_FIELDS.DOCUMENT_CODE]
    }
  ]

  const renderList = documentFields.reduce((list, item) => {
    if (item.value && item.label) {
      list.push(item)
    }

    return list
  }, [])

  return (
    <Container>
      <Main>
        <Title bold fontSize={18} fontFamily={T2_HALVAR_BREIT_EXTRABOLD}>
          Проверь корректность введенных данных
        </Title>
        <Info>
          <Title fontSize={16}>
            Персональные данные, которые ты внесешь, будут направлены на проверку в государственные информационные
            системы.
          </Title>
          <Title fontSize={16}>Внимательно проверь их, прежде чем переходить к следующему шагу</Title>
        </Info>
        <DocumentValues>
          {renderList.map(({ label, value }) => (
            <div key={label}>
              <Title bold fontSize={16}>
                {value}
              </Title>
              <Title>{label}</Title>
            </div>
          ))}
        </DocumentValues>
        {isShowAgreements && (
          <>
            <Divider type='horizontal' />
            <Agreements availableAgreementKeys={availableAgreementKeys} />
          </>
        )}
      </Main>
      <Footer>
        <Button onClick={editData}>Скорректировать</Button>
        <Button type='primary' onClick={approveData}>
          Продолжить
        </Button>
      </Footer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80%;
  max-width: 900px;
`

const Main = styled.div`
  flex: 1;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #dedede;
    border-radius: 100px;
  }
`

const Info = styled.div`
  margin: 16px 0;
`

const DocumentValues = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
`
