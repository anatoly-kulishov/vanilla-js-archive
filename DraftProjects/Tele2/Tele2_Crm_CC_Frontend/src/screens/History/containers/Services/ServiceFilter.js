/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import RangePicker from 'components/RangePicker'

import { Input } from 'antd'

export default function ServiceFilter ({
  filters: {
    datePeriodFinish,
    datePeriodStart,
    serviceName
  },
  onFilterChange
}) {
  ServiceFilter.propTypes = {
    filters: PropTypes.objectOf(
      PropTypes.shape({
        datePeriodStart: PropTypes.object,
        datePeriodFinish: PropTypes.object,
        serviceName: PropTypes.string
      })
    ),
    onFilterChange: PropTypes.func
  }

  return (
    <MainTable>
      <Row>
        <Col>
          <TitleHolder>Имя услуги</TitleHolder>
          <ServiceNameInput
            onChange={evt => onFilterChange({ serviceName: evt.currentTarget.value })}
            placeholder='Все'
            value={serviceName}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <RangePicker
            limitMonth={3}
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

const MainTable = styled.div`
  padding: 0 16px;
`
const TitleHolder = styled.div`
  margin: 0;
  line-height: 36px;
  color: black;
`
const ServiceNameInput = styled(Input)`
  width: 33%;
`
const Row = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 26px;
`
const Col = styled.div`
  flex: 1;
`
