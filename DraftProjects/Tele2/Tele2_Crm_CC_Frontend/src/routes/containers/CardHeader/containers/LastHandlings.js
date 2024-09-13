/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Table, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { isoDateSorter } from 'utils/helpers'
import open from 'utils/helpers/windowOpener'
import fromEnv from 'config/fromEnv'

const Column = Table.Column

const mapStateToProps = state => ({
  ...state.internal.handlingState
})

const formatIsoDate = value => (value ? moment.utc(value).local().format('DD.MM.YYYY[\n]HH:mm') : '')

function LastHandlings ({ lastHandlings, isLastHandlingsLoading }) {
  return (
    <Wrapper>
      <Spin spinning={isLastHandlingsLoading} indicator={<LoadingIcon spin />}>
        <LastHandlingsTable
          rowKey='Key'
          dataSource={lastHandlings}
          scroll={{ y: 800 }} // eslint-disable-line
          pagination={false}
          showSorterTooltip={false}
          onRow={(record) => {
            return {
              onClick: () => {
                open(`${fromEnv('REACT_APP_SEARCH')}/main/balance?msisdn=${record.Msisdn}&serviceChannelId=${record.ServiceChannelId}`)
              }
            }
          }}
        >
          <Column
            dataIndex='Msisdn'
            title='MSISDN|Email'
          />
          <Column
            dataIndex='PersonalAccount'
            title='Лицевой счет'
          />
          <Column
            dataIndex='OpenedOn'
            title='Дата открытия'
            width='30%'
            render={formatIsoDate}
            sorter={(cur, next) => isoDateSorter(cur.OpenedOn, next.OpenedOn)}
          />
        </LastHandlingsTable>
      </Spin>
    </Wrapper>
  )
}

export default connect(mapStateToProps)(LastHandlings)

LastHandlings.propTypes = {
  lastHandlings: PropTypes.array,
  isLastHandlingsLoading: PropTypes.bool
}

const LoadingIcon = styled(LoadingOutlined)`
  font-size: 24;
`
const LastHandlingsTable = styled(Table)`
  .ant-table-thead {
    th {
      word-break: break-word;
      padding: 12px;
      font-size: 13px;
    }
  }
  .ant-table-tbody {
    td {
      padding: 12px;
      font-size: 13px;
      cursor: pointer;
    }
  }
  div.ant-table-column-sorters {
    padding: 0;
  }
`
const Wrapper = styled.div`
  position: relative;
  width: 35vw;
`
