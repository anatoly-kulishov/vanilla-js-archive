import React, { PureComponent } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { DiagnosticsProvider } from 'containers/SmartGisPanel/diagnosticsContext'

import SalesOfficesFilters from './containers/SalesOfficesFilters'
import { Collapse } from 'antd'

import { officesColumns, additionalOfficesColumns } from './SalesOfficesTables'
import ExpandableTable from 'components/ExpandableTable'

const { Panel } = Collapse

export default class SalesOffices extends PureComponent {
  static propTypes = {
    flagPoi: PropTypes.array,
    isCoveragesAndOfficesLoading: PropTypes.bool
  }

  defaultKey = ['1']

  render () {
    const {
      isCoveragesAndOfficesLoading,

      flagPoi
    } = this.props

    return (
      <DiagnosticsProvider>
        <Wrapper>
          <DiagnosticsCollapse bordered={false} defaultActiveKey={this.defaultKey}>
            <SalesOfficesFilters />
            <DiagnosticsPanel showArrow={false} header='Офисы продаж' key='1'>
              <ExpandableTable
                columns={officesColumns}
                dataSource={flagPoi}
                isLoading={isCoveragesAndOfficesLoading}
                additionalColumns={additionalOfficesColumns}
              />
            </DiagnosticsPanel>
          </DiagnosticsCollapse>
        </Wrapper>
      </DiagnosticsProvider>
    )
  }
}

const Wrapper = styled.div`
  background-color: transparent;
  .ant-collapse-header {
    font-family: T2HalvarBreit_ExtraBold;
  }
`

const DiagnosticsCollapse = styled(Collapse)`
  padding-right: 30px;
  background-color: transparent;
  .ant-collapse-header {
    font-size: 15px;
  }
  .ant-collapse-item {
    border-bottom: 0;
  }
`

const DiagnosticsPanel = styled(Panel)`
  margin-bottom: 15px;
  background-color: white;
`
