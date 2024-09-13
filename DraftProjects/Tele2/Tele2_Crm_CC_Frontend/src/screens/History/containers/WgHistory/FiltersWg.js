/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import RangePicker from 'components/RangePicker'

import { Row, Col, Select } from 'antd'
import { CloseCircleFilled } from '@ant-design/icons'

import { wargamingStatusList } from '../../HistoryContext/constants'

const { Option } = Select

const wgStatusList = Object.keys(wargamingStatusList).map(statusKey => {
  const { value, label } = wargamingStatusList[statusKey]
  return (
    <Option value={value} key={value}>
      {label}
    </Option>
  )
})

export default function TicketFilter ({
  filters: {
    datePeriodStart,
    datePeriodFinish,
    wgStatus
  },
  onWgStatusClear,
  onFilterChange
}) {
  TicketFilter.propTypes = {
    filters: PropTypes.objectOf(
      PropTypes.shape({
        datePeriodStart: PropTypes.object,
        datePeriodFinish: PropTypes.object,
        wgStatus: PropTypes.string
      })
    ),
    onWgStatusClear: PropTypes.func,
    onFilterChange: PropTypes.func
  }

  return (
    <MainTable>
      <Row>
        <Col span={4}>
          <TitleHolder>Статус</TitleHolder>
          <StyledSelect
          // there needs to be a 'custom' icon with it's own onClick handler
          // in order to actually clear the input value
          // antd doesn't do it when using an explicit value on Select component
            clearIcon={<ClearIcon onClick={onWgStatusClear} />}
            onChange={value => onFilterChange({ wgStatus: value })}
            value={wgStatus}
            allowClear
          >
            {wgStatusList}
          </StyledSelect>
        </Col>
      </Row>
      <br />
      <StyledRow>
        <Col span={16}>
          <RangePicker
            limitMonth={3}
            value={{ from: datePeriodStart, to: datePeriodFinish }}
            onChange={({ from, to }) => onFilterChange({ datePeriodStart: from, datePeriodFinish: to })}
          />
        </Col>
      </StyledRow>
    </MainTable>
  )
}

const MainTable = styled.div`
  padding: 0 16px 0;
`
const StyledRow = styled(Row)`
  margin-bottom: 26px;
`
const TitleHolder = styled.div`
  margin: 0;
  line-height: 36px;
  color: black;
`
const StyledSelect = styled(Select)`
  width: 100%;
`
const ClearIcon = styled(CloseCircleFilled)`
  font-size: 14px;
`
