/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { stringSorter, isoDateSorter } from 'utils/helpers'
import { Table, Spin, Tooltip } from 'antd'
import { LoadingOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { bool, arrayOf, func } from 'prop-types'
import PromoAction from 'components/PromoActions'
import promoRightsPropType from 'constants/propTypes/promo/promoRightsPropType'
import promoPropType from 'constants/propTypes/promo/promoPropType'

const Column = Table.Column

const formatIsoDate = value => {
  return value ? moment(value).format('DD.MM.YYYY[\n]HH:mm') : ''
}

export default function ServiceGrid ({
  promoRights,
  promoHistory,
  isPromoHistoryLoading,
  handlePromo
}) {
  ServiceGrid.propTypes = {
    promoRights: promoRightsPropType,
    promoHistory: arrayOf(promoPropType),
    isPromoHistoryLoading: bool,
    handlePromo: func
  }

  return (
    <Fragment>
      <Spin spinning={isPromoHistoryLoading} indicator={<LoadingIcon spin />}>
        <ServiceTable
          rowKey='Key'
          dataSource={promoHistory}
          scroll={{ y: 600 }} // eslint-disable-line
          pagination={{ pageSize: 9 }}
          showSorterTooltip={false}
        >
          <Column
            dataIndex='PromoScenarioTypeName'
            title='Тип промокода'
            sorter={(cur, next) => stringSorter(cur.PromoScenarioTypeName, next.PromoScenarioTypeName)}
          />
          <Column
            dataIndex='PromocodeValue'
            title='Значение промокода'
            sorter={(cur, next) => stringSorter(cur.PromocodeValue, next.PromocodeValue)}
          />
          <Column
            dataIndex='ProvidedOn'
            title='Дата предоставления'
            render={formatIsoDate}
            sorter={(cur, next) => isoDateSorter(cur.ProvidedOn, next.ProvidedOn)}
          />
          <Column
            dataIndex='ProvidedBy'
            title='Автор предоставления'
            sorter={(cur, next) => stringSorter(cur.ProvidedBy, next.ProvidedBy)}
          />
          <Column
            dataIndex='ProvidedByChannelName'
            title='Канал предоставления'
            // render={(value, record) => renderFullName(value, record)}
            sorter={(cur, next) => stringSorter(cur.ProvidedByChannelName, next.ProvidedByChannelName)}
          />
          <Column
            dataIndex='StateName'
            title='Статус'
            sorter={(cur, next) => stringSorter(cur.StateName, next.StateName)}
          />
          <Column
            dataIndex='ActivatedOn'
            title='Дата активации'
            render={formatIsoDate}
            sorter={(cur, next) => isoDateSorter(cur.ActivatedOn, next.ActivatedOn)}
          />
          <Column
            dataIndex='ActivatedByChannelName'
            title='Канал активации'
            sorter={(cur, next) => stringSorter(cur.ActivatedByChannelName, next.ActivatedByChannelName)}
          />
          <Column
            dataIndex='ActivatedBy'
            title='Автор активации'
            sorter={(cur, next) => stringSorter(cur.ActivatedBy, next.ActivatedBy)}
          />
          {
            (promoRights.isActivateRight || promoRights.isCancelRight || promoRights.isAllCancelRight) && (
              <Column
                title='Действия'
                render={(record) => <PromoAction promo={record} promoRights={promoRights} handlePromo={handlePromo} />}
              />
            )
          }
          <Column
            title='Инф.'
            render={(record) => <Tooltip placement='bottom' title={record?.Description}><StyledInfoIcon /></Tooltip>}
          />
        </ServiceTable>
      </Spin>
    </Fragment>
  )
}

const LoadingIcon = styled(LoadingOutlined)`
  font-size: 24px;
`
const ServiceTable = styled(Table)`
  .ant-table-thead {
    th {
      padding: 12px;
      font-size: 12px;
    }
  }
  .ant-table-row.ant-table-row-level-0 {
    font-size: 13px;
    td {
      padding: 12px;
      cursor: pointer;
    }
  }
  .ant-pagination.ant-table-pagination {
    margin: 16px;
  }
  div.ant-table-column-sorters {
    padding: 0;
  }
`

const StyledInfoIcon = styled(InfoCircleOutlined)`
  margin-left: 8px;
  font-size: 16px
`
