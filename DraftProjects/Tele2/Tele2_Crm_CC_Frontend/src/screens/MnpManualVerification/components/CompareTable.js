import { Table, Tooltip } from 'antd'
import { EditOutlined, InfoCircleOutlined, CheckCircleFilled } from '@ant-design/icons'
import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import mnpVerificationPropType from '../../../constants/propTypes/mnpVerificationPropType'
import { array, bool, func, object } from 'prop-types'
import { formatMsisdn } from 'utils/helpers'

const CompareTable = props => {
  const { data, rejectionReasons, loading, onClickInfo, onClickEdit, showEditButton, scroll } = props

  const renderValue = useCallback(
    (item, withInfo, isMsisdn) => {
      const { rejectReasonCode, value, itemId } = item
      if (rejectReasonCode === 0) {
        return (
          <IconWrapper color='#52C41A'>
            <CheckCircleFilled />
          </IconWrapper>
        )
      }

      if (value) {
        const { CodeDescription } = rejectionReasons?.find(({ Code }) => Code === rejectReasonCode) ?? {}
        const passedValue = isMsisdn ? formatMsisdn(value) : value
        return withInfo ? (
          <ItemWrapper key={itemId}>
            <ItemValue>{passedValue}</ItemValue>
            <Tooltip title={CodeDescription} placement='right'>
              <IconWrapper onClick={() => onClickInfo(item)}>
                <InfoCircleOutlined />
              </IconWrapper>
            </Tooltip>
          </ItemWrapper>
        ) : (
          passedValue
        )
      } else {
        return <IconWrapper>-</IconWrapper>
      }
    },
    [onClickInfo, rejectionReasons]
  )

  const renderValues = useCallback(
    (data, record) => {
      const { attributeName } = record
      const isMsisdn = attributeName === 'number'
      const isMultipleValues = Array.isArray(data)

      if (isMultipleValues) {
        if (data.length === 0) {
          return <IconWrapper>-</IconWrapper>
        }
        return data.map(item => renderValue(item, true, isMsisdn))
      } else {
        return renderValue(data, false, isMsisdn)
      }
    },
    [renderValue]
  )

  const columns = useMemo(
    () => [
      {
        dataIndex: 'name',
        key: 'name',
        width: '25%'
      },
      {
        title: 'Биллинг',
        dataIndex: 'invoiceValues',
        key: 'invoiceValues',
        width: '25%',
        render: renderValues
      },
      {
        title: 'Заявление',
        dataIndex: 'orderValues',
        key: 'orderValues',
        width: '25%',
        render: renderValues
      },
      {
        title: () => (
          <StyledTableHead>
            Скан-копия
            {showEditButton ? (
              <IconWrapper onClick={onClickEdit}>
                <EditOutlined />
              </IconWrapper>
            ) : null}
          </StyledTableHead>
        ),
        dataIndex: 'scanValues',
        key: 'scanValues',
        width: '25%',
        render: renderValues
      }
    ],
    [renderValues, onClickEdit, showEditButton]
  )

  return <StyledTable dataSource={data} columns={columns} pagination={false} loading={loading} scroll={scroll} />
}

export default CompareTable

CompareTable.propTypes = {
  data: mnpVerificationPropType,
  rejectionReasons: array,
  loading: bool,
  onClickInfo: func,
  onClickEdit: func,
  showEditButton: bool,
  scroll: object
}

const IconWrapper = styled.div`
  color: ${({ color }) => color};
  font-size: 20px;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
`

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;

  :not(:last-child) {
    margin-bottom: 5px;
  }
`

const StyledTableHead = styled.div`
  display: flex;
  height: 50%;
  align-items: center;
  > * {
    margin-left: 7px;
  }
`

const ItemValue = styled.p`
  flex-grow: 1;
  margin-bottom: 0px;
  margin-right: 5px;
`

const StyledTable = styled(Table)`
  .ant-table-small .ant-table-thead > tr > th,
  .ant-table-thead > tr > th {
    background: #fff;
    color: black;
    font-family: T2HalvarBreit_ExtraBold;
    font-size: 16px;
  }

  .ant-table-tbody > tr > td {
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .ant-table-tbody > tr > td + td {
    padding-left: 5px;
    padding-right: 5px;
  }

  .ant-table-header {
    border-bottom: 1px solid #e4e4e9;
  }

  .ant-table-cell {
    vertical-align: baseline;
  }
`
