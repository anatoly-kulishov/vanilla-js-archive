import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'
import { Alert, Tag, Spin } from 'antd'

import LoadingSpinner from 'components/LoadingSpinner'
import NameSwitch from './NameSwitch'

export default class DetailsContent extends PureComponent {
  static propTypes = {
    trustCreditInfo: PropTypes.object,
    trustCreditInfoMessage: PropTypes.string,
    deactivateCreditInfo: PropTypes.func,
    activateCreditInfo: PropTypes.func,
    personalAccount: PropTypes.object,
    isTrustCreditAction: PropTypes.bool,
    handlingId: PropTypes.number
  }

  state = {
    isChecked: true,
    isDerived: true
  }

  static getDerivedStateFromProps = (props, state) => {
    const { trustCreditInfo, isTrustCreditInfoLoading } = props
    const { isDerived } = state
    if (isDerived && trustCreditInfo) {
      return {
        isChecked: trustCreditInfo.serviceStatusId === 1,
        isDerived: !isTrustCreditInfoLoading
      }
    }
    return null
  }

  getFormatDate = (date) => date
    ? moment(date.fixationDate).format('DD MMMM YYYY')
    : '-'

  getCreditLimit = () => {
    const { trustCreditInfo } = this.props

    return !this.isServiceActive()
      ? trustCreditInfo.balanceLevelCrm
      : trustCreditInfo.balanceLevel
  }

  isServiceActive = () => {
    const { trustCreditInfo } = this.props
    return trustCreditInfo.serviceStatusId === 1
  }

  onConfirm = () => {
    const {
      deactivateCreditInfo,
      activateCreditInfo,
      personalAccount: {
        SubscriberFullInfo,
        ClientId,
        Msisdn,
        BillingBranchId,
        SubscriberId
      },
      handlingId
    } = this.props
    const { isChecked } = this.state
    const {
      SubscriberTypeId,
      SubscriberStatusId
    } = SubscriberFullInfo?.SubscriberInfo ?? {}

    const parameters = {
      clientId: ClientId,
      msisdn: Msisdn,
      subscriberBranchId: BillingBranchId,
      subscriberId: SubscriberId,
      subscriberStatusId: SubscriberStatusId,
      subscriberTypeId: SubscriberTypeId,
      billingBranchId: BillingBranchId,
      handlingId
    }

    isChecked
      ? deactivateCreditInfo(parameters)
      : activateCreditInfo(parameters)
  }

  render () {
    const { trustCreditInfo, trustCreditInfoMessage, isTrustCreditAction } = this.props
    const { isChecked } = this.state

    return trustCreditInfo
      ? <Fragment>
        <TableHeader>
          <MainHeaderCell>Название операции</MainHeaderCell>
          <HeaderCell>Статус</HeaderCell>
          <HeaderCell>Дата операции</HeaderCell>
        </TableHeader>
        <TableRow>
          <FirstCell>
            <NameSwitch
              onConfirm={this.onConfirm}
              isChecked={isChecked}
              disabled={!isTrustCreditAction}
            />
          </FirstCell>
          <TitelHeaderCell>Подключение программы "Кредит доверия"</TitelHeaderCell>
          <HeaderCell>
            <Tag color={this.isServiceActive() ? 'green' : 'red'}>
              {trustCreditInfo.serviceStatusName}
            </Tag>
          </HeaderCell>
          <HeaderCell>{this.getFormatDate(trustCreditInfo.switchOnDate)}</HeaderCell>
        </TableRow>
        <TableRow>
          <FirstCell />
          <TitelHeaderCell>Фиксирование лимита</TitelHeaderCell>
          <HeaderCell>
            <Tag color={trustCreditInfo.isFixedBalance ? 'green' : 'red'}>
              {trustCreditInfo.isFixedBalance ? 'активна' : 'неактивна'}
            </Tag>
          </HeaderCell>
          <HeaderCell>{this.getFormatDate(trustCreditInfo.fixationDate)}</HeaderCell>
        </TableRow>
        <StyledAlert
          message={this.isServiceActive() ? trustCreditInfo.creditLimitCahngeTechReason : trustCreditInfoMessage}
          type={this.isServiceActive() ? 'info' : 'error'} />
        <DetailsWrapper>
          <Details>
            <Header>Кредитный лимит</Header>
            <Amount>{`${this.getCreditLimit()} ${String.fromCharCode(8381)}`}</Amount>
          </Details>
          <Details>
            <Header>Фиксированный кредитный лимит</Header>
            <Amount>{`${trustCreditInfo.fixedBalanceLevel} ${String.fromCharCode(8381)}`}</Amount>
          </Details>
          {/* Будет необходимо после доработки */}
          {/* <Details>
            <Header>Остаток кредитного лимита</Header>
            <Amount>0,00 P</Amount>
          </Details> */}
          <Details>
            <Header>Кредитная категория</Header>
            <Amount>{trustCreditInfo.clientCategoryDescription}</Amount>
          </Details>
        </DetailsWrapper>
      </Fragment>
      : <LoadingWrapper>
        <Spin spinning indicator={<LoadingSpinner spin />} />
      </LoadingWrapper>
  }
}

const StyledAlert = styled(Alert)`
  margin: 15px;
`
const DetailsWrapper = styled.div`
  border-top: 1px solid #e8e8e8;
  padding-bottom: 5px;
`
const DetailsContainer = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 20px;
  color: black;
`
const TableHeader = styled.div`
  background: #ecf9ff;
  display: flex;
  padding: 10px 20px 10px;
`
const HeaderCell = styled.div`
  width: 20%;
  color: #8E97A0;
`
const FirstCell = styled.div`
  width: 10%;
  color: #8E97A0;
`
const MainHeaderCell = styled.div`
  width: 50%;
  color: #8E97A0;
`
const TitelHeaderCell = styled.div`
  width: 40%;
  text-align: left;
`
const TableRow = styled.div`
  display: flex;
  padding: 10px 20px 10px;
`
const Amount = styled.div`
  font-size: 14px;
`
const Header = styled.div`
  font-size: 14px;
`
const Details = styled(DetailsContainer)`
  padding: 5px 20px;
`
const LoadingWrapper = styled.div`
  height: 50px;
  text-align: center;
  padding: 20px;
`
