import React from 'react'
import FlagStatusCell from './FlagStatusCell'
import FlagNameCell from './FlagNameCell'
import AddittionInfoCell from './AddittionInfoCell'

export const coveragesAndOfficesTableColumns = [
  { className: 'flag-namе-сolumn', dataIndex: 'flagName', key: 'flagName', render: flagName => <FlagNameCell>{flagName}</FlagNameCell> },
  { dataIndex: 'flagValueComment', key: 'flagValueComment', render: flagValueComment => <div>{flagValueComment}</div> },
  {
    dataIndex: 'flagStatus',
    key: 'flagStatus',
    render: flagStatus => <FlagStatusCell color={flagStatus.indicator}>{flagStatus.message}</FlagStatusCell>
  },
  {
    dataIndex: 'addittionInfo',
    key: 'addittionInfo',
    render: addittionInfo => <AddittionInfoCell>{addittionInfo}</AddittionInfoCell>
  }
]
