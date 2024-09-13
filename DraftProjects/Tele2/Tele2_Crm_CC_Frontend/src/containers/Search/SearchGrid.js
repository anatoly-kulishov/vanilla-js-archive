/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { Spin, notification, Table, Tooltip, Button } from 'antd'
import { LoadingOutlined, FormOutlined, AlignLeftOutlined } from '@ant-design/icons'
import { get } from 'lodash'
import PropTypes from 'prop-types'

import CurrentOwnerCard from './components/SubscriberCard'

import { numSorter, stringSorter } from 'utils/helpers'
import open from 'utils/helpers/windowOpener'
import { SUBS_PER_PAGE_COUNT } from 'constants/subscriberList'
import fromEnv from 'config/fromEnv'

export default class SearchGrid extends PureComponent {
  static propTypes = {
    validateChannel: PropTypes.func,
    getSubscriberList: PropTypes.func,
    manualSearchState: PropTypes.object,
    changeAbonentsModalVisibility: PropTypes.func,
    fetchSubscriberStatuses: PropTypes.func,
    redirectPaymentsUrl: PropTypes.func,
    isB2b: PropTypes.bool,
    isUpdateIdentity: PropTypes.bool,
    handleUpdatingIdentificationLevel: PropTypes.func
  }

  handleOpenWindow = item => {
    const { validateChannel, isUpdateIdentity } = this.props
    const channel = validateChannel()
    const { Msisdn, BillingBranchId, ClientId } = item

    if (channel && !isUpdateIdentity) {
      if (Msisdn) {
        open(`${fromEnv('REACT_APP_SEARCH')}/main/balance?msisdn=${Msisdn}&serviceChannelId=${channel}`)
      } else if (BillingBranchId && ClientId) {
        open(
          `${fromEnv(
            'REACT_APP_SEARCH'
          )}/main/balance?branchId=${BillingBranchId}&clientId=${ClientId}&serviceChannelId=${channel}`
        )
      }
    } else {
      notification.error({
        message: 'Поиск',
        description: isUpdateIdentity
          ? 'Открытие карточки абонента или клиента недоступно'
          : `Для осуществления поиска необходимо выбрать канал обращения`
      })
    }
  }

  handleCreatingDocuments = (accountNumber, branchId) => {
    const { redirectPaymentsUrl } = this.props
    redirectPaymentsUrl({ accountNumber, branchId, clientCategory: 'B2B' })
  }

  handleListAbonentsModalOpen = (clientId, branchId) => {
    const { fetchSubscriberStatuses, changeAbonentsModalVisibility, getSubscriberList } = this.props

    getSubscriberList({
      clientId,
      branchId,
      firstNumber: 1,
      subscribersCount: SUBS_PER_PAGE_COUNT
    })
    fetchSubscriberStatuses()
    changeAbonentsModalVisibility()
  }

  render () {
    const { manualSearchState, isB2b, isUpdateIdentity, handleUpdatingIdentificationLevel } = this.props
    const { isManualSearchGridLoading } = manualSearchState
    let dataSource = get(manualSearchState, 'manualSearchGrid', [])
    // fix for not object[] but string[] cases
    if (dataSource && dataSource.length > 0 && typeof dataSource[0] === 'string') {
      dataSource = []
    }
    return (
      <Spin spinning={isManualSearchGridLoading} indicator={<LoadingIcon spin />}>
        <StyledTable rowKey='Key' dataSource={dataSource} pagination={false} showSorterTooltip={false}>
          <Table.Column
            dataIndex='SubcriberName'
            title='Имя абонента или клиента'
            width='35%'
            render={(_value, record) => <CurrentOwnerCard item={record} handleOpenWindow={this.handleOpenWindow} />}
            sorter={(cur, next) =>
              stringSorter(cur.SubcriberName || cur.ClientName, next.SubcriberName || next.ClientName)
            }
          />
          <Table.Column
            dataIndex='Account'
            title='Лицевой счет'
            sorter={(cur, next) => numSorter(cur.Account, next.Account)}
          />
          <Table.Column
            dataIndex='ClientStatus'
            title='Статус'
            sorter={(cur, next) => stringSorter(cur.ClientStatus, next.ClientStatus)}
          />
          <Table.Column
            dataIndex='ClientType'
            title='Тип клиента'
            sorter={(cur, next) => stringSorter(cur.ClientType, next.ClientType)}
          />
          {isB2b && (
            <Table.Column
              width='5%'
              render={(_value, record) => (
                <Tooltip title='Предоставить отчетные документы'>
                  <StyledFormIcon
                    onClick={() => this.handleCreatingDocuments(record.Account, record.BillingBranchId)}
                  />
                </Tooltip>
              )}
            />
          )}
          {isB2b && (
            <Table.Column
              width='5%'
              render={(_value, record) => (
                <Tooltip title='Список абонентов'>
                  <StyledAlignLeftIcon
                    onClick={() => this.handleListAbonentsModalOpen(record.ClientId, record.BillingBranchId)}
                  />
                </Tooltip>
              )}
            />
          )}
          {isUpdateIdentity && (
            <Table.Column
              width='5%'
              render={(_value, record) => {
                const params = {
                  ClientId: record?.ClientId,
                  ClientName: record?.ClientName,
                  BranchId: record?.BillingBranchId,
                  PersonalAccount: +record.Account
                }
                return (
                  <Button onClick={() => handleUpdatingIdentificationLevel(false, params)}>{`Привязать ${
                    isB2b ? 'клиента' : 'абонента'
                  }`}</Button>
                )
              }}
            />
          )}
        </StyledTable>
      </Spin>
    )
  }
}

const LoadingIcon = styled(LoadingOutlined)`
  font-size: 24px;
`
const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    padding: 12px 5px;
  }
  .ant-table-tbody > tr > td {
    padding: 0px 5px;
  }
  div.ant-table-column-sorters {
    padding: 0;
  }
`
const StyledAlignLeftIcon = styled(AlignLeftOutlined)`
  font-size: 20px;
  margin-right: 10px;
`
const StyledFormIcon = styled(FormOutlined)`
  font-size: 20px;
  margin-right: 10px;
`
