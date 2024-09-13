/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Table, Tooltip } from 'antd'
import { CrownOutlined } from '@ant-design/icons'

import { stringSorter, numSorter } from 'utils/helpers'

import Tag from 'components/Tag'
import Expand from './Expand'
import GroupIcon from './GroupIcon'
import Switch from './Switch'
import LongValueWrapper from './LongValueWrapper'

const { Column } = Table

export default function GroupsTable ({
  msisdn,
  ratePlanId,
  isDeleteGroupUser,
  groupList,
  toggleSubscribersModal,
  deleteGroup,
  validateAutopayService,
  getUnpaidChargeDataAndShowAlert,
  paramsForDeleting
}) {
  GroupsTable.propTypes = {
    msisdn: PropTypes.string,
    ratePlanId: PropTypes.number,
    isDeleteGroupUser: PropTypes.bool,
    paramsForDeleting: PropTypes.object,
    groupList: PropTypes.object,
    toggleSubscribersModal: PropTypes.func,
    deleteGroup: PropTypes.func,
    validateAutopayService: PropTypes.func,
    getUnpaidChargeDataAndShowAlert: PropTypes.func
  }
  const [expandedRowKeys, setExpandedRowKeys] = useState([])

  const validateRecord = (record) => {
    if (record.DiscountStatusId !== 1) {
      validateAutopayService({ msisdn })
      getUnpaidChargeDataAndShowAlert({ msisdn, RatePlanId: ratePlanId })
    }
  }

  useEffect(() => {
    if (groupList.length === 1) {
      setExpandedRowKeys([groupList[0].UserCreateDate])
    } else {
      setExpandedRowKeys([])
    }
  }, [groupList])

  return (
    <Wrapper
      size='middle'
      locale={{ emptyText: 'Нет данных о группах абонента' }}
      rowKey='UserCreateDate'
      dataSource={groupList}
      pagination={false}
      showSorterTooltip={false}
      expandedRowKeys={expandedRowKeys}
      onExpandedRowsChange={expandedRows => setExpandedRowKeys(expandedRows)}
      expandedRowRender={record => (
        <Expand groupInfo={record} justify='end' />
      )}
    >
      <Column
        dataIndex='OwnerCode'
        render={value =>
          value && value === 1 && (
            <Tooltip title='Инициатор группы'>
              <IconWrapper>
                <CrownIcon />
              </IconWrapper>
            </Tooltip>
          )
        }
      />
      <Column
        render={record => (
          <Switch
            record={record}
            paramsForDeleting={{ ...paramsForDeleting, ...{ productCode: record.ProductCode } }}
            deleteGroup={deleteGroup}
            isDeleteGroupUser={isDeleteGroupUser}
            isGroup
          />
        )}
      />
      <Column
        dataIndex='ProductName'
        title='Наименование программы'
        sorter={(cur, next) => stringSorter(cur.ProductName, next.ProductName)}
        render={(value, record) => value && <LongValueWrapper placement='topLeft' value={value} />}
      />
      <Column
        dataIndex='GroupSize'
        title='Участники группы'
        sorter={(cur, next) => numSorter(cur.GroupSize, next.GroupSize)}
        render={(value, record) => (
          <GroupIcon icon='team' record={record} count={value} toggleModal={toggleSubscribersModal} />
        )}
      />
      <Column
        dataIndex='GroupStatusName'
        title='Статус группы'
        sorter={(cur, next) => stringSorter(cur.GroupStatusName, next.GroupStatusName)}
        render={(value, record) =>
          value && (
            <Tag width={65} color={record.GroupStatusFieldColor}>
              {value}
            </Tag>
          )
        }
      />
      <Column
        dataIndex='DiscountName'
        title='Наименование скидки'
        sorter={(cur, next) => stringSorter(cur.DiscountName, next.DiscountName)}
        render={(value, record) =>
          value && <LongValueWrapper placement='topLeft' value={value} />
        }
      />
      <Column
        dataIndex='DiscountAmount'
        title='Скидка'
        sorter={(cur, next) => numSorter(cur.DiscountAmount, next.DiscountAmount)}
        render={(value, record) =>
          value && <GroupIcon icon='percentage' record={record} count={value} />
        }
      />
      <Column
        dataIndex='DiscountStatusName'
        title='Статус скидки'
        sorter={(cur, next) => stringSorter(cur.DiscountStatusName, next.DiscountStatusName)}
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
      />
    </Wrapper>
  )
}

const Wrapper = styled(Table)`
  font-size: 14px;
  overflow: auto;
  .ant-table-expanded-row {
    background-color: white;
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
