/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled from 'styled-components'
import { shape, object, string, func, arrayOf } from 'prop-types'

import RangePicker from 'components/RangePicker'

import { Select as AntdSelect } from 'antd'

export default function PromoFilter ({
  filters: {
    datePeriodFinish,
    datePeriodStart,
    stateCode,
    campaignId
  },
  filtersOptions,
  onFilterChange
}) {
  return (
    <MainTable>
      <Row>
        <Col>
          <TitleHolder>Статус</TitleHolder>
          <Select
            value={stateCode}
            onChange={value => onFilterChange({ stateCode: value })}
          >
            {filtersOptions?.stateCodes}
          </Select>
        </Col>
        <Col>
          <TitleHolder>Кампания</TitleHolder>
          <Select
            value={campaignId}
            onChange={value => onFilterChange({ campaignId: value })}
          >
            {filtersOptions?.campaignIds}
          </Select>
        </Col>
      </Row>
      <Row>
        <Col>
          <RangePicker
            limitMonth={12}
            value={{ from: datePeriodStart, to: datePeriodFinish }}
            onChange={({ from, to }) => {
              onFilterChange({
                datePeriodStart: from,
                datePeriodFinish: to
              })
            }}
          />
        </Col>
      </Row>
    </MainTable>
  )
}

PromoFilter.propTypes = {
  filters: shape({
    datePeriodStart: object,
    datePeriodFinish: object,
    stateCode: string,
    campaignId: string
  }),
  filtersOptions: shape({
    campaignIds: arrayOf(string),
    stateCode: arrayOf(string)
  }),
  onFilterChange: func
}

const MainTable = styled.div`
  padding: 0 16px;
`
const TitleHolder = styled.div`
  margin: 0;
  line-height: 36px;
  color: black;
`
const Select = styled(AntdSelect)`
  width: 90%;
`
const Row = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 26px;
`
const Col = styled.div`
  flex: 1;
`
