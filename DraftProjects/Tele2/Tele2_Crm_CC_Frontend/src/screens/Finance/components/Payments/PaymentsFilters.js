/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Select, Button } from 'antd'
import RangePicker from 'components/RangePicker'

const ALL = 'ALL'
const PAYMENT = 'PAY_TYPE'
const ENROLLMENT = 'PAYD_TYPE'

const PaymentsFilters = ({
  enrollmentType,
  areTypesDisabled,
  isContractNameDisabled,
  paymentsHistoryFilters,
  handleFilterChange,
  handleSubmit,
  handleClear,
  handleCommonFilterChange,
  commonFilters: { datePeriodStart, datePeriodFinish, paymentType, contractName }
}) => {
  const selectOptions = item => (
    <Select.Option value={item.Value} key={item.Key}>
      {item.Value}
    </Select.Option>
  )

  return (
    <MainFilterWrapper>
      <Row gutter={16}>
        <Col span={8}>
          <Label>
            Тип платежа
            <StyledSelect
              disabled={areTypesDisabled}
              showSearch
              optionFilterProp='children'
              value={paymentType}
              onChange={(value, option) => {
                handleCommonFilterChange({
                  paymentType: value,
                  paymentTypeKey: option.key,
                  contractName: 1,
                  contractNameKey: 1
                })
              }}
            >
              <Select.Option value={ALL} key={ALL}>
                Все
              </Select.Option>
              {paymentsHistoryFilters[PAYMENT] &&
                paymentsHistoryFilters[PAYMENT].DigestParams.map(selectOptions)
              }
            </StyledSelect>
          </Label>
        </Col>
        <Col span={8}>
          <Label>
            Тип зачисления
            <StyledSelect
              disabled={areTypesDisabled}
              showSearch
              optionFilterProp='children'
              value={enrollmentType}
              onChange={(value, option) => {
                handleFilterChange({
                  enrollmentType: value,
                  enrollmentTypeKey: option.key
                })
                handleCommonFilterChange({
                  contractName: 1,
                  contractNameKey: 1
                })
              }}
            >
              <Select.Option value={ALL} key={ALL}>
                Все
              </Select.Option>
              {paymentsHistoryFilters[ENROLLMENT] &&
                paymentsHistoryFilters[ENROLLMENT].DigestParams.map(selectOptions)
              }
            </StyledSelect>
          </Label>
        </Col>
        <Col span={8}>
          <Label>
            История
            <StyledSelect
              showSearch
              optionFilterProp='children'
              disabled={isContractNameDisabled}
              value={contractName}
              onChange={(value, option) => {
                handleCommonFilterChange({
                  contractName: value,
                  contractNameKey: option.key
                })
              }}
            >
              <Select.Option value={0} key={0}>
                Все
              </Select.Option>
              <Select.Option value={1} key={1}>
                Платежи
              </Select.Option>
              <Select.Option value={2} key={2}>
                Корректировки
              </Select.Option>
              <Select.Option value={3} key={3}>
                Обещанные платежи
              </Select.Option>
            </StyledSelect>
          </Label>
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col>
          <RangePicker
            limitMonth={1}
            value={{ from: datePeriodStart, to: datePeriodFinish }}
            onChange={({ from, to }) =>
              handleCommonFilterChange({ datePeriodStart: from, datePeriodFinish: to })
            }
          />
        </Col>
        <Col>
          <DateControls>
            <ControlBtn type='primary' onClick={handleSubmit}>
              Найти
            </ControlBtn>
          </DateControls>
        </Col>
      </Row>
    </MainFilterWrapper>
  )
}

export default PaymentsFilters

PaymentsFilters.propTypes = {
  areTypesDisabled: PropTypes.bool,
  isContractNameDisabled: PropTypes.bool,
  handleCommonFilterChange: PropTypes.func,
  paymentsHistoryFilters: PropTypes.object,
  enrollmentType: PropTypes.number,
  handleFilterChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleClear: PropTypes.func,
  commonFilters: PropTypes.object
}

const MainFilterWrapper = styled.div`
padding: 14px 20px;
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
