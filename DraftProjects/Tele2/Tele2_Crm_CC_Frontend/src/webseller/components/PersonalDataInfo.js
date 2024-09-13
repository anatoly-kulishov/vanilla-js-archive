import React from 'react'
import styled from 'styled-components'
import * as moment from 'moment'

import { Title } from 'webseller/components'
import { FORM_FIELDS, RUSSIAN_FEDERATION_PASSPORT } from 'webseller/constants/form'
import featureConfig from 'webseller/featureConfig'

export default function PersonalDataInfo ({ personalData, docIdentityTypes }) {
  const documentTypes = featureConfig.isUseRemoteDocumentIdentity ? docIdentityTypes : docIdentityTypes?.identityDocumentTypes

  const documentType = documentTypes?.find(
    ({ id }) => id === personalData[FORM_FIELDS.DOCUMENT_TYPE]
  )

  const documentItems = [
    {
      label: 'ФИО',
      value: [
        personalData[FORM_FIELDS.LAST_NAME],
        personalData[FORM_FIELDS.FIRST_NAME],
        personalData[FORM_FIELDS.MIDDLE_NAME]
      ]
        .filter(Boolean)
        .join(' ')
    },
    {
      label: 'Дата рождения',
      value: moment(personalData[FORM_FIELDS.BIRTH_DATE]).format('DD.MM.YYYY')
    },
    {
      label: documentType?.name,
      value: [personalData[FORM_FIELDS.DOCUMENT_SERIES], personalData[FORM_FIELDS.DOCUMENT_NUMBER]].join(' ')
    },
    {
      label: 'Дата выдачи',
      value: moment(personalData[FORM_FIELDS.DOCUMENT_DATE]).format('DD.MM.YYYY')
    }
  ]

  if (personalData[FORM_FIELDS.DOCUMENT_TYPE] === RUSSIAN_FEDERATION_PASSPORT) {
    documentItems.push({
      label: 'Код подразделения',
      value: personalData[FORM_FIELDS.DOCUMENT_CODE]
    })
  }

  const renderList = documentItems.reduce((list, item) => {
    if (item.value && item.label) {
      list.push(item)
    }

    return list
  }, [])

  return (
    <Container>
      {renderList.map(({ label, value }) => (
        <div key={label}>
          <Title bold fontSize={16}>
            {value}
          </Title>
          <Title>{label}</Title>
        </div>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
