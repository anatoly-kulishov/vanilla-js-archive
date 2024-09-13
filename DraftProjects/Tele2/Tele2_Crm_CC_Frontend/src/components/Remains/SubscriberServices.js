import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import moment from 'moment'

const formatIsoDate = (date) =>
  date
    ? moment(date).format('DD.MM.YYYY')
    : ''

export const SubscriberServices = ({ subscriberServices, isSubscriberServicesSuccess, subscriberServicesMessage }) => {
  if (isSubscriberServicesSuccess) {
    return (
      <Row gutter={16}>
        <Col span={10}>
          <Row gutter={12}>
            <Col span={12}>Дата оплаты</Col>
            <BalanceAmount span={12}>{subscriberServices?.SubscriberServiceData &&
              formatIsoDate(subscriberServices.SubscriberServiceData.PaymentDate)}</BalanceAmount>
          </Row>
          <Row gutter={8}>
            <Col span={12}>Дата списания</Col>
            <BalanceAmount span={12}>{subscriberServices?.SubscriberServiceData &&
              formatIsoDate(subscriberServices.SubscriberServiceData.ChargeDate)}</BalanceAmount>
          </Row>
          <Row gutter={8}>
            <Col span={12}>Базовый размер АП</Col>
            <BalanceAmount span={12}>{subscriberServices?.LastCostConsumeData?.TotalAmount}</BalanceAmount>
          </Row>
        </Col>

        <Col span={4} />

        <Col span={10}>
          <Row gutter={12}>
            <Col span={12}>Следующее списание</Col>
            <BalanceAmount span={12}>{subscriberServices?.SubscriberServiceData &&
              formatIsoDate(subscriberServices.SubscriberServiceData.NextCharge)}</BalanceAmount>
          </Row>
          <Row gutter={8}>
            <Col span={12}>До обнуления осталось, дн.</Col>
            <BalanceAmount span={12}>{subscriberServices?.SubscriberServiceData?.ZeroChargeDays}</BalanceAmount>
          </Row>
          <Row gutter={8}>
            <Col span={12}>Базовый размер АП</Col>
            <BalanceAmount span={12}>{subscriberServices?.CurrnetCostConsumeData?.TotalAmount}</BalanceAmount>
          </Row>
        </Col>
      </Row>
    )
  } else {
    return (
      <div>{subscriberServicesMessage}</div>
    )
  }
}

SubscriberServices.propTypes = {
  subscriberServices: PropTypes.object,
  isSubscriberServicesSuccess: PropTypes.bool,
  subscriberServicesMessage: PropTypes.string
}

const BalanceAmount = styled(Col)`
  text-align: left;
  margin-bottom: 5px;
`
