/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { MIN_TABLE_ROWS_LIMIT } from '../constants/limiter'

const limiterConfig = {
  moreLabel: '...',
  separator: ',',
  aroundVisibleLabelsCount: 2, // число видимых label рядом с выбранным
  tailVisibleLabelsCount: 3 // число видимых label с начала и конца
}

const TableRowsLimiter = props => {
  const {
    label,
    rowsLimit,
    totalRowsCount,
    handleChangeRowsLimit,
    maxLabelsCount = undefined // ограничение на максимальное количество labels. По-умолчанию - не ограничено
  } = props
  const { separator, moreLabel, aroundVisibleLabelsCount, tailVisibleLabelsCount } = limiterConfig

  const getVisibleCountLabels = () => {
    const totalLabelsCount = Math.ceil(totalRowsCount / MIN_TABLE_ROWS_LIMIT)
    const labelsCount = totalLabelsCount > maxLabelsCount ? maxLabelsCount : totalLabelsCount
    const labelsArray = Array(labelsCount)
      .fill()
      .map((__, index) => {
        ++index
        return index * MIN_TABLE_ROWS_LIMIT
      })
    const activeIndex = rowsLimit / MIN_TABLE_ROWS_LIMIT - 1

    const visibleLabels = labelsArray
      .map((item, index) => {
        const isTailIndex = index < tailVisibleLabelsCount || labelsCount - index <= tailVisibleLabelsCount
        const isAroundActiveIndex = Math.abs(index - activeIndex) <= aroundVisibleLabelsCount
        return isTailIndex || isAroundActiveIndex ? item : null
      })
      .filter((item, index, array) => {
        const isFirstSeparator = item === null && index > 0 && array[index - 1] !== null
        return index === 0 || item !== null || isFirstSeparator
      })
      .map(item => item || moreLabel)
    return visibleLabels
  }

  const labels = getVisibleCountLabels().map((item, index) => (
    <Label
      key={index}
      className='count-label'
      isActive={rowsLimit === item}
      isMoreLabel={item === moreLabel}
      onClick={() => item !== moreLabel && handleChangeRowsLimit(item)}
    >
      {item}
    </Label>
  ))

  return (
    <Wrapper>
      <Desctiption>{label}</Desctiption>
      {labels.map((item, index) => {
        return (
          <span key={index}>
            {index !== 0 && separator}
            {item}
          </span>
        )
      })}
    </Wrapper>
  )
}

export default TableRowsLimiter

TableRowsLimiter.propTypes = {
  label: PropTypes.string,
  rowsLimit: PropTypes.number,
  totalRowsCount: PropTypes.number,
  maxLabelsCount: PropTypes.number,
  handleChangeRowsLimit: PropTypes.func
}

const Wrapper = styled.div`
  padding: 16px;
`

const Label = styled.label`
  padding: 0 4px;
  color: ${props => (props.isActive || props.isMoreLabel ? 'black' : '#45C0ED')};
  cursor: ${props => (props.isActive || props.isMoreLabel ? 'initial' : 'pointer')};
  font-weight: ${props => (props.isActive || props.isMoreLabel ? 'bold' : 'normal')};

  :hover {
    text-decoration: ${props => (props.isActive || props.isMoreLabel ? 'none' : 'underline')};
  }
`

const Desctiption = styled.span``
