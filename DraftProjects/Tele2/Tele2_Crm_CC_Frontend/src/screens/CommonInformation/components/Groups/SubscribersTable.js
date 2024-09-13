/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'

import { Table, Tooltip, Modal } from 'antd'
import { CrownOutlined, UserOutlined } from '@ant-design/icons'
import Tag from 'components/Tag'
import Switch from './Switch'
import GroupIcon from './GroupIcon'

import { stringSorter, isoDateSorter, numSorter } from 'utils/helpers'
import open from 'utils/helpers/windowOpener'
import LongValueWrapper from './LongValueWrapper'
import fromEnv from 'config/fromEnv'

const { Column } = Table
const { confirm } = Modal

const onHandleMsisdn = (msisdn, processingParameters) => {
  const { ServiceChannel, InteractionDirection } = processingParameters
  open(`${fromEnv('REACT_APP_SEARCH')}/main/balance?msisdn=${msisdn}&serviceChannelId=${ServiceChannel.Id}&interactionDirectionId=${InteractionDirection.Id}`)
}

const showConfirm = (msisdn, processingParameters) => {
  confirm({
    content: `Открыть новое обращение по номеру ${msisdn}?`,
    onOk () { onHandleMsisdn(msisdn, processingParameters) }
  })
}

const SubscribersTable = ({
  list,
  ratePlanId,
  productCode,
  groupId,
  deleteGroup,
  validateAutopayService,
  getUnpaidChargeDataAndShowAlert,
  isDeleteGroupUser,
  processingParameters,
  paramsForDeleting
}) => {
  const getOwnerIcon = code => {
    switch (code) {
      case 1:
        return <CrownIcon />
      case 2:
        return <UserIcon />
      case 3:
        return (
          <KingIconWrapper>
            <CrownOnUserIcon />
            <UserIcon />
          </KingIconWrapper>
        )
      default: break
    }
    return null
  }
  const getOwnerTitle = code => {
    switch (code) {
      case 1:
        return 'Инициатор группы'
      case 2:
        return 'Автор обращения'
      case 3:
        return 'Инициатор группы и автор обращения'
      default: break
    }
    return null
  }
  const validateRecord = (record) => {
    if (record.DiscountStatusId !== 1) {
      validateAutopayService({ msisdn: record.Msisdn })
      getUnpaidChargeDataAndShowAlert({ msisdn: record.Msisdn, RatePlanId: ratePlanId })
    }
  }
  return (
    <Wrapper
      locale={{ emptyText: 'Нет данных о группах абонента' }}
      rowKey='Key'
      dataSource={list}
      pagination={false}
      size='small'
      showSorterTooltip={false}
    >
      <Column
        dataIndex='OwnerCode'
        render={value =>
          value && (
            <Tooltip title={getOwnerTitle(value)}>
              <IconWrapper>
                {getOwnerIcon(value)}
              </IconWrapper>
            </Tooltip>
          )
        }
      />
      <Column
        render={(_value, record) => (
          <Switch
            record={record}
            paramsForDeleting={{
              ...paramsForDeleting,
              productCode
            }}
            deleteGroup={deleteGroup}
            isDeleteGroupUser={isDeleteGroupUser}
            isGroup={false}
            groupId={groupId}
          />
        )}
      />
      <Column
        dataIndex='Msisdn'
        title='Номер абонента'
        sorter={(cur, next) => stringSorter(cur.Msisdn, next.Msisdn)}
        render={msisdn =>
          <Tooltip title='Открыть новое обращение'>
            <Msisdn onClick={() => showConfirm(msisdn, processingParameters)} >{msisdn}</Msisdn>
          </Tooltip>
        }
      />
      <Column
        dataIndex='SubscriberStatusName'
        title='Статус участника'
        render={(value, record) =>
          value && (
            <Tag width={65} color={record.SubscriberStatusFieldColor}>
              {value}
            </Tag>
          )
        }
        sorter={(cur, next) => numSorter(cur.SubscriberStatusId, next.SubscriberStatusId)}
      />
      <Column
        width={175}
        dataIndex='DiscountName'
        title='Наименование скидки'
        sorter={(cur, next) => stringSorter(cur.DiscountName, next.DiscountName)}
        render={value => value && <LongValueWrapper placement='topLeft' value={value} />}
      />
      <Column
        dataIndex='DiscountAmount'
        title='Скидка'
        align='center'
        render={(value, record) => value && <PercentageIcon icon='percentage' record={record} count={value} />}
        sorter={(cur, next) => numSorter(cur.DiscountAmount, next.DiscountAmount)}
      />
      <Column
        dataIndex='DiscountStatusName'
        title='Статус скидки'
        render={(value, record) =>
          value && (
            <Tag
              width={65}
              color={record.DiscountStatusFieldColor}
              onClick={() => validateRecord(record)}
            >
              {value}
            </Tag>
          )
        }
        sorter={(cur, next) => numSorter(cur.DiscountStatusId, next.DiscountStatusId)}
      />
      <Column
        dataIndex='UserCreateDate'
        title='Дата входа'
        width={135}
        render={value => (value ? moment(value).format('DD.MM.YYYY HH:mm') : '')}
        sorter={(cur, next) => isoDateSorter(cur.UserCreateDate, next.UserCreateDate)}
      />
      <Column
        dataIndex='UserDeleteDate'
        title='Дата выхода'
        width={135}
        render={value => (value ? moment(value).format('DD.MM.YYYY HH:mm') : '')}
        sorter={(cur, next) => isoDateSorter(cur.UserDeleteDate, next.UserDeleteDate)}
      />
    </Wrapper>
  )
}

export default SubscribersTable

SubscribersTable.propTypes = {
  list: PropTypes.array,
  productCode: PropTypes.number,
  ratePlanId: PropTypes.number,
  groupId: PropTypes.number,
  deleteGroup: PropTypes.object,
  validateAutopayService: PropTypes.func,
  getUnpaidChargeDataAndShowAlert: PropTypes.func,
  isDeleteGroupUser: PropTypes.object,
  processingParameters: PropTypes.object,
  paramsForDeleting: PropTypes.object
}

const Wrapper = styled(Table)`
  font-size: 14px;
  overflow: auto;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  .ant-table-expanded-row.ant-table-expanded-row-level-1 {
    background: white;
  }
  .ant-table-body {
    margin: 0 !important;
  }
  .ant-table-thead > tr {
    background-color: #ecf9ff;
  }
  div.ant-table-column-sorters {
    padding: 0;
  }
`
const IconWrapper = styled.div`
  text-align: center;
`
const CrownIcon = styled(CrownOutlined)`
  font-size: 20px;
`
const UserIcon = styled(UserOutlined)`
  font-size: 20px;
`
const KingIconWrapper = styled.div`
  position: relative;
  text-align: center;
  top: 6px;
`
const CrownOnUserIcon = styled(CrownIcon)`
  font-size: 14px;
  position: absolute;
  top: -10px;
  left: 3px;
`
const PercentageIcon = styled(GroupIcon)`
  display: inline-block;
`
const Msisdn = styled.div`
  cursor: pointer;
`
