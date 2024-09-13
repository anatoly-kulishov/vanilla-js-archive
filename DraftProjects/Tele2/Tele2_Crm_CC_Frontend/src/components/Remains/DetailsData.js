import React, { Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'

export const DetailsData = ({ detailsData, isDetailsDataSuccess, detailsDataMessage }) => {
  if (isDetailsDataSuccess) {
    return (
      <Row gutter={16}>
        <Col span={10}>
          <Title>Осталось с прошлого месяца</Title>
          <Row gutter={12}>
            <Col span={12}>Минут, шт.</Col>
            <BalanceAmount span={12}>{detailsData && detailsData.LastMinutesCount}</BalanceAmount>
          </Row>
          <Row gutter={12}>
            <Col span={12}>SMS, шт.</Col>
            <BalanceAmount span={12}>{detailsData && detailsData.LastSmsCount}</BalanceAmount>
          </Row>
          <Row gutter={12}>
            <Col span={12}>Интернет</Col>
            <BalanceAmount span={12}>{detailsData && detailsData.LastInternetCount}</BalanceAmount>
          </Row>
        </Col>

        <Col span={4} />

        <Col span={10}>
          <Title>Доступно в этом месяце</Title>
          <Row gutter={12}>
            <Col span={12}>Минут, шт.</Col>
            <BalanceAmount span={12}>{detailsData && detailsData.AvailabaleMinutesCount}</BalanceAmount>
          </Row>
          <Row gutter={12}>
            <Col span={12}>SMS, шт.</Col>
            <BalanceAmount span={12}>{detailsData && detailsData.AvailabaleSmsCount}</BalanceAmount>
          </Row>
          <Row gutter={12}>
            <Col span={12}>Интернет</Col>
            <BalanceAmount span={12}>{detailsData && detailsData.AvailabaleInternetCount}</BalanceAmount>
          </Row>
        </Col>
      </Row>
    )
  } else {
    return (
      <Fragment>
        <Title>Основные данные</Title>
        <div>{detailsDataMessage}</div>
      </Fragment>
    )
  }
}

DetailsData.propTypes = {
  detailsData: PropTypes.object,
  isDetailsDataSuccess: PropTypes.bool,
  detailsDataMessage: PropTypes.string
}

const BalanceAmount = styled(Col)`
  text-align: left;
  margin-bottom: 5px;
`
const Title = styled.div`
  color: black;
`
