/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col, Button, Checkbox } from 'antd'
import RangePicker from 'components/RangePicker'

const ResourcesFilters = ({
  commonFilters: { resourcesDatePeriodStart, resourcesDatePeriodFinish },
  handleSubmit,
  tableExpandState: { expandAllFlag },
  tableExpandFunctions: { expandAll },
  summary,
  handleCommonFilterChange
}) => {
  return (
    <Wrapper>
      <Row align='middle'>
        <Col>
          <RangePicker
            isMonthOnly
            value={{ from: resourcesDatePeriodStart, to: resourcesDatePeriodFinish }}
            onChange={({ from, to }) => {
              handleCommonFilterChange({
                resourcesDatePeriodStart: from,
                resourcesDatePeriodFinish: to
              })
            }}
          />
        </Col>
        <Col>
          <DateControls>
            <ControlBtn type='primary' onClick={handleSubmit}>
              Найти
            </ControlBtn>
          </DateControls>
        </Col>
        <MarginedCol>
          <SearchCheckBox disabled={summary?.length === 0} onChange={() => expandAll()} checked={expandAllFlag}>
            Показать подробности
          </SearchCheckBox>
        </MarginedCol>
        {/* <MarginedCol>
          <SearchCheckBox
            disabled={Summary.length === 0}
            onChange={() => expandAll()}
            checked={expandAllFlag}
          >
            Показать подробности
          </SearchCheckBox>
        </MarginedCol> */}
      </Row>
    </Wrapper>
  )
}

export default ResourcesFilters

ResourcesFilters.propTypes = {
  commonFilters: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCommonFilterChange: PropTypes.func.isRequired,
  tableExpandState: PropTypes.object.isRequired,
  tableExpandFunctions: PropTypes.object.isRequired,
  summary: PropTypes.array.isRequired
}

const Wrapper = styled.div`
  padding: 14px 20px;
`

const ControlBtn = styled(Button)`
  margin-left: 20px;
`
const DateControls = styled.div`
  display: flex;
  justify-content: flex-end;
`

const MarginedCol = styled(Col)`
  margin-left: auto;
  @media (max-width: 1200px) {
    margin-top: 10px;
    padding-left: 200px;
  }
`

const SearchCheckBox = styled(Checkbox)`
  font-weight: normal;
  font-size: 13px;
  span {
    padding-right: 0;
  }
`
