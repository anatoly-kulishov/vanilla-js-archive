import React, { Fragment } from 'react'
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

export default function OfferModalContent ({
  offer: { CreatedOn, ProductName, ResultName, SendSms, ContactPoint, FullName }
}) {
  OfferModalContent.propTypes = {
    offer: PropTypes.objectOf(
      PropTypes.shape({
        CreatedOn: PropTypes.string,
        ProductName: PropTypes.string,
        ResultName: PropTypes.string,
        SendSms: PropTypes.bool,
        ContactPoint: PropTypes.string,
        FullName: PropTypes.string
      })
    ).isRequired
  }

  return (
    <Fragment>
      <StyledRow>
        <NameCol span={4}>Дата:</NameCol>
        <ValueCol span={20}>{formatIsoDate(CreatedOn)}</ValueCol>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Тариф/Услуга:</NameCol>
        <ValueCol span={20}>{ProductName}</ValueCol>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Отклик:</NameCol>
        <ValueCol span={20}>{ResultName}</ValueCol>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>SMS:</NameCol>
        <ValueCol span={20}>{SendSms ? <CheckIcon /> : null}</ValueCol>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Точка контакта:</NameCol>
        <ValueCol span={20}>{ContactPoint}</ValueCol>
      </StyledRow>
      <StyledRow>
        <NameCol span={4}>Автор:</NameCol>
        <ValueCol span={20}>{FullName}</ValueCol>
      </StyledRow>
    </Fragment>
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
