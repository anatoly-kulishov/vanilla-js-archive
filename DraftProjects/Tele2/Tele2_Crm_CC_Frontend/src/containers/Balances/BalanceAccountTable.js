import React from 'react'
import { Row, Col } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Content from './ContentBalance'
import { getTypeCard } from 'webseller/helpers'

const BalanceAccountTable = props => {
  const {
    balanceError,
    isBalanceLoading,
    balance,
    isASSeller
  } = props
  const isError = !isBalanceLoading && balanceError
  const isAllowToRender =
    !isBalanceLoading && !balanceError && balance

  const {
    isb2b,
    isPersonalAccountCard,
    isSubscriberFirstLevelCard,
    isSubscriberSecondLevelCard
  } = getTypeCard(isASSeller)

  const isNotB2bFirstLevelCard = !(isb2b && isSubscriberFirstLevelCard)

  if (isError) {
    return (
      <Wrapper>Ошибка загрузки баланса лицевого счета. {balanceError}</Wrapper>
    )
  } else if (isAllowToRender) {
    const client = balance?.client || {}
    return (
      <Wrapper>
        {isNotB2bFirstLevelCard && (
          <Row gutter={12}>
            <Col span={8}>
              {client?.clientBalances &&
              client.clientBalances.mainClientBalances &&
              client.clientBalances.mainClientBalances.map((row, index) => {
                return (
                  <StyledRow key={index} span={24}>
                    <Col span={14}>{row.balanceName}</Col>
                    <BalanceAmount span={10}>{row.balanceAmount.toFixed(2)}</BalanceAmount>
                  </StyledRow>
                )
              })}
              {isASSeller && (!isSubscriberSecondLevelCard && !isPersonalAccountCard) && (
                <StyledRow span={24}>
                  <Col span={14}>
                    <b>Сумма</b>
                  </Col>
                  <BalanceAmount span={10}>
                    <b>{client?.clientBalances && client.clientBalances.sum.toFixed(2)}</b>
                  </BalanceAmount>
                </StyledRow>
              )}
              {!isASSeller && (
                <StyledRow span={24}>
                  <Col span={14}>
                    <b>Сумма</b>
                  </Col>
                  <BalanceAmount span={10}>
                    <b>{client?.clientBalances && client.clientBalances.sum.toFixed(2)}</b>
                  </BalanceAmount>
                </StyledRow>
              )}
              {!isSubscriberSecondLevelCard && !isPersonalAccountCard && (
                <StyledRow
                  span={24}
                  color={(client?.debit && client.debit !== '0') ? '#f5222d' : 'rgba(0, 0, 0, 0.65)'}
                >
                  <Col span={14}>Есть дебиторская задолженность</Col>
                  <BalanceAmount span={10}>
                    {client?.debit ? (client.debit === '0' ? 'нет' : client.debit) : 'нет данных'}
                  </BalanceAmount>
                </StyledRow>
              )}
            </Col>

            <Col span={8}>
              <StyledRow span={24}>
                <Col span={14}>Контентный баланс</Col>
                <Col span={10}>
                  <BalanceAmount><Content isClient /></BalanceAmount>
                </Col>
              </StyledRow>
              {!isSubscriberSecondLevelCard && !isPersonalAccountCard && (
                <StyledRow span={24}>
                  <Col span={14}>Финансовая блокировка</Col>
                  <Col span={10}>
                    <BalanceAmount>{client?.clientData && client.clientData?.financeBlock}</BalanceAmount>
                  </Col>
                </StyledRow>
              )}
              <StyledRow span={24}>
                <Col span={14}>Кредитный лимит</Col>
                <Col span={10}>
                  <BalanceAmount>{client?.clientBalances && client.clientBalances?.creditLimit}</BalanceAmount>
                </Col>
              </StyledRow>
            </Col>

            <Col span={8}>
              <StyledRow span={24}>
                <Col span={14}>Тип оплаты</Col>
                <Col span={10}>
                  <BalanceAmount>{client?.clientData && client.clientData?.paymentType}</BalanceAmount>
                </Col>
              </StyledRow>
              <StyledRow span={24}>
                <Col span={14}>Консолидация счетов</Col>
                <Col span={10}>
                  <BalanceAmount>{client?.clientData && client.clientData?.consolidation}</BalanceAmount>
                </Col>
              </StyledRow>
              <StyledRow span={24}>
                <Col span={14}>Единый счёт(КУО)</Col>
                <Col span={10}>
                  <BalanceAmount>
                    {
                      client?.clientData && client.clientData?.linkedAccountId !== null
                        ? client.clientData.linkedAccountId
                        : ''
                    }
                  </BalanceAmount>
                </Col>
              </StyledRow>
            </Col>
          </Row>
        )}
      </Wrapper>
    )
  } else {
    return <BalancesSkeleton />
  }
}

export default BalanceAccountTable

BalanceAccountTable.propTypes = {
  balanceError: PropTypes.bool,
  isBalanceLoading: PropTypes.bool,
  balance: PropTypes.object,
  isASSeller: PropTypes.bool
}

const Wrapper = styled.div`
  padding: 17px 22px 17px 13px;
`
const BalanceAmount = styled(Col)`
  text-align: left;
`
const StyledRow = styled(Row)`
  margin-bottom: 5px;

  color: ${props => props.color};
`
const BalancesSkeleton = styled.div`
  height: 135px;
`
