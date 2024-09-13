/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import { func, string, array, bool, arrayOf, elementType } from 'prop-types'

import { Table, Checkbox } from 'antd'
import styled from 'styled-components'
import { useTableRowsExpand } from 'hooks/useTableRowsExpand'
import HtmlRender from './HtmlRender'

export default function ExpandableTable ({
  dataSource = [],
  additionalColumns,
  columns,
  defaultExpandAllRows = false,
  title,
  rowClassName,
  className,
  additionalActions = []
}) {
  ExpandableTable.propTypes = {
    title: string,
    dataSource: array,
    additionalColumns: array,
    columns: array,
    defaultExpandAllRows: bool,
    rowClassName: func,
    className: string,
    additionalActions: arrayOf(elementType)
  }
  const allKeys = dataSource.map(item => item.key)

  const { expandedRowKeys, onExpand, watchers, toggleAllRowsExpanded } = useTableRowsExpand(allKeys, 'key', false)

  return (
    <Wrapper className={className}>
      <Header>
        {title && <TableTitle>{title}</TableTitle>}
        <Actions>
          <AdditionalActions hidden={!additionalActions.length}>{additionalActions}</AdditionalActions>
          <Checkbox checked={watchers.isAllRowsExpanded} onClick={toggleAllRowsExpanded}>
            Показать подробности
          </Checkbox>
        </Actions>
      </Header>
      <Table
        rowClassName={rowClassName}
        pagination={{
          hideOnSinglePage: true
        }}
        expandable={{
          expandedRowRender: record =>
            additionalColumns?.map(({ titleColumn, key }) => {
              const data = record[key]
              return (
                <AdditionalCell>
                  <AdditionalColumnTitle>{titleColumn}</AdditionalColumnTitle>
                  <HtmlRender value={data || 'Нет данных'} />
                </AdditionalCell>
              )
            }) ?? null
        }}
        columns={columns}
        dataSource={dataSource}
        expandRowByClick
        expandedRowKeys={expandedRowKeys}
        onExpand={onExpand}
        defaultExpandAllRows={defaultExpandAllRows}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  tbody > tr {
    cursor: pointer;
  }
`

const Header = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-bottom: 15px;
`

const Actions = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  > :not(:last-child) {
    margin-right: 14px;
  }
`

const AdditionalActions = styled.div``

const TableTitle = styled.div`
  font-size: 16px;
  font-family: T2HalvarBreit_ExtraBold;
`

const AdditionalCell = styled.div`
  :not(:last-child) {
    margin-bottom: 1em;
  }
`

const AdditionalColumnTitle = styled.h4`
  font-weight: bolder;
  + p {
    margin-bottom: 0;
  }
`
