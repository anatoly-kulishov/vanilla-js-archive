/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled from 'styled-components'
import { Row, Col, Select } from 'antd'
import MsisdnMaskedInput from 'components/MsisdnMask/MsisdnInput'
import ReasonSelectorContainer from 'containers/ReasonSelectorContainer'
import CategorySelectorContainer from 'containers/CategorySelectorContainer'
import RangePicker from 'components/RangePicker'
import PropTypes from 'prop-types'

export default function InteractionsFilters ({
  filters: {
    datePeriodStart,
    datePeriodFinish,
    interactionReason,
    interactionCategory,
    interactionShowBy
  },
  msisdn,
  onFilterChange,
  onClickRemove
}) {
  InteractionsFilters.propTypes = {
    filters: PropTypes.objectOf(
      PropTypes.shape({
        datePeriodStart: PropTypes.object,
        datePeriodFinish: PropTypes.object,
        interactionReason: PropTypes.object,
        interactionCategory: PropTypes.object,
        interactionShowBy: PropTypes.number
      })
    ),
    msisdn: PropTypes.string,
    onFilterChange: PropTypes.func.isRequired,
    onClickRemove: PropTypes.func.isRequired
  }

  return (
    <FilterWrapper>
      <Row gutter={16}>
        <Col span={8}>
          <Label>
            Причина
            <ReasonSelectorContainer value={interactionReason} onChange={value => onFilterChange({ interactionReason: value })} />
          </Label>
        </Col>
        <Col span={8}>
          <Label>
            Категория
            <CategorySelectorContainer
              value={interactionCategory}
              onChange={value => onFilterChange({ interactionCategory: value })}
            />
          </Label>
        </Col>
        <Col span={8}>
          <Label>
            Показывать
            <StyledSelect
              value={interactionShowBy}
              defaultValue={1}
              onChange={value => onFilterChange({ interactionShowBy: value })}
            >
              <Select.Option value={0} key={0}>
                Все
              </Select.Option>
              <Select.Option value={1} key={1}>
                Только клиентские
              </Select.Option>
              <Select.Option value={2} key={2}>
                Выбранного абонента
              </Select.Option>
            </StyledSelect>
          </Label>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Label>
            Номер телефона
            <MsisdnMaskInput
              disabled
              value={msisdn}
              isActive
              onChange={value => onFilterChange({ msisdn: value })}
              onClickRemove={onClickRemove}
            />
          </Label>
        </Col>
      </Row>
      <br />
      <Row gutter={16}>
        <Col span={16}>
          <RangePicker
            limitMonth={3}
            value={{ from: datePeriodStart, to: datePeriodFinish }}
            onChange={({ from, to }) => onFilterChange({ datePeriodStart: from, datePeriodFinish: to })}
          />
        </Col>
      </Row>
    </FilterWrapper>
  )
}

const FilterWrapper = styled.div`
  padding: 0 16px 20px;
  border-bottom: 1px solid #e4e4e9;
`

const MsisdnMaskInput = styled(MsisdnMaskedInput)`
  height: 32px;
  flex: true;
  width: 100%;
  font-size: 14px;
  text-align: left;

  & input {
    border-radius: 4px;
    border-width: 1px;
    border-color: ${props => (props.isActive ? 'rgb(217, 217, 217)' : '#F5222D')};
    border-style: solid;

    &:hover {
      border-radius: 4px;
      border-width: 1px;
      border-color: ${props => (props.isActive ? 'rgb(110, 219, 255)' : '#F5222D')};
      border-style: solid;
      outline-color: transparent;
    }

    &:focus {
      border-radius: 4px;
      border-width: 1px;
      border-color: ${props => (props.isActive ? 'rgb(110, 219, 255)' : '#F5222D')};
      outline-color: transparent;
      box-shadow: ${props => (props.isActive ? 'none' : '0 0 0 2px rgba(245, 34, 45, 0.2)')};
      border-style: solid;
    }
  }
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
