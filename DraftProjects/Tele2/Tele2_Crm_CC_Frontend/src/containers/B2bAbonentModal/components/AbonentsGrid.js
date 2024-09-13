/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import { Table, Pagination, Spin } from 'antd'
import { LoadingOutlined, CrownOutlined } from '@ant-design/icons'
import { get } from 'lodash'
import PropTypes from 'prop-types'
import moment from 'moment'
import open from 'utils/helpers/windowOpener'
import AbonentsFilter from './AbonentsFilter'

import { SUBS_PER_PAGE_COUNT } from 'constants/subscriberList'
import { DEFAULT_STATUS_FILTER_VALUE } from '../constants'
import fromEnv from 'config/fromEnv'

const { Column } = Table

class AbonentsGrid extends Component {
  propTypes = {
    subscriberListState: PropTypes.object,
    personalAccount: PropTypes.object,
    getSubscriberList: PropTypes.func,
    location: PropTypes.object,
    pageNumber: PropTypes.number,
    setPageNumber: PropTypes.func
  }
  state = {
    numberPhone: null,
    status: DEFAULT_STATUS_FILTER_VALUE
  }

  isFieldChangeHandle = (elem, name) => {
    this.setState({ [name]: elem })
  }

  onPasteHandler = value => {
    this.setState({ numberPhone: value })
  }

  onClickRemoveSearch = () => {
    this.setState({ numberPhone: null })
  }

  isButtonCleanClickHandle = () => {
    this.setState({
      ...this.state,
      numberPhone: null,
      status: DEFAULT_STATUS_FILTER_VALUE
    })
  }

  handlePageNumber = pageNumber => {
    const {
      getSubscriberList,
      personalAccount: { BillingBranchId, ClientId },
      setPageNumber
    } = this.props
    setPageNumber(pageNumber)
    const firstNumber = (pageNumber - 1) * SUBS_PER_PAGE_COUNT + 1
    getSubscriberList({
      branchId: BillingBranchId,
      clientId: ClientId,
      firstNumber,
      subscribersCount: SUBS_PER_PAGE_COUNT
    })
  }

  changeLocale = Msisdn => {
    const {
      location: { pathname, search, hash }
    } = this.props
    const searchParams = new URLSearchParams(search + hash)
    const msisdn = searchParams.get('msisdn')

    if ((msisdn || Msisdn) && !searchParams.get('conversationId')) {
      pathname.includes('/empty/manual-search')
        ? open(`${fromEnv('REACT_APP_SEARCH')}/main/balance?msisdn=${msisdn || Msisdn}`)
        : open(`${pathname}?msisdn=${Msisdn || msisdn}`, '_self')
    } else if (searchParams.get('clientId') && searchParams.get('branchId')) {
      searchParams.delete('clientId')
      searchParams.delete('branchId')
      msisdn && searchParams.delete('msisdn')

      searchParams.append('msisdn', Msisdn)
      open(`${pathname}?${searchParams.toString()}`, '_self')
    }
  }

  render () {
    const { subscriberListState, pageNumber } = this.props
    const { isSubscriberListLoading } = subscriberListState

    const { numberPhone, status } = this.state

    let subscribers = get(subscriberListState, 'subscriberList.SubscriberInfo', [])
    const subscribersCount = get(subscriberListState, 'subscriberList.PaginationParams.TotalSubscribersCount', null)

    if (numberPhone !== null && numberPhone.length > 2) {
      subscribers = subscribers.filter(item => item.Msisdn && item.Msisdn.startsWith(numberPhone))
    }
    if (status !== DEFAULT_STATUS_FILTER_VALUE) {
      subscribers = subscribers.filter(item => item.SubscriberStatus === status)
    }

    return (
      <div>
        <AbonentsFilter
          numberPhone={numberPhone}
          status={status}
          isFieldChangeHandle={this.isFieldChangeHandle}
          isButtonCleanClickHandle={this.isButtonCleanClickHandle}
          onPaste={this.onPasteHandler}
          onClickRemove={this.onClickRemoveSearch}
          subscriberListState={subscriberListState}
        />
        <Spin spinning={isSubscriberListLoading} indicator={<LoadingIcon spin />}>
          <AbonentsTable
            locale={{ emptyText: 'абоненты не найдены' }}
            rowKey='Key'
            dataSource={subscribers}
            pagination={false}
            onRow={record => ({
              onClick: () => this.changeLocale(record.Msisdn)
            })}
          >
            <Column
              dataIndex='ClientSubscriberRole'
              width='1%'
              render={(__, record) => record.ClientSubscriberRole && <CrownIcon />}
              onCell={() => ({ className: 'icon-padding' })}
            />
            <Column dataIndex='Msisdn' title='Номер телефона' width='15%' />
            <Column dataIndex='FullName' title='Ф.И.О.' width='25%' />
            <Column
              dataIndex='ActivationDate'
              title='Дата активации'
              width='20%'
              render={value => moment(value).local().format('DD.MM.YYYY HH:mm')}
            />
            <Column dataIndex='SubscriberStatus' title='Статус' width='15%' />
            <Column dataIndex='WebCareLevelAccessTypeId' title='Доступ к WebCare' width='20%' />
          </AbonentsTable>
        </Spin>
        <PaginationWrapper>
          <StyledPagination
            hideOnSinglePage
            total={subscribersCount}
            pageSize={SUBS_PER_PAGE_COUNT}
            current={pageNumber}
            onChange={this.handlePageNumber}
          />
        </PaginationWrapper>
      </div>
    )
  }
}

export default withRouter(AbonentsGrid)

const AbonentsTable = styled(Table)`
  .ant-table-row.highlight.ant-table-row-level-0 {
    background: #fffbe6;
  }
  .ant-table-row.ant-table-row-level-0.highlight-red {
    background: rgba(245, 34, 45, 0.15);
  }
  .ant-table-thead {
    th {
      word-break: break-word;
      padding: 12px;
      font-size: 12px;
    }
  }
  .ant-table-row.ant-table-row-level-0 {
    font-size: 13px;
    td {
      padding: 12px;
      cursor: pointer;
      word-break: break-word;
      &.icon-padding {
        padding-right: 0;
      }
    }
  }
  .ant-pagination.ant-table-pagination {
    margin: 16px;
  }
`

const LoadingIcon = styled(LoadingOutlined)`
  font-size: 24;
`

const CrownIcon = styled(CrownOutlined)`
  font-size: 20px;
`

const PaginationWrapper = styled.div`
  display: flex;
  flex-flow: row-reverse;
`

const StyledPagination = styled(Pagination)`
  padding: 16px;
`
