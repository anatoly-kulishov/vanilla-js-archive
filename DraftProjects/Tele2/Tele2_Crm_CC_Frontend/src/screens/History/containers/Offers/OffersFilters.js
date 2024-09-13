/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Input } from 'antd'
import RangePicker from 'components/RangePicker'
import MsisdnMaskedInput from 'components/MsisdnMask/MsisdnInput'

export default function OffersFilters ({
  filters: { datePeriodStart, datePeriodFinish, offerName, msisdn },
  onFilterChange,
  onClickRemove
}) {
  OffersFilters.propTypes = {
    filters: PropTypes.objectOf(
      PropTypes.shape({
        datePeriodStart: PropTypes.object,
        datePeriodFinish: PropTypes.object,
        offerName: PropTypes.string,
        msisdn: PropTypes.string
      })
    ),
    onFilterChange: PropTypes.func.isRequired,
    onClickRemove: PropTypes.func.isRequired
  }

  return (
    <FilterWrapper>
      <Row gutter={16}>
        <Col span={8}>
          <Label>
            Предложение
            <Input value={offerName} onChange={elem => onFilterChange({ offerName: elem.target.value })} />
          </Label>
        </Col>
        <Col span={8}>
          <Label>
            Номер телефона
            <MsisdnMaskInput
              value={msisdn}
              isActive
              onChange={value => onFilterChange({ msisdn: value })}
              onClickRemove={onClickRemove}
              onPaste={value => onFilterChange({ msisdn: value })}
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
