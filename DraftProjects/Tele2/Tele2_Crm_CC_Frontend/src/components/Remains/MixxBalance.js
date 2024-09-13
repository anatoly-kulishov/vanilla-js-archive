import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Row, Col, Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

export const MixxBalance = ({ mixxBalance, isMixxBalanceSuccess, mixxBalanceMessage }) => {
  if (!isMixxBalanceSuccess) {
    return (
      <>
        <Title>Подписка Mixx</Title>
        <div>{mixxBalanceMessage}</div>
      </>
    )
  }

  return (
    <Row gutter={16}>
      <Col span={10}>
        <Title>Подписка Mixx</Title>
        <Row gutter={12}>
          <Col span={12}>
            <ItemWrapper>
              Накоплено, гб.
              <Tooltip placement='bottom' title='Доступны после переноса номера в Tele2'>
                <InfoCircleIcon />
              </Tooltip>
            </ItemWrapper>
          </Col>
          <Amount span={12}>{mixxBalance}</Amount>
        </Row>
      </Col>
    </Row>
  )
}

MixxBalance.propTypes = {
  mixxBalance: PropTypes.object,
  isMixxBalanceSuccess: PropTypes.bool,
  mixxBalanceMessage: PropTypes.string
}

const Amount = styled(Col)`
  text-align: left;
  margin-bottom: 5px;
`
const Title = styled.div`
  color: black;
`
const InfoCircleIcon = styled(InfoCircleOutlined)`
  margin-left: 5px;

  cursor: pointer;
  font-size: 20px;
`

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
`
