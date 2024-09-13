/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Tag from 'components/Tag'

const GroupsFilter = ({ isGroupFilter, activeFilter, countAll, countCurrent, countOld, countPreliminare, handleFilterChange }) => {
  return (
    <Tags>
      <Tag
        hidden={countAll === null}
        onClick={() => handleFilterChange({ filterState: null, isGroupFilter })}
        color='grey'
        isActive={activeFilter === null}
        width={150}
      >{`все: ${countAll}`}</Tag>
      <Tag
        hidden={countCurrent === null}
        onClick={() => handleFilterChange({ filterState: 1, isGroupFilter })}
        color='green'
        isActive={activeFilter === 1}
        width={150}
      >{`состоит: ${countCurrent}`}</Tag>
      <Tag
        hidden={countOld === null}
        onClick={() => handleFilterChange({ filterState: 2, isGroupFilter })}
        color='red'
        isActive={activeFilter === 2}
        width={150}
      >{`ранее состоял: ${countOld}`}</Tag>
      <Tag
        hidden={countPreliminare === null}
        onClick={() => handleFilterChange({ filterState: 3, isGroupFilter })}
        color='grey'
        isActive={activeFilter === 3}
        width={150}
      >{`предварительные: ${countPreliminare}`}</Tag>
    </Tags>
  )
}

export default GroupsFilter

GroupsFilter.propTypes = {
  isGroupFilter: PropTypes.bool,
  countAll: PropTypes.number,
  countCurrent: PropTypes.number,
  countOld: PropTypes.number,
  countPreliminare: PropTypes.number,
  handleFilterChange: PropTypes.func,
  activeFilter: PropTypes.number
}

const Tags = styled.div`
  padding: 16px;
  display: flex;
`
