import React, { PureComponent } from 'react'
import { array } from 'prop-types'

import { salesAndOfficesTableColumns, salesAndOfficesTableAdditionalColumns } from './constants/salesAndOfficesTable'
import { DiagnosticsProvider } from 'containers/SmartGisPanel/diagnosticsContext'
import SalesAndOfficesFilters from './containers/SalesAndOfficesFilters'
import ExtendableCard from 'components/ExtendableCardPanel'
import ExpandableTable from 'components/ExpandableTable'
const { ExtendableCardPanel, Card } = ExtendableCard

export default class CoveragesAndOffices extends PureComponent {
  static propTypes = {
    flagPoi: array
  }

  render () {
    const { flagPoi } = this.props

    return (
      <DiagnosticsProvider>
        <ExtendableCardPanel>
          <Card title='Диагностика'>
            <SalesAndOfficesFilters />
          </Card>
          <Card title='Офисы продаж' isHidden={!flagPoi.length}>
            <ExpandableTable
              columns={salesAndOfficesTableColumns}
              additionalColumns={salesAndOfficesTableAdditionalColumns}
              dataSource={flagPoi}
            />
          </Card>
        </ExtendableCardPanel>
      </DiagnosticsProvider>
    )
  }
}
