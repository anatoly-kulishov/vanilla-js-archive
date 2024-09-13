import React, { PureComponent } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import { DiagnosticsProvider } from 'containers/SmartGisPanel/diagnosticsContext'

import CoverageFilters from './containers/CoverageFilters'
import { Collapse, Spin } from 'antd'

import {
  massProblemsColumns,
  faultsColumns,
  pwColumns,
  spaColumns,
  additionalMassProblemsColumns,
  additionalFaultsColumns,
  additionalPwColumns,
  additionalSpaColumns
} from './CoverageTables'
import ExpandableTable from 'components/ExpandableTable'

const { Panel } = Collapse

export default class Coverage extends PureComponent {
  static propTypes = {
    mtpJournalForPeriod: PropTypes.arrayOf(PropTypes.object),

    flagMp: PropTypes.arrayOf(PropTypes.object),
    flagFaults: PropTypes.arrayOf(PropTypes.object),
    flagCoverage: PropTypes.arrayOf(PropTypes.object),
    flagPw: PropTypes.arrayOf(PropTypes.object),
    flagSpa: PropTypes.arrayOf(PropTypes.object),
    isCoveragesAndOfficesLoading: PropTypes.bool
  }

  defaultActiveKey = ['1', '2', '3', '4', '5']
  dataSource = [...this.props.mtpJournalForPeriod, ...this.props.flagMp]
  style = { display: 'none' }

  render () {
    const {
      isCoveragesAndOfficesLoading,
      flagFaults,
      flagCoverage,
      flagPw,
      flagSpa
    } = this.props

    return (
      <DiagnosticsProvider>
        <Wrapper>
          <CoverageFilters isCoveragesAndOfficesLoading={isCoveragesAndOfficesLoading} />
          <DiagnosticsCollapse bordered={false} defaultActiveKey={this.defaultActiveKey}>
            <DiagnosticsPanel showArrow={false} header='Покрытия и ограничения' key='1'>
              <Spin spinning={isCoveragesAndOfficesLoading}>
                <CoverageInfo isLoading={isCoveragesAndOfficesLoading}>{flagCoverage?.map(info => info)}</CoverageInfo>
              </Spin>
            </DiagnosticsPanel>
            <DiagnosticsPanel header='Массовые Проблемы' showArrow={false} key='5'>
              <ExpandableTable
                dataSource={this.dataSource}
                columns={massProblemsColumns}
                isLoading={isCoveragesAndOfficesLoading}
                additionalColumns={additionalMassProblemsColumns}
              />
            </DiagnosticsPanel>
            <DiagnosticsPanel showArrow={false} header='Аварии' key='2'>
              <ExpandableTable
                dataSource={flagFaults}
                columns={faultsColumns}
                isLoading={isCoveragesAndOfficesLoading}
                additionalColumns={additionalFaultsColumns}
              />
            </DiagnosticsPanel>
            {/* hidden 'til SmartGIS gives some data */}
            <DiagnosticsPanel style={this.style} showArrow={false} header='Плановые работы' key='3'>
              <ExpandableTable
                columns={pwColumns}
                dataSource={flagPw}
                isLoading={isCoveragesAndOfficesLoading}
                additionalColumns={additionalPwColumns}
              />
            </DiagnosticsPanel>
            <DiagnosticsPanel showArrow={false} header='Проблемные зоны' key='4'>
              <ExpandableTable
                columns={spaColumns}
                dataSource={flagSpa}
                isLoading={isCoveragesAndOfficesLoading}
                additionalColumns={additionalSpaColumns}
              />
            </DiagnosticsPanel>
          </DiagnosticsCollapse>
        </Wrapper>
      </DiagnosticsProvider>
    )
  }
}

const Wrapper = styled.div`
  padding-right: 30px;
  background-color: transparent;
  .ant-collapse-header {
    font-family: T2HalvarBreit_ExtraBold;
  }
`

const CoverageInfo = styled.div`
  ${({ isLoading }) =>
    isLoading &&
    css`
      min-height: 14px;
    `}
  &.rdw-editor-main {
    padding-left: 0;
  }
`

const DiagnosticsCollapse = styled(Collapse)`
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
