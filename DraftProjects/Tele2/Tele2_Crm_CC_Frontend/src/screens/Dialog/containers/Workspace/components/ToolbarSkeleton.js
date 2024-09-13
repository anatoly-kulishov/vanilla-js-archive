import React, { Fragment } from 'react'
import { Skeleton, Space } from 'antd'

const rows = { rows: 1 }

export default function ToolbarSkeleton () {
  return (
    <Fragment>
      <Skeleton active paragraph={rows} />
      <Space>
        <Skeleton.Button active size='default' />
        <Skeleton.Button active size='default' />
        <Skeleton.Button active size='default' />
      </Space>
    </Fragment>
  )
}
