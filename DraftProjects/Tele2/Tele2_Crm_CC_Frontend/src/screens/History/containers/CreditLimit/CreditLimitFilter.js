/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Select as AntdSelect, Spin } from 'antd'

import RangePicker from 'components/RangePicker'
import LoadingSpinner from 'components/LoadingSpinner'

const { Option } = AntdSelect

export default function CreditLimitFilters ({
  filters: { creditChangeReason, datePeriodStart, datePeriodFinish },
  isFiltersLoading,
  trustCreditReasonsHistory,
  onFilterChange
}) {
  CreditLimitFilters.propTypes = {
    filters: PropTypes.shape({
      creditChangeReason: PropTypes.number,
      datePeriodStart: PropTypes.object,
      datePeriodFinish: PropTypes.object
    }),
    isFiltersLoading: PropTypes.bool,
    trustCreditReasonsHistory: PropTypes.object,
    onFilterChange: PropTypes.func.isRequired
  }

  const changingReasonValue =
    trustCreditReasonsHistory &&
    trustCreditReasonsHistory.find(({ key }) => key === creditChangeReason)

  return (
    <Wrapper>
      <Spin spinning={isFiltersLoading} indicator={<LoadingSpinner spin />}>
        <Label htmlFor='change-reason'>Причины изменения</Label>
        {trustCreditReasonsHistory && (
          <Select
            id='change-reason'
            value={changingReasonValue && changingReasonValue.value}
            onChange={(value, option) => onFilterChange({ creditChangeReason: +option.key })}
          >
            {trustCreditReasonsHistory.map(({ value, key }) => (
              <Option value={value} key={key}>
                {value}
              </Option>
            ))}
          </Select>
        )}
      </Spin>
      <RangePicker
        limitMonth={3}
        value={{ from: datePeriodStart, to: datePeriodFinish }}
        onChange={({ from, to }) => onFilterChange({ datePeriodStart: from, datePeriodFinish: to })}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 0 16px 20px;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 14px;
  color: black;
  font-weight: normal;
  margin: 0;
  line-height: 36px;
`
const Select = styled(AntdSelect)`
  width: 350px;
  margin-bottom: 20px;
`
