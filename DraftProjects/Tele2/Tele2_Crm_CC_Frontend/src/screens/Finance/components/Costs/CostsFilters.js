/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Button, Select, Checkbox } from 'antd'
import RangePicker from 'components/RangePicker'
import StructureOfExpenses from 'webseller/features/structureOfExpenses/components/StructureOfExpenses'
import { selectIsWebSeller } from 'webseller/common/user/selectors'
import { useSelector } from 'react-redux'

const ALL = 'ALL'
const CHARGE = 'CHARGE_TYPE'

const CostsFilters = ({
  datePeriodStart,
  datePeriodFinish,
  accrualType,
  paymentsHistoryFilters,
  handleCommonFilterChange,
  handleSubmit,
  handleClear,
  includeTechnological
}) => {
  const isWebSeller = useSelector(selectIsWebSeller)
  return (
    <MainFilterWrapper>
      <Row gutter={16}>
        <Col span={8}>
          <Label>
            Тип списания
            <StyledSelect
              showSearch
              value={accrualType}
              optionFilterProp='children'
              onChange={(value, option) => {
                handleCommonFilterChange({
                  accrualType: value,
                  accrualTypeKey: option.key
                })
              }}
            >
              <Select.Option value={ALL} key={ALL}>
                Все
              </Select.Option>
              {paymentsHistoryFilters[CHARGE] &&
                paymentsHistoryFilters[CHARGE].DigestParams.map(item => (
                  <Select.Option value={item.Value} key={item.Key}>
                    {item.Value}
                  </Select.Option>
                ))}
            </StyledSelect>
          </Label>
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <Checkbox
            checked={includeTechnological}
            onChange={event =>
              handleCommonFilterChange({
                includeTechnological: event.target.checked
              })
            }
          >
            Тех. списания
          </Checkbox>
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col span={16}>
          <RangePicker
            limitMonth={1}
            value={{ from: datePeriodStart, to: datePeriodFinish }}
            onChange={({ from, to }) => handleCommonFilterChange({ datePeriodStart: from, datePeriodFinish: to })}
          />
        </Col>
        <Col span={8}>
          <Controls>
            {isWebSeller && <StructureOfExpenses />}
            <ControlBtn type='primary' onClick={handleSubmit}>
              Найти
            </ControlBtn>
            <ControlBtn onClick={handleClear}>Очистить</ControlBtn>
          </Controls>
        </Col>
      </Row>
    </MainFilterWrapper>
  )
}

export default CostsFilters

CostsFilters.propTypes = {
  accrualType: PropTypes.string,
  datePeriodStart: PropTypes.object,
  datePeriodFinish: PropTypes.object,
  paymentsHistoryFilters: PropTypes.object,
  handleCommonFilterChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleClear: PropTypes.func,
  includeTechnological: PropTypes.bool.isRequired
}

const MainFilterWrapper = styled.div`
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
const Controls = styled.div`
  display: flex;
  justify-content: flex-end;
`
