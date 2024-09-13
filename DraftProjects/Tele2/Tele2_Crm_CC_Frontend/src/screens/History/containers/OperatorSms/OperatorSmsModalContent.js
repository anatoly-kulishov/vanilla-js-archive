import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Row, Col } from 'antd'
import PropTypes from 'prop-types'

const formatIsoDate = (value) => value ? moment.utc(value).local().format('DD.MM.YYYY[\n]HH:mm') : ''

export default function OperatorSmsModalContent ({ record }) {
  OperatorSmsModalContent.propTypes = {
    record: PropTypes.object
  }
  return (
    <div>
      <StyledRow>
        <NameCol span={4}>Дата создания:</NameCol>
        <ValueCol span={20}>{formatIsoDate(record.CreatedOn)}</ValueCol>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Дата отправки:</NameCol>
        <ValueCol span={20}>{formatIsoDate(record.PlannedDate)}</ValueCol>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Точка контакта:</NameCol>
        <ValueCol span={20}>{record.ContactPoint}</ValueCol>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Название шаблона SMS:</NameCol>
        <ValueCol span={20}>{record.SmsTemplateName}</ValueCol>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Причина отправки:</NameCol>
        <ValueCol span={20}>{record.ScriptInforming}</ValueCol>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Автор:</NameCol>
        <ValueCol span={20}>{record.CreatedBy}</ValueCol>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Сообщение:</NameCol>
        <ValueCol span={20}>{record.Text}</ValueCol>
      </StyledRow>
    </div>
  )
}

const StyledRow = styled(Row)`
  padding: 5px 20px;
  border-bottom: 1px solid #e8e8e8;
  &:hover {
    background: #fffbe4;
  }
`
const NameCol = styled(Col)`
  font-size: 12px;
  padding: 4px 0px;
`
const ValueCol = styled(Col)`
  padding: 4px 11px;
`
