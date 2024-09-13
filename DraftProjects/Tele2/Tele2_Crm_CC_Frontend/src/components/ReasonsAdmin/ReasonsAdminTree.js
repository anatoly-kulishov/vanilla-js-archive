import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Table as AntTable, Checkbox, Tooltip } from 'antd'
import { LoadingOutlined, LockOutlined, UnlockOutlined, PlusOutlined } from '@ant-design/icons'
import { findExpandedReasonsIds, findReasonParentIds } from 'utils/helpers'
import { isEqual } from 'lodash'

export default class ReasonsAdminTree extends Component {
  static propTypes = {
    adminRowActions: PropTypes.object,
    reasons: PropTypes.object,
    onSelectRow: PropTypes.func,
    selectedRow: PropTypes.object,
    categories: PropTypes.object,
    onlyReasons: PropTypes.object
  }
  state = {
    isFirstUpdate: true,
    expandedReasons: []
  }

  shouldComponentUpdate (nextProps) {
    return !isEqual(this.props, nextProps)
  }

  createDataSource = (reasons, categories, onlyReasons) => {
    return reasons.map((reason, index) => {
      let item = {}

      if (onlyReasons) {
        item = {
          key: reason.ReasonId,
          name: reason.ReasonName,
          mnemo: reason.MnemoCode,
          initialReason: reason
        }
      } else {
        item = {
          key: reason.ReasonId,
          name: reason.ReasonName,
          mnemo: reason.MnemoCode,
          isActive: reason.IsActive,
          isDeleted: reason.IsDeleted,
          initialReason: reason
        }

        categories.map(
          category =>
            (item[category.ShortName] =
              reason.Categories.find(
                reasonCategory => reasonCategory.ShortName === category.ShortName
              ) || null)
        )
      }

      if (reason.Children && reason.Children.length) {
        item.children = this.createDataSource(reason.Children, categories, onlyReasons)
      }

      return item
    })
  }

  createTableData = (reasons, categories, onlyReasons) => {
    if (reasons) {
      if (onlyReasons) {
        this.dataSource = this.createDataSource(reasons, categories, onlyReasons)
        this.columns = [
          {
            title: 'Название причины',
            dataIndex: 'name',
            key: 'name'
          },
          {
            title: 'Мнемо',
            dataIndex: 'mnemo',
            key: 'mnemo'
          }
        ]
      }

      if (categories?.length) {
        const {
          adminRowActions: { onBackup, onActivate, onFilter }
        } = this.props

        const categoriesItems = categories
          .filter(item => !item.IsDeleted)
          .map(category => {
            return {
              title: (
                <Tooltip title={category.CategoryName}>
                  <CategoryTh>
                    {category.ShortName}
                    {category && !category.IsActive && (
                      <LockIcon />
                    )}
                  </CategoryTh>
                </Tooltip>
              ),
              dataIndex: category.ShortName.toLowerCase(),
              key: `${category.CategoryId}`,
              isActive: category.IsActive,
              isDeleted: category.IsDeleted,
              onHeaderCell: column => {
                return {
                  onClick: () => onFilter(column.key)
                }
              },
              // prettier-ignore
              render: (text, record) => {
                return record[category.ShortName] &&
                  record[category.ShortName].IsActive &&
                  !record[category.ShortName].IsDeleted
                  ? (
                    <CheckboxWrapper checked disabled onChange={() => null} />
                  )
                  : null
              }
            }
          })

        this.dataSource = this.createDataSource(reasons, categories, onlyReasons)
        this.columns = [
          {
            title: 'Название причины',
            dataIndex: 'name',
            key: 'name',
            onHeaderCell: column => {
              return {
                onClick: () => onFilter('')
              }
            }
          },
          {
            title: 'Мнемо',
            dataIndex: 'mnemo',
            key: 'mnemo'
          },
          ...categoriesItems,
          {
            title: 'Неактив',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (text, record) => {
              if (!record.isActive) {
                return (
                  <Tooltip title='Активировать причину обращения'>
                    <UnlockIcon onClick={() => onActivate(record, true)} />
                  </Tooltip>
                )
              }
              return null
            }
          },
          {
            title: 'Удаленные',
            dataIndex: 'isDeleted',
            key: 'isDeleted',
            render: (text, record) => {
              if (record.isDeleted) {
                return (
                  <Tooltip title='Отменить удаление причины обращения'>
                    <PlusIcon onClick={() => onBackup(record)} />
                  </Tooltip>
                )
              }
              return null
            }
          }
        ]
      }
    }
  }

  render () {
    const { reasons, onSelectRow, selectedRow, categories, onlyReasons } = this.props

    const rowSelection = {
      selectedRowKeys: [selectedRow && selectedRow.key],
      onSelect: (record, selected, selectedRows) => onSelectRow(record, selected, selectedRows),
      onSelectAll: (record, selected, selectedRows) => onSelectRow({}, selected, selectedRows)
    }

    if (!reasons) {
      return (
        <Wrapper>
          <Loader />
        </Wrapper>
      )
    }

    this.createTableData(reasons, categories, onlyReasons)

    const expandedReasons = findExpandedReasonsIds(reasons)
    let expandedReasonsWithSelectedRow = [...expandedReasons]

    if (selectedRow && Object.keys(selectedRow).length) {
      const expandedSelectedRow = findReasonParentIds(reasons, selectedRow.key)
      expandedReasonsWithSelectedRow = [...expandedReasonsWithSelectedRow, ...expandedSelectedRow]
    }

    return (
      <Wrapper>
        {reasons && (
          <Table
            pagination={false}
            displayRowCheckbox={false}
            rowSelection={rowSelection}
            defaultExpandedRowKeys={expandedReasonsWithSelectedRow}
            hideDefaultSelections
            scroll={{ y: onlyReasons && 400 }} // eslint-disable-line
            selections
            bordered
            dataSource={this.dataSource}
            columns={this.columns}
            onRow={record => ({
              id: record.key
            })}
          />
        )}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding-top: 45px;
`

const Table = styled(AntTable)`
  width: 100%;

  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    text-align: center;
  }

  .ant-table-thead > tr > th {
    cursor: pointer;
  }

  .ant-table-thead > tr > th:nth-child(3) {
    cursor: default;
  }

  .ant-table-thead > tr > th:nth-child(1) {
    cursor: default;
  }

  .ant-table-thead > tr > th:nth-last-child(-n + 2) {
    cursor: default;
  }

  .ant-table-thead > tr:first-child > th:nth-child(2) {
    width: 400px;
    text-align: left;
    padding-left: 40px;
    cursor: pointer;
  }

  .ant-table-tbody > tr > td:nth-child(2) {
    text-align: left;
  }
`

const CheckboxWrapper = styled(Checkbox)`
  & .ant-checkbox-input {
    cursor: default;
  }
`

const CategoryTh = styled.div``

const Loader = styled(LoadingOutlined)`
  align-self: center;
  font-size: 90px;
  color: #44CAFF;
`
const PlusIcon = styled(PlusOutlined)`
  font-size: 15px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #44caff;
  }
`
const LockIcon = styled(LockOutlined)``
const UnlockIcon = styled(UnlockOutlined)``
