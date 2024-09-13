import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Popover } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import moment from 'moment'

const getFormatDate = date => (date ? moment(date.fixationDate).format('DD.MM.YYYY') : '-')

const FinanceBlock = ({ trustCreditInfo }) => {
  return (
    <Popover
      placement='topLeft'
      title='Финансовая блокировка'
      content={
        <FinanceWrapper>
          <FinanceTitle>Целевая дата погашения задолжности</FinanceTitle>
          <div>{getFormatDate(trustCreditInfo.targetDateDebtPayment)}</div>
        </FinanceWrapper>
      }
      trigger='click'
    >
      <InfoCircleIcon />
    </Popover>
  )
}

export default FinanceBlock

FinanceBlock.propTypes = {
  trustCreditInfo: PropTypes.object
}

const FinanceWrapper = styled.div`
  display: flex;
`
const FinanceTitle = styled.div`
  width: 200px;
  text-align: left;
`
const InfoCircleIcon = styled(InfoCircleOutlined)`
  cursor: pointer;
  margin-right: 3px;

  & svg {
    width: 20px;
    height: 20px;
  }

  color: red;
`
