/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Button, Select } from 'antd'
import { SyncOutlined, FilterOutlined } from '@ant-design/icons'
import RangePicker from 'components/RangePicker'

const ALL = 'ALL'
const STATUS = 'INVOICE_STATUS'

const InvoicesFilters = ({
  datePeriodStart,
  datePeriodFinish,
  invoiceStatus,
  paymentsHistoryFilters,
  handleFilterChange,
  handleSubmit,
  handleClear
}) => {
  const [hidden, handleDateFilterDisplay] = useState(false)
  return (
    <Fragment>
      <Row gutter={16}>
        <Col span={24}>
          <Control>
            <FilterIcon onClick={() => handleDateFilterDisplay(!hidden)} />
            <SyncIcon onClick={() => handleSubmit()} />
          </Control>
        </Col>
      </Row>
      <DateFilterWrapper hidden={hidden}>
        <MainFilterWrapper>
          <Row gutter={16}>
            <Col span={8}>
              <Label>
                Статус
                <StyledSelect
                  showSearch
                  optionFilterProp='children'
                  value={invoiceStatus}
                  onChange={(value, option) =>
                    handleFilterChange({ invoiceStatus: value, invoiceStatusKey: option.key })
                  }
                >
                  <Select.Option value={ALL} key={ALL}>
                    Все
                  </Select.Option>
                  {paymentsHistoryFilters[STATUS] &&
                    paymentsHistoryFilters[STATUS].DigestParams.map(item => (
                      <Select.Option value={item.Value} key={item.Key}>
                        {item.Value}
                      </Select.Option>
                    ))}
                </StyledSelect>
              </Label>
            </Col>
          </Row>
        </MainFilterWrapper>
        <Row gutter={16}>
          <Col span={16}>
            <RangePicker
              limitMonth={12}
              isYearAvailable
              value={{ from: datePeriodStart, to: datePeriodFinish }}
              onChange={({ from, to }) =>
                handleFilterChange({ datePeriodStart: from, datePeriodFinish: to })
              }
            />
          </Col>
          <Col span={8}>
            <DateControls>
              <ControlBtn type='primary' onClick={handleSubmit}>
                Найти
              </ControlBtn>
              <ControlBtn onClick={handleClear}>Очистить</ControlBtn>
            </DateControls>
          </Col>
        </Row>
      </DateFilterWrapper>
    </Fragment>
  )
}

export default InvoicesFilters

InvoicesFilters.propTypes = {
  datePeriodStart: PropTypes.object,
  datePeriodFinish: PropTypes.object,
  invoiceStatus: PropTypes.number,
  paymentsHistoryFilters: PropTypes.object,
  handleFilterChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleClear: PropTypes.func
}

const MainFilterWrapper = styled.div`
  padding: 0px 16px 20px 0px;
`
const DateFilterWrapper = styled.div`
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
const StyledSelect = styled(Select)`
  width: 100%;
`
const ControlBtn = styled(Button)`
  margin-left: 20px;
`
const DateControls = styled.div`
  display: flex;
  justify-content: flex-end;
`
const Control = styled.div`
  padding: 0px 16px 20px 0px;
  display: inline-flex;
  text-align: right;
  float: right;
`
const FilterIcon = styled(FilterOutlined)`
  font-size: 17px;
  margin-left: 10px;
  cursor: pointer;
`
const SyncIcon = styled(SyncOutlined)`
  font-size: 17px;
  margin-left: 10px;
  cursor: pointer;
`
