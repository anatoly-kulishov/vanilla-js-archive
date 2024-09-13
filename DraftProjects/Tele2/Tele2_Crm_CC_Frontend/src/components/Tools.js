/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { SyncOutlined, FilterOutlined } from '@ant-design/icons'

export default function Tools ({ onRefreshClick, onFilterClick, shouldSpinOnRefresh = false, ...rest }) {
  Tools.propTypes = {
    onRefreshClick: PropTypes.func.isRequired,
    onFilterClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    shouldSpinOnRefresh: PropTypes.bool
  }

  const handleRefreshClick = () => {
    onRefreshClick()
  }

  const handleFiltersClick = () => {
    onFilterClick()
  }

  return (
    <Wrapper {...rest}>
      <StyledSyncIcon spin={shouldSpinOnRefresh} onClick={handleRefreshClick} />
      <StyledFilterIcon onClick={handleFiltersClick} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`
const StyledSyncIcon = styled(SyncOutlined)`
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.1s ease-out, transform 0.03s ease-out;
  color: black;
  :hover {
    color: #44caff;
    transform: scale(1.05);
  }
  :active {
    transform: scale(0.95);
  }
`
const StyledFilterIcon = styled(FilterOutlined)`
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.1s ease-out, transform 0.03s ease-out;
  color: black;
  :hover {
    color: #44caff;
    transform: scale(1.05);
  }
  :active {
    transform: scale(0.95);
  }
`
