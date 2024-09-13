import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Button } from 'antd'

import SubscriberCard from './components/SubscriberCard'

const Subscribers = props => {
  Subscribers.propTypes = {
    invalidMsisdn: PropTypes.string,
    setInvalidMsisdn: PropTypes.func,
    validMsisdn: PropTypes.string,
    setValidMsisdn: PropTypes.func,

    fetchInvalidSubscriberInfo: PropTypes.func,
    invalidSubscriberInfo: PropTypes.object,
    isInvalidSubscriberInfoLoading: PropTypes.bool,
    isInvalidSubscriberInfoError: PropTypes.bool,
    fetchValidSubscriberInfo: PropTypes.func,
    validSubscriberInfo: PropTypes.object,
    isValidSubscriberInfoLoading: PropTypes.bool,
    isValidSubscriberInfoError: PropTypes.bool,

    invalidSubscriberBalance: PropTypes.object,
    isInvalidSubscriberBalanceLoading: PropTypes.bool,
    isInvalidSubscriberBalanceError: PropTypes.bool,
    validSubscriberBalance: PropTypes.object,
    isValidSubscriberBalanceLoading: PropTypes.bool,
    isValidSubscriberBalanceError: PropTypes.bool,

    clearSubscribersData: PropTypes.func,
    handleFetchPayments: PropTypes.func,
    resetPayments: PropTypes.func
  }
  const {
    invalidMsisdn,
    setInvalidMsisdn,
    validMsisdn,
    setValidMsisdn,

    fetchValidSubscriberInfo,
    validSubscriberInfo,
    isValidSubscriberInfoLoading,
    isValidSubscriberInfoError,
    fetchInvalidSubscriberInfo,
    invalidSubscriberInfo,
    isInvalidSubscriberInfoLoading,
    isInvalidSubscriberInfoError,

    fetchValidSubscriberBalance,
    validSubscriberBalance,
    isValidSubscriberBalanceLoading,
    isValidSubscriberBalanceError,
    invalidSubscriberBalance,
    fetchInvalidSubscriberBalance,
    isInvalidSubscriberBalanceLoading,
    isInvalidSubscriberBalanceError,

    clearSubscribersData,
    handleFetchPayments,
    resetPayments
  } = props

  const isInvalidMsisdnFull = invalidMsisdn?.length === 11
  const isValidMsisdnFull = validMsisdn?.length === 11

  const isSearchButtonEnabled = invalidMsisdn !== validMsisdn && isInvalidMsisdnFull && isValidMsisdnFull

  const handleFetchSubscribersData = useCallback(() => {
    fetchInvalidSubscriberInfo({ msisdn: invalidMsisdn })
    fetchValidSubscriberInfo({ msisdn: validMsisdn })
    resetPayments()
  })

  const handleFetchSubscribersBalance = useCallback(() => {
    const {
      ClientCategory: invalidClientCategory,
      Msisdn: invalidMsisdn,
      BillingBranchId: invalidBranchId,
      ClientId: invalidClientId,
      PersonalAccountId: invalidpersonalAccountId
    } = invalidSubscriberInfo
    const {
      ClientCategory: validClientCategory,
      Msisdn: validMsisdn,
      BillingBranchId: validBranchId,
      ClientId: validClientId,
      PersonalAccountId: validpersonalAccountId
    } = validSubscriberInfo

    fetchInvalidSubscriberBalance({
      msisdn: invalidMsisdn,
      branchId: invalidBranchId,
      clientId: invalidClientId,
      personalAccountId: invalidpersonalAccountId,
      ClientCategory: invalidClientCategory
    })
    fetchValidSubscriberBalance({
      msisdn: validMsisdn,
      branchId: validBranchId,
      clientId: validClientId,
      personalAccountId: validpersonalAccountId,
      ClientCategory: validClientCategory
    })
  })

  useEffect(() => {
    if (invalidSubscriberInfo && validSubscriberInfo) {
      handleFetchSubscribersBalance()
    }
  }, [validSubscriberInfo, invalidSubscriberInfo])

  useEffect(() => {
    if (validSubscriberBalance && invalidSubscriberBalance) {
      handleFetchPayments()
    }
  }, [validSubscriberBalance, invalidSubscriberBalance])

  return (
    <Wrapper>
      <Title>Поиск абонентов</Title>
      <Content>
        <SubscriberCard
          info={invalidSubscriberInfo}
          isInfoLoading={isInvalidSubscriberInfoLoading}
          isInfoError={isInvalidSubscriberInfoError}
          balance={invalidSubscriberBalance}
          isBalanceLoading={isInvalidSubscriberBalanceLoading}
          isBalanceError={isInvalidSubscriberBalanceError}
          label='Ошибочный номер'
          msisdn={invalidMsisdn}
          onChange={setInvalidMsisdn}
        />
        <SubscriberCard
          disabled
          info={validSubscriberInfo}
          isInfoLoading={isValidSubscriberInfoLoading}
          isInfoError={isValidSubscriberInfoError}
          balance={validSubscriberBalance}
          isBalanceLoading={isValidSubscriberBalanceLoading}
          isBalanceError={isValidSubscriberBalanceError}
          label='Правильный номер'
          msisdn={validMsisdn}
          onChange={setValidMsisdn}
        />
      </Content>
      <Footer>
        <ButtonItem onClick={clearSubscribersData}>Очистить</ButtonItem>
        <ButtonItem
          onClick={handleFetchSubscribersData}
          disabled={!isSearchButtonEnabled}
          type='primary'
        >
          Поиск платежей
        </ButtonItem>
      </Footer>
    </Wrapper>
  )
}

export default Subscribers

const Wrapper = styled.div`
  position: relative;
  background: #fff;
`

const Content = styled.div`
  display: flex;
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
  border-top: 1px solid rgb(240, 240, 240);
`

const ButtonItem = styled(Button)`
  :not(:last-of-type) {
    margin-right: 10px;
  }
`
