import React, { Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'

export const QuantumData = ({
  quantumData, isQuantumDataSuccess,
  subscriberServices, isSubscriberServicesSuccess,
  detailsData, isDetailsDataSuccess
}) => {
  const isMoreOptions =
    isSubscriberServicesSuccess && subscriberServices &&
    isDetailsDataSuccess && detailsData &&
    subscriberServices.SubscriberServiceData.ChargeQuantity !== -1

  return (
    <Fragment>
      <Row gutter={16}>
        <Quantum span={24}>
          <Title>По продуктам продляющим трафик</Title>
          <Row gutter={12}>
            <Col span={6}>Кванты</Col>
            <BalanceAmount span={4}>{isQuantumDataSuccess ? quantumData.Number : '-'}</BalanceAmount>
            <BalanceAmount span={4}>{isQuantumDataSuccess ? quantumData.Sum : '-'}</BalanceAmount>
          </Row>
        </Quantum>
      </Row>
      {
        isMoreOptions &&
        <Row gutter={16}>
          <Quantum span={24}>
            <Row gutter={12}>
              <Col span={6}>{subscriberServices.SubscriberServiceData.ServiceName}</Col>
              <BalanceAmount span={4}>{detailsData.MoreInternet}</BalanceAmount>
              <BalanceAmount span={4}>{`${subscriberServices.SubscriberServiceData.ChargeQuantity}/${subscriberServices.SubscriberServiceData.ChargeQuantityMax}`}</BalanceAmount>
            </Row>
          </Quantum>
        </Row>
      }
    </Fragment>
  )
}

QuantumData.propTypes = {
  quantumData: PropTypes.object,
  isQuantumDataSuccess: PropTypes.bool,
  subscriberServices: PropTypes.object,
  isSubscriberServicesSuccess: PropTypes.bool,
  detailsData: PropTypes.object,
  isDetailsDataSuccess: PropTypes.bool
}

const BalanceAmount = styled(Col)`
  text-align: left;
  margin-bottom: 5px;
`
const Title = styled.div`
  color: black;
`
const Quantum = styled(Col)`
  padding: 7px;
  margin-bottom: 5px;
`
