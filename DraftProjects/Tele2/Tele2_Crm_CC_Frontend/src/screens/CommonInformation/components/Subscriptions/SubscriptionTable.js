/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import styled from 'styled-components'
import { Table, Switch, Tag, notification } from 'antd'
import PropTypes from 'prop-types'
import PopoverSubscriptions from 'containers/PopoverSubscriptions'

const { Column } = Table
const localeEmptyText = { emptyText: 'У абонента нет активных подписок' }

const renderColumnActiveTag = () => <Tag color='green'>активная</Tag>

const formatIsoDate = value => (value ? moment(value).format('DD.MM.YYYY HH:mm') : '')

const SubscriptionTable = props => {
  const { subscription, personalAccount, onUnsubscribe, location, handlingId, isUnsubscribeLoading } = props

  const renderPopConfirm = (value, record) => (
    <SubscriptionWrapper>
      <PopoverSubscriptions title='Отключить подписку?' confirm={reason => confirm(record, reason)}>
        <Switch
          loading={false}
          className='switch'
          defaultChecked
          checked
          disabled={isUnsubscribeLoading || !handlingId}
        />
      </PopoverSubscriptions>
      <SubscriptionName to={{ pathname: '/subscriptions', search: location.search }}>{value}</SubscriptionName>
    </SubscriptionWrapper>
  )

  const confirm = (record, reason) => {
    if (record) {
      const subscriptions = []
      subscriptions[0] = {
        SubscriptionId: record.Id,
        SubscriptionName: record.Name,
        ProviderName: record.ProviderName,
        ServiceNumber: record.ServiceNumber,
        ReasonId: reason,
        SubscriptionTypeId: record.SubscriptionTypeId,
        SpaceSubscriptionId: record.SpaceSubscriptionId,
        TransitServiceId: record.TransitServiceId
      }

      const req = {
        Msisdn: personalAccount.Msisdn,
        Subscriptions: subscriptions,
        BranchId: personalAccount.BillingBranch,
        HandlingId: handlingId
      }
      onUnsubscribe(req)
    } else {
      notification.open({
        type: 'error',
        message: 'Отключение подписок',
        description: 'Невозможно отключить подписку, обратитесь к администратору'
      })
    }
  }

  return (
    <Fragment>
      <SubscriptionGrid locale={localeEmptyText} rowKey='Key' dataSource={subscription} pagination={false}>
        <Column
          dataIndex='Name'
          title='Название подписки'
          width='150px'
          render={(value, record) => renderPopConfirm(value, record)}
        />
        <Column dataIndex='Status' title='Статус' width='150px' render={renderColumnActiveTag} />
        <Column dataIndex='SubscriptionStartTime' title='Дата подключения' render={formatIsoDate} width='150px' />
        <Column dataIndex='PaymentCost' title={'Абонентская плата, ' + String.fromCharCode(8381)} width='150px' />
        <Column dataIndex='TotalPayment' title={'За всё время, ' + String.fromCharCode(8381)} width='150px' />
      </SubscriptionGrid>
    </Fragment>
  )
}

export default SubscriptionTable

SubscriptionTable.propTypes = {
  subscription: PropTypes.array,
  personalAccount: PropTypes.object,
  onUnsubscribe: PropTypes.func,
  location: PropTypes.object,
  handlingId: PropTypes.number,
  isUnsubscribeLoading: PropTypes.bool
}

const SubscriptionGrid = styled(Table)`
  font-size: 14px;
`
const SubscriptionName = styled(NavLink)`
  color: rgba(0, 0, 0, 0.65);
  word-wrap: break-word;
  cursor: pointer;
  &:hover {
    color: rgba(0, 0, 0, 0.65);
  }
`
const SubscriptionWrapper = styled.div`
  display: flex;
`
