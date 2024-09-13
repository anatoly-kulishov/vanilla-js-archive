/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, useState } from 'react'
import { get } from 'lodash'
import { Button, Col, Row } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import TemporaryPay from './TemporaryPay'
import PromisePay from './PromisePay'
import FinanceBlock from './FinanceBlock'
import TrustCredit from './TrustCredit'
import ECommerce from './ECommerce'
import DetailsModal from './DetailsModal'
import CreditLimitHistoryModal from './CreditLimitHistoryModal'
import { checkRight } from 'utils/helpers'
import Content from '../ContentBalance'
import { cardModes } from '../../../constants/cardModes'
import { getTypeCard, replaceSumToText } from 'webseller/helpers'
import { CLIENT_TYPE_NAMES } from 'webseller/constants/clientCategory'

const BalancesTable = props => {
  const {
    personalAccount: {
      PersonalAccountId: accountNumber,
      OwnerClientId: parentClientId,
      Msisdn: msisdn,
      BillingBranchId: branchId,
      ClientCategory: clientCategory,
      ClientId: clientId
    },
    balance: {
      balance,
      isBalanceLoading,
      balanceError,
      isBalanceError,
      trustCreditInfo,
      isTrustCreditInfoLoading,
      isTrustCreditInfoError,
      trustCreditInfoMessage,
      trustCreditHistory,
      isTrustCreditHistoryLoading
    },
    getBalance,
    temporaryPay,
    getTrustCreditHistory,
    getTemporaryPayNew,
    addPayment,
    user,
    handlingId,
    cardMode,
    mnpMarkers
  } = props
  const { isASSeller } = user

  const [isDetailsToggled, handleDetailsModalOpen] = useState(false)
  const [isCreditLimitHistoryModalVisible, onCreditLimitHistoryModalOpen] = useState(false)

  const isTemporaryPayNewAvailible =
    !isASSeller &&
    handlingId &&
    (checkRight(user, 'CC:TemporaryPaymentNew') || checkRight(user, 'CC:TemporaryPaymentWithRestriction'))

  const handleOpenTrustCreditModal = isCreditLimitHistoryModalVisible => {
    onCreditLimitHistoryModalOpen(isCreditLimitHistoryModalVisible)
    getTrustCreditHistory({ msisdn })
  }

  const handleGetBalance = () => {
    getBalance({
      msisdn,
      personalAccountId: accountNumber,
      branchId,
      clientCategory,
      clientId,
      parentClientId,
      payPackPersonalAccountId: mnpMarkers?.PayPackPersonalAccount
    })
  }

  const isError = !isBalanceLoading && balanceError
  const isAllowToRender = !isBalanceLoading && !isBalanceError && balance

  if (isError) {
    return <Wrapper>Ошибка загрузки баланса абонента.</Wrapper>
  } else if (isAllowToRender) {
    const balance105 = balance?.subscriber?.balance105
    const subscriberBalances = balance?.subscriber?.subscriberBalances
    const promisePay = balance?.subscriber?.promisePay
    const quota = balance?.subscriber?.quota
    const pseudoQuota = balance?.subscriber?.pseudoQuota
    const mounthly = balance?.subscriber?.mounthly
    const ecommerce = balance?.subscriber?.ecommerce
    const isFinLock = get(trustCreditInfo, 'isFinBlock', false) && trustCreditInfo
    const isB2c = clientCategory === 'B2C'
    const isB2b = clientCategory === 'B2B'

    const { isAnonymousCard, isSubscriberFirstLevelCard, isNonSubscriberCard, isb2b } = getTypeCard(isASSeller)

    const clientTypeName = get(props.personalAccount, 'SubscriberFullInfo.SubscriberClientInfo.ClientTypeName', null)

    const isSmallB2bBusiness = isb2b && isSubscriberFirstLevelCard && clientTypeName === CLIENT_TYPE_NAMES.SMALL_BUSINESS
    const isNotB2bFirstLevelCard = !(isb2b && isSubscriberFirstLevelCard)
    const isLeon = cardMode === cardModes.leon

    return (
      <Wrapper>
        <DetailsModal
          isDetailsToggled={isDetailsToggled}
          handleDetailsModalOpen={() => handleDetailsModalOpen(!isDetailsToggled)}
        />
        <CreditLimitHistoryModal
          isCreditLimitHistoryModalVisible={isCreditLimitHistoryModalVisible}
          onCancel={() => onCreditLimitHistoryModalOpen(!isCreditLimitHistoryModalVisible)}
          history={trustCreditHistory}
          isLoading={isTrustCreditHistoryLoading}
        />
        <Row gutter={12}>
          <Col span={8}>
            {subscriberBalances &&
              subscriberBalances.mainClientBalances &&
              subscriberBalances.mainClientBalances.map((row, index) => (
                <StyledRow key={index} span={24}>
                  <Col span={14}>{row.balanceName}</Col>
                  <BalanceAmount span={10}>
                    {isAnonymousCard
                      ? replaceSumToText(row.balanceAmount)
                      : row.balanceAmount.toFixed(2)}
                  </BalanceAmount>
                </StyledRow>
              ))}
            {isASSeller && !isSmallB2bBusiness && (
              <StyledRow span={24}>
                <Col span={14}>
                  <b>Сумма</b>
                </Col>
                <BalanceAmount span={10}>
                  <b>
                    {subscriberBalances && isAnonymousCard
                      ? replaceSumToText(subscriberBalances?.sum)
                      : subscriberBalances?.sum?.toFixed(2)}
                  </b>
                </BalanceAmount>
              </StyledRow>
            )}
            {!isASSeller && (
              <StyledRow span={24}>
                <Col span={14}>
                  <b>Сумма</b>
                </Col>
                <BalanceAmount span={10}>
                  <b>
                    {subscriberBalances && isAnonymousCard
                      ? replaceSumToText(subscriberBalances?.sum)
                      : subscriberBalances?.sum?.toFixed(2)}
                  </b>
                </BalanceAmount>
              </StyledRow>
            )}
            {!isLeon && (
              <StyledRow span={24}>
                <Col span={14}>*105#</Col>
                <BalanceAmount span={10}>
                  {isAnonymousCard ? replaceSumToText(balance105) : balance105}
                </BalanceAmount>
              </StyledRow>
            )}
          </Col>

          {!isAnonymousCard && (
            <Col span={8}>
              {isFinLock && (
                <FinLockCol span={24}>
                  <Col span={14}>Фин. блокировка</Col>
                  <BalanceAmount span={6}>{trustCreditInfo.debt}</BalanceAmount>
                  <BalanceAmount span={4}>
                    <FinanceBlock trustCreditInfo={trustCreditInfo} />
                  </BalanceAmount>
                </FinLockCol>
              )}
              {isASSeller && isNotB2bFirstLevelCard && (
                <StyledRow span={24}>
                  <Col span={14}>Обещанный платеж</Col>
                  <BalanceAmount span={6}>
                    <PromisePay promisePay={promisePay} />
                  </BalanceAmount>
                  <BalanceAmount span={4} />
                </StyledRow>
              )}
              {!isASSeller && !isLeon && (
                <StyledRow span={24}>
                  <Col span={14}>Обещанный платеж</Col>
                  <BalanceAmount span={6}>
                    <PromisePay promisePay={promisePay} />
                  </BalanceAmount>
                  <BalanceAmount span={4} />
                </StyledRow>
              )}
              {isB2c && !isLeon && isTemporaryPayNewAvailible && (
                <StyledRow span={24}>
                  <Col span={14}>Временный платеж</Col>
                  <BalanceAmount span={4}>
                    <TemporaryPay {...temporaryPay} addPayment={addPayment} getTemporaryPayNew={getTemporaryPayNew} />
                  </BalanceAmount>
                  <BalanceAmount span={6} />
                </StyledRow>
              )}
              {isB2b && (
                <Fragment>
                  <StyledRow span={24}>
                    <Col span={14}>
                      {quota !== null
                        ? 'Квота (остаток/сумма)'
                        : pseudoQuota !== null
                          ? 'Псевдоквота (остаток/сумма)'
                          : 'Квота/Псевдоквота'}
                    </Col>
                    <BalanceAmount span={10}>
                      {quota !== null && quota !== undefined
                        ? `${quota?.avaiableQouta} / ${quota?.initialQuota}`
                        : pseudoQuota !== null && pseudoQuota !== undefined
                          ? `${pseudoQuota?.remain} / ${pseudoQuota?.size}`
                          : 'отсутствует'}
                    </BalanceAmount>
                  </StyledRow>
                  {quota && (
                    <StyledRow span={24}>
                      <Col span={14}>Фильтр</Col>
                      <BalanceAmount span={10}>{quota?.quotaFilter}</BalanceAmount>
                    </StyledRow>
                  )}
                  {pseudoQuota && (
                    <Fragment>
                      <StyledRow span={24}>
                        <Col span={14}>Порог блокировки 1</Col>
                        <BalanceAmount span={10}>{pseudoQuota?.levelOne}</BalanceAmount>
                      </StyledRow>
                      <StyledRow span={24}>
                        <Col span={14}>Порог блокировки 2</Col>
                        <BalanceAmount span={10}>{pseudoQuota?.levelTwo}</BalanceAmount>
                      </StyledRow>
                      <StyledRow span={24}>
                        <Col span={14}>Блокировка</Col>
                        <BalanceAmount span={10}>{pseudoQuota?.blockFlag}</BalanceAmount>
                      </StyledRow>
                    </Fragment>
                  )}
                </Fragment>
              )}
            </Col>
          )}

          {!isNonSubscriberCard && !isAnonymousCard && (
            <Col span={8}>
              {(isNotB2bFirstLevelCard && handlingId && isNotB2bFirstLevelCard) && (
                <StyledRow span={24}>
                  <Col span={14}>На доверии</Col>
                  <BalanceAmount span={10}>
                    <TrustCredit
                      trustCreditInfo={trustCreditInfo}
                      isTrustCreditInfoLoading={isTrustCreditInfoLoading}
                      isTrustCreditInfoError={isTrustCreditInfoError}
                      trustCreditInfoMessage={trustCreditInfoMessage}
                      handleDetailsModalOpen={handleDetailsModalOpen}
                      onCreditLimitHistoryModalOpen={handleOpenTrustCreditModal}
                    />
                  </BalanceAmount>
                </StyledRow>
              )}
              {isASSeller && !isSubscriberFirstLevelCard && (
                <StyledRow span={24}>
                  <Col span={14}>Кредитный лимит</Col>
                  <BalanceAmount span={10}>{subscriberBalances && subscriberBalances.creditLimit}</BalanceAmount>
                </StyledRow>
              )}
              <StyledRow span={24}>
                <Col span={14}>Контентный</Col>
                <BalanceAmount span={10}>
                  <Content isClient={false} />
                </BalanceAmount>
              </StyledRow>
              <StyledRow span={24}>
                <Col span={14}>E-Commerce</Col>
                <BalanceAmount span={10}>
                  <ECommerce ecommerce={ecommerce} />
                </BalanceAmount>
              </StyledRow>
              {isB2b && (
                <StyledRow span={24}>
                  <Col span={14}>Ежемесячные услуги оплачиваются</Col>
                  <BalanceAmount span={10}>{mounthly}</BalanceAmount>
                </StyledRow>
              )}
            </Col>
          )}
        </Row>
      </Wrapper>
    )
  } else if (isASSeller && !isAllowToRender) {
    return (
      <Wrapper>
        <Row>
          <FullWidthCol >
            <InfoBlock>
              Просмотр финансов абонента или клиента доступен только после подтверждения действия
            </InfoBlock>
          </FullWidthCol>
        </Row>
        <Row justify='center'>
          <FullWidthCol span={4}>
            <Button type='primary' onClick={handleGetBalance}>Просмотреть</Button>
          </FullWidthCol>
        </Row>
      </Wrapper>
    )
  } else {
    return <BalancesSkeleton />
  }
}

