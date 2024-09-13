/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import RangePicker from 'components/RangePicker'

export default function TariffFilters ({
  filters: { tariffDatePeriodStart, tariffDatePeriodFinish },
  onFilterChange
}) {
  TariffFilters.propTypes = {
    filters: PropTypes.shape({
      tariffDatePeriodStart: PropTypes.object,
      tariffDatePeriodFinish: PropTypes.object
    }),
    onFilterChange: PropTypes.func.isRequired
  }

  return (
    <Wrapper>
      <RangePicker
        isYearAvailable
        value={{ from: tariffDatePeriodStart, to: tariffDatePeriodFinish }}
        onChange={({ from, to }) => onFilterChange({ tariffDatePeriodStart: from, tariffDatePeriodFinish: to })}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 0 16px 20px;
`
