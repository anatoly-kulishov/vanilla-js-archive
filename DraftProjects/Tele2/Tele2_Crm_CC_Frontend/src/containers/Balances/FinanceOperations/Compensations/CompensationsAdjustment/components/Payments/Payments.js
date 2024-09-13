import React, { useMemo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Button } from 'antd'

import PaymentsTable from './components/PaymentsTable'

const Payments = props => {
  Payments.propTypes = {
    msisdn: PropTypes.string,
    paymentsList: PropTypes.array,
    isPaymentsListLoading: PropTypes.bool,
    handleAdjustPreview: PropTypes.func,
    selectPayment: PropTypes.func
  }
  const { msisdn, paymentsList, isPaymentsListLoading, selectPayment, currentPayment, handleAdjustPreview } = props

  const selectedRows = useMemo(() => [currentPayment?.index], [currentPayment])
  const dataSource = useMemo(() => paymentsList?.History ?? [], [paymentsList])

  return (
    <Wrapper>
      <Title>Поиск платежей на ошибочном номере {msisdn}</Title>
      {paymentsList && (
        <PaymentsTable
          dataSource={dataSource}
          isLoading={isPaymentsListLoading}
          selectedRows={selectedRows}
          onSelectRow={selectPayment}
        />
      )}
      <Footer>
        <ButtonItem
          disabled={!currentPayment || currentPayment?.record?.IsBillingPeriod}
          type='primary'
          margin
          onClick={handleAdjustPreview}
        >
          Предварительный просмотр
        </ButtonItem>
      </Footer>
    </Wrapper>
  )
}

export default Payments

const Wrapper = styled.div`
  background: #fff;
  border-top: 1px solid rgb(240, 240, 240);
`

const Title = styled.div`
  display: block;
  color: black;
  padding: 15px 30px;
  border-bottom: 1px solid rgb(240, 240, 240);
  font-family: T2HalvarBreit_ExtraBold;
  font-size: 16px;
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 10px;
`

const ButtonItem = styled(Button)`
  :not(:last-of-type) {
    margin-right: 10px;
  }
`