export default BalancesTable

BalancesTable.propTypes = {
  isBalanceLoading: PropTypes.bool,
  isTemporaryPayNewAvailible: PropTypes.bool,
  isTrustCreditInfoLoading: PropTypes.bool,
  isTrustCreditInfoError: PropTypes.bool,
  handlingId: PropTypes.number,
  balanceError: PropTypes.string,
  trustCreditInfo: PropTypes.string,
  trustCreditInfoMessage: PropTypes.string,
  personalAccount: PropTypes.object,
  balance: PropTypes.object,
  contentBalanceState: PropTypes.object,
  temporaryPay: PropTypes.object,
  user: PropTypes.object,
  onAcceptTemporaryPay: PropTypes.func,
  onCreditLimitHistoryModalOpen: PropTypes.func,
  handleDetailsModalOpen: PropTypes.func,
  getTrustCreditHistory: PropTypes.func,
  getTemporaryPayNew: PropTypes.func,
  addPayment: PropTypes.func,
  addContentBalance: PropTypes.func,
  closeContentBalance: PropTypes.func
}

const Wrapper = styled.div`
  padding: 17px 22px 17px 13px;
`

const BalanceAmount = styled(Col)`
  text-align: left;
  padding: 0 6px;
`
const StyledRow = styled(Row)`
  padding: 0 12px;
  margin-bottom: 5px;
`
const FinLockCol = styled(Col)`
  margin-bottom: 5px;
  color: red;
`
const FullWidthCol = styled(Col)`
  width: 100%;
`
const InfoBlock = styled.div`
  padding: 16px;
  margin-bottom: 15px;
  background-color: #F7F8FB;
  color: #65707B;
  border-radius: 12px;
`
const BalancesSkeleton = styled.div`
  height: 135px;
`
