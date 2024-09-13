import React from 'react'
import { Table } from 'antd'
import Card from 'components/Card'
import { columns } from './helpers'
import { Filters } from './components'

function SalesReport (props) {
  const { salesReportFull, isSalesReportFullLoading, getSalesReportFull } = props

  return (
    <>
      <Card
        header='История'
        additional={[
          {
            content: <Filters findHandler={getSalesReportFull} />
          }
        ]}
        content={
          <Table columns={columns} dataSource={salesReportFull} pagination={false} loading={isSalesReportFullLoading} />
        }
      />
    </>
  )
}

export default SalesReport
