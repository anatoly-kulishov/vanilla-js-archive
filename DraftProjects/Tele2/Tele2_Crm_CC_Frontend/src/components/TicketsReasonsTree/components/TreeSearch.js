/* eslint-disable
react-perf/jsx-no-new-function-as-prop,
react-perf/jsx-no-new-object-as-prop,
react-perf/jsx-no-new-array-as-prop
*/
import React from 'react'
import styled from 'styled-components'
import { AutoComplete } from 'antd'
import ArrowIcon from '../assets/arrow.svg'
import PropTypes from 'prop-types'

const TreeSearch = (props) => {
  TreeSearch.propTypes = {
    onClick: PropTypes.func,
    onSearch: PropTypes.func,
    isTreeCollapsed: PropTypes.bool,
    reasonSearchName: PropTypes.string
  }
  const {
    onClick,
    isTreeCollapsed,
    reasonSearchName,
    onSearch
  } = props

  return (
    <Wrapper>
      <Label>Выберите причину и категорию обращения</Label>
      <FlexWrapper>
        <SearchWrapper>
          <Search
            placeholder='Поиск'
            onChange={value =>
              value
                ? onSearch({ field: 'reasonSearchName', value })
                : {
                  onSearch: onSearch({ field: 'reasonSearchName', value: '' }),
                  onClick: onClick()
                }
            }
            value={reasonSearchName}
            allowClear
          />
          <ArrowWrapper onClick={() => onClick()}>
            <Arrow isTreeCollapsed={isTreeCollapsed} />
          </ArrowWrapper>
        </SearchWrapper>
      </FlexWrapper>
    </Wrapper>
  )
}

export default TreeSearch

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  pointer-events: ${props => props.isDisabled ? 'none' : 'unset'};
  background: #fff;
`

const FlexWrapper = styled.div`
  display: flex;
`

const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
`

const Search = styled(AutoComplete)`
  width: 100%;
  margin-right: 10px;
  margin-bottom: 0;
`

const Label = styled.div`
  font-size: 14px;
  color: black;
`
const ArrowWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 3px;
  width: 25px;
  height: 25px;
  padding-right: 3px;
  z-index: 1;
  cursor: pointer;
`

const Arrow = styled(ArrowIcon)`
  position: absolute;
  right: 5px;
  top: 5px;
  width: 15px;
  height: 15px;
  transform: rotate(${props => props.isTreeCollapsed ? '180deg' : '90deg'});
`
