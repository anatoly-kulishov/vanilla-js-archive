import { useState } from 'react'

export function useTableRowsExpand (keys, rowKey, defaultExpandAllRows) {
  const [expandedRowKeys, setExpandedRowKeys] = useState(defaultExpandAllRows ? keys : [])
  const watchers = {
    get isAllRowsExpanded () {
      return expandedRowKeys.length === keys.length
    }
  }

  function onExpand (expanded, record) {
    if (expanded) {
      setExpandedRowKeys(expandedRowKeys.concat([record[rowKey]]))
    } else {
      setExpandedRowKeys(expandedRowKeys.filter(item => item !== record[rowKey]))
    }
  }
  const toggleAllRowsExpanded = () => {
    if (watchers.isAllRowsExpanded) {
      setExpandedRowKeys([])
    } else {
      setExpandedRowKeys(keys)
    }
  }

  return {
    watchers,
    expandedRowKeys,
    onExpand,
    toggleAllRowsExpanded
  }
}
