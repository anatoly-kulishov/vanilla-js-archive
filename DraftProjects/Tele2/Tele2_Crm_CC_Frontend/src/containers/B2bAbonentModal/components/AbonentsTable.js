import React, { useState } from 'react'
import { Table, Pagination, Spin } from 'antd'
import { LoadingOutlined, CrownOutlined } from '@ant-design/icons'
import { get } from 'lodash'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'

import { SUBS_PER_PAGE_COUNT } from 'constants/subscriberList'
import { DEFAULT_STATUS_FILTER_VALUE } from '../constants'
import AbonentsFilter from './AbonentsFilter'

const { Column } = Table

const AbonentsTable = ({
  subscriberListState,
  getSubscriberList,
  personalAccount,
  pageNumber,
  setPageNumber
}) => {
  AbonentsTable.propTypes = {
    subscriberListState: PropTypes.object,
    getSubscriberList: PropTypes.func,
    personalAccount: PropTypes.object,
    pageNumber: PropTypes.number,
    setPageNumber: PropTypes.func
  }

  let subscribers = get(subscriberListState, 'subscriberList.SubscriberInfo', [])
  const subscribersCount = get(subscriberListState, 'subscriberList.PaginationParams.TotalSubscribersCount', null)

  const [state, setState] = useState({
    status: DEFAULT_STATUS_FILTER_VALUE,
    substatus: DEFAULT_STATUS_FILTER_VALUE,
    numberPhone: null
  })

  const handlePageNumber = pageNumber => {
    const { BillingBranchId, ClientId } = personalAccount
    setPageNumber(pageNumber)
    const firstNumber = (pageNumber - 1) * SUBS_PER_PAGE_COUNT + 1
    getSubscriberList({
      branchId: BillingBranchId,
      clientId: ClientId,
      firstNumber,
      subscribersCount: SUBS_PER_PAGE_COUNT
    })
  }

  const isFieldChangeHandle = (elem, name) => {
    setState({ ...state, [name]: elem })
  }

  const onClickRemoveSearch = () => {
    setState({ ...state, numberPhone: null })
  }

  const isButtonCleanClickHandle = () => {
    setState({
      ...state,
      numberPhone: null,
      status: DEFAULT_STATUS_FILTER_VALUE,
      substatus: DEFAULT_STATUS_FILTER_VALUE
    })
  }

  const onPasteHandler = value => {
    setState({ ...state, numberPhone: value })
  }

  const { isSubscriberListLoading } = subscriberListState

  if (state.numberPhone !== null && state.numberPhone.length > 2) {
    subscribers = subscribers.filter(item => item.Msisdn && item.Msisdn.startsWith(state.numberPhone))
  }
  if (state.status !== DEFAULT_STATUS_FILTER_VALUE) {
    subscribers = subscribers.filter(item => item.FZ533Profile.Status533 === state.status)
  }
  if (state.substatus !== DEFAULT_STATUS_FILTER_VALUE) {
    subscribers = subscribers.filter(item => item.FZ533Profile.SubStatus533 === state.substatus)
  }

  return (
    <div>
      <AbonentsFilter
        numberPhone={state.numberPhone}
        status={state.status}
        substatus={state.substatus}
        isFieldChangeHandle={isFieldChangeHandle}
        isButtonCleanClickHandle={isButtonCleanClickHandle}
        onPaste={onPasteHandler}
        onClickRemove={onClickRemoveSearch}
        subscriberListState={subscriberListState}
        isActTabActive
      />
      <Spin spinning={isSubscriberListLoading} indicator={<LoadingIcon spin />}>
        <StyledTable
          dataSource={subscribers}
          rowClassName={(record) => {
            const { Msisdn, FZ533Profile: { IsInvalidStatus533, Status533, SubStatus533 } } = record
            if (!Msisdn && !Status533 && !SubStatus533) {
              return 'hidden'
            } else if (IsInvalidStatus533) {
              return 'highlight-red'
            }
          }}
          pagination={false}
        >
          <Column
            dataIndex='ClientSubscriberRole'
            width='1%'
            render={(__, record) => record.ClientSubscriberRole && <CrownIcon />}
            onCell={() => ({ className: 'icon-padding' })}
          />
          <Column dataIndex='Msisdn' title='Номер телефона' width='20%' />
          <Column title='Статус' dataIndex={['FZ533Profile', 'Status533']} width='25%' />
          <Column title='Подстатус' dataIndex={['FZ533Profile', 'SubStatus533']} width='25%' />
          <Column title='Дата изменения' dataIndex={['FZ533Profile', 'StatusDate533']} width='25%' render={value => value ? moment(value).local().format('DD.MM.YYYY HH:mm') : ''} />
        </StyledTable>
        <PaginationWrapper>
          <StyledPagination
            hideOnSinglePage
            total={subscribersCount}
            pageSize={SUBS_PER_PAGE_COUNT}
            current={pageNumber}
            onChange={handlePageNumber}
          />
        </PaginationWrapper>
      </Spin>
    </div>
  )
}

export default AbonentsTable

const StyledTable = styled(Table)`
  .ant-table-row.highlight.ant-table-row-level-0 {
    background: #fffbe6;
  }
  .ant-table-row.ant-table-row-level-0.highlight-red {
    background: rgba(245, 34, 45, 0.15);
  }
  .ant-table-row.ant-table-row-level-0.hidden {
    display: none;
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
const PaginationWrapper = styled.div`
  display: flex;
  flex-flow: row-reverse;
`
const StyledPagination = styled(Pagination)`
  padding: 16px;
`
const CrownIcon = styled(CrownOutlined)`
  font-size: 20px;
`
const LoadingIcon = styled(LoadingOutlined)`
  font-size: 24;
`
