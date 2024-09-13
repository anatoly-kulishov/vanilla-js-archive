import React, { Fragment, useMemo } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { formatNumber } from 'screens/Finance/helpers/format'
import LoadingSpinner from 'components/LoadingSpinner'

const SubscriberBalance = props => {
  const { balance, isBalanceLoading, isBalanceError } = props
  const isBalance = !!balance?.length

  if (isBalanceLoading) {
    return (
      <Wrapper>
        <LoadingSpinner />
      </Wrapper>
    )
  }

  if (isBalanceError) {
    return (
      <Wrapper>
        <Content>
          <ErrorText>Ошибка получения баланса абонента</ErrorText>
        </Content>
      </Wrapper>
    )
  }

  if (isBalance) {
    const balanceFields = useMemo(() => {
      return balance.map(item => ({
        field: item.balanceName,
        value: item.balanceAmount
      }))
    }, [balance])

    return (
      <Wrapper>
        <Content>
          {balanceFields.map((item, index) => {
            return (
              <FieldWrapper key={index}>
                <FieldLabel>{item.field}</FieldLabel>
                <FieldValue>{formatNumber(item.value)}</FieldValue>
              </FieldWrapper>
            )
          })}
        </Content>
      </Wrapper>
    )
  }
  return <Fragment />
}

SubscriberBalance.propTypes = {
  balance: PropTypes.array,
  isBalanceLoading: PropTypes.bool,
  isBalanceError: PropTypes.bool
}

export default SubscriberBalance

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  padding: 0 30px;
`

const Content = styled.div`
  width: 100%;
`

const FieldWrapper = styled.div`
  display: flex;
  align-items: center;

  &:last-child {
    font-weight: bold;
  }
`

const FieldLabel = styled.div`
  width: 130px;
  color: #000;
  font-weight: bold;
`

const FieldValue = styled.div`
  width: 120px;
  text-align: right;
  color: #000;
`

const ErrorText = styled.div`
  color: #f5222d;
`
