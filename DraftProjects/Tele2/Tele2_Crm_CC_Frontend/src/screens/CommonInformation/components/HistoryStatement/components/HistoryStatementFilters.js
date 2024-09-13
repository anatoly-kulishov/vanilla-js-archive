import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Select, Button } from 'antd'
import PropTypes from 'prop-types'
import RangePicker from 'components/RangePicker'

const eventType = [
  {
    name: 'Обращение'
  },
  {
    name: 'SMS оповещение'
  },
  {
    name: 'Изменение'
  },
  {
    name: 'SMS из обращения'
  }
]

const HistoryModalFilters = ({
  handleDatePeriodChange,
  rangeValue,
  setEventTypeName,
  handleSearch,
  selectedOrders,
  onChangeOrder,
  orderIds,
  isMnpHistory,
  eventTypeName
}) => {
  useEffect(() => {
    if (isMnpHistory) {
      setEventTypeName('Обращение')
    }
  }, [isMnpHistory])
  return (
    <Tools isMnpHistory={isMnpHistory}>
      <RangePicker
        value={{ from: rangeValue.datePeriodStart, to: rangeValue.datePeriodFinish }}
        onChange={({ from, to }) => {
          handleDatePeriodChange({
            datePeriodStart: from,
            datePeriodFinish: to
          })
        }}
      />
      <SelectWrapper isMnpHistory={isMnpHistory}>
        <StyledSelect isMnpHistory={isMnpHistory} allowClear onChange={setEventTypeName} value={eventTypeName}>
          {eventType.map(el => {
            return <Select.Option key={el.name}>{el.name}</Select.Option>
          })}
        </StyledSelect>
        <StyledSelect
          width='300px'
          onFocus={handleSearch}
          allowClear
          value={selectedOrders}
          mode='multiple'
          onChange={onChangeOrder}
          isMnpHistory={isMnpHistory}
        >
          {orderIds?.map((item, index) => (
            <Select.Option value={item} key={index}>
              {item}
            </Select.Option>
          ))}
        </StyledSelect>
        <StyledButton type='primary' onClick={handleSearch}>
          Найти
        </StyledButton>
      </SelectWrapper>
    </Tools>
  )
}

export default HistoryModalFilters

HistoryModalFilters.propTypes = {
  handleDatePeriodChange: PropTypes.func,
  rangeValue: PropTypes.obj,
  setEventTypeName: PropTypes.func,
  handleSearch: PropTypes.func,
  selectedOrders: PropTypes.array,
  onChangeOrder: PropTypes.func,
  orderIds: PropTypes.array,
  isMnpHistory: PropTypes.bool
}

const Tools = styled.div`
  display: ${({ isMnpHistory }) => isMnpHistory ? 'block' : 'flex'};
  justify-content: space-between;
  margin-bottom: 20px;
  padding: ${({ isMnpHistory }) => isMnpHistory ? '24px 16px 0' : '0'};
`
const StyledSelect = styled(Select)`
  width: 100%;
  max-width: ${({ width }) => (width ? `${width}` : '250px')};
  height: fit-content;
  margin-right: ${({ isMnpHistory }) => isMnpHistory ? '10px' : '0'};
`
const StyledButton = styled(Button)`
  width: 100px;
`
const SelectWrapper = styled.div`
  display: flex;
  justify-content: ${({ isMnpHistory }) => isMnpHistory ? 'left' : 'space-between'};
  margin-top: ${({ isMnpHistory }) => isMnpHistory ? '10px' : '0'};
  width: 60%;
`
