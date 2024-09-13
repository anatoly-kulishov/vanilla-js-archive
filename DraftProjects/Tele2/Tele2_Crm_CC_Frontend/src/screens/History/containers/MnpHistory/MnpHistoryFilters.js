import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Select } from 'antd'
import RangePicker from 'components/RangePicker'

export default function MnpHistoryFilters ({
  filters: { mnpOrderId, datePeriodStart, datePeriodFinish },
  onFilterChange,
  orderIds,
  onFocus
}) {
  MnpHistoryFilters.propTypes = {
    filters: PropTypes.shape({
      mnpOrderId: PropTypes.string,
      datePeriodStart: PropTypes.object,
      datePeriodFinish: PropTypes.object
    }),
    onFilterChange: PropTypes.func.isRequired,
    orderIds: PropTypes.array,
    onFocus: PropTypes.func
  }

  const rangePickerValue = useMemo(() => ({ from: datePeriodStart, to: datePeriodFinish }), [datePeriodStart, datePeriodFinish])

  const onChange = useCallback(elem => {
    onFilterChange({ mnpOrderId: elem })
  }, [])

  return (
    <Wrapper>
      <MnpNumberWrapper>
        <Label htmlFor='mnp-order-id'>Номер заявления MNP</Label>
        <StyledSelect
          id='mnp-order-id'
          maxLength={65}
          value={mnpOrderId}
          onFocus={onFocus}
          allowClear
          mode='multiple'
          onChange={onChange}
        >
          {orderIds?.map((item, index) => (
            <Select.Option value={item} key={index}>
              {item}
            </Select.Option>
          ))}
        </StyledSelect>
      </MnpNumberWrapper>
      <RangePicker
        limitMonth={3}
        value={rangePickerValue}
        onChange={useCallback(({ from, to }) => onFilterChange({ datePeriodStart: from, datePeriodFinish: to }))}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 0 16px 20px;
`

const MnpNumberWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`

const Label = styled.label`
  width: 150px;
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

const StyledSelect = styled(Select)`
  width: 350px;
  height: fit-content;
`
