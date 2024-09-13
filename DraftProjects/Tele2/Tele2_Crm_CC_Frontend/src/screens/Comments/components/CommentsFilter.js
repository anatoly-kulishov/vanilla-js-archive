/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled from 'styled-components'
import { Row, Col, Checkbox } from 'antd'
import PropTypes from 'prop-types'
const CheckboxOnСhange = (event, onFiltersChange) => onFiltersChange({ hasPopup: event.target.checked })

const CommentsFilter = props => {
  CommentsFilter.propTypes = {
    typeIds: PropTypes.object,
    hasPopup: PropTypes.object,
    onFiltersChange: PropTypes.object
  }
  const { hasPopup, onFiltersChange, typeIds } = props
  return (
    <Filters>
      <Row>
        <Col span={12}>
          <CheckboxGroup defaultValue={typeIds} value={typeIds} onChange={newTypeIds => onFiltersChange({ typeIds: newTypeIds })}>
            <Row>
              <Col span={8}>
                <FilterCheckbox value={0}>Aбонент</FilterCheckbox>
              </Col>
              <Col span={8}>
                <FilterCheckbox value={2}>Клиент</FilterCheckbox>
              </Col>
              <Col span={8}>
                <FilterCheckbox disabled value={1}>
                  Все абоненты
                </FilterCheckbox>
              </Col>
            </Row>
          </CheckboxGroup>
        </Col>
        <Col span={4}>
          <FilterCheckbox checked={hasPopup} onChange={event => CheckboxOnСhange(event, onFiltersChange)}>
            Только важные
          </FilterCheckbox>
        </Col>
      </Row>
    </Filters>
  )
}

export default CommentsFilter

const Filters = styled.div`
  padding: 5px 20px;
`
const CheckboxGroup = styled(Checkbox.Group)`
  width: 100%;
`
const FilterCheckbox = styled(Checkbox)`
  font-weight: normal;
  width: 200px;
`
