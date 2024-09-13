import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { Row, Col } from 'antd'
import { CheckOutlined } from '@ant-design/icons'

const formatIsoDate = value =>
  value
    ? moment
      .utc(value)
      .local()
      .format('DD.MM.YYYY[\n]HH:mm')
    : ''

export default function InteractionModalContent ({
  interaction: {
    CreatedOn,
    ReasonName,
    CategoryName,
    SmsTemplateName,
    CommentText,
    RegisteringCaseName,
    SmsTemplateId,
    Email,
    ServiceChannelName,
    ContactPoint,
    UserFIO
  }
}) {
  InteractionModalContent.propTypes = {
    interaction: PropTypes.objectOf(
      PropTypes.shape({
        CreatedOn: PropTypes.string,
        ReasonName: PropTypes.string,
        CategoryName: PropTypes.string,
        SmsTemplateName: PropTypes.string,
        CommentText: PropTypes.string,
        RegisteringCaseName: PropTypes.string,
        SmsTemplateId: PropTypes.string,
        Email: PropTypes.string,
        ServiceChannelName: PropTypes.string,
        ContactPoint: PropTypes.string,
        UserFIO: PropTypes.stirng,
        InteractionNoteId: PropTypes.number
      })
    ).isRequired
  }

  return (
    <div>
      <StyledRow>
        <NameCol span={4}>Дата:</NameCol>
        <ValueCol span={20}>{formatIsoDate(CreatedOn)}</ValueCol>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Причина:</NameCol>
        <ValueCol span={20}>{ReasonName}</ValueCol>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Категория:</NameCol>
        <ValueCol span={20}>{CategoryName}</ValueCol>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Шаблон:</NameCol>
        <ValueCol span={20}>{SmsTemplateName}</ValueCol>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Комментарий:</NameCol>
        <ValueCol span={20}>{CommentText}</ValueCol>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Сценарий:</NameCol>
        <ValueCol span={20}>{RegisteringCaseName}</ValueCol>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>SMS:</NameCol>
        <ValueCol span={20}>{SmsTemplateId ? <CheckIcon /> : null}</ValueCol>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>E-Mail:</NameCol>
        <ValueCol span={20}>{Email || ''}</ValueCol>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Канал обращения:</NameCol>
        <ValueCol span={20}>{ServiceChannelName}</ValueCol>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Точка контакта:</NameCol>
        <ValueCol span={20}>{ContactPoint}</ValueCol>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Автор:</NameCol>
        <ValueCol span={20}>{UserFIO}</ValueCol>
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
const CheckIcon = styled(CheckOutlined)`
  font-size: 20px;
  cursor: pointer;
  color: #52c41a;
`
